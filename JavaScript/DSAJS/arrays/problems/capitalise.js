function capitalizeWords(sentence) {
  // Your implementation
  let data = sentence.trim().split(/\s+/);
  const result = data
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
  console.log(result);
  return result;
}

//For the purpose of user debugging.
console.log(capitalizeWords("JavaScript Is FUN"));
