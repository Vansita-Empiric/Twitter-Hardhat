import { RiCalendarScheduleLine } from "react-icons/ri";
import { BsStars, BsEmojiSmile } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import { HiOutlineGif } from "react-icons/hi2";
import { BiPoll } from "react-icons/bi";
import Tweet from "./Tweet";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = ({ state }) => {
  const { contract } = state;
  const [content, setContent] = useState();
  const [post, setPost] = useState();

  const createPostFn = async (e) => {
    e.preventDefault();
    try {
      const create = await contract.createPost(content);
      getAllPostsFn();
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(error.reason);
    }
  };

  const getAllPostsFn = async () => {
    try {
      const getAll = await contract.getAllPosts();
      setPost(getAll);
    } catch (error) {
      toast.error(error.reason);
    }
  };

  useEffect(() => {
    getAllPostsFn();
  }, []);

  // console.log("posts----------",post);
  
  return (
    <div className="App">
      <div className="min-h-screen flex ">
        {/* left Sidebar */}

        <Sidebar state={state} />

        {/* Main Feed */}
        <div className="w-2/5 bg-[#f7f9fa] flex flex-col border-r">
          <div className="p-4 -mb-1 border-b bg-white flex flex-row justify-between">
            <h2 className="text-xl font-bold text-left">Home</h2>
            <BsStars className="text-3xl text-dodger-blue" />
          </div>

          {/* textbox */}
          <form onSubmit={createPostFn}>
            <div className="text-left border-b mb-3">
              <div className="relative rounded-md ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-lg mb-8">
                    <div className="w-10 h-10 rounded-full bg-gray-300">
                      <img
                        src="Profile Picture(1).jpg"
                        alt="Profile"
                        className="rounded-full"
                      />
                    </div>
                  </span>
                </div>
                <input
                  className="text-[#5B7083] w-full mt-1 py-4 pl-16 pr-5  rounded-lg focus:outline-none "
                  type="text"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  placeholder="What's happening ? "
                />
                <span className="flex justify-between bg-white">
                  <div className="flex ml-16 text-xl text-dodger-blue rounded-full flex-row gap-3 mt-1">
                    <AiOutlinePicture />
                    <HiOutlineGif />
                    <BiPoll />
                    <BsEmojiSmile />
                    <RiCalendarScheduleLine />
                  </div>
                  <div className="pr-4 mt-1 mb-1">
                    <button
                      type="submit"
                      className="bg-dodger-blue font-semibold text-white py-1.5 px-3 rounded-full hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-dodger-blue"
                    >
                      Tweet
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </form>

          {/* Tweets */}
          {post?.map((p) => {
            return (
              <Tweet
              key={Math.random()}
                profile_pic="Profile Picture.jpg"
                name={p.userAddress}
                username=""
                content={p.content}
                image="Media.jpg"
                comments={p.comment}
                dislikes={p.dislike.length}
                likes={p.like.length}
                uploads={71}
                postId = {p.postId}
                contract = {contract}
              />
            );
          })}

          {/* <Tweet
            profile_pic="Medium.png"
            name="Darlene Robertson"
            username="@johndue"
            content="Tom is in a big hurry."
            image="Media(1).jpg"
            comments={88}
            retweets={25}
            likes={9634}
            uploads={112}
          /> */}
        </div>
      </div>
    </div>
  );
};

// const Tweet = ({
//   profile_pic,
//   name,
//   username,
//   content,
//   image,
//   comments,
//   retweets,
//   likes,
//   uploads,
// }) => (
//   <div className="border-b border-t w-full">
//     <div className="bg-white p-4 rounded-lg  shadow-sm">
//       <div className="flex space-x-4">
//         <img
//           src={profile_pic}
//           alt="image"
//           className="rounded-full w-12 h-12"
//         />
//         <div className="">
//           <div className=" text-left flex flex-row gap-2">
//             <span className="font-semibold text-[#0F1419]">{name}</span>
//             <span className="text-gray-500">{username}</span>
//             <span className="text-gray-500">·</span>
//             <span className="text-gray-500">23s</span>
//           </div>
//           <p className="text-left">{content}</p>
//         </div>
//       </div>
//       <div className="ml-16">
//         {image && (
//           <img
//             src={image}
//             alt="Tweet content"
//             className="rounded-lg w-full h-80"
//           />
//         )}

//         <div className="flex justify-between mt-1 text-gray-500">
//           <span className="flex flex-row gap-1 ">
//             <FaRegComment className="text-lg h-6" />
//             {comments}
//           </span>
//           <span className="flex flex-row gap-1 ">
//             <FaRetweet className="text-lg h-7" />
//             {retweets}
//           </span>
//           <span className="flex flex-row gap-1 text-[#F4245E] ">
//             <IoHeart className="text-lg h-6" />
//             {likes}
//           </span>
//           <span className="flex flex-row gap-1 ">
//             <FiUpload className="text-lg h-6" />
//             {uploads}
//           </span>
//           <span></span>
//         </div>
//         <div className="text-left text-dodger-blue mt-1">
//           <a href="" className="focus:outline-none focus:ring-2 focus:ring-dodger-blue">Show this thread</a>
//         </div>
//       </div>
//     </div>
//   </div>
// );

export default Home;
