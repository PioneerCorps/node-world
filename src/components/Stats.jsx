import { BiNetworkChart } from "react-icons/bi";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { TbClockRecord } from "react-icons/tb";

export const Stats = () => {
  return (
    <div className="absolute z-[1000] bottom-[25px] right-[25px]  bg-opacity-65 bg-bgGray1 border border-purpleOp50 backdrop-blur-sm  px-5 py-3 rounded-full text-sm flex items-center gap-2">
      <div className="border rounded-full px-3 py-1 text-xs border-purpleOp50 bg-greenOp text-white flex items-center gap-1">
        <BiNetworkChart />
        Validators 59
      </div>
      <div className="border rounded-full px-3 py-1 text-xs border-purpleOp50 bg-bgLight1OP text-white flex items-center gap-1">
        <FaGlobeAmericas />
        Countries 59
      </div>
      <div className="border rounded-full px-3 py-1 text-xs border-purpleOp50 bg-orangeOp text-white flex items-center gap-1">
        <FaCity />
        Cities 59
      </div>
      <div className="border rounded-full px-3 py-1 text-xs border-purpleOp50 bg-pinkOp text-white flex items-center gap-1">
        <TbClockRecord />
        Avg. Block Time 5s
      </div>
    </div>
  );
};
