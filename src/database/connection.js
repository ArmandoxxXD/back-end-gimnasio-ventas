import { connect } from "mongoose";
import {set} from "mongoose";

set('strictQuery', true);
(async () => {
  try {
    const db = await connect(
      // Docker
      "mongodb://admin:admin123@mongo:27017/integradora?authSource=integradora"
      // MongoAtlas
      // "mongodb+srv://usuario:2Ar8003593.@integradora-cluster.ctblcx9.mongodb.net/integradora"
    );
    console.log("Conecction From", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();



