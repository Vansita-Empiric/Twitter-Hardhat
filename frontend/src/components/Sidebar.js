import { FaTwitter } from "react-icons/fa";
import { RiHome7Fill, RiFileList2Line } from "react-icons/ri";
import { GoHash, GoBell, GoMail, GoBookmark } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi";
import { PiDotsThreeCircle, PiDotsThreeOutlineFill } from "react-icons/pi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = ({ state }) => {
  const { contract } = state;
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const getLoggedInUserFn = async () => {
    try {
      const userInfo = await contract.getLoggedInUser();
      setUser(userInfo);
      // console.log("Sidebar Data: ------->", user);
    } catch (error) {
      toast.error(error.reason);
    }
  };

  useEffect(() => {
    // console.log("================= Loading SIdebarr here =================");
    getLoggedInUserFn();
  }, []);

  const signOutFn = async () => {
    try {
      await contract.logOutUser();
      toast.success("signed out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.reason);
    }
  };

  return (
    <div className="isolate w-1/5 h-screen sticky top-0 bg-white p-8 px-14 flex flex-col border-r justify-between">
      <div className="space-y-6">
        <FaTwitter className="text-dodger-blue text-4xl mb-6" />
        {/* Home */}
        <div className="flex flex-row gap-6">
          <RiHome7Fill className="text-dodger-blue text-3xl" />
          <Link
            to="/home"
            className="text-dodger-blue content-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-dodger-blue"
          >
            Home
          </Link>
        </div>

        {/* Explore */}
        <div className="flex flex-row gap-6">
          <GoHash className="text-[#0F1419] text-3xl" />
          <a
            href="home"
            className="text-[#0F1419] content-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-dodger-blue"
          >
            Explore
          </a>
        </div>

        {/* Notifications */}
        <div className="flex flex-row gap-6">
          <GoBell className="text-[#0F1419] text-3xl" />
          <a
            href=""
            className="text-[#0F1419] content-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-dodger-blue"
          >
            Notifications
          </a>
        </div>

        {/* Messages */}
        <div className="flex flex-row gap-6">
          <GoMail className="text-[#0F1419] text-3xl" />
          <a
            href=""
            className="text-[#0F1419] content-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-dodger-blue"
          >
            Messages
          </a>
        </div>

        {/* Bookmarks */}
        <div className="flex flex-row gap-6">
          <GoBookmark className="text-[#0F1419] text-3xl" />
          <a
            href=""
            className="text-[#0F1419] content-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-dodger-blue"
          >
            Bookmarks
          </a>
        </div>

        {/* Lists */}
        <div className="flex flex-row gap-6">
          <RiFileList2Line className="text-[#0F1419] text-3xl" />
          <a
            href=""
            className="text-[#0F1419] content-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-dodger-blue"
          >
            Lists
          </a>
        </div>

        {/* Profile */}
        <div className="flex flex-row gap-6">
          <HiOutlineUser className="text-[#0F1419] text-3xl" />
          <Link
            to="/profile"
            className="text-[#0F1419] content-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-dodger-blue"
          >
            Profile
          </Link>
        </div>

        {/* More */}
        <div className="flex flex-row gap-6">
          <PiDotsThreeCircle className="text-[#0F1419] text-3xl" />
          <a
            href=""
            className="text-[#0F1419] content-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-dodger-blue"
          >
            More
          </a>
        </div>

        {/* Button */}
        <div className=" space-x-4 w-full grid grid-flow-col justify-stretch">
          <button
            type="submit"
            className="bg-dodger-blue font-semibold text-white px-4 py-4 rounded-full hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-dodger-blue"
          >
            Tweet
          </button>
        </div>
      </div>

      {/* Bottom profile */}
      <div className="flex items-center mb-0 space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-300">
          <img
            src="Profile Picture(1).jpg"
            alt="Profile"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col text-left">
          <p className="block text-[#0F1419] font-medium ">
            {user?.userAddress.slice(0, 6)}.....{user?.userAddress.slice(-4)}
          </p>
          <p className="block text-[#5B7083] ">@{user?.username}</p>
        </div>

        {/* toggle button */}

        <Menu as="div" className=" ml-3">
          <div>
            <MenuButton className=" flex rounded-full text-md ">
              <PiDotsThreeOutlineFill />
            </MenuButton>
          </div>
          <MenuItems className="absolute  bottom-20  mt-2 w-34 rounded-md bg-white py-1 shadow-lg ring-dodger-blue ring-2">
            <MenuItem>
              <button
                onClick={signOutFn}
                className="block px-4 py-2 text-sm text-dodger-blue"
              >
                Sign out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>

        {/* toggle button end  */}
      </div>
    </div>
  );
};

export default Sidebar;
