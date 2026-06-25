import 'package:flutter/material.dart';

class RoleColors extends ThemeExtension<RoleColors> {
  final Color student;
  final Color professional;
  final Color organization;

  const RoleColors({
    required this.student,
    required this.professional,
    required this.organization,
  });

  static const light = RoleColors(
    student: Color(0xFFFF6B6B),
    professional: Color(0xFF0084FF),
    organization: Color(0xFFFFB347),
  );

  static const dark = RoleColors(
    student: Color(0xFFFF6B6B),
    professional: Color(0xFF0084FF),
    organization: Color(0xFFFFB347),
  );

  @override
  RoleColors copyWith({
    Color? student,
    Color? professional,
    Color? organization,
  }) {
    return RoleColors(
      student: student ?? this.student,
      professional: professional ?? this.professional,
      organization: organization ?? this.organization,
    );
  }

  @override
  RoleColors lerp(ThemeExtension<RoleColors>? other, double t) {
    if (other is! RoleColors) return this;
    return RoleColors(
      student: Color.lerp(student, other.student, t)!,
      professional: Color.lerp(professional, other.professional, t)!,
      organization: Color.lerp(organization, other.organization, t)!,
    );
  }
}
