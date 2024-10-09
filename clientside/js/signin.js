document.getElementById("signin").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    fetch("http://localhost:3000/api/signin",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
    }).then(async (res)=>{
        console.log(res);
        if(res.status==200){
            const result= await res.json();
            console.log(result);
            localStorage.setItem("Auth",result.token)
            alert(result.msg)
            console.log(res);        
            window.location.href="../index.html"
        }
        else if(res.status==404){
            alert("error")
        }
        else{
            alert("error")
        }
        
    }).catch((error)=>{
        console.log(error);
        
    });
})