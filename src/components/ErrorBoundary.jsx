"use client";
import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		// Update state to trigger fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		// You can log the error to an error reporting service
		console.error("Component error:", error, errorInfo);
	}

	resetErrorBoundary = () => {
		this.setState({ hasError: false, error: null });
		if (this.props.onReset) {
			this.props.onReset();
		}
	};

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			if (this.props.FallbackComponent) {
				return (
					<this.props.FallbackComponent
						error={this.state.error}
						resetErrorBoundary={this.resetErrorBoundary}
					/>
				);
			}
			return (
				<div className="p-6 text-center">
					<h2 className="text-red-500 mb-2">Something went wrong.</h2>
					<button
						onClick={this.resetErrorBoundary}
						className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
					>
						Try again
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export { ErrorBoundary };
