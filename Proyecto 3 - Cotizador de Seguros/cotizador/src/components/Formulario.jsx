import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  yearDiference,
  brandCalculator,
  planCalculator,
} from "../helpers/helper";
const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;
// webkit-appearance: none elimina la apariencia nativa de la etiqueta

const Radio = styled.input`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: #00838f;
  font-size: 16 px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
    background-color: #26c6da;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;
// & hace referencia al mismo elemento, como en sass
const Formulario = ({ guardarResumen, guardarCargando }) => {
  const [datos, guardarDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  // no hay error (false) hasta que el usuario deja alguno de los campos vacíos
  const [error, guardarError] = useState(false);

  // extraer los valores del state
  const { marca, year, plan } = datos;

  // Leer los datos del formulario y colocarlos en el state
  const obtenerInformacion = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario presiona submit

  const cotizarSeguro = (e) => {
    e.preventDefault();

    // Si algún campo llega vacío...
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      //... cambiamos el state del error a true
      guardarError(true);
      return;
    }
    // Si no, mantenemos el false
    guardarError(false);

    // Continuamos, a más antiguo sea el año, más barato será el precio del seguro por lo tanto:

    // Iniciamos el valor del precio del seguro en 2000€
    let precioTotal = 2000;

    // Obtenemos la diferencia de años
    const diferencia = yearDiference(year);

    // Por cada año más antiguo hay que restar el 3% del precio total
    precioTotal -= (diferencia * 3 * precioTotal) / 100;
    // Americano +15%, Asiático +5%, Europeo +30%
    precioTotal = brandCalculator(marca) * precioTotal;

    // Plan básico: +20%, Completo: +50%;
    precioTotal = parseFloat(planCalculator(plan) * precioTotal).toFixed(2);

    guardarCargando(true);

    // Para mostrar el spinner 2 segundos
    setTimeout(() => {
      // TOTAL
      guardarResumen({
        cotizacion: precioTotal,
        datos,
      });
      guardarCargando(false);
    }, 2000);
  };
  return (
    <form onSubmit={cotizarSeguro}>
      {/* Colocamos el div en caso de error */}
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={obtenerInformacion}>
          <option value="">--Seleccione--</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiático</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={obtenerInformacion}>
          <option value="">--Seleccione--</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo name="plan" value={plan}>
        <Label>Plan</Label>
        <Radio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        />
        Básico
        <Radio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        />
        Completo
      </Campo>

      <Button type="submit">Cotizar</Button>
    </form>
  );
};

export default Formulario;
