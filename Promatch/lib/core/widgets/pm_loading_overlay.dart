import 'package:flutter/material.dart';
import '../theme/color_tokens.dart';

class PmLoadingOverlay extends StatelessWidget {
  final bool isLoading;
  final Widget child;

  const PmLoadingOverlay({
    super.key,
    required this.isLoading,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        child,
        if (isLoading)
          Container(
            color: ColorTokens.overlay,
            child: const Center(child: CircularProgressIndicator()),
          ),
      ],
    );
  }
}
