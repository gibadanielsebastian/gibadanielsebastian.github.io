"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";

// Direct imports instead of lazy loading
import Hero from "@/components/pages/Hero";
import About from "@/components/pages/About";
import Portfolio from "@/components/pages/Portofolio";
import Contact from "@/components/pages/Contact";

// Loading component
function PageLoader() {
	return (
		<div className="flex justify-center items-center w-full h-full min-h-[50vh]">
			<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
}

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<div className="flex flex-col justify-center items-center w-full h-full min-h-[50vh] p-6 text-center">
			<div className="text-primary text-2xl mb-4">Something went wrong</div>
			<div className="mb-4 text-foreground/70">
				{error.message || "Failed to load content"}
			</div>
			<button
				onClick={resetErrorBoundary}
				className="px-4 py-2 bg-primary text-background rounded-md hover:opacity-90 transition-opacity"
			>
				Try again
			</button>
		</div>
	);
}

export default function ClientContent() {
	const [currentHash, setCurrentHash] = useState("");
	const [prevHash, setPrevHash] = useState("");
	const [isScrolling, setIsScrolling] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Array of all section IDs
	const sections = ["", "about", "portofolio", "contact"];

	// Update current hash when URL changes
	useEffect(() => {
		// Function to update hash
		const updateHash = () => {
			const hash = window.location.hash.substring(1);
			setPrevHash(currentHash);
			setCurrentHash(hash);
		};

		// Set initial hash
		updateHash();

		// Add event listeners
		window.addEventListener("hashchange", updateHash);

		return () => {
			window.removeEventListener("hashchange", updateHash);
		};
	}, [currentHash]);

	// Debounced scroll handler
	const handleScroll = (direction) => {
		if (isScrolling || isLoading) return;

		setIsScrolling(true);

		const currentIndex = sections.indexOf(currentHash);
		const effectiveIndex = currentIndex !== -1 ? currentIndex : 0;

		// Calculate new index
		let newIndex = effectiveIndex + direction;

		// Keep index within bounds
		newIndex = Math.max(0, Math.min(sections.length - 1, newIndex));

		// Only change if we're moving to a different section
		if (newIndex !== effectiveIndex) {
			// Set loading state
			setIsLoading(true);

			// Update the URL hash which will trigger the hashchange event
			const newHash = newIndex === 0 ? "" : sections[newIndex];
			window.location.hash = newHash;

			console.log("Navigating to section:", newHash || "home");
		}

		// Release scrolling lock after animation duration
		setTimeout(() => {
			setIsScrolling(false);
			setIsLoading(false);
		}, 800);
	};

	// Mouse wheel event handler
	useEffect(() => {
		const wheelHandler = (e) => {
			e.preventDefault();
			const direction = e.deltaY > 0 ? 1 : -1;
			handleScroll(direction);
		};

		window.addEventListener("wheel", wheelHandler, { passive: false });

		return () => {
			window.removeEventListener("wheel", wheelHandler);
		};
	}, [currentHash, isScrolling, isLoading]);

	// Touch event handlers for mobile
	useEffect(() => {
		let touchStartY = 0;
		const touchThreshold = 50;

		const handleTouchStart = (e) => {
			touchStartY = e.touches[0].clientY;
		};

		const handleTouchEnd = (e) => {
			const touchEndY = e.changedTouches[0].clientY;
			const touchDiff = touchEndY - touchStartY;

			if (Math.abs(touchDiff) < touchThreshold) return;

			const direction = touchDiff < 0 ? 1 : -1;
			handleScroll(direction);
		};

		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [currentHash, isScrolling, isLoading]);

	// Keyboard navigation
	useEffect(() => {
		const keyHandler = (e) => {
			if (isScrolling || isLoading) return;

			if (e.key === "ArrowDown" || e.key === "ArrowRight") {
				e.preventDefault();
				handleScroll(1);
			} else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
				e.preventDefault();
				handleScroll(-1);
			}
		};

		window.addEventListener("keydown", keyHandler);
		return () => window.removeEventListener("keydown", keyHandler);
	}, [currentHash, isScrolling, isLoading]);

	// Animation variants
	const variants = {
		initial: (direction) => ({
			opacity: 0,
			x: direction > 0 ? 100 : -100,
		}),
		animate: {
			opacity: 1,
			x: 0,
			transition: {
				x: { type: "spring", stiffness: 300, damping: 30 },
				opacity: { duration: 0.4 },
			},
		},
		exit: (direction) => ({
			opacity: 0,
			x: direction > 0 ? -100 : 100,
			transition: {
				x: { type: "spring", stiffness: 300, damping: 30 },
				opacity: { duration: 0.4 },
			},
		}),
	};

	// Determine direction of navigation
	const getDirection = () => {
		const prevIndex = sections.indexOf(prevHash);
		const currentIndex = sections.indexOf(currentHash);
		return currentIndex > prevIndex ? 1 : -1;
	};

	// Render the appropriate component based on the current hash
	const renderComponent = () => {
		switch (currentHash) {
			case "about":
				return <About />;
			case "portofolio":
				return <Portfolio />;
			case "contact":
				return <Contact />;
			default:
				return <Hero />;
		}
	};

	// Get the component key for AnimatePresence
	const getComponentKey = () => currentHash || "home";

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.reload()}
		>
			<AnimatePresence mode="wait" custom={getDirection()}>
				<motion.div
					key={getComponentKey()}
					custom={getDirection()}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					className="w-full min-h-[50vh]"
					onAnimationComplete={() => setIsLoading(false)}
				>
					{isLoading ? <PageLoader /> : renderComponent()}
				</motion.div>
			</AnimatePresence>
		</ErrorBoundary>
	);
}
