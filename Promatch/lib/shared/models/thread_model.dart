import 'package:freezed_annotation/freezed_annotation.dart';
import 'message_model.dart';
import 'profile_model.dart';

part 'thread_model.freezed.dart';
part 'thread_model.g.dart';

@freezed
class ThreadModel with _$ThreadModel {
  const factory ThreadModel({
    required String id,
    required ProfileModel person,
    required String status,
    @Default(0) int unread,
    required String lastMessage,
    required String lastTime,
    @Default([]) List<MessageModel> messages,
  }) = _ThreadModel;

  factory ThreadModel.fromJson(Map<String, dynamic> json) =>
      _$ThreadModelFromJson(json);
}
