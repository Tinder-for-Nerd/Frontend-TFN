import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../theme/color_tokens.dart';

class PmAvatar extends StatelessWidget {
  final String? imageUrl;
  final String name;
  final double size;
  final bool showBorder;
  final bool isVerified;

  const PmAvatar({
    super.key,
    this.imageUrl,
    required this.name,
    this.size = 40,
    this.showBorder = false,
    this.isVerified = false,
  });

  String get _initials {
    if (name.isEmpty) return '?';
    final parts = name.trim().split(RegExp(r'\s+'));
    if (parts.length >= 2) {
      return '${parts.first[0]}${parts.last[0]}'.toUpperCase();
    }
    return parts.first[0].toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: showBorder ? Border.all(color: ColorTokens.primary, width: 2) : null,
          ),
          child: ClipOval(
            child: imageUrl != null
                ? CachedNetworkImage(
                    imageUrl: imageUrl!,
                    fit: BoxFit.cover,
                    placeholder: (_, __) => _placeholder(),
                    errorWidget: (_, __, ___) => _placeholder(),
                  )
                : _placeholder(),
          ),
        ),
        if (isVerified)
          Positioned(
            bottom: 0,
            right: 0,
            child: Container(
              width: size * 0.35,
              height: size * 0.35,
              decoration: const BoxDecoration(
                color: ColorTokens.primary,
                shape: BoxShape.circle,
              ),
              child: Icon(Icons.check, size: size * 0.2, color: Colors.white),
            ),
          ),
      ],
    );
  }

  Widget _placeholder() {
    return Container(
      color: ColorTokens.primary.withAlpha(40),
      child: Center(
        child: Text(
          _initials,
          style: TextStyle(
            color: ColorTokens.primary,
            fontWeight: FontWeight.w600,
            fontSize: size * 0.35,
          ),
        ),
      ),
    );
  }
}
