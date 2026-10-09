async function getData() {
  await fs.readFile("./promise.txt", (err, data) => {
    return data;
  });
}

function promiseGetData() {
  return new Promise((resolve, reject) => {
    fs.readFile("./promise.txt", (err, data) => {
      resolve(data);
    });
  });
}

promiseGetData().then(() => {
  console.log(data);
});
