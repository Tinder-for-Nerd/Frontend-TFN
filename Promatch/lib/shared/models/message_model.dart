import 'package:freezed_annotation/freezed_annotation.dart';

part 'message_model.freezed.dart';
part 'message_model.g.dart';

@freezed
class MessageModel with _$MessageModel {
  const factory MessageModel({
    required String id,
    required String conversationId,
    required String senderId,
    required String content,
    required DateTime createdAt,
    @Default(false) bool read,
    @Default('text') String messageType,
    String? attachmentUrl,
  }) = _MessageModel;

  factory MessageModel.fromJson(Map<String, dynamic> json) =>
      _$MessageModelFromJson(json);
}

extension MessageModelX on MessageModel {
  bool get isMine => senderId == 'me';
}
