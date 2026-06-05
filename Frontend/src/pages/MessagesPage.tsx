import { useState, useRef, useEffect } from 'react';
import { useMessageStore } from '../store/messageStore';
import { useAuthStore } from '../store/authStore';
import { mockProfiles } from '../data/mockData';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, MessageSquare, Check, CheckCheck } from 'lucide-react';
import { getTimeAgo, cn } from '../lib/utils';

export default function MessagesPage() {
  const { conversations, messages, activeConversationId, setActiveConversation, sendMessage } = useMessageStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter((c) => {
    const otherId = c.participants.find((p) => p !== user?.id);
    const otherProfile = otherId ? mockProfiles[otherId] : null;
    if (!otherProfile) return true;
    return otherProfile.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  const otherParticipantId = activeConversationId
    ? conversations.find((c) => c.id === activeConversationId)?.participants.find((p) => p !== user?.id)
    : null;
  const otherProfile = otherParticipantId ? mockProfiles[otherParticipantId] : null;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleSend = () => {
    if (!newMessage.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, newMessage.trim());
    setNewMessage('');
    setShowTyping(true);
    setTimeout(() => setShowTyping(false), 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-[calc(100vh-12rem)] rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden"
    >
      {/* Conversation List */}
      <div className="w-80 border-r border-[#E2E8F0] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-bold text-[#0F172A]">Messages</h2>
          <div className="relative mt-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <MessageSquare size={32} className="text-[#CBD5E1]" />
              <p className="mt-2 text-sm text-[#64748B]">No conversations yet</p>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const otherId = conv.participants.find((p) => p !== user?.id);
              const profile = otherId ? mockProfiles[otherId] : null;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversation(conv.id)}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#F8FAFC]',
                    activeConversationId === conv.id && 'bg-[#F8FAFC]'
                  )}
                >
                  <Avatar name={profile?.name || 'User'} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#0F172A] truncate">
                        {profile?.name || 'Unknown'}
                      </p>
                      {conv.lastMessage && (
                        <span className="text-xs text-[#94A3B8] shrink-0 ml-2">
                          {getTimeAgo(conv.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    {conv.lastMessage && (
                      <p className="text-xs text-[#64748B] truncate mt-0.5">
                        {conv.lastMessage.senderId === user?.id && 'You: '}
                        {conv.lastMessage.text}
                      </p>
                    )}
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#2563EB] px-1.5 text-[10px] font-bold text-white shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversationId && otherProfile ? (
          <>
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] px-6 py-3">
              <Avatar name={otherProfile.name} size="md" />
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{otherProfile.name}</p>
                <p className="text-xs text-[#64748B]">{otherProfile.title} at {otherProfile.company}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {activeMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex gap-2',
                      msg.senderId === user?.id ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {msg.senderId !== user?.id && (
                      <Avatar name={otherProfile.name} size="sm" className="mt-1 shrink-0" />
                    )}
                    <div
                      className={cn(
                        'max-w-[70%] rounded-2xl px-4 py-2.5',
                        msg.senderId === user?.id
                          ? 'bg-[#2563EB] text-white rounded-br-md'
                          : 'bg-[#F8FAFC] text-[#0F172A] rounded-bl-md border border-[#E2E8F0]'
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className={cn(
                        'flex items-center gap-1 mt-1',
                        msg.senderId === user?.id ? 'justify-end' : 'justify-start'
                      )}>
                        <span className={cn(
                          'text-[10px]',
                          msg.senderId === user?.id ? 'text-blue-200' : 'text-[#94A3B8]'
                        )}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                        </span>
                        {msg.senderId === user?.id && (
                          msg.read ? <CheckCheck size={12} className="text-blue-200" /> : <Check size={12} className="text-blue-200" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {showTyping && (
                <div className="flex items-center gap-2 text-xs text-[#64748B] ml-2">
                  <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-bounce" />
                  <span className="animate-pulse">{otherProfile?.name?.split(' ')[0]} is typing...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-[#E2E8F0] p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 h-10 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
                />
                <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-[#CBD5E1]" />
              <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">Your messages</h3>
              <p className="mt-1 text-sm text-[#64748B]">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
