package com.example.ui.components

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.VectorConverter
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.Verified
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.Profile
import com.example.ui.theme.*
import kotlinx.coroutines.launch
import kotlin.math.abs
import kotlin.math.roundToInt

enum class StampType { LIKE, NOPE, SUPER_LIKE }

@Composable
fun StampOverlay(type: StampType, opacity: Float) {
    if (opacity <= 0.05f) return

    val color = when (type) {
        StampType.LIKE -> LikeGreen
        StampType.NOPE -> NopeRed
        StampType.SUPER_LIKE -> SuperBlue
    }

    val text = when (type) {
        StampType.LIKE -> "LIKE"
        StampType.NOPE -> "NOPE"
        StampType.SUPER_LIKE -> "SUPER LIKE"
    }

    val rotation = when (type) {
        StampType.LIKE -> -15f
        StampType.NOPE -> 15f
        StampType.SUPER_LIKE -> 0f
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        contentAlignment = when (type) {
            StampType.LIKE -> Alignment.TopStart
            StampType.NOPE -> Alignment.TopEnd
            StampType.SUPER_LIKE -> Alignment.BottomCenter
        }
    ) {
        Box(
            modifier = Modifier
                .rotate(rotation)
                .border(4.dp, color.copy(alpha = opacity), RoundedCornerShape(12.dp))
                .background(Color.Black.copy(alpha = 0.4f * opacity))
                .padding(horizontal = 20.dp, vertical = 10.dp)
        ) {
            Text(
                text = text,
                color = color.copy(alpha = opacity),
                fontSize = 32.sp,
                fontWeight = FontWeight.ExtraBold,
                letterSpacing = 2.sp
            )
        }
    }
}

