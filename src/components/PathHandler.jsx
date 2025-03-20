"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// This component can be added to your layout to provide similar functionality
// to what the middleware was doing, but client-side
export default function PathHandler() {
	const pathname = usePathname();

	useEffect(() => {
		// You can access the current path here and perform any logic
		// that was previously in the middleware
		console.log("Current path:", pathname);

		// Example: store the path in localStorage if needed
		localStorage.setItem("lastPath", pathname);

		// You can also set data attributes on the document for CSS selectors
		document.documentElement.dataset.pathname = pathname;
	}, [pathname]);

	// This component doesn't render anything
	return null;
}

// Usage:
// Add this component to your layout:
// import PathHandler from '@/components/PathHandler';
//
// function RootLayout({ children }) {
//   return (
//     <html>
//       <body>
//         <PathHandler />
//         {children}
//       </body>
//     </html>
//   );
// }
