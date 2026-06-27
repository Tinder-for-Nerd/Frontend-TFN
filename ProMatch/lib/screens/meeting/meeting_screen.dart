import 'package:flutter/material.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';
import '../../models/profile_model.dart';
import '../../services/meeting_service.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/web_parity_widgets.dart';

class MeetingScreen extends StatefulWidget {
  const MeetingScreen({
    super.key,
    required this.sessionId,
    required this.topic,
    required this.date,
    required this.time,
    required this.professional,
  });

  final String sessionId;
  final String topic;
  final String date;
  final String time;
  final ProfileModel professional;

  @override
  State<MeetingScreen> createState() => _MeetingScreenState();
}

class _MeetingScreenState extends State<MeetingScreen> {
  late final MeetingService _meeting;

  @override
  void initState() {
    super.initState();
    _meeting = MeetingService(
      roomId: widget.sessionId,
      peerId: 'flutter-${DateTime.now().millisecondsSinceEpoch}',
      professionalId: widget.professional.id,
    )..addListener(_refresh);
    _meeting.initialize();
  }

  void _refresh() {
    if (mounted) setState(() {});
  }

  @override
  void dispose() {
    _meeting.removeListener(_refresh);
    _meeting.disposeService();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: BrandColors.surfaceStrong,
      appBar: AppBar(
        title: Text(
          'Professional Meeting',
          style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
        ),
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(3),
          child: SizedBox(height: 3, child: DecoratedBox(decoration: BoxDecoration(color: BrandColors.boldBorder))),
        ),
      ),
      body: WebScaffoldBackground(
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                WebCard(
                  bold: true,
                  child: Row(
                    children: [
                      WebAvatar(initials: widget.professional.avatar, role: BrandRole.pro),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(widget.topic, style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900)),
                            const SizedBox(height: 4),
                            Text(
                              '${widget.professional.name} · ${widget.date} at ${widget.time}',
                              style: theme.textTheme.bodyMedium,
                            ),
                          ],
                        ),
                      ),
                      _StatusPill(
                        label: _meeting.socketConnected ? 'Socket.io' : 'Connecting',
                        active: _meeting.socketConnected,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Expanded(
                  child: LayoutBuilder(
                    builder: (context, constraints) {
                      final stacked = constraints.maxHeight > constraints.maxWidth;
                      final tiles = [
                        Expanded(
                          child: _VideoTile(
                            label: 'You',
                            renderer: _meeting.localRenderer,
                            cameraOn: _meeting.cameraEnabled,
                            fallbackInitials: 'AK',
                            role: BrandRole.student,
                          ),
                        ),
                        const SizedBox(width: 12, height: 12),
                        Expanded(
                          child: _VideoTile(
                            label: widget.professional.name,
                            renderer: _meeting.remoteRenderer,
                            cameraOn: _meeting.remoteVideoVisible,
                            fallbackInitials: widget.professional.avatar,
                            role: BrandRole.pro,
                          ),
                        ),
                      ];
                      return stacked
                          ? Column(children: tiles)
                          : Row(children: tiles);
                    },
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  _meeting.status,
                  textAlign: TextAlign.center,
                  style: theme.textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 14),
                WebCard(
                  bold: true,
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _MeetButton(
                        icon: _meeting.micEnabled ? Icons.mic : Icons.mic_off,
                        label: _meeting.micEnabled ? 'Mute' : 'Unmute',
                        onTap: _meeting.toggleMic,
                      ),
                      _MeetButton(
                        icon: _meeting.cameraEnabled ? Icons.videocam : Icons.videocam_off,
                        label: _meeting.cameraEnabled ? 'Camera' : 'Camera off',
                        onTap: _meeting.toggleCamera,
                      ),
                      _MeetButton(
                        icon: Icons.call_end,
                        label: 'End',
                        danger: true,
                        onTap: () {
                          _meeting.endCall();
                          Navigator.pop(context);
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _VideoTile extends StatelessWidget {
  const _VideoTile({
    required this.label,
    required this.renderer,
    required this.cameraOn,
    required this.fallbackInitials,
    required this.role,
  });

  final String label;
  final RTCVideoRenderer renderer;
  final bool cameraOn;
  final String fallbackInitials;
  final BrandRole role;

  @override
  Widget build(BuildContext context) {
    return WebCard(
      bold: true,
      padding: EdgeInsets.zero,
      color: const Color(0xFF111827),
      child: ClipRRect(
        borderRadius: BrandRadii.mdBorderRadius,
        child: Stack(
          fit: StackFit.expand,
          children: [
            if (cameraOn)
              RTCVideoView(renderer, objectFit: RTCVideoViewObjectFit.RTCVideoViewObjectFitCover)
            else
              Center(child: WebAvatar(initials: fallbackInitials, role: role, radius: 42)),
            Positioned(
              left: 12,
              bottom: 12,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.black.withValues(alpha: 0.72),
                  borderRadius: BorderRadius.circular(99),
                ),
                child: Text(
                  label,
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 12),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MeetButton extends StatelessWidget {
  const _MeetButton({
    required this.icon,
    required this.label,
    required this.onTap,
    this.danger = false,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool danger;

  @override
  Widget build(BuildContext context) {
    final color = danger ? BrandColors.error : BrandColors.textPrimary;
    return TextButton.icon(
      onPressed: onTap,
      icon: Icon(icon, color: color),
      label: Text(label, style: TextStyle(color: color, fontWeight: FontWeight.w900)),
    );
  }
}

class _StatusPill extends StatelessWidget {
  const _StatusPill({required this.label, required this.active});

  final String label;
  final bool active;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: active ? const Color(0xFFEAF4FF) : BrandColors.surfaceInset,
        borderRadius: BorderRadius.circular(99),
        border: Border.all(color: BrandColors.boldBorder, width: 2),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: active ? BrandColors.primary : BrandColors.textSecondary,
          fontWeight: FontWeight.w900,
          fontSize: 11,
        ),
      ),
    );
  }
}
