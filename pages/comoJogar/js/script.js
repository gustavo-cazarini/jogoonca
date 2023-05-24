    // Lista de textos
    const textos = [
      "AS PEÇAS SE MOVIMENTAM NO TABULEIRO OCUPANDO CASAS ADJACENTES, VAZIAS, UMA CASA POR VEZ.",
      "A \"ONÇA\" PODE COMER O \"CAHORRO\" QUANDO SALTA SOBRE ELE.",
      "A \"ONÇA\" PODE CONTINUAR O MOVIMENTO DE COMER EMPRE QUANDO POSSÍVEL.",
      "A \“ONÇA\” VENCE QUANDO COMER 5 (CINCO) \“CACHORROS\”.",
      "QUANDO A \"ONÇA\" ESTIVER ENCURRALADA, SEM POSSIBILIDADE DE MOVIMENTO, OS \"CACHORROS\" VENCEM A PARTIDA."
    ];

    // Lista de caminhos de imagens
    const imagens = [
      "./pages/comoJogar/img/gif/movimentacao1.gif",
      "./pages/comoJogar/img/gif/movimentacao2.gif",
      "./pages/comoJogar/img/gif/movimentacao3.gif",
      "./pages/comoJogar/img/gif/movimentacao4.gif",
      "./pages/comoJogar/img/gif/movimentacao5.gif"
    ];

    let indiceAtual = 0; // Índice inicial

    // Manipulador de eventos para o botão "Proximo"
    function atualizarTextoEImagem() {
      document.getElementById("gif").src = imagens[indiceAtual];
      document.getElementById("texto").textContent = textos[indiceAtual];

      if (indiceAtual === 4) {
        document.getElementById("continuar").textContent = "MENU";
        document.querySelector(".botao-containerMenu").style.marginLeft = "800px";
      } else {
        document.getElementById("continuar").textContent = "CONTINUAR";
        document.querySelector(".botao-containerMenu").style.marginLeft = "750px";
        
      }

      if (indiceAtual === 0) {
        document.getElementById("botaoVoltar").disabled = true;
      } else {
        document.getElementById("botaoVoltar").disabled = false;
      }
    }

    // Manipulador de eventos para o botão "Proximo"
    document.getElementById("continuar").addEventListener("click", function() {
      indiceAtual = (indiceAtual + 1) % textos.length;
      atualizarTextoEImagem();
    });

    // Atualizar texto e imagem inicialmente
    atualizarTextoEImagem();

    // Função para voltar para o texto e imagem anterior
    function voltar() {
      indiceAtual--;

      if (indiceAtual < 0) {
        indiceAtual = textos.length - 1;
      }

      atualizarTextoEImagem();
    }

    // Ouvinte de evento para o botão "VOLTAR"
    document.getElementById("botaoVoltar").addEventListener("click", voltar);
