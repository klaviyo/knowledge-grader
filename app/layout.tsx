import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Knowledge Document Grader",
	description: "Improve your AI agent knowledge base with instant feedback",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
