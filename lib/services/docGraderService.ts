import { readFileSync } from "node:fs";
import { join } from "node:path";
import { openai } from "../openai";
import type { DocGraderOutput } from "../schemas/docGrader";
import { previewChunking } from "../utils/chunking";

// Load prompts and rubric once at startup
const RUBRIC = readFileSync(
	join(process.cwd(), "lib/data/rubric.txt"),
	"utf-8",
);
const SYSTEM_PROMPT = readFileSync(
	join(process.cwd(), "lib/data/system-prompt.txt"),
	"utf-8",
);
const USER_PROMPT_TEMPLATE = readFileSync(
	join(process.cwd(), "lib/data/user-prompt-template.txt"),
	"utf-8",
);

export async function gradeDocumentService(
	documentText: string,
): Promise<DocGraderOutput> {
	// Generate chunk preview to help with evaluation
	const chunks = previewChunking(documentText);
	const chunkPreview = chunks
		.map((chunk, i) => `CHUNK ${i + 1}:\n${chunk}\n---`)
		.join("\n\n");

	// Build user prompt from template
	const userPrompt = USER_PROMPT_TEMPLATE.replace(
		"{{CHUNK_PREVIEW}}",
		chunkPreview,
	)
		.replace("{{RUBRIC}}", RUBRIC)
		.replace("{{DOCUMENT}}", documentText);

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
