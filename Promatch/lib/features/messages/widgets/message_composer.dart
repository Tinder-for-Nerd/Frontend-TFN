import 'package:flutter/material.dart';
import '../../../core/theme/color_tokens.dart';

class MessageComposer extends StatefulWidget {
  final Function(String) onSend;

  const MessageComposer({super.key, required this.onSend});

  @override
  State<MessageComposer> createState() => _MessageComposerState();
}

class _MessageComposerState extends State<MessageComposer> {
  final _controller = TextEditingController();
  bool _hasText = false;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _send() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    widget.onSend(text);
    _controller.clear();
    setState(() => _hasText = false);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(13),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.attach_file_outlined),
            color: ColorTokens.textSecondary,
            onPressed: () {},
          ),
          Expanded(
            child: TextField(
              controller: _controller,
              textCapitalization: TextCapitalization.sentences,
              decoration: const InputDecoration(
                hintText: 'Type a message...',
                border: InputBorder.none,
                filled: false,
                contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              ),
              onChanged: (v) => setState(() => _hasText = v.trim().isNotEmpty),
              onSubmitted: (_) => _send(),
              maxLines: null,
            ),
          ),
          IconButton(
            icon: Icon(_hasText ? Icons.send_rounded : Icons.mic_none),
            color: _hasText ? ColorTokens.primary : ColorTokens.textSecondary,
            onPressed: _hasText ? _send : () {},
          ),
        ],
      ),
    );
  }
}
