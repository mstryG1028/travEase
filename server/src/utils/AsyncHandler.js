

const AsyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      console.error(err);        // Add this
      console.error(err.stack);  // Add this
      next(err);
    });
  };
};

export default AsyncHandler;