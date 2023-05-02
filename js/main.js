const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")


let carrito = [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
     <img src="${product.img}">
     <h3>${product.nombre}</h3>
     <p class="price">${product.precio}$</p>
     <p>Stock disponible ${product.stock}</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        stock: product.stock,
        precio: product.precio,
        
      });
      console.log(carrito)
    });
});

verCarrito.addEventListener("click" , () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className ="modal-header"
  modalHeader.innerHTML = `
  <h1 class="modal-header-title">Carrito.</h1>
  `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);


carrito.forEach((product) => {
  let carritoContent = document.createElement("div")
  carritoContent.className = "modal-content";
  carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3> ${product.nombre}</h3>
    <p>${product.precio}$</p>
  `;

  modalContainer.append(carritoContent);
  });

  const total = carrito.reduce((acc, el) => acc + el.precio, 0);

  const totalBuying = document.createElement("div")
  totalBuying.className = "total-content"
  totalBuying.innerHTML = `total a pagar: ${total} $`
  modalContainer.append(totalBuying);
});