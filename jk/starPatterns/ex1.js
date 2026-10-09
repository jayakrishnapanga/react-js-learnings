function printPattern(n) {
  for (let i = 0; i < n; i++) {
    let row='';
    for (let j = 0; j < n; j++) {
      row = row +" "+ "*";
    }
    console.log(row);
  }
}

printPattern(5);
