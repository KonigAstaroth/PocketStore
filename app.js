const API_URL = "https://dummyjson.com/products"
const productsContainer = document.getElementById("products");
const connectionStatus = document.getElementById("connection-status");


async function loadProducts() {

    try{
        const response = await fetch(API_URL);

        if (!response.ok){
            throw new Error ("Error al cargar los datos");
        }

        const data = await response.json();

        renderProducts(data.products);
    }
    catch (error){
        console.error(error);

        productsContainer.innerHTML = `
            <p class="loading">
                No fue posible cargar los productos.
            </p>
        `;
    }
    
}

function renderProducts(products){
    productsContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.title}</h3>

            <p>
                ${product.description}
            </p>

            <span class="price">
                $${product.price}
            </span>
        `;

        productsContainer.appendChild(card);
    });
}

function updateConnectionStatus() {

    if (navigator.onLine) {

        connectionStatus.textContent = "En línea";

    } else {

        connectionStatus.textContent = "Sin conexión";
    }
}

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {
                console.log("Service Worker registrado");
            })
            .catch(error => {
                console.error(
                    "Error registrando Service Worker:",
                    error
                );
            });
    });
}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

updateConnectionStatus();
loadProducts();