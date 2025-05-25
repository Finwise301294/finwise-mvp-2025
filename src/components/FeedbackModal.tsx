
import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal = ({ onClose }: FeedbackModalProps) => {
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter your feedback",
      });
      return;
    }

    // Here you would normally send the feedback to your backend
    console.log('Feedback submitted:', feedback);
    
    toast({
      title: "Thank you!",
      description: "Your feedback has been submitted",
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral rounded-3xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-bold text-accent">Send Feedback</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-neutral-dark" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-neutral-dark mb-4">
            Help us improve Finwise by sharing your thoughts and suggestions.
          </p>
          
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-32 p-4 border border-gray-300 rounded-2xl text-accent placeholder:text-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />

          <div className="flex space-x-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-neutral-light text-neutral-dark py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-primary text-white py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-purple-600 transition-colors"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
