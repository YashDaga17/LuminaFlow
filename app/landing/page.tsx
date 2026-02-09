export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-lumina-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-lumina-700 mb-4">
            LuminaFlow
          </h1>
          <p className="text-2xl text-lumina-600 mb-8">
            Full-stack Task Orchestrator with Gemini AI
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Manage your tasks efficiently with AI-powered descriptions and smart organization.
            Built with Next.js, TypeScript, and powered by Google Gemini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border border-lumina-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🔐 Secure</h3>
            <p className="text-gray-600">
              JWT authentication with encrypted passwords. Your data is secure and private.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-lumina-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">✨ AI-Powered</h3>
            <p className="text-gray-600">
              Get AI suggestions for task descriptions using Google Gemini.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-lumina-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">⚡ Fast</h3>
            <p className="text-gray-600">
              Built on Next.js 16 with server components for maximum performance.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/sign-up"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors mr-4 mb-4"
          >
            Get Started
          </a>
          <a
            href="/sign-in"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold border-2 border-black hover:bg-gray-50 transition-colors"
          >
            Sign In
          </a>
        </div>

        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-lumina-700">100%</p>
              <p className="text-gray-600">TypeScript</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-lumina-700">∞</p>
              <p className="text-gray-600">Scalable</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-lumina-700">🚀</p>
              <p className="text-gray-600">Fast Deploy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-lumina-700">🔓</p>
              <p className="text-gray-600">Open Source</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
