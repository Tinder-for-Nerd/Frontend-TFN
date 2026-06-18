import { useMemo, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { useDiscoveryProfilesQuery } from '../../../../packages/shared/src/query/index.js';
import { ProfileCard } from '../../src/components/ProfileCard';
import { Screen } from '../../src/components/Screen';

export default function DiscoverScreen() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftSkill, setDraftSkill] = useState('');
  const filters = useMemo(() => ({ skills: draftSkill }), [draftSkill]);
  const { data: profiles = [], isLoading } = useDiscoveryProfilesQuery(filters);

  return (
    <Screen title="Discover" subtitle="AI-ranked freelancers and mentors by fit score.">
      <Pressable
        className="rounded-2xl bg-primary px-4 py-3"
        onPress={() => setFiltersOpen(true)}
      >
        <Text className="text-center font-extrabold text-white">Open filters</Text>
      </Pressable>

      {isLoading ? (
        <Text className="text-text-secondary">Loading matches...</Text>
      ) : (
        profiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
      )}

      <Modal visible={filtersOpen} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/30">
          <View className="gap-4 rounded-t-[28px] bg-white p-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-extrabold text-text-primary">Filters</Text>
              <Pressable onPress={() => setFiltersOpen(false)}>
                <Text className="font-bold text-primary">Done</Text>
              </Pressable>
            </View>
            <TextInput
              className="rounded-2xl border border-slate-200 px-4 py-3 text-base"
              placeholder="Skills e.g. React, ML"
              value={draftSkill}
              onChangeText={setDraftSkill}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
