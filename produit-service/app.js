const exprees = require('express');
const app = exprees();
const PORT = process.env.PORT_ONE || 9000;
const mongoose = require('mongoose');
const Produit = require('./Produit');


app.use(exprees.json());
mongoose.set('strictQuery',true);
mongoose.connect("mongodb://127.0.0.1:27017/produit",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ()=>{
            console.log('Connected to mongodb://127.0.0.1:27017/produit');
        }
)

app.post('/produits/ajouter', (req, res,next) => {
    // const {nom, description, prix} = req.body;
    const produit = new Produit(req.body);
    produit.save()
    .then(produit => res.json(produit))
    .catch(err => res.status(400).json(err));
});


app.get('/produits/acheter', (req, res, next) => {
    const { ids} = req.body;
    Produit.find({_id : {$in : ids}})
    // Produit.findById(req.params.id)
        .then(produit => res.json(produit))
        .catch(err => res.status(400).json(err));
});


app.get('/produits/all', (req, res, next) => {
    Produit.find({})
        .then(produit => res.json(produit))
        .catch(err => res.status(400).json(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} -> http://localhost:9000/`);
});


