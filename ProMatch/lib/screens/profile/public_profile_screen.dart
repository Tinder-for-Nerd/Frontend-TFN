import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/app_seed_data.dart';
import '../../models/profile_model.dart';
import '../../providers/chat_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';
import '../../widgets/web_parity_widgets.dart';
import '../chat/chat_detail_screen.dart';
import '../meeting/meeting_screen.dart';

class PublicProfileScreen extends StatefulWidget {
  const PublicProfileScreen({super.key, required this.profile});

  final ProfileModel profile;

  @override
  State<PublicProfileScreen> createState() => _PublicProfileScreenState();
}

class _PublicProfileScreenState extends State<PublicProfileScreen> {
  final _topicController = TextEditingController(text: 'Professional Guidance Session');
  final _dateController = TextEditingController(text: 'June 28, 2026');
  final _timeController = TextEditingController(text: '10:00 AM');
  bool _following = false;
  bool _connected = false;

  @override
  void dispose() {
    _topicController.dispose();
    _dateController.dispose();
    _timeController.dispose();
    super.dispose();
  }

  void _connect(ChatProvider chatProvider) {
    chatProvider.addConnectionAsThread(widget.profile);
    setState(() => _connected = true);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Connected with ${widget.profile.name}.'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _message(ChatProvider chatProvider) {
    chatProvider.addConnectionAsThread(widget.profile);
    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => ChatDetailScreen(threadId: widget.profile.id)),
    );
  }

  void _showBookingDialog(ChatProvider chatProvider) {
    final parentContext = context;
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (sheetContext) {
        return Padding(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            bottom: MediaQuery.of(sheetContext).viewInsets.bottom + 20,
          ),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Book session with ${widget.profile.name}',
                  style: Theme.of(sheetContext).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
                ),
                const SizedBox(height: 14),
                _ProfileInput(label: 'Meeting topic', controller: _topicController),
                _ProfileInput(label: 'Preferred date', controller: _dateController),
                _ProfileInput(label: 'Time frame', controller: _timeController),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  child: BrandButton(
                    text: 'Book session',
                    icon: Icons.calendar_month,
                    onPressed: () {
                      final sessionId = DateTime.now().millisecondsSinceEpoch.toString();
                      chatProvider.bookSession(
                        _dateController.text,
                        _timeController.text,
                        _topicController.text,
                        widget.profile,
                      );
                      chatProvider.addConnectionAsThread(widget.profile);
                      Navigator.pop(sheetContext);
                      ScaffoldMessenger.of(parentContext).showSnackBar(
                        SnackBar(
                          content: Text('Session booked with ${widget.profile.name}.'),
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                      Navigator.push(
                        parentContext,
                        MaterialPageRoute(
                          builder: (_) => MeetingScreen(
                            sessionId: sessionId,
                            topic: _topicController.text,
                            date: _dateController.text,
                            time: _timeController.text,
                            professional: widget.profile,
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final chatProvider = Provider.of<ChatProvider>(context, listen: false);
    final role = roleFromId(widget.profile.role);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.profile.name,
          style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
        ),
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(3),
          child: SizedBox(
            height: 3,
            child: DecoratedBox(decoration: BoxDecoration(color: BrandColors.boldBorder)),
          ),
        ),
      ),
      body: WebScaffoldBackground(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            WebCard(
              bold: true,
              child: Column(
                children: [
                  WebAvatar(initials: widget.profile.avatar, role: role, radius: 44),
                  const SizedBox(height: 14),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Flexible(
                        child: Text(
                          widget.profile.name,
                          textAlign: TextAlign.center,
                          style: theme.textTheme.displayMedium?.copyWith(fontSize: 24, fontWeight: FontWeight.w900),
                        ),
                      ),
                      if (widget.profile.verified) ...[
                        const SizedBox(width: 6),
                        const Icon(Icons.verified, color: BrandColors.primary, size: 20),
                      ],
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    widget.profile.title,
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.profile.location,
                    style: theme.textTheme.labelLarge?.copyWith(color: BrandColors.textSecondary),
                  ),
                  const SizedBox(height: 18),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    alignment: WrapAlignment.center,
                    children: [
                      _StatChip(label: 'Match', value: '${widget.profile.match}%'),
                      _StatChip(label: 'Response', value: widget.profile.responseRate),
                      _StatChip(label: 'Sessions', value: '${widget.profile.sessions}'),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            WebCard(
              bold: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Actions', style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900)),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: BrandButton(
                          text: _following ? 'Following' : 'Follow',
                          icon: _following ? Icons.check : Icons.person_add_alt,
                          variant: _following ? BrandButtonVariant.secondary : BrandButtonVariant.primary,
                          onPressed: () => setState(() => _following = !_following),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: BrandButton(
                          text: _connected ? 'Connected' : 'Connect',
                          icon: _connected ? Icons.check_circle : Icons.bolt,
                          variant: _connected ? BrandButtonVariant.secondary : BrandButtonVariant.primary,
                          onPressed: () => _connect(chatProvider),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(
                        child: BrandButton(
                          text: 'Message',
                          icon: Icons.chat_bubble_outline,
                          variant: BrandButtonVariant.secondary,
                          onPressed: () => _message(chatProvider),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: BrandButton(
                          text: 'Book session',
                          icon: Icons.calendar_month,
                          onPressed: () => _showBookingDialog(chatProvider),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            WebCard(
              bold: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('About', style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900)),
                  const SizedBox(height: 8),
                  Text(widget.profile.bio, style: theme.textTheme.bodyMedium?.copyWith(height: 1.45)),
                ],
              ),
            ),
            const SizedBox(height: 16),
            WebCard(
              bold: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Skills', style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900)),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: widget.profile.skills.map((skill) {
                      return Chip(
                        label: Text(skill),
                        backgroundColor: BrandColors.surfaceInset,
                        side: const BorderSide(color: BrandColors.boldBorder, width: 1.5),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 14),
                  FitScoreBars(score: widget.profile.match),
                ],
              ),
            ),
            const SizedBox(height: 16),
            WebCard(
              bold: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Goals', style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900)),
                  const SizedBox(height: 8),
                  ...widget.profile.goals.map((goal) => _BulletRow(text: goal)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ProfileInput extends StatelessWidget {
  const _ProfileInput({required this.label, required this.controller});

  final String label;
  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(borderRadius: BrandRadii.smBorderRadius),
        ),
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  const _StatChip({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: BrandColors.surfaceInset,
        borderRadius: BrandRadii.smBorderRadius,
        border: Border.all(color: BrandColors.boldBorder, width: 1.5),
      ),
      child: Column(
        children: [
          Text(value, style: const TextStyle(fontWeight: FontWeight.w900, color: BrandColors.textPrimary)),
          Text(label, style: Theme.of(context).textTheme.labelSmall),
        ],
      ),
    );
  }
}

class _BulletRow extends StatelessWidget {
  const _BulletRow({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          const Icon(Icons.check_circle, color: BrandColors.primary, size: 18),
          const SizedBox(width: 8),
          Expanded(child: Text(text, style: Theme.of(context).textTheme.bodyMedium)),
        ],
      ),
    );
  }
}
