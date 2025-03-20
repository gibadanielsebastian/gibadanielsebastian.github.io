"use client";
import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Dynamic imports with lazy loading
const Hero = lazy(() => import("@/components/pages/Hero"));
const About = lazy(() => import("@/components/pages/About"));
const Portfolio = lazy(() => import("@/components/pages/Portofolio"));
const Contact = lazy(() => import("@/components/pages/Contact"));

// Loading component
function PageLoader() {
	return (
		<div className="flex justify-center items-center w-full h-full min-h-[50vh]">
			<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
}

export default function ClientContent() {
	const [currentHash, setCurrentHash] = useState("");
	const [prevHash, setPrevHash] = useState("");
	const [isScrolling, setIsScrolling] = useState(false);

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

	// Mouse wheel scrolling
	useEffect(() => {
		// Define the scroll handler
		const handleScroll = (e) => {
			// Prevent default scroll
			e.preventDefault();

			if (isScrolling) return;

			setIsScrolling(true);

			const currentIndex = sections.indexOf(currentHash);
			const effectiveIndex = currentIndex !== -1 ? currentIndex : 0;

			// Determine scroll direction
			const scrollDirection = e.deltaY > 0 ? 1 : -1;

			// Calculate new index
			let newIndex = effectiveIndex + scrollDirection;

			// Keep index within bounds
			newIndex = Math.max(0, Math.min(sections.length - 1, newIndex));

			// Only change if we're moving to a different section
			if (newIndex !== effectiveIndex) {
				// Update the URL hash which will trigger the hashchange event
				const newHash = newIndex === 0 ? "" : sections[newIndex];
				window.location.hash = newHash;

				console.log("Scrolling to section:", newHash || "home");
			}

			// Debounce scrolling to prevent rapid changes
			setTimeout(() => {
				setIsScrolling(false);
			}, 800); // Adjust timing based on your transition duration
		};

		// Add wheel event listener for scroll
		window.addEventListener("wheel", handleScroll, { passive: false });

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, [currentHash, isScrolling, sections]);

	// Touch support for mobile devices
	useEffect(() => {
		let touchStartY = 0;
		const touchThreshold = 50; // Minimum swipe distance to trigger page change

		const handleTouchStart = (e) => {
			touchStartY = e.touches[0].clientY;
		};

		const handleTouchEnd = (e) => {
			if (isScrolling) return;

			const touchEndY = e.changedTouches[0].clientY;
			const touchDiff = touchEndY - touchStartY;

			// Only proceed if swipe is long enough
			if (Math.abs(touchDiff) < touchThreshold) return;

			setIsScrolling(true);

			const currentIndex = sections.indexOf(currentHash);
			const effectiveIndex = currentIndex !== -1 ? currentIndex : 0;

			// Determine swipe direction (negative for swipe up, positive for swipe down)
			const swipeDirection = touchDiff < 0 ? 1 : -1;

			// Calculate new index
			let newIndex = effectiveIndex + swipeDirection;

			// Keep index within bounds
			newIndex = Math.max(0, Math.min(sections.length - 1, newIndex));

			// Only change if we're moving to a different section
			if (newIndex !== effectiveIndex) {
				// Update the URL hash which will trigger the hashchange event
				const newHash = newIndex === 0 ? "" : sections[newIndex];
				window.location.hash = newHash;

				console.log("Swiping to section:", newHash || "home");
			}

			// Debounce to prevent rapid changes
			setTimeout(() => {
				setIsScrolling(false);
			}, 800);
		};

		// Add touch event listeners
		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [currentHash, isScrolling, sections]);

	// Logging for debugging
	useEffect(() => {
		console.log("Current section:", currentHash || "home");
	}, [currentHash]);

	// Animation variants for page transitions
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
		const hashOrder = ["", "about", "portofolio", "contact"];
		const prevIndex = hashOrder.indexOf(prevHash);
		const currentIndex = hashOrder.indexOf(currentHash);
		return currentIndex > prevIndex ? 1 : -1;
	};

	// Render content based on hash
	const renderContent = () => {
		const direction = getDirection();

		return (
			<AnimatePresence mode="wait" custom={direction}>
				<motion.div
					key={currentHash || "home"}
					custom={direction}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					className="w-full min-h-[50vh]"
				>
					<Suspense fallback={<PageLoader />}>
						{getComponentForHash(currentHash)}
					</Suspense>
				</motion.div>
			</AnimatePresence>
		);
	};

	// Helper function to get the component for current hash
	const getComponentForHash = (hash) => {
		switch (hash) {
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

	return renderContent();
}
