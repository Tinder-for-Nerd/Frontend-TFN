import 'package:freezed_annotation/freezed_annotation.dart';

part 'analytics_model.freezed.dart';
part 'analytics_model.g.dart';

@freezed
class AnalyticsSummary with _$AnalyticsSummary {
  const factory AnalyticsSummary({
    @Default([]) List<TrendPoint> matchQuality,
    @Default(0.0) double responseRate,
    @Default([]) List<SkillDemand> skillDemand,
  }) = _AnalyticsSummary;

  factory AnalyticsSummary.fromJson(Map<String, dynamic> json) =>
      _$AnalyticsSummaryFromJson(json);
}

@freezed
class TrendPoint with _$TrendPoint {
  const factory TrendPoint({
    required String label,
    required double value,
  }) = _TrendPoint;

  factory TrendPoint.fromJson(Map<String, dynamic> json) =>
      _$TrendPointFromJson(json);
}

@freezed
class SkillDemand with _$SkillDemand {
  const factory SkillDemand({
    required String skill,
    required double demand,
  }) = _SkillDemand;

  factory SkillDemand.fromJson(Map<String, dynamic> json) =>
      _$SkillDemandFromJson(json);
}
