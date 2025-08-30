import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({
    className,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    required = false,
    error = false,
    success = false,
    icon = null,
    iconPosition = 'left',
    fullWidth = false,
    size = 'default',
    ...props
}, ref) => {
    const inputSizes = {
        sm: 'h-8 px-3 text-sm',
        default: 'h-10 px-3',
        lg: 'h-12 px-4 text-base'
    };

    const iconSizes = {
        sm: 16,
        default: 18,
        lg: 20
    };

    const baseClasses = cn(
        'flex w-full rounded-lg border bg-white text-gray-900 placeholder-gray-500 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
        inputSizes[size],
        {
            'border-red-300 focus:ring-red-500 focus:border-red-500': error,
            'border-green-300 focus:ring-green-500 focus:border-green-500': success && !error,
            'border-gray-300': !error && !success,
            'w-full': fullWidth
        },
        className
    );

    const iconClasses = cn(
        'absolute top-1/2 transform -translate-y-1/2 text-gray-400',
        {
            'left-3': iconPosition === 'left',
            'right-3': iconPosition === 'right'
        }
    );

    const inputWithIconClasses = cn(
        baseClasses,
        {
            'pl-10': icon && iconPosition === 'left',
            'pr-10': icon && iconPosition === 'right'
        }
    );

    const renderIcon = () => {
        if (!icon) return null;
        
        // If icon is a React component
        if (React.isValidElement(icon)) {
            return React.cloneElement(icon, {
                className: cn(icon.props.className, iconClasses),
                size: iconSizes[size]
            });
        }
        
        // If icon is a string (icon name)
        if (typeof icon === 'string') {
            try {
                const IconComponent = require('../AppIcon').default;
                return (
                    <IconComponent
                        name={icon}
                        size={iconSizes[size]}
                        className={iconClasses}
                    />
                );
            } catch {
                return null;
            }
        }
        
        return null;
    };

    return (
        <div className={cn('relative', { 'w-full': fullWidth })}>
            {renderIcon()}
            <input
                ref={ref}
                type={type}
                className={inputWithIconClasses}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={disabled}
                required={required}
                {...props}
            />
            {error && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                    {error}
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;