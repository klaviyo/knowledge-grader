'use client';

import { useState } from 'react';
import type { Suggestion } from '@/lib/schemas/docGrader';

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (suggestions.length === 0) {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        <p className="text-sm font-semibold text-green-900">Perfect! No improvements needed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">
          Improvement Suggestions
        </h3>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
          {suggestions.length} {suggestions.length === 1 ? 'issue' : 'issues'}
        </span>
      </div>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            <button
              onClick={() => setExpanded(expanded === index ? null : index)}
              className="w-full px-5 py-4 text-left hover:bg-white transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm truncate">
                    {suggestion.category}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    expanded === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {expanded === index && (
              <div className="px-5 pb-5 pt-2 space-y-4 bg-white border-t border-gray-200">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Issue</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{suggestion.issue}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wide">Solution</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{suggestion.fix}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
