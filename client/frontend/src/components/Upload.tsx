import React, { useState } from "react";
import axios from "axios";

const Upload: React.FC = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [img, setImg] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSignedUrl = async (type: "image" | "video") => {
    try {
      const backendURL = process.env.REACT_APP_BACKEND_BASEURL;
      if (!backendURL) {
        console.error("❌ Backend URL is missing from .env file.");
        return null;
      }

      const res = await axios.get(`${backendURL}/api/sign-upload`, {
        params: { resource_type: type },
      });

      if (res.status !== 200) {
        console.error(`❌ Failed to get signed URL. Status: ${res.status}`);
        return null;
      }

      return res.data;
    } catch (error) {
      console.error(`⚠️ Error getting signed URL:`, error);
      return null;
    }
  };

  const uploadToCloudinary = async (file: File, type: "image" | "video") => {
    const signedData = await getSignedUrl(type);
    if (!signedData) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", signedData.timestamp);
    formData.append("api_key", signedData.api_key);
    formData.append("signature", signedData.signature);
    formData.append("folder", signedData.folder);

    try {
      const apiUrl = `https://api.cloudinary.com/v1_1/${signedData.cloud_name}/${type}/upload`;
      const res = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status !== 200) {
        console.error(`❌ Cloudinary upload failed: ${res.status}`);
        return null;
      }

      console.log(`✅ ${type} uploaded successfully:`, res.data.secure_url);
      return res.data.secure_url;
    } catch (error) {
      console.error(`⚠️ Error uploading ${type}:`, error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!video && !img) {
        alert("Please select a file to upload.");
        setLoading(false);
        return;
      }

      const uploadedImgUrl = img ? await uploadToCloudinary(img, "image") : null;
      const uploadedVideoUrl = video ? await uploadToCloudinary(video, "video") : null;

      if (!uploadedImgUrl && !uploadedVideoUrl) {
        alert("Failed to upload files.");
        setLoading(false);
        return;
      }

      const backendURL = process.env.REACT_APP_BACKEND_BASEURL;
      await axios.post(`${backendURL}/api/video`, {
        imgUrl: uploadedImgUrl || "",
        videoUrl: uploadedVideoUrl || "",
      });

      alert("Upload successful!");
    } catch (e) {
      console.error("Error submitting form:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="video">Video:</label>
        <br />
        <input type="file" accept="video/*" id="video" onChange={(e) => setVideo(e.target.files?.[0] || null)} />
      </div>
      <br />
      <div>
        <label htmlFor="img">Image:</label>
        <br />
        <input type="file" accept="image/*" id="img" onChange={(e) => setImg(e.target.files?.[0] || null)} />
      </div>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default Upload;
