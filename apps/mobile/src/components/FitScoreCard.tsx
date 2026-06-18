import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type FitScore = {
  overall: number;
  skill: number;
  experience: number;
  project: number;
  availability: number;
};

const rows: Array<[keyof FitScore, string]> = [
  ['skill', 'Skills'],
  ['experience', 'Experience'],
  ['project', 'Project'],
  ['availability', 'Availability'],
];

function ScoreBar({ label, value }: { label: string; value: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value, { duration: 650 });
  }, [progress, value]);

  const style = useAnimatedStyle(() => ({
    width: `${Math.max(0, Math.min(progress.value, 100))}%`,
  }));

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-bold text-text-secondary">{label}</Text>
        <Text className="text-xs font-extrabold text-text-primary">{value}%</Text>
      </View>
      <View className="h-2 overflow-hidden rounded-full bg-surface-high">
        <Animated.View className="h-full rounded-full bg-primary" style={style} />
      </View>
    </View>
  );
}

export function FitScoreCard({ score }: { score: FitScore }) {
  return (
    <View className="gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <View className="flex-row items-center gap-3">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Text className="text-xl font-extrabold text-primary">{score.overall}</Text>
          <Text className="text-[10px] font-bold uppercase text-primary">Fit</Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-extrabold text-text-primary">FitScore</Text>
          <Text className="text-sm text-text-secondary">
            Weighted by skills, experience, project match, and availability.
          </Text>
        </View>
      </View>
      <View className="gap-3">
        {rows.map(([key, label]) => (
          <ScoreBar key={key} label={label} value={score[key]} />
        ))}
      </View>
    </View>
  );
}
