fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => {
    console.log("Post:", data);
  })
  .catch((error) => {
    console.error("Error fetching post:", error);
  });
