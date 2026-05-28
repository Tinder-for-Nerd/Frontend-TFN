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
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.Star
import androidx.compose.material3.*
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SessionsScreen(
    onNavigateToProProfile: (String) -> Unit,
    onNavigateToCall: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    var selectTabState by remember { mutableStateOf(0) }
    val userRole by DummyDataRepository.userRole.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Consultations Hub 📅", fontWeight = FontWeight.ExtraBold) },
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
            // Tab Selector Row
            val tabs = if (userRole == UserRole.PRO) {
                listOf("Browse Experts", "My Bookings", "My Availability")
            } else {
                listOf("Browse Experts", "My Bookings")
            }

            TabRow(
                selectedTabIndex = selectTabState,
                containerColor = MaterialTheme.colorScheme.surface,
                contentColor = FlameRed,
                indicator = { tabPositions ->
                    TabRowDefaults.Indicator(
                        Modifier.tabIndicatorOffset(tabPositions[selectTabState]),
                        color = FlameRed
                    )
                }
            ) {
                tabs.forEachIndexed { index, title ->
                    Tab(
                        selected = selectTabState == index,
                        onClick = { selectTabState = index },
                        text = { Text(title, fontWeight = FontWeight.Bold, fontSize = 13.sp) }
                    )
                }
            }

            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
            ) {
                when (selectTabState) {
                    0 -> SessionDiscoveryTab(onNavigateToProProfile)
                    1 -> MyBookingsTab(onNavigateToCall)
                    2 -> AvailabilityManagerTab()
                }
            }
        }
    }
}

