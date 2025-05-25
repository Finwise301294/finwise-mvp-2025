
import { useState } from 'react';
import { X, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  onClose: () => void;
}

export const ShareModal = ({ onClose }: ShareModalProps) => {
  const { toast } = useToast();
  const shareLink = "https://pods.app/join/abc123";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Share Pod</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Share Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share this link with friends
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 p-3 border border-gray-300 rounded-2xl bg-gray-50 text-gray-700"
            />
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopyLink}
          className="w-full bg-primary text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors"
        >
          <Copy className="w-5 h-5" />
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  );
};
