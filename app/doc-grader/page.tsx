import { DocGraderForm } from '@/components/doc-grader/DocGraderForm';

export default function DocGraderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-klaviyo-violet/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-klaviyo-poppy rounded-full animate-pulse"></div>
              <span className="text-klaviyo-violet font-semibold text-sm">AI-Powered Quality Check</span>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Train your AI agent with high-quality content
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Get instant feedback on your knowledge base content. Ensure your AI agent retrieves accurate information and handles more customer questions automatically.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Optimized for AI retrieval</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Instant improvements</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Ecommerce focused</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <DocGraderForm />
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-6 pb-16 max-w-7xl">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Why content structure matters for AI agents
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Chunking</h4>
              <p className="text-sm text-gray-600">
                AI systems split content into ~6 line chunks. Keep headers with their content to ensure accurate retrieval.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">5-Fragment Limit</h4>
              <p className="text-sm text-gray-600">
                Only 5 chunks are retrieved per query. Consolidate related info (like shipping methods) to avoid incomplete answers.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-semibold text-gray-900 mb-2">Prose Over Lists</h4>
              <p className="text-sm text-gray-600">
                Avoid bullet points and tables—they don't chunk well. Use clear narrative prose for better AI comprehension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
