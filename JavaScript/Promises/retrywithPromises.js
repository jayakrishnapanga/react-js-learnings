function RetryWithExponentialBackOff(fn, retry, delay) {
  return new Promise((resolve, reject) => {
    for (let attempts = 1; attempts <= retires; attempts++) {
      new Promise((resolve, reject) => {
        // make api call
        reject(err);
      })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          console.log(err);
          new Promise((resolve, reject) => {
            setTimeout(resolve, delay, "increment attempts");
          }).then((res) => {
            attempts++;
          });
        });
    }
  });
}

RetryWithExponentialBackOff()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

//   this doesn't work we need to use recursion
