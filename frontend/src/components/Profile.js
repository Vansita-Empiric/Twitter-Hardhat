import { GoArrowLeft } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import { BsCalendar3 } from "react-icons/bs";
import Tweet from "./Tweet";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = ({ state }) => {
  const { contract } = state;
  const [user, setUser] = useState();
  const [post, setPost] = useState();

  const getLoggedInUserFn = async (e) => {
    // e.preventDefault();

    try {
      const userInfo = await contract.getLoggedInUser();
      setUser(userInfo);
    } catch (error) {
      toast.error(error.reason);
    }
  };

  const getPostsByUserFn = async (e) => {
    // e.preventDefault();
    try {
      const postByUser = await contract.getPostsByUserFromMapping();
      setPost(postByUser);
    } catch (error) {
      toast.error(error.reason);
    }
  };

  useEffect(() => {
    getLoggedInUserFn();
    getPostsByUserFn();
  }, []);

  // console.log("userinfo----------", user);

  return (
    <div className="App">
      <div className="min-h-screen flex">
        {/* left Sidebar */}

        <Sidebar state={state} />

        {/* main profile */}

        <div className="w-2/5  flex flex-col bg-white border-r">
          <div className="p-4 -mb-1 border-b bg-white flex flex-row gap-9">
            <GoArrowLeft className="text-3xl text-dodger-blue" />
            <div className="flex flex-col -mt-2">
              <h2 className="text-xl font-bold text-left">Name</h2>
              <p className="text-sm text-[#5B7083]">9 Tweets</p>
            </div>
          </div>
          <div className="relative ">
            {/* Background image */}
            <img src="Placeholder.jpg" alt="place holder" className="w-full" />

            {/* profile image */}
            <img
              src="Profile Picture(1).jpg"
              alt="Profile"
              className="w-34 h-34 rounded-full absolute bottom-0 left-4 -mb-17 border-4 border-black"
            />

            {/* button */}
            <div className=" space-x-4 w-full grid grid-flow-col mt-4 pr-5 justify-end">
              <button
                type="submit"
                className="bg-white font-semibold text-dodger-blue ring-2 ring-dodger-blue px-5 py-2.5 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-dodger-blue"
              >
                Edit profile
              </button>
            </div>
          </div>
          {/* Details */}

          <div className="text-left ml-5">
            <p className="text-xl font-semibold">
              {user?.userAddress.slice(0, 6)}.....{user?.userAddress.slice(-4)}
            </p>
            <p className="text-md text-[#5B7083] -mt-1">@{user?.username}</p>
            <p className="text-md text-[##0F1419]">{user?.email}</p>
            <div className="flex flex-row text-[#5B7083] gap-2">
              <SlLocationPin className="text-md mt-1.5" />
              <p className="text-md">Surat</p>
              <BsCalendar3 className="text-md mt-1.5" />
              <p className="text-md">Joined September 2021</p>
            </div>
            <div className="flex flex-row gap-2  text-md">
              <p className="font-semibold text-black">569</p>
              <p className="text-[#5B7083]">Following</p>
              <p className="font-semibold text-black">72</p>
              <p className="text-[#5B7083]">Followers</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-around border-b text-[#5B7083] font-semibold  bg-white mt-2">
            <button className="py-4 hover:bg-gray-200 w-full text-dodger-blue border-dodger-blue border-b-2">
              Tweets
            </button>
            <button className="py-4 hover:bg-gray-200 w-full">
              Tweets & Replies
            </button>
            <button className="py-4 hover:bg-gray-200 w-full">Media</button>
            <button className="py-4 hover:bg-gray-200 w-full">Likes</button>
          </div>

          {/* Tweets */}
          {post?.map((p) => {
            return (
              <Tweet
                profile_pic="Profile Picture.jpg"
                name={p.userAddress}
                username="@johndue"
                content={p.content}
                image="Media.jpg"
                comments={p.comment.length}
                dislikes={p.dislike.length}
                likes={p.like.length}
                uploads={71}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
