import React, { useEffect, useState } from "react";
import {
  postCreatePost,
  postUpdatePost,
} from "../../../services/User/apiMethods";
import Modal from "react-modal";
import uploadCloudinary from "../../../hooks/cloudinary";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CropImage from "../Options/CropImg";
import PostInput from "../Elements/PostInput";
import { Spinner } from "flowbite-react";
import { successToast } from "../../../hooks/toast";
import { addNewPost, editUserPost } from "../../../utils/reducers/postReducer";

function CreatePostModal({ isModalOpen, setIsModalOpen, type }) {

  const dispatch = useDispatch();

  const [croppedImg, setCroppedImg] = useState(null);
  const [err, setErr] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImg, setSelectedImg] = useState(false); // State to manage the selected image
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.userData);
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
      (type !== "editPost" ?  dispatch(addNewPost(response.post)):  dispatch(editUserPost(response.post)))
      successToast(response.message);
      clearComponent();
      closeModal();
    } else if (response.status === 401) {
      clearComponent();
      closeModal();
      navigate("/login");
    } else {
      setErr(response.message);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (type !== "editPost") {
      if (!image) {
        setLoading(false);
        setErr("Please select an image");
        return;
      }

      const data1 = await uploadCloudinary(
        imagePreview,
        image,
        setErr,
        setLoading
      );

      if (data1) {
        postData = {
          userId: userData._id,
          image: data1.secure_url,
          caption: caption,
        };
      }
    }
    if (type === "editPost") {
      postData = {
        postId: userPost?._id,
        caption: caption,
      };
    }

    (type !== "editPost" ? postCreatePost(postData) : postUpdatePost(postData))
      .then(handlePostResponse)
      .catch((error) => {
        setLoading(false);
        setErr(error?.message);
      });
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
      overlayClassName="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity"
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
          setErr={setErr}
        />
      )}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {type !== "editPost" ? "Create Post" : "Edit Post"}
        </h2>
        <div className="mb-4">
          {type !== "editPost" && (
            <PostInput
              setImage={setImage}
              setErr={setErr}
              setImagePreview={setImagePreview}
              setSelectedImg={setSelectedImg}
              disabled={loading}
            />
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="caption"
            placeholder="Write something..."
            onChange={(e) => setCaption(e.target.value)}
            className="block text-gray-700 font-bold mb-2 w-full"
            disabled={loading}
            defaultValue={type === "editPost" ? userPost?.caption : ""}
          />
        </div>
        {loading && (
          <div className="w-full flex justify-center items-center">
            <Spinner
              color="info"
              aria-label="Large spinner example"
              size="lg"
            />
          </div>
        )}
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit
        </button>
        <br />
        <button
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={closeModal}
          disabled={loading}
        >
          Cancel
        </button>
        {err && <p className="text-red-500 text-center">{err}</p>}
      </div>
      <div className="image-preview">
        {imagePreview && (
          <img
            src={type !== "editPost" ? imagePreview : userPost.image}
            alt=""
          />
        )}

      </div>
    </Modal>
  );
}

export default CreatePostModal;
