import 'package:flutter/material.dart';

class OrganizerDashboardPage extends StatelessWidget {
  const OrganizerDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Organizer Dashboard')),
      body: const Center(child: Text('Organizer Dashboard Page')),
    );
  }
}
