package com.example.data

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.UUID

object DummyDataRepository {

    // Current logged in user state
    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser.asStateFlow()

    // Light / Dark mode State
    private val _isDarkMode = MutableStateFlow(true)
    val isDarkMode: StateFlow<Boolean> = _isDarkMode.asStateFlow()

    // Active role select
    private val _userRole = MutableStateFlow(UserRole.STUDENT)
    val userRole: StateFlow<UserRole> = _userRole.asStateFlow()

    // Has completed onboarding
    private val _isOnboardingCompleted = MutableStateFlow(false)
    val isOnboardingCompleted: StateFlow<Boolean> = _isOnboardingCompleted.asStateFlow()

    // List of swiped user IDs
    private val swipedUserIds = mutableSetOf<String>()

    // Profiles
    private val _profiles = MutableStateFlow<List<Profile>>(emptyList())
    val profiles: StateFlow<List<Profile>> = _profiles.asStateFlow()

    // Matches
    private val _matches = MutableStateFlow<List<Match>>(emptyList())
    val matches: StateFlow<List<Match>> = _matches.asStateFlow()

    // Messages grouped by match ID
    private val _messages = MutableStateFlow<Map<String, List<Message>>>(emptyMap())
    val messages: StateFlow<Map<String, List<Message>>> = _messages.asStateFlow()

    // Session Services
    private val _services = MutableStateFlow<List<SessionService>>(emptyList())
    val services: StateFlow<List<SessionService>> = _services.asStateFlow()

    // Bookings
    private val _bookings = MutableStateFlow<List<Booking>>(emptyList())
    val bookings: StateFlow<List<Booking>> = _bookings.asStateFlow()

    // Events
    private val _events = MutableStateFlow<List<Event>>(emptyList())
    val events: StateFlow<List<Event>> = _events.asStateFlow()

    // RSVP'd Event IDs
    private val _rsvpEventIds = MutableStateFlow<Set<String>>(emptySet())
    val rsvpEventIds: StateFlow<Set<String>> = _rsvpEventIds.asStateFlow()

    // Notifications
    private val _notifications = MutableStateFlow<List<NotificationItem>>(emptyList())
    val notifications: StateFlow<List<NotificationItem>> = _notifications.asStateFlow()

    // Active Weekly Availability (Pro users) - True = Available
    // Expressed as: "Day-Hour" e.g., "Monday-10", "Friday-15"
    private val _availability = MutableStateFlow<Set<String>>(
        setOf(
            "Monday-10", "Monday-11", "Monday-14", "Monday-15",
            "Wednesday-10", "Wednesday-11", "Wednesday-15", "Wednesday-16",
            "Friday-14", "Friday-15", "Friday-16"
        )
    )
    val availability: StateFlow<Set<String>> = _availability.asStateFlow()

    // Admin Reports
    data class AdminReport(val id: String, val reporterName: String, val reportedName: String, val reason: String, val timestamp: Long)
    private val _adminReports = MutableStateFlow<List<AdminReport>>(emptyList())
    val adminReports: StateFlow<List<AdminReport>> = _adminReports.asStateFlow()

    // Swipe counts
    private val _swipesRemaining = MutableStateFlow(5)
    val swipesRemaining: StateFlow<Int> = _swipesRemaining.asStateFlow()

    init {
        resetToDefault()
    }

    fun toggleDarkMode() {
        _isDarkMode.value = !_isDarkMode.value
    }

    fun setDarkMode(dark: Boolean) {
        _isDarkMode.value = dark
    }

    fun setUserRole(role: UserRole) {
        _userRole.value = role
        // Also update currentUser object role
        _currentUser.value?.let { current ->
            _currentUser.value = current.copy(role = role)
        }
    }

    fun completeOnboarding(profile: Profile) {
        _isOnboardingCompleted.value = true
        _currentUser.value = User(
            id = "u0",
            email = "admin123@gmail.com",
            role = _userRole.value,
            profile = profile
        )
    }

