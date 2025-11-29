"use client";

import { UploadIcon } from "../icons/Icons";

interface FileDropZoneProps {
	documentText: string;
	isDragging: boolean;
	loading: boolean;
	onTextChange: (text: string) => void;
	onDragOver: (e: React.DragEvent) => void;
	onDragLeave: (e: React.DragEvent) => void;
	onDrop: (e: React.DragEvent) => void;
}

export function FileDropZone({
	documentText,
	isDragging,
	loading,
	onTextChange,
	onDragOver,
	onDragLeave,
	onDrop,
}: FileDropZoneProps) {
	return (
		<div
			className={`relative bg-white rounded-2xl border-2 shadow-lg transition-all ${
				isDragging
					? "border-klaviyo-poppy border-dashed bg-klaviyo-poppy/5 scale-[1.02]"
					: documentText
						? "border-gray-200"
						: "border-dashed border-gray-300 hover:border-klaviyo-violet"
			}`}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
		>
			{!documentText && !loading && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
					<div className="text-center px-6">
						<UploadIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
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
						<UploadIcon className="w-24 h-24 text-klaviyo-poppy mx-auto mb-3 animate-bounce" />
						<p className="text-2xl font-bold text-klaviyo-poppy">Drop it!</p>
					</div>
				</div>
			)}

			<textarea
				id="document"
				value={documentText}
				onChange={(e) => onTextChange(e.target.value)}
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
			</div>
		</div>
	);
}
