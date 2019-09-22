process.on("message", termometer => {
  console.log("Child got message:", termometer);
  process.exit(0);
});
