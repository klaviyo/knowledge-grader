import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getOpenAIClient } from "../openai";
import type { DocGraderOutput } from "../schemas/docGrader";
import { previewChunking } from "../utils/chunking";

// Lazy-load prompts and rubric to ensure compatibility with Vercel
let RUBRIC: string | null = null;
let SYSTEM_PROMPT: string | null = null;
let USER_PROMPT_TEMPLATE: string | null = null;

function loadPrompts() {
	if (!RUBRIC) {
		RUBRIC = readFileSync(
			join(process.cwd(), "lib/data/rubric.txt"),
			"utf-8",
		);
	}
	if (!SYSTEM_PROMPT) {
		SYSTEM_PROMPT = readFileSync(
			join(process.cwd(), "lib/data/system-prompt.txt"),
			"utf-8",
		);
	}
	if (!USER_PROMPT_TEMPLATE) {
		USER_PROMPT_TEMPLATE = readFileSync(
			join(process.cwd(), "lib/data/user-prompt-template.txt"),
			"utf-8",
		);
	}
}

export async function gradeDocumentService(
	documentText: string,
): Promise<DocGraderOutput> {
	// Load prompts on first use
	loadPrompts();
	// Generate chunk preview to help with evaluation
	const chunks = previewChunking(documentText);
	const chunkPreview = chunks
		.map((chunk, i) => `CHUNK ${i + 1}:\n${chunk}\n---`)
		.join("\n\n");

	// Build user prompt from template
	if (!RUBRIC || !SYSTEM_PROMPT || !USER_PROMPT_TEMPLATE) {
		throw new Error("Failed to load prompt templates");
	}

	const userPrompt = USER_PROMPT_TEMPLATE.replace(
		"{{CHUNK_PREVIEW}}",
		chunkPreview,
	)
		.replace("{{RUBRIC}}", RUBRIC)
		.replace("{{DOCUMENT}}", documentText);

	const openai = getOpenAIClient();
	const completion = await openai.chat.completions.create({
		model: "gpt-4.1-2025-04-14",
		response_format: { type: "json_object" },
		messages: [
			{
				role: "system",
				content: SYSTEM_PROMPT,
			},
			{
				role: "user",
				content: userPrompt,
			},
		],
	});

	const result = completion.choices[0].message.content;
	if (!result) {
		throw new Error("No response from OpenAI");
	}

	return JSON.parse(result) as DocGraderOutput;
}
