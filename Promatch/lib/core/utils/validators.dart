class Validators {
  static String? email(String? value) {
    if (value == null || value.isEmpty) return 'Email is required';
    final regex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}\$');
    if (!regex.hasMatch(value)) return 'Enter a valid email';
    return null;
  }

  static String? password(String? value) {
    if (value == null || value.isEmpty) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!RegExp(r'[A-Z]').hasMatch(value)) return 'Must contain an uppercase letter';
    if (!RegExp(r'[a-z]').hasMatch(value)) return 'Must contain a lowercase letter';
    if (!RegExp(r'[0-9]').hasMatch(value)) return 'Must contain a number';
    return null;
  }

  static String? required(String? value, [String field = 'This field']) {
    if (value == null || value.trim().isEmpty) return '\ is required';
    return null;
  }

  static String? url(String? value) {
    if (value == null || value.isEmpty) return null;
    final regex = RegExp(r'^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*\$');
    if (!regex.hasMatch(value)) return 'Enter a valid URL';
    return null;
  }

  static String? minLength(String? value, int min, [String field = 'This field']) {
    if (value != null && value.length < min) return '\ must be at least \ characters';
    return null;
  }

  static String? match(String? value, String? other, [String field = 'Fields']) {
    if (value != other) return '\ do not match';
    return null;
  }
}
