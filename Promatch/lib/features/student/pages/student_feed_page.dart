import 'package:flutter/material.dart';

class StudentFeedPage extends StatelessWidget {
  const StudentFeedPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Student Feed')),
      body: const Center(child: Text('Student Feed Page')),
    );
  }
}
