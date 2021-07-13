export const response = (status, statusCode, message, data, res) => {
  if (status == true) {
    res.status(statusCode).json({
      success: true,
      message: message,
      data: data,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message:message
    });
  }
};
