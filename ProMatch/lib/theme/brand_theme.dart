import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

enum BrandRole { student, pro, org }

class BrandColors {
  static const Color primary = Color(0xFF0084FF);
  static const Color primaryContainer = Color(0xFF319AFF);
  static const Color navy = Color(0xFF111A3E);
  static const Color ivory = Color(0xFFFFFAF0);
  static const Color boldBorder = Color(0xFF111111);

  static const Color textPrimary = Color(0xFF111A3E);
  static const Color textSecondary = Color(0xFF5A6078);
  static const Color surfaceMuted = Color(0xFFFFFFFF);
  static const Color textInverse = Color(0xFF0084FF);
  static const Color surfaceStrong = Color(0xFFF8FAFC);

  static const Color textInverseContainer = Color(0xFF319AFF);

  static const Color studentAccent = Color(0xFFFF4B6E);
  static const Color proAccent = Color(0xFF0A66C2);
  static const Color orgAccent = Color(0xFFF5A623);

  static const Color tertiary = Color(0xFFFF801E);
  static const Color success = Color(0xFF15803D);
  static const Color warning = Color(0xFFB45309);
  static const Color error = Color(0xFFBA1A1A);

  static const Color surfaceInset = Color(0xFFEEF2FB);
  static const Color bgSurfaceLow = Color(0x75FFFFFF);

  static const Color borderDefault = Color(0x1F111A3E);
  static const Color borderSubtle = Color(0x0D111A3E);

  static Color roleAccent(BrandRole role) {
    switch (role) {
      case BrandRole.student:
        return studentAccent;
      case BrandRole.pro:
        return proAccent;
      case BrandRole.org:
        return orgAccent;
    }
  }
}

class BrandTypography {
  static const String fontFamily = 'Inter';
  static const double fontSizeBase = 16.0;
  static const FontWeight fontWeightBase = FontWeight.w400;
  static const double lineHeightBase = 25.6;

  static const double xs = 12.0;
  static const double sm = 13.0;
  static const double md = 14.0;
  static const double lg = 16.0;
  static const double xl = 18.0;
  static const double xxl = 20.0;
  static const double xxxl = 24.0;
  static const double xxxxl = 42.0;
}

class BrandSpacing {
  static const double xs = 4.0;
  static const double sm = 10.0;
  static const double md = 12.0;
  static const double lg = 14.0;
  static const double xl = 16.0;
  static const double xxl = 18.0;
  static const double xxxl = 20.0;
  static const double xxxxl = 22.0;
}

class BrandRadii {
  static const double xs = 12.0;
  static const double sm = 14.0;
  static const double md = 16.0;
  static const double lg = 18.0;
  static const double xl = 20.0;
  static const double xxl = 22.0;
  static const double full = 9999.0;

  static const BorderRadius xsBorderRadius = BorderRadius.all(Radius.circular(xs));
  static const BorderRadius smBorderRadius = BorderRadius.all(Radius.circular(sm));
  static const BorderRadius mdBorderRadius = BorderRadius.all(Radius.circular(md));
  static const BorderRadius lgBorderRadius = BorderRadius.all(Radius.circular(lg));
  static const BorderRadius xlBorderRadius = BorderRadius.all(Radius.circular(xl));
  static const BorderRadius xxlBorderRadius = BorderRadius.all(Radius.circular(xxl));
  static const BorderRadius fullBorderRadius = BorderRadius.all(Radius.circular(full));
}

class BrandShadows {
  static final List<BoxShadow> bold = [
    BoxShadow(
      color: Colors.black.withValues(alpha: 0.16),
      offset: const Offset(6, 6),
      blurRadius: 0,
    ),
  ];

  static final List<BoxShadow> sm = [
    BoxShadow(
      color: const Color(0xFF111A3E).withValues(alpha: 0.06),
      offset: const Offset(0, 4),
      blurRadius: 12,
    ),
  ];

  static final List<BoxShadow> md = [
    BoxShadow(
      color: const Color(0xFF111A3E).withValues(alpha: 0.10),
      offset: const Offset(0, 12),
      blurRadius: 32,
    ),
  ];

  static final List<BoxShadow> lg = [
    BoxShadow(
      color: const Color(0xFF111A3E).withValues(alpha: 0.06),
      offset: const Offset(0, 8),
      blurRadius: 20,
    ),
  ];

  static final List<BoxShadow> xl = [
    BoxShadow(
      color: const Color(0xFF0084FF).withValues(alpha: 0.28),
      offset: const Offset(0, 14),
      blurRadius: 36,
    ),
  ];
}

class BrandMotion {
  static const Duration instant = Duration(milliseconds: 160);
  static const Duration fast = Duration(milliseconds: 180);
  static const Duration normal = Duration(milliseconds: 200);
}

class BrandTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: BrandColors.primary,
        primary: BrandColors.primary,
        onPrimary: BrandColors.surfaceMuted,
        surface: BrandColors.surfaceMuted,
        onSurface: BrandColors.textPrimary,
        error: BrandColors.error,
        onError: BrandColors.surfaceMuted,
      ),
      scaffoldBackgroundColor: BrandColors.surfaceStrong,
      appBarTheme: const AppBarTheme(
        backgroundColor: BrandColors.surfaceMuted,
        foregroundColor: BrandColors.textPrimary,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: false,
      ),
      dividerTheme: const DividerThemeData(
        color: BrandColors.borderDefault,
        thickness: 1,
      ),
      textTheme: TextTheme(
        displayLarge: GoogleFonts.fustat(
          fontSize: BrandTypography.xxxxl,
          fontWeight: FontWeight.w800,
          color: BrandColors.textPrimary,
        ),
        displayMedium: GoogleFonts.fustat(
          fontSize: BrandTypography.xxxl,
          fontWeight: FontWeight.w800,
          color: BrandColors.textPrimary,
        ),
        headlineLarge: GoogleFonts.inter(
          fontSize: BrandTypography.xxl,
          fontWeight: FontWeight.w600,
          color: BrandColors.textPrimary,
        ),
        headlineMedium: GoogleFonts.inter(
          fontSize: BrandTypography.xl,
          fontWeight: FontWeight.w600,
          color: BrandColors.textPrimary,
        ),
        titleLarge: GoogleFonts.inter(
          fontSize: BrandTypography.lg,
          fontWeight: FontWeight.w600,
          color: BrandColors.textPrimary,
        ),
        titleMedium: GoogleFonts.inter(
          fontSize: BrandTypography.md,
          fontWeight: FontWeight.w500,
          color: BrandColors.textPrimary,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: BrandTypography.lg,
          fontWeight: FontWeight.w400,
          color: BrandColors.textPrimary,
          height: 1.6,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: BrandTypography.md,
          fontWeight: FontWeight.w400,
          color: BrandColors.textSecondary,
        ),
        bodySmall: GoogleFonts.inter(
          fontSize: BrandTypography.sm,
          fontWeight: FontWeight.w400,
          color: BrandColors.textSecondary,
        ),
        labelLarge: GoogleFonts.inter(
          fontSize: BrandTypography.md,
          fontWeight: FontWeight.w600,
          color: BrandColors.textPrimary,
        ),
        labelMedium: GoogleFonts.inter(
          fontSize: BrandTypography.xs,
          fontWeight: FontWeight.w500,
          color: BrandColors.textSecondary,
        ),
        labelSmall: GoogleFonts.inter(
          fontSize: BrandTypography.xs,
          fontWeight: FontWeight.w400,
          color: BrandColors.textSecondary,
        ),
      ),
    );
  }
}
