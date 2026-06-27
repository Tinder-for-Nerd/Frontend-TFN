import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';
import '../../widgets/brand_input.dart';
import '../dashboard_shell.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  int _currentStep = 0;
  final _headlineController = TextEditingController();
  final _bioController = TextEditingController();
  
  final List<String> _domains = ['FinTech', 'DeepTech', 'Climate', 'SaaS', 'EdTech', 'Web3'];
  String _selectedDomain = 'FinTech';

  final List<String> _intents = ['Co-founder', 'Tech collab', 'Advisor', 'Side project'];
  String _selectedIntent = 'Co-founder';

  final List<String> _commitments = ['Part-time', 'Full-time', 'Flexible'];
  String _selectedCommitment = 'Flexible';

  final List<String> _skillsList = ['React', 'Python', 'ML', 'Figma', 'System Design', 'Solidity', 'Go'];
  final List<String> _selectedSkills = [];

  @override
  void dispose() {
    _headlineController.dispose();
    _bioController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final authProvider = Provider.of<AuthProvider>(context);
    final role = authProvider.currentRole;
    
    Color roleAccent = BrandColors.textInverse;
    if (role == 'student') {
      roleAccent = BrandColors.studentAccent;
    } else if (role == 'pro') {
      roleAccent = BrandColors.proAccent;
    } else if (role == 'org') {
      roleAccent = BrandColors.orgAccent;
    }

    final totalSteps = 4;
    final stepPercentage = (_currentStep + 1) / totalSteps;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // Progress Bar Header
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 24, 24, 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'STEP ${_currentStep + 1} OF $totalSteps',
                        style: theme.textTheme.labelSmall?.copyWith(
                          fontWeight: FontWeight.w800,
                          color: roleAccent,
                        ),
                      ),
                      Text(
                        '${((_currentStep + 1) * 25)}% complete',
                        style: theme.textTheme.labelSmall?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: stepPercentage,
                      color: roleAccent,
                      backgroundColor: BrandColors.borderDefault.withValues(alpha: 0.5),
                      minHeight: 6,
                    ),
                  ),
                ],
              ),
            ),

            // Step Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                child: _buildStepContent(theme, roleAccent),
              ),
            ),

            // Sticky Navigation Action Footer
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Row(
                children: [
                  if (_currentStep > 0) ...[
                    Expanded(
                      child: BrandButton(
                        text: 'Back',
                        variant: BrandButtonVariant.secondary,
                        onPressed: () {
                          setState(() {
                            _currentStep--;
                          });
                        },
                      ),
                    ),
                    const SizedBox(width: 16),
                  ],
                  Expanded(
                    flex: 2,
                    child: BrandButton(
                      text: _currentStep == totalSteps - 1 ? 'Complete Profile' : 'Next Step',
                      variant: BrandButtonVariant.roleAccent,
                      roleColor: roleAccent,
                      onPressed: () {
                        if (_currentStep < totalSteps - 1) {
                          setState(() {
                            _currentStep++;
                          });
                        } else {
                          authProvider.completeOnboarding();
                          Navigator.pushAndRemoveUntil(
                            context,
                            MaterialPageRoute(
                              builder: (_) => const DashboardShell(),
                            ),
                            (route) => false,
                          );
                        }
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepContent(ThemeData theme, Color accentColor) {
    switch (_currentStep) {
      case 0:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Define your professional headline.',
              style: theme.textTheme.displayMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Introduce yourself in one punchy line. This will appear on your card deck.',
              style: theme.textTheme.bodyLarge,
            ),
            const SizedBox(height: 40),
            BrandInput(
              label: 'Headline',
              hintText: 'e.g. Student & ML Engineer | FinTech Builder',
              controller: _headlineController,
            ),
          ],
        );
      case 1:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'What are your primary skills?',
              style: theme.textTheme.displayMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Select the frameworks and languages you use most in your projects.',
              style: theme.textTheme.bodyLarge,
            ),
            const SizedBox(height: 32),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: _skillsList.map((skill) {
                final isSelected = _selectedSkills.contains(skill);
                return FilterChip(
                  label: Text(skill),
                  selected: isSelected,
                  selectedColor: accentColor.withValues(alpha: 0.12),
                  checkmarkColor: accentColor,
                  labelStyle: TextStyle(
                    fontWeight: FontWeight.w700,
                    color: isSelected ? accentColor : BrandColors.textSecondary,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                    side: BorderSide(
                      color: isSelected ? accentColor : BrandColors.borderDefault,
                    ),
                  ),
                  onSelected: (selected) {
                    setState(() {
                      if (selected) {
                        _selectedSkills.add(skill);
                      } else {
                        _selectedSkills.remove(skill);
                      }
                    });
                  },
                );
              }).toList(),
            ),
          ],
        );
      case 2:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Select domain and goals.',
              style: theme.textTheme.displayMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Align matching expectations to find ideal co-founders.',
              style: theme.textTheme.bodyLarge,
            ),
            const SizedBox(height: 32),
            
            // Domain Dropdown
            Text('Primary Industry/Domain', style: theme.textTheme.labelLarge),
            const SizedBox(height: 8),
            _buildDropdown(_domains, _selectedDomain, (val) {
              setState(() {
                _selectedDomain = val!;
              });
            }),
            
            const SizedBox(height: 24),
            
            // Intent Dropdown
            Text('Primary Intent', style: theme.textTheme.labelLarge),
            const SizedBox(height: 8),
            _buildDropdown(_intents, _selectedIntent, (val) {
              setState(() {
                _selectedIntent = val!;
              });
            }),
          ],
        );
      case 3:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Tell builders about yourself.',
              style: theme.textTheme.displayMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Write a brief bio. Mention what projects you are actively hacking on.',
              style: theme.textTheme.bodyLarge,
            ),
            const SizedBox(height: 32),
            Text('Short Biography', style: theme.textTheme.labelLarge),
            const SizedBox(height: 8),
            TextField(
              controller: _bioController,
              maxLines: 6,
              decoration: InputDecoration(
                hintText: 'e.g. Developing ML-powered FinTech apps to solve real-world problems. Love hackathons and building developer tools.',
                enabledBorder: OutlineInputBorder(
                  borderRadius: BrandRadii.smBorderRadius,
                  borderSide: const BorderSide(color: BrandColors.borderDefault),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BrandRadii.smBorderRadius,
                  borderSide: BorderSide(color: accentColor),
                ),
              ),
            ),
            
            const SizedBox(height: 24),
            Text('Commitment Level', style: theme.textTheme.labelLarge),
            const SizedBox(height: 8),
            _buildDropdown(_commitments, _selectedCommitment, (val) {
              setState(() {
                _selectedCommitment = val!;
              });
            }),
          ],
        );
      default:
        return Container();
    }
  }

  Widget _buildDropdown(List<String> items, String value, ValueChanged<String?> onChanged) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: BrandColors.surfaceMuted,
        borderRadius: BrandRadii.smBorderRadius,
        border: Border.all(color: BrandColors.borderDefault),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: value,
          isExpanded: true,
          items: items.map((item) {
            return DropdownMenuItem(
              value: item,
              child: Text(item),
            );
          }).toList(),
          onChanged: onChanged,
        ),
      ),
    );
  }
}
