package com.example.ui.screens

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.ArrowBack
import androidx.compose.material.icons.outlined.AutoAwesome
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.DummyDataRepository
import com.example.data.Profile
import com.example.data.ProfileLinks
import com.example.data.UserRole
import com.example.ui.components.GradientButton
import com.example.ui.components.OutlineButton
import com.example.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@Composable
fun SplashScreen(onNavigateToNext: () -> Unit) {
    var startAnimation by remember { mutableStateOf(false) }
    val scale = animateFloatAsState(
        targetValue = if (startAnimation) 1.2f else 0.8f,
        animationSpec = spring(dampingRatio = 0.5f, stiffness = Spring.StiffnessLow),
        label = "logo_scale"
    )
    val alpha = animateFloatAsState(
        targetValue = if (startAnimation) 1f else 0f,
        animationSpec = tween(durationMillis = 1000),
        label = "logo_alpha"
    )

    LaunchedEffect(key1 = true) {
        startAnimation = true
        delay(1800)
        onNavigateToNext()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(110.dp)
                    .scale(scale.value)
                    .clip(CircleShape)
                    .background(FlameGradient)
                    .testTag("splash_logo"),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "⚡",
                    fontSize = 54.sp,
                    color = Color.White
                )
            }
            Spacer(modifier = Modifier.height(24.dp))
            Text(
                text = "ProMatch",
                style = MaterialTheme.typography.displayLarge,
                color = MaterialTheme.colorScheme.onBackground,
                fontWeight = FontWeight.ExtraBold,
                modifier = Modifier.graphicsLayer { this.alpha = alpha.value }
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = "Swipe. Match. Consult.",
                fontSize = 14.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = alpha.value),
                fontWeight = FontWeight.Medium,
                letterSpacing = 2.sp
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreen(
    onNavigateToRoleSelect: () -> Unit,
    onNavigateToMain: () -> Unit
) {
    var email by remember { mutableStateOf("admin123@gmail.com") }
    var password by remember { mutableStateOf("admin@123") }
    var shakeError by remember { mutableStateOf(false) }
    var showErrorMessage by remember { mutableStateOf(false) }

    val shakeOffset = remember { Animatable(0f) }
    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    val loginBoxBorder = if (showErrorMessage) BorderStroke(2.dp, NopeRed) else BorderStroke(0.dp, Color.Transparent)

    LaunchedEffect(shakeError) {
        if (shakeError) {
            repeat(4) {
                shakeOffset.animateTo(
                    targetValue = if (shakeOffset.value == 0f) 15f else -15f,
                    animationSpec = tween(50)
                )
            }
            shakeOffset.animateTo(targetValue = 0f, animationSpec = tween(50))
            shakeError = false
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier
                .offset(x = shakeOffset.value.dp)
                .fillMaxWidth()
                .widthIn(max = 420.dp)
        ) {
            // Header Branding
            Box(
                modifier = Modifier
                    .size(72.dp)
                    .clip(CircleShape)
                    .background(FlameGradient),
                contentAlignment = Alignment.Center
            ) {
                Text("⚡", fontSize = 36.sp, color = Color.White)
            }
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "Welcome to ProMatch",
                style = MaterialTheme.typography.displayMedium,
                textAlign = TextAlign.Center,
                fontWeight = FontWeight.ExtraBold,
                color = MaterialTheme.colorScheme.onBackground
            )
            Spacer(modifier = Modifier.height(32.dp))

            // Card panel
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(loginBoxBorder, RoundedCornerShape(24.dp))
                    .testTag("login_card"),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 6.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp)
                ) {
                    Text(
                        text = "Sign In",
                        style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.onSurface,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(16.dp))

                    TextField(
                        value = email,
                        onValueChange = { email = it; showErrorMessage = false },
                        label = { Text("Email") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("email_input"),
                        shape = RoundedCornerShape(14.dp),
                        colors = TextFieldDefaults.colors(
                            focusedIndicatorColor = Color.Transparent,
                            unfocusedIndicatorColor = Color.Transparent
                        )
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    TextField(
                        value = password,
                        onValueChange = { password = it; showErrorMessage = false },
                        label = { Text("Password") },
                        visualTransformation = PasswordVisualTransformation(),
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("password_input"),
                        shape = RoundedCornerShape(14.dp),
                        colors = TextFieldDefaults.colors(
                            focusedIndicatorColor = Color.Transparent,
                            unfocusedIndicatorColor = Color.Transparent
                        )
                    )

                    if (showErrorMessage) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "Invalid credentials. Tap sign in again to retry.",
                            color = NopeRed,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.fillMaxWidth()
                        )
                    }

                    Spacer(modifier = Modifier.height(24.dp))

                    GradientButton(
                        text = "Sign in →",
                        onClick = {
                            if (email == "admin123@gmail.com" && password == "admin@123") {
                                onNavigateToRoleSelect()
                            } else {
                                shakeError = true
                                showErrorMessage = true
                                coroutineScope.launch {
                                    android.widget.Toast.makeText(context, "Use: admin123@gmail.com / admin@123", android.widget.Toast.LENGTH_SHORT).show()
                                }
                            }
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("submit_button")
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))
            Text(
                text = "Or continue with social logins",
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(12.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Button(
                    onClick = {
                        android.widget.Toast.makeText(context, "Google sign-in coming soon!", android.widget.Toast.LENGTH_SHORT).show()
                    },
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                    shape = RoundedCornerShape(30.dp)
                ) {
                    Icon(imageVector = Icons.Default.AccountCircle, contentDescription = "Google", tint = SuperBlue)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Google", color = MaterialTheme.colorScheme.onBackground)
                }

                Button(
                    onClick = {
                        android.widget.Toast.makeText(context, "GitHub sign-in coming soon!", android.widget.Toast.LENGTH_SHORT).show()
                    },
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                    shape = RoundedCornerShape(30.dp)
                ) {
                    Icon(imageVector = Icons.Default.Code, contentDescription = "GitHub", tint = MaterialTheme.colorScheme.onBackground)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("GitHub", color = MaterialTheme.colorScheme.onBackground)
                }
            }
        }
    }
}

