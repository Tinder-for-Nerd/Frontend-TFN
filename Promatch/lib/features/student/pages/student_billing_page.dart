import 'package:flutter/material.dart';

class StudentBillingPage extends StatelessWidget {
  const StudentBillingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Billing')),
      body: const Center(child: Text('Student Billing Page')),
    );
  }
}
