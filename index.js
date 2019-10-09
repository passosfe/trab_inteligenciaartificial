// const voos_file = require("./voos");

// const voos = voos_file.voos;

// function imprimir(horarios) {
//   var voo = -1;

//   for (var i = 0; i < horarios.length / 2; i++) {
//     const { nome, origem } = pessoas[i];
//     voo += 1;
//     let ida = voos[`${origem}_${destino}`][horarios[voo]];
//     voo += 1;
//     let volta = voos[`${destino}_${origem}`][horarios[voo]];
//     console.log(
//       `${nome} \t ${origem} \t ${ida.hora_ida}-${ida.hora_volta} \t ${ida.preco} \t ${volta.hora_ida}-${volta.hora_volta} \t ${volta.preco}`
//     );
//   }
// }

//Converte hora para minutos
// function convMin(hora) {
//   const aux = hora.split(":");
//   var min = aux[0] * 60;
//   min += aux[1] / 1;
//   return min;
// }

// function custo(resposta) {
//   var preco_total = 0;
//   var ultima_chegada = 0;
//   var primeira_partida = 1439; //total de minutos em um dia

//   var voo = -1;
//   for (var i = 0; i < resposta.length / 2; i++) {
//     const { origem } = pessoas[i];
//     voo += 1;
//     let ida = voos[`${origem}_${destino}`][resposta[voo]];
//     voo += 1;
//     let volta = voos[`${destino}_${origem}`][resposta[voo]];

//     preco_total += ida.preco;
//     preco_total += volta.preco;

//     ultima_chegada < convMin(ida.hora_volta)
//       ? (ultima_chegada = convMin(ida.hora_volta))
//       : null;

//     primeira_partida > convMin(volta.hora_ida)
//       ? (primeira_partida = convMin(volta.hora_ida))
//       : null;
//   }

//   var total_epera = 0;
//   voo = -1;
//   for (let k = 0; k < resposta.length / 2; k++) {
//     const { origem } = pessoas[k];
//     voo += 1;
//     let ida = voos[`${origem}_${destino}`][resposta[voo]];
//     voo += 1;
//     let volta = voos[`${destino}_${origem}`][resposta[voo]];

//     total_epera += ultima_chegada - convMin(ida.hora_volta);
//     total_epera += convMin(volta.hora_ida) - primeira_partida;

//     ultima_chegada > primeira_partida ? (preco_total += 50) : null;

//     return preco_total + total_epera;
//   }
// }

// function ramdonInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function subida_encosta() {
//   var resposta = [];
//   for (let i = 0; i < dominio.length; i++) {
//     resposta.push(ramdonInt(dominio[i][0], dominio[i][1]));
//   }
//   var encontrado = false;

//   while (!encontrado) {
//     let vizinhos = [];

//     for (let i = 0; i < dominio.length; i++) {
//       if (resposta[i] >= dominio[i][0] && resposta[i] != dominio[i][1]) {
//         let aux = [...resposta];
//         aux[i]++;
//         vizinhos.push(aux);
//       }
//       if (resposta[i] <= dominio[i][1] && resposta[i] != dominio[i][0]) {
//         let aux = [...resposta];
//         aux[i]--;
//         vizinhos.push(aux);
//       }
//     }

//     let atual = custo(resposta);
//     let melhor = atual;

//     for (let i = 0; i < vizinhos.length; i++) {
//       let custoaux = custo(vizinhos[i]);
//       if (custoaux < melhor) {
//         melhor = custoaux;
//         resposta = [...vizinhos[i]];
//       }
//     }

//     melhor == atual ? (encontrado = true) : (encontrado = false);
//   }

//   return resposta;
// }

// function temp_sim(temp, resf, taxa) {
//   var resposta = [];
//   for (let i = 0; i < dominio.length; i++) {
//     resposta.push(ramdonInt(dominio[i][0], dominio[i][1]));
//   }

//   while (temp > 0.1) {
//     let i = ramdonInt(0, dominio.length - 1);
//     let direcao = ramdonInt(-taxa, taxa);

//     let resp_temp = [...resposta];
//     resp_temp[i] += direcao;

//     if (resp_temp[i] < dominio[i][0]) {
//       resp_temp[i] = dominio[i][0];
//     } else if (resp_temp[i] > dominio[i][1]) {
//       resp_temp[i] = dominio[i][0];
//     }

//     let custo_resposta = custo(resposta);
//     let custo_resposta_temp = custo(resp_temp);
//     probabilidade = Math.pow(
//       Math.E,
//       (-custo_resposta_temp - custo_resposta) / temp
//     );
//     custo_resposta_temp < custo_resposta || Math.random() < probabilidade
//       ? (resposta = [...resp_temp])
//       : null;

