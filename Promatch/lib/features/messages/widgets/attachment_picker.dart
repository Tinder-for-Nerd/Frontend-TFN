import 'package:flutter/material.dart';
import '../../../core/theme/color_tokens.dart';

class AttachmentPicker extends StatelessWidget {
  final Function(String type) onPick;

  const AttachmentPicker({super.key, required this.onPick});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _AttachmentOption(
            icon: Icons.image_outlined,
            label: 'Photo',
            color: Colors.green,
            onTap: () => onPick('image'),
          ),
          _AttachmentOption(
            icon: Icons.description_outlined,
            label: 'File',
            color: Colors.blue,
            onTap: () => onPick('file'),
          ),
          _AttachmentOption(
            icon: Icons.mic_outlined,
            label: 'Voice',
            color: Colors.purple,
            onTap: () => onPick('voice'),
          ),
        ],
      ),
    );
  }
}

class _AttachmentOption extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;

  const _AttachmentOption({
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: color.withAlpha(30),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color),
          ),
          const SizedBox(height: 4),
          Text(label, style: const TextStyle(fontSize: 12)),
        ],
      ),
    );
  }
}
