import React, { useEffect, useState } from "react";
import {
  postCreatePost,
  postUpdatePost,
  sendMessage,
  updateUserAvatar,
} from "../../../services/User/apiMethods";
import Modal from "react-modal";
import uploadCloudinary from "../../../hooks/cloudinary";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CropImage from "../Options/CropImg";
import PostInput from "../Elements/PostInput";
import { Spinner } from "flowbite-react";
import { errorToast, successToast } from "../../../hooks/toast";
import { addNewPost, editUserPost } from "../../../utils/reducers/postReducer";
import CharacterCountIndicator from "../Options/CharacterCount";
import {
  updateReduxUser,
  updateChatImage,
} from "../../../utils/reducers/userReducer";
import { BASE_URL } from "../../../const/url";
import { io } from "socket.io-client";
const ImageFilter = React.lazy(() => import("../ImageFilter/ImageFilter"));

function CreatePostModal({
  isModalOpen,
  setIsModalOpen,
  type,
  editPostCaption,
  chatRoom,
  messages,
  setMessages,
  socket,
}) {
  Modal.setAppElement("#root");
  const dispatch = useDispatch();

  const [croppedImg, setCroppedImg] = useState(null);
  const [err, setErr] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImg, setSelectedImg] = useState(false); // State to manage the selected image
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [imageFilterActive, setImageFilterActive] = useState(false);
  const [filteredImage, setFilteredImage] = useState(null);

  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.userData);
  const chatImage = useSelector((state) => state?.user?.chatImage);
  const userPost = useSelector((state) => state?.userPosts?.editPost);
  let postData;

  useEffect(() => {
    if (type === "editPost" && !caption) {
      setCaption(userPost?.caption || "");
    }
  }, [type, caption, userPost?.caption]);

  const clearComponent = () => {
    setLoading(false);
    setErr("");
    setSelectedImg(false);
    setCaption("");
    setCroppedImg(null);
    setImage(null);
    setImagePreview(null);
  };

  const handlePostResponse = (response) => {
    setLoading(false);
    if (response.status === 200) {
      // To Add post in redux or local state
      if (type !== "editPost") {
        dispatch(addNewPost(response?.post));
      } else {
        editPostCaption(response?.post?._id, response?.post?.caption);
        // dispatch(editUserPost(response?.post));
      }
      successToast(response.message);
      clearComponent();
      closeModal();
    } else if (response.status === 401) {
      clearComponent();
      closeModal();
      navigate("/login");
    } else if (response.status === 400) {
      setErr(response.message);
      errorToast(response.message);
    } else {
      setErr(response.message);
    }
  };

  const handleCloudinary = async () => {
    return await uploadCloudinary(imagePreview, image, setErr, setLoading);
  };

  const handleSubmit = async () => {
    if (!imagePreview || !image) {
      setErr("Please select an image");
      return;
    }
    setLoading(true);
    setBtnDisabled(true);
    let imageUrl = "";
    if (type === "createPost" || type === "avatar" || type === "chatimage") {
      const imageData = await handleCloudinary();
      imageUrl = imageData.secure_url;
    }

    if (type === "createPost") {
      if (!image) {
        setLoading(false);
        setBtnDisabled(false);
        setErr("Please select an image");
        return;
      }

      const data = {
        userId: userData._id,
        image: imageUrl,
        caption: caption,
      };

      postCreatePost(data)
        .then(handlePostResponse)
        .catch((error) => {
          setLoading(false);
          setBtnDisabled(false);
          errorToast(error?.message);
          setErr(error?.message);
        });
    } else if (type === "avatar") {
      const data = {
        userId: userData._id,
        profilePic: imageUrl,
      };

      updateUserAvatar(data)
        .then((response) => {
          if (response.status === 200) {
            dispatch(updateReduxUser(response?.user));
            successToast(response?.message);
            clearComponent();
            closeModal();
          } else {
            setLoading(false);
            setBtnDisabled(false);
            infoToast(response?.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          setBtnDisabled(false);
          errorToast(error?.message);
          setErr(error?.message);
        });
    } else if (type === "editPost") {
      const data = {
        postId: userPost?._id,
        caption: caption,
      };

      postUpdatePost(data)
        .then(handlePostResponse)
        .catch((error) => {
          setLoading(false);
          setBtnDisabled(false);
          errorToast(error?.message);
          setErr(error?.message);
        });
    } else if (type === "chatimage") {
      sendMessage(chatRoom?._id, imageUrl, userData?._id)
        .then((response) => {
          setMessages([...messages, response]);

          // Use the socket instance passed as a prop
          socket.emit(
            "sendMessage",
            chatRoom?._id,
            response,
            userData?._id,
            (res) => {
              // Handle the response from the server
            }
          );

          clearComponent();
          closeModal();
        })
        .catch((error) => {
          // Handle the error
          console.error("Error sending message:", error);
          setLoading(false);
          setBtnDisabled(false);
          errorToast(error?.message);
          setErr(error?.message);
        });
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    clearComponent();
  };

  useEffect(() => {
    setImagePreview(croppedImg || "Image");
  }, [croppedImg]);
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-25  backdrop-blur-sm transition-opacity"
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          backgroundColor: "white",
          padding: "20px",
          color: "#333",
          maxWidth: "800px",
          border: "none",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
          borderRadius: "5px",
          overflow: "auto",
        },
      }}
    >
      {selectedImg && (
        <CropImage
          imgUrl={imagePreview}
          aspectInit={{ value: 1 / 1 }}
          setCroppedImg={setCroppedImg}
          setimgSelected={setSelectedImg}
          setImageFilterActive={setImageFilterActive}
          setErr={setErr}
        />
      )}

      {imageFilterActive && (
        <ImageFilter
          croppedImg={imagePreview}
          setFilteredImage={setImagePreview}
          setImageFilterActive={setImageFilterActive}
        />
      )}
      <div className="p-5 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 ml-[40%] text-center items-center">
          {type === "editPost"
            ? "Edit Post"
            : type === "createPost"
            ? "Create Post"
            : type === "chatimage"
            ? "Upload Image"
            : "Edit Avatar"}
        </h2>
        <div className="mb-4">
          {type !== "editPost" && (
            <PostInput
              setImage={setImage}
              setErr={setErr}
              setImagePreview={setImagePreview}
              setSelectedImg={setSelectedImg}
              disabled={loading}
              setBtnDisabled={setBtnDisabled}
            />
          )}
        </div>
        {type !== "avatar" && type !== "chatimage" && (
          <div className="mb-4">
            <input
              type="text"
              id="caption"
              maxLength={100}
              placeholder="Write something..."
              onChange={(e) => setCaption(e.target.value)}
              className="block text-gray-700 font-bold mb-2 w-full"
              disabled={loading}
              defaultValue={type === "editPost" ? userPost?.caption : ""}
            />
            <CharacterCountIndicator value={caption} maxLength={100} />
          </div>
        )}
        {loading && (
          <div className="w-full flex justify-center items-center">
            <Spinner
              color="info"
              aria-label="Large spinner example"
              size="lg"
            />
          </div>
        )}
        <div className="flex justify-evenly items-center">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            disabled={btnDisabled}
          >
            Submit
          </button>
          <br />
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={closeModal}
            disabled={btnDisabled}
          >
            Cancel
          </button>
        </div>

        {err && <p className="text-red-500 text-center">{err}</p>}
      </div>
      {type === "avatar" ? (
        ""
      ) : (
        <div className="image-preview">
          {imagePreview && (
            <img
              src={type !== "editPost" ? imagePreview : userPost.image}
              alt=""
            />
          )}
        </div>
      )}
    </Modal>
  );
}

export default CreatePostModal;
