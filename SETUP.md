# Knowledge Grader - Setup Instructions

## ✅ Project Created Successfully!

Your standalone Knowledge Grader application is ready at:
```
/Users/paul.jordan/Repos/knowledge-grader
```

## Quick Start

1. **Navigate to the project:**
   ```bash
   cd ~/Repos/knowledge-grader
   ```

2. **Add your OpenAI API key:**
   ```bash
   # Edit .env.local
   nano .env.local
   # Replace 'your-api-key-here' with your actual OpenAI API key
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## What's Included

### Routes
- `/` - Home page (redirects to `/doc-grader`)
- `/doc-grader` - Main document grading interface
- `/api/doc-grader/evaluate` - API endpoint for grading

### Features
- Document grading (0-100 scale)
- AI-powered suggestions with categories
- Automatic document rewriting
- Side-by-side diff viewer
- One-click copy to clipboard

### Technology Stack
- Next.js 16 (App Router with Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4
- OpenAI GPT-4o
- Zod validation
- react-diff-viewer-continued

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
knowledge-grader/
├── app/
│   ├── api/doc-grader/evaluate/route.ts  # Grading API
│   ├── doc-grader/page.tsx               # Main UI
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Home page
│   └── globals.css                       # Global styles
├── components/doc-grader/                # UI components
│   ├── DocGraderForm.tsx
│   ├── GradeDisplay.tsx
│   ├── SuggestionsList.tsx
│   └── DiffViewer.tsx
├── lib/
│   ├── schemas/docGrader.ts              # Zod schemas
│   ├── services/docGraderService.ts      # OpenAI service
│   └── openai.ts                         # OpenAI client
└── README.md                             # Full documentation
```

## Environment Variables

Required in `.env.local`:
```
OPENAI_API_KEY=sk-...
```

## Next Steps

1. Add your OpenAI API key to `.env.local`
2. Run `npm run dev`
3. Test the grading functionality
4. Customize the rubric URL in `lib/services/docGraderService.ts` if needed
5. Deploy to Vercel or your preferred platform

## Deployment

To deploy to Vercel:
```bash
npm install -g vercel
vercel
```

Make sure to add your `OPENAI_API_KEY` environment variable in the Vercel dashboard.

## Support

For issues or questions, check the README.md or create an issue in the repository.
