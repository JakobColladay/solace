"use client"

type ErrorType = 'warning' | 'error' | 'critical';

interface ErrorMessageProps {
    message: string;
    type?: ErrorType;
    onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
       message,
       type = 'error',
       onDismiss
   }) => {
    // Simple color mapping based on error type
    const colors = {
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        critical: 'bg-red-200 border-red-500 text-red-900 font-semibold'
    };

    return (
        <div className={`p-3 rounded border-l-4 ${colors[type]} flex items-center`} role="alert">
            {/* Simple icon based on type */}
            <span className="mr-2">
        {type === 'warning' ? '⚠️' : '❌'}
      </span>

            <span className="flex-grow">{message}</span>

            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Dismiss"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
