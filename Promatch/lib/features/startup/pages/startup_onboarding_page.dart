import 'package:flutter/material.dart';

class StartupOnboardingPage extends StatelessWidget {
  const StartupOnboardingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Onboarding')),
      body: const Center(child: Text('Startup Onboarding Page')),
    );
  }
}
