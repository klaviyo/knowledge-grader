'use client';

import { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';

interface DiffViewerProps {
  originalDocument: string;
  rewrittenDocument: string;
}

export function DiffViewer({ originalDocument, rewrittenDocument }: DiffViewerProps) {
  const [viewMode, setViewMode] = useState<'split' | 'improved'>('improved');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Improved Content</h3>
        <div className="inline-flex gap-1 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setViewMode('improved')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-200 ${
              viewMode === 'improved'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Clean View
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-200 ${
              viewMode === 'split'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Compare
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        {viewMode === 'improved' ? (
          <div className="p-6 bg-gray-50">
            <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed text-sm">
              {rewrittenDocument}
            </pre>
          </div>
        ) : (
          <div className="overflow-auto" style={{ maxHeight: '600px' }}>
            <ReactDiffViewer
              oldValue={originalDocument}
              newValue={rewrittenDocument}
              splitView={true}
              leftTitle="Original"
              rightTitle="Improved"
              useDarkTheme={false}
              styles={{
                variables: {
                  light: {
                    diffViewerBackground: '#ffffff',
                    addedBackground: '#F0FDF4',
                    addedColor: '#166534',
                    removedBackground: '#FEF2F2',
                    removedColor: '#991B1B',
                    wordAddedBackground: '#BBF7D0',
                    wordRemovedBackground: '#FECACA',
                    addedGutterBackground: '#DCFCE7',
                    removedGutterBackground: '#FEE2E2',
                    gutterBackground: '#f9fafb',
                    gutterBackgroundDark: '#f3f4f6',
                    highlightBackground: '#FEF9C3',
                    highlightGutterBackground: '#FEF08A',
                  },
                },
                line: {
                  padding: '10px 8px',
                  fontSize: '13px',
                  '&:hover': {
                    background: '#f9fafb',
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
