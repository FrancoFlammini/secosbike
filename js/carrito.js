const finalizarCompra = (carrito) => {
  console.log("gracias por comprar");

  vaciarCarrito(carrito);
  cerrarModal();
  alert("Gracias por su compra en Secas Bike Shop");
}

const cerrarModal = () => {
  modalContainer.style.display = "none";
}

const pintarCarrito = () => {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className ="modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    } );
  
    modalHeader.append(modalbutton);
  
  
  carrito.forEach((product) => {
    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3> ${product.nombre}</h3>
      <p>${product.precio}$</p>
      <span class="restar"> - </span>
      <p>Cantidad: ${product.cantidad}</p>
      <span class="sumar"> + </span>
      <p>Total: $ ${product.cantidad * product.precio}</p>
      <span class="delete-product"> ❌ </span>
    `;
  

    
    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if(product.cantidad !== 1){
        product.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () =>{
      product.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");
    eliminar.addEventListener("click", ()=>{
      eliminarProducto(product.id)
    });


});

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
   
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `<p> total: ${total}$</p>

    <button type="button" class="btn btn-outline-danger" id="carritoComprar" onclick="finalizarCompra(carrito)">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
<path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg>
    Comprar
  </button>
    `
    modalContainer.append(totalBuying);

};
 


verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const vaciarCarrito = (carrrito) => {
  carrrito.forEach(c => {
    eliminarProducto(c.id);
  })
}

const carritoCounter = () => {
  
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};



carritoCounter();
