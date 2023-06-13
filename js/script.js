const apiUrl = "https://adugo-game-backend-prd.onrender.com/";
const apiRender = "https://api-jdo-h6kx.onrender.com/";
const apiMatUrl = "http://44.204.47.153:3333/";
//https://adugo-game-backend-01.onrender.com/
//const apiUrl = 'http://44.204.47.153:3333/';
//http://127.0.0.1:5003


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

                async function cadastro(nome, email, login, senha) {
                    const data = {
                        nome: nome,
                        email: email,
                        login: login,
                        senha: senha,
                    };
                    try {
                        const response = await fetch(
                            `${apiUrl}api/register?&Nome=${nome}&IsActive=${true}&Email=${email}&Login=${login}&Senha=${senha}`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Access-Control-Allow-Origin": "*",
                                },
                                body: JSON.stringify(data),
                            }
                        );
                        console.log(JSON.stringify(data));

                        if (response.ok) {
                            alert(
                                "Cadastrado com sucesso!\nPor favor, faça o login."
                            );
                            location.href = "../index.html";
                        } else {
                            console.error(
                                "Erro ao cadastrar:",
                                response.status
                            );
                        }
                    } catch (error) {
                        console.error("Erro ao fazer a requisição:", error);
                    }
                }

                btnCad.addEventListener("click", () => {
                    let nome = document.querySelector("#nome").value;
                    let email = document.querySelector("#email").value;
                    let login = document.querySelector("#login").value;
                    let senha = document.querySelector("#senha").value;
                    cadastro(nome, email, login, senha);
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    async function login(log, senha) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({}),
        };

        await fetch(`${apiUrl}api/login?Login=${log}&Senha=${senha}`, options)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.status === "success") {
                    localStorage.setItem(
                        "jogador", data.user_id
                    );
                    location.href = "./inicial.html";
                } else {
                    msgErr.textContent = "Usuário ou Senha incorretos";
                }
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
                let inpLogin = document.querySelector("#login");
                let inpSenha = document.querySelector("#senha");
                let msgErr = document.querySelector(".msg-err");

                btnVoltar.addEventListener("click", () => {
                    index();
                });

                async function login(log, senha) {
                    const options = {
                        method: "POST",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({}),
                    };

                    await fetch(
                        `${apiUrl}api/login?Login=${log}&Senha=${senha}`,
                        options
                    )
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            //alert(JSON.stringify(data));
                            if (data.status === "success") {
                                // Adicionado para a página de 'atualizar perfil'
                                localStorage.setItem("idJogador", data.user_id);
                                // -----
                                localStorage.setItem("jogador", data.user_id);
                                location.href = "./inicial.html";
                            } else {
                                msgErr.textContent =
                                    "Usuário ou Senha incorretos";
                            }
                        });
                }

                btnEntrar.addEventListener("click", () => {
                    login(inpLogin.value, inpSenha.value);
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
                let email = document.querySelector("#email");

                btnVoltar.addEventListener("click", () => {
                    index();
                });

                btnConfirmar.addEventListener("click", () => {
                    enviarEmail(email.value);
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }

    function enviarEmail(email) {
        fetch(`${apiUrl}api/email/${email}`)
            .then((response) => {
                return response.json();
            })
            .then((html) => {
                console.log(html);
                if (html?.length) {
                    localStorage.setItem(
                        "recuperar_senha",
                        JSON.stringify(html)
                    );
                    location.href = "./pages/recuperarSenha";
                } else {
                    document.querySelector(".msg-err").textContent =
                        "E-Mail não encontrado";
                }
            });
    }
}
/*


    REDEFINIR SENHA
*/
if (document.body.classList.contains("redefinirSenha")) {
    let dadosUsuario = localStorage.getItem("recuperar_senha");
    let pLogin = document.querySelector(".login");
    let btnSalvar = document.querySelector("#btn-salvar");
    let btnVoltar = document.querySelector("#btn-voltar");
    let senha = document.querySelector("#senha");
    let confirmarSenha = document.querySelector("#confirmaSenha");
    let msgErr = document.querySelector(".msg-err");

    dadosUsuario = JSON.parse(dadosUsuario);
    let id = dadosUsuario[0].id;
    let nome = dadosUsuario[0].nome;
    let email = dadosUsuario[0].email;
    let login = dadosUsuario[0].login;
    let isactive = dadosUsuario[0].isactive;

    pLogin.textContent += dadosUsuario[0].login;

    async function atualizarSenha(senha1, senha2) {
        if (senha1 == senha2) {
            await fetch(
                `${apiUrl}api/user/${id}?Nome=${nome}&Email=${email}&Login=${login}&Senha=${senha1}&IsActive=${isactive}`,
                { method: "PUT" }
            )
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                    console.log(data);
                });
            alert("Atualizado com sucesso!\nPor favor, faça login");
            location.href = "../../";
        } else {
            msgErr.textContent = "As senhas não conferem";
        }
    }

    btnSalvar.addEventListener("click", () => {
        atualizarSenha(senha.value, confirmarSenha.value);
    });

    btnVoltar.addEventListener("click", () => {
        location.href = "../../";
    });
}

