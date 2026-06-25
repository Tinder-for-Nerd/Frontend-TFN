enum AuthRole {
  student,
  pro,
  org;

  static AuthRole fromPath(String path) {
    switch (path.toLowerCase()) {
      case 'professional': return AuthRole.pro;
      case 'organization': return AuthRole.org;
      default: return AuthRole.student;
    }
  }

  static AuthRole fromString(String value) {
    switch (value.toLowerCase()) {
      case 'pro':
      case 'professional':
        return AuthRole.pro;
      case 'org':
      case 'organization':
        return AuthRole.org;
      default:
        return AuthRole.student;
    }
  }
}

extension AuthRoleX on AuthRole {
  String get path {
    switch (this) {
      case AuthRole.student: return 'student';
      case AuthRole.pro: return 'professional';
      case AuthRole.org: return 'organization';
    }
  }

  String get label {
    switch (this) {
      case AuthRole.student: return 'Student';
      case AuthRole.pro: return 'Professional';
      case AuthRole.org: return 'Organization';
    }
  }

  String get accentColorHex {
    switch (this) {
      case AuthRole.student: return '#FF6B6B';
      case AuthRole.pro: return '#0084FF';
      case AuthRole.org: return '#FFB347';
    }
  }

  String get tagline {
    switch (this) {
      case AuthRole.student: return 'Your next co-founder is one swipe away.';
      case AuthRole.pro: return 'Where serious builders find their technical co-founder.';
      case AuthRole.org: return "Your community's builder network, supercharged.";
    }
  }

  List<String> get tags {
    switch (this) {
      case AuthRole.student: return ['Hackathons', 'Side projects', 'Early teams'];
      case AuthRole.pro: return ['Co-founders', 'Advisors', 'Freelancers'];
      case AuthRole.org: return ['GDG Chapters', 'Incubators', 'Accelerators'];
    }
  }

  List<String> get oauthOrder {
    switch (this) {
      case AuthRole.student: return ['google', 'linkedin'];
      case AuthRole.pro: return ['linkedin', 'google'];
      case AuthRole.org: return ['google'];
    }
  }

  String get dashboardRoute {
    switch (this) {
      case AuthRole.student: return '/student/home';
      case AuthRole.pro: return '/pro/overview';
      case AuthRole.org: return '/org/dashboard';
    }
  }
}
