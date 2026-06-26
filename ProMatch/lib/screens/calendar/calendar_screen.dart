import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/chat_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';

class CalendarScreen extends StatelessWidget {
  const CalendarScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final chatProvider = Provider.of<ChatProvider>(context);
    final sessions = chatProvider.sessions;

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '1:1 Session Calls',
              style: theme.textTheme.displayMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Manage your scheduled co-founder syncs and mentor advisory calls.',
              style: theme.textTheme.bodyMedium,
            ),
            const SizedBox(height: 24),
            
            // Sessions Queue
            Expanded(
              child: sessions.isEmpty
                  ? _buildEmptyState(context)
                  : ListView.builder(
                      itemCount: sessions.length,
                      itemBuilder: (context, index) {
                        final session = sessions[index];
                        final isStudent = session.participant.role.toLowerCase() == 'student';
                        final accentColor = isStudent
                            ? BrandColors.studentAccent
                            : BrandColors.proAccent;

                        return Padding(
                          padding: const EdgeInsets.only(bottom: 16.0),
                          child: Container(
                            decoration: BoxDecoration(
                              color: BrandColors.surfaceMuted,
                              borderRadius: BrandRadii.mdBorderRadius,
                              boxShadow: BrandShadows.sm,
                              border: Border.all(color: BrandColors.borderSubtle),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(20.0),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  // Date & Time Accent box
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                                    decoration: BoxDecoration(
                                      color: accentColor.withOpacity(0.08),
                                      borderRadius: BrandRadii.smBorderRadius,
                                    ),
                                    child: Column(
                                      children: [
                                        Text(
                                          session.time,
                                          style: TextStyle(
                                            color: accentColor,
                                            fontWeight: FontWeight.w900,
                                            fontSize: 16,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          session.date,
                                          style: TextStyle(
                                            color: accentColor.withOpacity(0.8),
                                            fontWeight: FontWeight.w700,
                                            fontSize: 11,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const SizedBox(width: 20),
                                  
                                  // Meeting Details
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          session.topic,
                                          style: theme.textTheme.titleLarge?.copyWith(
                                            fontSize: 16,
                                            fontWeight: FontWeight.w800,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Row(
                                          children: [
                                            Text(
                                              'with ${session.participant.name}',
                                              style: theme.textTheme.bodyMedium?.copyWith(
                                                fontWeight: FontWeight.w600,
                                              ),
                                            ),
                                            const SizedBox(width: 4),
                                            if (session.participant.verified)
                                              const Icon(
                                                Icons.verified,
                                                size: 14,
                                                color: BrandColors.textInverse,
                                              ),
                                          ],
                                        ),
                                        const SizedBox(height: 8),
                                        Text(
                                          'Meeting ID: 394-102-88',
                                          style: theme.textTheme.labelSmall?.copyWith(
                                            fontSize: 10,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  
                                  // Launch Link CTA
                                  IconButton(
                                    icon: const Icon(Icons.videocam, color: BrandColors.textInverse, size: 28),
                                    onPressed: () {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(
                                          content: Text('Starting Video Call Session...'),
                                          behavior: SnackBarBehavior.floating,
                                        ),
                                      );
                                    },
                                  ),
                                ],
                              ),
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
  }

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: Container(
        padding: const EdgeInsets.all(28),
        decoration: BoxDecoration(
          color: BrandColors.surfaceMuted,
          borderRadius: BrandRadii.lgBorderRadius,
          boxShadow: BrandShadows.sm,
          border: Border.all(color: BrandColors.borderSubtle),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: BrandColors.tertiary.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.calendar_today_outlined, color: BrandColors.tertiary, size: 36),
            ),
            const SizedBox(height: 20),
            Text(
              'No active calls scheduled.',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Book calls with your matches inside the messages panel.',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
