// // Create a DOM element
// const domElement = document.createElement('div');
// domElement.className = 'box';
// domElement.textContent = 'DOM Element';

// // Append to the DOM
// document.body.appendChild(domElement);


// Bad: 1000 direct DOM updates (slows down the browser)
for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);
  }


