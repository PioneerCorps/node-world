import { PiGlobeLight } from "react-icons/pi";
import { FaDiscord, FaSquareXTwitter, FaGithub } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function NodeInfo({ node, setActiveNode }) {
  if (!node) {
    console.log("NodeInfo returning null because node is falsy");
    return null;
  }

  return (
    <div className="absolute top-5 left-5 z-[9999] bg-opacity-65 bg-bgGray1 border border-purpleOp50 backdrop-blur-sm p-5 rounded-lg shadow-lg max-w-[350px] animate-fadeIn ">
      <div className="w-full justify-between  flex border-b border-pastelPurple border-opacity-25 pb-2.5">
        <h2 className="text-white text-2xl font-semibold mt-0  ">
          {node.entity}
        </h2>
        <IoClose
          className="cursor-pointer hover:bg-orangeOp rounded-full duration-200"
          onClick={() => setActiveNode(null)}
        />
      </div>
      <p className="mt-3 text-sm py-4">{node.desc}</p>
      <div className="flex gap-4 mt-4 ">
        <a
          href={node.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block  text-white no-underline rounded transition-colors duration-300 "
        >
          <PiGlobeLight className="h-6 w-6 fill-pastelPurple hover:fill-pastelOrange duration-300 transition-all" />
        </a>
        <a
          href={node.x}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block  text-white no-underline rounded transition-colors duration-300"
        >
          <FaSquareXTwitter className="h-6 w-6 fill-pastelPurple hover:fill-pastelOrange duration-300 transition-all" />
        </a>
        <a
          href={node.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block  text-white no-underline rounded transition-colors duration-300 "
        >
          <FaGithub className="h-6 w-6 fill-pastelPurple hover:fill-pastelOrange duration-300 transition-all" />
        </a>
        <a
          href={node.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block  text-white no-underline rounded transition-colors duration-300"
        >
          <FaDiscord className="h-6 w-6 fill-pastelPurple hover:fill-pastelOrange duration-300 transition-all" />
        </a>
      </div>
    </div>
  );
}

export default NodeInfo;
