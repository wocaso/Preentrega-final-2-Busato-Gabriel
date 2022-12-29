const mongoose = require("mongoose");
const  {productos, carritos}  = require("../models/modelsMongoose.js");
function getDate() {
  let fullDate = new Date();
  let date =
    fullDate.getDate() +
    "/" +
    (fullDate.getMonth() + 1) +
    "/" +
    fullDate.getFullYear() +
    " " +
    fullDate.getHours() +
    ":" +
    (fullDate.getMinutes() >= 10 ?
      fullDate.getMinutes() :
      "0" + fullDate.getMinutes());
  return date;
}

class MongooseContainer{
    constructor(collection, model) {
        this.collection = collection;
        this.model = model;
      }


      async #connectDB() {
        return mongoose.connect(this.collection, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }
    
      async #disconnectDB() {
        await mongoose.disconnect();
      }


    async getAll(){
        try{
            await this.#connectDB()
            const allProductos = await this.model.find();
            return allProductos; 
        }catch(error){
            console.log(error)
        }finally {
          await this.#disconnectDB();
        }
        
    }

    async getById(id){  
        try{
          await this.#connectDB()
            const producto = await this.model.find({id: id});
            return producto
        }catch(error){
            console.log(error)
        }finally {
            await this.#disconnectDB();
          }
        
    
    }

    async addNew(Producto){
        
        try{
          await this.#connectDB()
            const newProducto = new this.model({...Producto,timeStamp:getDate()});
            const insertedProducto = await newProducto.save();
            return insertedProducto;
        }catch(error){
            console.log(error)
        }finally {
            await this.#disconnectDB();
          }
    }

    async changeById(id, Producto){
        
        try{
          await this.#connectDB()
            await productos.updateOne({id: id}, Producto);
            const updatedProducto = await this.model.find({id: id});
            return updatedProducto;
        }catch(error){
            console.log(error)
        }finally {
            await this.#disconnectDB();
          }
    }

    async deleteById(id){
        try{
          await this.#connectDB()
            const deletedProducto = await this.model.deleteOne({id: id});
            return deletedProducto;
        }catch(error){
            console.log(error)
        }finally {
            await this.#disconnectDB();
          }
        
    }

}


//============================================================================================================================================================//

class MongooseCartContainer{
    constructor(collection, model) {
        this.collection = collection;
        this.model = model;
      }


      async #connectDB() {
        return mongoose.connect(this.collection, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }
    
      async #disconnectDB() {
        await mongoose.disconnect();
      }


    async getAll(){
        try{
            await this.#connectDB()
            const allProductos = await carritos.find();
            return allProductos; 
        }catch(error){
            console.log(error)
        }finally {
            await this.#disconnectDB();
          }
        
    }

    async getById(id){  
      try{
        await this.#connectDB()
          const carrito = await this.model.findOne({id: id});
          return carrito
      }catch(error){
          console.log(error)
      }finally {
          await this.#disconnectDB();
        }
      
  
  }

  async addCart(id){
    try{
      await this.#connectDB()
      const newCarrito = new this.model({id: id, timeStamp: getDate(),productos:[]})
      await newCarrito.save()
        return newCarrito;
    }catch(error){
        console.log(error)
    }finally {
        await this.#disconnectDB();
      }
}


async addProductToCart(id, productToAdd){
  try{
    await this.#connectDB()
    let carrito = await this.model.updateMany({id: id},{
      $push: {productos:productToAdd}
  })
  return carrito;
  }catch(error){
      console.log(error)
  }finally {
      await this.#disconnectDB();
    }
}

async deleteById(id){
  try{
    await this.#connectDB()
      const deletedCarrito = await this.model.deleteOne({id: id});
      return deletedCarrito;
  }catch(error){
      console.log(error)
  }finally {
      await this.#disconnectDB();
    }
  
}

async deleteProductById(id, idProducto){
  try{
    await this.#connectDB()
      const deletedCarrito = await this.model.updateOne({id: id},{ $pull: { productos: {id:idProducto} } });
      return deletedCarrito;
  }catch(error){
      console.log(error)
  }finally {
      await this.#disconnectDB();
    }
  
}

}
//============================================================================================================================================================//
module.exports = {MongooseContainer, MongooseCartContainer}