const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT";

export async function registerNewUser(userObject) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userObject }),
      }
    );
    const parsedJson = await response.json();
    return parsedJson.data.token;
  } catch (error) {
    console.error(error);
  }
};

export async function loginUser(userObject) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userObject }),
      }
    );
    const parsedJson = await response.json();
    if (parsedJson.error) {
      throw new Error(parsedJson.error.message);
    }
    return parsedJson.data.token;
  } catch (error) {
    throw new Error(error);
  }
};

export async function getUser(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedJson = await response.json();
    return parsedJson.data;
  } catch (error) {
    console.error(error);
  }
};

export async function getPosts(token) {
  try {
    const response = await fetch(`${BASE_URL}/posts`,
      token ?
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } : {}
    );
    const parsedJson = await response.json();
    return parsedJson.data.posts;
  } catch (error) {
    console.error(error);
  }
};

export async function newPost(postObject) {
  try {
    const response = await fetch(`${BASE_URL}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ post: postObject }),
      }
    );

    const parsedPost = await response.json();
    return parsedPost.data;
  } catch (error) {
    console.error(error);
  }
};

export async function deletePost(postId) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    console.error(error);
  }
};

export async function editPost(postId, updatedPostObject) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ post: updatedPostObject }),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export async function messageUser(postId, messageBody) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ message: messageBody }),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};