import React, { useEffect, useState } from 'react'
import ProfilePic from '../profiles/ProfilePic';
import NameField from '../profiles/NameField';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeDifference } from '../../../hooks/timeAgo';
import { getRoomWithIds, getUser } from '../../../services/User/apiMethods';

function ChatUser({userId, doFunction}) {

  const dispatch = useDispatch()
    const currentUser = useSelector((state)=>state?.user?.userData)
    const [online, setOnline] = useState(false);
    const [user, setUser] = useState();
    const currentRoom = useSelector((state)=>state?.user?.currentRoom);

    const [room, setRoom] = useState();
    const [time, setTime] = useState();

    useEffect(()=> {
      getRoomWithIds(userId, currentUser?._id).then((response) =>{
        setRoom(response);
        if(response?.lastMessage && response?.lastMessageTime){
          setTime(getTimeDifference(response?.lastMessageTime))
        }
      })
    },[currentUser, userId, dispatch])

    
    useEffect(()=> {
      if(currentRoom?.users?.includes(userId)){
        setRoom(currentRoom)
      }
    }, [currentRoom, userId])

    
    useEffect(()=> {
      try {
        getUser(userId)
        .then((response) => {
            setUser(response.user[0]);
          })
          .catch((error) => {
            setError(error);
          });
      } catch (error) {
        setError(error)
      }
    },[userId])


    useEffect(() => {
      setOnline(user?.online)
    }, [user]);


  return (
    <div
      className="flex items-center gap-5 border-2 p-2 rounded-lg select-none relative bg-slate-400 opacity-70 cursor-pointer"
      onClick={() => doFunction(user)}
    >
      <div className="relative aspect-square rounded-full w-fit h-fit">
        <ProfilePic
          image={user?.profilePic || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"}
          styleProp={"h-12 w-12 aspect-square rounded-full"}
        />
        {online ? (
          <div className="rounded-full absolute bottom-0 right-0 w-3 h-3 ml-auto bg-green-500"></div>
        ) : null}
      </div>
      <div className="flex flex-col truncate">
        <NameField
          name={user?.name}
          styleProp={"font-poppins font-semi-bold"}
        />
        <div className="text-sm text-gray-700 gap-5 flex items-center max-w-full">
          <span className=" max-w-[6rem] truncate overflow-clip">
            {room?.lastMessage}
          </span>{" "}
          <span className="text-xs absolute bottom-1 right-3">{time}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatUser