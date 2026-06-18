import * as ImagePicker from 'expo-image-picker';

export async function pickProfileImage() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.85,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });

  if (result.canceled) return null;
  return result.assets[0];
}

export async function pickPortfolioImages() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    return [];
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: true,
    quality: 0.85,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });

  return result.canceled ? [] : result.assets;
}
