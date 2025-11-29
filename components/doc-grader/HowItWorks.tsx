"use client";

import { useState } from "react";

export function HowItWorks() {
	const [activeTab, setActiveTab] = useState<"problem" | "solution">("problem");

	return (
		<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
			<h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
				How Your AI Agent Reads Content
			</h2>
			<p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
				Understanding the chunking system helps you write better content. Here's
				what happens behind the scenes:
			</p>

			{/* The Process */}
			<div className="grid md:grid-cols-3 gap-6 mb-10">
				<div className="text-center">
					<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-8 h-8 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					<h3 className="font-semibold text-gray-900 mb-2">
						1. Split into Sentences
					</h3>
					<p className="text-sm text-gray-600">
						Each line break or period creates a new "sentence" boundary
					</p>
				</div>

				<div className="text-center">
					<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-8 h-8 text-purple-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
							/>
						</svg>
					</div>
					<h3 className="font-semibold text-gray-900 mb-2">
						2. Group into Chunks
					</h3>
					<p className="text-sm text-gray-600">
						Every 6 sentences become one searchable chunk
					</p>
				</div>

				<div className="text-center">
					<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-8 h-8 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<h3 className="font-semibold text-gray-900 mb-2">
						3. Retrieve Top 5
					</h3>
					<p className="text-sm text-gray-600">
						Only the 5 most relevant chunks are used to answer each question
					</p>
				</div>
			</div>

			{/* Example Toggle */}
			<div className="border-t border-gray-200 pt-8">
				<div className="flex items-center justify-center gap-2 mb-6">
					<button
						onClick={() => setActiveTab("problem")}
						className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
							activeTab === "problem"
								? "bg-red-500 text-white shadow-sm"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}
					>
						❌ Common Problem
					</button>
					<button
						onClick={() => setActiveTab("solution")}
						className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
							activeTab === "solution"
								? "bg-green-500 text-white shadow-sm"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}
					>
						✅ Optimized Version
					</button>
				</div>

				{activeTab === "problem" ? (
					<div className="bg-red-50 border border-red-200 rounded-xl p-6">
						<h4 className="font-bold text-red-900 mb-4 flex items-center gap-2">
							<span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">
								!
							</span>
							Orphaned Headers = Incomplete Answers
						</h4>
						<div className="space-y-3">
							<div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
								<div className="text-xs font-bold text-red-600 mb-2">
									CHUNK 1 (6 sentences)
								</div>
								<div className="text-sm text-gray-700 space-y-1 font-mono">
									<div>Shipping Policy</div>
									<div>Ground Shipping</div>
									<div>Delivery in 5-7 days.</div>
									<div>Cost is $5.99.</div>
									<div>Free over $50.</div>
									<div className="text-red-600 font-bold">
										Express Shipping ← Orphaned!
									</div>
								</div>
							</div>
							<div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
								<div className="text-xs font-bold text-red-600 mb-2">
									CHUNK 2 (6 sentences)
								</div>
								<div className="text-sm text-gray-700 space-y-1 font-mono">
									<div>Delivery in 2-3 days. ← Missing context!</div>
									<div>Cost is $15.99.</div>
									<div>Return Policy</div>
									<div>30-day window.</div>
									<div>Items must be unused.</div>
									<div>Refunds in 5-7 days.</div>
								</div>
							</div>
							<div className="bg-red-100 rounded-lg p-4">
								<p className="text-sm text-red-900">
									<strong>Problem:</strong> When someone asks "How much is
									express shipping?", the AI might retrieve Chunk 2 which says
									"Delivery in 2-3 days. Cost is $15.99" without the "Express
									Shipping" context, leading to confusion or wrong answers.
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="bg-green-50 border border-green-200 rounded-xl p-6">
						<h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
							<span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
								✓
							</span>
							Headers Stay With Content
						</h4>
						<div className="space-y-3">
							<div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
								<div className="text-xs font-bold text-green-600 mb-2">
									CHUNK 1 (6 sentences)
								</div>
								<div className="text-sm text-gray-700 space-y-1 font-mono">
									<div>Shipping Policy</div>
									<div className="text-green-600 font-bold">
										Ground Shipping: Delivery in 5-7 days.
									</div>
									<div>Cost is $5.99 (free over $50).</div>
									<div className="text-green-600 font-bold">
										Express Shipping: Delivery in 2-3 days.
									</div>
									<div>Cost is $15.99 for all orders.</div>
									<div>Return Policy</div>
								</div>
							</div>
							<div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
								<div className="text-xs font-bold text-green-600 mb-2">
									CHUNK 2 (continues...)
								</div>
								<div className="text-sm text-gray-700 space-y-1 font-mono">
									<div>Items can be returned within 30 days.</div>
									<div>Items must be unused...</div>
									<div>Refunds processed in 5-7 days.</div>
								</div>
							</div>
							<div className="bg-green-100 rounded-lg p-4">
								<p className="text-sm text-green-900">
									<strong>Solution:</strong> By putting shipping method names
									inline with their details ("Ground Shipping: Delivery in 5-7
									days"), everything stays together in one chunk. Now the AI
									always has complete, accurate information to answer questions.
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Key Takeaways */}
			<div className="mt-8 bg-gray-50 rounded-xl p-6">
				<h4 className="font-bold text-gray-900 mb-4">What We'll Check For:</h4>
				<div className="grid md:grid-cols-2 gap-4">
					<div className="flex items-start gap-3">
						<div className="flex-shrink-0 w-6 h-6 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-xs font-bold">
							1
						</div>
						<div>
							<p className="font-semibold text-gray-900 text-sm">
								Headers separated from content
							</p>
							<p className="text-xs text-gray-600">
								We'll flag any headers that end up alone in chunks
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex-shrink-0 w-6 h-6 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-xs font-bold">
							2
						</div>
						<div>
							<p className="font-semibold text-gray-900 text-sm">
								Info split across too many chunks
							</p>
							<p className="text-xs text-gray-600">
								Remember: only 5 chunks retrieved per question
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex-shrink-0 w-6 h-6 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-xs font-bold">
							3
						</div>
						<div>
							<p className="font-semibold text-gray-900 text-sm">
								Bullet points and tables
							</p>
							<p className="text-xs text-gray-600">
								Each line becomes a sentence—recommend prose instead
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex-shrink-0 w-6 h-6 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-xs font-bold">
							4
						</div>
						<div>
							<p className="font-semibold text-gray-900 text-sm">
								Missing context in chunks
							</p>
							<p className="text-xs text-gray-600">
								Each chunk should make sense on its own
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
