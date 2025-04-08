// src/components/Loading.tsx
import React from 'react';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    color?: string;
    className?: string;
}

const Loading: React.FC<LoaderProps> = ({
        size = 'medium',
        color = 'border-blue-500',
        className = '',
    }) => {
    // Map sizes to tailwind classes
    const sizeMap = {
        small: 'h-8 w-8 border-4',
        medium: 'h-16 w-16 border-4',
        large: 'h-24 w-24 border-6',
        xlarge: 'h-32 w-32 border-8'
    };

    const sizeClass = sizeMap[size];

    return (
        <div className={`flex justify-center items-center min-h-[200px] ${className}`}>
            <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-blue-200 opacity-30 animate-pulse"></div>
                <div
                    className={`relative animate-spin ${sizeClass} ${color} border-t-transparent border-solid rounded-full`}
                    role="status"
                    aria-label="Loading"
                />
            </div>
        </div>
    );
};

export default Loading;