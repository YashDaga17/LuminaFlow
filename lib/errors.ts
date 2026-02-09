export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string = "INTERNAL_SERVER_ERROR"
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (error: any) => {
  console.error("Error:", error);

  if (error instanceof AppError) {
    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  // Prisma errors
  if (error.code === "P2002") {
    return {
      error: "This record already exists",
      code: "DUPLICATE_ENTRY",
      statusCode: 409,
    };
  }

  if (error.code === "P2025") {
    return {
      error: "Record not found",
      code: "NOT_FOUND",
      statusCode: 404,
    };
  }

  return {
    error: "An unexpected error occurred",
    code: "INTERNAL_SERVER_ERROR",
    statusCode: 500,
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .substring(0, 1000); // Limit length
};
