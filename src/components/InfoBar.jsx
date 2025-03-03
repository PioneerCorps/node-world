import { IoCubeOutline, IoHammerOutline } from "react-icons/io5";
import { VscLinkExternal } from "react-icons/vsc";

export const InfoBar = () => {
  return (
    <div className="absolute z-[1000] top-[25px] right-[25px]  bg-opacity-65 bg-bgGray1 border border-purpleOp50 backdrop-blur-sm  px-5 py-3 rounded-full text-sm flex items-center gap-2">
      <span className="flex items-center gap-2">
        <p className="border rounded-full px-3 py-1 text-xs border-purpleOp50 bg-orangeOp text-white flex items-center gap-1">
          <IoCubeOutline /> Latest Block :
        </p>
        <p className="cursor-pointer text-xs text-white2 bg-pinkOp px-3 py-1 rounded-full flex items-center gap-2">
          0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97
          <VscLinkExternal />
        </p>
      </span>
      <span className="border rounded-full px-3 py-1 text-xs border-purpleOp50 bg-purpleOp15 text-white cursor-pointer flex items-center gap-2">
        Node Provider 2
        <IoHammerOutline />
      </span>
    </div>
  );
};
