'use client';

import { useState } from 'react';
import type { DocGraderOutput } from '@/lib/schemas/docGrader';
import { GradeDisplay } from './GradeDisplay';
import { SuggestionsList } from './SuggestionsList';
import { DiffViewer } from './DiffViewer';

export function DocGraderForm() {
  const [documentText, setDocumentText] = useState('');
  const [result, setResult] = useState<DocGraderOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/doc-grader/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to grade document');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.rewrittenDocument) {
      navigator.clipboard.writeText(result.rewrittenDocument);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setDocumentText('');
    setResult(null);
    setError(null);
    setCopied(false);
  };

  return (
    <div>
      {/* Input Section */}
      {!result ? (
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <label htmlFor="document" className="text-sm font-semibold text-gray-900">
                  Paste your knowledge base content
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Returns, shipping, exchanges, or product information
                </p>
              </div>
              <div className="p-6">
                <textarea
                  id="document"
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  className="w-full h-[400px] px-0 py-0 text-base border-0 focus:ring-0 focus:outline-none resize-none placeholder:text-gray-400 font-mono"
                  placeholder="Example: Our return policy allows customers to return items within 30 days of purchase..."
                  disabled={loading}
                  required
                />
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between rounded-b-2xl">
                <span className="text-sm text-gray-500">
                  {documentText.length.toLocaleString()} characters
                </span>
                <button
                  type="submit"
                  disabled={loading || !documentText.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-klaviyo-poppy text-white font-semibold text-sm rounded-lg hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      Check Quality
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6 animate-fadeIn">
          {/* Score Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <GradeDisplay grade={result.grade} />
          </div>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <SuggestionsList suggestions={result.suggestions} />
            </div>
          )}

          {/* Improved Document */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <DiffViewer
              originalDocument={documentText}
              rewrittenDocument={result.rewrittenDocument}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-6 py-3 bg-klaviyo-poppy text-white font-semibold text-sm rounded-lg hover:bg-red-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Improved Content
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Check Another Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
