if(document.body.classList.contains('indexpage')) {
    const index = () => {
        fetch('../htmlparts/pg_cad_login.html').then(function (response) {
        return response.text();
    }).then(function (html) {
        content.innerHTML = html;
        let btn = document.getElementById("btn-vj");
        btn.addEventListener("click", () => {
            let div = document.querySelector('.d-none');
            div.classList.remove('d-none');
            btn.classList.add('d-none');
            if(!imgLogo.classList.contains('resize-img')) {
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
    }).catch(function (err) {
        console.warn('Algo deu errado.', err);
    });
    }
    
    index();
    
    function telaCadastro() {
        fetch('../htmlparts/cadastro.html').then((response) => {
            return response.text();
        }).then((html) => {
            content.innerHTML = html;
            let btnVoltar = document.querySelector("#btn-voltar");
            let btnCad = document.querySelector('#btn-cad');
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
            })
        }).catch((err) => {
            console.warn('Algo deu errado!', err);
        });
    }
    
    function telaLogin() {
        fetch('../htmlparts/login.html').then((response) => {
            return response.text();
        }).then((html) => {
            content.innerHTML = html;
    
            let btnVoltar = document.getElementById("btn-voltar");
            let btnEntrar = document.querySelector("#btn-entrar");
    
            btnVoltar.addEventListener("click", () => {
                index();
            });
            btnEntrar.addEventListener('click', () => {
                // Lógica do login
    
                /*
                    CHECKLIST
                     - api get
                     - verificar se api retornou algo, senão mostrar erro 'Usuário não cadastrado'
                     - se api retornou, salvar credenciais no localStorage
                       - redirecionar para inicial
                */
    
                // apresentar na reunião:
                window.location.href = '../inicial.html';
            })
        }).catch((err) => {
            console.warn('Algo deu errado!', err);
        });
    }
}

if(document.body.classList.contains('inicialpage')) {
    const [configBtn, userBtn, historyBtn, comoJogarBtn, inventarioBtn] = 
    [
        document.querySelector("#config-btn"),
        document.querySelector('#user-btn'),
        document.querySelector('#history-btn'),
        document.querySelector('#comoJogar-btn'),
        document.querySelector('#inventario-btn'),
    ];

    configBtn.addEventListener('click', () => {
        fetch('../pages/config/pagina1.html').then(function (response) {
            return response.text();
        }).then(function (html) {
            document.body.innerHTML = html;
            var script = document.createElement('script');
            script.src = './pages/config/js/scriptConfig.js';
            document.head.appendChild(script);
        }).catch(function (err) {
            console.warn('Algo deu errado.', err);
        });
    });

    userBtn.addEventListener('click', () => {
        fetch('../pages/perfil/Index.html').then(function (response) {
            return response.text();
        }).then(function (html) {
            document.body.innerHTML = html;
            var script = document.createElement('script');
            script.src = './pages/perfil/js/script.js';
            document.head.appendChild(script);
        }).catch(function (err) {
            console.warn('Algo deu errado.', err);
        });
    });

    historyBtn.addEventListener('click', () => {
        fetch('../pages/historico/index.html').then(function (response) {
            return response.text();
        }).then(function (html) {
            document.body.innerHTML = html;
        }).catch(function (err) {
            console.warn('Algo deu errado.', err);
        });
    });

    comoJogarBtn.addEventListener('click', () => {
        fetch('../pages/comoJogar/index.html').then(function (response) {
            return response.text();
        }).then(function (html) {
            document.body.innerHTML = html;
            
            var script = document.createElement('script');
            script.src = './pages/comoJogar/js/script.js';
            document.head.appendChild(script);
        }).catch(function (err) {
            console.warn('Algo deu errado.', err);
        });
    });

    inventarioBtn.addEventListener('click', () => {
        fetch('../pages/inventario/index.html').then(function (response) {
            return response.text();
        }).then(function (html) {
            document.body.innerHTML = html;
            
            var script = document.createElement('script');
            script.src = './pages/inventario/js/script.js';
            document.head.appendChild(script);
        }).catch(function (err) {
            console.warn('Algo deu errado.', err);
        });
    });
}