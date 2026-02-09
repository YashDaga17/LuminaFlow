import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-lumina-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-lumina-700 mb-8 text-center">
          LuminaFlow
        </h1>
        <SignUpForm />
      </div>
    </main>
  );
}
