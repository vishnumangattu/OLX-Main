const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
let images
document.getElementById("addp").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const res=await fetch(`http://localhost:3000/api/getuser/${id}`);
    const user=await res.json();
    const pname=document.getElementById("pname").value;
    const price=parseInt(document.getElementById("price").value);
    const category=document.getElementById("category").value;
    const description=document.getElementById("description").value;
    const sellerId=id;
    const place=user.place;
    const address=user.address;
    const phone=user.phone;
    const pincode=user.pincode;
    const sellerName=user.username;
    console.log(sellerName);
    
    fetch("http://localhost:3000/api/addproduct",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({pname,price,category,description,sellerId,images,place,address,phone,pincode,sellerName})
    }).then((res)=>{
        console.log(res);
        if(res.status==201){
            alert("success")
            console.log(res);  
            window.location.href="../index.html"
        }
        else if (res.status==404){
            alert("error")
        }
        else{
            alert("error")
        }
        
    }).catch((error)=>{
        console.log(error);
        
    });
})
document.getElementById("images").addEventListener('change',(e)=>{
    const arr=Object.values(document.getElementById("images").files)
    document.getElementById("pro").textContent="";
    images=[];
    arr.map(async(i)=>{
        images.push(await convertTBase64(i));
        const data=document.createElement("img");
        data.src=await convertTBase64(i);
        document.getElementById("pro").appendChild(data);
    })
    console.log(images);
    
    // document.getElementById("pro").innerHTML=`<img src="${images}" alt="" >`
})
function convertTBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    });
}