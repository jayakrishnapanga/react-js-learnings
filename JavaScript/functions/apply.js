let user = {
  name: "krishna",
  age: 30,
  no: 8688185874,
};
let realuser = {
  name: "suresh",
  age: 40,
  display: function () {
    console.log(this.name);
    console.log(this.age);
    // setTimeout(() => {
    //   console.log(this.name);
    //   console.log(this.age);
    // }, 1000);
    setTimeout(function () {
      console.log(this.name);
      console.log(this.age);
    }, 1000);
  },
};

realuser.display();

realuser.display.apply(user);
realuser.display.call(user);



function greet(city, country) {
  console.log(this.name, city, country);
}

const user2 = { name: "Krishna" };

greet.call(user2, "Hyderabad", "India");
greet.apply(user2, ["Hyderabad", "India"]);
