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
			{/* Navbar - fixed position */}
			<NavBar />

			{/* Sidebar for larger screens */}
			<SideBar />

			{/* Main content - adjusted padding to account for fixed navbar */}
			<main className="flex-grow flex relative pt-16 md:pt-20">
				{/* Container for content with proper padding */}
				<div className="w-full mx-auto flex">
					{/* Content area with proper left padding for lg screens */}
					<div className="flex-grow px-4 xs:pl-4 xs:pr-6 md:pl-6 md:pr-8 lg:pl-16 pb-12">
						<div className="relative h-full flex items-center justify-center">
							{/* Decorative elements */}
							<div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
								{/* Top-left to bottom-right border */}
								<div
									aria-hidden="true"
									className="absolute top-0 left-0 h-px w-32 sm:w-48 md:w-64 bg-gradient-to-r from-primary to-transparent blur-[1px]"
								></div>
								<div
									aria-hidden="true"
									className="absolute top-0 left-0 h-32 sm:h-48 md:h-64 w-px bg-gradient-to-b from-primary to-transparent blur-[1px]"
								></div>

								{/* Bottom-right to top-left border */}
								<div
									aria-hidden="true"
									className="absolute right-0 bottom-0 h-px w-32 sm:w-48 md:w-64 bg-gradient-to-l from-primary to-transparent blur-[1px]"
								></div>
								<div
									aria-hidden="true"
									className="absolute right-0 bottom-0 h-32 sm:h-48 md:h-64 w-px bg-gradient-to-t from-primary to-transparent blur-[1px]"
								></div>
							</div>

							{/* Actual content container with max-width for readability */}
							<div className="w-full max-w-4xl py-6 md:py-12">
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
