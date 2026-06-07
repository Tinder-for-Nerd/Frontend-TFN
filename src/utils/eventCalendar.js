const MONTH_MAP = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function pad(value) {
  return String(value).padStart(2, '0');
}

export function parseEventSchedule(event) {
  if (!event?.date || !event?.time) return null;

  const dateMatch = event.date.trim().match(/^([A-Za-z]{3})\s+(\d{1,2})$/);
  const timeMatch = event.time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!dateMatch || !timeMatch) return null;

  const month = MONTH_MAP[dateMatch[1].toLowerCase()];
  if (month === undefined) return null;

  const day = Number.parseInt(dateMatch[2], 10);
  let hours = Number.parseInt(timeMatch[1], 10);
  const minutes = Number.parseInt(timeMatch[2], 10);
  const meridiem = timeMatch[3].toUpperCase();

  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  const now = new Date();
  let year = now.getFullYear();
  let start = new Date(year, month, day, hours, minutes, 0, 0);

  if (start < now) {
    start = new Date(year + 1, month, day, hours, minutes, 0, 0);
  }

  const durationMinutes = event.durationMinutes ?? 90;
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return { start, end };
}

function toGoogleUtc(date) {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

function encode(value) {
  return encodeURIComponent(value ?? '');
}

export function buildGoogleCalendarUrl(event, schedule = parseEventSchedule(event)) {
  if (!schedule) return null;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toGoogleUtc(schedule.start)}/${toGoogleUtc(schedule.end)}`,
    details: event.summary ?? '',
    location: event.location ?? (event.format === 'Virtual' ? 'Online' : 'TBD'),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildOutlookCalendarUrl(event, schedule = parseEventSchedule(event)) {
  if (!schedule) return null;

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: schedule.start.toISOString(),
    enddt: schedule.end.toISOString(),
    body: event.summary ?? '',
    location: event.location ?? (event.format === 'Virtual' ? 'Online' : 'TBD'),
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function buildIcsContent(event, schedule = parseEventSchedule(event)) {
  if (!schedule) return null;

  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const formatLocal = (date) => `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tinder for Nerds//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@tinderfornerds.app`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatLocal(schedule.start)}`,
    `DTEND:${formatLocal(schedule.end)}`,
    `SUMMARY:${(event.title ?? '').replace(/\n/g, '\\n')}`,
    `DESCRIPTION:${(event.summary ?? '').replace(/\n/g, '\\n')}`,
    `LOCATION:${(event.location ?? (event.format === 'Virtual' ? 'Online' : 'TBD')).replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return `${lines.join('\r\n')}\r\n`;
}

export function downloadIcsFile(event) {
  const content = buildIcsContent(event);
  if (!content) return false;

  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.id || 'event'}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return true;
}

export function getEventCalendarLinks(event) {
  const schedule = parseEventSchedule(event);

  return {
    schedule,
    google: event.googleCalendarUrl || buildGoogleCalendarUrl(event, schedule),
    outlook: event.outlookCalendarUrl || buildOutlookCalendarUrl(event, schedule),
    linkedin: event.linkedinEventUrl || null,
    hasLinks: Boolean(schedule || event.googleCalendarUrl || event.linkedinEventUrl),
  };
}
