
//========================================================
//following code is just for testing purposes, to test the database connection.
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

export default {
  createUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = new User({ name, email });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true });
      if (!user) return res.status(404).send('User not found');
      res.json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).send('User not found');
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

//========================================================
