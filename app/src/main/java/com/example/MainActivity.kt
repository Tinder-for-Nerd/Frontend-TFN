package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.DummyDataRepository
import com.example.data.UserRole
import com.example.ui.components.BottomNavBar
import com.example.ui.components.ThemeToggleFAB
import com.example.ui.screens.*
import com.example.ui.theme.FlameGradient
import com.example.ui.theme.FlameRed
import com.example.ui.theme.ProMatchTheme

sealed class ScreenRoute {
    object Splash : ScreenRoute()
    object Login : ScreenRoute()
    object RoleSelect : ScreenRoute()
    object Onboarding : ScreenRoute()
    object Main : ScreenRoute()
    data class Chat(val matchId: String) : ScreenRoute()
    data class ProProfile(val userId: String) : ScreenRoute()
    data class SlotPicker(val providerId: String, val serviceId: String) : ScreenRoute()
    data class Call(val bookingId: String) : ScreenRoute()
    object Notifications : ScreenRoute()
    object Settings : ScreenRoute()
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            val isDarkMode by DummyDataRepository.isDarkMode.collectAsState()
            val userRole by DummyDataRepository.userRole.collectAsState()

            ProMatchTheme(darkTheme = isDarkMode) {
                // Navigation state lists acting as standard Backstack
                var backstack by remember { mutableStateOf(listOf<ScreenRoute>(ScreenRoute.Splash)) }
                val currentScreen = backstack.last()

                var currentBottomNavRoute by remember { mutableStateOf("discover") }

                // Handles system back-button presses
                BackHandler(enabled = backstack.size > 1) {
                    backstack = backstack.dropLast(1)
                }

                fun navigateTo(route: ScreenRoute) {
                    backstack = backstack + route
                }

                fun navigateBack() {
                    if (backstack.size > 1) {
                        backstack = backstack.dropLast(1)
                    }
                }

                fun resetTo(route: ScreenRoute) {
                    backstack = listOf(route)
                }

                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Box(modifier = Modifier.fillMaxSize()) {
                        when (currentScreen) {
                            is ScreenRoute.Splash -> {
                                SplashScreen(
                                    onNavigateToNext = { resetTo(ScreenRoute.Login) }
                                )
                            }
                            is ScreenRoute.Login -> {
                                LoginScreen(
                                    onNavigateToRoleSelect = { navigateTo(ScreenRoute.RoleSelect) },
                                    onNavigateToMain = { resetTo(ScreenRoute.Main) }
                                )
                            }
                            is ScreenRoute.RoleSelect -> {
                                RoleSelectScreen(
                                    onNavigateToOnboarding = { navigateTo(ScreenRoute.Onboarding) },
                                    onNavigateToMain = { resetTo(ScreenRoute.Main) }
                                )
                            }
                            is ScreenRoute.Onboarding -> {
                                OnboardingScreen(
                                    onCompleted = { resetTo(ScreenRoute.Main) }
                                )
                            }
                            is ScreenRoute.Main -> {
                                var showProDashboard by remember { mutableStateOf(false) }
                                var showAdminPanel by remember { mutableStateOf(false) }

                                Scaffold(
                                    bottomBar = {
                                        if (!showProDashboard && !showAdminPanel) {
                                            BottomNavBar(
                                                currentRoute = currentBottomNavRoute,
                                                onNavigate = { route -> currentBottomNavRoute = route }
                                            )
                                        }
                                    },
                                    floatingActionButton = {
                                        Row(
                                            horizontalArrangement = Arrangement.spacedBy(10.dp),
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            // Role-Gated Toggles: Admin trigger or Pro dashboard trigger
                                            if (userRole == UserRole.ADMIN) {
                                                FloatingActionButton(
                                                    onClick = { showAdminPanel = !showAdminPanel },
                                                    containerColor = FlameRed,
                                                    contentColor = Color.White
                                                ) {
                                                    Icon(
                                                        imageVector = if (showAdminPanel) Icons.Default.Close else Icons.Default.Shield,
                                                        contentDescription = "Admin Area"
                                                    )
                                                }
                                            } else if (userRole == UserRole.PRO) {
                                                FloatingActionButton(
                                                    onClick = { showProDashboard = !showProDashboard },
                                                    containerColor = FlameRed,
                                                    contentColor = Color.White
                                                ) {
                                                    Icon(
                                                        imageVector = if (showProDashboard) Icons.Default.Close else Icons.Default.TrendingUp,
                                                        contentDescription = "Pro Dashboard Area"
                                                    )
                                                }
                                            }

                                            // Theme Toggle FAB floating action button
                                            ThemeToggleFAB(
                                                isDark = isDarkMode,
                                                onToggle = { DummyDataRepository.toggleDarkMode() }
                                            )
                                        }
                                    }
                                ) { innerPadding ->
                                    Box(modifier = Modifier.fillMaxSize()) {
                                        when {
                                            showAdminPanel -> {
                                                AdminPanelScreen(modifier = Modifier.padding(innerPadding))
                                            }
                                            showProDashboard -> {
                                                ProDashboardScreen(modifier = Modifier.padding(innerPadding))
                                            }
                                            else -> {
                                                when (currentBottomNavRoute) {
                                                    "discover" -> {
                                                        DiscoverScreen(
                                                            onNavigateToChat = { matId -> navigateTo(ScreenRoute.Chat(matId)) },
                                                            onNavigateToNotifications = { navigateTo(ScreenRoute.Notifications) },
                                                            modifier = Modifier.padding(innerPadding)
                                                        )
                                                    }
                                                    "messages" -> {
                                                        MessagesScreen(
                                                            onNavigateToChat = { matId -> navigateTo(ScreenRoute.Chat(matId)) },
                                                            modifier = Modifier.padding(innerPadding)
                                                        )
                                                    }
                                                    "sessions" -> {
                                                        SessionsScreen(
                                                            onNavigateToProProfile = { usrId -> navigateTo(ScreenRoute.ProProfile(usrId)) },
                                                            onNavigateToCall = { bookId -> navigateTo(ScreenRoute.Call(bookId)) },
                                                            modifier = Modifier.padding(innerPadding)
                                                        )
                                                    }
                                                    "events" -> {
                                                        EventsScreen(
                                                            userRole = userRole,
                                                            modifier = Modifier.padding(innerPadding)
                                                        )
                                                    }
                                                    "profile" -> {
                                                        ProfileScreen(
                                                            currentRole = userRole,
                                                            onNavigateToSettings = { navigateTo(ScreenRoute.Settings) },
                                                            modifier = Modifier.padding(innerPadding)
                                                        )
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            is ScreenRoute.Chat -> {
                                val sId = (currentScreen as ScreenRoute.Chat).matchId
                                ChatScreen(
                                    matchId = sId,
                                    onNavigateBack = { navigateBack() },
                                    onNavigateToBook = { usrId, svcId -> navigateTo(ScreenRoute.SlotPicker(usrId, svcId)) },
                                    onNavigateToCall = { bId -> navigateTo(ScreenRoute.Call(bId)) }
                                )
                            }
                            is ScreenRoute.ProProfile -> {
                                val uId = (currentScreen as ScreenRoute.ProProfile).userId
                                ProSessionProfileScreen(
                                    userId = uId,
                                    onNavigateBack = { navigateBack() },
                                    onNavigateToBook = { pId, sId -> navigateTo(ScreenRoute.SlotPicker(pId, sId)) }
                                )
                            }
                            is ScreenRoute.SlotPicker -> {
                                val screen = currentScreen as ScreenRoute.SlotPicker
                                SlotPickerScreen(
                                    providerId = screen.providerId,
                                    serviceId = screen.serviceId,
                                    onNavigateBack = { navigateBack() },
                                    onNavigateToMain = { resetTo(ScreenRoute.Main) }
                                )
                            }
                            is ScreenRoute.Call -> {
                                val bId = (currentScreen as ScreenRoute.Call).bookingId
                                CallScreen(
                                    bookingId = bId,
                                    onNavigateBack = { navigateBack() }
                                )
                            }
                            is ScreenRoute.Notifications -> {
                                NotificationsScreen(
                                    onNavigateBack = { navigateBack() }
                                )
                            }
                            is ScreenRoute.Settings -> {
                                SettingsScreen(
                                    onNavigateBack = { navigateBack() },
                                    onSignout = {
                                        DummyDataRepository.logout()
                                        resetTo(ScreenRoute.Login)
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
