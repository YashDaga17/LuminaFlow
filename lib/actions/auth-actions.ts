"use server";

import { db } from "@/lib/db";
import { hash, compare } from "bcryptjs";
import { z } from "zod";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { config } from "@/lib/config";

const JWT_SECRET = config.JWT_SECRET;

// Validation schemas
const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function signUp(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    // Validate input
    const validation = signUpSchema.safeParse({ email, password, name });
    if (!validation.success) {
      const errorMessage = validation.error.flatten().fieldErrors;
      const firstError = Object.values(errorMessage)[0]?.[0] || "Validation failed";
      return { error: firstError };
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "User already exists" };
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Create JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    revalidatePath("/");
    return { success: true, user: { id: user.id, email: user.email, name: user.name } };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "An error occurred during sign up" };
  }
}

export async function signIn(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate input
    const validation = signInSchema.safeParse({ email, password });
    if (!validation.success) {
      const errorMessage = validation.error.flatten().fieldErrors;
      const firstError = Object.values(errorMessage)[0]?.[0] || "Validation failed";
      return { error: firstError };
    }

    // Find user
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return { error: "Invalid credentials" };
    }

    // Verify password
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return { error: "Invalid credentials" };
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    revalidatePath("/");
    return { success: true, user: { id: user.id, email: user.email, name: user.name } };
  } catch (error) {
    console.error("Sign in error:", error);
    return { error: "An error occurred during sign in" };
  }
}

export async function signOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return { error: "An error occurred during sign out" };
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };
    const user = await db.user.findUnique({ where: { id: decoded.userId } });

    return user;
  } catch (error) {
    return null;
  }
}
