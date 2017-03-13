if (process.env.NODE_ENV === 'production') {
  Promise.config({
    // Enable warnings
    warnings: false,
    // Enable long stack traces
    longStackTraces: false,
    // Enable cancellation
    cancellation: true,
    // Enable monitoring
    monitoring: false
});
} else {
   Promise.config({
    warnings: true,
    longStackTraces: true,
    cancellation: true,
    monitoring: true
});
}


