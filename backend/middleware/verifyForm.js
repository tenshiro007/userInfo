const User = require("../models/user");
var bcrypt = require("bcryptjs");

checkDuplicateUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    return res.status(400).send({
      message: "Username is already exist",
    });
  }
  next();
};

checkVerifyUser = async (req, res, next) => {
  const { username, password, fname, lname } = req.body;

  if (!username) {
    return res.status(400).send({
      message: "Username is required",
    });
  }

  if (!username.match(/^[A-Za-z0-9_.]+$/)) {
    return res.status(400).send({
      message:
        "Username should be alphabet characters (A-Z or a-z) or numbers (0-9) or _",
    });
  }

  if (username.length > 12) {
    return res.status(400).send({
      message: "Username should not more than 12 character",
    });
  }
  if (!password) {
    return res.status(400).send({
      message: "Password is required",
    });
  }

  if (password.length < 6) {
    return res.status(400).send({
      message: "Password should more than 6",
    });
  }

  if (!checkSequential(password)) {
    return res.status(400).send({
      message: "Password should not be a sequence of letters or numbers.",
    });
  }
  if (!fname) {
    return res.status(400).send({
      message: "First name is required",
    });
  }
  if (!lname) {
    return res.status(400).send({
      message: "Last name is required",
    });
  }

  next();
};

checkSequential = (s) => {
  // Check for sequential numerical characters
  for (var i in s) {
    if (+s[+i + 1] == +s[i] + 1) return false;
    if (+s[+i + 1] + 1 == +s[i]) return false;
  }

  // Check for sequential alphabetical characters
  for (var i in s) {
    if (String.fromCharCode(s.charCodeAt(i) + 1) == s[+i + 1]) return false;
    if (String.fromCharCode(s.charCodeAt(i) - 1) == s[+i + 1]) return false;
  }

  return true;
};

checkVerifyLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username) {
    return res.status(400).send({
      message: "Username is required",
    });
  }
  if (!password) {
    return res.status(400).send({
      message: "Password is required",
    });
  }

  next();
};

checkUpdate = async (req, res, next) => {
  console.log("from update middleware");
  try {
    const { username, password, fname, lname } = req.body;

    console.log(password);

    if(password!=="undefined"){
      if (password.length < 6) {
        return res.status(400).send({
          message: "Password should more than 6",
        });
      }

      if (!checkSequential(password)) {
        return res.status(400).send({
          message: "Password should not be a sequence of letters or numbers.",
        });
      }

      const newPassword = password;
      const user = await User.findById(req.user.user_id);

      var arrayPassword = user.password;
      for (i = 0; i < arrayPassword.length; i++) {
        if (await bcrypt.compare(newPassword, user.password[i])) {
          return res.status(400).send({
            message:
              "Password should not be the same of your old password (last 5 time)",
          });
        }
      }
    }
    
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = {
  checkVerifyUser,
  checkDuplicateUser,
  checkVerifyLogin,
  checkUpdate,
};
