import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/swipe_provider.dart';
import 'providers/chat_provider.dart';
import 'theme/brand_theme.dart';
import 'screens/landing/landing_screen.dart';
import 'screens/auth/role_selector_screen.dart';

void main() {
  runApp(const ProMatchApp());
}

class ProMatchApp extends StatelessWidget {
  const ProMatchApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => SwipeProvider()),
        ChangeNotifierProvider(create: (_) => ChatProvider()),
      ],
      child: MaterialApp(
        title: 'ProMatch',
        debugShowCheckedModeBanner: false,
        theme: BrandTheme.lightTheme,
        routes: {
          '/': (context) => const LandingScreen(),
          '/select-role': (context) => const RoleSelectorScreen(),
        },
      ),
    );
  }
}
