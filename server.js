const admin = require("firebase-admin");

const serviceAccount = require("./fbDB/fb2dapreentrega-firebase-adminsdk-gsdwz-97e987c829.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();


const query = db.collection("productos")
const todosloscolores = async ()=>{
    const coll = await query.get()
    coll.forEach(doc=>{
        console.log(doc.data())
    })
    
} 

todosloscolores();
