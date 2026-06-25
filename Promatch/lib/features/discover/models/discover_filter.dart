import 'package:freezed_annotation/freezed_annotation.dart';

part 'discover_filter.freezed.dart';
part 'discover_filter.g.dart';

@freezed
class DiscoverFilter with _$DiscoverFilter {
  const factory DiscoverFilter({
    String? domain,
    List<String>? skills,
    String? intent,
    String? location,
    String? commitment,
  }) = _DiscoverFilter;

  factory DiscoverFilter.fromJson(Map<String, dynamic> json) =>
      _$DiscoverFilterFromJson(json);
}

extension DiscoverFilterX on DiscoverFilter {
  Map<String, dynamic> toQueryParams() {
    final params = <String, dynamic>{};
    if (domain != null) params['domain'] = domain;
    if (skills != null && skills!.isNotEmpty) params['skills'] = skills!.join(',');
    if (intent != null) params['intent'] = intent;
    if (location != null) params['location'] = location;
    if (commitment != null) params['commitment'] = commitment;
    return params;
  }
}
