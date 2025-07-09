// Simulación de una base de datos de productos
const productos = [
    { id: 1, nombre: 'Arroz', precio: 100 },
    { id: 2, nombre: 'Aceite', precio: 200 },
    { id: 3, nombre: 'Azucar', precio: 300 },
    { id: 4, nombre: 'Harina', precio: 400 },
    { id: 5, nombre: 'Leche', precio: 500 },

];

// Variable para almacenar el carrito de compras
// Inicialmente, el carrito está vacío.
let carrito = [];

// Referencias a los elementos del DOM
const productosDisponiblesDiv = document.getElementById('productos-disponibles');
const itemsCarritoUl = document.getElementById('items-carrito');
const totalCarritoSpan = document.getElementById('total-carrito');
const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');

// Obtener información de los productos
function mostrarProductos() {
    productosDisponiblesDiv.innerHTML = ''; // Limpiar el div antes de mostrar los productos
    productos.forEach(producto => {
        // Crear estructura HTML para cada producto
        const productoCard = document.createElement('div');
        productoCard.classList.add('col-md4', 'mb-4');

        productoCard.innerHTML= `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <button class="btn btn-primary btn-agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        </div>
        
        `;
        productosDisponiblesDiv.appendChild(productoCard);
    }
    );

    // Añadir eventos a los botones del carrito
    document.querySelectorAll('.btn-agregar-carrito').forEach(button => {
        button.addEventListener('click',agregarAlCarrito);
        });
    }

function agregarAlCarrito(event){
    const productoId = parseInt(event.target.dataset.id);
    const productoAgregado = productos.find(producto => producto.id === productoId);

    if (productoAgregado) {
        // Verificar si el producto ya está en el carrito
        const itemExistente = carrito.find(item => item.id === productoId);

        if (itemExistente) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            itemExistente.cantidad++;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            carrito.push({ ...productoAgregado, cantidad: 1 });
            
        }
        // Mostrar el carrito actualizado
        mostrarCarrito();
    }
}

// Función para mostrar el carrito de compras
function mostrarCarrito() {
    // Limpiar el contenido del carrito antes de mostrarlo
    itemsCarritoUl.innerHTML = '';

    if (carrito.length === 0) {
        itemsCarritoUl.innerHTML = '<li class="list-group-item">El carrito está vacío</li>';
    }
    else{
        carrito.forEach(item => {
            const listaItem = document.createElement('li');
            listaItem.classList.add('list-group-item', 'justify-content-between', 'd-flex', 'align-items-center');
            
            listaItem.innerHTML = `
            ${item.nombre} x ${item.cantidad} - $${item.precio * item.cantidad}
            <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id}">Eliminar</button>
            `;
            

            itemsCarritoUl.appendChild(listaItem);
        });
    }
    calcularTotal();

    // Escuchar los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', eliminarDelCarrito);
    }
    );
}

// Funcion calcular el total del carrito
    function calcularTotal() {
        let total = 0;
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
        });
        totalCarritoSpan.textContent = total; 
    }

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

// Funcion para eliminar un producto del carrito
function eliminarDelCarrito(event) {
    const productoId = parseInt(event.target.dataset.id);

    const itemEncontrado = carrito.find(item => item.id === productoId);

    if (itemEncontrado) {
        if (itemEncontrado.cantidad > 1) {
            itemEncontrado.cantidad--;
        }else{
            carrito = carrito.filter(item => item.id !== productoId);
            }
        
    }
    mostrarCarrito();
}










btnVaciarCarrito.addEventListener('click', vaciarCarrito);

// Mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    mostrarCarrito();
    
});