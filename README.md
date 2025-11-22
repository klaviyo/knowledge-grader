# Knowledge Document Grader

An AI-powered tool that grades and improves knowledge base documents for AI agents. Built with Next.js, OpenAI, and Tailwind CSS.

## Features

- **Instant Grading**: Get a 0-100 score based on Klaviyo's knowledge base best practices
- **Detailed Suggestions**: Categorized improvement recommendations with specific fixes
- **Document Rewriting**: Automatically generate improved versions of your documents
- **Side-by-Side Diff**: Visual comparison between original and improved documents
- **One-Click Copy**: Easy clipboard integration for improved documents

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repository:
```bash
cd ~/Repos/knowledge-grader
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Edit .env.local and add your OpenAI API key
OPENAI_API_KEY=your-actual-api-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Navigate to the app (automatically redirects to `/doc-grader`)
2. Paste your knowledge document (max 50KB)
3. Click "Grade Document"
4. Review:
   - Overall grade (0-100) with color coding
   - Expandable suggestions organized by category
   - Side-by-side diff viewer
5. Copy the improved document to your clipboard

## Project Structure

```
knowledge-grader/
├── app/
│   ├── api/
│   │   └── doc-grader/
│   │       └── evaluate/
│   │           └── route.ts       # API endpoint
│   ├── doc-grader/
│   │   └── page.tsx               # Main grading page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home (redirects)
│   └── globals.css                # Global styles
├── components/
│   └── doc-grader/
│       ├── DocGraderForm.tsx      # Main form component
│       ├── GradeDisplay.tsx       # Grade visualization
│       ├── SuggestionsList.tsx    # Suggestions accordion
│       └── DiffViewer.tsx         # Diff viewer
├── lib/
│   ├── schemas/
│   │   └── docGrader.ts           # Zod validation schemas
│   ├── services/
│   │   └── docGraderService.ts    # OpenAI integration
│   └── openai.ts                  # OpenAI client setup
└── package.json
```

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o
- **Validation**: Zod
- **Diff Viewer**: react-diff-viewer-continued

## Success Metrics

Track the performance of knowledge documents before and after using this tool:
- Document grade improvements (before/after)
- AI agent accuracy on edited vs. unedited documents
- Customer satisfaction with agent responses

## License

ISC
