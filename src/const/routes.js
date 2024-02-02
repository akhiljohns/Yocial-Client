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
  searchUser: (key) => `/user/search/${key}`,
  fetchByUsername: (username) => `/user/fetch/username/${username}`,
  fetchByEmail: (email) => `/user/fetch-user/email/${email}`,

  //saved posts
  savePost: (userId, postId) => `/user/${userId}/save/post/${postId}`,
  removeSave: (userId, postId) => `/user/${userId}/save/post/remove/${postId}`,

  //connection
  followUser: (userId, followeeId) => `/user/${userId}/follow/${followeeId}`,
  unfollowUser: (userId, followeeId) =>
    `/user/${userId}/unfollow/${followeeId}`,
  getConnections: (userId) => `/user/fetch/connection/${userId}`,

  //update user
  updateProfile: `/user/update/profile`,

  //report
  report: (userId, username) => `/user/report/user/${userId}/${username}`,

  //fcmReg
  regFcm: (userId, token) => `user/fcm/${userId}/${token}`,

  //notification related
  getNotes: (userId) => `/user/${userId}/notifications`,
  readNote: (notifyId) => `/user/notifications/read/${notifyId}`,
  deleteNotes: (userId) => `/user/notifications/delete/${userId}`,

  //password related
  reqChangePassword: "/user/password/verify/email",

  //logout
  logOut: (userId) => `/user/logout/${userId}`,

  suggestions: (userId) => `/user/fetch-suggested-users/${userId}`,
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
};

export const postUrl = {
  create: "/post/create-post",
  getPost: "/post/fetch-posts",

  getPostCount: "/post/fetch-count",

  getSinglePost: (postId) => `/post/fetch-single-post/${postId}`,

  getUserDetails: "/post/fetchUserDetails",

  //delete post
  deletePost: (postId) => `/post/delete/post/${postId}`,

  //likes
  likePost: "/post/like-post",
  unlikePost: "/post/unlike-post",

  //comments
  fetchComments: (postId) => `/post/fetch-comments/${postId}`,
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
};

export const authUrl = {
  authUser: "/auth/user",
  authAdmin: "/auth/admin",

  sendOtp: "/auth/sent-verification",
  verifyOtp: "/auth/verify-otpToken",

  sendMail: "/auth/send-verification",
  updateEmail: "/auth/update/email",
  verifyEmail: ({id,token})=> `/auth/change-email/${id}/${token}`,
};

export const messageUrl = {
  getChatRoom: (firstId, secondId) =>
    `/messages/inbox/room/${firstId}/${secondId}`,

  getMessages: (roomId) => `/messages/inbox/${roomId}`,

  newMessage: (roomId) => `messages/inbox/new-message/${roomId}`,

  getRoomFromUser: (userId) => `/messages/inbox/get-room/userID/${userId}`,

  getRooms: (firstId, secondId) =>
    `/messages/inbox/room/fetch/${firstId}/${secondId}`,
};
