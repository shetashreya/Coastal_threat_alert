import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import AlertStatusIndicator from './AlertStatusIndicator';

const NavigationBar = ({ 
  isCollapsed = false, 
  onToggleCollapse,
  user = { name: 'Emergency Coordinator', role: 'admin', avatar: null },
  alertStatus = { level: 'normal', count: 0 }
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/main-dashboard',
      icon: 'LayoutDashboard',
      description: 'Central command center'
    },
    {
      label: 'Analytics',
      path: '/environmental-data-analytics',
      icon: 'BarChart3',
      description: 'Environmental data analysis'
    },
    {
      label: 'Alerts',
      path: '/alert-management',
      icon: 'AlertTriangle',
      description: 'Alert coordination'
    },
    {
      label: 'Community',
      path: '/community-alert-center',
      icon: 'Users',
      description: 'Community notifications'
    },
    {
      label: 'Admin',
      path: '/system-administration',
      icon: 'Settings',
      description: 'System configuration',
      roles: ['admin', 'super_admin']
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    !item?.roles || item?.roles?.includes(user?.role)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-sm">
                  <Icon 
                    name="Shield" 
                    size={20} 
                    color="white" 
                    className="drop-shadow-sm"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                    CoastalGuard Pro
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    Emergency Management
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {filteredNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActivePath(item?.path) 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  title={item?.description}
                  aria-current={isActivePath(item?.path) ? 'page' : undefined}
                >
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    className="mr-2" 
                  />
                  <span>{item?.label}</span>
                </button>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Alert Status Indicator */}
              <AlertStatusIndicator 
                level={alertStatus?.level}
                count={alertStatus?.count}
                className="hidden sm:flex"
                onStatusClick={() => handleNavigation('/alert-management')}
              />

              {/* User Profile Dropdown */}
              <UserProfileDropdown user={user} />

              {/* Mobile Menu Button */}
              <button
                onClick={handleMobileMenuToggle}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <Icon 
                  name={isMobileMenuOpen ? "X" : "Menu"} 
                  size={20} 
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-4 py-3 space-y-2">
              {/* Quick Dashboard Access */}
              <button
                onClick={() => handleNavigation('/main-dashboard')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActivePath('/main-dashboard') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <Icon name="LayoutDashboard" size={18} className="mr-3" />
                <div className="flex-1">
                  <span className="font-medium">Dashboard</span>
                  <p className="text-xs text-gray-500 mt-1">Central command center</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Quick Access
                </span>
              </button>

              {/* Alert Status for Mobile */}
              <div className="px-4 py-3 border-t border-gray-200">
                <AlertStatusIndicator 
                  level={alertStatus?.level}
                  count={alertStatus?.count}
                  showLabel={true}
                  onStatusClick={() => handleNavigation('/alert-management')}
                />
              </div>

              {/* Other Navigation Items */}
              <div className="border-t border-gray-200 pt-2 space-y-1">
                {filteredNavItems?.filter(item => item?.path !== '/main-dashboard')?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActivePath(item?.path) 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    <Icon name={item?.icon} size={18} className="mr-3" />
                    <div className="flex-1">
                      <span className="font-medium">{item?.label}</span>
                      <p className="text-xs text-gray-500 mt-1">{item?.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default NavigationBar;