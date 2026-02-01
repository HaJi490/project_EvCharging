import { forwardRef } from 'react';
import { cn } from '@/lib/utils/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    variant?: 'default' | 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
    label, 
    className, 
    variant = 'default', 
    size = 'md', 
    ...props 
}, ref) => {
    const baseStyle = `inline-flex items-center justify-center rounded-md font-medium 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 
                        disabled:opacity-50 disabled:cursor-not-allowed`

    const variantStyle = {
        default: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        ghost: 'bg-transparent hover:bg-gray-100',
    }

    const sizeStyle = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    }

    return (
        <button
            ref={ref}
            className={cn(
                baseStyle, 
                variantStyle[variant],
                sizeStyle[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = 'Button';
export { Button };