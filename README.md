# CoastalGuard Pro - Emergency Management System

A modern, user-friendly emergency management system for coastal threat monitoring and alert coordination.

## 🚀 Recent UI Improvements

The application has been completely redesigned with a modern, clean, and user-friendly interface:

### ✨ Design System Updates
- **Modern Color Palette**: Updated to use a clean, professional color scheme with better contrast
- **Improved Typography**: Enhanced font hierarchy and readability using Inter font family
- **Consistent Spacing**: Standardized spacing and padding throughout the application
- **Rounded Corners**: Modern rounded-xl design for cards and components
- **Better Shadows**: Subtle shadows for depth and visual hierarchy

### 🎨 Component Improvements

#### Navigation Bar
- Clean, modern design with backdrop blur effect
- Better mobile responsiveness
- Improved user profile dropdown
- Enhanced alert status indicators

#### Buttons
- Modern styling with hover effects
- Consistent sizing and spacing
- Better accessibility with focus states
- Icon support with proper positioning

#### Forms & Inputs
- Clean, modern input fields
- Better validation states
- Improved select dropdowns
- Enhanced accessibility

#### Cards & Layouts
- Consistent card design across all pages
- Better visual hierarchy
- Improved spacing and padding
- Modern shadow effects

### 📱 Mobile Responsiveness
- Optimized for all screen sizes
- Touch-friendly interface
- Responsive navigation
- Mobile-optimized layouts

### ♿ Accessibility Improvements
- Better color contrast
- Proper focus states
- Screen reader support
- Keyboard navigation

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: Redux Toolkit
- **Charts**: Recharts
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coastalguard_pro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Card.jsx
│   │   ├── NavigationBar.jsx
│   │   └── ...
│   ├── AppIcon.jsx
│   ├── AppImage.jsx
│   └── ErrorBoundary.jsx
├── pages/
│   ├── main-dashboard/     # Main dashboard page
│   ├── alert-management/   # Alert management system
│   ├── environmental-data-analytics/
│   ├── community-alert-center/
│   ├── system-administration/
│   └── login/
├── styles/
│   ├── tailwind.css       # Global styles and design system
│   └── index.css
└── utils/
    └── cn.js              # Utility functions
```

## 🎯 Key Features

### Emergency Management Dashboard
- Real-time coastal threat monitoring
- Interactive maps with sensor data
- Environmental metrics and predictions
- Scenario simulation tools

### Alert Management System
- Multi-channel alert creation
- Real-time alert tracking
- Delivery status monitoring
- Alert explainability and analytics

### Environmental Analytics
- Data visualization and charts
- Predictive modeling
- Historical data analysis
- Trend identification

### Community Alert Center
- Public alert dissemination
- Community engagement tools
- Multi-language support
- Accessibility features

## 🎨 Design Principles

### User Experience
- **Simplicity**: Clean, uncluttered interfaces
- **Consistency**: Uniform design patterns
- **Accessibility**: Inclusive design for all users
- **Responsiveness**: Works on all devices

### Visual Design
- **Modern Aesthetics**: Contemporary design trends
- **Professional Appearance**: Trustworthy and authoritative
- **Clear Hierarchy**: Easy to scan and navigate
- **Intuitive Interactions**: Self-explanatory interfaces

## 🔧 Customization

### Colors
The application uses a comprehensive design system with CSS custom properties. Main colors can be modified in `src/styles/tailwind.css`:

```css
:root {
  --color-primary: #2563EB;      /* Blue */
  --color-secondary: #059669;    /* Green */
  --color-accent: #DC2626;       /* Red */
  --color-success: #10B981;      /* Green */
  --color-warning: #F59E0B;      /* Orange */
  --color-error: #EF4444;        /* Red */
}
```

### Components
All UI components are built with customization in mind. They accept className props for additional styling and have consistent prop interfaces.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@coastalguard.gov
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

**CoastalGuard Pro** - Protecting coastal communities through intelligent emergency management.
