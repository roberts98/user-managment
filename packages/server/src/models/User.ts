import mongoose, { Document, Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { JWT_SECRET } from '../config/jwt';

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  surname: string;
  birthday: string;

  generateAuthToken(): string;
}

interface IUserModel extends Model<IUser> {
  findByCredentials(username: string, password: string): Promise<IUser>;
}

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

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = sign({ id: user._id.toString() }, JWT_SECRET);

  return token;
};

userSchema.statics.findByCredentials = async (
  username: string,
  password: string
) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Unable to login');
  }

  const doesPasswordMatch = await compare(password, user.password);

  if (!doesPasswordMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.pre<IUser>('save', async function () {
  const user = this;

  if (user.isModified('password')) {
    user.password = await hash(user.password, 8);
  }
});

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
