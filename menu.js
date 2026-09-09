// Menu-sanduíche do cabeçalho (celular). O menu já nasce ESCONDIDO no CSS
// (evita o flash de menu aberto no 1º carregamento); este JS só abre/fecha
// alternando data-menu na nav. Sem try-catch (padrão do Thiago): uso guardas.
(function () {
  const nav = document.querySelector("nav");
  const botao = document.querySelector(".abre-menu");
  const menu = document.getElementById("menu-principal");
  if (!nav || !botao || !menu) return; // faltou algo -> não faz nada (menu segue visível)

  function alterna(abrir) {
    const aberto = abrir === undefined ? nav.dataset.menu !== "aberto" : abrir;
    nav.dataset.menu = aberto ? "aberto" : "fechado";
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }

  alterna(false); // começa fechado

  botao.addEventListener("click", function () {
    alterna();
  });

  // clicou num link do menu -> navegou pra âncora, então fecha
  menu.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) alterna(false);
  });

  // Esc fecha e devolve o foco pro botão
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && nav.dataset.menu === "aberto") {
      alterna(false);
      botao.focus();
    }
  });
})();
