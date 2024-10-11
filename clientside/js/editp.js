const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
let images=[];
let sellerId;
async function getProduct() {
    const res=await fetch(`http://localhost:3000/api/getproduct/${id}`);
    const product=await res.json();
    images=product.images;
    document.getElementById("pname").value=product.pname;
    document.getElementById("category").value=product.category;
    document.getElementById("price").value=product.price;
    document.getElementById("description").innerText=product.description;
    sellerId=product.sellerId;
    product.images.map((image)=>{
        const data=document.createElement("img");
        data.src=image;
        document.getElementById("pro").appendChild(data);
    })
}
getProduct();

document.getElementById("editp").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const pname=document.getElementById("pname").value;
    const price=parseInt(document.getElementById("price").value);
    const category=document.getElementById("category").value;
    const description=document.getElementById("description").value;
    fetch(`http://localhost:3000/api/editproduct/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({pname,price,category,description,sellerId,images})
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