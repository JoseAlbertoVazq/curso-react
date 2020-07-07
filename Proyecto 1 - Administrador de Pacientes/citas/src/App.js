import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  // Citas en el local Storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Array de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
    // Para que solo se ejecute una vez hay que pasarle también un array vacío...
    // pero aquí queremos que se ejecute cada vez que nuestro array de citas sufra un cambio así que le pasamos el array de citas
  }, [citas]);

  // Función que tome las citas actuales y agregue la nueva

  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Función que elimina una cita por su ID
  const eliminarCita = (id) => {
    // Me quedo con las citas que NO COINCIDEN con el ID que quiero eliminar
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  // Mostrar el título de la columna derecha
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita
                // cuando mapeamos de esta forma en React siempre hay que pasarle un key
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
