// Ascending numbers
array.sort((a, b) => a - b);

// Descending numbers
array.sort((a, b) => b - a);

// Ascending strings (case-sensitive)
array.sort((a, b) => a.localeCompare(b));

// Sort by object property
array.sort((a, b) => a.propertyName - b.propertyName);