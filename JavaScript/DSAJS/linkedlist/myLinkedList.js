// class Node {
//     constructor(value) {
//         this.value = value;
//         this.next = null;
//     }
// }

// class MyLinkedList {
//     constructor() {
//         this.head = null;
//         this.size = 0;
//     }
// }
function Node(value) {
  this.value = value;
  this.next = null;
}
function MyLinkedList() {
  this.head = null;
  this.size = 0;
}

// MyLinkedList.prototype.addAtHead=addAtHead

// function addAtHead(val) {
//   let node = new Node(val);
//   node.next=this.head
//   this.head = node;
//   this.size++;
// }

MyLinkedList.prototype.addAtHead = function (val) {
  let node = new Node(val);
  if (this.head == null) {
    this.head = node;
  } else {
    node.next = this.head;
    this.head = node;
  }
  this.size++;
};
MyLinkedList.prototype.addAtTail = function (val) {
  let newnode = new Node(val);
  if (!this.head) {
    this.head = newnode;
  } else {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newnode;
  }
  this.size++;
};
MyLinkedList.prototype.addAtIndex = function (index, val) {
  let newnode = new Node(val);
  if (index < 0 && index > this.size) {
    return;
  }
  if (index == 0) {
    this.addAtHead(val);
    return;
  }
  if (index == this.size) {
    this.addAtTail(val);
    return;
  }
  let current = this.head;
  for (let i = 0; i < index - 1; i++) {
    current = current.next;
  }
  newnode.next = current.next;
  current.next = newnode;
};
let mylist = new MyLinkedList();
mylist.addAtHead(5);
console.log(mylist);
