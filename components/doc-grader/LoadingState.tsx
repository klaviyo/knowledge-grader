"use client";

import { useEffect, useState } from "react";

const loadingSteps = [
	{ icon: "📖", message: "Reading your content..." },
	{ icon: "✂️", message: "Breaking into chunks..." },
	{ icon: "🔍", message: "Analyzing structure..." },
	{ icon: "🤖", message: "Generating improvements..." },
	{ icon: "✨", message: "Finalizing results..." },
];

export function LoadingState() {
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12">
			<div className="max-w-md mx-auto text-center">
				{/* Animated Icon */}
				<div className="relative mb-8">
					<div className="w-24 h-24 mx-auto bg-gradient-to-br from-klaviyo-violet to-klaviyo-poppy rounded-full flex items-center justify-center animate-pulse">
						<span className="text-5xl animate-bounce">
							{loadingSteps[currentStep].icon}
						</span>
					</div>
					<div
						className="absolute inset-0 w-24 h-24 mx-auto border-4 border-klaviyo-poppy rounded-full animate-spin"
						style={{
							borderTopColor: "transparent",
							borderRightColor: "transparent",
						}}
					></div>
				</div>

				{/* Current Step Message */}
				<h3 className="text-2xl font-bold text-gray-900 mb-2 transition-all duration-300">
					{loadingSteps[currentStep].message}
				</h3>
				<p className="text-gray-500 mb-8">This usually takes 15-30 seconds</p>

				{/* Progress Steps */}
				<div className="flex justify-center gap-2">
					{loadingSteps.map((_step, index) => (
						<div
							key={index}
							className={`h-1.5 rounded-full transition-all duration-300 ${
								index <= currentStep
									? "bg-klaviyo-poppy w-12"
									: "bg-gray-200 w-8"
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
