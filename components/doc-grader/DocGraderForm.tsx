"use client";

import { useState } from "react";
import type { DocGraderOutput } from "@/lib/schemas/docGrader";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	CheckIcon,
	CopyIcon,
	ErrorIcon,
	SpinnerIcon,
} from "../icons/Icons";
import { ChunkPreview } from "./ChunkPreview";
import { CollapsedFeedback } from "./CollapsedFeedback";
import { FileDropZone } from "./FileDropZone";
import { LoadingState } from "./LoadingState";

export function DocGraderForm() {
	const [documentText, setDocumentText] = useState("");
	const [result, setResult] = useState<DocGraderOutput | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const response = await fetch("/api/doc-grader/evaluate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ documentText }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to grade document");
			}

			const data = await response.json();
			setResult(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = () => {
		if (result?.rewrittenDocument) {
			navigator.clipboard.writeText(result.rewrittenDocument);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const handleReset = () => {
		setDocumentText("");
		setResult(null);
		setError(null);
		setCopied(false);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = async (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);

		const files = Array.from(e.dataTransfer.files);
		if (files.length > 0) {
			const file = files[0];
			// Only accept text files
			if (
				file.type === "text/plain" ||
				file.name.endsWith(".txt") ||
				file.name.endsWith(".md")
			) {
				const text = await file.text();
				setDocumentText(text);
			} else {
				setError("Please drop a text file (.txt or .md)");
			}
		}
	};

	return (
		<div>
			{/* Loading State */}
			{loading && <LoadingState />}

			{/* Input Section */}
			{!result && !loading ? (
				<div>
					<form onSubmit={handleSubmit} className="space-y-4">
						<FileDropZone
							documentText={documentText}
							isDragging={isDragging}
							loading={loading}
							onTextChange={setDocumentText}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						/>

						<div className="flex justify-end">
							<button
								type="submit"
								disabled={loading || !documentText.trim()}
								className="inline-flex items-center gap-2 px-8 py-3 bg-klaviyo-poppy text-white font-bold text-base rounded-xl hover:bg-red-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
							>
								{loading ? (
									<>
										<SpinnerIcon className="animate-spin h-5 w-5" />
										Analyzing...
									</>
								) : (
									<>
										Check Quality
										<ArrowRightIcon className="w-5 h-5" />
									</>
								)}
							</button>
						</div>
					</form>

					{/* Chunk Preview - shows issues before submission */}
					{documentText && !loading && (
						<div className="mt-6">
							<ChunkPreview documentText={documentText} />
						</div>
					)}

					{error && (
						<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
							<ErrorIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
							<div>
								<p className="text-sm font-semibold text-red-900">Error</p>
								<p className="text-sm text-red-700 mt-1">{error}</p>
							</div>
						</div>
					)}
				</div>
			) : result ? (
				/* Results Section */
				<div className="space-y-6 animate-fadeIn">
					{/* Collapsed Feedback (Score + Suggestions) */}
					<CollapsedFeedback
						grade={result.grade}
						suggestions={result.suggestions}
					/>

					{/* Improved Document with Chunk Preview */}
					<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
						<div className="mb-4">
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								Your Optimized Content
							</h2>
							<p className="text-gray-600 text-sm">
								Improved for better AI retrieval and complete answers
							</p>
						</div>

						{/* Improved Content */}
						<div className="bg-gray-50 rounded-xl p-6 mb-6">
							<pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed text-sm">
								{result.rewrittenDocument}
							</pre>
						</div>

						{/* Chunk Preview for Improved Document */}
						<div className="mb-6">
							<ChunkPreview documentText={result.rewrittenDocument} />
						</div>

						{/* Action Buttons */}
						<div className="flex items-center justify-between pt-4 border-t border-gray-200">
							<button
								type="button"
								onClick={handleReset}
								className="inline-flex items-center gap-2 px-5 py-2.5 text-gray-700 font-semibold text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
							>
								<ArrowLeftIcon className="w-4 h-4" />
								Check Another
							</button>
							<button
								type="button"
								onClick={handleCopy}
								className="inline-flex items-center gap-2 px-8 py-3 bg-klaviyo-poppy text-white font-bold text-base rounded-xl hover:bg-red-500 transition-all duration-200 shadow-lg hover:shadow-xl"
							>
								{copied ? (
									<>
										<CheckIcon className="w-5 h-5" />
										Copied!
									</>
								) : (
									<>
										Copy Content
										<CopyIcon className="w-5 h-5" />
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
