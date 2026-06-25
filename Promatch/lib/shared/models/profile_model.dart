import 'package:freezed_annotation/freezed_annotation.dart';

part 'profile_model.freezed.dart';
part 'profile_model.g.dart';

@freezed
class ProfileModel with _$ProfileModel {
  const factory ProfileModel({
    required String id,
    required String username,
    required String name,
    required String title,
    required String role,
    required String audience,
    required String domain,
    required String intent,
    required String commitment,
    required String workStyle,
    required String location,
    required String tone,
    required int match,
    required bool verified,
    required String bio,
    required String headline,
    required List<String> skills,
    required List<String> goals,
    required List<String> why,
    required int mutuals,
    required int views,
    required int sessions,
    required int events,
    required List<String> links,
    required String cover,
    String? avatar,
    String? src,
    String? companyStage,
    String? responseRate,
    String? avgResponse,
  }) = _ProfileModel;

  factory ProfileModel.fromJson(Map<String, dynamic> json) =>
      _$ProfileModelFromJson(json);
}

extension ProfileModelX on ProfileModel {
  String get initials {
    if (name.isEmpty) return '';
    final parts = name.trim().split(RegExp(r'\s+'));
    if (parts.length >= 2) {
      return '${parts.first[0]}${parts.last[0]}'.toUpperCase();
    }
    return parts.first[0].toUpperCase();
  }
}
