package com.example.data

enum class UserRole { STUDENT, PRO, ADMIN }

data class User(
    val id: String,
    val email: String,
    val role: UserRole, // STUDENT, PRO, ADMIN
    val profile: Profile?
)

data class Profile(
    val userId: String,
    val displayName: String,
    val age: Int,
    val roleTitle: String,
    val city: String,
    val bio: String,
    val avatarUrl: String?,
    val interests: List<String>,
    val links: ProfileLinks,
    val projects: List<Project>,
    val intent: List<String>,
    val matchScore: Int = 0,
    val isVerified: Boolean = false,
    val rating: Float = 0f,
    val totalSessions: Int = 0
)

data class ProfileLinks(
    val github: String?,
    val linkedin: String?,
    val portfolio: String?,
    val twitter: String?
)

data class Project(
    val title: String,
    val description: String,
    val techStack: List<String>,
    val emoji: String
)

data class Match(
    val id: String,
    val userId1: String,
    val userId2: String,
    val matchedAt: Long,
    val lastMessage: Message?,
    val unreadCount: Int = 0
)

enum class MessageType { TEXT, BOOKING_REQUEST, SYSTEM }

data class Message(
    val id: String,
    val matchId: String,
    val senderId: String,
    val content: String,
    val timestamp: Long,
    val isRead: Boolean,
    val type: MessageType // TEXT, BOOKING_REQUEST, SYSTEM
)

enum class SessionType { ONE_ON_ONE, WEBINAR, ASYNC, MOCK_INTERVIEW, RESUME_REVIEW }

data class SessionService(
    val id: String,
    val providerId: String,
    val title: String,
    val description: String,
    val durationMinutes: Int,
    val type: SessionType, // ONE_ON_ONE, WEBINAR, ASYNC, MOCK_INTERVIEW, RESUME_REVIEW
    val priceInr: Int, // 0 = free
    val emoji: String
)

enum class BookingStatus { PENDING, CONFIRMED, COMPLETED, CANCELLED }

data class Booking(
    val id: String,
    val sessionId: String,
    val seekerId: String,
    val providerId: String,
    val scheduledAt: Long,
    val status: BookingStatus,
    val meetLink: String?,
    val jitsiRoomId: String?
)

enum class EventType { ALL, ONLINE, IN_PERSON, HACKATHON, TALK, WEBINAR, RSVP }
enum class EventStatus { PENDING_REVIEW, APPROVED, REJECTED }

data class Event(
    val id: String,
    val title: String,
    val type: EventType,
    val description: String,
    val scheduledAt: Long,
    val location: String?,
    val meetLink: String?,
    val maxCapacity: Int,
    val rsvpCount: Int,
    val status: EventStatus, // PENDING_REVIEW, APPROVED, REJECTED
    val bannerEmoji: String,
    val organizerId: String = "u1"
)

data class NotificationItem(
    val id: String,
    val type: String, // "MATCH", "MESSAGE", "SESSION", "EVENT"
    val title: String,
    val message: String,
    val timestamp: Long,
    val isRead: Boolean = false
)
