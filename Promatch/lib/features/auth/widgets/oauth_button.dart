import 'package:flutter/material.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../models/auth_role.dart';

class OAuthButton extends StatelessWidget {
  final String provider;
  final AuthRole role;

  const OAuthButton({
    super.key,
    required this.provider,
    required this.role,
  });

  @override
  Widget build(BuildContext context) {
    final isGoogle = provider == 'google';
    final label = isGoogle ? 'Continue with Google' : 'Continue with LinkedIn';

    return OutlinedButton.icon(
      onPressed: () {},
      icon: Icon(
        isGoogle ? Icons.g_mobiledata : Icons.link,
        color: isGoogle ? Colors.red : ColorTokens.proAccent,
      ),
      label: Text(label, style: AppTextStyles.button),
      style: OutlinedButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }
}
