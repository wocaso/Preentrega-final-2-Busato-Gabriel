const mongoose = require("mongoose") ;

const productosCollection = "productos"

const ProductosSchema = new mongoose.Schema({
    timeStamp: String,
    nombre: String,
    codigo: String,
    fotoUrl: String,
    precio: Number,
    stock: Number,
    id: String
})

const productos = mongoose.model(productosCollection, ProductosSchema)

const carritosCollection = "carritos"

const CarritosSchema = new mongoose.Schema(
    {
        id: Number,
        timeStamp: String,
        productos: [ProductosSchema]
      }
    
)

const carritos = mongoose.model(carritosCollection, CarritosSchema)
module.exports = {productos, carritos};