    fun login() {
        // Simple dummy login triggers u0
        val profile = Profile(
            userId = "u0",
            displayName = "Alex Lee",
            age = 23,
            roleTitle = "Developer & Builder",
            city = "San Francisco",
            bio = "Always curios, hacking on mobile experiences and AI tooling.",
            avatarUrl = null,
            interests = listOf("AI/ML", "Web3", "Design"),
            links = ProfileLinks("alexgith", "alexin", "alexportfolio", "alextwit"),
            projects = listOf(
                Project("OceanLedger", "AI-powered web3 carbon credit trading marketplace.", listOf("AI/ML", "Web3", "Polygon"), "🌊")
            ),
            intent = listOf("Collaborate", "Find Mentor"),
            matchScore = 95,
            isVerified = true,
            rating = 4.9f,
            totalSessions = 12
        )
        _currentUser.value = User("u0", "admin123@gmail.com", _userRole.value, profile)
    }

    fun logout() {
        _currentUser.value = null
        _isOnboardingCompleted.value = false
        resetToDefault()
    }

    fun swipeRight(profileId: String): Boolean {
        swipedUserIds.add(profileId)
        if (_userRole.value == UserRole.STUDENT) {
            _swipesRemaining.value = (_swipesRemaining.value - 1).coerceAtLeast(0)
        }
        
        // Match condition: If swiped right on Arjun Sharma (u1), Jasmine Wu (u2) or Ravi Kumar (u5), simulate a mutual Match!
        if (profileId == "u1" || profileId == "u2" || profileId == "u5") {
            createMatch(profileId)
            return true // Trigger "It's a Match!" modal
        }
        return false
    }

    fun swipeLeft(profileId: String) {
        swipedUserIds.add(profileId)
        if (_userRole.value == UserRole.STUDENT) {
            _swipesRemaining.value = (_swipesRemaining.value - 1).coerceAtLeast(0)
        }
    }

    fun boostSwipes() {
        _swipesRemaining.value = 100
    }

    fun undoLastSwipe(profileId: String) {
        swipedUserIds.remove(profileId)
    }

    private fun createMatch(otherUserId: String) {
        val otherProfile = _profiles.value.find { it.userId == otherUserId } ?: return
        val matchId = "m_${otherUserId}_u0"
        
        // Create match item
        val newMatch = Match(
            id = matchId,
            userId1 = "u0",
            userId2 = otherUserId,
            matchedAt = System.currentTimeMillis(),
            lastMessage = null,
            unreadCount = 1
        )
        
        _matches.value = listOf(newMatch) + _matches.value

        // Seed initial icebreaker / welcome notification
        addNotification(
            type = "MATCH",
            title = "New Mutual Connection! ⚡",
            message = "You matched with ${otherProfile.displayName}. Start chatting!"
        )

        // Seed welcome message
        val welcomeMsg = Message(
            id = UUID.randomUUID().toString(),
            matchId = matchId,
            senderId = otherUserId,
            content = "Hey! I saw you're also building on Polygon 👀",
            timestamp = System.currentTimeMillis() - 2000,
            isRead = false,
            type = MessageType.TEXT
        )
        
        val list = _messages.value[matchId]?.toMutableList() ?: mutableListOf()
        list.add(welcomeMsg)
        
        val newMap = _messages.value.toMutableMap()
        newMap[matchId] = list
        _messages.value = newMap
    }

    fun sendMessage(matchId: String, senderId: String, content: String, type: MessageType = MessageType.TEXT) {
        val msg = Message(
            id = UUID.randomUUID().toString(),
            matchId = matchId,
            senderId = senderId,
            content = content,
            timestamp = System.currentTimeMillis(),
            isRead = true,
            type = type
        )

        val list = _messages.value[matchId]?.toMutableList() ?: mutableListOf()
        list.add(msg)

        val newMsgMap = _messages.value.toMutableMap()
        newMsgMap[matchId] = list
        _messages.value = newMsgMap

        // Update last message in Match
        _matches.value = _matches.value.map {
            if (it.id == matchId) it.copy(lastMessage = msg, unreadCount = 0) else it
        }

        // Simulate reply if system matches and message is text from current user
        if (senderId == "u0" && type == MessageType.TEXT) {
            val match = _matches.value.find { it.id == matchId }
            val secondUser = if (match?.userId1 == "u0") match.userId2 else match?.userId1
            if (secondUser != null) {
                simulateReply(matchId, secondUser)
            }
        }
    }

