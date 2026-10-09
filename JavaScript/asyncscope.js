function delayedLogger() {
    let message = 'Hello, World!';
    setTimeout(function() {
        console.log(message);  // Outputs: Hello, World!
    }, 100);
}

delayedLogger();