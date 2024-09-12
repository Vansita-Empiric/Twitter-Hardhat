import { IoHeart } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { FaRegComment, FaRetweet } from "react-icons/fa6";
import { RiDislikeLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Tweet = ({
  profile_pic,
  name,
  username,
  content,
  image,
  comments,
  dislikes,
  likes,
  uploads,
  postId,
  contract,
}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [addComment, setAddComment] = useState();
  const [post, setPost] = useState();
  const [showCommentList, setShowCommentList] = useState(false);

  const likePostFn = async () => {
    try {
      await contract.likePost(postId);
      toast.success("Post liked");
    } catch (error) {
      toast.error(error.reason);
    }
  };

  const dislikePostFn = async () => {
    try {
      await contract.dislikePost(postId);
      toast.success("Post disliked");
    } catch (error) {
      toast.error(error.reason);
    }
  };

  const commentPostFn = async (e) => {
    e.preventDefault();
    try {
      const comment = await contract.commentPost(postId, addComment);
      toast.success("comment added");
      setShowCommentModal(false);
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

  const showCommentFn = async () => {
    console.log("comment data: ", postId);
  };
  // console.log("comment-------------------", postId, addComment);
  // console.log("posts----------",post[0].comment[0].comment);

  return (
    <>
      <div className="border-b border-t w-full">
        <div className="bg-white p-4 rounded-lg  shadow-sm">
          <div className="flex space-x-4">
            <img
              src={profile_pic}
              alt="image"
              className="rounded-full w-10 h-10"
            />
            <div className="flex justify-center">
              <div className=" text-left flex flex-row gap-2">
                <span className="font-semibold text-[#0F1419]">
                  {name.slice(0, 6)}.....{name.slice(-4)}
                </span>
                <span className="text-gray-500">{username}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500">23s</span>
              </div>
            </div>
          </div>
          <div className="ml-16">
            <p className="h-20 py-6 border text-center">{content}</p>
            {/* {image && (
            <img
            src={image}
            alt="Tweet content"
            className="rounded-lg w-full h-80"
            />
            )} */}

            <div className="flex justify-between mt-1 text-gray-500">
              <span className="flex flex-row gap-1 ">
                <FaRegComment
                  className="text-lg h-6"
                  onClick={() => {
                    setShowCommentModal(true);
                  }}
                />

                {comments.length}
              </span>
              <span className="flex flex-row gap-1 text-[#F4245E] ">
                <IoHeart className="text-lg h-6" onClick={likePostFn} />
                {likes}
              </span>
              <span className="flex flex-row gap-1 ">
                <RiDislikeLine
                  className="text-lg h-7"
                  onClick={dislikePostFn}
                />
                {dislikes}
              </span>
              <span className="flex flex-row gap-1 ">
                <FiUpload className="text-lg h-6" />
                {uploads}
              </span>
              <span></span>
            </div>
            <div className="flex flex-row justify-between">
              <button
                className="text-dodger-blue"
                onClick={() => {
                  setShowCommentList(true);
                }}
              >
                Show comments 
              </button>
            <button
              onClick={() => {
                setShowCommentList(false);
              }}
              className="text-gray-400"
              >
              Hide
            </button>
              </div>

            {showCommentList &&
              comments.map((c) => {
                console.log("c------------", c);

                return (
                  <div className="text-left mt-1">
                    <div className="flex flex-row gap-2" key={c?.commentId}>
                      <p className="font-semibold">
                      {c?.userAddress.slice(0, 6)}.....{c?.userAddress.slice(-4)} :  
                      </p>
                      <p>{c?.comment}</p>
                    </div>
                  </div>
                );
              })
              
              }
          </div>
        </div>
      </div>

      {/* modal start for the post comment */}
      {showCommentModal ? (
        <>
          <div className="flex justify-center items-center fixed inset-0 z-50 ">
            <div className="">
              <div className=" rounded-2xl shadow-xl bg-blue-200 ">
                <div className="flex justify-between p-5 ">
                  <h3 className="text-3xl font=semibold">Add Comment</h3>
                  <button
                    className="bg-transparent border-1 text-black float-right"
                    onClick={() => {
                      setShowCommentModal(false);
                    }}
                  >
                    <span className="text-red-600 flex justify-center opacity-7  w-6 text-xl  bg-gray-200  m-auto rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <form>
                  <div className="relative p-6 flex-auto">
                    <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-left text-sm font-bold mb-1">
                        Comment :
                      </label>
                      <input
                        onChange={(e) => setAddComment(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      onClick={() => {
                        setShowCommentModal(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-dodger-blue font-bold uppercase text-sm px-6 py-3 rounded shadow mr-1 mb-1"
                      // type="submit"
                      onClick={commentPostFn}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* modal over for the post comment */}
    </>
  );
};

export default Tweet;
