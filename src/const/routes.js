export const userUrl = {
  // login
  login: "/user/login",
  Oauthlogin: "/user/login/Oauth",

  // register
  register: "/user/register",
  OauthReg: "/user/register/Oauth",

  // fetch | search user data
  fetchUser: "/user/fetch-users",
  getCredentials: "/user/userdetails",
  searchUser: (key) => `/user/fetch/users/${key}`,
  fetchByUsername: (username) => `/user/fetch/username/${username}`,
  fetchByEmail: (email) => `/user/fetch-user/email/${email}`,

  //saved posts
  savePost: (userId, postId) => `/user/${userId}/save/post/${postId}`,
  fetchSavedPost: (userId) => `/user/savedposts/${userId}`,
  removeSave: (userId, postId) => `/user/${userId}/save/post/remove/${postId}`,

  //connection
  followUser: (userId, followeeId) => `/user/${userId}/follow/${followeeId}`,
  unfollowUser: (userId, followeeId) =>
    `/user/${userId}/unfollow/${followeeId}`,
  getConnections: (userId) => `/user/fetch/connection/${userId}`,
  getSuggestions: (userId) => `/user/getmutuals/${userId}`,

  //update user
  updateProfile: `/user/update/profile`,
  updateAvatar: `/user/update/avatar`,

  //report
  report: (userId, username) => `/user/report/user/${userId}/${username}`,

  //fcmReg
  regFcm: (userId, token) => `user/fcm/${userId}/${token}`,

  //notification related
  getNotes: (userId) => `/user/${userId}/notifications`,
  readNote: (notifyId) => `/user/notifications/read/${notifyId}`,

  //password related
  reqChangePassword: "/user/password/verify/email",

  //logout
  logOut: (userId) => `/user/logout/${userId}`,

  suggestions: (userId) => `/user/fetch-suggested-users/${userId}`,

  blockUser: (userId, blockUserId) => `/user/${userId}/block/${blockUserId}`,

  unblockUser: (userId, unblockUserId) =>
    `/user/${userId}/unblock/${unblockUserId}`,
};

export const adminUrl = {
  login: "/admin/login",
  //fetch users with pagination and search
  getUsers: "/admin/fetch-users",

  changeBlockStatus: (userId) => `/admin/${userId}/change-status`,

  //reports
  userReports: "/admin/reports/users",
  postReports: "/admin/reports/posts",

  //post related
  fetchPosts: "/admin/fetch-posts",

  fetchSinglePost: (postId) => `/admin/fetch-single-post/${postId}`,

  //block a post
  blockPost: (postId) => `/admin/post/block/${postId}`,

  //action status of post report
  toggleactionstatus: (reportId) => `/admin/post/toggleactiontaken/${reportId}`,

  // fetch single posts comment count
  fetchCommentCount: (postId) => `/admin/fetch-comment-count/${postId}`,
};

export const postUrl = {
  create: "/post/create-post",
  getPost: "/post/fetch-posts",

  getPostCount: "/post/fetch-count",

  getSinglePost: (postId) => `/post/fetch-single-post/${postId}`,

  getUserPosts: "/post/fetchUserPosts",

  getUserDetails: "/post/fetchUserDetails",

  //delete post
  deletePost: (postId) => `/post/delete/post/${postId}`,
  deleteNotes: (userId) => `/post/notification/delete/${userId}`,

  //likes
  likeunlikePost: (data) => `/post/like-unlike/${data.postId}/${data.userId}`,

  //comments
  fetchComments: (data) => `/post/fetch-comments/${data.postId}/${data.type}`,
  fetchReplies: (commentId) => `/post/comments/replies/${commentId}`,
  addComment: "/post/add-comment",
  addReply: (commentId) => `/post/comments/reply-to/${commentId}`,
  deleteComment: "/post/delete-comment",

  //report
  report: (userId, username) => `/post/report/post/${userId}/${username}`,

  //update post
  update: (postId) => `/post/update-post/${postId}`,

  //toget evry posts 20 per req.
  getAll: `/post/get-every-posts`,

  //send new notifcation
  sendNotification: `/post/newnotification`,

  //fetch user notifcations
  fetchNotif: `/post/fetch-notifications`,

  //change notifcation status
  changeNotifStatus: `/post/notification/status`,
};

export const authUrl = {
  authUser: "/auth/user",
  authAdmin: "/auth/admin",

  sendOtp: "/auth/sent-verification",
  verifyOtp: "/auth/verify-otpToken",

  sendMail: "/auth/send-verification",
  updateEmail: "/auth/update/email",
  verifyEmail: ({ id, token, type }) =>
    `/auth/change-email/${id}/${token}/${type}`,
};

export const messageUrl = {
  getChatRoom: (firstId, secondId) =>
    `/messages/inbox/room/${firstId}/${secondId}`,

  getMessages: (roomId) => `/messages/inbox/${roomId}`,

  newMessage: (roomId) => `messages/inbox/new-message/${roomId}`,

  getRoomFromUser: (userId) => `/messages/inbox/get-room/userID/${userId}`,
  videoCall: (callerId, receiverId) =>
    `/messages/inbox/videocall/${callerId}/${receiverId}`,

  getRooms: (firstId, secondId) =>
    `/messages/inbox/room/fetch/${firstId}/${secondId}`,
};
