module.exports = {
  created(res, message, data) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  },

  noContent(res, message) {
    return res.status(204).json({
      success: true,
      message,
    });
  },

  success(res, message, data) {
    return res.json({
      success: true,
      message,
      data,
    });
  },

  badRequest(res, error, data) {
    return res.status(400).json({
      success: false,
      message: error,
      data,
    });
  },

  error(res, error, data) {
    return res.status(500).json({
      success: false,
      message: error,
      data,
    });
  },

  unauthorized(res, error, data) {
    return res.status(401).json({
      success: false,
      message: error,
      data,
    });
  },

  notFound(res, error, data) {
    return res.status(404).json({
      success: false,
      message: error,
      data,
    });
  },

  forbidden(res, error, data) {
    return res.status(403).json({
      success: false,
      message: error,
      data,
    });
  },

  conflict(res, error, data) {
    return res.status(409).json({
      success: false,
      message: error,
      data,
    });
  },
};
