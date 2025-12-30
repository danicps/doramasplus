/* ID DO PEDIDO */
const pedidoId = "PED-" + Math.random().toString(36).substring(2, 7).toUpperCase();

/* DORAMAS */
const doramas = [
  {
    nome: "Vincenzo",
    capa: "capas/vincenzo.jpg",
    sinopse: "Um advogado da máfia italiana retorna à Coreia em busca de justiça."
  },
  {
    nome: "Goblin",
    capa: "capas/goblin.jpg",
    sinopse: "Um ser imortal busca uma noiva humana para encerrar sua maldição."
  },
  {
    nome: "True Beauty",
    capa: "capas/true-beauty.jpg",
    sinopse: "Uma jovem descobre o amor e a autoestima através da maquiagem."
  }
];

const catalogo = document.getElementById("catalogo");
const contador = document.getElementById("contador");

let limiteTotal = 0;
let preco = 0;
let planoEscolhido = false;
let selecionados = [];

/* BOAS VINDAS */
document.getElementById("btn-entendi").onclick = () => {
  document.getElementById("boas-vindas").style.display = "none";
};

/* PLANOS */
document.querySelectorAll(".plano").forEach(btn => {
  btn.onclick = () => {
    limiteTotal = Number(btn.dataset.limite);
    preco = Number(btn.dataset.preco);
    planoEscolhido = true;
    selecionados = [];
    document.querySelectorAll(".card").forEach(c => c.classList.remove("selecionado"));
    atualizarContador();
  };
});

/* CATÁLOGO */
doramas.forEach(d => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${d.capa}">
    <h3>${d.nome}</h3>
    <button>Ver sinopse</button>
  `;

  card.onclick = () => {
    if (!planoEscolhido) {
      alert("Escolha um plano primeiro.");
      return;
    }

    if (selecionados.includes(d.nome)) {
      selecionados = selecionados.filter(x => x !== d.nome);
      card.classList.remove("selecionado");
    } else {
      if (selecionados.length >= limiteTotal) {
        alert("Você já escolheu o máximo por agora.");
        return;
      }
      selecionados.push(d.nome);
      card.classList.add("selecionado");
    }
    atualizarContador();
  };

  card.querySelector("button").onclick = e => {
    e.stopPropagation();
    document.getElementById("titulo-sinopse").textContent = d.nome;
    document.getElementById("texto-sinopse").textContent = d.sinopse;
    document.getElementById("modal-sinopse").style.display = "flex";
  };

  catalogo.appendChild(card);
});

/* MODAL SINOPSE */
document.getElementById("fechar-sinopse").onclick = () => {
  document.getElementById("modal-sinopse").style.display = "none";
};

/* CONTADOR */
function atualizarContador() {
  contador.textContent = `Escolhidos agora: ${selecionados.length} de ${limiteTotal}`;
}

/* FINALIZAR */
document.getElementById("finalizar").onclick = () => {
  if (!planoEscolhido) {
    alert("Escolha um plano.");
    return;
  }

  const msg = `
Pedido: ${pedidoId}

Plano: ${limiteTotal} doramas por R$${preco}
Validade: 30 dias

Doramas escolhidos agora:
${selecionados.length ? selecionados.map(d => "- " + d).join("\n") : "Nenhum no momento"}

Obs: Sei que posso escolher os demais depois.
`;

  window.open(`https://wa.me/5561999226868?text=${encodeURIComponent(msg)}`);
};

/* AJUDA */
document.getElementById("ajuda").onclick = () => {
  window.open(`https://wa.me/5511999999999?text=Olá! Preciso de ajuda para escolher meus doramas.`);
};
