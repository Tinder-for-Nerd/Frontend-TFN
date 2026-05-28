package com.example.ui.screens

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.BookingStatus
import com.example.data.DummyDataRepository
import com.example.data.Match
import com.example.data.Message
import com.example.data.MessageType
import com.example.data.Profile
import com.example.ui.components.EmptyStatePlaceholder
import com.example.ui.components.GradientButton
import com.example.ui.components.ProfileAvatarCircle
import com.example.ui.theme.*
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MessagesScreen(
    onNavigateToChat: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val matches by DummyDataRepository.matches.collectAsState()
    val profiles by DummyDataRepository.profiles.collectAsState()

    var searchQuery by remember { mutableStateOf("") }
    var matchToDelete by remember { mutableStateOf<Match?>(null) }

    val filteredMatches = remember(matches, searchQuery) {
        matches.filter { match ->
            val otherUserId = if (match.userId1 == "u0") match.userId2 else match.userId1
            val otherProfile = profiles.find { it.userId == otherUserId }
            otherProfile?.displayName?.lowercase()?.contains(searchQuery.lowercase()) == true
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Conversations 💬", fontWeight = FontWeight.ExtraBold) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        modifier = modifier.fillMaxSize()
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Search Bar
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                placeholder = { Text("Search matches...") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                leadingIcon = { Icon(imageVector = Icons.Default.Search, contentDescription = "Search") },
                shape = RoundedCornerShape(14.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = FlameRed,
                    unfocusedBorderColor = MaterialTheme.colorScheme.outline
                )
            )

            // New Matches Horizontal Row
            if (matches.isNotEmpty()) {
                Text(
                    text = "New Matches",
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    color = FlameRed,
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
                )

                LazyRow(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 12.dp),
                    contentPadding = PaddingValues(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    items(matches) { match ->
                        val otherUserId = if (match.userId1 == "u0") match.userId2 else match.userId1
                        val otherProfile = profiles.find { it.userId == otherUserId }
                        if (otherProfile != null) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                modifier = Modifier.clickable { onNavigateToChat(match.id) }
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(64.dp)
                                        .border(2.5.dp, FlameRed, CircleShape)
                                        .padding(3.dp)
                                ) {
                                    ProfileAvatarCircle(
                                        initials = otherProfile.displayName.take(2).uppercase(),
                                        size = 56,
                                        isVerified = otherProfile.isVerified
                                    )
                                }
                                Spacer(modifier = Modifier.height(6.dp))
                                Text(
                                    text = otherProfile.displayName.split(" ").firstOrNull() ?: "",
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.onBackground
                                )
                            }
                        }
                    }
                }
                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
            }

            // Message list
            if (filteredMatches.isNotEmpty()) {
                LazyColumn(
                    modifier = Modifier.weight(1f),
                    contentPadding = PaddingValues(vertical = 8.dp)
                ) {
                    items(filteredMatches) { match ->
                        val otherUserId = if (match.userId1 == "u0") match.userId2 else match.userId1
                        val otherProfile = profiles.find { it.userId == otherUserId }

                        if (otherProfile != null) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { onNavigateToChat(match.id) }
                                    .padding(horizontal = 16.dp, vertical = 12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                ProfileAvatarCircle(
                                    initials = otherProfile.displayName.take(2).uppercase(),
                                    size = 56,
                                    isVerified = otherProfile.isVerified
                                )
                                Spacer(modifier = Modifier.width(14.dp))
                                Column(
                                    modifier = Modifier.weight(1f)
                                ) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Text(
                                            text = otherProfile.displayName,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 15.sp,
                                            color = MaterialTheme.colorScheme.onBackground
                                        )
                                        Spacer(modifier = Modifier.weight(1f))
                                        val timeStr = SimpleDateFormat("h:mm a", Locale.getDefault()).format(match.matchedAt)
                                        Text(
                                            text = timeStr,
                                            fontSize = 11.sp,
                                            color = MaterialTheme.colorScheme.onSurfaceVariant
                                        )
                                    }
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Text(
                                            text = match.lastMessage?.content ?: "You matched! Say hello 👋",
                                            fontSize = 13.sp,
                                            color = if (match.unreadCount > 0) MaterialTheme.colorScheme.onBackground else MaterialTheme.colorScheme.onSurfaceVariant,
                                            fontWeight = if (match.unreadCount > 0) FontWeight.Bold else FontWeight.Normal,
                                            maxLines = 1,
                                            overflow = TextOverflow.Ellipsis,
                                            modifier = Modifier.weight(1f)
                                        )
                                        if (match.unreadCount > 0) {
                                            Box(
                                                modifier = Modifier
                                                    .size(8.dp)
                                                    .clip(CircleShape)
                                                    .background(FlameRed)
                                            )
                                        }
                                        Spacer(modifier = Modifier.width(8.dp))
                                        // Swipe-to-delete trigger helper icon
                                        Icon(
                                            imageVector = Icons.Default.Delete,
                                            contentDescription = "Delete Match",
                                            tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.4f),
                                            modifier = Modifier
                                                .size(16.dp)
                                                .clickable { matchToDelete = match }
                                        )
                                    }
                                }
                            }
                            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), modifier = Modifier.padding(start = 86.dp))
                        }
                    }
                }
            } else {
                EmptyStatePlaceholder(
                    emoji = "💬",
                    title = "No conversations yet",
                    subtitle = "Get swiping! Mutual matches will appear here so you can connect and negotiate consulting slots."
                )
            }
        }

        // CONFIRM DELETE THREAD DIALOG
        matchToDelete?.let { match ->
            val otherUserId = if (match.userId1 == "u0") match.userId2 else match.userId1
            val otherProfile = profiles.find { it.userId == otherUserId }

            AlertDialog(
                onDismissRequest = { matchToDelete = null },
                title = { Text("Delete Conversation") },
                text = { Text("Are you sure you want to permanently delete your conversation with ${otherProfile?.displayName ?: "this user"}?") },
                confirmButton = {
                    TextButton(
                        onClick = {
                            DummyDataRepository.deleteMatch(match.id)
                            matchToDelete = null
                        },
                        colors = ButtonDefaults.textButtonColors(contentColor = NopeRed)
                    ) {
                        Text("Delete", fontWeight = FontWeight.Bold)
                    }
                },
                dismissButton = {
                    TextButton(onClick = { matchToDelete = null }) {
                        Text("Cancel")
                    }
                }
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen(
    matchId: String,
    onNavigateBack: () -> Unit,
    onNavigateToBook: (String, String) -> Unit,
    onNavigateToCall: (String) -> Unit
) {
    val matches by DummyDataRepository.matches.collectAsState()
    val profiles by DummyDataRepository.profiles.collectAsState()
    val allMessages by DummyDataRepository.messages.collectAsState()
    val bookings by DummyDataRepository.bookings.collectAsState()

    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    val match = matches.find { it.id == matchId }
    val otherUserId = if (match?.userId1 == "u0") match.userId2 else match?.userId1
    val otherProfile = profiles.find { it.userId == otherUserId }

    val messages = allMessages[matchId] ?: emptyList()

    var textInput by remember { mutableStateOf("") }
    var showIcebreaker by remember { mutableStateOf(true) }

    val showAcceptDeclineCard = messages.any { it.type == MessageType.BOOKING_REQUEST && it.senderId != "u0" }
    val associatedBooking = bookings.find { it.seekerId == otherUserId && it.status == BookingStatus.PENDING }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    otherProfile?.let { profile ->
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            ProfileAvatarCircle(
                                initials = profile.displayName.take(2).uppercase(),
                                size = 40,
                                isVerified = profile.isVerified
                            )
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(
                                    text = profile.displayName,
                                    fontSize = 15.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(
                                        modifier = Modifier
                                            .size(6.dp)
                                            .clip(CircleShape)
                                            .background(LikeGreen)
                                    )
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Online", fontSize = 11.sp, color = LikeGreen)
                                }
                            }
                        }
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.AutoMirrored.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(
                        onClick = {
                            otherProfile?.let {
                                onNavigateToBook(it.userId, "s1") // Simple coffee chat booking shortcut
                            }
                        }
                    ) {
                        Icon(imageVector = Icons.Default.CalendarMonth, contentDescription = "Book Session", tint = FlameRed)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.surface)
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            LazyColumn(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 12.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "⚡ Conversation matched. Begin networking!",
                            fontSize = 11.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f),
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // AI Icebreaker Recommendation Box
                if (showIcebreaker && otherProfile != null) {
                    item {
                        Card(
                            colors = CardDefaults.cardColors(containerColor = SuperBlue.copy(alpha = 0.08f)),
                            border = BorderStroke(1.dp, SuperBlue.copy(alpha = 0.3f)),
                            shape = RoundedCornerShape(16.dp),
                            modifier = Modifier.padding(bottom = 8.dp)
                        ) {
                            Column(modifier = Modifier.padding(14.dp)) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(imageVector = Icons.Default.AutoAwesome, contentDescription = "AI", tint = SuperBlue, modifier = Modifier.size(16.dp))
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Text("🤖 ProMatch AI Icebreaker Helper", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = SuperBlue)
                                }
                                Spacer(modifier = Modifier.height(10.dp))
                                val line = "Hey ${otherProfile.displayName}! I would love to grab a slot to discuss how you established your ${otherProfile.roleTitle} role. Let's coffee chat!"
                                Text(
                                    text = "\"$line\"",
                                    fontSize = 13.sp,
                                    color = MaterialTheme.colorScheme.onSurface
                                )
                                Spacer(modifier = Modifier.height(12.dp))
                                Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                                    Text(
                                        text = "USE THIS SUGGESTION",
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = SuperBlue,
                                        modifier = Modifier.clickable {
                                            textInput = line
                                            showIcebreaker = false
                                        }
                                    )
                                    Text(
                                        text = "DISMISS",
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                                        modifier = Modifier.clickable { showIcebreaker = false }
                                    )
                                }
                            }
                        }
                    }
                }

                // Chat Messages bubbles
                items(messages) { message ->
                    val isOwn = message.senderId == "u0"
                    Column(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalAlignment = if (isOwn) Alignment.End else Alignment.Start
                    ) {
                        if (message.type == MessageType.BOOKING_REQUEST) {
                            // Booking Inline Card
                            Card(
                                modifier = Modifier
                                    .widthIn(max = 300.dp)
                                    .padding(vertical = 4.dp),
                                shape = RoundedCornerShape(18.dp),
                                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                                border = BorderStroke(1.dp, FlameRed.copy(alpha = 0.3f))
                            ) {
                                Column(modifier = Modifier.padding(14.dp)) {
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text("📅", fontSize = 24.sp)
                                        Spacer(modifier = Modifier.width(8.dp))
                                        Column {
                                            Text("Topmate booking request", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                                            Text(message.content, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        }
                                    }

                                    Spacer(modifier = Modifier.height(12.dp))

                                    if (!isOwn && associatedBooking != null) {
                                        // Outstanding pending Booking reviewable in-bubble
                                        Row(
                                            modifier = Modifier.fillMaxWidth(),
                                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                                        ) {
                                            Button(
                                                onClick = {
                                                    DummyDataRepository.updateBookingStatus(associatedBooking.id, BookingStatus.CONFIRMED)
                                                    DummyDataRepository.sendMessage(matchId, "u0", "I accepted your coffee chat. View details in My Bookings!", MessageType.TEXT)
                                                    android.widget.Toast.makeText(context, "Confirmed Booked slot!", android.widget.Toast.LENGTH_SHORT).show()
                                                },
                                                colors = ButtonDefaults.buttonColors(containerColor = LikeGreen),
                                                shape = RoundedCornerShape(12.dp),
                                                modifier = Modifier.weight(1f)
                                            ) {
                                                Text("Accept", color = Color.Black, fontWeight = FontWeight.Bold, fontSize = 11.sp)
                                            }

                                            Button(
                                                onClick = {
                                                    DummyDataRepository.updateBookingStatus(associatedBooking.id, BookingStatus.CANCELLED)
                                                    DummyDataRepository.sendMessage(matchId, "u0", "Coffee chat booking cancelled.", MessageType.TEXT)
                                                },
                                                colors = ButtonDefaults.buttonColors(containerColor = NopeRed),
                                                shape = RoundedCornerShape(12.dp),
                                                modifier = Modifier.weight(1f)
                                            ) {
                                                Text("Decline", color = Color.White, fontSize = 11.sp)
                                            }
                                        }
                                    } else {
                                        // Static feedback status description
                                        val statusLabel = associatedBooking?.status ?: BookingStatus.CONFIRMED
                                        Text(
                                            text = "Booking Status: $statusLabel",
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 12.sp,
                                            color = if (statusLabel == BookingStatus.CONFIRMED) LikeGreen else FlameRed,
                                            modifier = Modifier.align(Alignment.End)
                                        )
                                    }
                                }
                            }
                        } else {
                            // Standard Text bubble
                            val bubbleColor = if (isOwn) FlameRed else MaterialTheme.colorScheme.surfaceVariant
                            val textColor = if (isOwn) Color.White else MaterialTheme.colorScheme.onSurface

                            Box(
                                modifier = Modifier
                                    .widthIn(max = 280.dp)
                                    .clip(
                                        RoundedCornerShape(
                                            topStart = 16.dp,
                                            topEnd = 16.dp,
                                            bottomStart = if (isOwn) 16.dp else 4.dp,
                                            bottomEnd = if (isOwn) 4.dp else 16.dp
                                        )
                                    )
                                    .background(bubbleColor)
                                    .padding(horizontal = 14.dp, vertical = 10.dp)
                            ) {
                                Text(
                                    text = message.content,
                                    color = textColor,
                                    fontSize = 14.sp
                                )
                            }
                            Spacer(modifier = Modifier.height(2.dp))
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                val formatMinutes = SimpleDateFormat("h:mm a", Locale.getDefault()).format(message.timestamp)
                                Text(
                                    text = formatMinutes,
                                    fontSize = 10.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f)
                                )
                                if (isOwn) {
                                    Text(
                                        text = if (message.isRead) "✓✓" else "✓",
                                        fontSize = 10.sp,
                                        color = if (message.isRead) LikeGreen else MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.5f)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // Bottom compose panel
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                shape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .padding(12.dp)
                        .fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(
                        onClick = {
                            textInput += " 😊"
                        }
                    ) {
                        Icon(imageVector = Icons.Default.SentimentSatisfiedAlt, contentDescription = "Emojis", tint = FlameRed)
                    }

                    TextField(
                        value = textInput,
                        onValueChange = { textInput = it },
                        placeholder = { Text("Write your message...") },
                        modifier = Modifier
                            .weight(1f)
                            .testTag("chat_input"),
                        shape = RoundedCornerShape(24.dp),
                        colors = TextFieldDefaults.colors(
                            focusedIndicatorColor = Color.Transparent,
                            unfocusedIndicatorColor = Color.Transparent
                        )
                    )

                    Spacer(modifier = Modifier.width(8.dp))

                    IconButton(
                        onClick = {
                            if (textInput.isNotEmpty()) {
                                DummyDataRepository.sendMessage(matchId, "u0", textInput)
                                textInput = ""
                            }
                        },
                        modifier = Modifier
                            .size(46.dp)
                            .clip(CircleShape)
                            .background(FlameGradient)
                            .testTag("chat_send_button")
                    ) {
                        Icon(imageVector = Icons.AutoMirrored.Default.Send, contentDescription = "Send", tint = Color.White)
                    }
                }
            }
        }
    }
}