@Composable
fun RoleSelectScreen(
    onNavigateToOnboarding: () -> Unit,
    onNavigateToMain: () -> Unit
) {
    var selectedRole by remember { mutableStateOf<UserRole?>(null) }
    val coroutineScope = rememberCoroutineScope()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.widthIn(max = 480.dp)
        ) {
            Text(
                text = "Welcome back 👋",
                style = MaterialTheme.typography.displayMedium,
                fontWeight = FontWeight.ExtraBold,
                color = MaterialTheme.colorScheme.onBackground
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Select your current core profile perspective to proceed:",
                fontSize = 14.sp,
                textAlign = TextAlign.Center,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(30.dp))

            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                RoleCard(
                    title = "🎓 Student / Normal User",
                    desc = "Search for experts, consult mentors, and review careers or opportunities.",
                    isSelected = selectedRole == UserRole.STUDENT,
                    onClick = { selectedRole = UserRole.STUDENT }
                )

                RoleCard(
                    title = "💼 Professional (Pro User)",
                    desc = "Offer consulting slots, review resumes, host webinars, and provide mentorship.",
                    isSelected = selectedRole == UserRole.PRO,
                    onClick = { selectedRole = UserRole.PRO }
                )

                RoleCard(
                    title = "🛡️ Administrator",
                    desc = "Approve community events and oversee user reporting/moderation pipelines.",
                    isSelected = selectedRole == UserRole.ADMIN,
                    onClick = { selectedRole = UserRole.ADMIN }
                )
            }

            Spacer(modifier = Modifier.height(36.dp))

            GradientButton(
                text = "Continue representing role →",
                onClick = {
                    selectedRole?.let { role ->
                        DummyDataRepository.setUserRole(role)
                        if (role == UserRole.ADMIN) {
                            DummyDataRepository.login() // Auto setup full admin account
                            onNavigateToMain()
                        } else {
                            // If they selected a role, we'll route to Onboarding (so they configure their profile)
                            onNavigateToOnboarding()
                        }
                    }
                },
                enabled = selectedRole != null,
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("role_continue_button")
            )
        }
    }
}

