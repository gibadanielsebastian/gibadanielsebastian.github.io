import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import ClientContent from "@/components/ClientContent";
import { Suspense } from "react";

// Loading component for content
function ContentLoader() {
	return (
		<div className="flex justify-center items-center w-full h-full">
			<div className="animate-pulse flex flex-col gap-4 w-3/4 max-w-3xl">
				<div className="h-8 bg-foreground/10 rounded w-3/4"></div>
				<div className="h-4 bg-foreground/10 rounded w-full"></div>
				<div className="h-4 bg-foreground/10 rounded w-full"></div>
				<div className="h-4 bg-foreground/10 rounded w-5/6"></div>
			</div>
		</div>
	);
}

export default function Home() {
	return (
		<div className="relative flex flex-col min-h-screen">
			{/* Navbar */}
			<NavBar />

			{/* Main content - flex-grow to take all available space */}
			<main className="flex-grow flex relative">
				{/* Container for sidebar and content with proper padding */}
				<div className="w-full mx-auto flex">
					{/* Left sidebar - fixed width */}
					<div className="w-24 shrink-0">
						<SideBar />
					</div>

					{/* Content area - takes remaining width with proper padding and margins */}
					<div className="flex-grow pl-6 pr-8 pb-12">
						<div className="relative h-full flex items-center justify-center">
							{/* Decorative elements */}
							<div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
								{/* Top-left to bottom-right border */}
								<div
									aria-hidden="true"
									className="absolute top-0 left-0 h-px w-64 bg-gradient-to-r from-primary to-transparent blur-[1px]"
								></div>
								<div
									aria-hidden="true"
									className="absolute top-0 left-0 h-64 w-px bg-gradient-to-b from-primary to-transparent blur-[1px]"
								></div>

								{/* Bottom-right to top-left border */}
								<div
									aria-hidden="true"
									className="absolute right-0 bottom-0 h-px w-64 bg-gradient-to-l from-primary to-transparent blur-[1px]"
								></div>
								<div
									aria-hidden="true"
									className="absolute right-0 bottom-0 h-64 w-px bg-gradient-to-t from-primary to-transparent blur-[1px]"
								></div>
							</div>

							{/* Actual content container with max-width for readability */}
							<div className="w-full max-w-4xl py-12">
								<Suspense fallback={<ContentLoader />}>
									<ClientContent />
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Footer - no flex-grow so it stays at the bottom */}
			<Footer />
		</div>
	);
}
