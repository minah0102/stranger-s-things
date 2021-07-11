export function createElementPost(post) {
  const {
    title,
    description,
    price,
    location,
    willDeliver,
    isAuthor
  } = post;

  return $(`
  <div class="post-tab"><h2>${title}</h2>
    <p><b>Description:</b> ${description}</p>
    <p><b>Price:</b> ${price}</p>
    <p><b>Location:</b> ${location}</p>
    <p>
    <b>Will deliver:</b> 
    ${willDeliver ? "Delivery Available" : "Delivery Unavailable"}
    </p>
    ${localStorage.getItem("userToken") ?
      isAuthor
        ? "<button class='edit-post'>EDIT</button><button class='delete-post'>DELETE</button><button class='view-messages'>MESSAGES</button>" : "<button class='send-message'>MESSAGE</button>" : ""
    }</div>
  `).data("post", post);
};

export function updateScreen(posts) {
  $(".post-container").empty();
  posts.forEach((post) => {
    $(".post-container").prepend(createElementPost(post));
  })
}

export function createElementMessage(message) {
  const { fromUser, post, content } = message;
  return $(`
  <div class="message-tab">
    <p><b>From:</b> ${fromUser.username}</p>
    <p><b>Regarding:</b> ${post.title}</p>
    <p><b>Content:</b> ${content}</p>
    `).data("message", message);
}

export function renderMessages(messages) {
  $(".message-holder").empty();
  messages.forEach((message) => {
    $(".message-holder").prepend(createElementMessage(message));
  });
}

export function createElementMessageForPost(message) {
  const { fromUser, content } = message;
  return $(`
  <div class="message-tab">
    <p><b>From:</b> ${fromUser.username}</p>
    <p><b>Message:</b> ${content}</p>
    `).data("message", message);
}

export function renderMessagesForPost(messages) {
  $(".this-post-messages").empty();
  messages.forEach((message) => {
    $(".this-post-messages").prepend(createElementMessageForPost(message));
  });
}