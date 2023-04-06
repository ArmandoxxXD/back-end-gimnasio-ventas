import { connect } from "mongoose";
import {set} from "mongoose";

set('strictQuery', true);
(async () => {
  try {
    const db = await connect(
      "mongodb+srv://usuario:2Ar8003593.@integradora-cluster.ctblcx9.mongodb.net/integradora"
    );
    console.log("Conecction From", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();



