const PRICE=79900;
const WA_NUMBER="573147636825";
const mainPhoto=document.getElementById("mainPhoto");
const thumbs=[...document.querySelectorAll(".thumb")];
thumbs.forEach(t=>t.addEventListener("click",()=>{thumbs.forEach(x=>x.classList.remove("active"));t.classList.add("active");mainPhoto.src=t.dataset.src;}));
const lightbox=document.getElementById("lightbox"), zoomPhoto=document.getElementById("zoomPhoto");
document.getElementById("openGallery").addEventListener("click",()=>{zoomPhoto.src=mainPhoto.src;lightbox.classList.add("show");lightbox.setAttribute("aria-hidden","false")});
document.getElementById("closeGallery").addEventListener("click",closeLightbox);lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
function closeLightbox(){lightbox.classList.remove("show");lightbox.setAttribute("aria-hidden","true")}
const waText=encodeURIComponent("Hola, estoy interesado(a) en el Localizador para Mascotas de $79.900. Quiero hacer un pedido.");
document.getElementById("waTop").href=`https://wa.me/${WA_NUMBER}?text=${waText}`;
const form=document.getElementById("orderForm"), msg=document.getElementById("formMessage");
form.addEventListener("submit",async e=>{
 e.preventDefault();
 const raw=Object.fromEntries(new FormData(form).entries());
 const cantidad=Number(raw.cantidad||1), observacionBase=(raw.observaciones||"").trim();
 const nombre=raw.nombre.trim();
 const observaciones=`Nombre: ${nombre}${observacionBase?" | "+observacionBase:""}`;
 const data={telefono:raw.telefono.trim(),ciudad:raw.ciudad.trim(),barrio:raw.barrio.trim(),direccion:raw.direccion.trim(),producto:"Localizador para Mascotas",cantidad,precio_unitario:PRICE,total:PRICE*cantidad,observaciones};
 msg.textContent="Registrando pedido...";
 try{
   const {error}=await window.supabaseClient.from(window.SUPABASE_TABLE).insert([data]);
   if(error) throw error;
   msg.textContent="¡Pedido registrado correctamente! Te contactaremos para confirmar. 🐾";
   form.reset();
 }catch(err){
   console.error(err);
   msg.textContent="No pudimos registrar el pedido. Puedes pedirlo directamente por WhatsApp.";
 }
});
