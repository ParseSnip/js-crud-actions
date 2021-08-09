var express = require("express");
var router = express.Router();

// module.exports = function (db) {
//   router.get('/products', (req, res)=>{
//     res.send(db.get('products').value())
//   })

//   router.post('/products', (req, res)=>{
//     const newProduct = req.body
//     res.send(db.get('products').insert(newProduct).write())
//   })

//   router.patch('/products/:id', (req, res)=>{
//       res.send(db.get('products').find({id: req.params.id}).assign(req.body).write())
//   })

//   router.get('/products/:id', (req, res)=>{
//     res.send(db.get('products').find({id: req.params.id}).value())
// })

// router.delete('/products/:id', (req, res)=>{
//   db.get('products').remove({id:req.params.id}).write()
//   res.status(204).send()
// })

//   return router;
// };

module.exports = function (db) {
  //chain the REST action to the router.route then you do not need to repass the same routes 
  router.route('/products')
   .get( (req, res)=>{
    res.send(db.get('products').value())
  })
  .post((req, res)=>{
    const newProduct = req.body
    res.send(db.get('products').insert(newProduct).write())
  })

  router.route('/products/:id')
  .patch((req, res)=>{
      res.send(db.get('products').find({id: req.params.id}).assign(req.body).write())
  })
  .get((req, res)=>{
     const result = db.get('products').find({id: req.params.id}).value()
     if(result){
       return res.send(result)
     }
     res.status(404).send()
})
  .delete((req, res)=>{
    //should handle improper id passed..
    let result = db.get('products').find({id:req.params.id}).value()
    if(!result){
      return res.status(404).send()
    }
     result = db.get('products').remove({id:req.params.id}).write()

    res.status(204).send()
})

  return router;
};

