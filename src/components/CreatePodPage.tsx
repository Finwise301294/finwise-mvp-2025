
import { useState } from 'react';
import { ChevronLeft, Copy } from 'lucide-react';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface CreatePodPageProps {
  onBack: () => void;
}

export const CreatePodPage = ({ onBack }: CreatePodPageProps) => {
  const [goalName, setGoalName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const { toast } = useToast();
  
  const shareLink = "https://pods.app/create/new123";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const handleCreatePod = () => {
    if (!goalName || !description || !targetAmount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    // Generate a random color and icon
    const colors = ['bg-green-500', 'bg-cyan-400', 'bg-pink-400', 'bg-orange-500', 'bg-blue-500'];
    const icons = ['🎯', '💰', '🚀', '⭐', '💎', '🏆'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    const newPod = {
      name: goalName,
      symbol: goalName.slice(0, 3).toUpperCase(),
      marketCap: description,
      price: '',
      color: randomColor,
      icon: randomIcon,
      targetAmount: targetAmount,
      isPublic: isPublic,
      memberCount: 1,
      creator: 'Joshua Lei'
    };

    // Save to user's created pods
    const existingCreatedPods = JSON.parse(localStorage.getItem('userCreatedPods') || '[]');
    existingCreatedPods.push(newPod);
    localStorage.setItem('userCreatedPods', JSON.stringify(existingCreatedPods));

    // Add to user's holdings
    const existingHoldings = JSON.parse(localStorage.getItem('userHoldings') || '[]');
    const holdingPod = { ...newPod, price: '$0' };
    existingHoldings.push(holdingPod);
    localStorage.setItem('userHoldings', JSON.stringify(existingHoldings));

    // If public, add to public pods
    if (isPublic) {
      const existingPublicPods = JSON.parse(localStorage.getItem('publicPods') || '[]');
      existingPublicPods.push(newPod);
      localStorage.setItem('publicPods', JSON.stringify(existingPublicPods));
    }

    toast({
      title: "Success!",
      description: "Pod created successfully",
    });

    onBack();
  };

  return (
    <div className="min-h-screen pb-8 bg-neutral-light">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 bg-neutral">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6 text-accent" />
        </button>
        <h1 className="text-2xl font-bold text-accent">Create Goal</h1>
        <div className="w-10 h-6"></div>
      </div>

      <div className="px-4 space-y-6 pt-6">
        {/* Goal Name */}
        <div>
          <label className="block text-lg font-semibold text-accent mb-3">
            Name
          </label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Enter your saving goal..."
            className="w-full p-4 border border-gray-300 rounded-2xl text-lg text-accent placeholder:text-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral"
          />
        </div>

        {/* Target Amount */}
        <div>
          <label className="block text-lg font-semibold text-accent mb-3">
            Target Amount
          </label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="How much do you want to save..."
            className="w-full p-4 border border-gray-300 rounded-2xl text-lg text-accent placeholder:text-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-semibold text-accent mb-3">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your goal briefly..."
            className="w-full p-4 border border-gray-300 rounded-2xl text-lg min-h-32 text-accent placeholder:text-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-neutral"
          />
        </div>

        {/* Public/Private Toggle */}
        <div>
          <div className="flex items-center justify-between p-4 bg-neutral rounded-2xl">
            <div>
              <h3 className="text-lg font-semibold text-accent">Public Pod</h3>
              <p className="text-neutral-dark text-sm">Anyone can discover and join this pod</p>
            </div>
            <Switch
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
        </div>

        {/* Share Link */}
        <div>
          <label className="block text-lg font-semibold text-accent mb-3">
            Invite Link
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 p-4 border border-gray-300 rounded-2xl bg-neutral-light text-neutral-dark"
            />
          </div>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-purple-600 transition-colors"
        >
          <Copy className="w-5 h-5" />
          <span>Copy Link</span>
        </button>

        {/* Create Button */}
        <button
          onClick={handleCreatePod}
          className="w-full bg-accent text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-colors"
        >
          Create Goal
        </button>
      </div>
    </div>
  );
};
