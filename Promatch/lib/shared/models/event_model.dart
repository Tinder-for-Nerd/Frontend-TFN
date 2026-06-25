import 'package:freezed_annotation/freezed_annotation.dart';

part 'event_model.freezed.dart';
part 'event_model.g.dart';

@freezed
class EventModel with _$EventModel {
  const factory EventModel({
    required String id,
    required String title,
    required String host,
    required String format,
    required String domain,
    required String date,
    required String time,
    required int durationMinutes,
    required String location,
    required int attendees,
    required List<String> tags,
    required String summary,
    required List<String> agenda,
    String? linkedinEventUrl,
  }) = _EventModel;

  factory EventModel.fromJson(Map<String, dynamic> json) =>
      _$EventModelFromJson(json);
}
