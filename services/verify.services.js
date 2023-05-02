const {generateToken} = require("../utils/token")
const bcrypt = require('bcrypt');
const {login} = require('../repository/verify.repository')

exports.postLogin = async (req, res) => {
  const { user, password } = req.body;
  try {
    const result = await login(user, password);
    if (!result.userExists) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, result.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Porfavor de verificar la contraseña' });
    }

    const token = generateToken(result.id);
    return res.json({message: 'Su token es: ', token });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }
};
