let allPosts = $(".all-posts");
let token = localStorage.getItem("token") || "";

const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT";

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
      const currentPostElement = renderPosts(post);
      allPosts.append(currentPostElement);
    })
  } catch (error) {
    console.error(error);
  }
}

export function renderPosts(post) {
  const {
    title,
    author: { username },
    location,
    description,
    willDeliver,
    price,
    isAuthor
  } = post;
  return $(`
    <div class="post">
      <h1 class="title">${title}</h1> <br>
        <div>${description}</div> <br>
        <div><b>Posted by: </b><span>${username}</span></div>
        <div><b>Location: </b><span>${location}</span></div>
        <div><b>Price: </b><span>${price}</span></div>
        <div><b>Will Deliver? </b><span>${willDeliver ? "YES" : "NO"}</span></div>
        <div class="footer">
        ${isAuthor ?
      `<button id="delete">Delete</button>` : `<button id="send-message">Send Message</button>`
    }
    `).data("posts", post);
}


export async function createNewPost(userData) {
  const {
    title,
    description,
    price,
    willDeliver
  } = userData;
  try{
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          willDeliver,
        },
      }),
    });
    const result = await response.json();
    fetchPosts();
    return result.data;
  } catch (error) {
    console.error(error);
  }
  
}

export async function deletePost(data) {
  const ID = data.postData._id;
  try {
    let response = await fetch(`${ BASE_URL }/posts/${ ID }`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    response = await response.json();
    fetchPosts();
    return response;
  } catch (error) {
    console.error(error);
  }
}