// SCRIPT PARA AS PÁGINAS INICIAIS DO JOGO
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
                let btnLogout = document.querySelector("#logout-btn");

                btnConfig.addEventListener("click", () => {
                    telaConfig();
                });

                btnLogout.addEventListener("click", () => {
                    localStorage.removeItem("jogador");
                    location.href = "index.html";
                });

                // Botões do centro
                let btnJogar = document.querySelector("#jogar-btn");
                let btnComoJogar = document.querySelector("#comoJogar-btn");

                btnJogar.addEventListener("click", () => {
                    location.href = "./pages/jogo";
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
                        document.getElementById("continuar").style.display =
                            "none"; /*Novo*/
                        document.querySelector(
                            ".botao-RetornarMenu"
                        ).style.marginBottom = "-290px"; /*Novo*/
                    } else {
                        document.querySelector(
                            ".botao-containerMenu"
                        ).style.marginLeft = "750px"; /*Novo*/
                        document.getElementById("continuar").style.display =
                            "block"; /*Novo*/
                        document.querySelector(
                            ".botao-RetornarMenu"
                        ).style.marginBottom = "-450px"; /*Novo*/
                    }

                    if (indiceAtual === 0) {
                        document.getElementById("botaoVoltar").style.display =
                            "none"; /*Novo*/
                    } else {
                        document.getElementById("botaoVoltar").style.display =
                            "block"; /*Novo*/
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

    const perfilData = async (nomeInp, emailInp, loginInp) => {
        await fetch(`${apiRender}api/user/${localStorage.getItem("idJogador")}`)
            .then((ret) => {
                return ret.text();
            })
            .then((data) => {
                let parsedData = JSON.parse(data);
                nomeInp.value = parsedData[0].nome;
                emailInp.value = parsedData[0].email;
                loginInp.value = parsedData[0].login;
            });
    };

    function telaPerfil() {
        fetch("../pages/perfil/index.html")
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                content.innerHTML = html;

                const dadosUsuario = localStorage.getItem("jogador");

                const form = document.querySelector(".form");
                const nome = document.querySelector("#nome");
                const email = document.querySelector("#email");
                const login = document.querySelector("#login");
                const senha = document.querySelector("#senha");

                // Pega os dados do jogador pelo ID e insere dados nos inputs
                perfilData(nome, email, login);

                let btnVoltar = document.querySelector("#voltar");
                btnVoltar.addEventListener("click", function () {
                    inicial();
                });

                async function atualizar(id, nome, email, login, senha) {
                    await fetch(
                        `${apiRender}api/user/${id}?Nome=${nome}&Email=${email}&Login=${login}&Senha=${senha}&IsActive=true`,
                        { method: "PUT" }
                    )
                        .then((res) => {
                            return res.text();
                        })
                        .then((data) => {
                            console.log(data);
                        });
                    alert(
                        "Atualizado com sucesso!\n\nNota: a atualização terá efeito a partir do próximo login"
                    );
                }

                form.addEventListener("submit", (e) => {
                    e.preventDefault();
                    atualizar(
                        localStorage.getItem("idJogador"),
                        nome.value,
                        email.value,
                        login.value,
                        senha.value
                    );
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
    
                // Obter o ID do jogador do localStorage
                var jogadorId = localStorage.getItem("idJogador");
    
                // Fazer a requisição ao backend
                fetch('/api/vitorias', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Allow-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        jogador_id: jogadorId
                    })
                })
                .then(response => response.json())
                .then(data => {
                    // Atualizar o número de vitórias no elemento do HTML
                    var numeroVitorias = data.numero_vitorias;
                    document.getElementById('numero-vitorias').textContent = numeroVitorias;
                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                });
            })
            .catch((err) => {
                console.warn("Algo deu errado!", err);
            });
    }
    
    inicial();
}
/*

--

*/
if (document.body.classList.contains("page-jogo")) {
    let audioFundo = document.querySelector("#audioFundo");
    audioFundo.volume = JSON.parse(localStorage.getItem("volume"));

    const construct = async (html, funcoes) => {
        let content = document.querySelector("#content");
        await html().then((res) => {
            content.innerHTML = res;
            funcoes();
        });
    };

    function temas() {
        // temporário... aqui vai ser o 'get' dos temas
        return [
            {
                id: 1,
                nome: "Super Mario",
                img: "../../TEMAS/mario/circleMario.png",
                fundo: "../../TEMAS/mario/fundo.png",
                placar: "../../TEMAS/mario/placar.png",
            },
            {
                id: 2,
                nome: "Toy Story",
                img: "../../TEMAS/toystory/circleToystory.png",
                fundo: "../../TEMAS/toystory/fundo.png",
                placar: "../../TEMAS/toystory/placar.png",
            },
            {
                id: 3,
                nome: "Selva",
                img: "../../TEMAS/selva/circleSelva.png",
                fundo: "../../TEMAS/selva/fundo.png",
                placar: "../../TEMAS/selva/placar.png",
            },
        ];
    }
    // temporário... aqui vai ser o 'get' das skins
    function skins(idTema) {
        if (idTema == 1) {
            return [
                {
                    id: 1,
                    img_cachorro: "../../TEMAS/mario/yoshi.png",
                    img_onca: "../../TEMAS/mario/mario.png",
                },
            ];
        } else if (idTema == 2) {
            return [
                {
                    id: 1,
                    img_cachorro: "../../TEMAS/toystory/rex.png",
                    img_onca: "../../TEMAS/toystory/woody.png",
                },
            ];
        } else if (idTema == 3) {
            return [
                {
                    id: 1,
                    img_cachorro: "../../TEMAS/selva/zebra.png",
                    img_onca: "../../TEMAS/selva/leao.png",
                },
            ];
        }
    }

    async function escolhaPeca() {
        return await fetch("../pages/jogo/escolha_peca.html").then((res) => {
            return res.text();
        });
    }

    function funcoesPeca() {
        let btnVoltar = document.querySelector("#btn-voltar");
        let pecas = document.querySelectorAll(".peca");

        pecas.forEach((peca) => {
            peca.addEventListener("click", function () {
                localStorage.setItem("peca", this.getAttribute("data-peca"));
                construct(escolhaTema, funcoesTema);
            });
        });

        btnVoltar.addEventListener("click", () => {
            location.href = "../../inicial.html";
        });
    }

    async function escolhaTema() {
        return await fetch("../pages/jogo/escolha_tema.html").then((res) => {
            return res.text();
        });
    }

    function funcoesTema() {
        let btnVoltar = document.querySelector("#btn-voltar");
        let flexContainer = document.querySelector(".d-flex");

        btnVoltar.addEventListener("click", () => {
            construct(escolhaPeca, funcoesPeca);
        });

        let objArr = temas();
        let temasStr = "";

        objArr.forEach((key) => {
            temasStr += `
                <div>
                    <img data-placar="${key.placar}" data-fundo="${key.fundo}" data-id="${key.id}" class="border-2 circle tema" width="150px"
                        height="150px" src="${key.img}" alt="imgTema" />
                    <p class="text-center text-green">${key.nome}</p>
                </div>
            `;
        });
        flexContainer.innerHTML = temasStr;

        let arrTemas = document.querySelectorAll(".tema");
        arrTemas.forEach((key) => {
            key.addEventListener("click", function () {
                localStorage.setItem("fundo", this.getAttribute("data-fundo"));
                localStorage.setItem("tema", this.getAttribute("data-id"));
                localStorage.setItem(
                    "placar",
                    this.getAttribute("data-placar")
                );
                construct(escolhaSkin, funcoesSkin);
            });
        });
    }

    async function escolhaSkin() {
        return await fetch("../pages/jogo/escolha_skin.html").then((res) => {
            return res.text();
        });
    }

    function funcoesSkin() {
        document.querySelector(
            "html"
        ).style.backgroundImage = `url(${localStorage.getItem("fundo")})`;
        let btnVoltar = document.querySelector("#btn-voltar");
        let flexContainer = document.querySelector(".d-flex");

        btnVoltar.addEventListener("click", () => {
            construct(escolhaTema, funcoesTema);
        });

        let objArr = skins(JSON.parse(localStorage.getItem("tema")));
        let skinsStr = "";
        let peca = localStorage.getItem("peca");

        objArr.forEach((key) => {
            if (peca == "onca") {
                skinsStr += `
                <div>
                    <img data-id="${key.id}" data-skin="${key.img_onca}" class="border-2 circle tema" width="150px"
                        height="150px" src="${key.img_onca}" alt="imgTema" />
                </div>
            `;
            } else {
                skinsStr += `
                <div>
                    <img data-id="${key.id}" data-skin="${key.img_cachorro}" class="border-2 circle tema" width="150px"
                        height="150px" src="${key.img_cachorro}" alt="imgTema" />
                </div>
            `;
            }
        });
        flexContainer.innerHTML = skinsStr;

        let arrSkins = document.querySelectorAll(".tema");
        arrSkins.forEach((key) => {
            key.addEventListener("click", function () {
                localStorage.setItem("skin", this.getAttribute("data-skin"));
                localStorage.setItem("idSkin", this.getAttribute("data-id"));
                construct(esperaJogador, funcoesEspera);
            });
        });
    }

    async function esperaJogador() {
        return await fetch("../pages/jogo/espera_jogador.html").then((res) => {
            return res.text();
        });
    }

    function funcoesEspera() {
        let btnVoltar = document.querySelector("#btn-voltar");
    
        btnVoltar.addEventListener("click", () => {
            construct(escolhaSkin, funcoesSkin);
        });
    
        let jogador = localStorage.getItem("jogador");
        let tema = localStorage.getItem("tema");
        let peca = localStorage.getItem("peca");
    
        console.log(jogador);
        console.log(tema);
        console.log(peca);

        // Crie um POST para o servidor com idUsuario, skin e peca
        fetch(`${apiUrl}api/queue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: jogador, tema: tema, peca: peca })
        }).then(res => res.json())
          .then(data => {
            // Se o servidor retornar true (jogador adicionado à fila com sucesso), verifique se a partida pode ser criada
            if (data.status === "success") {
                let intervalId = setInterval(checkGameStatus, 5000);
                
                function checkGameStatus() {
                    let userId = localStorage.getItem('jogador');
                
                    fetch(`${apiUrl}api/check_game_status`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify({ id_usuario: userId })
                    })
                        .then(res => res.json())
                        .then(data => {
                            // Se o servidor retornar o ID da partida (partida pode ser criada), limpe o intervalo e redirecione para a página do jogo
                            if (data.status === "success") {
                                clearInterval(intervalId);
                                console.log("Game created!", "Session ID:", data.session_id);
                                localStorage.setItem("session_id", data.session_id);
                
                                localStorage.setItem("partida-jogador1", data.id_usuario1);
                                localStorage.setItem("partida-jogador2", data.id_usuario2);

                                location.href = "../pages/jogo/game.html";
                            } else {
                                // Se o servidor retornar false (partida não pode ser criada), o intervalo continuará verificando
                                console.log("Waiting for other player...");
                            }
                        });
                }
                
                
                }
            else {
                // Se o servidor retornar false (jogador não adicionado à fila), você pode manipular esse caso
                console.error("Failed to add player to queue");
            }
        });
    }
    

    construct(escolhaPeca, funcoesPeca);




}

function sendGameStatusRequest() {
    setInterval(() => {
      fetch('/api/get_game_status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, 1000);
  } 
  sendGameStatusRequest();
