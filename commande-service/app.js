const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 9001;
const mongoose = require("mongoose");
const Commande = require("./commande");


const axios = require('axios');

    mongoose.set('strictQuery', true);

    mongoose.connect(
        "mongodb://127.0.0.1:27017/commande",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            () => {
                console.log(`Connected to mongodb://127.0.0.1:27017/commande`);
            }
    );
app.use(express.json());

function prixTotal(produits) {
    let total = 0;
    for (let t = 0; t < produits.length; t++) {
        total += produits[t].prix;
    }
    // console.log("Total Prix:" + total);
    return total;
}

async function httpRequest(ids) {
        try {
            const URL = "http://localhost:9000/produits/acheter";
            const response = await axios.post(URL, { ids: ids }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response.data);
        return prixTotal(response.data);
    } catch (error) {
        console.error(error);
    }
}

app.post("/commande/ajouter", async (req, res, next) => {
    const { ids, email_utilisateur } = req.body;
    httpRequest(req.body.ids)
    .then(total => {
        const newCommande = new Commande({
            // ids,email_utilisateur: email_utilisateur,prix_total: 555,
            produits : ids ,email_utilisateur: email_utilisateur,prix_total: total,
        } 
    ); 
    
    newCommande.save()
        .then(commande => res.json(commande))
        .catch(error => res.status(400).json({ error }));
        });
    });

app.get("/commande/all", async (req, res, next) => {
    Commande.find({})
        .then(produit => res.json(produit))
        .catch(err => res.status(400).json(err));
});

app.delete("/commande/deleteAll", async (req, res, next) => {
    Commande.deleteMany({},{})
        .then(produit => res.json(produit))
        .catch(err => res.status(400).json(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} => http://localhost:9001/`);
});
    