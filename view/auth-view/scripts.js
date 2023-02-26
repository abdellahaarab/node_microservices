

const email = document.getElementById("Email");
const password = document.getElementById("Password");
const login = document.getElementById("login");


login.addEventListener('click',e => {
    // e.preventDefault();
    fetch('http://localhost:9002/auth/login',{
        method: "POST",
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
