const express = require("express");
const mongoose = require("mongoose");
const {URLproductos, URLcarritos, PORT} = require("./config.js")
const  {productos, carritos}  = require("./models/modelsMongoose.js");
const app = express();
const {Router} = express;

const routerProductos = new Router();
const routerCarrito = new Router();
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.use(express.json());
const {MongooseContainer} = require("./containers/mongooseContainer.js")
const {MongooseCartContainer} = require("./containers/mongooseContainer.js")
const mongooseDB = new MongooseContainer(URLproductos, productos);
const mongooseCartDB = new MongooseCartContainer(URLcarritos, carritos);

const serviceAccount = require("./fbDB/fb2dapreentrega-firebase-adminsdk-gsdwz-97e987c829.json");
const {firebaseProductContainer, firebaseCartContainer} = require("./containers/firesbaseContainer.js")
const firebaseDB = new firebaseProductContainer("productos", serviceAccount,"carritos")
// const firebaseCartDB = new firebaseCartContainer("carritos", serviceAccount)

app.listen(PORT, () => console.log("Servidor escuchando en el puerto "+PORT));





//==================================================================================================================================================================//
//MONGOOSE
//==================================================================================================================================================================//
// //Traer todos los productos.
// routerProductos.get("/", async (req, res) => {
//     let listaProductos = await mongooseDB.getAll()
//     return res.status(200).json(listaProductos);
    
    
//   });

// //Traer un producto por Id.
// routerProductos.get("/:id", async (req, res) => {
//     const  id = req.params.id;
//     let producto = await mongooseDB.getById(id)
//     return res.status(200).json(producto);
//   });



// // Agregar un producto
//   const ejemploProducto = {
//     nombre: "Pokebola",
//     codigo: "HGGG",
//     fotoUrl: "https://cdn2.iconfinder.com/data/icons/appliance-electronic-vol-2/512/vacuum_cleaner_hoover_appliance-512.png",
//     precio: 3000,
//     stock: 20,
//     id: "5"
//   }
//   routerProductos.post("/", async (req, res) => {
//     const addedProducto = await mongooseDB.addNew(ejemploProducto)
//     return res.status(201).json(addedProducto);
//   });


// //Cambiar un producto por su Id
// routerProductos.put("/:id", async (req, res) => {
//     const  id = req.params.id;
//     const updatedProducto = await mongooseDB.changeById(id, ejemploProducto);
//     return res.status(200).json({ok: "ok"});
//   });

// //Eliminar un producto por su Id
//   routerProductos.delete("/:id", async (req, res) => {
//     const  id = req.params.id;
//     let deletedProducto = await mongooseDB.deleteById(id)
//     return res.status(200).json(deletedProducto);
//   });
// //==================================================================================================================================================================//


// //Mostrar todos los carritos
// routerCarrito.get("/", async (req, res) => {
//     let listaProductos = await mongooseCartDB.getAll()
//     return res.status(200).json(listaProductos);
//   });

// //Mostrar carrito por id.
//   routerCarrito.get("/:id", async (req, res) => {
//     const  id = req.params.id;
//     let carrito = await mongooseCartDB.getById(id)
//     return res.status(200).json(carrito);
//   });


// //Agregar un carrito nuevo.
// routerCarrito.post("/:id", async (req, res) => {
//   const  id = req.params.id;
//   let carrito = await mongooseCartDB.addCart(id)
//   return res.status(200).json(carrito);
// });

// //Agregar un producto a un carrito.
// routerCarrito.put("/:id/productos/:idprod", async (req, res) => {
//   const  id = req.params.id;
//   const  idprod = req.params.idprod;
//   let producto = await mongooseDB.getById(idprod);
//   let carrito = await mongooseCartDB.addProductToCart(id, producto)
//   return res.status(200).json(carrito);
// });

// //Eliminar un carrito por su Id.
// routerCarrito.delete("/:id", async (req, res) => {
//   const  id = req.params.id;
//   let carrito = await mongooseCartDB.deleteById(id)
//   return res.status(200).json(carrito);
// });


