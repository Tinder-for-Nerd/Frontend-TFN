import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useCurrentUserQuery } from '../../../../packages/shared/src/query/index.js';
import { useNotificationStore, useUserStore } from '../../../../packages/shared/src/stores/index.js';
import { FitScoreCard } from '../../src/components/FitScoreCard';
import { Screen } from '../../src/components/Screen';
import { pickPortfolioImages, pickProfileImage } from '../../src/services/imagePicker';
import { clearToken, setToken } from '../../src/services/tokenStorage';
import { registerForPushNotifications } from '../../src/services/pushNotifications';

export default function ProfileScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [portfolioCount, setPortfolioCount] = useState(0);
  const { data: user } = useCurrentUserQuery();
  const setSharedSession = useUserStore((state) => state.setSession);
  const logout = useUserStore((state) => state.logout);
  const deviceToken = useNotificationStore((state) => state.deviceToken);

  const handleMockLogin = async () => {
    await setToken('mock.jwt.token');
    setSharedSession({ user, token: 'mock.jwt.token' });
  };

  const handleLogout = async () => {
    await clearToken();
    logout();
  };

  const handlePickProfile = async () => {
    const asset = await pickProfileImage();
    if (asset?.uri) setImageUri(asset.uri);
  };

  const handlePickPortfolio = async () => {
    const assets = await pickPortfolioImages();
    setPortfolioCount(assets.length);
  };

  return (
    <Screen title="Profile" subtitle="Manage identity, photos, notifications, and FitScore.">
      <View className="items-center gap-3 rounded-[28px] border border-slate-200 bg-white p-5">
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="h-24 w-24 rounded-full" />
        ) : (
          <View className="h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <Text className="text-2xl font-extrabold text-primary">AB</Text>
          </View>
        )}
        <Text className="text-xl font-extrabold text-text-primary">{user?.name || 'Alex Builder'}</Text>
        <Text className="text-sm text-text-secondary">{user?.email || 'alex@promatch.dev'}</Text>
      </View>

      <FitScoreCard score={{ overall: 91, skill: 94, experience: 86, project: 92, availability: 90 }} />

      <View className="gap-3">
        <Pressable className="rounded-2xl bg-primary px-4 py-3" onPress={handlePickProfile}>
          <Text className="text-center font-extrabold text-white">Upload profile photo</Text>
        </Pressable>
        <Pressable className="rounded-2xl bg-white px-4 py-3" onPress={handlePickPortfolio}>
          <Text className="text-center font-extrabold text-primary">
            Add portfolio photos{portfolioCount ? ` (${portfolioCount})` : ''}
          </Text>
        </Pressable>
        <Pressable className="rounded-2xl bg-white px-4 py-3" onPress={registerForPushNotifications}>
          <Text className="text-center font-extrabold text-primary">
            {deviceToken ? 'Push notifications enabled' : 'Enable push notifications'}
          </Text>
        </Pressable>
        <Pressable className="rounded-2xl bg-white px-4 py-3" onPress={handleMockLogin}>
          <Text className="text-center font-extrabold text-primary">Save JWT in SecureStore</Text>
        </Pressable>
        <Pressable className="rounded-2xl bg-red-50 px-4 py-3" onPress={handleLogout}>
          <Text className="text-center font-extrabold text-error">Clear session</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
