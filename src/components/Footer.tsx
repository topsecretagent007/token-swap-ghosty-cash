import { FC } from "react";
import Link from "next/link";
import { SocialLinks } from "@/config/ConfigData";

const Footer: FC = () => {
  return (
    <footer className="w-full h-20 flex flex-row items-center border-t-[1px] border-t-[#26c3ff]">
      <div className="container">
        <div className="flex flex-row items-center justify-center gap-3">
          {SocialLinks.map((item: any, index: number) => {
            return (
              <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                <div className='rounded-full flex flex-col p-[10px] bg-[#26c3ff]/10 text-[#26c3ff] border-[1px] border-[#26c3ff] cursor-pointer'>
                  {item.icon}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