    private fun simulateReply(matchId: String, otherUserId: String) {
        val otherProfile = _profiles.value.find { it.userId == otherUserId } ?: return
        val list = _messages.value[matchId] ?: return
        val lastUserMessage = list.lastOrNull { it.senderId == "u0" }?.content?.lowercase() ?: ""

        val replyContent = when {
            lastUserMessage.contains("book") || lastUserMessage.contains("call") || lastUserMessage.contains("meet") -> {
                "That's insane, we should jump on a call 🔥"
            }
            lastUserMessage.contains("hello") || lastUserMessage.contains("hey") -> {
                "Hey there! Ready to collaborate! What are you working on currently? 🚀"
            }
            else -> {
                "That sounds so cool! I'm really looking forward to sharing ideas and reviewing setups."
            }
        }

        // Delay reply content simulation dynamically
        val reply = Message(
            id = UUID.randomUUID().toString(),
            matchId = matchId,
            senderId = otherUserId,
            content = replyContent,
            timestamp = System.currentTimeMillis() + 1000,
            isRead = false,
            type = MessageType.TEXT
        )

        val newList = list.toMutableList()
        newList.add(reply)
        val newMsgMap = _messages.value.toMutableMap()
        newMsgMap[matchId] = newList
        _messages.value = newMsgMap

        _matches.value = _matches.value.map {
            if (it.id == matchId) it.copy(lastMessage = reply) else it
        }

        addNotification(
            type = "MESSAGE",
            title = "New Message from ${otherProfile.displayName}",
            message = replyContent
        )
    }

    fun deleteMatch(matchId: String) {
        _matches.value = _matches.value.filterNot { it.id == matchId }
        val newMsgMap = _messages.value.toMutableMap()
        newMsgMap.remove(matchId)
        _messages.value = newMsgMap
    }

    // Topmate Layer Booking confirmed trigger
    fun requestBooking(seekerId: String, providerId: String, sessionId: String, scheduledAt: Long) {
        val service = _services.value.find { it.id == sessionId } ?: return
        val bookingId = "b_${UUID.randomUUID()}"
        val newBooking = Booking(
            id = bookingId,
            sessionId = sessionId,
            seekerId = seekerId,
            providerId = providerId,
            scheduledAt = scheduledAt,
            status = BookingStatus.PENDING,
            meetLink = "https://meet.google.com/abc-defg-hij",
            jitsiRoomId = "promatch-$bookingId"
        )

        _bookings.value = _bookings.value + newBooking

        addNotification(
            type = "SESSION",
            title = "Booking Requested 📅",
            message = "Requested '${service.title}' session. Awaiting approval."
        )

        // Generate card in Chat if there's a match
        val match = _matches.value.find {
            (it.userId1 == seekerId && it.userId2 == providerId) || (it.userId1 == providerId && it.userId2 == seekerId)
        }
        if (match != null) {
            val formatStr = service.title + " · " + service.durationMinutes + " min · " + "Scheduled Session"
            sendMessage(
                matchId = match.id,
                senderId = seekerId,
                content = formatStr,
                type = MessageType.BOOKING_REQUEST
            )
        }
    }

    fun updateBookingStatus(bookingId: String, status: BookingStatus) {
        val booking = _bookings.value.find { it.id == bookingId } ?: return
        _bookings.value = _bookings.value.map {
            if (it.id == bookingId) it.copy(status = status) else it
        }

        val service = _services.value.find { it.id == booking.sessionId }
        addNotification(
            type = "SESSION",
            title = "Booking Status: $status 📅",
            message = "Your session for '${service?.title ?: "Chat"}' is now $status."
        )
    }

    // Availability list toggles
    fun toggleAvailability(dayHour: String) {
        val current = _availability.value.toMutableSet()
        if (current.contains(dayHour)) {
            current.remove(dayHour)
        } else {
            current.add(dayHour)
        }
        _availability.value = current
    }

