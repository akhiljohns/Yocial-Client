

import axios from "axios";

const uploadCloudinary = async (imgData, imageFile, setErr) => {
  try {

    const image = await fetch(imgData);
    const blob = await image.blob();
    const file = new File([blob], `${imageFile.name}.png`, { type: blob.type });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yocial-userposts2500");
    formData.append("cloud_name", "akhiljohns-cloud");

    const response = await axios.post("https://api.cloudinary.com/v1_1/akhiljohns-cloud/image/upload", formData);


    if (response.status === 200) {
      return response.data;
    } else {
      setErr("Error uploading image to Cloudinary");
      return null;
    }
  } catch (error) {
    console.log(error)
    setErr("Error uploading image to Cloudinary");
    return null;
  }
};

export default uploadCloudinary;