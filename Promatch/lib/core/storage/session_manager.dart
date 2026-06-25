import '../constants/storage_keys.dart';
import 'preferences_service.dart';

class SessionManager {
  Future<PreferencesService> get _prefs => PreferencesService.getInstance();

  Future<String?> getToken() async {
    final p = await _prefs;
    return p.getString(StorageKeys.authToken);
  }

  Future<void> saveSession({
    required String token,
    required String refreshToken,
    required String userId,
    required String role,
  }) async {
    final p = await _prefs;
    await p.setString(StorageKeys.authToken, token);
    await p.setString(StorageKeys.refreshToken, refreshToken);
    await p.setString(StorageKeys.userId, userId);
    await p.setString(StorageKeys.userRole, role);
  }

  Future<void> clearSession() async {
    final p = await _prefs;
    await p.remove(StorageKeys.authToken);
    await p.remove(StorageKeys.refreshToken);
    await p.remove(StorageKeys.userId);
    await p.remove(StorageKeys.userRole);
  }

  Future<bool> isLoggedIn() async {
    final token = await getToken();
    return token != null && token.isNotEmpty;
  }

  Future<String?> getRole() async {
    final p = await _prefs;
    return p.getString(StorageKeys.userRole);
  }

  Future<String?> getUserId() async {
    final p = await _prefs;
    return p.getString(StorageKeys.userId);
  }
}
