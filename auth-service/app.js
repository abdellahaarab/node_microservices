const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 9002;
const mongoose = require("mongoose");

const Utilisateur = require("./utilisateur");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const cors = require('cors');

mongoose.set('strictQuery', true);
app.use(cors());
mongoose.connect(
    "mongodb://127.0.0.1:27017/auth",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () =>
        {
        console.log(`Connected to mongodb://127.0.0.1:27017/Auth`);
    }
);
app.use(express.json());

app.put("/auth/register", async (req, res) => {
    let { nom, email, mot_passe } = req.body;
    const userExists = await Utilisateur.findOne({email:email});
    if (userExists) {
        return res.json({ message: "Cet utilisateur existe déjà" });
    } else {
        bcrypt.hash(mot_passe, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({error: err });
    } else {
        mot_passe = hash;
        const newUtilisateur = new
        Utilisateur({nom,email,mot_passe});
        newUtilisateur.save()
                .then(user =>res.json(user))
                .catch(error =>res.status(400).json({ error }));
        }
    });
}
});

app.post("/auth/login", async (req, res) => {
    const { email, mot_passe } = req.body;
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
        return res.json({ message: "Utilisateur introuvable" });
    } else {
    bcrypt.compare(mot_passe, utilisateur.mot_passe)
        .then(resultat => {
        if (!resultat) {
            return res.json({ message: "Mot de passe incorrect" });
        }
        else {
            const payload = {
            email,
            nom: utilisateur.nom
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err);
                else return res.json({ token: token });
        });
        }
    });
    }
});

app.get("/auth/all", async (req, res) => {
    Utilisateur.find({})
        .then(produit => res.json(produit))
        .catch(err => res.status(400).json(err));
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT} => http://localhost:9002/`);
});
    