@Composable
fun RoleCard(
    title: String,
    desc: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    val borderColor = if (isSelected) FlameRed else MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
    val background = if (isSelected) FlameRed.copy(alpha = 0.08f) else MaterialTheme.colorScheme.surface

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .border(2.dp, borderColor, RoundedCornerShape(20.dp)),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = background)
    ) {
        Column(
            modifier = Modifier.padding(18.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = if (isSelected) FlameRed else MaterialTheme.colorScheme.onSurface
                )
                Spacer(modifier = Modifier.weight(1f))
                RadioButton(
                    selected = isSelected,
                    onClick = onClick,
                    colors = RadioButtonDefaults.colors(selectedColor = FlameRed)
                )
            }
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = desc,
                fontSize = 13.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@OptIn(ExperimentalLayoutApi::class, ExperimentalMaterial3Api::class)
@Composable
fun OnboardingScreen(onCompleted: () -> Unit) {
    var step by remember { mutableStateOf(1) }
    val coroutineScope = rememberCoroutineScope()

    // Setup Onboarding state variables
    var fullName by remember { mutableStateOf("Jane Doe") }
    val selectedIntents = remember { mutableStateListOf<String>() }
    var userBio by remember { mutableStateOf("Full-stack enthusiast interested in scalable infrastructure and Web3 integrations.") }
    val selectedInterests = remember { mutableStateListOf<String>() }
    var githubLink by remember { mutableStateOf("https://github.com/janedoe") }
    var linkedinLink by remember { mutableStateOf("https://linkedin.com/in/janedoe") }
    var portfolioLink by remember { mutableStateOf("https://janedoe.com") }
    var twitterLink by remember { mutableStateOf("") }
    
    // Simulate AI Bio Rewrite
    var isRewriting by remember { mutableStateOf(false) }

    val intentOptions = listOf("Co-Founder", "Find Mentor", "Collaborate", "Hiring", "Advising", "Community")
    val interestOptions = listOf(
        "AI/ML", "Web3", "Polygon", "Design", "Figma", "DevOps", "Kubernetes",
        "React", "Node", "Solidity", "Research", "Finance", "Startups",
        "NLP", "Cloud", "Biotech", "PyTorch", "Robotics", "ROS", "Open Source"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(24.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .widthIn(max = 500.dp)
                .align(Alignment.TopCenter)
        ) {
            // STEP PROGRESS DOTS INDICATOR
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(
                    onClick = { if (step > 1) step -= 1 },
                    enabled = step > 1
                ) {
                    Icon(imageVector = Icons.Outlined.ArrowBack, contentDescription = "Back")
                }
                
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    for (i in 1..5) {
                        Box(
                            modifier = Modifier
                                .size(12.dp)
                                .clip(CircleShape)
                                .background(if (i <= step) FlameRed else MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                        )
                    }
                }

                Text(
                    text = "Step $step/5",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = FlameRed
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            // RENDER REQUISITE ONBOARDING STEP
            when (step) {
                1 -> {
                    Text(
                        text = "What is your primary intent? 🎯",
                        style = MaterialTheme.typography.displayMedium,
                        fontWeight = FontWeight.ExtraBold,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Identify what you are seeking to achieve inside the community. You can choose multiple options.",
                        fontSize = 14.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(24.dp))

                    LazyVerticalGrid(
                        columns = GridCells.Fixed(2),
                        verticalArrangement = Arrangement.spacedBy(12.dp),
                        horizontalArrangement = Arrangement.spacedBy(12.dp),
                        modifier = Modifier.weight(1f)
                    ) {
                        items(intentOptions) { intent ->
                            val isSelected = selectedIntents.contains(intent)
                            val containerCol = if (isSelected) FlameRed.copy(alpha = 0.1f) else MaterialTheme.colorScheme.surface
                            val outlineCol = if (isSelected) FlameRed else MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)

                            Box(
                                modifier = Modifier
                                    .height(90.dp)
                                    .clip(RoundedCornerShape(20.dp))
                                    .background(containerCol)
                                    .border(2.dp, outlineCol, RoundedCornerShape(20.dp))
                                    .clickable {
                                        if (isSelected) selectedIntents.remove(intent) else selectedIntents.add(intent)
                                    }
                                    .padding(14.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    intent,
                                    fontWeight = FontWeight.Bold,
                                    color = if (isSelected) FlameRed else MaterialTheme.colorScheme.onSurface,
                                    textAlign = TextAlign.Center
                                )
                            }
                        }
                    }
                }
                2 -> {
                    Text(
                        text = "Introduce yourself 🎓",
                        style = MaterialTheme.typography.displayMedium,
                        fontWeight = FontWeight.ExtraBold,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Spacer(modifier = Modifier.height(16.dp))

                    OutlinedTextField(
                        value = fullName,
                        onValueChange = { fullName = it },
                        label = { Text("Display Name") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("onboard_name"),
                        shape = RoundedCornerShape(14.dp)
                    )
                    Spacer(modifier = Modifier.height(16.dp))

                    OutlinedTextField(
                        value = userBio,
                        onValueChange = { userBio = it },
                        label = { Text("Short professional biography") },
                        minLines = 4,
                        maxLines = 6,
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("onboard_bio"),
                        shape = RoundedCornerShape(14.dp),
                        supportingText = {
                            Text(
                                text = "${userBio.length}/300 characters",
                                textAlign = TextAlign.End,
                                modifier = Modifier.fillMaxWidth()
                            )
                        }
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = {
                            coroutineScope.launch {
                                isRewriting = true
                                delay(1200)
                                userBio = "Stellar tech builder & researcher. Pioneering next-gen $fullName, focused on open-source scaling paradigms and robust Web3 multi-tenant deployments."
                                isRewriting = false
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(30.dp),
                        enabled = !isRewriting
                    ) {
                        Icon(imageVector = Icons.Outlined.AutoAwesome, contentDescription = "AI", tint = FlameRed)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = if (isRewriting) "AI is polishing bio..." else "🤖 Rewrite with AI (Compose Shimmer Demo)",
                            color = MaterialTheme.colorScheme.onBackground
                        )
                    }
                    if (isRewriting) {
                        Spacer(modifier = Modifier.height(12.dp))
                        LinearProgressIndicator(
                            color = FlameRed,
                            modifier = Modifier.fillMaxWidth().height(4.dp)
                        )
                    }
                    Spacer(modifier = Modifier.weight(1f))
                }
                3 -> {
                    Text(
                        text = "Highlight interests 🏷️",
                        style = MaterialTheme.typography.displayMedium,
                        fontWeight = FontWeight.ExtraBold,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Choose at least 3 interests to help our discovery engine pair you. Selected: ${selectedInterests.size}/3+",
                        fontSize = 13.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(20.dp))

                    FlowRow(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        interestOptions.forEach { interest ->
                            val isSelected = selectedInterests.contains(interest)
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(20.dp))
                                    .background(if (isSelected) FlameRed else MaterialTheme.colorScheme.surfaceVariant)
                                    .clickable {
                                        if (isSelected) selectedInterests.remove(interest) else selectedInterests.add(interest)
                                    }
                                    .padding(horizontal = 14.dp, vertical = 10.dp)
                            ) {
                                Text(
                                    interest,
                                    color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurface,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp
                                )
                            }
                        }
                    }
                }
                4 -> {
                    Text(
                        text = "Connect social handles 🔗",
                        style = MaterialTheme.typography.displayMedium,
                        fontWeight = FontWeight.ExtraBold,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Spacer(modifier = Modifier.height(18.dp))

                    OutlinedTextField(
                        value = githubLink,
                        onValueChange = { githubLink = it },
                        label = { Text("GitHub username URL") },
                        leadingIcon = { Icon(imageVector = Icons.Default.Source, contentDescription = "GitHub", tint = FlameRed) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp)
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    OutlinedTextField(
                        value = linkedinLink,
                        onValueChange = { linkedinLink = it },
                        label = { Text("LinkedIn developer profile URL") },
                        leadingIcon = { Icon(imageVector = Icons.Default.Business, contentDescription = "LinkedIn", tint = FlameOrange) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp)
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    OutlinedTextField(
                        value = portfolioLink,
                        onValueChange = { portfolioLink = it },
                        label = { Text("Personal blog/portfolio URL") },
                        leadingIcon = { Icon(imageVector = Icons.Default.Web, contentDescription = "Portfolio", tint = SuperBlue) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp)
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    OutlinedTextField(
                        value = twitterLink,
                        onValueChange = { twitterLink = it },
                        label = { Text("Twitter/X developer page") },
                        leadingIcon = { Icon(imageVector = Icons.Default.Share, contentDescription = "Twitter", tint = GoldYellow) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp)
                    )

                    Spacer(modifier = Modifier.weight(1f))
                }
                5 -> {
                    Text(
                        text = "Perfect avatar 📷",
                        style = MaterialTheme.typography.displayMedium,
                        fontWeight = FontWeight.ExtraBold,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Spacer(modifier = Modifier.height(24.dp))

                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center,
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth()
                    ) {
                        Box(
                            modifier = Modifier
                                .size(140.dp)
                                .clip(CircleShape)
                                .background(FlameGradient),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = if (fullName.isNotEmpty()) fullName.take(2).uppercase() else "PM",
                                fontSize = 48.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        }
                        Spacer(modifier = Modifier.height(24.dp))
                        Text(
                            text = fullName,
                            fontWeight = FontWeight.Bold,
                            fontSize = 20.sp,
                            color = MaterialTheme.colorScheme.onBackground
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "A virtual emoji avatar is generated containing your initials.",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            textAlign = TextAlign.Center
                        )
                        Spacer(modifier = Modifier.height(24.dp))

                        OutlineButton(
                            text = "📷 Simulate Photo Upload",
                            onClick = {
                                // Simple mock feedback
                                coroutineScope.launch {
                                    // Simulated upload
                                }
                            }
                        )
                    }
                }
            }

            // NAVIGATION BUTTONS (BOTTOM PANEL)
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                if (step < 5) {
                    GradientButton(
                        text = "Continue",
                        onClick = {
                            if (step == 3 && selectedInterests.size < 3) {
                                // Toast to choose at least 3
                            } else {
                                step += 1
                            }
                        },
                        modifier = Modifier.weight(1f),
                        enabled = if (step == 3) selectedInterests.size >= 3 else true
                    )
                } else {
                    GradientButton(
                        text = "Complete Integration 🎉",
                        onClick = {
                            // Save profile to repo and launch
                            val profile = Profile(
                                userId = "u0",
                                displayName = fullName,
                                age = 23,
                                roleTitle = when (DummyDataRepository.userRole.value) {
                                    UserRole.PRO -> "Consulting Expert"
                                    else -> "Student Builder"
                                },
                                city = "Mumbai",
                                bio = userBio,
                                avatarUrl = null,
                                interests = selectedInterests.toList(),
                                links = ProfileLinks(githubLink, linkedinLink, portfolioLink, if (twitterLink.isEmpty()) null else twitterLink),
                                projects = emptyList(),
                                intent = selectedIntents.toList(),
                                matchScore = 100,
                                isVerified = true,
                                rating = 4.8f,
                                totalSessions = 5
                            )
                            DummyDataRepository.completeOnboarding(profile)
                            onCompleted()
                        },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }
    }
}
