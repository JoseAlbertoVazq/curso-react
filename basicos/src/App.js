import React, { Fragment, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Producto from "./components/Producto";
import Carrito from "./components/Carrito";

function App() {
  // Crear listado de productos
  // Primer elemento []: nombre del array, tipo de objeto con el que vamos a trabajar, en este caso: productos
  // Segundo elemento []: función normalmente para agregar o quitar elementos del array
  const [productos, guardarProductos] = useState([
    {
      id: 1,
      nombre: "Camisa ReactJS",
      precio: 50,
    },
    {
      id: 2,
      nombre: "Camisa VueJS",
      precio: 40,
    },
    {
      id: 3,
      nombre: "Camisa NodeJS",
      precio: 30,
    },
    {
      id: 4,
      nombre: "Camisa Angular",
      precio: 20,
    },
  ]);

  // State para un carrito de compras
  const [carrito, agregarProducto] = useState([]);

  // Obterner la fecha
  const fecha = new Date().getFullYear();

  return (
    <Fragment>
      <Header titulo="Tienda Virtual" />

      <h1>Lista de Productos</h1>
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          productos={productos}
          producto={producto}
          carrito={carrito}
          agregarProducto={agregarProducto}
        />
      ))}

      <Carrito carrito={carrito} agregarProducto={agregarProducto}/>
      <Footer fecha={fecha} />
    </Fragment>
  );
}

export default App;
