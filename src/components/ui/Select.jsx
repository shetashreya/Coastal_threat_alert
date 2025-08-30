// components/ui/Select.jsx - Shadcn style Select
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import Icon from '../AppIcon';

const Select = React.forwardRef(({
    className,
    options = [],
    value,
    onChange,
    placeholder = 'Select an option',
    disabled = false,
    required = false,
    error = false,
    success = false,
    fullWidth = false,
    size = 'default',
    searchable = false,
    multiSelect = false,
    clearable = false,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState(multiSelect ? (Array.isArray(value) ? value : []) : []);
    const selectRef = useRef(null);
    const dropdownRef = useRef(null);

    const inputSizes = {
        sm: 'h-8 px-3 text-sm',
        default: 'h-10 px-3',
        lg: 'h-12 px-4 text-base'
    };

    const baseClasses = cn(
        'flex w-full items-center justify-between rounded-lg border bg-white text-gray-900 transition-all duration-200',
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

    const filteredOptions = searchable 
        ? options.filter(option => 
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options;

    const handleSelect = (option) => {
        if (multiSelect) {
            const newValues = selectedValues.includes(option.value)
                ? selectedValues.filter(v => v !== option.value)
                : [...selectedValues, option.value];
            setSelectedValues(newValues);
            onChange?.(newValues);
        } else {
            onChange?.(option.value);
            setIsOpen(false);
            setSearchTerm('');
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        if (multiSelect) {
            setSelectedValues([]);
            onChange?.([]);
        } else {
            onChange?.('');
        }
    };

    const getDisplayValue = () => {
        if (multiSelect) {
            if (selectedValues.length === 0) return placeholder;
            if (selectedValues.length === 1) {
                const option = options.find(opt => opt.value === selectedValues[0]);
                return option?.label || placeholder;
            }
            return `${selectedValues.length} items selected`;
        } else {
            if (!value) return placeholder;
            const option = options.find(opt => opt.value === value);
            return option?.label || placeholder;
        }
    };

    const isSelected = (optionValue) => {
        if (multiSelect) {
            return selectedValues.includes(optionValue);
        }
        return value === optionValue;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && searchable) {
            const input = dropdownRef.current?.querySelector('input');
            if (input) {
                input.focus();
            }
        }
    }, [isOpen, searchable]);

    return (
        <div className={cn('relative', { 'w-full': fullWidth })} ref={selectRef}>
            <button
                type="button"
                className={cn(
                    baseClasses,
                    'cursor-pointer',
                    {
                        'ring-2 ring-blue-500 border-blue-500': isOpen
                    }
                )}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                <span className={cn(
                    'truncate',
                    {
                        'text-gray-500': !value && !selectedValues.length
                    }
                )}>
                    {getDisplayValue()}
                </span>
                <div className="flex items-center space-x-2">
                    {clearable && ((value && !multiSelect) || (selectedValues.length > 0 && multiSelect)) && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Icon name="X" size={14} className="text-gray-400" />
                        </button>
                    )}
                    <Icon 
                        name={isOpen ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className={cn(
                            'text-gray-400 transition-transform duration-200',
                            {
                                'rotate-180': isOpen
                            }
                        )} 
                    />
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
                    {searchable && (
                        <div className="p-2 border-b border-gray-100">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                ref={dropdownRef}
                            />
                        </div>
                    )}
                    
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={cn(
                                        'w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150',
                                        {
                                            'bg-blue-50 text-blue-700': isSelected(option.value),
                                            'text-gray-900': !isSelected(option.value)
                                        }
                                    )}
                                    onClick={() => handleSelect(option)}
                                >
                                    <div className="flex items-center space-x-2">
                                        {multiSelect && (
                                            <div className={cn(
                                                'w-4 h-4 border rounded flex items-center justify-center',
                                                {
                                                    'bg-blue-600 border-blue-600': isSelected(option.value),
                                                    'border-gray-300': !isSelected(option.value)
                                                }
                                            )}>
                                                {isSelected(option.value) && (
                                                    <Icon name="Check" size={12} className="text-white" />
                                                )}
                                            </div>
                                        )}
                                        <span>{option.label}</span>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                                No options found
                            </div>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                    {error}
                </div>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;