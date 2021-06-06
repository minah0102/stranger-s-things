import { renderAuthForm } from "./auth/auth.js";
import { fetchtokenPosts, fetchPosts, renderPosts, fetchCreateNewPost, deletePost } from "./posts/post.js";

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


function registeredUserData(token) {
  return fetch(
    "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/me",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
}

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



function createMessages(token) {
  fetch('https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts/5e8929ddd439160017553e06/messages', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    message: {
      content
    }
  })
}).then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(console.error);
}
createMessages();

$('.messages').click(function() {
  let newMessages = $(`
  <div>
  <input type="text" class="title" placeholder="Title" />
  <input type="text" class="message" placeholder="Message" />
  </div>
  `)
  return $('#new_tab').append(newMessages)
})

$('.post_cards').click(function() {
  return renderPosts()
});

$('.post_create').click(function() {
  let newPostTab = $(`
  <div>
    <h3>Create New Post!</h3>
    <input type="text" class="title" placeholder="Title" />
    <input type="text" class="description" placeholder="Description" />
    <input type="text" class="price" placeholder="Price" />
    <input type="text" class="location" placeholder="Location" />
    <input type="text" class="will_deliver" placeholder="Will Deliver" />
  </div>
  `)
  return $('#new_tab').append(newPostTab);
})

function showAllPosts() {
  return fetchPosts();
}

showAllPosts();
fetchtokenPosts();
fetchPosts();
renderPosts();
fetchCreateNewPost();
deletePost();
registeredUserData();
