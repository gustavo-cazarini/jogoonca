if (document.body.classList.contains("indexpage")) {
    const index = () => {
        fetch("../htmlparts/pg_cad_login.html")
            .then(function (response) {
                return response.text();
            })
            .then(function (html) {
                content.innerHTML = html;
                let btn = document.getElementById("btn-vj");
                btn.addEventListener("click", () => {
                    let div = document.querySelector(".d-none");
                    div.classList.remove("d-none");
                    btn.classList.add("d-none");
                    if (!imgLogo.classList.contains("resize-img")) {
                        imgLogo.classList.add("resize-img");
                    }

                    let btnCad = document.getElementById("btn-cadastrese");
                    btnCad.addEventListener("click", () => {
                        telaCadastro();
                    });

                    let btnLog = document.getElementById("btn-entrar");
                    btnLog.addEventListener("click", () => {
                        telaLogin();
                    });
                });
            })
            .catch(function (err) {
                console.warn("Algo deu errado.", err);
            });
    };

    index();

    function telaCadastro() {
        fetch("../htmlparts/cadastro.html")
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                content.innerHTML = html;
                let btnVoltar = document.querySelector("#btn-voltar");
                let btnCad = document.querySelector("#btn-cad");
                btnVoltar.addEventListener("click", () => {
                    index();
                });
                btnCad.addEventListener("click", () => {
                    // Lógica do cadastro
                    /*
                    CHECKLIST
                     - api post
                     - alertar sucesso solicitando o login
                     - redirecionar para index
                */
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    function telaLogin() {
        fetch("../htmlparts/login.html")
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                content.innerHTML = html;

                let btnVoltar = document.getElementById("btn-voltar");
                let btnEntrar = document.querySelector("#btn-entrar");
                let linkEsqueceu = document.querySelector("#link-esqueceu");

                btnVoltar.addEventListener("click", () => {
                    index();
                });
                btnEntrar.addEventListener("click", () => {
                    // Lógica do login

                    /*
                    CHECKLIST
                     - api get
                     - verificar se api retornou algo, senão mostrar erro 'Usuário não cadastrado'
                     - se api retornou, salvar credenciais no localStorage
                       - redirecionar para inicial
                */

                    // apresentar na reunião:
                    window.location.href = "../inicial.html";
                });

                linkEsqueceu.addEventListener("click", () => {
                    telaEsqueceu();
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    function telaEsqueceu() {
        fetch("../htmlparts/esqueceu_senha.html")
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                content.innerHTML = html;

                let btnVoltar = document.getElementById("btn-voltar");
                let btnConfirmar = document.querySelector("#btn-confirmar");

                btnVoltar.addEventListener("click", () => {
                    index();
                });

                btnConfirmar.addEventListener("click", () => {
                    enviarEmail();
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    function enviarEmail() {
        alert(
            "Um Email com as instruções foram enviados para você\n\nAbra sua caixa de email e verifique"
        );
    }
}

// SCRIPT PARA AS PÁGINAS DO JOGO
if (document.body.classList.contains("inicialpage")) {
    audioFundo = document.querySelector("#audioFundo");
    if (!localStorage.getItem("volume") || !localStorage.getItem("isPaused")) {
        localStorage.setItem("volume", "1");
        localStorage.setItem("isPaused", "false");
    }
    audioFundo.volume = parseFloat(localStorage.getItem("volume"));
    if (JSON.parse(localStorage.getItem("isPaused"))) {
        audioFundo.pause();
    }

    let content = document.querySelector("#content-inicial");

    const inicial = () => {
        fetch("../htmlparts/Inicial/index.html")
            .then(function (response) {
                return response.text();
            })
            .then(function (html) {
                content.innerHTML = html;

                let btnConfig = document.querySelector("#config-btn");

                btnConfig.addEventListener("click", () => {
                    telaConfig();
                });

                // Botões do centro
                let btnJogar = document.querySelector('#jogar-btn');
                let btnComoJogar = document.querySelector("#comoJogar-btn");

                btnJogar.addEventListener('click', () => {
                    location.href = './pages/jogo';
                });

                btnComoJogar.addEventListener("click", () => {
                    telaComoJogar();
                });

                // Três botões de baixo
                let btnPerfil = document.querySelector("#user-btn");
                let btnInventario = document.querySelector("#inventario-btn");
                let btnHistorico = document.querySelector("#history-btn");

                btnPerfil.addEventListener("click", () => {
                    telaPerfil();
                });

                btnInventario.addEventListener("click", () => {
                    telaInventario();
                });

                btnHistorico.addEventListener("click", () => {
                    telaHistorico();
                });
            })
            .catch(function (err) {
                console.warn("Algo deu errado.", err);
            });
    };

    function telaConfig() {
        fetch("../pages/config/index.html")
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                content.innerHTML = html;

                let abaixarBtn = document.querySelector("#abaixar-btn");
                let aumentarBtn = document.querySelector("#aumentar-btn");
                let playPause = document.querySelector("#play-pause");
                let playPauseIcon = document.querySelector("#play-pause img");

                function changePlayIcon() {
                    if (JSON.parse(localStorage.getItem("isPaused"))) {
                        playPauseIcon.src = "./icons/play.png";
                    } else {
                        playPauseIcon.src = "./icons/pausar.png";
                    }
                }

                abaixarBtn.addEventListener("click", () => {
                    let volume = parseFloat(localStorage.getItem("volume"));

                    switch (volume) {
                        case 1:
                            localStorage.setItem("volume", 0.7);
                            audiowave(
                                parseFloat(localStorage.getItem("volume"))
                            );
                            break;
                        case 0.7:
                            localStorage.setItem("volume", 0.3);
                            audiowave(
                                parseFloat(localStorage.getItem("volume"))
                            );
                            break;
                        case 0.3:
                            localStorage.setItem("volume", 0);
                            audiowave(
                                parseFloat(localStorage.getItem("volume"))
                            );
                            break;
                        default:
                            break;
                    }
                });

                aumentarBtn.addEventListener("click", () => {
                    let volume = parseFloat(localStorage.getItem("volume"));

                    switch (volume) {
                        case 0:
                            localStorage.setItem("volume", 0.3);
                            audiowave(
                                parseFloat(localStorage.getItem("volume"))
                            );
                            break;
                        case 0.3:
                            localStorage.setItem("volume", 0.7);
                            audiowave(
                                parseFloat(localStorage.getItem("volume"))
                            );
                            break;
                        case 0.7:
                            localStorage.setItem("volume", 1);
                            audiowave(
                                parseFloat(localStorage.getItem("volume"))
                            );
                            break;
                        default:
                            break;
                    }
                });

                playPause.addEventListener("click", () => {
                    let isPaused = localStorage.getItem("isPaused");
                    if (isPaused == "false") {
                        audioFundo.pause();
                        localStorage.setItem("isPaused", "true");
                        changePlayIcon();
                    } else {
                        audioFundo.play();
                        localStorage.setItem("isPaused", "false");
                        changePlayIcon();
                    }
                });

                function audiowave(volume) {
                    let x = document.querySelectorAll(
                        ".audiowave div:nth-child(-n+3)"
                    );
                    let y = document.querySelectorAll(
                        ".audiowave div:nth-child(n+4):nth-child(-n+6)"
                    );
                    let z = document.querySelectorAll(
                        ".audiowave div:nth-child(n+7):nth-child(-n+9)"
                    );

                    switch (volume) {
                        case 1:
                            x.forEach((element) => {
                                element.style.backgroundColor = "#6A9601";
                            });
                            y.forEach((element) => {
                                element.style.backgroundColor = "#EAF046";
                            });
                            z.forEach((element) => {
                                element.style.backgroundColor = "#E94F45";
                            });
                            break;
                        case 0.7:
                            x.forEach((element) => {
                                element.style.backgroundColor = "#6A9601";
                            });
                            y.forEach((element) => {
                                element.style.backgroundColor = "#EAF046";
                            });
                            z.forEach((element) => {
                                element.style.backgroundColor = "#aaa";
                            });
                            break;
                        case 0.3:
                            x.forEach((element) => {
                                element.style.backgroundColor = "#6A9601";
                            });
                            y.forEach((element) => {
                                element.style.backgroundColor = "#aaa";
                            });
                            z.forEach((element) => {
                                element.style.backgroundColor = "#aaa";
                            });
                            break;
                        default:
                            x.forEach((element) => {
                                element.style.backgroundColor = "#aaa";
                            });
                            y.forEach((element) => {
                                element.style.backgroundColor = "#aaa";
                            });
                            z.forEach((element) => {
                                element.style.backgroundColor = "#aaa";
                            });
                            break;
                    }
                    audioFundo.volume = parseFloat(
                        localStorage.getItem("volume")
                    );
                }

                audiowave(parseFloat(localStorage.getItem("volume")));
                changePlayIcon();

                let btnVoltar = document.querySelector("#voltar");

                btnVoltar.addEventListener("click", () => {
                    inicial();
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    // Funcões botões centrais
    function telaComoJogar() {
        fetch("../pages/comoJogar/index.html")
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                content.innerHTML = html;

                // Funções Como Jogar
                // Lista de textos
                const textos = [
                    "AS PEÇAS SE MOVIMENTAM NO TABULEIRO OCUPANDO CASAS ADJACENTES, VAZIAS, UMA CASA POR VEZ.",
                    'A "ONÇA" PODE COMER O "CAHORRO" QUANDO SALTA SOBRE ELE.',
                    'A "ONÇA" PODE CONTINUAR O MOVIMENTO DE COMER EMPRE QUANDO POSSÍVEL.',
                    "A “ONÇA” VENCE QUANDO COMER 5 (CINCO) “CACHORROS”.",
                    'QUANDO A "ONÇA" ESTIVER ENCURRALADA, SEM POSSIBILIDADE DE MOVIMENTO, OS "CACHORROS" VENCEM A PARTIDA.',
                ];

                // Lista de caminhos de imagens
                const imagens = [
                    "./pages/comoJogar/img/gif/movimentacao1.gif",
                    "./pages/comoJogar/img/gif/movimentacao2.gif",
                    "./pages/comoJogar/img/gif/movimentacao3.gif",
                    "./pages/comoJogar/img/gif/movimentacao4.gif",
                    "./pages/comoJogar/img/gif/movimentacao5.gif",
                ];

                let indiceAtual = 0; // Índice inicial

                // Manipulador de eventos para o botão "Proximo"
                function atualizarTextoEImagem() {
                    document.getElementById("gif").src = imagens[indiceAtual];
                    document.getElementById("texto").textContent =
                        textos[indiceAtual];

                    if (indiceAtual === 4) {
                        document.getElementById("continuar").textContent =
                            "MENU";
                        document.querySelector(
                            ".botao-containerMenu"
                        ).style.marginLeft = "800px";
                    } else {
                        document.getElementById("continuar").textContent =
                            "CONTINUAR";
                        document.querySelector(
                            ".botao-containerMenu"
                        ).style.marginLeft = "750px";
                    }

                    if (indiceAtual === 0) {
                        document.getElementById("botaoVoltar").disabled = true;
                    } else {
                        document.getElementById("botaoVoltar").disabled = false;
                    }
                }

                // Manipulador de eventos para o botão "Proximo"
                document
                    .getElementById("continuar")
                    .addEventListener("click", function () {
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
                document
                    .getElementById("botaoVoltar")
                    .addEventListener("click", voltar);

                let btnVoltar = document.querySelector("#voltar");

                btnVoltar.addEventListener("click", () => {
                    inicial();
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    function telaPerfil() {
        fetch("../pages/perfil/index.html")
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                content.innerHTML = html;

                let btnVoltar = document.querySelector("#voltar");

                btnVoltar.addEventListener("click", () => {
                    inicial();
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    function telaInventario() {
        fetch("../pages/inventario/index.html")
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                content.innerHTML = html;

                if (!document.querySelector("#scriptinventario")) {
                    const script = document.createElement("script");
                    script.src = "./pages/inventario/js/script.js";
                    script.id = "scriptinventario";
                    document.body.appendChild(script);
                }

                let btnVoltar = document.querySelector("#voltar");

                btnVoltar.addEventListener("click", () => {
                    inicial();
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    function telaHistorico() {
        fetch("../pages/historico/index.html")
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                content.innerHTML = html;

                let btnVoltar = document.querySelector("#voltar");

                btnVoltar.addEventListener("click", () => {
                    inicial();
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    inicial();
}

if (document.body.classList.contains("page-jogo")) {
    const construct = async (html, funcoes) => {
        let content = document.querySelector('#content');
        await html().then((res) => {
            content.innerHTML = res;
            funcoes();
        });
    }

    async function escolhaPeca() {
        return await fetch('./escolha_peca.html')
            .then((res) => {
                return res.text();
            });
    }

    function funcoesPeca() {
        let btnVoltar = document.querySelector('#btn-voltar');
        let pecas = document.querySelectorAll('.peca');

        pecas.forEach((peca) => {
            peca.addEventListener('click', function () {
                localStorage.setItem("peca", this.getAttribute('data-peca'));
                construct(escolhaTema, funcoesTema);
            });
        });

        btnVoltar.addEventListener('click', () => {
            location.href = '../../inicial.html';
        });
    }

    async function escolhaTema() {
        return await fetch('./escolha_tema.html')
            .then((res) => {
                return res.text();
            });
    }

    function funcoesTema() {
        return;
    }

    construct(escolhaPeca, funcoesPeca);
}