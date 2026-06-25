import 'package:flutter/material.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../../../core/widgets/pm_avatar.dart';
import '../../../shared/models/profile_model.dart';

class ProfessionalSearchModal extends StatelessWidget {
  final List<ProfileModel> results;
  final Function(ProfileModel) onSelect;

  const ProfessionalSearchModal({
    super.key,
    required this.results,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      initialChildSize: 0.7,
      minChildSize: 0.4,
      maxChildSize: 0.9,
      expand: false,
      builder: (_, scrollController) {
        return Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            children: [
              Container(
                width: 40, height: 4,
                decoration: BoxDecoration(
                  color: ColorTokens.border,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              Text('Search Results', style: AppTextStyles.subtitle1),
              const SizedBox(height: AppSpacing.lg),
              Expanded(
                child: ListView.separated(
                  controller: scrollController,
                  itemCount: results.length,
                  separatorBuilder: (_, __) => const Divider(),
                  itemBuilder: (_, index) {
                    final profile = results[index];
                    return ListTile(
                      leading: PmAvatar(name: profile.name),
                      title: Text(profile.name, style: AppTextStyles.label),
                      subtitle: Text(profile.title, style: AppTextStyles.caption),
                      trailing: Text('${profile.match}%', style: AppTextStyles.label.copyWith(color: ColorTokens.primary)),
                      onTap: () => onSelect(profile),
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
