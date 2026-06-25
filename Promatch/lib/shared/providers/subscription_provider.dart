import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/subscription_model.dart';

class SubscriptionState {
  final SubscriptionModel subscription;
  final bool isLoading;

  const SubscriptionState({
    this.subscription = const SubscriptionModel(),
    this.isLoading = false,
  });

  SubscriptionState copyWith({SubscriptionModel? subscription, bool? isLoading}) {
    return SubscriptionState(
      subscription: subscription ?? this.subscription,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class SubscriptionNotifier extends StateNotifier<SubscriptionState> {
  SubscriptionNotifier() : super(const SubscriptionState());

  void setPlan(String plan) {
    state = state.copyWith(
      subscription: SubscriptionModel(plan: plan),
    );
  }

  bool canUse(String feature) {
    return state.subscription.canUse(feature);
  }
}

final subscriptionProvider = StateNotifierProvider<SubscriptionNotifier, SubscriptionState>((ref) {
  return SubscriptionNotifier();
});
