package com.example.ui.screens

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
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
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.AutoAwesome
import androidx.compose.material.icons.outlined.Event
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.*
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Locale

// ==========================================
// SCREEN 8 - EVENTS
// ==========================================
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EventsScreen(
    userRole: UserRole,
    modifier: Modifier = Modifier
) {
    val events by DummyDataRepository.events.collectAsState()
    val rsvpEventIds by DummyDataRepository.rsvpEventIds.collectAsState()

    var selectedCategorizer by remember { mutableStateOf("All") }
    var createEventDialog by remember { mutableStateOf(false) }

    val categories = listOf("All", "Online", "In-Person", "Hackathon", "Talk", "Webinar", "RSVP'd")

    val filteredEvents = remember(events, rsvpEventIds, selectedCategorizer) {
        events.filter { item ->
            when (selectedCategorizer) {
                "All" -> item.status == EventStatus.APPROVED
                "RSVP'd" -> rsvpEventIds.contains(item.id)
                else -> item.status == EventStatus.APPROVED && item.type.name.lowercase() == selectedCategorizer.lowercase()
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Networking Events 🎉", fontWeight = FontWeight.ExtraBold) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        floatingActionButton = {
            if (userRole == UserRole.PRO) {
                FloatingActionButton(
                    onClick = { createEventDialog = true },
                    containerColor = FlameRed,
                    contentColor = Color.White,
                    shape = CircleShape
                ) {
                    Icon(imageVector = Icons.Default.Add, contentDescription = "Create Event")
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Horizontal Catalog Filters Slider
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(vertical = 12.dp)
            ) {
                items(categories) { cat ->
                    val selected = selectedCategorizer == cat
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .background(if (selected) FlameGradient else Brush.linearGradient(listOf(MaterialTheme.colorScheme.surfaceVariant, MaterialTheme.colorScheme.surfaceVariant)))
                            .clickable { selectedCategorizer = cat }
                            .padding(horizontal = 14.dp, vertical = 8.dp)
                    ) {
                        Text(
                            text = cat,
                            color = if (selected) Color.White else MaterialTheme.colorScheme.onBackground,
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp
                        )
                    }
                }
            }

            if (filteredEvents.isNotEmpty()) {
                LazyColumn(
                    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp),
                    modifier = Modifier.fillMaxSize()
                ) {
                    items(filteredEvents) { event ->
                        val isRsvpd = rsvpEventIds.contains(event.id)

                        Card(
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                            shape = RoundedCornerShape(24.dp),
                            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                        ) {
                            Column {
                                // Event Header Banner representing visual themes
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(130.dp)
                                        .background(FlameGradient, alpha = 0.2f),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(event.bannerEmoji, fontSize = 56.sp)
                                }

                                Column(modifier = Modifier.padding(18.dp)) {
                                    Text(
                                        text = event.type.name.replace("_", " "),
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = FlameRed
                                    )
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Text(
                                        text = event.title,
                                        style = MaterialTheme.typography.titleLarge,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = MaterialTheme.colorScheme.onBackground
                                    )
                                    Spacer(modifier = Modifier.height(10.dp))
                                    Text(
                                        text = event.description,
                                        fontSize = 13.sp,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )

                                    Spacer(modifier = Modifier.height(16.dp))
                                    HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.15f))
                                    Spacer(modifier = Modifier.height(12.dp))

                                    // Info specs
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Icon(imageVector = Icons.Default.CalendarMonth, contentDescription = "Time", tint = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.size(16.dp))
                                        Spacer(modifier = Modifier.width(6.dp))
                                        val dateStr = SimpleDateFormat("EEEE MMM d, h:mm a", Locale.getDefault()).format(event.scheduledAt)
                                        Text(text = dateStr, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }

                                    Spacer(modifier = Modifier.height(6.dp))
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Icon(imageVector = Icons.Default.LocationOn, contentDescription = "Location", tint = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.size(16.dp))
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Text(text = event.location ?: "Virtual Link Provided", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }

                                    Spacer(modifier = Modifier.height(16.dp))

                                    // Capacity meter
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text("Capacity: ${event.rsvpCount}/${event.maxCapacity} RSVP'd", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                        Spacer(modifier = Modifier.width(12.dp))
                                        LinearProgressIndicator(
                                            progress = event.rsvpCount.toFloat() / event.maxCapacity.toFloat(),
                                            color = FlameRed,
                                            trackColor = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f),
                                            modifier = Modifier.weight(1f).height(6.dp).clip(CircleShape)
                                        )
                                    }

                                    Spacer(modifier = Modifier.height(20.dp))

                                    Button(
                                        onClick = { DummyDataRepository.toggleRsvp(event.id) },
                                        colors = ButtonDefaults.buttonColors(
                                            containerColor = if (isRsvpd) LikeGreen else FlameRed
                                        ),
                                        shape = RoundedCornerShape(30.dp),
                                        modifier = Modifier.fillMaxWidth()
                                    ) {
                                        Text(
                                            text = if (isRsvpd) "✓ RSVP'd" else "Reserve Spot",
                                            fontWeight = FontWeight.Bold,
                                            color = if (isRsvpd) Color.Black else Color.White
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                EmptyStatePlaceholder(
                    emoji = "📣",
                    title = "No upcoming events here",
                    subtitle = "There are no events tagged in this section database. Check online or make your own Pro events!"
                )
            }
        }

        // CREATE EVENT MODIFIER DIALOG
        if (createEventDialog) {
            var evTitle by remember { mutableStateOf("") }
            var evDesc by remember { mutableStateOf("") }
            var evLoc by remember { mutableStateOf("Smart Contract Audit Hall") }
            var evType by remember { mutableStateOf(EventType.ONLINE) }
            val context = LocalContext.current

            AlertDialog(
                onDismissRequest = { createEventDialog = false },
                title = { Text("Assemble New Event", fontWeight = FontWeight.Bold) },
                text = {
                    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        OutlinedTextField(
                            value = evTitle,
                            onValueChange = { evTitle = it },
                            label = { Text("Event Name Title") },
                            modifier = Modifier.fillMaxWidth()
                        )

                        OutlinedTextField(
                            value = evDesc,
                            onValueChange = { evDesc = it },
                            label = { Text("Summary details") },
                            minLines = 3,
                            modifier = Modifier.fillMaxWidth()
                        )

                        OutlinedTextField(
                            value = evLoc,
                            onValueChange = { evLoc = it },
                            label = { Text("Location/Webinar Meet Link") },
                            modifier = Modifier.fillMaxWidth()
                        )

                        Text("Select Categorizer", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            listOf(EventType.HACKATHON, EventType.TALK, EventType.WEBINAR).forEach { tp ->
                                val active = evType == tp
                                Box(
                                    modifier = Modifier
                                        .clip(CircleShape)
                                        .background(if (active) FlameRed else MaterialTheme.colorScheme.surfaceVariant)
                                        .clickable { evType = tp }
                                        .padding(horizontal = 10.dp, vertical = 6.dp)
                                ) {
                                    Text(tp.name, fontSize = 10.sp, color = if (active) Color.White else MaterialTheme.colorScheme.onBackground)
                                }
                            }
                        }
                    }
                },
                confirmButton = {
                    TextButton(
                        onClick = {
                            if (evTitle.isNotEmpty() && evDesc.isNotEmpty()) {
                                DummyDataRepository.createEvent(
                                    title = evTitle,
                                    description = evDesc,
                                    type = evType,
                                    location = evLoc,
                                    dateMillis = System.currentTimeMillis() + 864000000,
                                    banner = when (evType) {
                                        EventType.HACKATHON -> "⛓️"
                                        EventType.WEBINAR -> "🎙️"
                                        else -> "💡"
                                    }
                                )
                                createEventDialog = false
                                android.widget.Toast.makeText(context, "Submitted! Awaiting Admin Approvals queue.", android.widget.Toast.LENGTH_LONG).show()
                            }
                        },
                        colors = ButtonDefaults.textButtonColors(contentColor = FlameRed)
                    ) {
                        Text("Submit Event", fontWeight = FontWeight.Bold)
                    }
                },
                dismissButton = {
                    TextButton(onClick = { createEventDialog = false }) {
                        Text("Cancel")
                    }
                }
            )
        }
    }
}


// ==========================================
// SCREEN 9 - PROFILE (VIEW MODE & EDIT HOOKS)
// ==========================================
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ProfileScreen(
    currentRole: UserRole,
    onNavigateToSettings: () -> Unit,
    modifier: Modifier = Modifier
) {
    val currentUserFlow by DummyDataRepository.currentUser.collectAsState()
    val coroutineScope = rememberCoroutineScope()
    var isEditMode by remember { mutableStateOf(false) }

    val userProfile = currentUserFlow?.profile ?: return

    // Edit fields local persistence
    var editName by remember { mutableStateOf(userProfile.displayName) }
    var editTitle by remember { mutableStateOf(userProfile.roleTitle) }
    var editCity by remember { mutableStateOf(userProfile.city) }
    var editBio by remember { mutableStateOf(userProfile.bio) }
    var isRewritingBio by remember { mutableStateOf(false) }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                onClick = {
                    if (isEditMode) {
                        // Save modifications override
                        val updated = userProfile.copy(
                            displayName = editName,
                            roleTitle = editTitle,
                            city = editCity,
                            bio = editBio
                        )
                        DummyDataRepository.completeOnboarding(updated)
                        isEditMode = false
                    } else {
                        // Reset field values
                        editName = userProfile.displayName
                        editTitle = userProfile.roleTitle
                        editCity = userProfile.city
                        editBio = userProfile.bio
                        isEditMode = true
                    }
                },
                containerColor = FlameRed,
                contentColor = Color.White,
                shape = CircleShape
            ) {
                Icon(
                    imageVector = if (isEditMode) Icons.Default.Save else Icons.Default.Edit,
                    contentDescription = "Edit own description"
                )
            }
        },
        modifier = modifier.fillMaxSize()
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(MaterialTheme.colorScheme.background),
            contentPadding = PaddingValues(16.dp)
        ) {
            item {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
                    IconButton(onClick = onNavigateToSettings) {
                        Icon(imageVector = Icons.Default.Settings, contentDescription = "Settings Icon")
                    }
                }
            }

            item {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Box(
                        modifier = Modifier
                            .size(110.dp)
                            .clip(CircleShape)
                            .background(FlameGradient),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = if (editName.isNotEmpty()) editName.take(2).uppercase() else "ME",
                            fontSize = 44.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    if (isEditMode) {
                        OutlinedTextField(
                            value = editName,
                            onValueChange = { editName = it },
                            label = { Text("Display Name") },
                            modifier = Modifier.fillMaxWidth().testTag("profile_edit_name")
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        OutlinedTextField(
                            value = editTitle,
                            onValueChange = { editTitle = it },
                            label = { Text("Consulting tagline") },
                            modifier = Modifier.fillMaxWidth().testTag("profile_edit_title")
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        OutlinedTextField(
                            value = editCity,
                            onValueChange = { editCity = it },
                            label = { Text("City location") },
                            modifier = Modifier.fillMaxWidth().testTag("profile_edit_city")
                        )
                    } else {
                        Text(
                            text = userProfile.displayName,
                            style = MaterialTheme.typography.displayMedium,
                            fontWeight = FontWeight.ExtraBold,
                            color = MaterialTheme.colorScheme.onBackground
                        )
                        Text(
                            text = userProfile.roleTitle,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            color = FlameRed
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(imageVector = Icons.Default.LocationOn, contentDescription = "Loc", tint = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(text = userProfile.city, fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        StatChip(value = "1 ⚡", label = "Matches")
                        StatChip(value = "45 🎯", label = "Views")
                        StatChip(value = "12", label = "Consultations")
                    }
                }
            }

            item {
                SectionHeader("About My Career")
                if (isEditMode) {
                    OutlinedTextField(
                        value = editBio,
                        onValueChange = { editBio = it },
                        label = { Text("Bio biography") },
                        modifier = Modifier.fillMaxWidth().testTag("profile_edit_bio"),
                        minLines = 4
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Button(
                        onClick = {
                            coroutineScope.launch {
                                isRewritingBio = true
                                delay(1000)
                                editBio = "Leading professional specializing in digital architectures. Hacking cloud infrastructures, optimizing core developer tools, and leading cross-functional tech delivery modules."
                                isRewritingBio = false
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth(),
                        enabled = !isRewritingBio
                    ) {
                        Icon(imageVector = Icons.Outlined.AutoAwesome, contentDescription = "AI", tint = FlameRed)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("🤖 AI bio polish (Demonstrating custom shimmer)", color = MaterialTheme.colorScheme.onBackground)
                    }
                } else {
                    Text(
                        text = userProfile.bio,
                        fontSize = 14.sp,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                }
            }

            item {
                SectionHeader("Core Specialties")
                FlowRow(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    userProfile.interests.forEach { tag ->
                        InterestTag(label = tag, selected = true)
                    }
                }
            }

            item {
                SectionHeader("Recent Projects Portfolio")
            }

            if (userProfile.projects.isNotEmpty()) {
                items(userProfile.projects) { project ->
                    Card(
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)
                    ) {
                        Row(modifier = Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
                            Text(project.emoji, fontSize = 28.sp)
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Text(project.title, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                Text(project.description, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                        }
                    }
                }
            } else {
                item {
                    Card(
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("No projects configured in profile database.", fontSize = 12.sp, textAlign = TextAlign.Center)
                        }
                    }
                }
            }
        }
    }
}


// ==========================================
// SCREEN 10 - PROFESSIONAL ANALYTICS DASHBOARD
// ==========================================
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProDashboardScreen(modifier: Modifier = Modifier) {
    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = { Text("Pro Analytics 📊", fontWeight = FontWeight.ExtraBold) },
                colors = TopAppBarDefaults.centerAlignedTopAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        modifier = modifier.fillMaxSize()
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(MaterialTheme.colorScheme.background),
            contentPadding = PaddingValues(16.dp)
        ) {
            item {
                Text(
                    text = "Weekly Activity Performance",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Track consultations views, scheduled hours, and core matching feedback loops metrics below.",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(modifier = Modifier.height(20.dp))
            }

            // 2x2 statistics grid layout
            item {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
                        DashboardCard(
                            title = "Profile Views",
                            value = "1,248",
                            subtext = "+14% this week",
                            backgroundColor = FlameRed.copy(alpha = 0.08f),
                            modifier = Modifier.weight(1f)
                        )
                        DashboardCard(
                            title = "Active Matches",
                            value = "12",
                            subtext = "+2 new matches",
                            backgroundColor = FlameOrange.copy(alpha = 0.08f),
                            modifier = Modifier.weight(1f)
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
                        DashboardCard(
                            title = "Bookings Approved",
                            value = "38",
                            subtext = "₹12,400 earned",
                            backgroundColor = SuperBlue.copy(alpha = 0.08f),
                            modifier = Modifier.weight(1f)
                        )
                        DashboardCard(
                            title = "Rating Status",
                            value = "4.9 ⭐",
                            subtext = "24 reviews submitted",
                            backgroundColor = GoldYellow.copy(alpha = 0.08f),
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }

            // Horizontal percentage rate drawn purely via Canvas API (interest breakdown matches)
            item {
                Spacer(modifier = Modifier.height(24.dp))
                SectionHeader("Topic Matching Statistics")
                Text(
                    text = "Matches breakdown compared with active platform topics:",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(modifier = Modifier.height(14.dp))

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(20.dp)
                ) {
                    Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        MetricCustomChartRow(label = "AI Engineering / Multimodal LLMs", value = 94f, fillBrush = FlameGradient)
                        MetricCustomChartRow(label = "Solidity Smart Contracts / Polygon", value = 82f, fillBrush = Brush.linearGradient(listOf(SuperBlue, SuperBlue)))
                        MetricCustomChartRow(label = "Figma Dynamic System Designs", value = 71f, fillBrush = Brush.linearGradient(listOf(GoldYellow, GoldYellow)))
                        MetricCustomChartRow(label = "Developer Utilities / DevOps Clusters", value = 53f, fillBrush = Brush.linearGradient(listOf(LikeGreen, LikeGreen)))
                    }
                }
            }
        }
    }
}

@Composable
fun DashboardCard(
    title: String,
    value: String,
    subtext: String,
    backgroundColor: Color,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = backgroundColor)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(title, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant)
            Spacer(modifier = Modifier.height(8.dp))
            Text(value, style = MaterialTheme.typography.displayMedium, fontWeight = FontWeight.ExtraBold)
            Spacer(modifier = Modifier.height(4.dp))
            Text(subtext, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = LikeGreen)
        }
    }
}

@Composable
fun MetricCustomChartRow(
    label: String,
    value: Float, // 0 to 100
    fillBrush: Brush
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            Text(label, fontSize = 12.sp, fontWeight = FontWeight.Bold)
            Text("${value.toInt()}% Similarity", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = FlameRed)
        }
        Spacer(modifier = Modifier.height(6.dp))
        
        // Pure Canvas drawing component
        Canvas(modifier = Modifier.fillMaxWidth().height(12.dp)) {
            // Draw background track
            drawRoundRect(
                color = Color.LightGray.copy(alpha = 0.3f),
                size = size,
                cornerRadius = CornerRadius(6.dp.toPx(), 6.dp.toPx())
            )
            // Draw active metric bar filling
            drawRoundRect(
                brush = fillBrush,
                size = size.copy(width = size.width * (value / 100f)),
                cornerRadius = CornerRadius(6.dp.toPx(), 6.dp.toPx())
            )
        }
    }
}


// ==========================================
// SCREEN 11 - PLATFORM ADMIN MODERATION PANEL
// ==========================================
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AdminPanelScreen(modifier: Modifier = Modifier) {
    val pendingEvents by DummyDataRepository.events.collectAsState()
    val adminReports by DummyDataRepository.adminReports.collectAsState()
    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    var selectedCategorizerTab by remember { mutableStateOf(0) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Moderation Panels 🛡️", fontWeight = FontWeight.ExtraBold) },
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
            TabRow(
                selectedTabIndex = selectedCategorizerTab,
                containerColor = MaterialTheme.colorScheme.surface,
                contentColor = FlameRed
            ) {
                listOf("Reports Queue", "Event Approvals").forEachIndexed { index, head ->
                    Tab(
                        selected = selectedCategorizerTab == index,
                        onClick = { selectedCategorizerTab = index },
                        text = { Text(head, fontWeight = FontWeight.Bold, fontSize = 12.sp) }
                    )
                }
            }

            Box(modifier = Modifier.weight(1f).fillMaxWidth()) {
                if (selectedCategorizerTab == 0) {
                    // Spammer reports list
                    if (adminReports.isNotEmpty()) {
                        LazyColumn(
                            contentPadding = PaddingValues(16.dp),
                            verticalArrangement = Arrangement.spacedBy(12.dp),
                            modifier = Modifier.fillMaxSize()
                        ) {
                            items(adminReports) { report ->
                                Card(
                                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                                    shape = RoundedCornerShape(16.dp),
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Column(modifier = Modifier.padding(16.dp)) {
                                        Text(text = "Report ID: ${report.id}", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                        Spacer(modifier = Modifier.height(4.dp))
                                        Text(text = "Reported: ${report.reportedName}", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                                        Text(text = "Reporter: ${report.reporterName}", fontSize = 12.sp)
                                        Spacer(modifier = Modifier.height(8.dp))
                                        Text(
                                            text = "Reason: \"${report.reason}\"",
                                            fontSize = 13.sp,
                                            fontWeight = FontWeight.Medium,
                                            color = NopeRed
                                        )

                                        Spacer(modifier = Modifier.height(16.dp))

                                        Row(
                                            horizontalArrangement = Arrangement.spacedBy(12.dp),
                                            modifier = Modifier.fillMaxWidth()
                                        ) {
                                            Button(
                                                onClick = {
                                                    DummyDataRepository.suspendUser(report.reportedName, report.id)
                                                    android.widget.Toast.makeText(context, "User suspended!", android.widget.Toast.LENGTH_SHORT).show()
                                                },
                                                colors = ButtonDefaults.buttonColors(containerColor = NopeRed),
                                                shape = RoundedCornerShape(12.dp),
                                                modifier = Modifier.weight(1f)
                                            ) {
                                                Text("Suspend Spammer")
                                            }

                                            Button(
                                                onClick = {
                                                    DummyDataRepository.dismissReport(report.id)
                                                },
                                                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                                                shape = RoundedCornerShape(12.dp),
                                                modifier = Modifier.weight(1f)
                                            ) {
                                                Text("Dismiss Report", color = MaterialTheme.colorScheme.onBackground)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        EmptyStatePlaceholder(
                            emoji = "🛡️",
                            title = "Reports Queue Empty",
                            subtitle = "Platform is clean. No active flags correspond to user spammers report databases."
                        )
                    }
                } else {
                    // Pending reviews catalog list
                    val pending = pendingEvents.filter { it.status == EventStatus.PENDING_REVIEW }
                    if (pending.isNotEmpty()) {
                        LazyColumn(
                            contentPadding = PaddingValues(16.dp),
                            verticalArrangement = Arrangement.spacedBy(12.dp),
                            modifier = Modifier.fillMaxSize()
                        ) {
                            items(pending) { ev ->
                                Card(
                                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                                    shape = RoundedCornerShape(16.dp),
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Column(modifier = Modifier.padding(16.dp)) {
                                        Text(ev.title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                                        Text(ev.description, fontSize = 13.sp, modifier = Modifier.padding(vertical = 6.dp))

                                        Spacer(modifier = Modifier.height(14.dp))

                                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                                            Button(
                                                onClick = {
                                                    DummyDataRepository.approveEvent(ev.id)
                                                    android.widget.Toast.makeText(context, "Event Approved! Added to Public Feed.", android.widget.Toast.LENGTH_SHORT).show()
                                                },
                                                colors = ButtonDefaults.buttonColors(containerColor = LikeGreen),
                                                shape = RoundedCornerShape(12.dp),
                                                modifier = Modifier.weight(1f)
                                            ) {
                                                Text("Approve Event", color = Color.Black)
                                            }

                                            Button(
                                                onClick = {
                                                    DummyDataRepository.rejectEvent(ev.id)
                                                },
                                                colors = ButtonDefaults.buttonColors(containerColor = NopeRed),
                                                shape = RoundedCornerShape(12.dp),
                                                modifier = Modifier.weight(1f)
                                            ) {
                                                Text("Reject Submission")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        EmptyStatePlaceholder(
                            emoji = "📋",
                            title = "Approvals Queue Empty",
                            subtitle = "There are no pending events created by Pro professionals awaiting administrative approvals."
                        )
                    }
                }
            }
        }
    }
}


// ==========================================
// SCREEN 12 - SETTINGS PANEL
// ==========================================
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
    onNavigateBack: () -> Unit,
    onSignout: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isDarkMode by DummyDataRepository.isDarkMode.collectAsState()
    var displayBlockedDialog by remember { mutableStateOf(false) }

    var notificationMatches by remember { mutableStateOf(true) }
    var notificationSessions by remember { mutableStateOf(true) }
    var profileVisibility by remember { mutableStateOf(true) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Settings", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.AutoMirrored.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.surface)
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(MaterialTheme.colorScheme.background),
            contentPadding = PaddingValues(16.dp)
        ) {
            item {
                SectionHeader("Visual Theme Settings")
                
                // Light / Dark manual toggling switches
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("Activates Dark Visual Mode", fontWeight = FontWeight.Bold, modifier = Modifier.weight(1f))
                        Switch(
                            checked = isDarkMode,
                            onCheckedChange = { DummyDataRepository.toggleDarkMode() },
                            colors = SwitchDefaults.colors(checkedThumbColor = FlameRed, checkedTrackColor = FlameRed.copy(alpha = 0.4f))
                        )
                    }
                }
            }

            item {
                SectionHeader("Notification Channels preference")
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Column {
                        Row(modifier = Modifier.fillMaxWidth().clickable { notificationMatches = !notificationMatches }.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                            Text("Notify on mutual matches", modifier = Modifier.weight(1f))
                            Switch(checked = notificationMatches, onCheckedChange = { notificationMatches = it }, colors = SwitchDefaults.colors(checkedThumbColor = FlameRed))
                        }
                        HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.12f))
                        Row(modifier = Modifier.fillMaxWidth().clickable { notificationSessions = !notificationSessions }.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                            Text("Notify on session slot scheduling", modifier = Modifier.weight(1f))
                            Switch(checked = notificationSessions, onCheckedChange = { notificationSessions = it }, colors = SwitchDefaults.colors(checkedThumbColor = FlameRed))
                        }
                    }
                }
            }

            item {
                SectionHeader("Privacy Options")
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Row(modifier = Modifier.fillMaxWidth().clickable { profileVisibility = !profileVisibility }.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                        Text("Show Profile in Public Discovery feed", modifier = Modifier.weight(1f))
                        Switch(checked = profileVisibility, onCheckedChange = { profileVisibility = it }, colors = SwitchDefaults.colors(checkedThumbColor = FlameRed))
                    }
                }
            }

            item {
                SectionHeader("Platform moderation control")
                Card(
                    modifier = Modifier.fillMaxWidth().clickable { displayBlockedDialog = true },
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                        Text("Configure Blocked Members List", fontWeight = FontWeight.Bold, modifier = Modifier.weight(1f))
                        Icon(imageVector = Icons.Default.ArrowForwardIos, contentDescription = "View Blocked", modifier = Modifier.size(16.dp))
                    }
                }
            }

            // Webview Terms link simulation
            item {
                SectionHeader("Legalities")
                val context = LocalContext.current
                Card(
                    modifier = Modifier.fillMaxWidth().clickable {
                        val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://google.com"))
                        context.startActivity(browserIntent)
                    },
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                        Text("Terms of Service & Privacy Declarations Link (WebView)", modifier = Modifier.weight(1f))
                        Icon(imageVector = Icons.Default.Launch, contentDescription = "Launch WebView", tint = FlameRed, modifier = Modifier.size(16.dp))
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(36.dp))
                GradientButton(
                    text = "Sign out Account",
                    onClick = onSignout,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }

        if (displayBlockedDialog) {
            AlertDialog(
                onDismissRequest = { displayBlockedDialog = false },
                title = { Text("Blocked Members Registries") },
                text = { Text("Currently there correspond no blocked profiles linked to your active cache.") },
                confirmButton = {
                    TextButton(onClick = { displayBlockedDialog = false }) {
                        Text("Confirm", color = FlameRed)
                    }
                }
            )
        }
    }
}


// ==========================================
// NOTIFICATIONS CENTER SCREEN
// ==========================================
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NotificationsScreen(
    onNavigateBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    val items by DummyDataRepository.notifications.collectAsState()
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Activity Center 🔔", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.AutoMirrored.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    TextButton(onClick = { DummyDataRepository.clearNotifications() }) {
                        Text("Clear All", color = FlameRed, fontWeight = FontWeight.Bold)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.surface)
            )
        }
    ) { innerPadding ->
        if (items.isNotEmpty()) {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .background(MaterialTheme.colorScheme.background),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(items) { notif ->
                    Card(
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                        shape = RoundedCornerShape(16.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(modifier = Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(44.dp)
                                    .clip(CircleShape)
                                    .background(FlameRed.copy(alpha = 0.1f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = when (notif.type) {
                                        "MATCH" -> "⚡"
                                        "SESSION" -> "📅"
                                        "MESSAGE" -> "💬"
                                        else -> "🔔"
                                    },
                                    fontSize = 20.sp
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(notif.title, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                Text(notif.message, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                        }
                    }
                }
            }
        } else {
            EmptyStatePlaceholder(
                emoji = "🔔",
                title = "No notifications yet",
                subtitle = "Keep matches matching and sessions booking! Real-time workspace activities will be cataloged instantly."
            )
        }
    }
}


// ==========================================
// SCREEN 7 - CALL SCREEN (GOOGLE MEET + JITSI)
// ==========================================
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CallScreen(
    bookingId: String,
    onNavigateBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    val clipboard = LocalClipboardManager.current
    val context = LocalContext.current
    var isJoining by remember { mutableStateOf(true) }

    LaunchedEffect(key1 = true) {
        delay(1500)
        isJoining = false
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Consultation Video Lounge", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.AutoMirrored.Default.ArrowBack, contentDescription = "Leave Call")
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
                .background(DarkBg)
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            if (isJoining) {
                CircularProgressIndicator(color = FlameRed)
                Spacer(modifier = Modifier.height(16.dp))
                Text("Aligning video configurations...", color = Color.White, fontSize = 14.sp)
            } else {
                Box(
                    modifier = Modifier
                        .size(110.dp)
                        .clip(CircleShape)
                        .background(FlameGradient),
                    contentAlignment = Alignment.Center
                ) {
                    Text("📹", fontSize = 48.sp)
                }

                Spacer(modifier = Modifier.height(24.dp))
                Text(
                    text = "ProMatch Consult Lounge",
                    style = MaterialTheme.typography.displayMedium,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color.White
                )
                Text(
                    text = "Session room ID: promatch-$bookingId",
                    fontSize = 13.sp,
                    color = Color.LightGray
                )

                Spacer(modifier = Modifier.height(48.dp))

                // Option A: Jitsi embedded launcher
                GradientButton(
                    text = "Join with Jitsi Meets (Web App)",
                    onClick = {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://meet.jit.si/promatch-$bookingId"))
                        context.startActivity(intent)
                    },
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(12.dp))

                // Option B: Google Meet launcher fallback
                OutlineButton(
                    text = "Use Google Meet Link alternate",
                    onClick = {
                        val meetLink = "https://meet.google.com/abc-defg-hij"
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(meetLink))
                        context.startActivity(intent)
                    },
                    borderBrush = Brush.linearGradient(listOf(Color.White, Color.White)),
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(24.dp))

                TextButton(
                    onClick = {
                        clipboard.setText(AnnotatedString("https://meet.jit.si/promatch-$bookingId"))
                        android.widget.Toast.makeText(context, "Copied Room Link to Clipboard!", android.widget.Toast.LENGTH_SHORT).show()
                    },
                    colors = ButtonDefaults.textButtonColors(contentColor = Color.LightGray)
                ) {
                    Icon(imageVector = Icons.Default.ContentCopy, contentDescription = "Copy")
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Copy meet credentials 📋")
                }
            }
        }
    }
}
