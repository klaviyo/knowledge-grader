import { DocGraderForm } from "@/components/doc-grader/DocGraderForm";

export default function DocGraderPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Minimal Header */}
			<div className="container mx-auto px-6 py-8 max-w-4xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Check Your Knowledge Base Quality
					</h1>
					<p className="text-gray-600">
						Get instant AI feedback and improvements for better customer service
						answers
					</p>
				</div>

				{/* Main Content */}
				<DocGraderForm />
			</div>
		</div>
	);
}
