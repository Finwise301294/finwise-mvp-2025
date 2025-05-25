import { useState } from 'react';
import { X } from 'lucide-react';
interface FeedbackModalProps {
  onClose: () => void;
}
export const FeedbackModal = ({
  onClose
}: FeedbackModalProps) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback);
    setIsSubmitting(false);
    onClose();
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Feedback</h2>
        <p className="text-gray-600 mb-6">We'd love to hear your thoughts on how we can improve!</p>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit}>
          <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Share your feedback, suggestions, or report any issues..." className="w-full h-32 p-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" required />
          
          <div className="flex space-x-3">
            
            <button type="submit" disabled={!feedback.trim() || isSubmitting} className="w-full bg-green-500 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors">
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>;
};