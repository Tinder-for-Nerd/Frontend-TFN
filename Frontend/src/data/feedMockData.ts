import type { FeedUser, FeedPost, FeedStory, FeedComment, SuggestedUser, TrendingHashtag } from '../types';

export function generateAvatar(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff&size=200`;
}

const users: FeedUser[] = [
  { id: 'fu1', name: 'Alex Johnson', username: 'alexjohnson', avatar: generateAvatar('Alex Johnson'), isVerified: true, isPrivate: false, bio: 'Building the future of professional networking. Founder @ ProMatch', followersCount: 12453, followingCount: 843, postsCount: 142, isFollowing: true },
  { id: 'fu2', name: 'Sarah Chen', username: 'sarahcodes', avatar: generateAvatar('Sarah Chen'), isVerified: true, isPrivate: false, bio: 'Senior Product Designer @ DesignLabs. Figma addict. Design systems enthusiast.', followersCount: 8932, followingCount: 567, postsCount: 89, isFollowing: false },
  { id: 'fu3', name: 'Mike Torres', username: 'miketo', avatar: generateAvatar('Mike Torres'), isVerified: false, isPrivate: false, bio: 'CS @ MIT | Building AI tools | Open source contributor', followersCount: 2341, followingCount: 1089, postsCount: 45, isFollowing: true },
  { id: 'fu4', name: 'Emma Wilson', username: 'emmawilson', avatar: generateAvatar('Emma Wilson'), isVerified: true, isPrivate: false, bio: 'Engineering Manager @ TechCorp | Ex-Amazon, Ex-Microsoft | Speaker', followersCount: 18763, followingCount: 912, postsCount: 234, isFollowing: false },
  { id: 'fu5', name: 'James Park', username: 'jamespark_', avatar: generateAvatar('James Park'), isVerified: false, isPrivate: true, bio: 'MS Data Science @ Berkeley | NLP Researcher | Chess enthusiast', followersCount: 1567, followingCount: 234, postsCount: 23, isFollowing: false, hasFollowRequested: true },
  { id: 'fu6', name: 'Sophia Williams', username: 'sophiaw', avatar: generateAvatar('Sophia Williams'), isVerified: true, isPrivate: false, bio: 'ML Engineer @ Google AI | LLMs & AI Safety | Opinions my own', followersCount: 34210, followingCount: 1245, postsCount: 312, isFollowing: false },
  { id: 'fu7', name: 'Daniel Kim', username: 'dankim', avatar: generateAvatar('Daniel Kim'), isVerified: false, isPrivate: false, bio: 'PhD @ Stanford | Computer Vision | Photography | Travel', followersCount: 5678, followingCount: 789, postsCount: 67, isFollowing: true },
  { id: 'fu8', name: 'Olivia Martinez', username: 'omartinez', avatar: generateAvatar('Olivia Martinez'), isVerified: false, isPrivate: false, bio: 'PM @ Stripe | Fintech | Building for the next billion', followersCount: 4567, followingCount: 567, postsCount: 78, isFollowing: false },
  { id: 'fu9', name: 'Noah Brown', username: 'noahbrown', avatar: generateAvatar('Noah Brown'), isVerified: true, isPrivate: false, bio: 'DevOps @ Netflix | Infrastructure at scale | K8s enthusiast', followersCount: 12340, followingCount: 890, postsCount: 156, isFollowing: true },
  { id: 'fu10', name: 'Ava Taylor', username: 'avataylor', avatar: generateAvatar('Ava Taylor'), isVerified: false, isPrivate: false, bio: 'HCI Researcher @ CMU | Accessibility advocate | UI/UX designer', followersCount: 3456, followingCount: 456, postsCount: 34, isFollowing: false },
  { id: 'fu11', name: 'Liam Anderson', username: 'liam_anderson', avatar: generateAvatar('Liam Anderson'), isVerified: true, isPrivate: false, bio: 'CTO @ DataFlow Systems | Data infra for 500+ enterprises', followersCount: 23456, followingCount: 1023, postsCount: 189, isFollowing: false },
  { id: 'fu12', name: 'Isabella Garcia', username: 'isabellag', avatar: generateAvatar('Isabella Garcia'), isVerified: false, isPrivate: false, bio: 'Marketing @ HubSpot | Growth & brand strategy | B2B SaaS', followersCount: 6789, followingCount: 678, postsCount: 92, isFollowing: true },
];

const postImageIcons = ['💻', '🚀', '🎨', '🌊', '🔥', '💡', '📱', '⚡'];

function generatePostImages(): string[] {
  const count = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 2 : 1;
  const icon = postImageIcons[Math.floor(Math.random() * postImageIcons.length)];
  return Array.from({ length: count }, () =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(icon)}&background=2563EB&color=fff&size=400&format=svg`
  );
}

const commentTemplates = [
  { text: 'This is amazing! 🔥', likes: 12 },
  { text: 'Great work, keep it up! 👏', likes: 8 },
  { text: 'Love the design aesthetic!', likes: 15 },
  { text: 'How did you build this?', likes: 5 },
  { text: 'Incredible! Would love to collaborate sometime.', likes: 23 },
  { text: 'So inspiring! 🚀', likes: 9 },
  { text: 'This is exactly what I needed to see today.', likes: 11 },
  { text: 'Can you share the tech stack?', likes: 4 },
  { text: 'Beautiful! What tools did you use?', likes: 7 },
  { text: 'The attention to detail is incredible.', likes: 19 },
];