// 6A - Session Discovery (Browse Professionals catalog)
@Composable
fun SessionDiscoveryTab(onNavigateToProProfile: (String) -> Unit) {
    val profiles by DummyDataRepository.profiles.collectAsState()
    val services by DummyDataRepository.services.collectAsState()

    var searchQuery by remember { mutableStateOf("") }
    var selectCategory by remember { mutableStateOf("All") }

    val categories = listOf("All", "1:1 Session", "Mentoring", "Resume Review", "Mock Interview")

    // Filter professionals list
    val professionals = remember(profiles, services, searchQuery, selectCategory) {
        profiles.filter { profile ->
            profile.userId != "u0" &&
            profile.displayName.lowercase().contains(searchQuery.lowercase()) &&
            (selectCategory == "All" || services.any { svc ->
                svc.providerId == profile.userId && svc.type.name.replace("_", " ").lowercase()
                    .contains(selectCategory.lowercase())
            })
        }
    }

    Column(modifier = Modifier.fillMaxSize()) {
        // Search
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Search expert mentors...") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            leadingIcon = { Icon(imageVector = Icons.Default.Search, contentDescription = "Search") },
            shape = RoundedCornerShape(12.dp)
        )

        // Filter Categories
        LazyRow(
            contentPadding = PaddingValues(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.padding(bottom = 12.dp)
        ) {
            items(categories) { category ->
                val selected = selectCategory == category
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(20.dp))
                        .background(if (selected) FlameGradient else androidx.compose.ui.graphics.Brush.linearGradient(listOf(MaterialTheme.colorScheme.surfaceVariant, MaterialTheme.colorScheme.surfaceVariant)))
                        .clickable { selectCategory = category }
                        .padding(horizontal = 14.dp, vertical = 8.dp)
                ) {
                    Text(
                        category,
                        color = if (selected) Color.White else MaterialTheme.colorScheme.onBackground,
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp
                    )
                }
            }
        }

        // Professionals List
        if (professionals.isNotEmpty()) {
            LazyColumn(
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(professionals) { pro ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onNavigateToProProfile(pro.userId) },
                        shape = RoundedCornerShape(20.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                    ) {
                        Row(
                            modifier = Modifier.padding(16.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            ProfileAvatarCircle(
                                initials = pro.displayName.take(2).uppercase(),
                                size = 64,
                                isVerified = pro.isVerified
                            )
                            Spacer(modifier = Modifier.width(16.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    pro.displayName,
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.onBackground
                                )
                                Text(
                                    pro.roleTitle,
                                    fontSize = 13.sp,
                                    color = FlameRed,
                                    fontWeight = FontWeight.Bold
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(
                                        imageVector = Icons.Default.Star,
                                        contentDescription = "Rating",
                                        tint = GoldYellow,
                                        modifier = Modifier.size(16.dp)
                                    )
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text(
                                        text = "${pro.rating} (${pro.totalSessions} sessions)",
                                        fontSize = 12.sp,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                            }
                            Icon(
                                imageVector = Icons.Default.ArrowForwardIos,
                                contentDescription = "View Profile",
                                tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.5f),
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    }
                }
            }
        } else {
            EmptyStatePlaceholder(
                emoji = "📂",
                title = "No professionals match",
                subtitle = "Try adjusting your search filters or browse other consulting services categories above."
            )
        }
    }
}

// 6B - Pro Session Profile Page
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProSessionProfileScreen(
    userId: String,
    onNavigateBack: () -> Unit,
    onNavigateToBook: (String, String) -> Unit
) {
    val profiles by DummyDataRepository.profiles.collectAsState()
    val services by DummyDataRepository.services.collectAsState()

    val profile = profiles.find { it.userId == userId } ?: return
    val mentorServices = services.filter { it.providerId == userId }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Public Profiles", fontWeight = FontWeight.Bold) },
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
                // Profile header banner info
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 16.dp)
                ) {
                    ProfileAvatarCircle(
                        initials = profile.displayName.take(2).uppercase(),
                        size = 96,
                        isVerified = profile.isVerified
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = profile.displayName,
                        style = MaterialTheme.typography.displayMedium,
                        fontWeight = FontWeight.ExtraBold,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Text(
                        text = profile.roleTitle,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = FlameRed
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(imageVector = Icons.Default.LocationOn, contentDescription = "Loc", tint = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(text = profile.city, fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        StatChip(value = "${profile.rating} ⭐", label = "Rating")
                        StatChip(value = "${profile.totalSessions}", label = "Sessions")
                        StatChip(value = "${profile.matchScore}%", label = "Similarity")
                    }
                }
            }

            item {
                SectionHeader("About Mentor")
                Text(
                    text = profile.bio,
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onBackground,
                    modifier = Modifier.padding(bottom = 16.dp)
                )
            }

            item {
                SectionHeader("Available Consulting Services 🚀")
            }

            if (mentorServices.isNotEmpty()) {
                items(mentorServices) { service ->
                    SessionCard(
                        emoji = service.emoji,
                        title = service.title,
                        type = service.type.name.replace("_", " "),
                        duration = service.durationMinutes,
                        priceInr = service.priceInr,
                        description = service.description,
                        onBook = { onNavigateToBook(userId, service.id) }
                    )
                }
            } else {
                item {
                    Text(
                        "No specific session packages listed by this mentor yet.",
                        fontSize = 13.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(vertical = 12.dp)
                    )
                }
            }
        }
    }
}

