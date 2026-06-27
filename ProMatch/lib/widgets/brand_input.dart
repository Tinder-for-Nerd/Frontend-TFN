import 'package:flutter/material.dart';
import '../theme/brand_theme.dart';

class BrandInput extends StatefulWidget {
  final String label;
  final String hintText;
  final TextEditingController controller;
  final bool isPassword;
  final TextInputType keyboardType;
  final String? Function(String?)? validator;

  const BrandInput({
    super.key,
    required this.label,
    required this.hintText,
    required this.controller,
    this.isPassword = false,
    this.keyboardType = TextInputType.text,
    this.validator,
  });

  @override
  State<BrandInput> createState() => _BrandInputState();
}

class _BrandInputState extends State<BrandInput> {
  bool _obscureText = true;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: theme.textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w700,
            color: BrandColors.textPrimary,
          ),
        ),
        const SizedBox(height: 6),
        Focus(
          onFocusChange: (_) {},
          child: Container(
            decoration: BoxDecoration(
              color: BrandColors.surfaceMuted,
              borderRadius: BrandRadii.smBorderRadius,
              border: Border.all(color: BrandColors.boldBorder, width: 3),
              boxShadow: BrandShadows.bold,
            ),
            child: TextFormField(
              controller: widget.controller,
              obscureText: widget.isPassword && _obscureText,
              keyboardType: widget.keyboardType,
              validator: widget.validator,
              style: theme.textTheme.bodyLarge,
              decoration: InputDecoration(
                hintText: widget.hintText,
                hintStyle: theme.textTheme.bodyMedium?.copyWith(
                  color: BrandColors.textSecondary.withValues(alpha: 0.6),
                ),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                filled: true,
                fillColor: Colors.transparent,
                enabledBorder: OutlineInputBorder(
                  borderRadius: BrandRadii.smBorderRadius,
                  borderSide: BorderSide.none,
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BrandRadii.smBorderRadius,
                  borderSide: BorderSide.none,
                ),
                errorBorder: OutlineInputBorder(
                  borderRadius: BrandRadii.smBorderRadius,
                  borderSide: const BorderSide(
                    color: BrandColors.error,
                    width: 1.0,
                  ),
                ),
                focusedErrorBorder: OutlineInputBorder(
                  borderRadius: BrandRadii.smBorderRadius,
                  borderSide: const BorderSide(
                    color: BrandColors.error,
                    width: 1.5,
                  ),
                ),
                suffixIcon: widget.isPassword
                    ? IconButton(
                        icon: Icon(
                          _obscureText ? Icons.visibility_off : Icons.visibility,
                          color: BrandColors.textSecondary,
                          size: 20,
                        ),
                        onPressed: () {
                          setState(() {
                            _obscureText = !_obscureText;
                          });
                        },
                      )
                    : null,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
