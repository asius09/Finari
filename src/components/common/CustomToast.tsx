'use client';

interface CustomToastProps {
  type: 'signup-success' | 'signup-error' | 'login-success' | 'login-error';
  message?: string;
}

export const CustomToast = ({ type, message }: CustomToastProps) => {
  const getToastContent = () => {
    switch (type) {
      case 'signup-success':
        return (
          <div className="bg-success-bg p-4 rounded-md w-full max-w-md border-2 border-success/20 shadow-[0_0_0_3px] shadow-success/10">
            <h3 className="font-medium text-success">
              Account created successfully!
            </h3>
            <p className="text-sm text-success mt-1">
              Please check your email to verify your account.
            </p>
          </div>
        );
      case 'signup-error':
        return (
          <div className="bg-error-bg p-4 rounded-md w-full max-w-md border-2 border-error/20 shadow-[0_0_0_3px] shadow-error/10">
            <h3 className="font-medium text-error">Signup failed</h3>
            <p className="text-sm text-error mt-1">
              {message || 'Something went wrong. Please try again.'}
            </p>
          </div>
        );
      case 'login-success':
        return (
          <div className="bg-success-bg p-4 rounded-md w-full max-w-md border-2 border-success/20 shadow-[0_0_0_3px] shadow-success/10">
            <h3 className="font-medium text-success">Login successful!</h3>
            <p className="text-sm text-success mt-1">Welcome back!</p>
          </div>
        );
      case 'login-error':
        return (
          <div className="bg-error-bg p-4 rounded-md w-full max-w-md border-2 border-error/20 shadow-[0_0_0_3px] shadow-error/10">
            <h3 className="font-medium text-error">Login failed</h3>
            <p className="text-sm text-error mt-1">
              {message || 'Invalid credentials. Please try again.'}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return getToastContent();
};