// //Eliminar un producto de un carrito ambos por su id.
// routerCarrito.delete("/:id/productos/:idProducto", async (req, res) => {
//   const  id = req.params.id;
//   const  idProducto = req.params.idProducto;
//   let carrito = await mongooseCartDB.deleteProductById(id, idProducto)
//   return res.status(200).json(carrito);
// });
//==================================================================================================================================================================//
//FIREBASE
//==================================================================================================================================================================//
// Traer todos los productos.
routerProductos.get("/", async (req, res) => {
  let listaProductos = await firebaseDB.getAll()
  return res.status(200).json(listaProductos);
});


//------------------------------------------------//
let ejemploIdProducto = ["Wix7qY2lHzLAx2kA1WSn","scfvPtm11LHxxbPXwEQc","vPvhMi3MhDeHYswrVJXI"]


//------------------------------------------------//

//Traer un producto por Id de firebase.
routerProductos.get("/:id", async (req, res) => {
    const  id = req.params.id;
    let producto = await firebaseDB.getById(id)
    return res.status(200).json(producto);
  });

//Agregar un producto
const ejemploProducto = {
  nombre: "Heladera",
  codigo: "HGGG",
  fotoUrl: "https://cdn2.iconfinder.com/data/icons/appliance-electronic-vol-2/512/vacuum_cleaner_hoover_appliance-512.png",
  precio: 3000,
  stock: 20,
  id: "11"
}
routerProductos.post("/", async (req, res) => {
  const addedProducto = await firebaseDB.addNew(ejemploProducto)
  return res.status(201).json(addedProducto);
});


// //Cambiar un producto por su Id de firebase
routerProductos.put("/:id", async (req, res) => {
    const  id = req.params.id;
    const updatedProducto = await firebaseDB.changeById(id, ejemploProducto);
    return res.status(200).json({ok: "ok"});
  });

// //Eliminar un producto por su Id de firebase
  routerProductos.delete("/:id", async (req, res) => {
    const  id = req.params.id;
    let deletedProducto = await firebaseDB.deleteById(id)
    return res.status(200).json(deletedProducto);
  });
//==================================================================================================================================================================//
//Traer todos los carritos.
routerCarrito.get("/", async (req, res) => {
  let producto = await firebaseDB.getAllCart()
  return res.status(200).json(producto);
});

//Crear un carrito nuevo.
routerCarrito.post("/", async (req, res) => {
  let producto = await firebaseDB.addNewCart(3)
  return res.status(200).json(producto);
});


//------------------------------------------------//
let ejemploIdCarrito = ["aO9WmQnoiVq7Q03ZMO62","cAS90LObqk2O5vtPHoJe","k6ZG36Nqg3PjpvwTg7wA"]
//------------------------------------------------//
//Mostrar un carrito por su id de firebase.
routerCarrito.get("/:id", async (req, res) => {
  const  id = req.params.id;
  let producto = await firebaseDB.getByIdCart(id)
  return res.status(200).json(producto);
});



//Agregar un producto a un carrito.
routerCarrito.post("/:id/productos/:idprod", async (req, res) => {
  const  id = req.params.id;
  const  idprod = req.params.idprod;

  let producto = await firebaseDB.getById(idprod)
  console.log(producto);
  let newProducto = await firebaseDB.addProductToCart(id, producto)
  return res.status(200).json(newProducto);
});


// //Eliminar un producto de un carrito por su Id de firebase y nombre del producto.
routerCarrito.delete("/:id/productos/:nomProd", async (req, res) => {
  const  id = req.params.id;
  const  nomProd = req.params.nomProd;
  let deletedProducto = await firebaseDB.deleteProductByIdCart(id, nomProd)
  return res.status(200).json(deletedProducto);
});


//Eliminar un carrito por su Id de firebase.
routerCarrito.delete("/:id", async (req, res) => {
  const  id = req.params.id;
  let carrito = await firebaseDB.deleteByIdCart(id)
  return res.status(200).json(carrito);
});
//==================================================================================================================================================================//