@Composable
fun SwipeCard(
    profile: Profile,
    onLike: () -> Unit,
    onPass: () -> Unit,
    onSuperLike: () -> Unit,
    modifier: Modifier = Modifier
) {
    val coroutineScope = rememberCoroutineScope()
    val configuration = LocalConfiguration.current
    val screenWidthPx = with(LocalDensity.current) { configuration.screenWidthDp.dp.toPx() }
    val screenHeightPx = with(LocalDensity.current) { configuration.screenHeightDp.dp.toPx() }

    // Position of the draggable card
    val offset = remember { Animatable(Offset(0f, 0f), Offset.VectorConverter) }

    // Computed drag status for stamps
    val dragX = offset.value.x
    val dragY = offset.value.y

    val stampType = when {
        dragY < -150f && abs(dragX) < abs(dragY) -> StampType.SUPER_LIKE
        dragX > 100f -> StampType.LIKE
        dragX < -100f -> StampType.NOPE
        else -> null
    }

    val stampOpacity = when {
        dragY < -100f && abs(dragX) < abs(dragY) -> ((abs(dragY) - 100f) / 150f).coerceIn(0f, 1f)
        abs(dragX) > 80f -> ((abs(dragX) - 80f) / 180f).coerceIn(0f, 1f)
        else -> 0f
    }

    // Interactive card element
    Card(
        modifier = modifier
            .fillMaxSize()
            .offset { IntOffset(offset.value.x.roundToInt(), offset.value.y.roundToInt()) }
            .rotate((dragX / screenWidthPx) * 20f)
            .pointerInput(profile.userId) {
                detectDragGestures(
                    onDragEnd = {
                        val finalX = offset.value.x
                        val finalY = offset.value.y
                        
                        coroutineScope.launch {
                            when {
                                // Dragged far right -> LIKE
                                finalX > screenWidthPx * 0.35f -> {
                                    offset.animateTo(
                                        targetValue = Offset(screenWidthPx * 1.5f, finalY),
                                        animationSpec = spring(dampingRatio = 0.6f, stiffness = 300f)
                                    )
                                    onLike()
                                }
                                // Dragged far left -> NOPE
                                finalX < -screenWidthPx * 0.35f -> {
                                    offset.animateTo(
                                        targetValue = Offset(-screenWidthPx * 1.5f, finalY),
                                        animationSpec = spring(dampingRatio = 0.6f, stiffness = 300f)
                                    )
                                    onPass()
                                }
                                // Dragged far up -> SUPER LIKE
                                finalY < -screenHeightPx * 0.25f && abs(finalX) < abs(finalY) -> {
                                    offset.animateTo(
                                        targetValue = Offset(finalX, -screenHeightPx * 1.5f),
                                        animationSpec = spring(dampingRatio = 0.6f, stiffness = 300f)
                                    )
                                    onSuperLike()
                                }
                                // Below threshold -> Snaps back
                                else -> {
                                    offset.animateTo(
                                        targetValue = Offset(0f, 0f),
                                        animationSpec = spring(dampingRatio = 0.6f, stiffness = 300f)
                                    )
                                }
                            }
                        }
                    },
                    onDrag = { change, dragAmount ->
                        change.consume()
                        coroutineScope.launch {
                            offset.snapTo(
                                Offset(
                                    offset.value.x + dragAmount.x,
                                    offset.value.y + dragAmount.y
                                )
                            )
                        }
                    }
                )
            },
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            // Background representation (Vibrant Emoji theme representing professional focus)
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.linearGradient(
                            listOf(
                                FlameRed.copy(alpha = 0.85f),
                                FlameOrange.copy(alpha = 0.9f)
                            )
                        )
                    )
            )

            // Dynamic Gradient Overlay (Visual Depth)
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            listOf(
                                Color.Transparent,
                                Color.Black.copy(alpha = 0.1f),
                                Color.Black.copy(alpha = 0.9f)
                            )
                        )
                    )
            )

            // Giant professional topic representation
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .fillMaxHeight(0.6f)
                    .align(Alignment.TopCenter),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = when {
                        profile.roleTitle.contains("Engineer") || profile.roleTitle.contains("Dev") -> "💻"
                        profile.roleTitle.contains("ML") || profile.roleTitle.contains("AI") -> "🧠"
                        profile.roleTitle.contains("Designer") || profile.roleTitle.contains("Design") -> "🎨"
                        profile.roleTitle.contains("VC") || profile.roleTitle.contains("Finance") -> "📈"
                        profile.roleTitle.contains("Biotech") -> "🔬"
                        else -> "⚡"
                    },
                    fontSize = 110.sp
                )
            }

            // Top Match Score Badge
            Box(
                modifier = Modifier
                    .padding(16.dp)
                    .align(Alignment.TopEnd)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.Black.copy(alpha = 0.61f))
                    .border(1.dp, GoldYellow, RoundedCornerShape(12.dp))
                    .padding(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Star,
                        contentDescription = "Match Score",
                        tint = GoldYellow,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "${profile.matchScore}% Match",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp
                    )
                }
            }

            // Profile info bottom half
            Column(
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .fillMaxWidth()
                    .padding(24.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "${profile.displayName}, ${profile.age}",
                        style = MaterialTheme.typography.displayMedium,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                    if (profile.isVerified) {
                        Spacer(modifier = Modifier.width(8.dp))
                        Icon(
                            imageVector = Icons.Default.Verified,
                            contentDescription = "Verified Professional",
                            tint = SuperBlue,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = profile.roleTitle,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = FlameOrange
                )
                Spacer(modifier = Modifier.height(6.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.LocationOn,
                        contentDescription = "Location",
                        tint = Color.LightGray,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = profile.city,
                        fontSize = 13.sp,
                        color = Color.LightGray
                    )
                }
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = "\"" + profile.bio + "\"",
                    fontSize = 13.sp,
                    color = Color.White.copy(alpha = 0.85f),
                    fontWeight = FontWeight.Medium,
                    modifier = Modifier.padding(bottom = 12.dp)
                )

                // Interest tags row
                Row(
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 4.dp)
                ) {
                    profile.interests.take(3).forEach { tag ->
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(12.dp))
                                .background(Color.White.copy(alpha = 0.15f))
                                .padding(horizontal = 10.dp, vertical = 5.dp)
                        ) {
                            Text(
                                text = tag,
                                color = Color.White,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }

            // Drag dynamic Stamps overlay
            stampType?.let {
                StampOverlay(type = it, opacity = stampOpacity)
            }
        }
    }
}
