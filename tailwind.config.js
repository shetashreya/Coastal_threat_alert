/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* Core System Colors */
        background: 'var(--color-background)', /* slate-50 */
        foreground: 'var(--color-foreground)', /* gray-900 */
        border: 'var(--color-border)', /* gray-200 */
        input: 'var(--color-input)', /* white */
        ring: 'var(--color-ring)', /* blue-800 */
        
        /* Card and Surface Colors */
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)', /* gray-900 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)', /* gray-900 */
        },
        
        /* Muted Colors */
        muted: {
          DEFAULT: 'var(--color-muted)', /* gray-100 */
          foreground: 'var(--color-muted-foreground)', /* gray-500 */
        },
        
        /* Primary Colors - Deep Blue for Trust and Authority */
        primary: {
          DEFAULT: 'var(--color-primary)', /* blue-800 */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        
        /* Secondary Colors - Professional Green for Normal Operations */
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* emerald-600 */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        
        /* Accent Colors - Emergency Red for Critical Alerts */
        accent: {
          DEFAULT: 'var(--color-accent)', /* red-600 */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        
        /* Status Colors */
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-500 */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-600 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        
        /* Emergency Management Specific Colors */
        critical: {
          DEFAULT: 'var(--color-critical)', /* red-600 */
          foreground: 'var(--color-critical-foreground)', /* white */
        },
        high: {
          DEFAULT: 'var(--color-high)', /* amber-500 */
          foreground: 'var(--color-high-foreground)', /* white */
        },
        medium: {
          DEFAULT: 'var(--color-medium)', /* blue-500 */
          foreground: 'var(--color-medium-foreground)', /* white */
        },
        low: {
          DEFAULT: 'var(--color-low)', /* emerald-500 */
          foreground: 'var(--color-low-foreground)', /* white */
        },
        normal: {
          DEFAULT: 'var(--color-normal)', /* emerald-600 */
          foreground: 'var(--color-normal-foreground)', /* white */
        },
        
        /* Surface Variations */
        'surface-elevated': {
          DEFAULT: 'var(--color-surface-elevated)', /* white */
          foreground: 'var(--color-surface-elevated-foreground)', /* gray-900 */
        },
        'surface-muted': {
          DEFAULT: 'var(--color-surface-muted)', /* gray-50 */
          foreground: 'var(--color-surface-muted-foreground)', /* gray-500 */
        },
        
        /* Interactive States */
        hover: 'var(--color-hover)', /* gray-100 */
        active: 'var(--color-active)', /* gray-200 */
        focus: 'var(--color-focus)', /* blue-800 */
        
        /* Alert Severity Indicators */
        'alert-critical': 'var(--color-alert-critical)', /* red-600 */
        'alert-high': 'var(--color-alert-high)', /* amber-500 */
        'alert-medium': 'var(--color-alert-medium)', /* blue-500 */
        'alert-low': 'var(--color-alert-low)', /* emerald-500 */
        'alert-info': 'var(--color-alert-info)', /* indigo-500 */
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'monospace'],
        data: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'emergency-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'emergency-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'emergency-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'emergency-xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
        'status-glow': '0 0 0 1px currentColor, 0 0 8px -2px currentColor',
        'alert-glow': '0 0 20px rgba(220, 38, 38, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      screens: {
        'xs': '475px',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'emergency': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}