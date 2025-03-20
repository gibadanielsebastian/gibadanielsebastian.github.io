"use client";
import { instrumentSans } from "@/app/fonts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
	const [isClient, setIsClient] = useState(false);

	// Initialize animation only on client-side to prevent hydration mismatch
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Hero content
	const content = (
		<div className="max-w-4xl w-full">
			<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
				Hi, I'm <span style={{ color: "var(--primary)" }}>Giba Daniel</span>
			</h1>

			<div className="text-xl md:text-2xl lg:text-3xl mb-6">
				I'm a <span style={{ color: "var(--primary)" }}>Web Developer</span>
			</div>

			<p className="text-lg opacity-80 mb-10 max-w-2xl">
				Passionate about creating intuitive and engaging digital experiences
				that combine elegant design with robust functionality.
			</p>

			<div className="flex flex-wrap gap-4">
				<a
					href="#portofolio"
					className="px-6 py-3 rounded font-medium transition-all"
					style={{
						backgroundColor: "var(--primary)",
						color: "var(--background)",
					}}
				>
					View My Work
				</a>
				<a
					href="#contact"
					className="px-6 py-3 rounded font-medium transition-all border-2"
					style={{
						borderColor: "var(--primary)",
						color: "var(--foreground)",
					}}
				>
					Get In Touch
				</a>
			</div>
		</div>
	);

	return (
		<div
			className={`w-full flex items-center justify-start ${instrumentSans.className}`}
		>
			{isClient ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					{content}
				</motion.div>
			) : (
				// Non-animated fallback for SSR
				content
			)}
		</div>
	);
}
