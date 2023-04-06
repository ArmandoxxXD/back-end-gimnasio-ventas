import { Schema, model } from "mongoose";

const pagoSchema = new Schema({
  productos: {
    type: Array,
    require: true,
  },
  tipoPago: {
    type: String,
    require: true,
  },
  fecha: {
    type: Date,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
});

export default model("pago", pagoSchema);
