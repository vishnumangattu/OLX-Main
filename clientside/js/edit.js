const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
let profile;
let password;
async function getUser() {
    const res=await fetch(`http://localhost:3000/api/getuser/${id}`);
    const user=await res.json();
    profile=user.profile;
    password=user.password;
    console.log(user.address);
    document.getElementById("frm").innerHTML=`
    <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${user.email}">
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value="${user.username}">
            </div>
            <div class="form-group">
                <label for="place">Place:</label>
                <input type="text" id="place" name="place" value="${user.place}">
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <textarea id="address" name="address" value="${user.address}">${user.address}</textarea>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" value="${user.phone}">
            </div>
            <div class="form-group">
                <label for="pincode">Pincode:</label>
                <input type="number" id="pincode" name="pincode" value="${user.pincode}">
            </div>
            <div class="form-group">
                <label for="profile">Profile Image:</label>
                <input type="file" id="profile" name="profile" accept="image/*" onchange="pic()">
            </div>
            <div class="pro">
                <img src="${profile}" alt="" id="pro">
            </div>
            <button type="submit">Edit</button>
    `
}
getUser();

document.getElementById("frm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const email=document.getElementById("email").value;
    const username=document.getElementById("username").value;
    const place=document.getElementById("place").value;
    const address=document.getElementById("address").value;
    const phone=parseInt(document.getElementById("phone").value);
    const pincode=parseInt(document.getElementById("pincode").value);
    fetch(`http://localhost:3000/api/edituser/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,place,profile,address,phone,pincode,password})
    }).then(async(res)=>{
        console.log(res);

        if(res.status==201){
            alert("success");
            window.location.href="../index.html"
        }
        else if(res.status==404){
            const data=await res.json();
            alert(data.msg)
        }
        else{
            alert("error")
        }
        
    }).catch((error)=>{
        console.log(error);
        
    });
})


async function pic() {
    console.log(document.getElementById("profile").files[0]);
    profile = await convertTBase64(document.getElementById("profile").files[0])
    document.getElementById("pro").src=profile

}
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