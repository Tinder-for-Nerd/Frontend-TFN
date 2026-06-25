import 'package:flutter/material.dart';
import '../theme/text_styles.dart';

class PmModal extends StatelessWidget {
  final String title;
  final Widget child;
  final List<Widget>? actions;

  const PmModal({
    super.key,
    required this.title,
    required this.child,
    this.actions,
  });

  static Future<T?> show<T>(BuildContext context, PmModal modal) {
    return showModalBottomSheet<T>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: modal,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 16, 24, 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Center(
            child: Container(
              width: 40, height: 4,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(title, style: AppTextStyles.subtitle1),
          const SizedBox(height: 16),
          child,
          if (actions != null) ...[
            const SizedBox(height: 16),
            ...actions!,
          ],
        ],
      ),
    );
  }
}
