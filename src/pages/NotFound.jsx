import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 text-center">
          {/* 404 Icon */}
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Search" size={40} className="text-blue-600" />
          </div>

          {/* Error Code */}
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page not found
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved. Please check the URL or navigate to a different page.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleGoHome}
              iconName="Home"
              iconPosition="left"
              fullWidth
            >
              Go to Dashboard
            </Button>
            
            <Button
              variant="outline"
              onClick={handleGoBack}
              iconName="ArrowLeft"
              iconPosition="left"
              fullWidth
            >
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('/main-dashboard')}
                className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/alert-management')}
                className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200"
              >
                Alerts
              </button>
              <button
                onClick={() => navigate('/environmental-data-analytics')}
                className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200"
              >
                Analytics
              </button>
              <button
                onClick={() => navigate('/community-alert-center')}
                className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200"
              >
                Community
              </button>
            </div>
          </div>

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
};

export default NotFound;
