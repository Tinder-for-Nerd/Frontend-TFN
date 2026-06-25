class CallSessionModel {
  final String id;
  final String callerId;
  final String calleeId;
  final String status;

  const CallSessionModel({
    required this.id,
    required this.callerId,
    required this.calleeId,
    required this.status,
  });

  factory CallSessionModel.fromJson(Map<String, dynamic> json) {
    return CallSessionModel(
      id: json['id'] as String,
      callerId: json['callerId'] as String,
      calleeId: json['calleeId'] as String,
      status: json['status'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'callerId': callerId,
      'calleeId': calleeId,
      'status': status,
    };
  }
}
