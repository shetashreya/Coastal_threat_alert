import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLanguageChange, currentLanguage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    'admin@coastalguard.gov': {
      password: 'Admin123!',
      role: 'admin',
      name: 'Emergency Coordinator',
      department: 'Emergency Management'
    },
    'scientist@coastal.research': {
      password: 'Science456!',
      role: 'analyst',
      name: 'Dr. Sarah Chen',
      department: 'Environmental Sciences'
    },
    'resident@community.local': {
      password: 'Community789!',
      role: 'viewer',
      name: 'Michael Rodriguez',
      department: 'Community Member'
    },
    'authority@municipal.gov': {
      password: 'Authority012!',
      role: 'coordinator',
      name: 'Captain James Wilson',
      department: 'Local Authority'
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      const user = mockCredentials?.[formData?.email];
      
      if (user && user?.password === formData?.password) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          email: formData?.email,
          name: user?.name,
          role: user?.role,
          department: user?.department,
          loginTime: new Date()?.toISOString()
        }));
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Redirect to main dashboard
        navigate('/main-dashboard');
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // In a real app, this would navigate to password reset
  };

  const handleCreateAccount = () => {
    console.log('Create account clicked');
    // In a real app, this would navigate to registration
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const text = {
    en: {
      signIn: 'Sign In',
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me for 30 days',
      forgotPassword: 'Forgot your password?',
      createAccount: 'Need an account? Create one here',
      signingIn: 'Signing in...',
      emailPlaceholder: 'Enter your email address',
      passwordPlaceholder: 'Enter your password',
      showPassword: 'Show password',
      hidePassword: 'Hide password'
    },
    es: {
      signIn: 'Iniciar Sesión',
      email: 'Dirección de Correo',
      password: 'Contraseña',
      rememberMe: 'Recordarme por 30 días',
      forgotPassword: '¿Olvidaste tu contraseña?',
      createAccount: '¿Necesitas una cuenta? Crea una aquí',
      signingIn: 'Iniciando sesión...',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      passwordPlaceholder: 'Ingresa tu contraseña',
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña'
    }
  };

  const t = text?.[currentLanguage] || text?.en;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={20} className="text-red-600" />
              <p className="text-sm text-red-800">{errors?.general}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label={t?.email}
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder={t?.emailPlaceholder}
            error={errors?.email}
            required
            disabled={isLoading}
            className="w-full"
          />

          <div className="relative">
            <Input
              label={t?.password}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder={t?.passwordPlaceholder}
              error={errors?.password}
              required
              disabled={isLoading}
              className="w-full pr-12"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground"
              title={showPassword ? t?.hidePassword : t?.showPassword}
            >
              <Icon 
                name={showPassword ? "EyeOff" : "Eye"} 
                size={20} 
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label={t?.rememberMe}
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName={isLoading ? "Loader2" : "Shield"}
          iconPosition="left"
        >
          {isLoading ? t?.signingIn : t?.signIn}
        </Button>

        <div className="space-y-3 text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 font-medium focus:outline-none focus:underline"
            disabled={isLoading}
          >
            {t?.forgotPassword}
          </button>
          
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-sm text-muted-foreground hover:text-foreground font-medium focus:outline-none focus:underline"
            disabled={isLoading}
          >
            {t?.createAccount}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;