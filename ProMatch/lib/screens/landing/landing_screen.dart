
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../theme/brand_theme.dart';
import '../auth/role_selector_screen.dart';

// ─────────────────────────────────────────────────────────────────────────────
// Landing Screen – mirrors the ProMatch web landing page
// ─────────────────────────────────────────────────────────────────────────────

class LandingScreen extends StatefulWidget {
  const LandingScreen({super.key});

  @override
  State<LandingScreen> createState() => _LandingScreenState();
}

class _LandingScreenState extends State<LandingScreen>
    with TickerProviderStateMixin {
  late final AnimationController _floatCtrl;
  late final AnimationController _entryCtrl;
  late final Animation<double> _float;
  late final Animation<double> _entryFade;
  late final Animation<Offset> _entrySlide;

  @override
  void initState() {
    super.initState();

    _floatCtrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    )..repeat(reverse: true);

    _float = Tween<double>(begin: -7.0, end: 7.0).animate(
      CurvedAnimation(parent: _floatCtrl, curve: Curves.easeInOut),
    );

    _entryCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    )..forward();

    _entryFade = CurvedAnimation(
      parent: _entryCtrl,
      curve: const Interval(0.0, 0.65, curve: Curves.easeOut),
    );

    _entrySlide = Tween<Offset>(
      begin: const Offset(0, 0.06),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(
        parent: _entryCtrl,
        curve: const Interval(0.0, 0.75, curve: Curves.easeOut),
      ),
    );
  }

  @override
  void dispose() {
    _floatCtrl.dispose();
    _entryCtrl.dispose();
    super.dispose();
  }

  void _goToApp() => Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const RoleSelectorScreen()),
      );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF2F5FC),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _Nav(onCta: _goToApp),
              _Hero(float: _float, entryFade: _entryFade, entrySlide: _entrySlide, onCta: _goToApp),
              _FeatureStrip(),
              _HowItWorks(),
              _FinalCta(onCta: _goToApp),
              const SizedBox(height: 48),
            ],
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────────────────────

class _Nav extends StatelessWidget {
  final VoidCallback onCta;
  const _Nav({required this.onCta});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
      child: Row(
        children: [
          // Logo mark
          const _LogoMark(),
          const SizedBox(width: 8),
          Text(
            'Tinder for Nerds',
            style: GoogleFonts.inter(
              fontSize: 15,
              fontWeight: FontWeight.w800,
              color: BrandColors.textPrimary,
              letterSpacing: -0.3,
            ),
          ),
          const Spacer(),
          _NavPill(label: 'Log in', onTap: onCta),
          const SizedBox(width: 10),
          _DarkPill(label: 'Open dashboard', onTap: onCta),
        ],
      ),
    );
  }
}

class _LogoMark extends StatelessWidget {
  const _LogoMark();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 28,
      height: 28,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF0084FF), Color(0xFF319AFF)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(8),
      ),
      child: const Icon(Icons.bolt, color: Colors.white, size: 18),
    );
  }
}

class _NavPill extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const _NavPill({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Text(
        label,
        style: GoogleFonts.inter(
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: BrandColors.textSecondary,
        ),
      ),
    );
  }
}

