import { Schema, model } from "mongoose";

const productoSchema = new Schema({
    nombreProducto: {
        type: String,
        require: true,
    },
    precio: {
        type: Number,
        require: true,
    },
    categoria: {
        type: String,
        require: true,
    },
    tipo: {
        type: String,
        require: true,
    },
    cantidad: {
        type: Number,
        require: true,
    },
    existencia: {
        type: Boolean,
        require: true,
    },
    porAgotarce: {
        type: Boolean,
        require: true,
    },
    codeBar: {
        type: String,
        require: true,
    },
    codeBar: {
        type: String,
        require: true,
    },
    imagen: {
        type: String,
        require: true,
    },
});

export default model("productos", productoSchema);
