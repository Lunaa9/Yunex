import "dotenv/config";
import { connect } from "mongoose";

/**
 * This function create the connection to the data base
 */
async function dbConnect() {
  const DB_URI = <string>process.env.DB_CONNECT;
  await connect(DB_URI);
}

export default dbConnect;
