package com.example.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary = FlameRed,
    secondary = FlameOrange,
    background = DarkBg,
    surface = DarkSurface,
    onBackground = DarkText,
    onSurface = DarkText,
    outline = DarkBorder,
    surfaceVariant = DarkSurface2,
    onSurfaceVariant = DarkMuted
)

private val LightColorScheme = lightColorScheme(
    primary = FlameRed,
    secondary = FlameOrange,
    background = LightBg,
    surface = LightSurface,
    onBackground = LightText,
    onSurface = LightText,
    outline = LightBorder,
    surfaceVariant = LightBg,
    onSurfaceVariant = LightMuted
)

@Composable
fun ProMatchTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
