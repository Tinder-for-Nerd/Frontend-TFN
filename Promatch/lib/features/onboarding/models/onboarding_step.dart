enum OnboardingStep {
  basicInfo,
  skills,
  intent,
  preferences,
}

extension OnboardingStepX on OnboardingStep {
  String get label {
    switch (this) {
      case OnboardingStep.basicInfo:
        return 'Basic Info';
      case OnboardingStep.skills:
        return 'Skills';
      case OnboardingStep.intent:
        return 'Intent';
      case OnboardingStep.preferences:
        return 'Preferences';
    }
  }
}
