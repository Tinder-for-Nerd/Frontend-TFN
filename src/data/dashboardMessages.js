/** Role-specific copy for student vs professional dashboards */

export const DASHBOARD_MESSAGES = {
  student: {
    homeTitle: 'Home',
    homeSubtitle: 'Share progress, find co-builders, and join events.',
    composerPlaceholder: 'Share a project update, ask for feedback, or find a hackathon teammate…',
    messages: {
      heading: 'Messages',
      pageTitle: 'Messages | Tinder for Nerds',
      subtitle: 'Chat with classmates, mentors, and potential co-builders.',
      sidebarTitle: 'Chats',
      searchPlaceholder: 'Search classmates and mentors',
      emptyTitle: 'Your student inbox',
      emptyDescription:
        'Message peers about projects, get resume feedback, and coordinate hackathon teams.',
      emptyHint: 'Pick a conversation from the sidebar to get started.',
    },
  },
  pro: {
    homeTitle: 'Home',
    homeSubtitle: 'Host sessions, share updates, and grow your professional network.',
    composerPlaceholder: 'Share a mentor update, office hours slot, or hiring need…',
    messages: {
      heading: 'Inbox',
      pageTitle: 'Inbox | Tinder for Nerds',
      subtitle: 'Respond to founders, mentees, and hiring leads in one place.',
      sidebarTitle: 'Inbox',
      searchPlaceholder: 'Search founders, mentees, and leads',
      emptyTitle: 'Your professional inbox',
      emptyDescription:
        'Coordinate sessions, review workshop materials, and follow up on co-founder and hiring conversations.',
      emptyHint: 'Select a thread from the sidebar to continue.',
    },
  },
};

export function getDashboardMessages(variant = 'student') {
  return DASHBOARD_MESSAGES[variant] ?? DASHBOARD_MESSAGES.student;
}
