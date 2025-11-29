import { type NextRequest, NextResponse } from "next/server";
import { DocGraderInputSchema } from "@/lib/schemas/docGrader";
import { gradeDocumentService } from "@/lib/services/docGraderService";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const input = DocGraderInputSchema.parse(body);

		const result = await gradeDocumentService(input.documentText);

		return NextResponse.json(result);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
