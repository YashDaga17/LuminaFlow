export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-2">LuminaFlow</h3>
            <p className="text-sm">
              A full-stack task orchestrator with AI-powered features.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Developer</h4>
            <p className="text-sm">
              <strong>Yash Daga</strong>
            </p>
            <div className="flex gap-3 mt-2 text-sm">
              <a
                href="https://github.com/YashDaga17"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-lumina-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/yash-daga"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-lumina-400 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Tech Stack</h4>
            <p className="text-sm">
              Next.js • TypeScript • Prisma • PostgreSQL • Tailwind CSS
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-sm text-center">
            © 2026 LuminaFlow. Built with ❤️ using Next.js 16 and AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
