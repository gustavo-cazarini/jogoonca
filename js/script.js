const index = () => {
    fetch('../htmlparts/pg_cad_login.html').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
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