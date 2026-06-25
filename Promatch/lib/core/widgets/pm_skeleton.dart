import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import '../theme/color_tokens.dart';

class PmSkeleton extends StatelessWidget {
  final double width;
  final double height;
  final double borderRadius;

  const PmSkeleton({
    super.key,
    this.width = double.infinity,
    required this.height,
    this.borderRadius = 8,
  });

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: ColorTokens.shimmerBase,
      highlightColor: ColorTokens.shimmerHighlight,
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: ColorTokens.shimmerBase,
          borderRadius: BorderRadius.circular(borderRadius),
        ),
      ),
    );
  }
}

class PmSkeletonList extends StatelessWidget {
  final int itemCount;
  final double itemHeight;

  const PmSkeletonList({
    super.key,
    this.itemCount = 5,
    this.itemHeight = 80,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: List.generate(itemCount, (index) => Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          children: [
            const PmSkeleton(width: 48, height: 48, borderRadius: 24),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  PmSkeleton(width: 120, height: 14, borderRadius: 4),
                  const SizedBox(height: 8),
                  PmSkeleton(height: 12, borderRadius: 4),
                ],
              ),
            ),
          ],
        ),
      )),
    );
  }
}

class PmSkeletonCard extends StatelessWidget {
  const PmSkeletonCard({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          PmSkeleton(height: 200, borderRadius: 12),
          SizedBox(height: 12),
          PmSkeleton(width: 150, height: 16, borderRadius: 4),
          SizedBox(height: 8),
          PmSkeleton(height: 14, borderRadius: 4),
          SizedBox(height: 4),
          PmSkeleton(width: 100, height: 14, borderRadius: 4),
        ],
      ),
    );
  }
}
