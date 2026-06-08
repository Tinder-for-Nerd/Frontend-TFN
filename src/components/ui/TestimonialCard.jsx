import { useRef } from 'react';
import { motion } from 'framer-motion';

export function TestimonialCard({ handleShuffle, testimonial, position, id, author, role }) {
  const dragRef = useRef(0);
  const isFront = position === "front";

  const positionStyles = {
    front:  { rotate: "-6deg", x: "0%" },
    middle: { rotate: "0deg",  x: "33%" },
    back:   { rotate: "6deg",  x: "66%" },
  };

  const zMap = { front: 2, middle: 1, back: 0 };

  return (
    <motion.div
      style={{ zIndex: zMap[position] ?? 0 }}
      animate={positionStyles[position] ?? positionStyles.back}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => {
        dragRef.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      }}
      onDragEnd={(e) => {
        const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
        if (dragRef.current - endX > 100) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className={`pm-testi-card ${isFront ? 'pm-testi-card--front' : ''}`}
    >
      <img
        src={`https://i.pravatar.cc/128?img=${id}`}
        alt={`Avatar of ${author}`}
        className="pm-testi-card__avatar"
        draggable={false}
      />
      <span className="pm-testi-card__quote">&ldquo;{testimonial}&rdquo;</span>
      <div className="pm-testi-card__author">
        <span className="pm-testi-card__name">{author}</span>
        {role && <span className="pm-testi-card__role">{role}</span>}
      </div>
    </motion.div>
  );
}
