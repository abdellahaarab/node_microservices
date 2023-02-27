

const email = document.getElementById("Email");
const password = document.getElementById("Password");
const login = document.getElementById("login");


const newuser = document.getElementById("newuser");

newuser && newuser.addEventListener('click' ,e =>{
    // e.preventDefault();
    const newNom = document.getElementById("newNom");
    const newEmail = document.getElementById("newEmail");
    const newPassword = document.getElementById("newPassword");

    fetch('http://localhost:9002/auth/register',{
        method:"PUT",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
                "nom":newNom,
                "email":newEmail,
                "mot_passe":newPassword
            })
    }).then(res=>{
        if(res.ok){
            console.log(res);
        }
    }).catch(err=>{
        console.log(err);
    })
})

login && login.addEventListener('click',e => {
    // e.preventDefault();
    fetch('http://localhost:9002/auth/login',{
        method: "POST",
        mode:'cors',
        credentials:"same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "email":email,
          "mot_passe":password 
        })
    }).then(respons =>{
        if(respons.ok){
            console.log(respons);
        }
    }).catch(err=>{
        console.log(err);
        alert('Usre not faund !!')
    })
})
