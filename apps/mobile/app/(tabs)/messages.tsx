import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import {
  useConversationsQuery,
  useMessagesQuery,
  useSendMessageMutation,
} from '../../../../packages/shared/src/query/index.js';
import { useChatStore } from '../../../../packages/shared/src/stores/index.js';
import { Screen } from '../../src/components/Screen';

export default function MessagesScreen() {
  const [draft, setDraft] = useState('');
  const [activeId, setActiveId] = useState('sarah-chen');
  const setActiveConversation = useChatStore((state) => state.setActiveConversation);
  const typing = useChatStore((state) => state.typingByConversation[activeId]);
  const { data: conversations = [] } = useConversationsQuery();
  const { data: messages = [] } = useMessagesQuery(activeId);
  const sendMessage = useSendMessageMutation(activeId);

  const activeConversation = conversations.find((item) => item.id === activeId);

  const handleSelect = (id: string) => {
    setActiveId(id);
    setActiveConversation(id);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    sendMessage.mutate(text as never);
    setDraft('');
  };

  return (
    <Screen title="Messages" subtitle="Real-time chat with typing and read states.">
      <View className="flex-row gap-2">
        {conversations.map((conversation) => (
          <Pressable
            key={conversation.id}
            className={`rounded-full px-4 py-2 ${activeId === conversation.id ? 'bg-primary' : 'bg-white'}`}
            onPress={() => handleSelect(conversation.id)}
          >
            <Text className={activeId === conversation.id ? 'font-bold text-white' : 'font-bold text-text-primary'}>
              {conversation.participant.avatar}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="gap-1 rounded-[24px] border border-slate-200 bg-white p-4">
        <Text className="text-lg font-extrabold text-text-primary">
          {activeConversation?.participant.name || 'Conversation'}
        </Text>
        <Text className="text-xs font-bold text-success">
          {activeConversation?.online ? 'Online' : 'Offline'}
        </Text>
      </View>

      <View className="gap-3 rounded-[24px] border border-slate-200 bg-white p-4">
        {messages.map((message) => (
          <View
            key={message.id}
            className={`max-w-[82%] rounded-2xl px-4 py-3 ${message.senderId === 'me' ? 'self-end bg-primary' : 'self-start bg-slate-100'}`}
          >
            <Text className={message.senderId === 'me' ? 'text-white' : 'text-text-primary'}>
              {message.text}
            </Text>
            <Text className={message.senderId === 'me' ? 'mt-1 text-[10px] text-white/70' : 'mt-1 text-[10px] text-text-secondary'}>
              {message.read ? 'Read' : 'Sent'}
            </Text>
          </View>
        ))}
        {typing ? <Text className="text-xs font-semibold text-primary">Typing...</Text> : null}
      </View>

      <View className="flex-row items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
        <TextInput
          className="flex-1 text-base"
          placeholder="Message..."
          value={draft}
          onChangeText={setDraft}
        />
        <Pressable className="rounded-full bg-primary px-4 py-2" onPress={handleSend}>
          <Text className="font-extrabold text-white">Send</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
