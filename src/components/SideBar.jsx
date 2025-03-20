"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
			className="relative h-full flex justify-center"
			role="navigation"
			aria-label="Section navigation"
		>
			{/* Vertical line - make sure it spans the full height */}
			<div
				className="absolute h-full w-0.5"
				style={{
					background: "var(--primary)",
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
						className="absolute"
						style={{
							top: `${position}%`,
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						<motion.div
							initial={false}
							animate={{
								scale: isActive ? 1.2 : 1,
								backgroundColor: isActive
									? "#FFFFFF"
									: "rgba(255, 255, 255, 0.3)",
							}}
							className="w-3 h-3 rounded-full"
							style={{
								border: isActive ? "2px solid var(--primary)" : "none",
							}}
							aria-hidden="true"
						/>
						<span className="sr-only">{`${section.label} section ${
							isActive ? "- current section" : ""
						}`}</span>
					</div>
				);
			})}
		</div>
	);
}
