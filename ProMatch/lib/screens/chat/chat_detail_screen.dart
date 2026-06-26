import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/chat_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';
import '../../widgets/brand_input.dart';

class ChatDetailScreen extends StatefulWidget {
  final String threadId;

  const ChatDetailScreen({
    Key? key,
    required this.threadId,
  }) : super(key: key);

  @override
  State<ChatDetailScreen> createState() => _ChatDetailScreenState();
}

class _ChatDetailScreenState extends State<ChatDetailScreen> {
  final _messageController = TextEditingController();
  final _scrollController = ScrollController();

  final _bookingTopicController = TextEditingController(text: 'Co-founder Alignment Sync');
  final _bookingDateController = TextEditingController(text: 'June 28, 2026');
  final _bookingTimeController = TextEditingController(text: '10:00 AM');

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    _bookingTopicController.dispose();
    _bookingDateController.dispose();
    _bookingTimeController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      }
    });
  }

  void _showBookingDialog(BuildContext context, dynamic participant, ChatProvider chatProvider) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BrandRadii.lgBorderRadius),
          title: Row(
            children: [
              const Icon(Icons.calendar_today, color: BrandColors.textInverse),
              const SizedBox(width: 10),
              Text(
                'Schedule 1:1 Call',
                style: Theme.of(context).textTheme.titleLarge,
              ),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              BrandInput(
                label: 'Meeting Topic',
                hintText: 'e.g. Project brainstorm',
                controller: _bookingTopicController,
              ),
              const SizedBox(height: 16),
              BrandInput(
                label: 'Preferred Date',
                hintText: 'e.g. Tomorrow',
                controller: _bookingDateController,
              ),
              const SizedBox(height: 16),
              BrandInput(
                label: 'Time Frame',
                hintText: 'e.g. 10:00 AM',
                controller: _bookingTimeController,
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel', style: TextStyle(color: BrandColors.textSecondary)),
            ),
            ElevatedButton(
              onPressed: () {
                chatProvider.bookSession(
                  _bookingDateController.text,
                  _bookingTimeController.text,
                  _bookingTopicController.text,
                  participant,
                );
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Session call scheduled with ${participant.name}! 📅'),
                    behavior: SnackBarBehavior.floating,
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: BrandColors.textInverse,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BrandRadii.smBorderRadius),
              ),
              child: const Text('Schedule call'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final chatProvider = Provider.of<ChatProvider>(context);
    final thread = chatProvider.getThread(widget.threadId);

    if (thread == null) {
      return Scaffold(
        appBar: AppBar(),
        body: const Center(child: Text('Thread not found.')),
      );
    }

    final participant = thread.participant;
    final isStudent = participant.role.toLowerCase() == 'student';
    final roleAccent = isStudent
        ? BrandColors.studentAccent
        : BrandColors.proAccent;

    _scrollToBottom();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: BrandColors.surfaceMuted,
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: BrandColors.textPrimary),
          onPressed: () => Navigator.pop(context),
        ),
        title: Row(
          children: [
            CircleAvatar(
              radius: 18,
              backgroundColor: roleAccent.withOpacity(0.08),
              child: Text(
                participant.avatar,
                style: TextStyle(
                  color: roleAccent,
                  fontWeight: FontWeight.w800,
                  fontSize: 13,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        participant.name,
                        style: theme.textTheme.labelLarge?.copyWith(
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      if (participant.verified) ...[
                        const SizedBox(width: 4),
                        const Icon(
                          Icons.verified,
                          size: 14,
                          color: BrandColors.textInverse,
                        ),
                      ],
                    ],
                  ),
                  Text(
                    '${participant.match}% match · ${participant.title}',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.calendar_today, color: BrandColors.textInverse),
            onPressed: () {
              _showBookingDialog(context, participant, chatProvider);
            },
          ),
          const SizedBox(width: 8),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(
            color: BrandColors.borderSubtle,
            height: 1,
          ),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Messages List
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                padding: const EdgeInsets.all(16),
                itemCount: thread.messages.length,
                itemBuilder: (context, index) {
                  final message = thread.messages[index];
                  final isMe = message.senderId == 'me';

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12.0),
                    child: Row(
                      mainAxisAlignment:
                          isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        if (!isMe) ...[
                          CircleAvatar(
                            radius: 12,
                            backgroundColor: roleAccent.withOpacity(0.08),
                            child: Text(
                              participant.avatar,
                              style: TextStyle(
                                color: roleAccent,
                                fontSize: 8,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                        ],
                        Flexible(
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 12,
                            ),
                            decoration: BoxDecoration(
                              color: isMe
                                  ? BrandColors.textInverse
                                  : BrandColors.surfaceInset,
                              borderRadius: BorderRadius.only(
                                topLeft: const Radius.circular(16),
                                topRight: const Radius.circular(16),
                                bottomLeft: isMe
                                    ? const Radius.circular(16)
                                    : Radius.zero,
                                bottomRight: isMe
                                    ? Radius.zero
                                    : const Radius.circular(16),
                              ),
                            ),
                            child: Text(
                              message.text,
                              style: TextStyle(
                                color: isMe ? Colors.white : BrandColors.textPrimary,
                                fontSize: 14,
                                height: 1.3,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),

            // Typing Overlay Indicator
            if (thread.isTyping)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 8,
                        backgroundColor: roleAccent.withOpacity(0.08),
                        child: Text(
                          participant.avatar,
                          style: TextStyle(color: roleAccent, fontSize: 6, fontWeight: FontWeight.w800),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '${participant.name} is typing...',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          fontSize: 12,
                          fontStyle: FontStyle.italic,
                          color: BrandColors.textInverse,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

            // Text Input Footer bar
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: BrandColors.surfaceMuted,
                border: Border(
                  top: BorderSide(
                    color: BrandColors.borderSubtle,
                    width: 1.0,
                  ),
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _messageController,
                      style: theme.textTheme.bodyLarge,
                      decoration: InputDecoration(
                        hintText: 'Type a message...',
                        hintStyle: TextStyle(
                          color: BrandColors.textSecondary.withOpacity(0.5),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 12,
                        ),
                        filled: true,
                        fillColor: BrandColors.surfaceInset,
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BrandRadii.fullBorderRadius,
                          borderSide: BorderSide.none,
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BrandRadii.fullBorderRadius,
                          borderSide: const BorderSide(
                            color: BrandColors.borderDefault,
                            width: 1.0,
                          ),
                        ),
                      ),
                      onSubmitted: (_) {
                        final text = _messageController.text.trim();
                        if (text.isNotEmpty) {
                          chatProvider.sendMessage(widget.threadId, text);
                          _messageController.clear();
                          _scrollToBottom();
                        }
                      },
                    ),
                  ),
                  const SizedBox(width: 8),
                  CircleAvatar(
                    backgroundColor: BrandColors.textInverse,
                    child: IconButton(
                      icon: const Icon(Icons.send, color: Colors.white, size: 18),
                      onPressed: () {
                        final text = _messageController.text.trim();
                        if (text.isNotEmpty) {
                          chatProvider.sendMessage(widget.threadId, text);
                          _messageController.clear();
                          _scrollToBottom();
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
}
