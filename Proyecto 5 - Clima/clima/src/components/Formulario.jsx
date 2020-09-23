import React, { useState } from "react";
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({
  busqueda,
  guardarBusqueda,
  guardarConsulta,
}) => {
  const [error, guardarError] = useState(false);

  // extraer ciudad y país
  const { ciudad, pais } = busqueda;

  // función que coloca los elementos en el state
  const handleChange = (e) => {
    // actualizar el state
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario haga Submit al form
  const handleSubmit = (e) => {
    e.preventDefault();
    // validar
    if (ciudad.trim() === "" || pais.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    guardarConsulta(true);
    // pasarlo al componente principal
  };
  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <Error mensaje="Todos los campos son obligatorios"/>
      ) : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        {/* En el label usaríamos un for, pero for es una palabra reservada en JS
            por lo que usaremos htmlFor */}
        <label htmlFor="ciudad">Ciudad: </label>
      </div>
      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">--Seleccione un país--</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País: </label>
      </div>
      <div className="input-field col s12">
        <input
          type="submit"
          value="Buscar Clima"
          className="waves-effect waves-light btn-large btn-blocl yellow accent-4"
        />
      </div>
    </form>
  );
};
Formulario.propTypes = {
  busqueda : PropTypes.object.isRequired,
  guardarBusqueda : PropTypes.func.isRequired,
  guardarConsulta : PropTypes.func.isRequired,
}
export default Formulario;
