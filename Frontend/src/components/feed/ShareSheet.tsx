import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Send, Globe, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const shareOptions = [
  { id: 'copy', icon: Copy, label: 'Copy Link', color: 'text-gray-700' },
  { id: 'twitter', icon: Globe, label: 'Twitter', color: 'text-blue-400' },
  { id: 'linkedin', icon: Globe, label: 'LinkedIn', color: 'text-blue-600' },
  { id: 'send', icon: Send, label: 'Send to Friends', color: 'text-green-500' },
  { id: 'repost', icon: Share2, label: 'Repost', color: 'text-purple-500' },
];

export function ShareSheet({ isOpen, onClose, postId }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);
  const [reposted, setReposted] = useState(false);

  const handleAction = (id: string) => {
    switch (id) {
      case 'copy':
        navigator.clipboard.writeText(`https://promatch.app/p/${postId}`);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=https://promatch.app/p/${postId}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/sharing/share-offsite/?url=https://promatch.app/p/${postId}`, '_blank');
        break;
      case 'send':
        toast.success('Feature coming soon!');
        break;
      case 'repost':
        setReposted(true);
        toast.success('Reposted to your feed!');
        setTimeout(() => setReposted(false), 2000);
        break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
              <h3 className="text-base font-semibold text-gray-900">Share</h3>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4 px-5 py-6">
              {shareOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAction(option.id)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full ${
                    option.id === 'copy' && copied
                      ? 'bg-green-100'
                      : option.id === 'repost' && reposted
                      ? 'bg-purple-100'
                      : 'bg-gray-100'
                  }`}>
                    {option.id === 'copy' && copied ? (
                      <Check size={22} className="text-green-600" />
                    ) : (
                      <option.icon size={22} className={option.color} />
                    )}
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    {option.id === 'copy' && copied ? 'Copied!' : option.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
