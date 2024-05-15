import React from "react";

function PostInput({
  setImage,
  setImagePreview,
  setSelectedImg,
  setErr,
  disabled,
  setBtnDisabled,
}) {
  const handleImageChange = (e) => {
    setBtnDisabled(false);
    const img = e.target.files[0];
    // Check if the file is an image
    if (img && img.type.startsWith("image/")) {
      try {
        setErr("");
        setImage(img);
        setImagePreview(URL.createObjectURL(img));
        setSelectedImg(true);
      } catch (error) {
        setErr("An error occurred while processing the image.");
      }
    } else {
      setBtnDisabled(true);
      setErr("Please select an image file (JPEG, PNG, WEBP, JPG).");
    }
  };

  return (
    <>
      <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
        Add Image:
      </label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleImageChange}
        disabled={disabled}
        accept="image/jpeg, image/png, image/webp, image/jpg"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </>
  );
}

export default PostInput;
