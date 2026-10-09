// npx is a command-line tool that comes with npm

// Difference Between npx and npm:
// npm is used to install and manage packages.

// npx is used to execute packages, especially those that are not installed globally

// *******************
// If a package is installed locally in your project's node_modules, npx can run it directly without specifying the full path.
// How It Works:
// When you run npx <package>, it checks if the package is installed locally. If not, it downloads the package temporarily, executes it, and then removes it.