import { renderAuthForm } from "./auth.js";
import { fetchPosts, renderPosts, createNewPost, deletePost } from "./post.js";

let allPosts = $(".all-posts");

window.auth_state = {
  currentPost: null,
  currentUserObject: null,
  currentUser: localStorage.getItem("currentUser"),
  currentForm: "login",
  authError: null,
};

function isLoggedIn() {
  const token = localStorage.getItem("token");

  if (token === null) return false;

  return token;
}

function renderPublicPage() {
  $(".messages").remove();
  $(".post_create").remove();
  fetchPosts();
  renderPosts();
}

function renderLogginedInPage() {
  fetchPosts();
  renderPosts();
}

function renderPage() {
  if (isLoggedIn()) {
    return renderLogginedInPage();
  }
  return renderPublicPage();
}


// function registeredUserData(token) {
//   return fetch(
//     "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/me",
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);
//     })
//     .catch(console.error);
// }

async function fetchMe(token) {
  try {
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/me",
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
}

export function appendAuthForm() {
  $(".login-bar").empty();
  $(".login-bar").append(renderAuthForm());
}

appendAuthForm();

if (isLoggedIn()) {
  fetchMe(localStorage.getItem("token"))
    .then((userObject) => {
      window.auth_state.currentUserObject = userObject;
    })
    .then(() => {
      console.log(window.auth_state);
    })
    .catch(console.error);
}



// function createMessages(token) {
//   fetch('https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts/5e8929ddd439160017553e06/messages', {
//   method: "POST",
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   },
//   body: JSON.stringify({
//     message: {
//       content
//     }
//   })
// }).then(response => response.json())
//   .then(result => {
//     console.log(result);
//   })
//   .catch(console.error);
// }
// createMessages();

let newMessages = $(`
  <div class="new-messages">
    <h3>Send New Message!</h3>
      <input type="text" class="title" placeholder="Title" /><br>
      <input type="text" class="message" placeholder="Message" />
      <button>Send</button>
  </div>`);
newMessages.remove();

$('.messages').click(function () {
  newPostTab.remove();
  let messageAppears = $('#new_tab').append(newMessages);
  return messageAppears.toggle();
});

$('.post_cards').click(function () {
  return fetchPosts();
});

let newPostTab = $(`
  <div class="new-post">
    <h3>Create New Post!</h3>
      <input type="text" class="new-post-title" placeholder="Title" />
      <input type="text" class="new-post-description" placeholder="Description" /><br>
      <input type="text" class="new-post-price" placeholder="Price" />
      <input type="text" class="new-post-location" placeholder="Location" />
      <input type="text" class="new-post-will_deliver" placeholder="Will Deliver" />
      <button class="new-post-button">Post</button>
  </div>
  `);
newPostTab.remove();

$('.post_create').click(function () {
  newMessages.remove();
  let createNewPostAppears = $('#new_tab').append(newPostTab);
  return createNewPostAppears.toggle();
});

let postButton = $(".new-post-button");
postButton.click(function (event) {
  event.preventDefault();
  const title = $("new-post-title").val();
  const description = $("new-post-description").val();
  const price = $("new-post-price").val();
  const location = $("new-post-location").val();
  const delivery = $('input[name="willDeliver"]:checked').val();
  const willDeliver = delivery == "true";
  const postData = { title, description, price, willDeliver };

  if (!title || !description || !price || !location) {
    return alert("Please fill out all fields!");
  }

  createNewPost(postData);


})



function bootstrap() {
  // fetchPosts();
  // renderPosts();
  renderPage();
}


bootstrap();