const verifyPermissions = (role) => {
  return (req, res, next) => {
    if (req.user.role == role) {
      next();
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  };
};

export default verifyPermissions;
