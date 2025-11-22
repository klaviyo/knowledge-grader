import { openai } from '../openai';
import { DocGraderOutput } from '../schemas/docGrader';

const DEFAULT_RUBRIC_URL = 'https://help.klaviyo.com/hc/en-us/articles/40418535535387';

// Cache rubric for 1 hour
let rubricCache: { content: string; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms

/**
 * Splits text into sentences using the exact algorithm from the AI Agent system.
 * Splits on:
 * 1. Punctuation followed by space and capital letter: (?<=[.!?])\s+(?=[A-Z])
 * 2. One or more newlines: \n+
 */
function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])|\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * Chunks sentences into groups of 6 (without overlap).
 * This mirrors the exact chunking behavior of the AI Agent system.
 */
function chunkSentences(sentences: string[], chunkSize: number = 6): string[][] {
  const chunks: string[][] = [];
  for (let i = 0; i < sentences.length; i += chunkSize) {
    chunks.push(sentences.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Preview how a document will be chunked by the AI Agent system.
 * Returns an array of chunk strings for analysis.
 */
export function previewChunking(text: string): string[] {
  const sentences = splitSentences(text);
  const chunks = chunkSentences(sentences);
  return chunks.map(chunk => chunk.join('\n'));
}

async function fetchRubric(url: string): Promise<string> {
  const now = Date.now();
  if (rubricCache && now - rubricCache.timestamp < CACHE_TTL) {
    return rubricCache.content;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch rubric: ${response.statusText}`);
  }

  const html = await response.text();
  rubricCache = { content: html, timestamp: now };
  return html;
}

export async function gradeDocumentService(
  documentText: string,
  rubricUrl: string = DEFAULT_RUBRIC_URL
): Promise<DocGraderOutput> {
  const rubric = await fetchRubric(rubricUrl);

  // Generate chunk preview to help with evaluation
  const chunks = previewChunking(documentText);
  const chunkPreview = chunks.map((chunk, i) =>
    `CHUNK ${i + 1}:\n${chunk}\n---`
  ).join('\n\n');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-2025-04-14',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are a knowledge-base evaluator for AI agent documentation with expertise in RAG (Retrieval-Augmented Generation) systems.

CRITICAL CHUNKING ALGORITHM:
The AI Agent system uses this EXACT algorithm to split documents:
1. Split on: (?<=[.!?])\\s+(?=[A-Z]) (punctuation + space + capital letter) OR \\n+ (one or more newlines)
2. Each resulting segment is ONE "sentence"
3. Group into chunks of exactly 6 sentences (no overlap)
4. Store chunks separately in the database

WHAT THIS MEANS:
- A newline by itself creates a sentence boundary (even without punctuation!)
- Short lines like headers become separate "sentences"
- A header on its own line + 5 content lines = 1 chunk (GOOD)
- A header on its own line followed by 6+ content lines = header in one chunk, content starts in next chunk (BAD - orphaned header!)
- Bullet points each become separate "sentences" because of newlines
- Tables with rows on separate lines create many "sentences"

YOUR EVALUATION MUST:
1. Identify where headers will be orphaned (header alone or with <6 lines of content before next section)
2. Flag bullet lists and tables (they chunk poorly due to newline boundaries)
3. Ensure critical information stays within 6-sentence boundaries
4. Remember: Only 5 chunks are retrieved per query - if info spans 10+ chunks, only partial info retrieved!

Evaluate documents against the rubric and return structured JSON feedback.`
      },
      {
        role: 'user',
        content: `Evaluate this document against the rubric below, paying SPECIAL ATTENTION to chunking optimization.

Return JSON with:
{
  "grade": <0-100>,
  "suggestions": [{"category": "...", "issue": "...", "fix": "..."}],
  "rewrittenDocument": "<improved version>"
}

ACTUAL CHUNK BREAKDOWN (how the AI Agent system will split this document):
${chunkPreview}

ANALYZE THE CHUNKS ABOVE:
- Look for orphaned headers (headers in chunks without their content)
- Check if related info spans too many chunks (remember: only 5 retrieved!)
- Identify bullet lists/tables that create many small "sentences"
- Ensure each chunk is semantically complete and useful on its own

KEY CHUNKING RULES:
- Splits on: (?<=[.!?])\\s+(?=[A-Z]) OR \\n+ (newlines)
- Each line break creates a sentence boundary
- Grouped into exactly 6 sentences per chunk (no overlap)
- **CRITICAL: Only 5 chunks are retrieved from database per query**
- Bullet points and tables chunk poorly (each line = new sentence)

ECOMMERCE CONTEXT:
These documents are for AI agents helping ecommerce merchants. Users primarily ask about:
- Return policies and processes
- Shipping methods, rates, and timeframes
- Exchange procedures
- Product-specific information (sizing, materials, care instructions)

Common chunking problems in ecommerce docs:
- Shipping rate tables split from method names (e.g., "Ground Shipping" header separated from rates)
- Multiple shipping methods in separate chunks (Ground, Standard, Express) - only 5 chunks retrieved means incomplete info
- Long bullet lists split across chunks - some bullets lost due to 5-fragment limit
- Return eligibility criteria separated from return instructions
- Product condition requirements split from return/exchange policies
- Time limits (e.g., "30-day return window") separated from their context
- Tables that span many lines get chunked poorly and incompletely retrieved

EVALUATION CRITERIA - Include chunking-specific suggestions:
- "Document Structure & Chunking": Evaluate if content is organized for optimal chunking. Flag issues like:
  * Headers separated from content (CRITICAL for shipping/return sections)
  * Related information split across likely chunk boundaries (e.g., rates split from shipping methods)
  * **Using bullet points or tables** - these are NOT handled well by the chunker, recommend prose instead
  * **Multiple related sections** (e.g., Ground, Standard, Express shipping) - with only 5 fragments retrieved, separate sections mean incomplete info. Recommend consolidating related options into single, concise sections
  * Lists or tables that span too many lines (especially rate tables, return conditions)
  * Missing context that makes chunks unclear (e.g., a chunk with only rates but no method name)
  * Policies split from their eligibility criteria or timeframes
  * Information spread across too many potential chunks (remember: only 5 retrieved!)
- "Ecommerce Clarity": Ensure policies are clear, complete, and structured for retrieval:
  * Return windows must be stated with the policy (not orphaned)
  * Shipping costs must be with shipping method descriptions
  * Exchange conditions must be with exchange instructions
  * Product specifics grouped logically (sizing with size charts, not split)
  * **Consolidate related options** (e.g., all shipping methods in one compact section) to ensure complete retrieval within 5-fragment limit
  * **Avoid bullet lists and tables** - convert to narrative prose that chunks cleanly
- Follow all other rubric criteria as well

RUBRIC (from Klaviyo Help):
${rubric}

DOCUMENT TO EVALUATE:
${documentText}`
      }
    ]
  });

  const result = completion.choices[0].message.content;
  if (!result) {
    throw new Error('No response from OpenAI');
  }

  return JSON.parse(result) as DocGraderOutput;
}
