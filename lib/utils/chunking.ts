/**
 * Text chunking utilities matching the AI Agent system algorithm.
 */

/**
 * Splits text into sentences using the exact algorithm from the AI Agent system.
 * Splits on:
 * 1. Punctuation followed by space and capital letter: (?<=[.!?])\s+(?=[A-Z])
 * 2. One or more newlines: \n+
 */
export function splitSentences(text: string): string[] {
	return text
		.split(/(?<=[.!?])\s+(?=[A-Z])|\n+/)
		.map((s) => s.trim())
		.filter((s) => s.length > 0);
}

/**
 * Chunks sentences into groups of specified size (without overlap).
 * This mirrors the exact chunking behavior of the AI Agent system.
 */
export function chunkSentences(
	sentences: string[],
	chunkSize: number = 6,
): string[][] {
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
export function previewChunking(text: string, chunkSize: number = 6): string[] {
	const sentences = splitSentences(text);
	const chunks = chunkSentences(sentences, chunkSize);
	return chunks.map((chunk) => chunk.join("\n"));
}
