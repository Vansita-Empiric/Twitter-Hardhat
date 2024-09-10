import { IoHeart } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { FaRegComment, FaRetweet } from "react-icons/fa6";

const Tweet = ({
    profile_pic,
    name,
    username,
    content,
    image,
    comments,
    retweets,
    likes,
    uploads,
  }) => (
    <div className="border-b border-t w-full">
      <div className="bg-white p-4 rounded-lg  shadow-sm">
        <div className="flex space-x-4">
          <img
            src={profile_pic}
            alt="image"
            className="rounded-full w-12 h-12"
          />
          <div className="">
            <div className=" text-left flex flex-row gap-2">
              <span className="font-semibold text-[#0F1419]">{name}</span>
              <span className="text-gray-500">{username}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">23s</span>
            </div>
            <p className="text-left">{content}</p>
          </div>
        </div>
        <div className="ml-16">
          {image && (
            <img
              src={image}
              alt="Tweet content"
              className="rounded-lg w-full h-80"
            />
          )}
  
          <div className="flex justify-between mt-1 text-gray-500">
            <span className="flex flex-row gap-1 ">
              <FaRegComment className="text-lg h-6" />
              {comments}
            </span>
            <span className="flex flex-row gap-1 ">
              <FaRetweet className="text-lg h-7" />
              {retweets}
            </span>
            <span className="flex flex-row gap-1 text-[#F4245E] ">
              <IoHeart className="text-lg h-6" />
              {likes}
            </span>
            <span className="flex flex-row gap-1 ">
              <FiUpload className="text-lg h-6" />
              {uploads}
            </span>
            <span></span>
          </div>
          <div className="text-left text-dodger-blue mt-1">
            <a href="" className="focus:outline-none focus:ring-2 focus:ring-dodger-blue">Show this thread</a>
          </div>
        </div>
      </div>
    </div>
  );

export default Tweet
