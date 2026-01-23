import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Error boundary specifically for the Galaxy/WebGL background.
 * If the 3D scene crashes, this ensures the rest of the page still renders.
 */
class GalaxyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error for debugging
    console.warn('[GalaxyErrorBoundary] WebGL/Three.js error caught:', error.message);
    console.warn('[GalaxyErrorBoundary] Component stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise render nothing
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

export default GalaxyErrorBoundary;
