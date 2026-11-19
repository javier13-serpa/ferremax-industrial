// Catálogo de productos de Ferremax Industrial.
// Cada producto es un objeto dentro del arreglo productos.
const productos = [
    { id: 1, nombre: "Taladro percutor", descripcion: "Taladro eléctrico para perforaciones en diferentes superficies.", precio: 185000, imagen: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80" },
    { id: 2, nombre: "Caja de herramientas", descripcion: "Caja resistente para organizar herramientas de trabajo.", precio: 95000, imagen: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=700&q=80" },
    { id: 3, nombre: "Llave inglesa", descripcion: "Herramienta ajustable para trabajos de mantenimiento.", precio: 42000, imagen: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=700&q=80" },
    { id: 4, nombre: "Casco de seguridad", descripcion: "Elemento de protección personal para áreas de trabajo.", precio: 38000, imagen: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80" },
    { id: 5, nombre: "Gafas de protección", descripcion: "Protección visual para labores industriales y de taller.", precio: 22000, imagen: "https://images.unsplash.com/photo-1616627451515-cbc80e2ecee6?auto=format&fit=crop&w=700&q=80" },
    { id: 6, nombre: "Destornilladores", descripcion: "Juego de destornilladores para diferentes tipos de tornillos.", precio: 55000, imagen: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=80" },
    { id: 7, nombre: "Esmeril angular", descripcion: "Equipo eléctrico para corte y desbaste de materiales.", precio: 210000, imagen: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=700&q=80" },
    { id: 8, nombre: "Guantes industriales", descripcion: "Guantes de trabajo para protección y agarre.", precio: 28000, imagen: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80" },
    { id: 9, nombre: "Cinta métrica", descripcion: "Instrumento de medición para trabajos de precisión.", precio: 18000, imagen: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=700&q=80" },
    { id: 10, nombre: "Llave de tubo", descripcion: "Herramienta manual para ajustar y aflojar conexiones.", precio: 67000, imagen: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?auto=format&fit=crop&w=700&q=80" }
];

const formatoPesos = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
});

// Mostrar los productos en la página.
function mostrarProductos() {
    let contenido = "";

    for (let i = 0; i < productos.length; i++) {
        contenido += `
            <article class="producto">
                <img src="${productos[i].imagen}" alt="${productos[i].nombre}" loading="lazy">
                <div class="producto-info">
                    <h3>${productos[i].nombre}</h3>
                    <p>${productos[i].descripcion}</p>
                    <div class="precio">${formatoPesos.format(productos[i].precio)}</div>
                    <button class="boton boton-primario agregar-producto" data-id="${productos[i].id}" type="button">Agregar al carrito</button>
                </div>
            </article>
        `;
    }

    document.getElementById("lista-productos").innerHTML = contenido;
}

mostrarProductos();
