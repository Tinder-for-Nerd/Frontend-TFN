export const SOCKET_EVENTS = Object.freeze({
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  USER_TYPING: 'user_typing',
  TYPING_STOPPED: 'typing_stopped',
  MESSAGE_READ: 'message_read',
  MESSAGE_READ_ACK: 'message_read_ack',
  NOTIFICATION: 'notification',
  PRESENCE_UPDATE: 'presence_update',
});
