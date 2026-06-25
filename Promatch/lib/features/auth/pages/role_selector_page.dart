import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../models/auth_role.dart';
import '../widgets/role_card.dart';

class RoleSelectorPage extends StatelessWidget {
  const RoleSelectorPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xl),
          child: Column(
            children: [
              const Spacer(flex: 2),
              Text(
                'Join ProMatch',
                style: AppTextStyles.headline1,
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'Choose how you want to use ProMatch',
                style: AppTextStyles.body1.copyWith(color: ColorTokens.textSecondary),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppSpacing.xxxl),
              ...AuthRole.values.map((role) => Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.lg),
                child: RoleCard(
                  role: role,
                  onTap: () => context.go('/login/${role.path}'),
                ),
              )),
              const Spacer(flex: 3),
            ],
          ),
        ),
      ),
    );
  }
}
