export function yearDiference(year) {
  return new Date().getFullYear() - year;
}

export function brandCalculator(marca) {
  let incremento;

  switch (marca) {
    case "europeo":
      incremento = 1.3;
      break;
    case "americano":
      incremento = 1.15;
      break;
    case "asiatico":
      incremento = 1.05;
      break;
    default:
      break;
  }
  return incremento;
}

export function planCalculator(plan) {
  let incremento;

  switch (plan) {
    case "basico":
      incremento = 1.2;
      break;
    case "completo":
      incremento = 1.5;
      break;
    default:
      break;
  }

  return incremento;
}

export function firstUpper(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
