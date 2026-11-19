// Carrito de compras y proceso de compra simulada.
let carrito = JSON.parse(localStorage.getItem("carritoFerremax")) || [];
const costoEnvioFijo = 12000;

function guardarCarrito() {
    localStorage.setItem("carritoFerremax", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
    let productoEncontrado = productos.find(function(producto) {
        return producto.id === id;
    });

    let productoEnCarrito = carrito.find(function(producto) {
        return producto.id === id;
    });

    if (productoEnCarrito) {
        productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
    } else {
        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            cantidad: 1
        });
    }

    guardarCarrito();
    mostrarCarrito();
    document.getElementById("aviso-carrito").textContent = "Producto agregado correctamente.";
}

function mostrarCarrito() {
    let contenido = "";
    let subtotalGeneral = 0;
    let totalUnidades = 0;

    if (carrito.length === 0) {
        contenido = '<tr><td colspan="5" class="carrito-vacio">Tu carrito está vacío.</td></tr>';
    } else {
        for (let i = 0; i < carrito.length; i++) {
            let subtotalProducto = carrito[i].precio * carrito[i].cantidad;
            subtotalGeneral = subtotalGeneral + subtotalProducto;
            totalUnidades = totalUnidades + carrito[i].cantidad;

            contenido += `
                <tr>
                    <td>${carrito[i].nombre}</td>
                    <td>${formatoPesos.format(carrito[i].precio)}</td>
                    <td><input class="cantidad" type="number" min="1" value="${carrito[i].cantidad}" data-id="${carrito[i].id}" aria-label="Cantidad de ${carrito[i].nombre}"></td>
                    <td>${formatoPesos.format(subtotalProducto)}</td>
                    <td><button class="boton-eliminar" type="button" data-id="${carrito[i].id}">Eliminar</button></td>
                </tr>
            `;
        }
    }

    let envio = carrito.length > 0 ? costoEnvioFijo : 0;
    let total = subtotalGeneral + envio;

    document.getElementById("contenido-carrito").innerHTML = contenido;
    document.getElementById("total-unidades").textContent = totalUnidades;
    document.getElementById("subtotal-general").textContent = formatoPesos.format(subtotalGeneral);
    document.getElementById("costo-envio").textContent = formatoPesos.format(envio);
    document.getElementById("total-pagar").textContent = formatoPesos.format(total);
    document.getElementById("contador-carrito").textContent = totalUnidades;
}

function cambiarCantidad(id, nuevaCantidad) {
    if (nuevaCantidad < 1 || isNaN(nuevaCantidad)) {
        nuevaCantidad = 1;
    }

    let producto = carrito.find(function(item) {
        return item.id === id;
    });

    if (producto) {
        producto.cantidad = nuevaCantidad;
        guardarCarrito();
        mostrarCarrito();
    }
}

function eliminarProducto(id) {
    carrito = carrito.filter(function(producto) {
        return producto.id !== id;
    });

    guardarCarrito();
    mostrarCarrito();
    document.getElementById("aviso-carrito").textContent = "Producto eliminado del carrito.";
}

function vaciarCarrito() {
    if (carrito.length > 0) {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
        document.getElementById("aviso-carrito").textContent = "El carrito se ha vaciado.";
    } else {
        document.getElementById("aviso-carrito").textContent = "El carrito ya está vacío.";
    }
}

// Eventos de los botones del catálogo.
document.getElementById("lista-productos").addEventListener("click", function(evento) {
    if (evento.target.classList.contains("agregar-producto")) {
        let id = Number(evento.target.getAttribute("data-id"));
        agregarAlCarrito(id);
    }
});

// Eventos para cambiar cantidades y eliminar productos.
document.getElementById("contenido-carrito").addEventListener("change", function(evento) {
    if (evento.target.classList.contains("cantidad")) {
        let id = Number(evento.target.getAttribute("data-id"));
        cambiarCantidad(id, Number(evento.target.value));
    }
});

document.getElementById("contenido-carrito").addEventListener("click", function(evento) {
    if (evento.target.classList.contains("boton-eliminar")) {
        let id = Number(evento.target.getAttribute("data-id"));
        eliminarProducto(id);
    }
});

document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

// Validar y simular la compra.
document.getElementById("formulario-compra").addEventListener("submit", function(evento) {
    evento.preventDefault();

    let mensaje = document.getElementById("mensaje-compra");

    if (carrito.length === 0) {
        mensaje.textContent = "No puedes finalizar la compra porque el carrito está vacío.";
        return;
    }

    let nombreComprador = document.getElementById("nombre").value;
    let totalCompra = document.getElementById("total-pagar").textContent;

    alert("¡Compra simulada correctamente!\n\nGracias, " + nombreComprador + ".\nValor total: " + totalCompra);

    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    document.getElementById("formulario-compra").reset();
    mensaje.textContent = "La compra fue procesada correctamente. Esta es una simulación académica.";
});

// Mostrar el carrito guardado al cargar la página.
mostrarCarrito();