// 6C - Time-Slot Picker Coordinator view
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SlotPickerScreen(
    providerId: String,
    serviceId: String,
    onNavigateBack: () -> Unit,
    onNavigateToMain: () -> Unit
) {
    val profiles by DummyDataRepository.profiles.collectAsState()
    val services by DummyDataRepository.services.collectAsState()
    val availability by DummyDataRepository.availability.collectAsState()

    val providerProfile = profiles.find { it.userId == providerId } ?: return
    val service = services.find { it.id == serviceId } ?: return

    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    val days = listOf("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
    var selectedDay by remember { mutableStateOf("Monday") }

    // Timing slots list grouped
    val slots = listOf("9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM")
    var selectedSlot by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Select Timing Slot", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.AutoMirrored.Default.ArrowBack, contentDescription = "Back")
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
                .background(MaterialTheme.colorScheme.background)
                .padding(16.dp)
        ) {
            // Service brief summary card
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(modifier = Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text(service.emoji, fontSize = 28.sp)
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(service.title, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                        Text("${service.durationMinutes} min · From ₹${service.priceInr}", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))
            SectionHeader("Choose Weekday")

            // Day Ribbon
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(bottom = 16.dp)
            ) {
                items(days) { day ->
                    val selected = selectedDay == day
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(16.dp))
                            .background(if (selected) FlameGradient else androidx.compose.ui.graphics.Brush.linearGradient(listOf(MaterialTheme.colorScheme.surfaceVariant, MaterialTheme.colorScheme.surfaceVariant)))
                            .clickable { selectedDay = day; selectedSlot = "" }
                            .padding(horizontal = 14.dp, vertical = 10.dp)
                    ) {
                        Text(
                            text = day.take(3),
                            color = if (selected) Color.White else MaterialTheme.colorScheme.onBackground,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp
                        )
                    }
                }
            }

            SectionHeader("Available Hours ⏰")

            // Simple responsive grid
            LazyVerticalGrid(
                columns = GridCells.Fixed(3),
                verticalArrangement = Arrangement.spacedBy(10.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                modifier = Modifier.weight(1f)
            ) {
                items(slots) { slot ->
                    // Parse hour index for basic validation matches
                    val hr = when {
                        slot.startsWith("9") -> 9
                        slot.startsWith("10") -> 10
                        slot.startsWith("11") -> 11
                        slot.startsWith("12") -> 12
                        slot.startsWith("2") -> 14
                        slot.startsWith("3") -> 15
                        slot.startsWith("4") -> 16
                        slot.startsWith("5") -> 17
                        else -> 10
                    }
                    val isAvailable = availability.contains("$selectedDay-$hr") || !days.contains(selectedDay) // Simulated coverage

                    val isSelected = selectedSlot == slot
                    val bg = if (isSelected) FlameGradient else if (isAvailable) androidx.compose.ui.graphics.Brush.linearGradient(listOf(MaterialTheme.colorScheme.surface, MaterialTheme.colorScheme.surface)) else androidx.compose.ui.graphics.Brush.linearGradient(listOf(Color.Transparent, Color.Transparent))
                    val borderPaint = if (isSelected) FlameRed else if (isAvailable) MaterialTheme.colorScheme.outline.copy(alpha = 0.5f) else Color.Transparent

                    Box(
                        modifier = Modifier
                            .height(48.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(bg)
                            .border(1.dp, borderPaint, RoundedCornerShape(12.dp))
                            .clickable(enabled = isAvailable) { selectedSlot = slot }
                            .padding(4.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            slot,
                            color = if (isSelected) Color.White else if (isAvailable) MaterialTheme.colorScheme.onBackground else MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.3f),
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Submits request
            GradientButton(
                text = "Confirm Booking →",
                onClick = {
                    if (selectedSlot.isNotEmpty()) {
                        DummyDataRepository.requestBooking(
                            seekerId = "u0",
                            providerId = providerId,
                            sessionId = serviceId,
                            scheduledAt = System.currentTimeMillis() + 86400000 * 2 // Scheduled 2 days from now mock
                        )
                        coroutineScope.launch {
                            android.widget.Toast.makeText(context, "Topmate booking request submitted successfully! 📅", android.widget.Toast.LENGTH_LONG).show()
                            delay(400)
                            onNavigateToMain()
                        }
                    }
                },
                enabled = selectedSlot.isNotEmpty(),
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}

// 6D - My Bookings Tab (Upcoming, Past, Pending)
@Composable
fun MyBookingsTab(onNavigateToCall: (String) -> Unit) {
    val bookings by DummyDataRepository.bookings.collectAsState()
    val services by DummyDataRepository.services.collectAsState()
    val profiles by DummyDataRepository.profiles.collectAsState()

    var activeHeadingTab by remember { mutableStateOf(0) }
    var ratingBooking by remember { mutableStateOf<Booking?>(null) }
    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    val filteredBookings = remember(bookings, activeHeadingTab) {
        bookings.filter { item ->
            when (activeHeadingTab) {
                0 -> item.status == BookingStatus.CONFIRMED
                1 -> item.status == BookingStatus.COMPLETED
                else -> item.status == BookingStatus.PENDING
            }
        }
    }

    Column(modifier = Modifier.fillMaxSize()) {
        TabRow(
            selectedTabIndex = activeHeadingTab,
            containerColor = MaterialTheme.colorScheme.background,
            contentColor = FlameRed,
            indicator = { tabPositions ->
                TabRowDefaults.Indicator(
                    Modifier.tabIndicatorOffset(tabPositions[activeHeadingTab]),
                    color = FlameRed
                )
            }
        ) {
            listOf("📅 Confirmed", "✓ Concluded", "⏳ Awaiting Approval").forEachIndexed { index, head ->
                Tab(
                    selected = activeHeadingTab == index,
                    onClick = { activeHeadingTab = index },
                    text = { Text(head, fontSize = 11.sp, fontWeight = FontWeight.Bold) }
                )
            }
        }

        if (filteredBookings.isNotEmpty()) {
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(filteredBookings) { booking ->
                    val service = services.find { it.id == booking.sessionId }
                    val provider = profiles.find { it.userId == booking.providerId }

                    Card(
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                        shape = RoundedCornerShape(20.dp),
                        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(service?.emoji ?: "💬", fontSize = 32.sp)
                                Spacer(modifier = Modifier.width(12.dp))
                                Column {
                                    Text(service?.title ?: "Chat alignment", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                                    Text("Mentor: ${provider?.displayName ?: "Expert"}", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                }
                            }

                            Spacer(modifier = Modifier.height(12.dp))
                            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.15f))
                            Spacer(modifier = Modifier.height(12.dp))

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "Scheduled session time",
                                    fontSize = 11.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Text(
                                    text = SimpleDateFormat("EEE MMR d, h:mm a", Locale.getDefault()).format(booking.scheduledAt),
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp,
                                    color = FlameRed
                                )
                            }

                            Spacer(modifier = Modifier.height(16.dp))

                            // Interactive control actions
                            when (booking.status) {
                                BookingStatus.CONFIRMED -> {
                                    GradientButton(
                                        text = "Join Video Call Room 📹",
                                        onClick = { onNavigateToCall(booking.id) },
                                        modifier = Modifier.fillMaxWidth()
                                    )
                                }
                                BookingStatus.COMPLETED -> {
                                    OutlineButton(
                                        text = "⭐ Rate Consultation Session",
                                        onClick = { ratingBooking = booking },
                                        modifier = Modifier.fillMaxWidth()
                                    )
                                }
                                BookingStatus.PENDING -> {
                                    Button(
                                        onClick = {
                                            DummyDataRepository.updateBookingStatus(booking.id, BookingStatus.CANCELLED)
                                            android.widget.Toast.makeText(context, "Booking successfully cancelled", android.widget.Toast.LENGTH_SHORT).show()
                                        },
                                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                                        shape = RoundedCornerShape(30.dp),
                                        modifier = Modifier.fillMaxWidth()
                                    ) {
                                        Text("Cancel Request", color = NopeRed, fontWeight = FontWeight.Bold)
                                    }
                                }
                                else -> {}
                            }
                        }
                    }
                }
            }
        } else {
            EmptyStatePlaceholder(
                emoji = "📆",
                title = "No bookings found",
                subtitle = "Active slots or ongoing appointments corresponding to this tab matches will be listed here."
            )
        }

        // RATING POPUP DIALOG
        ratingBooking?.let { b ->
            var starsCount by remember { mutableStateOf(5) }
            AlertDialog(
                onDismissRequest = { ratingBooking = null },
                title = { Text("Rate Session", fontWeight = FontWeight.Bold) },
                text = {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("We appreciate you sharing your experience reviewing goals alongside experts:", fontSize = 13.sp)
                        Spacer(modifier = Modifier.height(20.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            for (i in 1..5) {
                                Icon(
                                    imageVector = if (i <= starsCount) Icons.Default.Star else Icons.Outlined.Star,
                                    contentDescription = "Star",
                                    tint = GoldYellow,
                                    modifier = Modifier
                                        .size(36.dp)
                                        .clickable { starsCount = i }
                                )
                            }
                        }
                    }
                },
                confirmButton = {
                    TextButton(
                        onClick = {
                            ratingBooking = null
                            android.widget.Toast.makeText(context, "Thank you! Your feedback is saved.", android.widget.Toast.LENGTH_SHORT).show()
                        }
                    ) {
                        Text("Submit Feedback", color = FlameRed, fontWeight = FontWeight.Bold)
                    }
                }
            )
        }
    }
}

// 6E - Availability Grid Planner (Pro level users)
@Composable
fun AvailabilityManagerTab() {
    val availability by DummyDataRepository.availability.collectAsState()
    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    val daysList = listOf("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
    var selectedDayRow by remember { mutableStateOf("Monday") }

    val timingHours = listOf(9, 10, 11, 12, 14, 15, 16, 17)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            "Weekly Grid Timings Planner 📅",
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )
        Text(
            "Tap any hour indicator slot below to toggle availability status for student bookings coordinate channels.",
            fontSize = 12.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Left day list sidebar alongside right grids
        Row(modifier = Modifier.weight(1f)) {
            LazyColumn(
                modifier = Modifier
                    .width(100.dp)
                    .fillMaxHeight(),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(daysList) { day ->
                    val selected = selectedDayRow == day
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(44.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(if (selected) FlameRed.copy(alpha = 0.12f) else Color.Transparent)
                            .border(1.dp, if (selected) FlameRed else Color.Transparent, RoundedCornerShape(12.dp))
                            .clickable { selectedDayRow = day }
                            .padding(8.dp),
                        contentAlignment = Alignment.CenterStart
                    ) {
                        Text(
                            text = day,
                            color = if (selected) FlameRed else MaterialTheme.colorScheme.onBackground,
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.width(12.dp))

            // Timing active hour cards
            LazyColumn(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight(),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(timingHours) { hr ->
                    val slotKey = "$selectedDayRow-$hr"
                    val isAvailable = availability.contains(slotKey)

                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { DummyDataRepository.toggleAvailability(slotKey) },
                        colors = CardDefaults.cardColors(
                            containerColor = if (isAvailable) LikeGreen.copy(alpha = 0.08f) else MaterialTheme.colorScheme.surface
                        ),
                        border = BorderStroke(1.dp, if (isAvailable) LikeGreen else MaterialTheme.colorScheme.outline.copy(alpha = 0.15f))
                    ) {
                        Row(
                            modifier = Modifier.padding(12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = when {
                                    hr == 12 -> "12:00 PM"
                                    hr > 12 -> "${hr - 12}:00 PM"
                                    else -> "$hr:00 AM"
                                },
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp,
                                modifier = Modifier.weight(1f)
                            )
                            Checkbox(
                                checked = isAvailable,
                                onCheckedChange = { DummyDataRepository.toggleAvailability(slotKey) },
                                colors = CheckboxDefaults.colors(checkedColor = LikeGreen)
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        GradientButton(
            text = "Save Recurring Availability Hours",
            onClick = {
                android.widget.Toast.makeText(context, "Recurring availability slots updated on servers!", android.widget.Toast.LENGTH_SHORT).show()
            },
            modifier = Modifier.fillMaxWidth()
        )
    }
}
