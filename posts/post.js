let allPosts = $(".all-posts");
let token = localStorage.getItem("token") || "";

const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts";

export async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result = await response.json();
    const posts = result.data.posts;
    posts.forEach((post) => {
      const currentPostElement = renderPost(post);
      $(".post_cards").append(currentPostElement);
    })
  } catch (error) {
    console.error(error);
  }
}


export function renderPosts({
  title,
  author: { username },
  location,
  description,
  willDeliver,
  price,
  isAuthor
}) {
  return $(`
    <div class="post">
      <h1 class="title">${title}</h1>
        <div>${description}</div>
        <div>Posted by: <span>${username}</span></div>
        <div>Location: <span>${location}</span></div>
        <div>Price: <span>${price}</span></div>
        <div class="footer">
        ${isAuthor ?
      `<button id="delete">Delete</button>` : `<button id="send-message">Send Message</button>`
    }
    `).data("posts", post);
  
    //return $(".all-posts").append(postCard);
}


export function fetchCreateNewPost(token) {
  fetch("https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        willDeliver,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
}


export function deletePost(token) {
  fetch(
    "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts/5e8d1bd48829fb0017d2233b",
    {
      method: "DELETE",
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