function generateComments(): FeedComment[] {
  const count = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: count }, (_, i) => {
    const template = commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
    const commentUser = users[Math.floor(Math.random() * users.length)];
    const replies = Math.random() > 0.7 ? [{
      id: `cr-${Date.now()}-${i}`,
      user: users[Math.floor(Math.random() * users.length)],
      text: 'Totally agree! 🙌',
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      likesCount: Math.floor(Math.random() * 5),
      isLiked: false,
      replies: [],
    }] : [];
    return {
      id: `c-${Date.now()}-${i}`,
      user: commentUser,
      text: template.text,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      likesCount: template.likes + Math.floor(Math.random() * 5),
      isLiked: Math.random() > 0.7,
      replies,
    };
  });
}

const captionTemplates = [
  { text: 'Just shipped a new feature! Really proud of the team\'s hard work. #tech #startup #buildinpublic', hashtags: ['tech', 'startup', 'buildinpublic'] },
  { text: 'Morning coffee + code = best combo ☕️💻 #developer #codinglife #morningroutine', hashtags: ['developer', 'codinglife', 'morningroutine'] },
  { text: 'Presenting at @TechConf2024 was an incredible experience! 🎤 #speaking #techconference #innovation', hashtags: ['speaking', 'techconference', 'innovation'] },
  { text: 'New design system component library is live! 200+ components ready for production. #design #figma #designtools', hashtags: ['design', 'figma', 'designtools'] },
  { text: 'Weekend project turned into something bigger. Always keep building! 🚀 #weekendproject #sideproject #build', hashtags: ['weekendproject', 'sideproject', 'build'] },
  { text: 'Grateful for this amazing team. Day 1 of our offsite! #team #companyculture #startuplife', hashtags: ['team', 'companyculture', 'startuplife'] },
  { text: 'Late night coding session paying off. The grind never stops! 💪 #coding #nightowl #developer', hashtags: ['coding', 'nightowl', 'developer'] },
  { text: 'Just hit 10K followers! Thank you all for the support. 🎉 #milestone #grateful #community', hashtags: ['milestone', 'grateful', 'community'] },
  { text: 'New blog post: "Building Scalable Microservices with Go" - link in bio! #golang #microservices #backend', hashtags: ['golang', 'microservices', 'backend'] },
  { text: 'Mentorship session today was amazing! Love helping the next generation of engineers. #mentorship #techcommunity #givingback', hashtags: ['mentorship', 'techcommunity', 'givingback'] },
  { text: 'Our product got featured on @ProductHunt today! Check it out 🚀 #producthunt #launch #saas', hashtags: ['producthunt', 'launch', 'saas'] },
  { text: 'Hiring! Looking for senior React engineers to join our team. DM me if interested! #hiring #react #jobs', hashtags: ['hiring', 'react', 'jobs'] },
];

const now = Date.now();

export const feedUsers = users;

export const mockFeedPosts: FeedPost[] = Array.from({ length: 20 }, (_, i) => {
  const user = users[i % users.length];
  const caption = captionTemplates[i % captionTemplates.length];
    const comments = generateComments();
    return {
      id: `fp-${i + 1}`,
      user,
      images: generatePostImages(),
    caption: caption.text,
    hashtags: caption.hashtags,
    mentions: [],
    timestamp: new Date(now - (i + 1) * 3600000 - Math.random() * 3600000).toISOString(),
    likesCount: Math.floor(Math.random() * 500) + 50,
    commentsCount: comments.length,
    viewCount: Math.floor(Math.random() * 5000) + 500,
    isLiked: Math.random() > 0.6,
    isSaved: Math.random() > 0.8,
    isReposted: Math.random() > 0.9,
    comments,
  };
});

export const mockStories: FeedStory[] = users.slice(0, 10).map((user, i) => ({
  id: `story-${i + 1}`,
  user,
  image: user.avatar,
  timestamp: new Date(now - i * 1800000).toISOString(),
  viewed: Math.random() > 0.5,
}));

export const mockSuggestedUsers: SuggestedUser[] = [
  { user: users[6], reason: 'Followed by Sarah Chen' },
  { user: users[7], reason: 'Based on your interests' },
  { user: users[8], reason: 'Popular in your network' },
  { user: users[9], reason: 'Similar to Alex Johnson' },
  { user: users[10], reason: 'Followed by Emma Wilson' },
];

export const mockTrendingHashtags: TrendingHashtag[] = [
  { tag: 'tech', postsCount: 234000 },
  { tag: 'startup', postsCount: 189000 },
  { tag: 'developer', postsCount: 456000 },
  { tag: 'design', postsCount: 312000 },
  { tag: 'ai', postsCount: 567000 },
  { tag: 'coding', postsCount: 345000 },
  { tag: 'productivity', postsCount: 123000 },
  { tag: 'innovation', postsCount: 98000 },
];

export const generateMorePosts = (startIndex: number, count: number): FeedPost[] => {
  return Array.from({ length: count }, (_, i) => {
    const user = users[(startIndex + i) % users.length];
    const caption = captionTemplates[(startIndex + i) % captionTemplates.length];
    const comments = generateComments();
    return {
      id: `fp-load-${startIndex + i}`,
      user,
      images: generatePostImages(),
      caption: caption.text,
      hashtags: caption.hashtags,
      mentions: [],
      timestamp: new Date(now - (startIndex + i + 100) * 3600000).toISOString(),
      likesCount: Math.floor(Math.random() * 500) + 50,
      commentsCount: comments.length,
      viewCount: Math.floor(Math.random() * 5000) + 500,
      isLiked: false,
      isSaved: false,
      isReposted: false,
      comments,
    };
  });
};
