import React from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="AlertTriangle" size={32} className="text-red-600" />
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Something went wrong
              </h1>
              
              {/* Error Message */}
              <p className="text-gray-600 mb-6">
                We encountered an unexpected error. Please try again or contact support if the problem persists.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={this.handleRetry}
                  iconName="RefreshCw"
                  iconPosition="left"
                  fullWidth
                >
                  Try Again
                </Button>
                
                <Button
                  variant="outline"
                  onClick={this.handleReload}
                  iconName="RotateCcw"
                  iconPosition="left"
                  fullWidth
                >
                  Reload Page
                </Button>

                {/* Error Details Toggle */}
                {this.state.error && (
                  <button
                    onClick={this.toggleDetails}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {this.state.showDetails ? 'Hide' : 'Show'} technical details
                  </button>
                )}
              </div>

              {/* Error Details */}
              {this.state.showDetails && this.state.error && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Error Details
                  </h3>
                  <div className="text-xs text-gray-600 space-y-2">
                    <div>
                      <strong>Error:</strong> {this.state.error.toString()}
                    </div>
                    {this.state.errorInfo && this.state.errorInfo.componentStack && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Support Contact */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Need help? Contact{' '}
                  <a 
                    href="mailto:support@coastalguard.gov" 
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    support@coastalguard.gov
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;