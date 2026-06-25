import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../../../features/auth/models/auth_role.dart';
import '../widgets/login_form.dart';
import '../widgets/oauth_button.dart';

class LoginPage extends StatefulWidget {
  final String mode;
  final String rolePath;

  const LoginPage({
    super.key,
    required this.mode,
    required this.rolePath,
  });

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  bool _isLoading = false;
  bool _obscurePassword = true;

  AuthRole get _role => AuthRole.fromPath(widget.rolePath);
  bool get _isSignup => widget.mode == 'signup';

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isLoading = true);
    Future.delayed(const Duration(seconds: 1), () {
      if (!mounted) return;
      setState(() => _isLoading = false);
      context.go(_role.dashboardRoute);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  _isSignup ? 'Create Account' : 'Welcome Back',
                  style: AppTextStyles.headline2,
                ),
                const SizedBox(height: AppSpacing.sm),
                Text(
                  '${_role.label} ${_isSignup ? 'sign up' : 'log in'} to ProMatch',
                  style: AppTextStyles.body1.copyWith(color: ColorTokens.textSecondary),
                ),
                const SizedBox(height: AppSpacing.xxl),

                if (_isSignup) ...[
                  TextFormField(
                    controller: _nameController,
                    decoration: const InputDecoration(
                      labelText: 'Full Name',
                      prefixIcon: Icon(Icons.person_outline),
                    ),
                    validator: (v) => v == null || v.isEmpty ? 'Name is required' : null,
                  ),
                  const SizedBox(height: AppSpacing.lg),
                ],

                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    labelText: 'Email',
                    prefixIcon: Icon(Icons.email_outlined),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Email is required';
                    if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(v)) return 'Invalid email';
                    return null;
                  },
                ),
                const SizedBox(height: AppSpacing.lg),

                TextFormField(
                  controller: _passwordController,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    prefixIcon: const Icon(Icons.lock_outlined),
                    suffixIcon: IconButton(
                      icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                      onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                    ),
                  ),
                  obscureText: _obscurePassword,
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Password is required';
                    if (v.length < 8) return 'Password must be at least 8 characters';
                    return null;
                  },
                ),
                const SizedBox(height: AppSpacing.xxl),

                ElevatedButton(
                  onPressed: _isLoading ? null : _submit,
                  child: _isLoading
                      ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2))
                      : Text(_isSignup ? 'Sign Up' : 'Log In'),
                ),
                const SizedBox(height: AppSpacing.xl),

                Row(
                  children: [
                    const Expanded(child: Divider()),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                      child: Text('or continue with', style: AppTextStyles.caption),
                    ),
                    const Expanded(child: Divider()),
                  ],
                ),
                const SizedBox(height: AppSpacing.lg),

                ..._role.oauthOrder.map((provider) => Padding(
                  padding: const EdgeInsets.only(bottom: AppSpacing.md),
                  child: OAuthButton(provider: provider, role: _role),
                )),

                const SizedBox(height: AppSpacing.xl),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      _isSignup ? 'Already have an account? ' : "Don't have an account? ",
                      style: AppTextStyles.body2,
                    ),
                    GestureDetector(
                      onTap: () => context.goNamed(
                        _isSignup ? 'login' : 'signup',
                        pathParameters: {'rolePath': widget.rolePath},
                      ),
                      child: Text(
                        _isSignup ? 'Log In' : 'Sign Up',
                        style: AppTextStyles.body2.copyWith(
                          color: ColorTokens.primary,
                          fontWeight: FontWeight.w600,
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
    );
  }
}
