import 'package:flutter/material.dart';

class FreelancerDashboardPage extends StatelessWidget {
  const FreelancerDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: const Center(child: Text('Freelancer Dashboard Page')),
    );
  }
}
