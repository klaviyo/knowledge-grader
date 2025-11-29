import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { DocGraderInputSchema } from "@/lib/schemas/docGrader";
import { gradeDocumentService } from "@/lib/services/docGraderService";

// Simple in-memory rate limiting (for production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const record = requestCounts.get(ip);

	if (!record || now > record.resetAt) {
		requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
		return true;
	}

	if (record.count >= RATE_LIMIT) {
		return false;
	}

	record.count++;
	return true;
}

export async function POST(request: NextRequest) {
	try {
		// Rate limiting
		const ip = request.headers.get("x-forwarded-for") || "unknown";
		if (!checkRateLimit(ip)) {
			return NextResponse.json(
				{ error: "Too many requests. Please try again later." },
				{ status: 429 },
			);
		}

		// Parse and validate input
		const body = await request.json();
		const input = DocGraderInputSchema.parse(body);

		// Grade the document
		const result = await gradeDocumentService(input.documentText);

		return NextResponse.json(result);
	} catch (error) {
		// Handle validation errors
		if (error instanceof ZodError) {
			return NextResponse.json(
				{
					error: "Invalid input",
					details: error.issues.map((e) => e.message).join(", "),
				},
				{ status: 400 },
			);
		}

		// Handle other errors
		if (error instanceof Error) {
			console.error("Error grading document:", error);
			return NextResponse.json(
				{ error: error.message || "Failed to grade document" },
				{ status: 400 },
			);
		}

		// Unknown error
		console.error("Unknown error:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred" },
			{ status: 500 },
		);
	}
}
