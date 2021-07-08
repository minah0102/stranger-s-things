// import { appendAuthForm } from "../app.js";

// export function renderAuthForm() {
//   if (isLoggedIn()) {
//     return renderLogoutButton();
//   }

//   return renderToggleForm();
// }

// function isLoggedIn() {
//   const token = localStorage.getItem("token");

//   if (token === null) return false;

//   return token;
// }

// function registerNewUser(username, password) {
//   return fetch(
//     "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/register",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           username,
//           password,
//         },
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.error) {
//         window.auth_state.authError = result.error.message;
//         return;
//       }
//       const token = result.data.token;
//       localStorage.setItem("token", token);
//       localStorage.setItem("currentUser", username);
//       window.auth_state.currentUser = username;

//       return result;
//     })
//     .catch(console.error);
// }

// function loginUser(username, password) {
//   return fetch(
//     "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/login",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           username,
//           password,
//         },
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.error) {
//         window.auth_state.authError = result.error.message;
//         return;
//       }
//       const token = result.data.token;
//       localStorage.setItem("token", token);
//       localStorage.setItem("currentUser", username);
//       window.auth_state.currentUser = username;

//       return result;
//     })
//     .catch(console.error);
// }

// function renderLogoutButton() {
//   const logoutButton = $(`
//   <div>
//     <h2>Welcome ${window.auth_state.currentUser}</h2>
//     <button id="logout">Logout</button>
//   </div>
//   `);

//   logoutButton.click(function () {
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     appendAuthForm();
//   });

//   return logoutButton;
// }

// const authHeadlines = {
//   login: "Log In",
//   register: "Register New Account!",
// };

// const authBylines = {
//   login: "Don't have an account? <button id='register_button'>Register</button>",
//   register: "Already have an account? <button id='login_button'>Login!</button>",
// };

// const authFns = {
//   login: loginUser,
//   register: registerNewUser,
// };

// function renderToggleForm() {
//   const { currentForm, authError } = window.auth_state;
//   const heading = authHeadlines[currentForm];
//   const bylineText = authBylines[currentForm];
//   const form = $(`
//   <form id="toggle_form">
//     <h2 id="heading">${heading}</h2>
//     <div id="error_message"></div>
//     <input type="text" id="username" placeholder="username" />
//     <input type="password" id="password" placeholder="password" />
//     <button id="login-submit-button">Submit</button>
//     <div id="toggle_link"></div>
//   </form>
//   `);

//   const errorMessage = form.find("#error_message");
//   errorMessage.append(authError ? authError : "");

//   const toggleLink = form.find("#toggle_link");
//   toggleLink.append(bylineText);

//   toggleLink.click(function (event) {
//     window.auth_state.currentForm =
//       currentForm === "login" ? "register" : "login";
//     window.auth_state.authError = null;
//     appendAuthForm();
//   });

//   form.submit(function (event) {
//     event.preventDefault();
//     const uname = form.find("#username").val();
//     const pword = form.find("#password").val();

//     authFns[currentForm](uname, pword)
//       .then(() => {
//         appendAuthForm();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   });

//   return form;
// }

const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT"
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