    // Event RSVPs
    fun toggleRsvp(eventId: String) {
        val rsvps = _rsvpEventIds.value.toMutableSet()
        val event = _events.value.find { it.id == eventId } ?: return
        
        if (rsvps.contains(eventId)) {
            rsvps.remove(eventId)
            _events.value = _events.value.map {
                if (it.id == eventId) it.copy(rsvpCount = (it.rsvpCount - 1).coerceAtLeast(0)) else it
            }
        } else {
            rsvps.add(eventId)
            _events.value = _events.value.map {
                if (it.id == eventId) it.copy(rsvpCount = it.rsvpCount + 1) else it
            }
            addNotification(
                type = "EVENT",
                title = "Event Reserved! 🎉",
                message = "You have RSVP'd for: ${event.title}."
            )
        }
        _rsvpEventIds.value = rsvps
    }

    fun createEvent(title: String, description: String, type: EventType, location: String?, dateMillis: Long, banner: String) {
        val newEvent = Event(
            id = "e_${UUID.randomUUID()}",
            title = title,
            type = type,
            description = description,
            scheduledAt = dateMillis,
            location = location ?: "Online Google Meet",
            meetLink = "https://meet.google.com/abc-defg-hij",
            maxCapacity = 150,
            rsvpCount = 1,
            status = EventStatus.PENDING_REVIEW,
            bannerEmoji = banner,
            organizerId = "u0"
        )
        _events.value = _events.value + newEvent
        addNotification(
            type = "EVENT",
            title = "Event Submitted 📣",
            message = "Your event '$title' has been submitted for platform review."
        )
    }

    fun approveEvent(eventId: String) {
        _events.value = _events.value.map {
            if (it.id == eventId) it.copy(status = EventStatus.APPROVED) else it
        }
    }

    fun rejectEvent(eventId: String) {
        _events.value = _events.value.map {
            if (it.id == eventId) it.copy(status = EventStatus.REJECTED) else it
        }
    }

    fun submitReport(reportedUserId: String, reason: String) {
        val profile = _profiles.value.find { it.userId == reportedUserId }
        val id = "r_${UUID.randomUUID()}"
        val report = AdminReport(
            id = id,
            reporterName = _currentUser.value?.profile?.displayName ?: "User",
            reportedName = profile?.displayName ?: "Unknown User",
            reason = reason,
            timestamp = System.currentTimeMillis()
        )
        _adminReports.value = _adminReports.value + report
        addNotification(
            type = "SYSTEM",
            title = "Report Submitted 🛠️",
            message = "We have received your report regarding ${profile?.displayName ?: "the user"}."
        )
    }

    fun dismissReport(reportId: String) {
        _adminReports.value = _adminReports.value.filterNot { it.id == reportId }
    }

    fun suspendUser(reportedName: String, reportId: String) {
        // Find user is profiles and remove or flag
        _profiles.value = _profiles.value.filterNot { it.displayName == reportedName }
        _adminReports.value = _adminReports.value.filterNot { it.id == reportId }
        addNotification(
            type = "SYSTEM",
            title = "Moderation complete",
            message = "$reportedName has been suspended temporarily."
        )
    }

    fun clearNotifications() {
        _notifications.value = emptyList()
    }

    fun addNotification(type: String, title: String, message: String) {
        val item = NotificationItem(
            id = UUID.randomUUID().toString(),
            type = type,
            title = title,
            message = message,
            timestamp = System.currentTimeMillis()
        )
        _notifications.value = listOf(item) + _notifications.value
    }

