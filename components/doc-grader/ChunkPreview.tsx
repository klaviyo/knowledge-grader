"use client";

import { useEffect, useState } from "react";
import { chunkSentences, splitSentences } from "@/lib/utils/chunking";

interface ChunkPreviewProps {
	documentText: string;
}

export function ChunkPreview({ documentText }: ChunkPreviewProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [chunks, setChunks] = useState<string[][]>([]);

	useEffect(() => {
		if (documentText) {
			const sentences = splitSentences(documentText);
			const chunked = chunkSentences(sentences);
			setChunks(chunked);
		} else {
			setChunks([]);
		}
	}, [documentText]);

	if (!documentText || chunks.length === 0) {
		return null;
	}

	return (
		<div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
			<button
				type="button"
				onClick={() => setIsExpanded(!isExpanded)}
				className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-100 transition-colors"
			>
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-blue-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div className="text-left">
						<p className="font-semibold text-blue-900 text-sm">
							Preview: {chunks.length} chunk{chunks.length !== 1 ? "s" : ""}{" "}
							will be created
						</p>
						<p className="text-xs text-blue-700">
							{chunks.length > 5 ? (
								<span className="font-semibold">
									⚠️ Only up to 5 most relevant chunks retrieved per query
								</span>
							) : (
								"AI retrieves up to 5 most relevant chunks • Click to preview"
							)}
						</p>
					</div>
				</div>
				<svg
					className={`w-5 h-5 text-blue-600 transition-transform ${isExpanded ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			{isExpanded && (
				<div className="px-6 pb-6 space-y-3 max-h-[500px] overflow-y-auto">
					{chunks.map((chunk, chunkIndex) => (
						<div
							key={chunkIndex}
							className={`bg-white rounded-lg p-4 border-l-4 ${
								chunkIndex < 5 ? "border-green-400" : "border-orange-400"
							}`}
						>
							<div className="flex items-center justify-between mb-2">
								<span
									className={`text-xs font-bold ${
										chunkIndex < 5 ? "text-green-600" : "text-orange-600"
									}`}
								>
									CHUNK {chunkIndex + 1} ({chunk.length} sentence
									{chunk.length !== 1 ? "s" : ""})
								</span>
								{chunkIndex >= 5 && (
									<span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded">
										Less likely retrieved
									</span>
								)}
								{chunkIndex < 5 && (
									<span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
										May be retrieved
									</span>
								)}
							</div>
							<div className="space-y-1">
								{chunk.map((sentence, sentenceIndex) => (
									<div
										key={sentenceIndex}
										className="text-sm text-gray-700 font-mono pl-4 border-l-2 border-gray-200"
									>
										<span className="text-gray-400 mr-2">
											{sentenceIndex + 1}.
										</span>
										{sentence}
									</div>
								))}
							</div>
						</div>
					))}

					{chunks.length > 5 && (
						<div className="bg-orange-100 rounded-lg p-4 border border-orange-300">
							<p className="text-sm text-orange-900 font-semibold">
								⚠️ Warning: Your content creates {chunks.length} chunks, but only
								up to 5 most relevant will be retrieved.
							</p>
							<p className="text-xs text-orange-800 mt-2">
								The AI selects the most relevant chunks based on each question.
								However, if related information is split across many chunks,
								some might not be retrieved together. Consider consolidating
								related content (like all shipping methods) into complete
								sections.
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
