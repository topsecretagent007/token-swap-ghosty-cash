import React from 'react';
import Image from 'next/image';
import TokeIcon from "@/../public/toke_Icon.png"

interface BounceImageProps {
  style: string;
  width: number;
  height: number;
}

const BounceImage: React.FC<BounceImageProps> = ({ width, height, style }) => {
  return (
    <div>
      <Image
        src={TokeIcon}
        alt="TokeIcon"
        width={width}
        height={height}
        className={`${style} image-bounce`} // Apply the bounce animation class
      />
    </div>
  );
};

export default BounceImage;
