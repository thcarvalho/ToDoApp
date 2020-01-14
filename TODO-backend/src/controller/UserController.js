const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

function generateToken(params = {}) {
  return jwt.sign(params, process.env.TOKEN_SECRET)
}

module.exports = {
  async signup(req, res) {
    const { email } = req.body
    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'Email já Existe' });
      }
      const user = await User.create(req.body);
      return res.json({ user, token: generateToken({ _id: user._id }) });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Falha na Requisição" })
    }

  },
  async show(req, res) {
    const user = await User.find();
    return res.json(user);
  },
  async find(req, res) {
    const user = await User.findById(req.params.id);
    return res.json(user);
  },
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select('+password')
      if (!user) {
        return res.status(400).send({ error: 'Email não Existe' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).send({ error: 'Senha Incorreta' });
      }

      const token = generateToken({ _id: user._id })

      res.header('authToken', token).send({ user, token })

    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Falha na Requisição" })
    }

  },
  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(user);
  }
}