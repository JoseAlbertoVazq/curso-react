import React from "react";
import styled from "@emotion/styled";
import { firstUpper } from "../helpers/helper";
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;
const Resumen = ({ datos }) => {
  //extraer datos

  const { marca, year, plan } = datos;

  if (marca === "" || year === "" || plan === "") return null;
  return (
    <ContenedorResumen>
      <h2>Resumen de cotización:</h2>
      <ul>
        <li>Marca: {firstUpper(marca)}</li>
        <li>Año: {year}</li>
        <li>Plan: {firstUpper(plan)}</li>
      </ul>
    </ContenedorResumen>
  );
};
Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}
export default Resumen;
