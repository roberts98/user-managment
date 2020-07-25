import { connect } from 'mongoose';

import { dbConfig } from '../config/database';

export async function createConnection() {
  return connect('mongodb://127.0.0.1:27017/felg', dbConfig);
}
