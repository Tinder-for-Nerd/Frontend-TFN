import { motion } from 'framer-motion';
import { TrendingUp, Search } from 'lucide-react';
import { mockTrendingHashtags, mockFeedPosts } from '../data/feedMockData';
import { useNavigate } from 'react-router-dom';

export default function ExplorePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md pb-4">
        <button
          onClick={() => navigate('/search')}
          className="flex w-full items-center gap-3 rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <Search size={18} />
          Search ProMatch
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-500" />
          Trending
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {mockTrendingHashtags.map((tag, i) => (
            <motion.div
              key={tag.tag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <p className="text-base font-bold text-gray-900">#{tag.tag}</p>
              <p className="text-sm text-gray-500">{tag.postsCount.toLocaleString()} posts</p>
            </motion.div>
          ))}
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-3">Explore Posts</h2>
      <div className="grid grid-cols-3 gap-1">
        {mockFeedPosts.slice(0, 12).map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className="aspect-square rounded-md bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer relative group"
          >
            <img
              src={post.images[0]}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
              <span className="text-white font-semibold text-sm">❤️ {post.likesCount}</span>
              <span className="text-white font-semibold text-sm">💬 {post.commentsCount}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
