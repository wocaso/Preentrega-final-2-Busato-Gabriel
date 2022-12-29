const admin = require("firebase-admin");

const serviceAccount = require("../fbDB/fb2dapreentrega-firebase-adminsdk-gsdwz-97e987c829.json");
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

class firebaseProductContainer{
    constructor(collectionProd, serviceAccount, collectionCart) {
        this.collectionProd = collectionProd;
        this.collectionCart = collectionCart;
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        this.db = admin.firestore();
      }

      async getAll() {
        try {
          const query = this.db.collection(this.collectionProd);
          const coll = await query.get();
          let listado = [];
          let individual = {};
          coll.forEach(doc=>{
            individual = doc.data()
            listado.push(individual);
        })
        return listado;
        } catch (error) {
          console.log(error);
        }
      }

      async getById(id) {
        
        try {
            const query = this.db.collection(this.collectionProd);
            let data = await query.doc(id).get();
            let newData = data.data();
            return newData;
        } catch (error) {
          console.log(error);
        } finally {
        }
      }


      async addNew(producto) {
        try {
          const query = this.db.collection(this.collectionProd);
          await query.add({...producto,timeStamp:getDate()});
          return {ok: "ok"}
        } catch (error) {
          console.log(error);
        } finally {
        }
      }


      async changeById(id, newObject) {
        try {
          const query = this.db.collection(this.collectionProd).doc(id);
          return await query.update(newObject);
        } catch (error) {
          console.log(error);
        }
      }

      async deleteById(id) {
        try {
            const doc = this.db.collection(this.collectionProd).doc(id);
            return await doc.delete();
          } catch (error) {
            console.log(error);
          } finally {
          }
      }
      
      async getAllCart() {
        try {
          const query = this.db.collection(this.collectionCart);
          const coll = await query.get();
          let listado = [];
          let individual = {};
          coll.forEach(doc=>{
            individual = doc.data()
            listado.push(individual);
        })
        return listado;
        } catch (error) {
          console.log(error);
        }
      }
      async addNewCart(cartId) {
        try {
          const query = this.db.collection(this.collectionCart);
          await query.add({id: cartId,timeStamp:getDate(), productos:[]});
          return {ok: "ok"}
        } catch (error) {
          console.log(error);
        } finally {
        }
      }
      async getByIdCart(id) {
        
        try {
            const query = this.db.collection(this.collectionCart);
            let data = await query.doc(id).get();
            let newData = data.data();
            return newData;
        } catch (error) {
          console.log(error);
        } finally {
        }
      }

      async addProductToCart(id,producto){
        try {
            const query = this.db.collection(this.collectionCart);
            let data = await query.doc(id).get();
            let newData = data.data();
            newData.productos.push(producto)
            let olddata = await query.doc(id).set(newData);
            return olddata;
        } catch (error) {
          console.log(error);
        } finally {
        }
      }
      async deleteProductByIdCart(id, productName) {
        try {
            const query = this.db.collection(this.collectionCart);
            let data = await query.doc(id).get();
            let newData = data.data();
            let i = 0;
            while(newData.productos[i] != undefined){
                if(newData.productos[i].nombre === productName){
                    newData.productos.splice(i, 1)
                    break;
                }
                i++;
            }
            let olddata = await query.doc(id).set(newData);
            return olddata;
        } catch (error) {
          console.log(error);
        } finally {
        }}

        async deleteByIdCart(id) {
            try {
                const doc = this.db.collection(this.collectionCart).doc(id);
                return await doc.delete();
              } catch (error) {
                console.log(error);
              } finally {
              }
          }
}



module.exports = {firebaseProductContainer};