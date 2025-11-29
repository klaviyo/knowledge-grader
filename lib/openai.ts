import OpenAI from "openai";

let openaiInstance: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
	if (!process.env.OPENAI_API_KEY) {
		throw new Error("Missing OPENAI_API_KEY environment variable. Please set it in your Vercel dashboard under Settings > Environment Variables.");
	}

	if (!openaiInstance) {
		openaiInstance = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
			organization: process.env.OPENAI_ORGANIZATION,
		});
	}

	return openaiInstance;
}
