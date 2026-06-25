import 'package:freezed_annotation/freezed_annotation.dart';

part 'message_model.freezed.dart';
part 'message_model.g.dart';

@freezed
class ChatMessageModel with _$ChatMessageModel {
  const factory ChatMessageModel({
    required String id,
    required String conversationId,
    required String senderId,
    required String content,
    required DateTime createdAt,
    @Default(false) bool read,
    @Default('text') String messageType,
    String? attachmentUrl,
  }) = _ChatMessageModel;

  factory ChatMessageModel.fromJson(Map<String, dynamic> json) =>
      _$ChatMessageModelFromJson(json);
}

extension ChatMessageModelX on ChatMessageModel {
  bool get isMine => senderId == 'me';
}
