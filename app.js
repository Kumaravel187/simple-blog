// Selecting the form element
const formEl = document.querySelector("#form");

// Array to store post data
let postArray = [];

// Function to render posts in the grid
const renderPosts = () => {
  let html = "";
  for (let i = 0; i < postArray.length; i++) {
    html += `
      <article class="grid-item">
        <div class="grid-item__img">
          <img src="./images/img-${i + 1}.svg" alt="" />
        </div>
        <div class="grid-item__description">
          <p class="title">${postArray[i].title}</p>
          <p class="description">
            ${postArray[i].body}
          </p>
        </div>
      </article>`;
  }

  // Update the HTML content of the grid section
  document.querySelector("#section-grid-article").innerHTML = html;
};

// Fetching posts from the JSONPlaceholder API
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    // Store the first 8 posts in the postArray
    postArray = data.slice(0, 8);
    // Render the posts in the grid
    renderPosts();
  });

// Form submission functionality
formEl.addEventListener("submit", (e) => {
  // Prevent default form submission
  e.preventDefault();

  // Get values from the form inputs
  const titleBlog = document.querySelector("#blog-title").value;
  const descBlog = document.querySelector("#blog-desc").value;

  // Display values in the console
  console.log(titleBlog, descBlog);

  // Create user data object
  const userData = {
    title: titleBlog,
    body: descBlog,
  };

  // Options for the POST request
  const options = {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Send a POST request to add a new post
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((data) => {
      // Add the new post data to the beginning of the postArray
      postArray.unshift(data);
      // Render the updated posts in the grid
      renderPosts();
    });

  // Clear form inputs after submission
  document.querySelector("#blog-title").value = "";
  document.querySelector("#blog-desc").value = "";
});
