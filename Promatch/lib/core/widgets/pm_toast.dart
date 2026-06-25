import 'package:flutter/material.dart';
import '../theme/color_tokens.dart';

enum ToastType { success, error, warning, info }

class PmToast {
  static void show(BuildContext context, String message, {ToastType type = ToastType.info}) {
    final color = switch (type) {
      ToastType.success => ColorTokens.success,
      ToastType.error => ColorTokens.error,
      ToastType.warning => ColorTokens.warning,
      ToastType.info => ColorTokens.info,
    };

    final icon = switch (type) {
      ToastType.success => Icons.check_circle,
      ToastType.error => Icons.error,
      ToastType.warning => Icons.warning,
      ToastType.info => Icons.info,
    };

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(icon, color: Colors.white, size: 20),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: color,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        margin: const EdgeInsets.all(16),
        duration: const Duration(seconds: 3),
      ),
    );
  }
}
