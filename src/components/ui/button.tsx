import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

/**
 * 순수 UI 버튼
 * 
 * 특징:
 * - 비즈니스 로직 없음
 * - props로만 제어
 * - 재사용성 극대화
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    // 기본 스타일
                    'inline-flex items-center justify-center rounded-md font-medium',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2',
                    'disabled:opacity-50 disabled:cursor-not-allowed',

                    // variant별 스타일
                    variant === 'default' && 'bg-gray-100 text-gray-900 hover:bg-gray-200',
                    variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
                    variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
                    variant === 'ghost' && 'bg-transparent hover:bg-gray-100',

                    // size별 스타일
                    size === 'sm' && 'px-3 py-1.5 text-sm',
                    size === 'md' && 'px-4 py-2 text-base',
                    size === 'lg' && 'px-6 py-3 text-lg',

                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };