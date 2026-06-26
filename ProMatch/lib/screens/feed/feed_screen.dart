import 'package:flutter/material.dart';
import '../../theme/brand_theme.dart';

class FeedItem {
  final String authorName;
  final String authorTitle;
  final String avatarInitials;
  final String content;
  final List<String> tags;
  final String timeAgo;
  final int likes;
  final bool isVerified;

  FeedItem({
    required this.authorName,
    required this.authorTitle,
    required this.avatarInitials,
    required this.content,
    required this.tags,
    required this.timeAgo,
    required this.likes,
    this.isVerified = false,
  });
}

class FeedScreen extends StatefulWidget {
  const FeedScreen({Key? key}) : super(key: key);

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  final List<FeedItem> _feedItems = [
    FeedItem(
      authorName: 'Sarah Chen',
      authorTitle: 'Product Manager @ Grab',
      avatarInitials: 'SC',
      content: 'Excited to announce I am advising 3 new student startups this quarter! If your team is looking for roadmap guidance or product-market fit strategies, let\'s connect and schedule a 1:1 call! 🚀',
      tags: ['#PM', '#Growth', '#Fintech', '#Mentorship'],
      timeAgo: '2h ago',
      likes: 24,
      isVerified: true,
    ),
    FeedItem(
      authorName: 'Marcus Goh',
      authorTitle: 'NUS Computer Science student',
      avatarInitials: 'MG',
      content: 'Just open-sourced my custom Kubernetes controller built in Go. It automates container resource scaling based on custom queue sizes. Check it out on GitHub, PRs welcome!',
      tags: ['#Kubernetes', '#GoLang', '#DeepTech', '#OpenSource'],
      timeAgo: '5h ago',
      likes: 18,
    ),
    FeedItem(
      authorName: 'Elena Rostova',
      authorTitle: 'UI/UX Design Intern',
      avatarInitials: 'ER',
      content: 'Fleshing out the new glassmorphism design tokens for ProMatch. Trying to strike the perfect balance between high-end academic design and modern light-filled gradients. Let me know what you think of the card overlays!',
      tags: ['#Figma', '#UIUX', '#DesignTokens', '#Glassmorphism'],
      timeAgo: '1d ago',
      likes: 42,
    ),
  ];

  final Set<int> _likedItems = {};

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _feedItems.length,
        itemBuilder: (context, index) {
          final item = _feedItems[index];
          final isLiked = _likedItems.contains(index);

          return Padding(
            padding: const EdgeInsets.only(bottom: 20),
            child: Container(
              decoration: BoxDecoration(
                color: BrandColors.surfaceMuted,
                borderRadius: BrandRadii.mdBorderRadius,
                boxShadow: BrandShadows.sm,
                border: Border.all(
                  color: BrandColors.borderSubtle,
                  width: 1.0,
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Author Header
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 20,
                          backgroundColor: BrandColors.textInverse.withOpacity(0.08),
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
                                  color: BrandColors.textSecondary.withOpacity(0.6),
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
                    
                    Divider(color: BrandColors.borderSubtle),
                    
                    // Action Buttons (Like / Comment / Connect)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            IconButton(
                              icon: Icon(
                                isLiked ? Icons.favorite : Icons.favorite_border,
                                color: isLiked ? BrandColors.studentAccent : BrandColors.textSecondary,
                              ),
                              onPressed: () {
                                setState(() {
                                  if (isLiked) {
                                    _likedItems.remove(index);
                                  } else {
                                    _likedItems.add(index);
                                  }
                                });
                              },
                            ),
                            Text(
                              '${item.likes + (isLiked ? 1 : 0)}',
                              style: theme.textTheme.bodyMedium?.copyWith(
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ],
                        ),
                        TextButton.icon(
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Comments: Feature under development.'),
                                behavior: SnackBarBehavior.floating,
                              ),
                            );
                          },
                          icon: const Icon(Icons.comment_outlined, size: 20, color: BrandColors.textSecondary),
                          label: Text(
                            'Comment',
                            style: theme.textTheme.labelLarge?.copyWith(
                              color: BrandColors.textSecondary,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                        TextButton.icon(
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Connected with ${item.authorName}!'),
                                behavior: SnackBarBehavior.floating,
                              ),
                            );
                          },
                          icon: const Icon(Icons.bolt, size: 20, color: BrandColors.textInverse),
                          label: Text(
                            'Connect',
                            style: theme.textTheme.labelLarge?.copyWith(
                              color: BrandColors.textInverse,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
