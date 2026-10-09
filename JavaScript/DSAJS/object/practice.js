let obj = {
  name: "suresh",
  age: 50,
  hobbies: ["playing", "cricket", "rummy"],
};

console.log("obje", obj);
console.log("keys", Object.keys(obj));
console.log("values", Object.values(obj));
console.log("entires", Object.entries(obj));

console.log(obj["name"]);
obj = { ...obj, name: "mahesh" };
console.log("this is after update ", obj);
console.log(Object.hasOwn(obj, "name"));

peers = {
  ["1234567"]: {
    name: "krishna",
    role: "bot",
  },
  ["1234568"]: {
    name: "krishna",
    role: "bot",
  },
};

console.log(peers);
peers = { ...peers, [1234568]: { ...peers[1234568], name: "mahesh" } };

console.log("updated peers", peers);
console.log(Object.values(peers))
console.log(Object.entries(peers))
