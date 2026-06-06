import { useState } from 'react';
import { X } from 'lucide-react';
import type { SuggestedUser } from '../../types';

interface SuggestedUsersProps {
  users: SuggestedUser[];
  onFollow: (userId: string) => void;
}

export function SuggestedUsers({ users, onFollow }: SuggestedUsersProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  const visible = users.filter((u) => !dismissed.includes(u.user.id));

  if (visible.length === 0) return null;

  return (
    <div className="px-4 py-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Suggested for you
      </h3>
      <div className="space-y-3">
        {visible.map((suggestion) => (
          <div key={suggestion.user.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <img
                  src={suggestion.user.avatar}
                  alt={suggestion.user.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {suggestion.user.username}
                </p>
                <p className="text-xs text-gray-500 truncate">{suggestion.reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setFollowing([...following, suggestion.user.id]);
                  onFollow(suggestion.user.id);
                }}
                className={`text-xs font-semibold ${
                  following.includes(suggestion.user.id)
                    ? 'text-gray-400'
                    : 'text-blue-500 hover:text-blue-700'
                } transition-colors`}
              >
                {following.includes(suggestion.user.id) ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={() => setDismissed([...dismissed, suggestion.user.id])}
                className="rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
