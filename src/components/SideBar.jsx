"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SideBar() {
	const [activeSection, setActiveSection] = useState("");
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);

		// Get initial hash without the # symbol
		const initialHash = window.location.hash.substring(1);
		setActiveSection(initialHash);

		const handleHashChange = () => {
			const hash = window.location.hash.substring(1);
			setActiveSection(hash);
		};

		// Listen for hash changes
		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	// Sections configuration
	const sections = [
		{ id: "", label: "Home" },
		{ id: "about", label: "About" },
		{ id: "portofolio", label: "Portfolio" },
		{ id: "contact", label: "Contact" },
	];

	// Find active section index
	const activeSectionIndex = Math.max(
		0,
		sections.findIndex((section) => section.id === activeSection)
	);

	return (
		<div
			className="fixed left-8 top-0 bottom-8 w-16 hidden lg:flex items-center"
			aria-hidden={!isClient}
		>
			<div
				className="relative h-3/4 flex justify-center"
				role="navigation"
				aria-label="Section navigation"
			>
				{/* Vertical line - make sure it spans the full height */}
				<div
					className="absolute h-full w-0.5 opacity-70 bg-primary"
					style={{
						left: "50%",
						transform: "translateX(-50%)",
					}}
					aria-hidden="true"
				></div>

				{/* Navigation dots */}
				{sections.map((section, index) => {
					const isActive =
						section.id === activeSection ||
						(section.id === "" && activeSection === "");

					// Calculate vertical position - evenly spaced
					const position = index * (100 / (sections.length - 1));

					return (
						<div
							key={section.id}
							className="absolute z-10"
							style={{
								top: `${position}%`,
								left: "50%",
								transform: "translate(-50%, -50%)",
							}}
						>
							<Link
								href={`#${section.id}`}
								aria-label={`Go to ${section.label} section`}
								onClick={(e) => {
									e.preventDefault();
									window.location.hash = section.id;
								}}
								scroll={false}
							>
								<motion.div
									initial={false}
									animate={{
										scale: isActive ? 1.2 : 1,
										backgroundColor: isActive
											? "#FFFFFF"
											: "rgba(255, 255, 255, 0.3)",
									}}
									className="w-3 h-3 rounded-full cursor-pointer"
									style={{
										border: isActive ? "2px solid var(--primary)" : "none",
										boxShadow: isActive
											? "0 0 8px rgba(98, 255, 0, 0.6)"
											: "none",
									}}
									whileHover={{
										scale: 1.3,
										backgroundColor: "rgba(255, 255, 255, 0.8)",
									}}
									aria-hidden="true"
								/>
							</Link>
							<span className="sr-only">{`${section.label} section ${
								isActive ? "- current section" : ""
							}`}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
