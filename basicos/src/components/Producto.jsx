import React from "react";
const Producto = ({ producto, carrito, agregarProducto, productos }) => {
  const { nombre, precio, id } = producto;

  // Agregar producto al carrito

  const seleccionarProducto = (id) => {
    const producto = productos.filter((producto) => producto.id === id)[0];
    // siempre crear una copia del array con ... ya que el state NUNCA SE MODIFICA DIRECTAMENTE
    agregarProducto([...carrito, producto]);
  };

  // Elimina un producto del carrito

  const eliminarProducto = id => {
      const productos = carrito.filter(producto => producto.id !== id);

      // Coloca los productos en el state 
      agregarProducto(productos);
  }
  return (
    <div>
      <h2>{nombre}</h2>
      <p>{precio}€</p>
      {/* el onClick tiene que llevar una arrow function y no otro tipo para que el contenido no se ejecute hasta que el
                usuario haga click en el botón */}
      {productos ? (
        <button type="button" onClick={() => seleccionarProducto(id)}>
          Comprar
        </button>
      ) : (
        <button type="button" onClick={() => eliminarProducto(id)}>
          Eliminar
        </button>
      )}
    </div>
  );
};

export default Producto;