//     temp *= resf;
//   }
//   return resposta;
// }

// function mutacao(taxa, resposta) {
//   var i = ramdonInt(0, dominio.length - 1);
//   var mut = [...resposta];

//   if (Math.random() < 0.5) {
//     if (resposta[i] != dominio[i][0]) {
//       let aux = [...resposta];
//       aux[i] -= taxa;
//       mut = [...aux];
//     }
//   } else {
//     if (resposta[i] != dominio[i][1]) {
//       let aux = [...resposta];
//       aux[i] += taxa;
//       mut = [...aux];
//     }
//   }
//   return mut;
// }

// function cruzamento(individuo1, individuo2) {
//   var i = ramdonInt(1, dominio.length - 2);
//   return [...individuo1.slice(0, i), ...individuo2.slice(i, individuo2.length)];
// }

// function genetico(tam_populacao, taxa, prob_mutacao, elit, num_geracoes) {
//   var populacao = [];
//   for (let i = 0; i < tam_populacao; i++) {
//     let resposta = [];
//     for (let k = 0; k < dominio.length; k++) {
//       resposta.push(ramdonInt(dominio[k][0], dominio[k][1]));
//     }
//     populacao.push([...resposta]);
//   }

//   var num_elit = elit * tam_populacao;
//   var arr_custos = [];

//   for (let i = 0; i < num_geracoes; i++) {
//     arr_custos = [];
//     for (let k = 0; k < populacao.length; k++) {
//       arr_custos.push([custo(populacao[k]), [...populacao[k]]]);
//     }
//     arr_custos.sort();

//     let ind_ordenados = [];
//     for (let j = 0; j < arr_custos.length; j++) {
//       ind_ordenados.push(arr_custos[j][1]);
//     }

//     populacao = [...ind_ordenados.slice(0, num_elit)];

//     while (populacao.length < tam_populacao) {
//       if (Math.random() < prob_mutacao) {
//         let indice_mutacao = ramdonInt(0, num_elit);
//         populacao.push(mutacao(taxa, ind_ordenados[indice_mutacao]));
//       } else {
//         let cruzamento1 = ramdonInt(0, num_elit);
//         let cruzamento2 = ramdonInt(0, num_elit);
//         populacao.push(
//           cruzamento(ind_ordenados[cruzamento1], ind_ordenados[cruzamento2])
//         );
//       }
//     }
//   }
//   return arr_custos[0][1];
// }

//const aeroportos = ["CWB", "GIG", "POA", "FLN", "CNF", "GYN"];

// var teste_subida_encosta = subida_encosta();
// var custo_subida_encosta = custo(teste_subida_encosta);
// var teste_tempera = temp_sim(10000.0, 0.95, 1);
// var custo_tempera = custo(teste_tempera);
// var custo_teste = custo(teste);

// console.log(cruzamento(teste, teste2));
// console.log(teste);
// console.log(teste2);

// console.log(custo_subida_encosta);
// imprimir(teste_subida_encosta);
// console.log(custo_tempera);
// imprimir(teste_tempera);
// console.log(custo_teste);
// imprimir(teste);

// console.log(voos_file.voos["GRU_POA"]);
const localidades = [
  "CEN",
  "JAD",
  "GUR",
  "IND",
  "JSO",
  "VOL",
  "UNA",
  "NAC",
  "ABC",
  "BCD",
  "CDE",
  "DEF",
  "EFG",
  "FGH",
  "GHI",
  "HIJ"
];

var distancias = {};

function preenche_distancias() {
  for (let i = 0; i < localidades.length - 1; i++) {
    for (let k = i + 1; k < localidades.length; k++) {
      let distancia = ramdonInt(5, 45);
      distancias[`${localidades[i]}_${localidades[k]}`] = distancia;
      distancias[`${localidades[k]}_${localidades[i]}`] = distancia;
    }
  }
}

var passageiros = [];
var pontos = [];

function preenche_passageiros() {
  var origens = [];
  var destinos = [];
  var localidades_aux = [...localidades];

  for (let i = 0; i < localidades.length / 2; i++) {
    let indice_origem = ramdonInt(0, localidades_aux.length - 1);
    let origem = localidades_aux[indice_origem];
    localidades_aux.splice(indice_origem, 1);
    origens.push(origem);

    let indice_destino = ramdonInt(0, localidades_aux.length - 1);
    let destino = localidades_aux[indice_destino];
    localidades_aux.splice(indice_destino, 1);
    destinos.push(destino);

    let chegada_esperada = ramdonInt(
      distancias[`${origem}_${destino}`],
      distancias[`${origem}_${destino}`] * 2
    );
    //criar hora de chamar o uber

    passageiros.push({
      origem,
      destino,
      chegada_esperada
    });
  }

  pontos = origens.concat(destinos);
}

