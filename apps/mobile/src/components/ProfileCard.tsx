import { Text, View } from 'react-native';
import { FitScoreCard } from './FitScoreCard';

type Profile = {
  name: string;
  title: string;
  location: string;
  avatar: string;
  skills: string[];
  availability: string;
  fitScore: {
    overall: number;
    skill: number;
    experience: number;
    project: number;
    availability: number;
  };
};

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <View className="gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <View className="flex-row items-center gap-4">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Text className="text-lg font-extrabold text-primary">{profile.avatar}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xl font-extrabold text-text-primary">{profile.name}</Text>
          <Text className="text-sm font-semibold text-text-secondary">{profile.title}</Text>
          <Text className="text-xs text-text-secondary">{profile.location}</Text>
        </View>
      </View>

      <Text className="text-sm text-text-secondary">{profile.availability}</Text>

      <View className="flex-row flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <Text
            key={skill}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary"
          >
            {skill}
          </Text>
        ))}
      </View>

      <FitScoreCard score={profile.fitScore} />
    </View>
  );
}
