export const success = (type, message, data = {}) => {
  return {
    success: true,
    type,
    message,
    data,
  };
};

export const failure = (type, error) => {
  return {
    success: false,
    type,
    error,
  };
};