const dominio = [];

preencheDominio = () => {
  for (var i = 0; i < pontos.length; i++) {
    dominio.push([0, 15]);
  }
};

function imprimir(paradas) {
  var tempo;
  let passageiros_aux = [...passageiros];
  var passageiros_embarcados = 0;

  for (var i = 0; i < paradas.length; i++) {
    let indice;
    let tipo;
    let tempo_excedente;

    i !== 0
      ? (tempo += distancias[`${pontos[paradas[i - 1]]}_${pontos[paradas[i]]}`])
      : (tempo = 0);

    if (paradas[i] < (pontos.length - 1) / 2) {
      indice = passageiros_aux.findIndex(
        (x) => x.origem === pontos[paradas[i]]
      );
      tipo = "embarque";

      if (typeof passageiros_aux[indice].saiu === "undefined") {
        passageiros_aux[indice].saiu = tempo;
        passageiros_embarcados++;
      }
    } else {
      indice = passageiros_aux.findIndex(
        (x) => x.destino === pontos[paradas[i]]
      );
      tipo = "desembarque";

      if (typeof passageiros_aux[indice].saiu !== "undefined") {
        passageiros_aux[indice].saiu = "erro";
        passageiros_embarcados--;
        const { chegada_esperada } = passageiros_aux[indice];

        tempo_excedente = tempo - chegada_esperada;
      }
    }

    let passageiro = indice;
    let local = pontos[paradas[i]];

    console.log(
      `${passageiro} \t ${local} \t ${tipo} \t ${tempo} \t ${passageiros_embarcados} \t ${
        tempo_excedente ? tempo_excedente : ""
      }`
    );
  }
}

function resposta_random() {
  let resposta = [];
  let aux = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  for (let i = 0; i < localidades.length; i++) {
    let indice = ramdonInt(0, aux.length - 1);
    resposta.push(aux[indice]);
    aux.splice(indice, 1);
  }

  return resposta;
}

function custo(resposta) {
  var preco_total = 0;
  var tempo;
  let passageiros_aux = JSON.parse(JSON.stringify(passageiros));
  var passageiros_embarcados = 0;

  for (let i = 0; i < resposta.length; i++) {
    let indice;

    i !== 0
      ? (tempo +=
          distancias[`${pontos[resposta[i - 1]]}_${pontos[resposta[i]]}`])
      : (tempo = 0);

    if (resposta[i] < (pontos.length - 1) / 2) {
      indice = passageiros_aux.findIndex(
        (x) => x.origem === pontos[resposta[i]]
      );

      if (typeof passageiros_aux[indice].saiu === "undefined") {
        passageiros_aux[indice].saiu = tempo;
        passageiros_embarcados++;

        passageiros_embarcados > 4 ? (preco_total += 1000) : null;
      }
    } else {
      indice = passageiros_aux.findIndex(
        (x) => x.destino === pontos[resposta[i]]
      );

      if (typeof passageiros_aux[indice].saiu === "undefined") {
        passageiros_aux[indice].saiu = "erro";
        preco_total += 2000;
      } else {
        passageiros_embarcados--;
        const { chegada_esperada } = passageiros_aux[indice];

        if (tempo > chegada_esperada) {
          let diff = tempo - chegada_esperada;
          if (diff > 0) {
            preco_total += diff * 2;
          }
        }
      }
    }
  }

  return preco_total;
}

function ramdonInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function subida_encosta() {
  var resposta = resposta_random();
  var encontrado = false;

  while (!encontrado) {
    let vizinhos = [];

    let escolhido = ramdonInt(0, resposta.length - 1);

    for (let i = 0; i < resposta.length; i++) {
      if (i !== escolhido) {
        let arr = JSON.parse(JSON.stringify(resposta));
        [arr[i], arr[escolhido]] = [arr[escolhido], arr[i]];
        vizinhos.push(arr);
      }
    }

    let atual = custo(resposta);
    let melhor = atual;

    for (let i = 0; i < vizinhos.length; i++) {
      let custoaux = custo(vizinhos[i]);
      if (custoaux < melhor) {
        melhor = custoaux;
        resposta = JSON.parse(JSON.stringify(vizinhos[i]));
      }
    }

    melhor == atual ? (encontrado = true) : (encontrado = false);
  }

  return resposta;
}

