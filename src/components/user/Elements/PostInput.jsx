import React from "react";

function PostInput({ setImage, setImagePreview, setSelectedImg, setErr ,disabled}) {
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    try {
      setErr("");
      setImage(img);
      setImagePreview(URL.createObjectURL(img));
      setSelectedImg(true);
    } catch (error) {}
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
