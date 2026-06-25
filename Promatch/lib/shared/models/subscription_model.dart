import 'package:freezed_annotation/freezed_annotation.dart';

part 'subscription_model.freezed.dart';
part 'subscription_model.g.dart';

@freezed
class SubscriptionModel with _$SubscriptionModel {
  const factory SubscriptionModel({
    @Default('free') String plan,
    @Default([]) List<String> gatedFeatures,
  }) = _SubscriptionModel;

  factory SubscriptionModel.fromJson(Map<String, dynamic> json) =>
      _$SubscriptionModelFromJson(json);
}

extension SubscriptionModelX on SubscriptionModel {
  bool canUse(String feature) =>
      plan == 'pro' || !gatedFeatures.contains(feature);
}