class _DarkPill extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const _DarkPill({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: BrandColors.textPrimary,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(
          label,
          style: GoogleFonts.inter(
            fontSize: 12,
            fontWeight: FontWeight.w700,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

class _Hero extends StatelessWidget {
  final Animation<double> float;
  final Animation<double> entryFade;
  final Animation<Offset> entrySlide;
  final VoidCallback onCta;
  const _Hero({
    required this.float,
    required this.entryFade,
    required this.entrySlide,
    required this.onCta,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: FadeTransition(
        opacity: entryFade,
        child: SlideTransition(
          position: entrySlide,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Eyebrow row
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: const Color(0xFF0ABF7E).withOpacity(0.12),
                      borderRadius: BorderRadius.circular(100),
                      border: Border.all(color: const Color(0xFF0ABF7E).withOpacity(0.3)),
                    ),
                    child: Text(
                      'SKILL-FIRST NETWORKING',
                      style: GoogleFonts.inter(
                        fontSize: 9,
                        fontWeight: FontWeight.w800,
                        color: const Color(0xFF0ABF7E),
                        letterSpacing: 0.9,
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Row(
                    children: List.generate(5, (i) => const Icon(Icons.star_rounded, size: 13, color: Color(0xFFF59E0B))),
                  ),
                  const SizedBox(width: 5),
                  Text(
                    '4.9 from 2,700+ builders',
                    style: GoogleFonts.inter(fontSize: 11, color: BrandColors.textSecondary, fontWeight: FontWeight.w500),
                  ),
                ],
              ),
              const SizedBox(height: 18),

              // Headline — "Find your next nerd-powered connection"
              Text(
                'Find your next',
                style: GoogleFonts.inter(
                  fontSize: 38,
                  fontWeight: FontWeight.w900,
                  color: BrandColors.textPrimary,
                  height: 1.1,
                  letterSpacing: -1.2,
                ),
              ),
              ShaderMask(
                shaderCallback: (bounds) => const LinearGradient(
                  colors: [Color(0xFF0084FF), Color(0xFF00C6FF)],
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                ).createShader(bounds),
                child: Text(
                  'nerd-powered',
                  style: GoogleFonts.inter(
                    fontSize: 38,
                    fontWeight: FontWeight.w900,
                    color: Colors.white, // masked by shader
                    height: 1.1,
                    letterSpacing: -1.2,
                  ),
                ),
              ),
              Text(
                'connection',
                style: GoogleFonts.inter(
                  fontSize: 38,
                  fontWeight: FontWeight.w900,
                  color: BrandColors.textPrimary,
                  height: 1.1,
                  letterSpacing: -1.2,
                ),
              ),
              const SizedBox(height: 16),

              Text(
                'Tinder for Nerds matches students, mentors, and founders by skills, intent, and collaboration fit—then takes you from profile to chat to booked session in one flow.',
                style: GoogleFonts.inter(
                  fontSize: 15,
                  color: BrandColors.textSecondary,
                  height: 1.6,
                ),
              ),
              const SizedBox(height: 26),

              // CTA row
              Row(
                children: [
                  Expanded(
                    child: _GlowButton(label: 'Get started free', onTap: onCta),
                  ),
                  const SizedBox(width: 12),
                  _GhostButton(label: "I'm a freelancer", onTap: onCta),
                ],
              ),
              const SizedBox(height: 20),

              // Checks
              _CheckRow(label: 'Swipe discovery with smart filters'),
              const SizedBox(height: 6),
              _CheckRow(label: 'Real-time chat & presence'),
              const SizedBox(height: 6),
              _CheckRow(label: 'Events & bookable 1:1 sessions'),
              const SizedBox(height: 32),

              // Showcase cards stack
              _ShowcaseCards(float: float, onCta: onCta),
            ],
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Showcase Cards
// ─────────────────────────────────────────────────────────────────────────────

class _ShowcaseCards extends StatelessWidget {
  final Animation<double> float;
  final VoidCallback onCta;
  const _ShowcaseCards({required this.float, required this.onCta});

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: float,
      builder: (_, __) => Column(
        children: [
          // New message notification chip
          Transform.translate(
            offset: Offset(0, float.value * 0.5),
            child: Align(
              alignment: Alignment.centerRight,
              child: _NotifChip(
                icon: Icons.chat_bubble_outline_rounded,
                title: 'New message',
                subtitle: 'Want to hop on a quick call next week?',
              ),
            ),
          ),
          const SizedBox(height: 12),

          // Main profile card
          Transform.translate(
            offset: Offset(0, float.value),
            child: _ProfileShowCard(onCta: onCta),
          ),
          const SizedBox(height: 12),

          // Event chip
          Transform.translate(
            offset: Offset(0, -float.value * 0.7),
            child: Align(
              alignment: Alignment.centerLeft,
              child: _NotifChip(
                icon: Icons.calendar_today_rounded,
                title: 'AI Founders Meetup',
                subtitle: 'Tomorrow · 6:00 PM',
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _NotifChip extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  const _NotifChip({required this.icon, required this.title, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: BrandShadows.md,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: BrandColors.textInverse),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(title, style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w700, color: BrandColors.textPrimary)),
              Text(subtitle, style: GoogleFonts.inter(fontSize: 11, color: BrandColors.textSecondary)),
            ],
          ),
        ],
      ),
    );
  }
}

class _ProfileShowCard extends StatelessWidget {
  final VoidCallback onCta;
  const _ProfileShowCard({required this.onCta});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: BrandShadows.md,
      ),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: [
                CircleAvatar(
                  radius: 22,
                  backgroundColor: BrandColors.textInverse.withOpacity(0.15),
                  child: Text('SC', style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w800, color: BrandColors.textInverse)),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Sarah Chen', style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w700, color: BrandColors.textPrimary)),
                      Text('Product @ Grab · Singapore', style: GoogleFonts.inter(fontSize: 12, color: BrandColors.textSecondary)),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text('94% match', style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: BrandColors.textInverse)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 14),

            // Skill tags
            Wrap(
              spacing: 8,
              children: ['Product', 'UX', 'Mentor'].map((tag) => Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: BrandColors.surfaceInset,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(tag, style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.w600, color: BrandColors.textSecondary)),
              )).toList(),
            ),
            const SizedBox(height: 12),

            Text(
              'Open to mentoring students in PM and UX. Fast responder.',
              style: GoogleFonts.inter(fontSize: 13, color: BrandColors.textSecondary, height: 1.4),
            ),
            const SizedBox(height: 16),

            // Pass / Connect
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: onCta,
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      side: const BorderSide(color: BrandColors.borderDefault),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    child: Text('Pass', style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: BrandColors.textSecondary)),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: ElevatedButton(
                    onPressed: onCta,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: BrandColors.textInverse,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      elevation: 0,
                    ),
                    child: Text('Connect', style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700)),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature Strip
// ─────────────────────────────────────────────────────────────────────────────

class _FeatureStrip extends StatelessWidget {
  final List<Map<String, dynamic>> _features = const [
    {
      'icon': Icons.psychology_alt_rounded,
      'title': 'AI-Guided Matching',
      'desc': 'We don\'t just match resumes to keywords. Our AI learns your working style and matches you to the right people.',
      'color': Color(0xFF0084FF),
    },
    {
      'icon': Icons.bar_chart_rounded,
      'title': 'Actionable Progress',
      'desc': 'Track your growth over time. Visualize the value you\'re getting from your matches and measure collaboration quality.',
      'color': Color(0xFF0ABF7E),
    },
    {
      'icon': Icons.calendar_month_rounded,
      'title': 'Effortless Sessions',
      'desc': 'No more back-and-forth scheduling. Set your availability, find mutual time slots, and sync your calendar automatically.',
      'color': Color(0xFFFF801E),
    },
    {
      'icon': Icons.event_note_rounded,
      'title': 'Curated Micro-Events',
      'desc': 'Drop into hyper-focused, small-group sessions. High signal, low noise. Meet people who care about what you care about.',
      'color': Color(0xFF7B61FF),
    },
  ];

  const _FeatureStrip();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 24),
      child: SizedBox(
        height: 160,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 20),
          itemCount: _features.length,
          separatorBuilder: (_, __) => const SizedBox(width: 12),
          itemBuilder: (context, i) {
            final f = _features[i];
            return _FeatureCard(
              icon: f['icon'] as IconData,
              title: f['title'] as String,
              desc: f['desc'] as String,
              color: f['color'] as Color,
            );
          },
        ),
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String desc;
  final Color color;
  const _FeatureCard({required this.icon, required this.title, required this.desc, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 170,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: BrandShadows.sm,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(height: 10),
          Text(title, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: BrandColors.textPrimary)),
          const SizedBox(height: 5),
          Expanded(
            child: Text(
              desc,
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
              style: GoogleFonts.inter(fontSize: 11, color: BrandColors.textSecondary, height: 1.45),
            ),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// How It Works
// ─────────────────────────────────────────────────────────────────────────────

class _HowItWorks extends StatelessWidget {
  final List<Map<String, dynamic>> _steps = const [
    {
      'num': '01',
      'icon': Icons.person_outline_rounded,
      'title': 'Build your profile',
      'body': 'Add skills, intent, domain, and availability so matches are skill-first—not keyword spam.',
      'color': Color(0xFF0084FF),
    },
    {
      'num': '02',
      'icon': Icons.bolt_rounded,
      'title': 'Discover & connect',
      'body': 'Swipe through curated profiles, filter by fit, and connect with builders who share your goals.',
      'color': Color(0xFF0ABF7E),
    },
    {
      'num': '03',
      'icon': Icons.chat_bubble_outline_rounded,
      'title': 'Chat & meet',
      'body': 'Move into real-time chat, book 1:1 sessions, and show up to events—all in one workspace.',
      'color': Color(0xFFFF801E),
    },
  ];

  const _HowItWorks();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 36, 20, 0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            'HOW IT WORKS',
            style: GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.w800, color: BrandColors.textInverse, letterSpacing: 1.4),
          ),
          const SizedBox(height: 8),
          Text(
            'From profile to meeting in three steps',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
              fontSize: 26,
              fontWeight: FontWeight.w900,
              color: BrandColors.textPrimary,
              height: 1.15,
              letterSpacing: -0.6,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'No cold DMs. No random LinkedIn spam.\nJust high-intent matching built for builders.',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(fontSize: 14, color: BrandColors.textSecondary, height: 1.5),
          ),
          const SizedBox(height: 24),
          SizedBox(
            height: 200,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.zero,
              itemCount: _steps.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (context, i) {
                final s = _steps[i];
                return _StepCard(
                  num: s['num'] as String,
                  icon: s['icon'] as IconData,
                  title: s['title'] as String,
                  body: s['body'] as String,
                  color: s['color'] as Color,
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _StepCard extends StatelessWidget {
  final String num;
  final IconData icon;
  final String title;
  final String body;
  final Color color;
  const _StepCard({required this.num, required this.icon, required this.title, required this.body, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 185,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: BrandShadows.sm,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, color: color, size: 20),
              ),
              const Spacer(),
              Text(
                num,
                style: GoogleFonts.inter(fontSize: 28, fontWeight: FontWeight.w900, color: BrandColors.borderSubtle.withOpacity(0.5)),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Text(title, style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w800, color: BrandColors.textPrimary)),
          const SizedBox(height: 6),
          Expanded(
            child: Text(
              body,
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
              style: GoogleFonts.inter(fontSize: 12, color: BrandColors.textSecondary, height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Final CTA
// ─────────────────────────────────────────────────────────────────────────────

class _FinalCta extends StatelessWidget {
  final VoidCallback onCta;
  const _FinalCta({required this.onCta});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(20, 32, 20, 0),
      padding: const EdgeInsets.all(30),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF3B82F6), Color(0xFF1D4ED8)],
        ),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF3B82F6).withOpacity(0.32),
            offset: const Offset(0, 14),
            blurRadius: 40,
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            'Ready to find your next collaborator?',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
              fontSize: 24,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              height: 1.2,
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            'Join thousands of builders already matching on intent, not titles.',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(fontSize: 14, color: Colors.white.withOpacity(0.75), height: 1.5),
          ),
          const SizedBox(height: 26),
          Row(
            children: [
              Expanded(
                child: _CtaPrimaryBtn(label: 'Create free account', onTap: onCta),
              ),
              const SizedBox(width: 10),
              _CtaGhostBtn(label: "I'm a startup", onTap: onCta),
            ],
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared small widgets
// ─────────────────────────────────────────────────────────────────────────────

class _GlowButton extends StatefulWidget {
  final String label;
  final VoidCallback onTap;
  const _GlowButton({required this.label, required this.onTap});

  @override
  State<_GlowButton> createState() => _GlowButtonState();
}

class _GlowButtonState extends State<_GlowButton> {
  bool _down = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _down = true),
      onTapUp: (_) { setState(() => _down = false); widget.onTap(); },
      onTapCancel: () => setState(() => _down = false),
      child: AnimatedScale(
        scale: _down ? 0.96 : 1.0,
        duration: const Duration(milliseconds: 100),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            color: BrandColors.textPrimary,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: BrandColors.textPrimary.withOpacity(0.28),
                offset: const Offset(0, 6),
                blurRadius: 16,
              ),
            ],
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(widget.label, style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w700, color: Colors.white)),
              const SizedBox(width: 6),
              Container(
                width: 22, height: 22,
                decoration: BoxDecoration(color: Colors.white.withOpacity(0.18), shape: BoxShape.circle),
                child: const Icon(Icons.arrow_forward, size: 13, color: Colors.white),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _GhostButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const _GhostButton({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: BrandColors.borderDefault),
        ),
        child: Text(label, style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w600, color: BrandColors.textPrimary)),
      ),
    );
  }
}

class _CheckRow extends StatelessWidget {
  final String label;
  const _CheckRow({required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Icon(Icons.check, size: 15, color: Color(0xFF0ABF7E)),
        const SizedBox(width: 8),
        Text(label, style: GoogleFonts.inter(fontSize: 13, color: BrandColors.textSecondary, fontWeight: FontWeight.w500)),
      ],
    );
  }
}

class _CtaPrimaryBtn extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const _CtaPrimaryBtn({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(label, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: const Color(0xFF1D4ED8))),
            const SizedBox(width: 6),
            Container(
              width: 20, height: 20,
              decoration: BoxDecoration(color: const Color(0xFF1D4ED8).withOpacity(0.12), shape: BoxShape.circle),
              child: const Icon(Icons.arrow_forward, size: 12, color: Color(0xFF1D4ED8)),
            ),
          ],
        ),
      ),
    );
  }
}

class _CtaGhostBtn extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const _CtaGhostBtn({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.14),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white.withOpacity(0.25)),
        ),
        child: Text(label, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w600, color: Colors.white)),
      ),
    );
  }
}
