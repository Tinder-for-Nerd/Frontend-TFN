import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, BookmarkCheck, Folder } from 'lucide-react';
import { toast } from 'sonner';
import type { FeedCollection } from '../../types';

interface SaveSheetProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  collections: FeedCollection[];
  onSaveToCollection: (postId: string, collectionId: string) => void;
  onCreateCollection: (name: string) => void;
}

export function SaveSheet({ isOpen, onClose, postId, collections, onSaveToCollection, onCreateCollection }: SaveSheetProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = () => {
    if (!newName.trim()) return;
    onCreateCollection(newName.trim());
    setNewName('');
    setShowCreate(false);
    toast.success(`Collection "${newName}" created!`);
  };

  const handleSave = (collectionId: string) => {
    onSaveToCollection(postId, collectionId);
    toast.success('Saved to collection!');
    onClose();
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
              <h3 className="text-base font-semibold text-gray-900">Save to Collection</h3>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-5 py-3">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => handleSave(collection.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100">
                    <Folder size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-gray-900">{collection.name}</p>
                    <p className="text-xs text-gray-500">{collection.posts.length} posts</p>
                  </div>
                  {collection.posts.includes(postId) && (
                    <BookmarkCheck size={18} className="text-yellow-500" />
                  )}
                </button>
              ))}

              {showCreate ? (
                <div className="mt-2 flex items-center gap-2 px-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Collection name..."
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  />
                  <button
                    onClick={handleCreate}
                    disabled={!newName.trim()}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    Create
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCreate(true)}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                    <Plus size={20} className="text-gray-400" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">New Collection</span>
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
