const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
async function getUser() {
    const res=await fetch(`http://localhost:3000/api/getuser/${id}`);
    const user=await res.json();
    if(user.profile)
        document.getElementById("profile").src=user.profile;
    document.getElementById("username").textContent=user.username;
    document.getElementById("email").textContent=user.email;
    document.getElementById("place").textContent=user.place;
    document.getElementById("address").textContent=user.address;
    document.getElementById("pincode").textContent=user.pincode;
    document.getElementById("phone").textContent=user.phone;
    document.getElementById("edit").innerHTML=`<button ><a href="../pages/edit.html?id=${user._id}">Edit Profile</a></button>`
}
getUser();
function logout() {
    localStorage.removeItem("Auth");
    window.location.href="../pages/signin.html"
}