function temp_sim(temp, resf) {
  var resposta = resposta_random();

  while (temp > 0.1) {
    let posicao_a = ramdonInt(0, pontos.length - 1);
    let posicao_b = ramdonInt(0, pontos.length - 1);

    while (posicao_a === posicao_b) {
      posicao_b = ramdonInt(0, pontos.length - 1);
    }

    let arr = JSON.parse(JSON.stringify(resposta));
    [arr[posicao_a], arr[posicao_b]] = [arr[posicao_b], arr[posicao_a]];

    let custo_resposta = custo(resposta);
    let custo_resposta_temp = custo(arr);
    probabilidade = Math.pow(
      Math.E,
      (-custo_resposta_temp - custo_resposta) / temp
    );
    custo_resposta_temp < custo_resposta || Math.random() < probabilidade
      ? (resposta = JSON.parse(JSON.stringify(arr)))
      : null;

    temp *= resf;
  }
  return resposta;
}

function mutacao(resposta) {
  let posicao_a = ramdonInt(0, pontos.length - 1);
  let posicao_b = ramdonInt(0, pontos.length - 1);

  while (posicao_a === posicao_b) {
    posicao_b = ramdonInt(0, pontos.length - 1);
  }

  var mut = JSON.parse(JSON.stringify(resposta));
  [mut[posicao_a], mut[posicao_b]] = [mut[posicao_b], mut[posicao_a]];

  return mut;
}

function cruzamento(i1, i2) {
  var aux = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  var individuo1 = JSON.parse(JSON.stringify(i1));
  var individuo2 = JSON.parse(JSON.stringify(i2));

  let posicao_a = ramdonInt(0, pontos.length - 2);
  let posicao_b = ramdonInt(posicao_a + 1, pontos.length - 1);

  var cruz = [];

  for (let i = 0; i < pontos.length; i++) {
    if (i >= posicao_a && i <= posicao_b) {
      cruz[i] = individuo1[i];
      aux.splice(aux.indexOf(cruz[i]), 1);
    } else {
      cruz[i] = -1;
    }
  }

  for (let i = 0; i < pontos.length; i++) {
    if ((i < posicao_a || i > posicao_b) && !cruz.includes(individuo2[i])) {
      cruz[i] = individuo2[i];
      aux.splice(aux.indexOf(cruz[i]), 1);
    }
  }

  for (let i = 0; i < pontos.length; i++) {
    if (cruz[i] === -1) {
      cruz[i] = aux[0];
      aux.splice(0, 1);
    }
  }

  return cruz;
}

function genetico(tam_populacao, prob_mutacao, elit, num_geracoes) {
  var populacao = [];
  for (let i = 0; i < tam_populacao; i++) {
    let resposta = resposta_random();
    populacao.push(JSON.parse(JSON.stringify(resposta)));
  }

  var num_elit = elit * tam_populacao;
  var arr_custos = [];

  for (let i = 0; i < num_geracoes; i++) {
    arr_custos = [];
    for (let k = 0; k < populacao.length; k++) {
      arr_custos.push([
        custo(populacao[k]),
        JSON.parse(JSON.stringify(populacao[k]))
      ]);
    }
    arr_custos.sort();

    let ind_ordenados = [];
    for (let j = 0; j < arr_custos.length; j++) {
      ind_ordenados.push(arr_custos[j][1]);
    }

    populacao = JSON.parse(JSON.stringify(ind_ordenados.slice(0, num_elit)));

    while (populacao.length < tam_populacao) {
      if (Math.random() < prob_mutacao) {
        let indice_mutacao = ramdonInt(0, num_elit);
        populacao.push(mutacao(ind_ordenados[indice_mutacao]));
      } else {
        let cruzamento1 = ramdonInt(0, num_elit);
        let cruzamento2 = ramdonInt(0, num_elit);
        populacao.push(
          cruzamento(ind_ordenados[cruzamento1], ind_ordenados[cruzamento2])
        );
      }
    }
  }
  return arr_custos[0][1];
}

var teste1 = [5, 2, 7, 4, 1, 8, 9, 13, 3, 15, 0, 11, 12, 6, 10, 14];

var teste2 = [6, 9, 8, 1, 4, 2, 14, 11, 5, 0, 15, 3, 12, 7, 13, 10];

function main() {
  preenche_distancias();

  preenche_passageiros();

  let melhor = genetico(200, 0.2, 0.2, 200);

  let custom = custo(melhor);

  console.log(custom);
  imprimir(melhor);
}

main();
