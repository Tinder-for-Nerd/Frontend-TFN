import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../shared/models/message_model.dart';
import '../../../shared/models/profile_model.dart';

part 'conversation_model.freezed.dart';
part 'conversation_model.g.dart';

@freezed
class ConversationModel with _$ConversationModel {
  const factory ConversationModel({
    required String id,
    required ProfileModel person,
    required String status,
    @Default(0) int unread,
    required String lastMessage,
    required String lastTime,
    @Default([]) List<MessageModel> messages,
  }) = _ConversationModel;

  factory ConversationModel.fromJson(Map<String, dynamic> json) =>
      _$ConversationModelFromJson(json);
}
