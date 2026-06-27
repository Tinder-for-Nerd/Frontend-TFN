import 'dart:typed_data';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import '../../data/app_seed_data.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/web_parity_widgets.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  final TextEditingController _postController = TextEditingController();
  final TextEditingController _commentController = TextEditingController();
  final Set<int> _likedItems = {};
  final Set<int> _repostedItems = {};
  final Set<int> _sentItems = {};
  final Set<int> _openComments = {};
  final Map<int, List<String>> _commentsByPost = {};
  late final List<FeedItem> _posts = List<FeedItem>.from(feedItems);
  bool _composerOpen = false;
  String? _attachedDocumentName;
  Uint8List? _attachedImageBytes;

  @override
  void dispose() {
    _postController.dispose();
    _commentController.dispose();
    super.dispose();
  }

  Future<void> _pickDocument() async {
    final result = await FilePicker.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'png', 'jpg', 'jpeg'],
      withData: true,
    );

    if (result == null || result.files.isEmpty) return;
    final file = result.files.single;
    final extension = (file.extension ?? '').toLowerCase();
    final isImage = ['png', 'jpg', 'jpeg'].contains(extension);
    setState(() {
      _attachedDocumentName = file.name;
      _attachedImageBytes = isImage ? file.bytes : null;
      _composerOpen = true;
    });
  }

  void _publishPost() {
    final content = _postController.text.trim();
    if (content.isEmpty && _attachedDocumentName == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Write something or attach a document before posting.'),
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    setState(() {
      _posts.insert(
        0,
        FeedItem(
          authorName: 'Alex Kumar',
          authorTitle: 'Student & ML Engineer | FinTech Builder',
          avatarInitials: 'AK',
          content: content.isEmpty ? 'Shared a document with the network.' : content,
          tags: const ['#Builder', '#Update'],
          timeAgo: 'Just now',
          likes: 0,
          documentName: _attachedDocumentName,
          imageBytes: _attachedImageBytes,
        ),
      );
      _postController.clear();
      _attachedDocumentName = null;
      _attachedImageBytes = null;
      _composerOpen = false;
      _likedItems.clear();
      _repostedItems.clear();
      _sentItems.clear();
      _commentsByPost.clear();
      _openComments.clear();
    });
  }

  void _toggleComments(int postIndex) {
    setState(() {
      if (_openComments.contains(postIndex)) {
        _openComments.remove(postIndex);
      } else {
        _openComments.add(postIndex);
      }
      _commentController.clear();
    });
  }

  void _addComment(int postIndex) {
    final comment = _commentController.text.trim();
    if (comment.isEmpty) return;
    setState(() {
      _commentsByPost.putIfAbsent(postIndex, () => <String>[]).add(comment);
      _commentController.clear();
    });
  }

  void _toggleRepost(int postIndex, FeedItem item) {
    final isReposted = _repostedItems.contains(postIndex);
    setState(() {
      if (isReposted) {
        _repostedItems.remove(postIndex);
      } else {
        _repostedItems.add(postIndex);
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(isReposted ? 'Repost removed.' : 'Reposted ${item.authorName}\'s post.'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _sendPost(int postIndex, FeedItem item) {
    setState(() => _sentItems.add(postIndex));
    showModalBottomSheet(
      context: context,
      showDragHandle: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.fromLTRB(20, 4, 20, 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Send post',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
              ),
              const SizedBox(height: 12),
              Text(
                'Share "${item.authorName}"\'s post with your connections.',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const SizedBox(height: 16),
              for (final name in ['Sarah Chen', 'Raj Patel', 'Mei Lin'])
                Material(
                  color: Colors.transparent,
                  child: ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: WebAvatar(
                      initials: name.split(' ').map((part) => part[0]).take(2).join(),
                      role: BrandRole.pro,
                    ),
                    title: Text(name, style: const TextStyle(fontWeight: FontWeight.w800)),
                    subtitle: const Text('Online'),
                    trailing: const Icon(Icons.send, color: BrandColors.primary),
                    onTap: () {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Post sent to $name.'),
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                    },
                  ),
                ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _posts.length + 1,
        itemBuilder: (context, index) {
          if (index == 0) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 20),
              child: _buildComposer(theme),
            );
          }
          final item = _posts[index - 1];
          final isLiked = _likedItems.contains(index);
          final isReposted = _repostedItems.contains(index);
          final isSent = _sentItems.contains(index);
          final comments = _commentsByPost[index] ?? const <String>[];
          final commentsOpen = _openComments.contains(index);

          return Padding(
            padding: const EdgeInsets.only(bottom: 20),
            child: WebCard(
              bold: true,
              color: BrandColors.ivory,
              child: Padding(
                padding: EdgeInsets.zero,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Author Header
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 20,
                          backgroundColor: BrandColors.textInverse.withValues(alpha: 0.08),
                          child: Text(
                            item.avatarInitials,
                            style: const TextStyle(
                              color: BrandColors.textInverse,
                              fontWeight: FontWeight.w800,
                              fontSize: 14,
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Text(
                                    item.authorName,
                                    style: theme.textTheme.labelLarge?.copyWith(
                                      fontWeight: FontWeight.w800,
                                    ),
                                  ),
                                  if (item.isVerified) ...[
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
                                item.authorTitle,
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  fontSize: 12,
                                  color: BrandColors.textSecondary.withValues(alpha: 0.6),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Text(
                          item.timeAgo,
                          style: theme.textTheme.labelSmall?.copyWith(
                            fontSize: 10,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Post content
                    Text(
                      item.content,
                      style: theme.textTheme.bodyLarge?.copyWith(
                        fontSize: 15,
                        height: 1.4,
                      ),
                    ),
                    if (item.documentName != null) ...[
                      const SizedBox(height: 14),
                      if (item.imageBytes != null)
                        _ImageAttachmentPreview(
                          imageBytes: item.imageBytes!,
                          documentName: item.documentName!,
                        )
                      else
                        _DocumentChip(documentName: item.documentName!),
                    ],
                    const SizedBox(height: 16),

                    // Hashtag Tags Wrap
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: item.tags.map((tag) {
                        return Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: BrandColors.surfaceInset,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            tag,
                            style: theme.textTheme.bodyMedium?.copyWith(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: BrandColors.textInverse,
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 16),
                    
                    Row(
                      children: [
                        Text(
                          '${item.likes + (isLiked ? 1 : 0)} likes',
                          style: theme.textTheme.labelSmall,
                        ),
                        const Spacer(),
                        Text(
                          '${comments.length} comments',
                          style: theme.textTheme.labelSmall,
                        ),
                        if (isReposted) ...[
                          const SizedBox(width: 8),
                          Text('1 repost', style: theme.textTheme.labelSmall),
                        ],
                      ],
                    ),
                    const SizedBox(height: 6),
                    Divider(color: BrandColors.borderSubtle),

                    // LinkedIn-style action buttons
                    Row(
                      children: [
                        _PostActionButton(
                          icon: isLiked ? Icons.thumb_up : Icons.thumb_up_alt_outlined,
                          label: 'Like',
                          active: isLiked,
                          onTap: () {
                            setState(() {
                              if (isLiked) {
                                _likedItems.remove(index);
                              } else {
                                _likedItems.add(index);
                              }
                            });
                          },
                        ),
                        _PostActionButton(
                          icon: Icons.comment_outlined,
                          label: 'Comment',
                          active: commentsOpen,
                          onTap: () => _toggleComments(index),
                        ),
                        _PostActionButton(
                          icon: Icons.repeat,
                          label: 'Repost',
                          active: isReposted,
                          onTap: () => _toggleRepost(index, item),
                        ),
                        _PostActionButton(
                          icon: isSent ? Icons.send : Icons.send_outlined,
                          label: 'Send',
                          active: isSent,
                          onTap: () => _sendPost(index, item),
                        ),
                      ],
                    ),
                    if (commentsOpen) ...[
                      const SizedBox(height: 12),
                      _CommentPanel(
                        controller: _commentController,
                        comments: comments,
                        onSubmit: () => _addComment(index),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildComposer(ThemeData theme) {
    if (!_composerOpen) {
      return InkWell(
        onTap: () => setState(() => _composerOpen = true),
        borderRadius: BrandRadii.mdBorderRadius,
        child: WebCard(
          bold: true,
          color: BrandColors.ivory,
          child: Row(
            children: [
              const WebAvatar(initials: 'AK', role: BrandRole.student),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  'Share an update, project milestone, or mentor request...',
                  style: theme.textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w600),
                ),
              ),
              IconButton(
                onPressed: () => setState(() => _composerOpen = true),
                icon: const Icon(Icons.edit_square, color: BrandColors.primary),
              ),
            ],
          ),
        ),
      );
    }

    return WebCard(
      bold: true,
      color: BrandColors.ivory,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const WebAvatar(initials: 'AK', role: BrandRole.student),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  'Create post',
                  style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
                ),
              ),
              IconButton(
                onPressed: () {
                  setState(() {
                    _composerOpen = false;
                    _postController.clear();
                    _attachedDocumentName = null;
                    _attachedImageBytes = null;
                  });
                },
                icon: const Icon(Icons.close, color: BrandColors.textSecondary),
              ),
            ],
          ),
          const SizedBox(height: 14),
          TextField(
            controller: _postController,
            minLines: 4,
            maxLines: 7,
            decoration: InputDecoration(
              hintText: 'What do you want to share?',
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BrandRadii.smBorderRadius,
                borderSide: const BorderSide(color: BrandColors.boldBorder, width: 2),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BrandRadii.smBorderRadius,
                borderSide: const BorderSide(color: BrandColors.boldBorder, width: 2),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BrandRadii.smBorderRadius,
                borderSide: const BorderSide(color: BrandColors.primary, width: 2),
              ),
            ),
          ),
          const SizedBox(height: 12),
          if (_attachedDocumentName != null) ...[
            if (_attachedImageBytes != null)
              _ImageAttachmentPreview(
                imageBytes: _attachedImageBytes!,
                documentName: _attachedDocumentName!,
                onRemove: () => setState(() {
                  _attachedDocumentName = null;
                  _attachedImageBytes = null;
                }),
              )
            else
              _DocumentChip(
                documentName: _attachedDocumentName!,
                onRemove: () => setState(() => _attachedDocumentName = null),
              ),
            const SizedBox(height: 12),
          ],
          Row(
            children: [
              OutlinedButton.icon(
                onPressed: _pickDocument,
                icon: const Icon(Icons.attach_file),
                label: const Text('Add document'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: BrandColors.textPrimary,
                  side: const BorderSide(color: BrandColors.boldBorder, width: 2),
                  shape: RoundedRectangleBorder(borderRadius: BrandRadii.smBorderRadius),
                ),
              ),
              const Spacer(),
              ElevatedButton.icon(
                onPressed: _publishPost,
                icon: const Icon(Icons.send),
                label: const Text('Post'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: BrandColors.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BrandRadii.smBorderRadius),
                  side: const BorderSide(color: BrandColors.boldBorder, width: 2),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _PostActionButton extends StatelessWidget {
  const _PostActionButton({
    required this.icon,
    required this.label,
    required this.onTap,
    this.active = false,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool active;

  @override
  Widget build(BuildContext context) {
    final color = active ? BrandColors.primary : BrandColors.textSecondary;
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(10),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 10),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, size: 20, color: color),
              const SizedBox(height: 4),
              Text(
                label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      color: color,
                      fontWeight: FontWeight.w900,
                    ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _DocumentChip extends StatelessWidget {
  const _DocumentChip({
    required this.documentName,
    this.onRemove,
  });

  final String documentName;
  final VoidCallback? onRemove;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BrandRadii.smBorderRadius,
        border: Border.all(color: BrandColors.boldBorder, width: 2),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.description_outlined, color: BrandColors.primary, size: 20),
          const SizedBox(width: 8),
          Flexible(
            child: Text(
              documentName,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.labelLarge?.copyWith(fontWeight: FontWeight.w800),
            ),
          ),
          if (onRemove != null) ...[
            const SizedBox(width: 8),
            InkWell(
              onTap: onRemove,
              child: const Icon(Icons.close, size: 18, color: BrandColors.textSecondary),
            ),
          ],
        ],
      ),
    );
  }
}

class _CommentPanel extends StatelessWidget {
  const _CommentPanel({
    required this.controller,
    required this.comments,
    required this.onSubmit,
  });

  final TextEditingController controller;
  final List<String> comments;
  final VoidCallback onSubmit;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BrandRadii.smBorderRadius,
        border: Border.all(color: BrandColors.boldBorder, width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (comments.isNotEmpty) ...[
            ...comments.map((comment) {
              return Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const WebAvatar(initials: 'AK', role: BrandRole.student, radius: 14),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                        decoration: BoxDecoration(
                          color: BrandColors.surfaceInset,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Alex Kumar',
                              style: theme.textTheme.labelSmall?.copyWith(
                                color: BrandColors.textPrimary,
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              comment,
                              style: theme.textTheme.bodyMedium?.copyWith(
                                color: BrandColors.textPrimary,
                                height: 1.35,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }),
            const SizedBox(height: 2),
          ],
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              const WebAvatar(initials: 'AK', role: BrandRole.student, radius: 16),
              const SizedBox(width: 8),
              Expanded(
                child: TextField(
                  controller: controller,
                  minLines: 1,
                  maxLines: 3,
                  decoration: InputDecoration(
                    hintText: 'Add a comment...',
                    isDense: true,
                    filled: true,
                    fillColor: BrandColors.surfaceInset,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: BorderSide.none,
                    ),
                  ),
                  onSubmitted: (_) => onSubmit(),
                ),
              ),
              const SizedBox(width: 8),
              IconButton(
                onPressed: onSubmit,
                icon: const Icon(Icons.send, color: BrandColors.primary),
                tooltip: 'Post comment',
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ImageAttachmentPreview extends StatelessWidget {
  const _ImageAttachmentPreview({
    required this.imageBytes,
    required this.documentName,
    this.onRemove,
  });

  final Uint8List imageBytes;
  final String documentName;
  final VoidCallback? onRemove;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BrandRadii.mdBorderRadius,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(color: BrandColors.boldBorder, width: 2),
          borderRadius: BrandRadii.mdBorderRadius,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            AspectRatio(
              aspectRatio: 16 / 9,
              child: Image.memory(
                imageBytes,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              child: Row(
                children: [
                  const Icon(Icons.image_outlined, color: BrandColors.primary, size: 20),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      documentName,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.labelLarge?.copyWith(fontWeight: FontWeight.w800),
                    ),
                  ),
                  if (onRemove != null)
                    InkWell(
                      onTap: onRemove,
                      child: const Icon(Icons.close, size: 18, color: BrandColors.textSecondary),
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
