import 'package:freezed_annotation/freezed_annotation.dart';

part 'login_payload.freezed.dart';
part 'login_payload.g.dart';

@freezed
class LoginPayload with _$LoginPayload {
  const factory LoginPayload({
    required String email,
    required String password,
    required String role,
  }) = _LoginPayload;

  factory LoginPayload.fromJson(Map<String, dynamic> json) =>
      _$LoginPayloadFromJson(json);
}

@freezed
class SignupPayload with _$SignupPayload {
  const factory SignupPayload({
    required String email,
    required String password,
    required String name,
    required String role,
  }) = _SignupPayload;

  factory SignupPayload.fromJson(Map<String, dynamic> json) =>
      _$SignupPayloadFromJson(json);
}
