"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ApplicationSuccessNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export function ApplicationSuccessNotification({
  isVisible,
  onDismiss,
}: ApplicationSuccessNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] transition-all duration-300 opacity-100 translate-y-0"
    >
      <div className="bg-white rounded-lg shadow-2xl border border-green-200 overflow-hidden min-w-[320px]">
        <div className="flex items-center gap-3 p-4">
          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">Application Submitted!</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              We&apos;ll review your application and get back to you soon.
            </p>
          </div>
          <button
            onClick={() => {
              onDismiss();
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="h-1 bg-green-500 animate-shrink" />
      </div>
    </div>
  );
}
