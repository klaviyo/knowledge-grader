import { z } from "zod";

export const DocGraderInputSchema = z.object({
	documentText: z.string().max(50_000, "Document must be less than 50KB"),
	rubricUrl: z.string().url().optional(),
});

export const SuggestionSchema = z.object({
	category: z.string(),
	issue: z.string(),
	fix: z.string(),
});

export const DocGraderOutputSchema = z.object({
	grade: z.number().int().min(0).max(100),
	suggestions: z.array(SuggestionSchema),
	rewrittenDocument: z.string(),
});

export type DocGraderInput = z.infer<typeof DocGraderInputSchema>;
export type DocGraderOutput = z.infer<typeof DocGraderOutputSchema>;
export type Suggestion = z.infer<typeof SuggestionSchema>;
