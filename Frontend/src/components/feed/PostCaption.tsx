interface PostCaptionProps {
  username: string;
  caption: string;
  hashtags: string[];
}

export function PostCaption({ username, caption, hashtags }: PostCaptionProps) {
  const renderText = (text: string) => {
    const parts = text.split(/(#\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <span key={i} className="text-blue-500 cursor-pointer hover:underline">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="px-4 pb-1">
      <p className="text-sm leading-relaxed text-gray-800">
        <span className="font-semibold mr-1">{username}</span>
        {renderText(caption)}
      </p>
      {hashtags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-blue-500 cursor-pointer hover:underline"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
