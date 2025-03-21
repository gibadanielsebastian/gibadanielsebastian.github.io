"use client";
import { instrumentSans } from "@/app/fonts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
	const [isClient, setIsClient] = useState(false);

	// Initialize animation only on client-side to prevent hydration mismatch
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Hero content
	const content = (
		<div className="max-w-4xl w-full px-2 sm:px-0">
			<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
				Hi, I'm <span className="text-primary">Giba Daniel</span>
			</h1>

			<div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6">
				I'm a <span className="text-primary">Web Developer</span>
			</div>

			<p className="text-base sm:text-lg opacity-80 mb-8 sm:mb-10 max-w-2xl">
				Passionate about creating intuitive and engaging digital experiences
				that combine elegant design with robust functionality.
			</p>

			<div className="flex flex-wrap gap-3 sm:gap-4">
				<Link
					href="#portofolio"
					className="px-4 sm:px-6 py-2 sm:py-3 rounded text-sm sm:text-base font-medium transition-all bg-primary text-background"
					onClick={(e) => {
						e.preventDefault();
						window.location.hash = "portofolio";
					}}
					scroll={false}
				>
					View My Work
				</Link>
				<Link
					href="#contact"
					className="px-4 sm:px-6 py-2 sm:py-3 rounded text-sm sm:text-base font-medium transition-all border-2 border-primary text-foreground hover:bg-primary/10"
					onClick={(e) => {
						e.preventDefault();
						window.location.hash = "contact";
					}}
					scroll={false}
				>
					Get In Touch
				</Link>
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
