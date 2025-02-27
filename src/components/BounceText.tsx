import React from 'react';

interface BounceTextProps {
  text: string;
}

const BounceText: React.FC<BounceTextProps> = ({ text }) => {
  return (
    <div className="reflected-text-wrapper text-2xl text-center w-full pt-6 pb-2">
      {/* Render the main text with bounce effect */}
      <div>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`bounce text-[#26c3ff] bounce-delay-${index}`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BounceText;
