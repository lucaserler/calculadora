"use strict";

const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let operador;
let primeiroNumero;
let novoNumero = true;

const inserirNumero = (evento) => atualizarDsiplay(evento.target.textContent);
const operacaoParada = () => operador !== undefined;

const apagarCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    primeiroNumero = undefined;
}
document.getElementById('apagarCalculo').addEventListener('click', apagarCalculo);

const limparDisplay = () => display.textContent = ' ';
document.getElementById("limparDisplay").addEventListener('click', limparDisplay);

const igual = () => { 
    calcular(); 
    operador = undefined;
};
document.getElementById("resultado").addEventListener('click', igual);

const calcular = () => {
  if (operacaoParada()) {
    const ultimoNumero = parseFloat(display.textContent);
    novoNumero = true;
    const resultado =eval(`${primeiroNumero}${operador}${ultimoNumero}`);
    atualizarDsiplay(resultado);
  }
};

const atualizarDsiplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto;
    novoNumero = false;
  } else {
    display.textContent += texto;
  }
};

const selecionarOperador = (evento) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    primeiroNumero = parseFloat(display.textContent.replace('.' , ' ').replace(',' , '.'));
    //console.log(operador);
  }
};

numeros.forEach((numero) => numero.addEventListener("click", inserirNumero));
operadores.forEach((operador) => operador.addEventListener("click", selecionarOperador));
