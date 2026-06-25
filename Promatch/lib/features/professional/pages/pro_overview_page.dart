import 'package:flutter/material.dart';

class ProOverviewPage extends StatelessWidget {
  const ProOverviewPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Overview')),
      body: const Center(child: Text('Pro Overview Page')),
    );
  }
}
