import React from 'react';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

interface NotFoundProps {
  onReturnToDashboard: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onReturnToDashboard }) => {
  return (
    <div className="max-w-md mx-auto py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-7 h-7 text-[#64748B]" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
        Page not found.
      </h2>
      <p className="text-xs sm:text-sm text-[#64748B] mt-2 mb-6">
        The view you requested does not exist or may have been relocated.
      </p>
      <button
        onClick={onReturnToDashboard}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs sm:text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer"
      >
        <Home className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );
};
