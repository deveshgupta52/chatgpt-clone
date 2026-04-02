import { useState, useEffect } from 'react';
import { Mail, CheckCircle, Loader, AlertCircle } from 'lucide-react';
import { resendVerifyEmail } from '../services/auth.api';

/**
 * EmailVerificationModal Component
 * 
 * Modern modal popup for email verification after user registration.
 * Features:
 * - 30-second cooldown on resend button with countdown timer
 * - Loading and success states
 * - Responsive design with Tailwind CSS
 * - Accessibility features
 */
export default function EmailVerificationModal({ email, onChangeEmail = () => {} }) {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  // Cooldown timer effect
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown(resendCooldown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleOpenGmail = () => {
    window.open('https://mail.google.com', '_blank', 'noopener,noreferrer');
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    setError('');
    setShowError(false);
    try {
      const response = await resendVerifyEmail({ email });
      
      if (response.success) {
        setShowSuccess(true);
        setIsSuccess(true);
        setResendCooldown(30);

        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to resend email. Please try again.';
      setError(errorMsg);
      setShowError(true);
      console.error('Failed to resend email:', err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      {/* Modal Container */}
      <div className="bg-black rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 ease-out border border-gray-800">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Verify your email
        </h2>

        {/* Main Message */}
        <p className="text-gray-300 text-center mb-4">
          We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
        </p>

        {/* Email Display */}
        <p className="text-center text-sm font-medium text-gray-200 mb-6">
          {email}
        </p>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-900 border border-green-700 rounded-lg p-3 mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-300 font-medium">
              Verification email sent successfully!
            </p>
          </div>
        )}

        {/* Error Message */}
        {showError && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-3 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-300 font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Help Note */}
        <p className="text-xs text-gray-400 text-center mb-6 bg-gray-900 rounded-lg p-3 border border-gray-800">
          Didn't receive the email? Check your spam folder or resend the email below.
        </p>

        {/* Primary Button - Open Gmail */}
        <button
          onClick={handleOpenGmail}
          className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 mb-3 flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Open Gmail
        </button>

        {/* Secondary Button - Resend Email */}
        <button
          onClick={handleResendEmail}
          disabled={isResending || resendCooldown > 0}
          className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 mb-3 flex items-center justify-center gap-2 ${
            isResending || resendCooldown > 0
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-200 active:scale-95'
          }`}
        >
          {isResending ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : resendCooldown > 0 ? (
            <>
              Resend Email ({resendCooldown}s)
            </>
          ) : (
            'Resend Email'
          )}
        </button>

        {/* Tertiary Button - Change Email */}
        <button
          type="button"
          onClick={onChangeEmail}
          className="w-full border-2 border-gray-700 hover:border-gray-600 text-gray-200 hover:bg-gray-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer"
        >
          Change Email
        </button>

        {/* Footer Note */}
        <p className="text-xs text-gray-600 text-center mt-6">
          Activation link expires in 24 hours
        </p>
      </div>
    </div>
  );
}
