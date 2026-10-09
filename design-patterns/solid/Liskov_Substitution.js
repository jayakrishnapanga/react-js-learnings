/**
 * LSP with Rectangle & Square
 *
 * Your question: "No issue if we pass child?" — correct for YOUR Square below.
 * Your Square only sets width OR height. It behaves like Rectangle → both give 50.
 *
 * LSP breaks when Square MUST keep width === height (real square rule).
 */

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  setWidth(width) {
    this.width = width;
  }
  setHeight(height) {
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}

// Your version — does NOT break LSP (same behavior as Rectangle)
class Square extends Rectangle {
  setWidth(width) {
    this.width = width; // only width changes
  }
  setHeight(height) {
    this.height = height; // only height changes
  }
}

// Classic LSP violation — Square enforces equal sides
class BadSquare extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width; // changing width also changes height
  }
  setHeight(height) {
    this.width = height;
    this.height = height; // changing height also changes width
  }
}

function printArea(shape) {
  shape.setWidth(5);
  shape.setHeight(10);
  const area = shape.getArea();
  console.log(area);
  return area; // so console.log(printArea(...)) is not undefined
}

console.log('--- Your Square (no LSP issue) ---');
console.log('Rectangle:', printArea(new Rectangle(10, 20))); // 5 * 10 = 50
console.log('Square:   ', printArea(new Square(10))); // 5 * 10 = 50  ← same!

console.log('\n--- BadSquare (LSP violation) ---');
console.log('Rectangle:', printArea(new Rectangle(10, 20))); // 50
console.log('BadSquare:', printArea(new BadSquare(10))); // 10 * 10 = 100, not 50!
console.log('printArea() expected 50 for any Rectangle. BadSquare surprised us.');
