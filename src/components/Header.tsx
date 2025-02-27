import { FC } from "react";
import Link from "next/link";
import ConnectButton from "@/components/ConnectButton";

const Header: FC = () => {

  return (
    <header className="w-full h-20 flex flex-row items-center border-b-[1px] border-[#26c3ff] shadow-xl shadow-[#193975]">
      <div className="container">
        <div className="flex items-center justify-between px-3">
          <Link href={"/"} className="">
            <div className=' font-semibold text-md xl:text-xl uppercase text-white'>
              SCAVENGER V1
            </div>
          </Link>
          <div className="flex items-center gap-2 ord-connect-font">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
