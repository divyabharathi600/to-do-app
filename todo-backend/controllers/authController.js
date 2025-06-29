// controllers/authController.js
const jwt = require('jsonwebtoken');

exports.googleCallback = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
};
