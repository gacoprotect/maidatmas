import { cn } from '@/lib/utils';
import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react';
import { BsStarFill } from 'react-icons/bs';

interface InputGroupProps {
    label?: string;
    value?: string | number;
    onChange: (value: string | number | boolean | null) => void;
    checked?: boolean;
    error?: string;
    name: string;
    type?: HTMLInputTypeAttribute | 'currency' | 'rating' | 'textarea' | 'checkbox' | 'toggle';
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    prefix?: string | ReactNode;
    subfix?: string | ReactNode;
    rows?: number;
    tsize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    min?: string | number;
}

const InputGroup: React.FC<InputGroupProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    checked = false,
    error,
    placeholder,
    className = '',
    required = false,
    disabled = false,
    prefix = '',
    subfix = '',
    rows = 4,
    tsize,
    min,
}) => {
    const commonClass = `
    [type='number']::-webkit-outer-spin-button,
  [type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  [type='number'] {
    -moz-appearance: textfield;
  }
    mt-1 block w-full outline-none
    ${type === 'toggle' ? 'rounded-full' : 'rounded-md'} 
    border ${error ? 'border-red-500' : 'border-gray-300'} 
    bg-muted/20 px-3 py-2 shadow-sm transition-all duration-200 text-md
    ${disabled ? 'cursor-not-allowed bg-gray-100' : ''} 
    ${prefix ? 'pl-12' : 'pr-10'}`;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        onChange(inputValue);
    };

    const handleRatingChange = (rating: number) => {
        onChange(rating);
    };

    const renderInput = () => {
        if (type === 'textarea') {
            return (
                <textarea
                    id={name}
                    name={name}
                    rows={rows}
                    value={value as string}
                    onChange={handleChange}
                    placeholder={placeholder || `Enter ${String(label).toLowerCase()}`}
                    className={commonClass}
                    required={required}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                />
            );
        }
        if (type === 'rating') {
            return (
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className="text-2xl focus:outline-none"
                            aria-label={`Rate ${star} star`}
                        >
                            <BsStarFill className={star <= Number(value) ? 'text-yellow-400' : 'text-secondary-foreground'} />
                        </button>
                    ))}
                    <input type="hidden" name={name} value={value as number} onChange={handleChange} />
                </div>
            );
        }
        if (type === 'checkbox') {
            return <input type="checkbox" id={name} name={name} checked={checked} onChange={(e) => onChange?.(e.target.checked)} className="" />;
        }
        if (type === 'toggle') {
            const text = {
                xs: 'text-xs',
                sm: 'text-sm',
                md: 'text-md',
                lg: 'text-lg',
                xl: 'text-xl',
            };
            const tsizes = {
                xs: 'h-4 w-12',
                sm: 'h-5 w-14', // Small size
                md: 'h-5 w-16', // Medium size (default)
                lg: 'h-6 w-18', // Large size
                xl: 'h-7 w-20', // Extra large size
            };
            const toggleSize = tsizes[tsize ?? 'md'];
            const textToggleSize = text[tsize ?? 'md'];
            return (
                <label className={`relative inline-flex items-center ${toggleSize}`}>
                    <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange?.(e.target.checked)} name={name} />
                    <div className="h-full w-full rounded-full bg-gray-300 transition-colors duration-300 peer-checked:bg-green-500" />
                    <div className="absolute top-0.5 left-0.5 aspect-square h-[calc(100%-4px)] rounded-full bg-white shadow transition-transform duration-300 peer-checked:right-0.5 peer-checked:left-auto" />
                    <span className={`absolute right-2 ${textToggleSize} font-medium text-gray-600 peer-checked:hidden`}>No</span>
                    <span className={`absolute left-2 hidden ${textToggleSize} font-medium text-white peer-checked:inline`}>Yes</span>
                </label>
            );
        }

        return (
            <input
                id={name}
                name={name}
                type={type === 'currency' ? 'number' : type}
                value={value as string | number}
                onChange={handleChange}
                placeholder={placeholder ? placeholder : label ? `Ketik ${label?.toLowerCase()}` : `Ketik ${name?.toLowerCase()}`}
                className={cn(
                    commonClass,
                    'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                )}
                required={required}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                step={type === 'currency' ? '0.01' : undefined}
                min={min}
            />
        );
    };

    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-secondary-foreground">
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>
            )}

            <div className="relative mt-1">
                {/* Prefix */}
                {prefix && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center bg-muted px-3">
                        <span className="text-sm font-bold text-muted-foreground">{prefix}</span>
                    </div>
                )}

                {renderInput()}

                {/* Subfix */}
                {subfix && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-sm font-bold text-muted-foreground">{subfix}</span>
                    </div>
                )}
            </div>

            {error && (
                <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputGroup;
