const User = require("../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { username, password, fname, lname, image } = req.body;

    if (req.file) {
      var projectimage = req.file.filename;
    } else {
      var projectimage = "none";
    }
    //add password
    const encrypt = await bcrypt.hashSync(password, 10);

    var arrayPassword = [];
    arrayPassword.push(encrypt);

    const user = await User.create({
      username: username,
      password: arrayPassword,
      fname: fname,
      lname: lname,
      image: image,
      image: projectimage,
    });

    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  if (!req.user) {
    return res.status(500).send("Not found user");
  }

  const user = await User.findById(req.user.user_id).select("-password");

  res.status(200).json({ user });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    // console.log(user);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password[0]
      );
      console.log(isPasswordCorrect);

      if (isPasswordCorrect) {
        const token = jwt.sign(
          { user_id: user._id, username },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({ token });
      } else {
        res.status(500).send({ message: "Password is incorrect" });
      }
    } else {
      res.status(500).send({ message: "Username is incorrect" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

exports.updataUser = async (req, res) => {
  var { username, password, fname, lname } = req.body;

  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      res.status(500).send({ message: "User is not found" });
    }

    if (!username) username = user.username;

    var arrayPassword = [];
    if (!password) {
      arrayPassword = user.password;
    } else {
      const encrypt = await bcrypt.hashSync(password, 10);
      arrayPassword = user.password;
      arrayPassword.unshift(encrypt);
      if (arrayPassword.length > 6) arrayPassword.pop();
    }
    if (!fname) fname = user.fname;
    if (!lname) lname = user.lname;

    const update = await User.findByIdAndUpdate(req.user.user_id, {
      username: username,
      password: arrayPassword,
      fname: fname,
      lname: lname,
    });

    res.status(200).send("Update successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

exports.updateImageUser = async (req, res) => {
  console.log(req.file);
  if (req.file) {
    try {
      const updateImage = await User.findByIdAndUpdate(req.user.user_id, {
        image: req.file.filename,
      });

      res.status(200).send({ message: "Update image successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  } else {
    res.status(500).send({ message: "Not found Image" });
  }
};
exports.updateUser2 = async (req, res) => {
  console.log('form user controller');
  var { username, password, fname, lname } = req.body;

  if (req.file) {
    var image = req.file.filename;
  } else {
    var image = "";
  }

  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      res.status(500).send({ message: "User is not found" });
    }

    if (username) {
      if (username !== user.username) {
        const user = await User.findOne({ username: req.body.username });
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
        if (user) {
          return res.status(400).send({
            message: "Username is already exist",
          });
        }
      }
    }

    var arrayPassword = [];
    if (!password || password===undefined || password.length<6 ||password ==="undefined") {
      arrayPassword = user.password;
    } else {
      const encrypt = await bcrypt.hashSync(password, 10);
      arrayPassword = user.password;
      arrayPassword.unshift(encrypt);
      if (arrayPassword.length > 6) arrayPassword.pop();
    }
    if (!fname) fname = user.fname;
    if (!lname) lname = user.lname;

    if (!image) image = user.image;

    const update = await User.findByIdAndUpdate(req.user.user_id, {
      username: username,
      password: arrayPassword,
      fname: fname,
      lname: lname,
      image: image,
    });

    res.status(200).send({message:"Update successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
exports.updateData = (req, res) => {
  console.log(req);
  res.send(req.body);
};

