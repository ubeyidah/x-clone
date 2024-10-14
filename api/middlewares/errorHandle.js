const handleError = (error, req, res, next) => {
  console.log("Errors: " + error);
  res
    .status(error.status || 5000)
    .json({ message: error.message || "Internal server error." });
};

export default handleError;
