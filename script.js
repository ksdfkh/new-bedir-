let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

function addToCart(name, price){
cart.push({name, price});
updateCart();
}

function updateCart(){
cartItemsContainer.innerHTML="";
let total=0;

cart.forEach((item,index)=>{
total+=item.price;
cartItemsContainer.innerHTML+=`
<div style="margin-bottom:10px;">
${item.name} - ${item.price}$ 
<button onclick="removeItem(${index})">❌</button>
</div>`;
});

totalElement.innerText=total;
cartCount.innerText=cart.length;
localStorage.setItem("cart",JSON.stringify(cart));
}

function removeItem(index){
cart.splice(index,1);
updateCart();
}

function toggleCart(){
document.getElementById("cart").classList.toggle("active");
}

function sendOrder(){
if(cart.length===0){
alert("السلة فارغة");
return;
}

let message="طلب جديد:%0A";
cart.forEach(item=>{
message+=`- ${item.name} (${item.price}$)%0A`;
});
message+=`الإجمالي: ${totalElement.innerText}$`;

window.open(`https://wa.me/996225386048?text=${message}`);
}

updateCart();
// ===== نظام عرض صور احترافي =====

let currentIndex = 0;
let allImages = [];

document.addEventListener("DOMContentLoaded", function(){
  allImages = document.querySelectorAll(".product-card img");

  allImages.forEach((img,index)=>{
    img.addEventListener("click",()=>{
      currentIndex = index;
      openModal(img);
    });
  });
});

function openModal(img){
  document.getElementById("imageModal").style.display="flex";
  document.getElementById("modalImage").src = img.src;
  document.getElementById("modalCaption").innerText =
  img.parentElement.querySelector("h3").innerText;
}

function closeModal(){
  document.getElementById("imageModal").style.display="none";
}

function nextImage(){
  currentIndex++;
  if(currentIndex >= allImages.length){
    currentIndex = 0;
  }
  updateModal();
}

function prevImage(){
  currentIndex--;
  if(currentIndex < 0){
    currentIndex = allImages.length - 1;
  }
  updateModal();
}

function updateModal(){
  const img = allImages[currentIndex];
  document.getElementById("modalImage").src = img.src;
  document.getElementById("modalCaption").innerText =
  img.parentElement.querySelector("h3").innerText;
}

// إغلاق عند الضغط خارج الصورة
document.getElementById("imageModal").addEventListener("click",function(e){
  if(e.target.id === "imageModal"){
    closeModal();
  }
});

// دعم الأسهم من الكيبورد
document.addEventListener("keydown",function(e){
  if(document.getElementById("imageModal").style.display==="flex"){
    if(e.key==="ArrowRight") nextImage();
    if(e.key==="ArrowLeft") prevImage();
    if(e.key==="Escape") closeModal();
  }
});