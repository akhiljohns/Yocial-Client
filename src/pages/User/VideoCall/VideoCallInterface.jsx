import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VideoCallInterface = () => {
  const { roomId } = useParams();
  const { userData } = useSelector((state) => state?.user);
  const elementRef = useRef(null);
  const isJoinedRef = useRef(false); // Ref to track if room is already joined
  const navigate = useNavigate(); // Initialize useNavigate

  const handleJoinRoom = () => {
    if (!isJoinedRef.current) {
      const appId = parseInt(import.meta.env.VITE_APP_ID);
      const serverSecret = import.meta.env.VITE_SERVER_SECRET;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        userData._id,
        userData.username
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: elementRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });

      isJoinedRef.current = true; // Update ref to indicate room is joined
    }
  };

  useEffect(() => {
    if (userData) {
      handleJoinRoom();
    }else{
      navigate("/login");
      return null;
    }
  }, [userData]);

  return (
    <div>
      {/* Element to render video call interface */}
      <div ref={elementRef}></div>
    </div>
  );
};

export default VideoCallInterface;