    fun resetToDefault() {
        swipedUserIds.clear()
        _rsvpEventIds.value = emptySet()
        _availability.value = setOf(
            "Monday-10", "Monday-11", "Monday-14", "Monday-15",
            "Wednesday-10", "Wednesday-11", "Wednesday-15", "Wednesday-16",
            "Friday-14", "Friday-15", "Friday-16"
        )
        _swipesRemaining.value = 5

        _profiles.value = listOf(
            Profile("u1", "Arjun Sharma", 24, "Full-stack Engineer", "Mumbai", "Building AI-powered carbon credit marketplace and hacking smart contracts.", null, listOf("AI/ML", "Web3", "Polygon"), ProfileLinks("arjunsh", "arjunin", "arjunport", null), listOf(Project("AirTrade", "Decentralized carbon credits trade API.", listOf("Solidity", "React"), "🌱")), listOf("Collaborate", "Startups"), 94, true, 4.8f, 48),
            Profile("u2", "Jasmine Wu", 25, "ML Researcher", "Bangalore", "Researching multimodal LLM prompts and agentic behaviors.", null, listOf("AI/ML", "PyTorch", "NLP"), ProfileLinks(null, "jasminein", "jasmineweb", "jasminetw"), emptyList(), listOf("Advising", "Find Mentor"), 87, false, 4.9f, 25),
            Profile("u3", "Marco Rossi", 28, "Product Designer", "Remote", "Crafting high fidelity experiences and responsive dynamic design systems on Figma.", null, listOf("Design", "Figma", "Motion"), ProfileLinks("marcoded", "marcoin", null, "marcotwit"), emptyList(), listOf("Collaborate", "Advising"), 81, true, 4.7f, 60),
            Profile("u4", "Priya Mehta", 23, "Biotech Founder", "Hyderabad", "Hacking computational diagnostics with automated ML sequencing.", null, listOf("Biotech", "AI", "Research"), ProfileLinks(null, "priyain", null, null), emptyList(), listOf("Co-Founder", "Hiring"), 78, false, 0f, 0),
            Profile("u5", "Ravi Kumar", 26, "DevOps Engineer", "Chennai", "Automating workflows with Kubernetes, Terraform, & multi-cloud clusters.", null, listOf("DevOps", "Kubernetes", "Cloud"), ProfileLinks("ravik", "raviin", "ravicodes", null), emptyList(), listOf("Collaborate"), 75, true, 4.6f, 15),
            Profile("u6", "Sara Chen", 27, "VC Analyst", "Singapore", "Sourcing early-stage web3 & deep tech deals. Let's grab coffee! ☕", null, listOf("Finance", "Startups", "Web3"), ProfileLinks(null, "sarachen", null, "saratwit"), emptyList(), listOf("Advising", "Community"), 72, false, 4.9f, 9),
            Profile("u7", "Alex Petrov", 29, "Robotics Engineer", "Berlin", "Hacking ROS controller libraries and local trajectory navigation maps.", null, listOf("Robotics", "ROS", "ML"), ProfileLinks("alexr", "alexin", null, null), emptyList(), listOf("Collaborate", "Advising"), 69, false, 4.5f, 5),
            Profile("u8", "Meera Nair", 24, "Open Source Dev", "Pune", "Hacking React cores and maintaining popular JS/Kotlin repos full-time.", null, listOf("Open Source", "React", "Node"), ProfileLinks("meera", "meerain", "meeradev", "meeratw"), emptyList(), listOf("Collaborate", "Community"), 88, true, 5.0f, 18),
            Profile("u9", "James Okafor", 30, "Crypto Founder", "Lagos", "Building DeFi savings layers and low-cost stablecoin channels in Africa.", null, listOf("Web3", "DeFi", "Solidity"), ProfileLinks("jamesok", "jamesin", null, "jamestwit"), emptyList(), listOf("Co-Founder", "Collaborate"), 83, false, 4.8f, 75),
            Profile("u10", "Ananya Rao", 22, "AI Student", "Delhi", "Completing final year ML thesis on multimodal embedding structures.", null, listOf("AI/ML", "Python", "Research"), ProfileLinks("ananya", "ananyain", null, null), emptyList(), listOf("Find Mentor", "Community"), 91, false, 0f, 0)
        )

        _services.value = listOf(
            SessionService("s1", "u1", "☕ Coffee Chat", "Quick alignment chat about carbon markets or tech stack suggestions", 30, SessionType.ONE_ON_ONE, 199, "☕"),
            SessionService("s2", "u1", "📋 Resume Review", "In-depth resume roast and LinkedIn profile optimization checks", 45, SessionType.RESUME_REVIEW, 299, "📋"),
            SessionService("s3", "u1", "🎤 Mock Technical Interview", "Coding questions, algorithm practice, and behavioral review support", 45, SessionType.MOCK_INTERVIEW, 499, "🎤"),
            SessionService("s4", "u2", "🎓 ML Mentoring Session", "Let's review PyTorch architectures or NLP thesis papers together", 60, SessionType.ONE_ON_ONE, 399, "🧠"),
            SessionService("s5", "u3", "🎨 Portfolio Review", "Get advice on visual hierarchy, typography, and figma presentation styles", 45, SessionType.ONE_ON_ONE, 599, "🎨")
        )

        val matchId = "m_u1_u0"
        _matches.value = listOf(
            Match(
                id = matchId,
                userId1 = "u0",
                userId2 = "u1",
                matchedAt = System.currentTimeMillis() - 86400000,
                lastMessage = Message("msg_3", matchId, "u1", "That's insane, we should jump on a call 🔥", System.currentTimeMillis() - 5000, false, MessageType.TEXT),
                unreadCount = 1
            )
        )

        _messages.value = mapOf(
            matchId to listOf(
                Message("msg_1", matchId, "u1", "Hey! I saw you're also building on Polygon 👀", System.currentTimeMillis() - 7200000, true, MessageType.TEXT),
                Message("msg_2", matchId, "u0", "Hey Arjun! I'm building OceanLedger — AI-powered carbon credit marketplace!", System.currentTimeMillis() - 3600000, true, MessageType.TEXT),
                Message("msg_3", matchId, "u1", "That's insane, we should jump on a call 🔥", System.currentTimeMillis() - 5000, false, MessageType.TEXT)
            )
        )

        _bookings.value = listOf(
            Booking("b1", "s1", "u0", "u1", System.currentTimeMillis() + 172800000, BookingStatus.CONFIRMED, "https://meet.google.com/abc-defg-hij", "promatch-b1"),
            Booking("b2", "s2", "u0", "u3", System.currentTimeMillis() - 86400000, BookingStatus.COMPLETED, null, "promatch-b2")
        )

        _events.value = listOf(
            Event("e1", "Polygon Guild Meetup & Hackathon", EventType.HACKATHON, "Learn to build scalable dApps and network with local hackers.", System.currentTimeMillis() + 8640000 * 5, "Nesco Centre, Mumbai", "https://meet.google.com/xyz", 100, 48, EventStatus.APPROVED, "⛓️", "u1"),
            Event("e2", "Web3 Carbon Credits Roundtable", EventType.TALK, "A structured discussion on the intersection of regenerative finance, AI models, and public ledgers.", System.currentTimeMillis() + 8640000 * 2, "Decentralized Zoom Room", "https://meet.google.com/xyz", 200, 89, EventStatus.APPROVED, "🌱", "u1"),
            Event("e3", "Figma Auto-Layout Masterclass", EventType.WEBINAR, "Interactive webinar reviewing UI density rules and dynamic container sizes.", System.currentTimeMillis() + 8640000 * 8, "Google Meet Webcast", "https://meet.google.com/xyz", 150, 42, EventStatus.APPROVED, "🎨", "u3")
        )

        _notifications.value = listOf(
            NotificationItem("n1", "MESSAGE", "Message received", "Arjun Sharma replied 'That's insane, we should jump on a call 🔥'", System.currentTimeMillis() - 5000, false),
            NotificationItem("n2", "SESSION", "Booking Confirmed! 📅", "Arjun Sharma confirmed your Coffee Chat.", System.currentTimeMillis() - 3600000, false),
            NotificationItem("n3", "MATCH", "It's a Match! ⚡", "You matched with Arjun Sharma. Tap to say hello!", System.currentTimeMillis() - 86400000, true)
        )

        _adminReports.value = listOf(
            AdminReport("rep1", "Sanjay Rao", "Spammer Joe", "Sending promotional links repetitively to all matches.", System.currentTimeMillis() - 3600000),
            AdminReport("rep2", "Lisa Green", "FakeProfile101", "Impersonating other tech leaders on LinkedIn.", System.currentTimeMillis() - 7200000)
        )
    }
}
