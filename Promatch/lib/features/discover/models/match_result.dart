import 'package:freezed_annotation/freezed_annotation.dart';

part 'match_result.freezed.dart';
part 'match_result.g.dart';

@freezed
class MatchResult with _$MatchResult {
  const factory MatchResult({
    required String id,
    required String profileId,
    required String name,
    required String title,
    required String avatar,
    required int matchScore,
    required List<String> skills,
  }) = _MatchResult;

  factory MatchResult.fromJson(Map<String, dynamic> json) =>
      _$MatchResultFromJson(json);
}
