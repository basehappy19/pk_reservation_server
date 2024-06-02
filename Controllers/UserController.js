const User = require("../Models/UserModel");

exports.listUser = async (req, res) => {
  try {
    const users = await User.findAll();
    const userData = users.map((user) => ({
      id: user.id,
      username: user.username,
      name: user.name,
      canManageUsers: user.canManageUsers,
    }));

    res.status(200).send(userData);
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((e) => e.message)
      : [error.message];
    res.status(500).json({
      message: "listUser Error",
      errors: errorMessages,
    });
  }
};

exports.EditUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const currentUser = await User.findOne({ where: { id: userId } });
    if (currentUser) {
      const user = req.body;
      const userData = {
        username:
          user.username !== undefined ? user.username : currentUser.username,
        name: user.name !== undefined ? user.name : currentUser.name,
        password:
          user.password !== undefined ? user.password : currentUser.password,
        canManageUsers:
          user.canManageUsers !== undefined
            ? user.canManageUsers
            : currentUser.canManageUs,
      };
      await User.update(userData, { where: { id: currentUser.id } });

      res.status(200).json({
        message: "แก้ไขผู้ใช้สำเร็จ",
        type: "success",
      });
    } else {
      res.status(200).json({
        message: "ไม่พบผู้ใช้นี้",
        type: "error",
      });
    }
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((e) => e.message)
      : [error.message];
    res.status(500).json({
      message: "แก้ไขผู้ใช้ไม่ได้",
      errors: errorMessages,
    });
  }
};

exports.RemoveUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const removeUser = await User.destroy({ where: { id: userId } });
    res.json({ message: "ลบผู้ใช้สำเร็จ", type: "success" });
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((e) => e.message)
      : [error.message];
    res.json({
      message: "RemoveUser Error",
      errors: errorMessages,
    });
  }
};
