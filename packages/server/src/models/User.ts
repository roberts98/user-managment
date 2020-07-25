import mongoose from 'mongoose';
import { hash } from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  birthday: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function () {
  const user = this;

  if (user.isModified('password')) {
    // @ts-ignore
    user.password = await hash(user.password, 8);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
