import { ConnectionOptions } from 'mongoose';

export const dbConfig: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};
