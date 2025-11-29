"use client";

import { useState } from "react";

export function HowItWorksSidebar() {
	const [activeExample, setActiveExample] = useState<"problem" | "solution">(
		"problem",
	);

	return (
		<div className="space-y-4">
			{/* Title */}
			<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
				<h2 className="text-lg font-bold text-gray-900 mb-1">
					How Chunking Works
				</h2>
				<p className="text-xs text-gray-600">
					Understanding how your AI reads content
				</p>
			</div>

			{/* The Process - Compact */}
			<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
				<div className="flex items-start gap-3">
					<div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
						<span className="text-blue-600 font-bold text-sm">1</span>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 text-sm">
							Split Sentences
						</h3>
						<p className="text-xs text-gray-600 mt-1">
							Line breaks and periods create boundaries
						</p>
					</div>
				</div>

				<div className="flex items-start gap-3">
					<div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
						<span className="text-purple-600 font-bold text-sm">2</span>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 text-sm">
							Group into 6
						</h3>
						<p className="text-xs text-gray-600 mt-1">
							Every 6 sentences = 1 chunk
						</p>
					</div>
				</div>

				<div className="flex items-start gap-3">
					<div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
						<span className="text-green-600 font-bold text-sm">3</span>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 text-sm">
							Retrieve Top 5
						</h3>
						<p className="text-xs text-gray-600 mt-1">
							Only 5 chunks per query
						</p>
					</div>
				</div>
			</div>

			{/* Example Toggle */}
			<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
				<div className="flex gap-2 mb-4">
					<button
						onClick={() => setActiveExample("problem")}
						className={`flex-1 px-3 py-2 rounded-lg font-semibold text-xs transition-all ${
							activeExample === "problem"
								? "bg-red-500 text-white shadow-sm"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}
					>
						❌ Problem
					</button>
					<button
						onClick={() => setActiveExample("solution")}
						className={`flex-1 px-3 py-2 rounded-lg font-semibold text-xs transition-all ${
							activeExample === "solution"
								? "bg-green-500 text-white shadow-sm"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}
					>
						✅ Fixed
					</button>
				</div>

				{activeExample === "problem" ? (
					<div className="space-y-3">
						<div className="bg-red-50 border border-red-200 rounded-lg p-3">
							<div className="text-xs font-bold text-red-600 mb-2">CHUNK 1</div>
							<div className="text-xs text-gray-700 space-y-0.5 font-mono leading-relaxed">
								<div>Shipping Policy</div>
								<div>Ground Shipping</div>
								<div>Delivery in 5-7 days.</div>
								<div>Cost is $5.99.</div>
								<div>Free over $50.</div>
								<div className="text-red-600 font-bold">Express Shipping</div>
							</div>
						</div>
						<div className="bg-red-50 border border-red-200 rounded-lg p-3">
							<div className="text-xs font-bold text-red-600 mb-2">CHUNK 2</div>
							<div className="text-xs text-gray-700 space-y-0.5 font-mono leading-relaxed">
								<div className="text-red-600">
									Delivery in 2-3 days. ← No context!
								</div>
								<div>Cost is $15.99.</div>
							</div>
						</div>
						<p className="text-xs text-red-900 bg-red-100 rounded p-2">
							<strong>Issue:</strong> "Express Shipping" header orphaned from
							details
						</p>
					</div>
				) : (
					<div className="space-y-3">
						<div className="bg-green-50 border border-green-200 rounded-lg p-3">
							<div className="text-xs font-bold text-green-600 mb-2">
								CHUNK 1
							</div>
							<div className="text-xs text-gray-700 space-y-0.5 font-mono leading-relaxed">
								<div>Shipping Policy</div>
								<div className="text-green-600 font-bold">
									Ground: 5-7 days.
								</div>
								<div>$5.99 (free over $50).</div>
								<div className="text-green-600 font-bold">
									Express: 2-3 days.
								</div>
								<div>Cost is $15.99.</div>
							</div>
						</div>
						<p className="text-xs text-green-900 bg-green-100 rounded p-2">
							<strong>Fixed:</strong> Method names inline with details
						</p>
					</div>
				)}
			</div>

			{/* What We Check */}
			<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
				<h3 className="font-bold text-gray-900 mb-3 text-sm">
					We'll Check For:
				</h3>
				<div className="space-y-2.5">
					<div className="flex items-start gap-2">
						<div className="flex-shrink-0 w-5 h-5 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-xs font-bold">
							1
						</div>
						<p className="text-xs text-gray-700">Orphaned headers</p>
					</div>
					<div className="flex items-start gap-2">
						<div className="flex-shrink-0 w-5 h-5 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-xs font-bold">
							2
						</div>
						<p className="text-xs text-gray-700">Info split across 6+ chunks</p>
					</div>
					<div className="flex items-start gap-2">
						<div className="flex-shrink-0 w-5 h-5 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-xs font-bold">
							3
						</div>
						<p className="text-xs text-gray-700">Bullet lists & tables</p>
					</div>
					<div className="flex items-start gap-2">
						<div className="flex-shrink-0 w-5 h-5 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-xs font-bold">
							4
						</div>
						<p className="text-xs text-gray-700">Missing context in chunks</p>
					</div>
				</div>
			</div>
		</div>
	);
}
