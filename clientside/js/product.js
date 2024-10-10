const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
images=[];
async function getProduct() {
    const res=await fetch(`http://localhost:3000/api/getproduct/${id}`);
    const product=await res.json();
    console.log(product.pname);
    images=product.images;
    document.getElementById("pname").innerText=product.pname;
    document.getElementById("category").innerText=product.category.toUpperCase();
    document.getElementById("price").textContent=`₹${product.price}`;
    document.getElementById("image").src=product.images[0];
    let i=0;
    product.images.map((image)=>{
        const data=document.createElement("img");
        data.src=image;
        data.setAttribute("onmouseover", `change("${image}")`);
        
        document.getElementById("prodimg").appendChild(data);
        i++;
    })
    document.getElementById("description").innerText=product.description;
    document.getElementById("sellerName").innerText=product.sellerName.toUpperCase();
    document.getElementById("phone").textContent=product.phone;
    document.getElementById("place").textContent=product.place;
    document.getElementById("address").textContent=product.address;
    document.getElementById("pincode").textContent=product.pincode;
}
getProduct();
function change(a) {
    document.getElementById("image").src=a;
}