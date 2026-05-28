package com.example.ui.screens

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.FilterList
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.DummyDataRepository
import com.example.data.Profile
import com.example.data.UserRole
import com.example.ui.components.EmptyStatePlaceholder
import com.example.ui.components.GradientButton
import com.example.ui.components.ProfileAvatarCircle
import com.example.ui.components.SwipeCard
import com.example.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.random.Random

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DiscoverScreen(
    onNavigateToChat: (String) -> Unit,
    onNavigateToNotifications: () -> Unit,
    modifier: Modifier = Modifier
) {
    val profiles by DummyDataRepository.profiles.collectAsState()
    val swipesRemaining by DummyDataRepository.swipesRemaining.collectAsState()
    val currentUserFlow by DummyDataRepository.currentUser.collectAsState()
    val isDarkMode by DummyDataRepository.isDarkMode.collectAsState()

    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    // Sorting & Filters Local Variables
    var showFilterSheet by remember { mutableStateOf(false) }
    var cityFilter by remember { mutableStateOf("") }
    val intentFilters = remember { mutableStateListOf<String>() }

    // Swiped references
    var lastSwipedProfile by remember { mutableStateOf<Profile?>(null) }
    val activeProfiles = remember(profiles, cityFilter, intentFilters.size) {
        profiles.filter { profile ->
            profile.userId != "u0" &&
            (cityFilter.isEmpty() || profile.city.lowercase().contains(cityFilter.lowercase())) &&
            (intentFilters.isEmpty() || profile.intent.any { intentFilters.contains(it) })
        }
    }

    var topCardIndex by remember { mutableStateOf(0) }
    var matchedProfile by remember { mutableStateOf<Profile?>(null) }
    var showUpgradeSheet by remember { mutableStateOf(false) }

    val currentProfile = if (topCardIndex < activeProfiles.size) activeProfiles[topCardIndex] else null

    // Perform swipe operation safely
    fun handleSwipe(isLike: Boolean, isSuper: Boolean = false) {
        if (swipesRemaining <= 0 && DummyDataRepository.userRole.value == UserRole.STUDENT) {
            showUpgradeSheet = true
            return
        }

        val profile = currentProfile ?: return
        lastSwipedProfile = profile

        coroutineScope.launch {
            val isMatch = if (isLike || isSuper) {
                DummyDataRepository.swipeRight(profile.userId)
            } else {
                DummyDataRepository.swipeLeft(profile.userId)
                false
            }

            // Increment index
            topCardIndex += 1

            if (isMatch) {
                delay(400)
                matchedProfile = profile
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        modifier = Modifier.fillMaxWidth().offset(x = (-8).dp),
                        horizontalArrangement = Arrangement.Center,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("⚡ ", fontSize = 22.sp, color = FlameRed)
                        Text(
                            text = "ProMatch",
                            fontWeight = FontWeight.ExtraBold,
                            color = MaterialTheme.colorScheme.onBackground
                        )
                    }
                },
                navigationIcon = {
                    IconButton(onClick = { showFilterSheet = true }) {
                        Icon(imageVector = Icons.Outlined.FilterList, contentDescription = "Filters", tint = FlameRed)
                    }
                },
                actions = {
                    val notifications by DummyDataRepository.notifications.collectAsState()
                    val unreadCount = notifications.count { !it.isRead }
                    Box(modifier = Modifier.padding(end = 6.dp)) {
                        IconButton(onClick = onNavigateToNotifications) {
                            Icon(imageVector = Icons.Outlined.Notifications, contentDescription = "Notifications", tint = MaterialTheme.colorScheme.onBackground)
                        }
                        if (unreadCount > 0) {
                            Box(
                                modifier = Modifier
                                    .align(Alignment.TopEnd)
                                    .offset(x = (-4).dp, y = (4).dp)
                                    .size(16.dp)
                                    .clip(CircleShape)
                                    .background(FlameRed),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = unreadCount.toString(),
                                    color = Color.White,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        modifier = modifier.fillMaxSize()
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            if (currentProfile != null) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    // Overlapping visual stack (Tinder cards slightly scaled down)
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth(),
                        contentAlignment = Alignment.Center
                    ) {
                        // Background Card (Peeks out underneath for high-fidelity stack feel)
                        if (topCardIndex + 1 < activeProfiles.size) {
                            val nextProfile = activeProfiles[topCardIndex + 1]
                            Card(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .padding(horizontal = 14.dp, vertical = 12.dp)
                                    .scale(0.95f),
                                shape = RoundedCornerShape(24.dp),
                                colors = CardDefaults.cardColors(
                                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                                )
                            ) {}
                        }

                        // Top Active Card
                        SwipeCard(
                            profile = currentProfile,
                            onLike = { handleSwipe(isLike = true) },
                            onPass = { handleSwipe(isLike = false) },
                            onSuperLike = { handleSwipe(isLike = true, isSuper = true) },
                            modifier = Modifier.testTag("swipe_card_top")
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // 5 Tinder-style Control Buttons
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 12.dp),
                        horizontalArrangement = Arrangement.SpaceEvenly,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // 1. Undo button (gold)
                        IconButton(
                            onClick = {
                                if (topCardIndex > 0 && lastSwipedProfile != null) {
                                    topCardIndex -= 1
                                    DummyDataRepository.undoLastSwipe(lastSwipedProfile!!.userId)
                                    lastSwipedProfile = null
                                } else {
                                    android.widget.Toast.makeText(context, "No recent pass to undo!", android.widget.Toast.LENGTH_SHORT).show()
                                }
                            },
                            modifier = Modifier
                                .size(46.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.surface)
                                .border(1.dp, GoldYellow, CircleShape)
                        ) {
                            Icon(imageVector = Icons.Default.Undo, contentDescription = "Undo Swipe", tint = GoldYellow)
                        }

                        // 2. Programmatic Pass (Nope) button (red)
                        IconButton(
                            onClick = { handleSwipe(isLike = false) },
                            modifier = Modifier
                                .size(56.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.surface)
                                .border(1.dp, NopeRed, CircleShape)
                        ) {
                            Icon(imageVector = Icons.Default.Close, contentDescription = "Nope Pass", tint = NopeRed, modifier = Modifier.size(28.dp))
                        }

                        // 3. Super-like button (blue)
                        IconButton(
                            onClick = { handleSwipe(isLike = true, isSuper = true) },
                            modifier = Modifier
                                .size(46.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.surface)
                                .border(1.dp, SuperBlue, CircleShape)
                        ) {
                            Icon(imageVector = Icons.Default.Star, contentDescription = "Super Like", tint = SuperBlue)
                        }

                        // 4. Like button (green)
                        IconButton(
                            onClick = { handleSwipe(isLike = true) },
                            modifier = Modifier
                                .size(56.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.surface)
                                .border(1.dp, LikeGreen, CircleShape)
                        ) {
                            Icon(imageVector = Icons.Default.Favorite, contentDescription = "Like Connection", tint = LikeGreen, modifier = Modifier.size(28.dp))
                        }

                        // 5. Boost swipe limit button (flame)
                        IconButton(
                            onClick = {
                                DummyDataRepository.boostSwipes()
                                android.widget.Toast.makeText(context, "Profile Boosted! Unlimited Swipes Charged ⚡", android.widget.Toast.LENGTH_SHORT).show()
                            },
                            modifier = Modifier
                                .size(46.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.surface)
                                .border(1.dp, FlameOrange, CircleShape)
                        ) {
                            Icon(imageVector = Icons.Default.FlashOn, contentDescription = "Boost Swipe", tint = FlameOrange)
                        }
                    }
                }
            } else {
                // Deck exhausted
                EmptyStatePlaceholder(
                    emoji = "🔍",
                    title = "That's everyone for now!",
                    subtitle = "Adjust your filters or query range details to find more professional matches nearby.",
                    actionText = "Undo Last Swipe / Reset Deck",
                    onAction = {
                        topCardIndex = 0
                        DummyDataRepository.resetToDefault()
                    }
                )
            }

            // FILTER BOTTOM SHEET
            if (showFilterSheet) {
                ModalBottomSheet(
                    onDismissRequest = { showFilterSheet = false },
                    dragHandle = { BottomSheetDefaults.DragHandle() }
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(24.dp)
                    ) {
                        Text(
                            text = "Platform Discovery Filters ⚙️",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(16.dp))

                        Text("Filter by City", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Spacer(modifier = Modifier.height(8.dp))
                        OutlinedTextField(
                            value = cityFilter,
                            onValueChange = { cityFilter = it },
                            placeholder = { Text("e.g. Mumbai, Bangalore, Remote") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp)
                        )

                        Spacer(modifier = Modifier.height(20.dp))
                        Text("Filter by Intent", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Spacer(modifier = Modifier.height(8.dp))

                        val intentOptions = listOf("Co-Founder", "Find Mentor", "Collaborate", "Hiring", "Advising", "Community")
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            intentOptions.forEach { intent ->
                                val isSelected = intentFilters.contains(intent)
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(16.dp))
                                        .background(if (isSelected) FlameRed else MaterialTheme.colorScheme.surfaceVariant)
                                        .clickable {
                                            if (isSelected) intentFilters.remove(intent) else intentFilters.add(intent)
                                        }
                                        .padding(horizontal = 12.dp, vertical = 8.dp)
                                ) {
                                    Text(
                                        intent,
                                        color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurface,
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(24.dp))
                        GradientButton(
                            text = "Apply Filters",
                            onClick = { showFilterSheet = false },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }
            }

            // OUT OF SWIPES UPGRADE MODAL
            if (showUpgradeSheet) {
                ModalBottomSheet(
                    onDismissRequest = { showUpgradeSheet = false },
                    dragHandle = { BottomSheetDefaults.DragHandle() }
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text("🔥", fontSize = 64.sp)
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = "Upgrade to ProMatch Plus",
                            style = MaterialTheme.typography.displayMedium,
                            fontWeight = FontWeight.ExtraBold,
                            textAlign = TextAlign.Center
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "Students are limited to 5 matches per day. Unlock infinite swiping, premium priority listing, and instant feedback direct from consulting professionals.",
                            fontSize = 14.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            textAlign = TextAlign.Center
                        )
                        Spacer(modifier = Modifier.height(24.dp))
                        GradientButton(
                            text = "Upgrade for ₹499/mo",
                            onClick = {
                                DummyDataRepository.boostSwipes()
                                showUpgradeSheet = false
                                android.widget.Toast.makeText(context, "Upgraded successfully! Unlimited charges activated.", android.widget.Toast.LENGTH_SHORT).show()
                            },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }
            }

            // "IT'S A MATCH!" OVERLAY SHEET MODAL
            matchedProfile?.let { matched ->
                MatchModalScreen(
                    matchedProfile = matched,
                    onDismiss = { matchedProfile = null },
                    onNavigateToChat = {
                        matchedProfile = null
                        onNavigateToChat("m_${matched.userId}_u0")
                    }
                )
            }
        }
    }
}

@Composable
fun MatchModalScreen(
    matchedProfile: Profile,
    onDismiss: () -> Unit,
    onNavigateToChat: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.91f))
            .blur(if (android.os.Build.VERSION.SDK_INT >= 31) 8.dp else 0.dp),
        contentAlignment = Alignment.Center
    ) {
        // High fidelity Custom star/particle Canvas rendering
        Canvas(modifier = Modifier.fillMaxSize()) {
            val random = Random(42)
            repeat(30) {
                val x = random.nextFloat() * size.width
                val y = random.nextFloat() * size.height
                val radius = random.nextFloat() * 6f + 2f
                val color = if (random.nextBoolean()) FlameRed else GoldYellow
                drawCircle(color = color.copy(alpha = 0.6f), radius = radius, center = androidx.compose.ui.geometry.Offset(x, y))
            }
        }

        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier
                .padding(24.dp)
                .fillMaxWidth()
                .widthIn(max = 400.dp)
        ) {
            Text(
                text = "⚡ IT'S A MATCH!",
                style = MaterialTheme.typography.displayLarge,
                fontWeight = FontWeight.ExtraBold,
                color = FlameRed,
                textAlign = TextAlign.Center,
                modifier = Modifier.scale(1.1f)
            )
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = "You and ${matchedProfile.displayName} are mutually interested inside ProMatch!",
                color = Color.White,
                fontSize = 14.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 24.dp)
            )

            Spacer(modifier = Modifier.height(48.dp))

            // Two overlapping circular avatars representing connections
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center,
                modifier = Modifier.fillMaxWidth()
            ) {
                ProfileAvatarCircle(
                    initials = "ME",
                    size = 96,
                    isVerified = true
                )
                Spacer(modifier = Modifier.width((-16).dp))
                ProfileAvatarCircle(
                    initials = matchedProfile.displayName.take(2).uppercase(),
                    size = 96,
                    isVerified = matchedProfile.isVerified
                )
            }

            Spacer(modifier = Modifier.height(48.dp))

            GradientButton(
                text = "💬 Send a Message",
                onClick = onNavigateToChat,
                modifier = Modifier.fillMaxWidth().testTag("match_message_button")
            )

            Spacer(modifier = Modifier.height(12.dp))

            TextButton(
                onClick = onDismiss,
                colors = ButtonDefaults.textButtonColors(contentColor = Color.White)
            ) {
                Text("Keep Swiping", fontWeight = FontWeight.Bold, fontSize = 15.sp)
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun FlowRow(
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Start,
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    androidx.compose.foundation.layout.FlowRow(
        modifier = modifier,
        horizontalArrangement = horizontalArrangement,
        verticalArrangement = verticalArrangement,
        content = { content() }
    )
}
