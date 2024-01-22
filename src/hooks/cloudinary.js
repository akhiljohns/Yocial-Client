
import axios from "axios";
const uploadCloudinary = async (imgData, imageFile, setErr, setLoading) => {
  try {
    const image = await fetch(imgData);
    const blob = await image.blob();
    const file = new File([blob], `${imageFile.name}.png`, { type: blob.type });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    const response = await axios.post(import.meta.env.VITE_CLOUDINARY_POST_URL, formData);

    if (response.status === 200) {
      return response.data;
    } else {
      setLoading(false);
      setErr("Error uploading image to Cloudinary");
      return null;
    }
  } catch (error) {
    setLoading(false);
    alert(error.message);
    setErr("Error uploading image to Cloudinary");
    return null;
  }
};

export default uploadCloudinary;
