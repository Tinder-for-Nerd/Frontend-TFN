import 'package:freezed_annotation/freezed_annotation.dart';

part 'fit_score_model.freezed.dart';
part 'fit_score_model.g.dart';

@freezed
class FitScoreModel with _$FitScoreModel {
  const factory FitScoreModel({
    @Default(0) int overall,
    @Default(0) int skills,
    @Default(0) int experience,
    @Default(0) int projects,
    @Default(0) int availability,
  }) = _FitScoreModel;

  factory FitScoreModel.fromJson(Map<String, dynamic> json) =>
      _$FitScoreModelFromJson(json);
}
