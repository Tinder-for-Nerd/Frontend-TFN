import 'package:flutter/material.dart';

class OrgDashboardPage extends StatelessWidget {
  const OrgDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: const Center(child: Text('Org Dashboard Page')),
    );
  }
}
