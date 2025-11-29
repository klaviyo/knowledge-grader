"use client";

import { useState } from "react";
import type { Suggestion } from "@/lib/schemas/docGrader";

interface CollapsedFeedbackProps {
	grade: number;
	suggestions: Suggestion[];
}

export function CollapsedFeedback({
	grade,
	suggestions,
}: CollapsedFeedbackProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const getColorClass = () => {
		if (grade >= 90) return "text-green-600 bg-green-50 border-green-200";
		if (grade >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
		if (grade >= 70) return "text-blue-600 bg-blue-50 border-blue-200";
		if (grade >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
		return "text-orange-600 bg-orange-50 border-orange-200";
	};

	const getLabel = () => {
		if (grade >= 90) return "Outstanding";
		if (grade >= 80) return "Excellent";
		if (grade >= 70) return "Good";
		if (grade >= 60) return "Fair";
		return "Needs Work";
	};

	return (
		<div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
			>
				<div className="flex items-center gap-6">
					{/* Score Badge */}
					<div
						className={`w-20 h-20 rounded-xl border-2 ${getColorClass()} flex flex-col items-center justify-center`}
					>
						<div className="text-3xl font-bold">{grade}</div>
						<div className="text-xs font-semibold opacity-60">/ 100</div>
					</div>

					{/* Summary */}
					<div className="text-left">
						<h3 className="text-xl font-bold text-gray-900 mb-1">
							{getLabel()} Quality Score
						</h3>
						<p className="text-sm text-gray-600">
							{suggestions.length === 0
								? "Your content is well-optimized!"
								: `${suggestions.length} improvement${suggestions.length !== 1 ? "s" : ""} suggested`}
						</p>
					</div>
				</div>

				{/* Expand Icon */}
				<svg
					className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
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

			{/* Expanded Content */}
			{isExpanded && suggestions.length > 0 && (
				<div className="px-8 pb-8 border-t border-gray-100">
					<div className="space-y-4 mt-6">
						{suggestions.map((suggestion, index) => (
							<div
								key={index}
								className="bg-gray-50 rounded-xl p-5 border border-gray-200"
							>
								<div className="flex items-start gap-3 mb-3">
									<span className="flex-shrink-0 w-7 h-7 rounded-full bg-klaviyo-poppy text-white flex items-center justify-center text-sm font-bold">
										{index + 1}
									</span>
									<div className="flex-1">
										<h4 className="font-bold text-gray-900 mb-2">
											{suggestion.category}
										</h4>
										<div className="space-y-3">
											<div>
												<p className="text-xs font-bold text-red-600 uppercase mb-1">
													Issue:
												</p>
												<p className="text-sm text-gray-700">
													{suggestion.issue}
												</p>
											</div>
											<div>
												<p className="text-xs font-bold text-green-600 uppercase mb-1">
													Fix:
												</p>
												<p className="text-sm text-gray-700">
													{suggestion.fix}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
