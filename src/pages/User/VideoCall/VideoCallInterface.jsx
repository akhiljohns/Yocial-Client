import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

const VideoCallInterface = () => {
  const { roomId } = useParams();
  const { userData } = useSelector((state) => state?.user);
  const elementRef = useRef(null);

  useEffect(() => {
    const meeting = async () => {
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
    };

    meeting();
  }, [roomId, userData]);

  return <div ref={elementRef}></div>;
};

export default VideoCallInterface;
