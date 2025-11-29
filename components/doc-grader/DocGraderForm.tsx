"use client";

import { useState } from "react";
import type { DocGraderOutput } from "@/lib/schemas/docGrader";
import { ChunkPreview } from "./ChunkPreview";
import { CollapsedFeedback } from "./CollapsedFeedback";
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
						{/* Big Drag and Drop Area */}
						<div
							className={`relative bg-white rounded-2xl border-2 shadow-lg transition-all ${
								isDragging
									? "border-klaviyo-poppy border-dashed bg-klaviyo-poppy/5 scale-[1.02]"
									: documentText
										? "border-gray-200"
										: "border-dashed border-gray-300 hover:border-klaviyo-violet"
							}`}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						>
							{!documentText && !loading && (
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
									<div className="text-center px-6">
										<svg
											className="w-20 h-20 text-gray-300 mx-auto mb-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1.5}
												d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
											/>
										</svg>
										<p className="text-xl font-semibold text-gray-400 mb-2">
											Drop your file here
										</p>
										<p className="text-sm text-gray-400">
											or click to type/paste your content
										</p>
										<p className="text-xs text-gray-300 mt-3">
											Accepts .txt and .md files
										</p>
									</div>
								</div>
							)}

							{isDragging && (
								<div className="absolute inset-0 flex items-center justify-center bg-klaviyo-poppy/10 rounded-2xl z-20 pointer-events-none">
									<div className="text-center">
										<svg
											className="w-24 h-24 text-klaviyo-poppy mx-auto mb-3 animate-bounce"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
											/>
										</svg>
										<p className="text-2xl font-bold text-klaviyo-poppy">
											Drop it!
										</p>
									</div>
								</div>
							)}

							<textarea
								id="document"
								value={documentText}
								onChange={(e) => setDocumentText(e.target.value)}
								className="w-full h-[500px] p-8 text-base border-0 focus:ring-0 focus:outline-none resize-none placeholder:text-gray-300 bg-transparent relative z-10"
								placeholder=""
								disabled={loading}
								required
							/>

							<div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
								<span className="text-xs text-gray-400">
									{documentText.length > 0
										? `${documentText.length.toLocaleString()} characters`
										: "Ready for your content"}
								</span>
								<button
									type="submit"
									disabled={loading || !documentText.trim()}
									className="inline-flex items-center gap-2 px-8 py-3 bg-klaviyo-poppy text-white font-bold text-base rounded-xl hover:bg-red-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
								>
									{loading ? (
										<>
											<svg
												className="animate-spin h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Analyzing...
										</>
									) : (
										<>
											Check Quality
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M13 7l5 5m0 0l-5 5m5-5H6"
												/>
											</svg>
										</>
									)}
								</button>
							</div>
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
							<svg
								className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
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
								onClick={handleReset}
								className="inline-flex items-center gap-2 px-5 py-2.5 text-gray-700 font-semibold text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 19l-7-7m0 0l7-7m-7 7h18"
									/>
								</svg>
								Check Another
							</button>
							<button
								onClick={handleCopy}
								className="inline-flex items-center gap-2 px-8 py-3 bg-klaviyo-poppy text-white font-bold text-base rounded-xl hover:bg-red-500 transition-all duration-200 shadow-lg hover:shadow-xl"
							>
								{copied ? (
									<>
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Copied!
									</>
								) : (
									<>
										Copy Content
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
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
