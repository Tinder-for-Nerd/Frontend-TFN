import { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Screen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <SafeAreaView className="flex-1 bg-surface-low" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-1">
          <Text className="text-3xl font-extrabold text-text-primary">{title}</Text>
          {subtitle ? <Text className="text-sm text-text-secondary">{subtitle}</Text> : null}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
