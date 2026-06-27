import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';
import '../../widgets/brand_input.dart';
import '../../widgets/web_parity_widgets.dart';
import '../onboarding/onboarding_screen.dart';

class LoginScreen extends StatefulWidget {
  final String roleId;

  const LoginScreen({
    super.key,
    required this.roleId,
  });

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    // Dynamic config mapping based on roles
    Color roleAccent = BrandColors.textInverse;
    String loginTitle = 'Welcome back';
    String loginSubtitle = 'Sign in to continue';

    if (widget.roleId == 'student') {
      roleAccent = BrandColors.studentAccent;
      loginTitle = 'Welcome back, builder';
      loginSubtitle = 'Sign in to your student account';
    } else if (widget.roleId == 'professional') {
      roleAccent = BrandColors.proAccent;
      loginTitle = 'Sign in as a Professional';
      loginSubtitle = 'Access your pipeline, matches, and sessions';
    } else if (widget.roleId == 'organization') {
      roleAccent = BrandColors.orgAccent;
      loginTitle = 'Organization login';
      loginSubtitle = 'Manage cohorts, events, and club connections';
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: BrandColors.textPrimary),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: WebScaffoldBackground(
        child: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
            child: WebCard(
              bold: true,
              padding: const EdgeInsets.all(24),
              child: Form(
                key: _formKey,
                child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Accent Dot indicator
                  Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: roleAccent,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  // Copy titles
                  Text(
                    loginTitle,
                    style: theme.textTheme.displayMedium?.copyWith(
                      fontSize: 28,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Tinder For Nerds',
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: BrandColors.primary,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    loginSubtitle,
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: BrandColors.textSecondary.withValues(alpha: 0.8),
                    ),
                  ),
                  const SizedBox(height: 36),

                  // Name Field
                  BrandInput(
                    label: 'Full Name',
                    hintText: 'Alex Kumar',
                    controller: _nameController,
                    validator: (val) {
                      if (val == null || val.trim().isEmpty) {
                        return 'Please enter your name';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 20),

                  // Email Field
                  BrandInput(
                    label: 'Email Address',
                    hintText: 'name@example.com',
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    validator: (val) {
                      if (val == null || val.trim().isEmpty) {
                        return 'Please enter your email';
                      }
                      if (!val.contains('@')) {
                        return 'Please enter a valid email';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 20),

                  // Password Field
                  BrandInput(
                    label: 'Password',
                    hintText: 'At least 8 characters',
                    controller: _passwordController,
                    isPassword: true,
                    validator: (val) {
                      if (val == null || val.trim().isEmpty) {
                        return 'Please enter your password';
                      }
                      if (val.length < 8) {
                        return 'Password must be at least 8 characters';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 32),

                  // Login Actions
                  BrandButton(
                    text: 'Authenticate Account',
                    variant: BrandButtonVariant.roleAccent,
                    roleColor: roleAccent,
                    fullWidth: true,
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        authProvider.login(
                          _emailController.text.trim(),
                          _nameController.text.trim(),
                        );
                        // Forward user to onboarding flow
                        Navigator.pushAndRemoveUntil(
                          context,
                          MaterialPageRoute(
                            builder: (_) => const OnboardingScreen(),
                          ),
                          (route) => false,
                        );
                      }
                    },
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Divider
                  Row(
                    children: [
                      Expanded(child: Divider(color: BrandColors.borderDefault.withValues(alpha: 0.5))),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: Text(
                          'OR CONTINUE WITH',
                          style: theme.textTheme.labelSmall?.copyWith(
                            fontSize: 10,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 0.5,
                          ),
                        ),
                      ),
                      Expanded(child: Divider(color: BrandColors.borderDefault.withValues(alpha: 0.5))),
                    ],
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Social Google / LinkedIn actions
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () {
                            authProvider.login(_emailController.text, 'Google Member');
                            Navigator.pushAndRemoveUntil(
                              context,
                              MaterialPageRoute(builder: (_) => const OnboardingScreen()),
                              (route) => false,
                            );
                          },
                          icon: const Icon(Icons.g_mobiledata, size: 28, color: BrandColors.textPrimary),
                          label: Text(
                            'Google',
                            style: theme.textTheme.labelLarge?.copyWith(
                              fontWeight: FontWeight.w700,
                              color: BrandColors.textPrimary,
                            ),
                          ),
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            side: const BorderSide(color: BrandColors.borderDefault),
                            shape: RoundedRectangleBorder(borderRadius: BrandRadii.smBorderRadius),
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () {
                            authProvider.login(_emailController.text, 'LinkedIn Colleague');
                            Navigator.pushAndRemoveUntil(
                              context,
                              MaterialPageRoute(builder: (_) => const OnboardingScreen()),
                              (route) => false,
                            );
                          },
                          icon: const Icon(Icons.link, size: 20, color: BrandColors.textPrimary),
                          label: Text(
                            'LinkedIn',
                            style: theme.textTheme.labelLarge?.copyWith(
                              fontWeight: FontWeight.w700,
                              color: BrandColors.textPrimary,
                            ),
                          ),
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            side: const BorderSide(color: BrandColors.borderDefault),
                            shape: RoundedRectangleBorder(borderRadius: BrandRadii.smBorderRadius),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              ),
            ),
          ),
        ),
        ),
      ),
    );
  }
}
