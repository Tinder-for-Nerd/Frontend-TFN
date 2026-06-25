import 'package:hive_flutter/hive_flutter.dart';
import '../constants/storage_keys.dart';

class HiveService {
  static Future<void> initialize() async {
    await Hive.initFlutter();
    await Hive.openBox(StorageKeys.hiveBoxName);
  }

  static Box get _box => Hive.box(StorageKeys.hiveBoxName);

  static Future<void> put(String key, dynamic value) async {
    await _box.put(key, value);
  }

  static dynamic get(String key) {
    return _box.get(key);
  }

  static Future<void> delete(String key) async {
    await _box.delete(key);
  }

  static Future<void> clear() async {
    await _box.clear();
  }

  static Future<void> putList<T>(String key, List<T> items) async {
    await _box.put(key, items);
  }

  static List<T>? getList<T>(String key) {
    final data = _box.get(key);
    if (data is List) return data.cast<T>();
    return null;
  }
}
