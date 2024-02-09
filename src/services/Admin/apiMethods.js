import { adminUrl, postUrl } from "../../const/routes";
import { apiCall } from "../User/apiCalls";
import adminApiCalls from "../Admin/apiCalls";

//@dec      Admin login
//@method   POST
export const adminPostLogin = (adminData) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("post", adminUrl.login, adminData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchSinglePost = (postId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = adminUrl.fetchSinglePost(postId);

      adminApiCalls("get", url)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

//@dec      Fetch user data
//method    GET
export const fetchAllUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("get", `${adminUrl.getUsers}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

//@dec      Fetch user data
//method    GET
export const adminFetchUsers = (currentPage, perPage, searchTerm) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls(
        "get",
        `${adminUrl.getUsers}/?page=${currentPage}&perPage=${perPage}&search=${searchTerm}`
      )
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const blockUnblockUser = (userId, status) => {
  return new Promise((resolve, reject) => {
    try {
      const url = adminUrl.changeBlockStatus(userId);
      const data = { status: status };

      adminApiCalls("patch", url, data)
        .then((response) => {
          resolve({
            user: response.user, // Assuming this is the structure of the response
            message: "Block status updated successfully",
          });
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject({ status: 500, message: error?.message });
    }
  });
};

////////////////////////////////////////////////// REPORT SECTION //////////////////////////////////////////////////////////////////
// @desc    Fetch post reports
// @route   GET /admin/reports/posts
// @access  Admins
export const getPostReports = (perPage, search, page) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrl.postReports}?perPage=${perPage}&search=${search}&page=${page}`;
      adminApiCalls("get", url)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

// @desc    Fetch user reports
// @route   GET /admin/reports/users
// @access  Admins
export const getUserReports = (perPage, search, page) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrl.userReports}?perPage=${perPage}&search=${search}&page=${page}`;
      adminApiCalls("get", url)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

// @desc    Fetch posts with pagination and populated user
// @route   GET /admin/fetch-posts
// @access  Admins
export const fetchPosts = (page, perPage, search) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrl.fetchPosts}?perPage=${perPage}&search=${search}&page=${page}`;
      adminApiCalls("get", url)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

// @desc    Block a Post
// @route   PATCH /admin/post/block/:postId
// @access  Admins
export const blockPost = (postId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = adminUrl.blockPost(postId);
      adminApiCalls("patch", url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

// @desc    update post
// @route   PUT /post/update-post/:postId
// @access  registed user
export const updatePost = (postId, caption) => {
  return new Promise((resolve, reject) => {
    const url = postUrl.update(postId);
    const data = { caption: caption };

    apiCall("put", url, data)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
