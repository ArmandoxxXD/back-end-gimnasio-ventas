import { Schema, model } from "mongoose";

const corteDiarioSchema = new Schema({
  totalEfectivo: {
    type: Number,
  },
  totalPaypal: {
    type: Number,
  },
  total: {
    type: Number,
    require: true,
  },
  fecha: {
    type: Date,
    require: true,
  },
});

export default model("corteDiario", corteDiarioSchema);