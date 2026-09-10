const products=[
{id:1,name:"Bifacial Panels",category:"panels",price:120000.00,tag:"Best Seller",visual:"visual-panel",image:"image/Bifacial Panels.jpg"},
{id:2,name:"Haisic 4.2kw",category:"inverters",price:330000.00,tag:"Popular",visual:"visual-inverter",image:"image/Haisic 4.2kw.jpg"},
{id:3,name:"Cworth lithium battery",category:"batteries",price:510000.00,tag:"New",visual:"visual-battery",image:"image/Cworth lithium battery.jpg"},
{id:4,name:"Cola 3600 Solar Generator",category:"portable",price:800000.00,tag:"Featured",visual:"visual-power",image:"image/Cola 3600 Solar Geerator.jpg"},
{id:5,name:"Cola 3600 Solar Generator 2",category:"portable",price:300000.00,tag:"",visual:"visual-power",image:"image/Cola 3600 Solar Geerator2.jpg"},
{id:6,name:"Lvtopsun lithium battery",category:"batteries",price:1300000.00,tag:"Popular",visual:"visual-battery",image:"image/Lvtopsun lithium battery.jpg"},
{id:7,name:"Itel 100000mah Power Go",category:"portable",price:130000.00,tag:"Hot",visual:"visual-power",image:"image/Itel 100000mah Power Go.jpg"},
{id:8,name:"Hithium Hero EE",category:"inverters",price:260000.00,tag:"New",visual:"visual-inverter",image:"image/Hithium Hero EE 1.jpg"},
{id:9,name:"Hithium Hero EE 2",category:"inverters",price:650000.00,tag:"",visual:"visual-inverter",image:"image/Hithium Hero EE 2.jpg"},
{id:10,name:"60A PWM Charge",category:"portable",price:36000.0,tag:"Essential",visual:"visual-power",image:"image/60A PWM Charge.jpg"},
{id:11,name:"SMS 60A Charge Controller",category:"portable",price:150000.00,tag:"Essential",visual:"visual-power",image:"image/SMS 60A Charge Controller.jpg"}
];
let cart=JSON.parse(localStorage.getItem("coEnergyCart")||"[]");
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const money=n=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(n);

function renderProducts(list=products){
 $("#productGrid").innerHTML=list.map(p=>`<article class="product-card">
 <div class="product-image">${p.tag?`<span class="badge">${p.tag}</span>`:""}${p.image?`<img class="real-product-image" src="${p.image}" alt="${p.name}" loading="lazy"><div class="product-image-label">${p.name}</div>`:`<div class="product-visual ${p.visual}"></div>`}</div>
 <div class="product-info"><span class="category">${p.category.replace("portable","PORTABLE POWER").toUpperCase()}</span><h3>${p.name}</h3>
 <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" onclick="addToCart(${p.id})" aria-label="Add ${p.name} to cart">+</button></div></div></article>`).join("");
}
function save(){localStorage.setItem("coEnergyCart",JSON.stringify(cart));renderCart()}
function addToCart(id){const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();openCart()}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);save()}
function renderCart(){
 const count=cart.reduce((a,x)=>a+x.qty,0);$("#cartCount").textContent=count;
 const items=$("#cartItems");
 if(!cart.length){items.innerHTML='<div style="padding:60px 10px;text-align:center;color:#888">Your cart is empty.<br><br>Add products to start your order.</div>'}
 else items.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-row">${p.image?`<img class="mini-visual real-mini-image" src="${p.image}" alt="${p.name}">`:`<div class="mini-visual ${p.visual}"></div>`}<div><h4>${p.name}</h4><small>${money(p.price)}</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${p.id},1)">+</button></div></div><strong>${money(p.price*x.qty)}</strong></div>`}).join("");
 const total=cart.reduce((a,x)=>a+products.find(p=>p.id===x.id).price*x.qty,0);$("#cartTotal").textContent=money(total);
}
function openCart(){$("#cartDrawer").classList.add("open");$("#backdrop").classList.add("show")}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#backdrop").classList.remove("show")}
function checkout(){
 if(!cart.length){alert("Your cart is empty.");return}
 const phone="+2348146077326"; // Replace with international number, digits only, e.g. 15551234567
 if(phone==="+2348146077326"){alert("Replace +2348146077326 in js/app.js with the company's WhatsApp number.");return}
 const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `• ${p.name} × ${x.qty} — ${money(p.price*x.qty)}`});
 const total=cart.reduce((a,x)=>a+products.find(p=>p.id===x.id).price*x.qty,0);
 const msg=`Hello CO Energy Hub, I'd like to place an order:%0A%0A${encodeURIComponent(lines.join("\n"))}%0A%0A*Estimated total: ${money(total)}*%0A%0APlease let me know the next steps.`;
 window.open(`https://wa.me/${phone}?text=${msg}`,"_blank");
}
$$(".filter").forEach(b=>b.addEventListener("click",()=>{$$(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.category==="all"?products:products.filter(p=>p.category===b.dataset.category))}));
$$(".category-card").forEach(b=>b.addEventListener("click",()=>{location.hash="shop";setTimeout(()=>{$(`.filter[data-category="${b.dataset.category}"]`).click()},100)}));
$("#cartBtn").onclick=openCart;$("#closeCart").onclick=closeCart;$("#backdrop").onclick=closeCart;$("#checkoutBtn").onclick=checkout;
$("#menuBtn").onclick=()=>$("#mobileMenu").classList.toggle("open");
$$(".mobile-menu a").forEach(a=>a.onclick=()=>$("#mobileMenu").classList.remove("open"));
$("#searchBtn").onclick=()=>{$("#searchOverlay").classList.add("open");$("#searchInput").focus()};
$("#closeSearch").onclick=()=>$("#searchOverlay").classList.remove("open");
$("#searchInput").oninput=e=>{const q=e.target.value.toLowerCase().trim();$("#searchResults").innerHTML=q?products.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q)).map(p=>`<div class="search-result"><span>${p.name}</span><b>${money(p.price)}</b></div>`).join("")||"<p style='padding:20px 0;color:#888'>No products found.</p>":""};
renderProducts();renderCart();