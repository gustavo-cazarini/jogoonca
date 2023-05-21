fetch('../htmlparts/pg_cad_login.html').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
    content.innerHTML = html;
    let btn = document.getElementById("btn-vj");
    btn.addEventListener("click", () => {
        tela02();
    });
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

function tela02() {
    fetch('../cadastro_login.html').then(function (response) {
        return response.text();
    }).then((html) => {
        if(!imgLogo.classList.contains('resize-img')) {
            imgLogo.classList.add("resize-img");
        }
        content.innerHTML = html;

        let btnCad = document.getElementById("btn-cadastrese");
        btnCad.addEventListener("click", () => {
            telaCadastro();
        });

        let btnLog = document.getElementById("btn-entrar");
        btnLog.addEventListener("click", () => {
            telaLogin();
        });
    }).catch((err) => {
        console.warn('Algo deu errado!', err);
    });
}

function telaCadastro() {
    fetch('../cadastro.html').then((response) => {
        return response.text();
    }).then((html) => {
        content.innerHTML = html;
        let btnVoltar = document.getElementById("btn-voltar");
        btnVoltar.addEventListener("click", () => {
            tela02();
        })
    }).catch((err) => {
        console.warn('Algo deu errado!', err);
    });
}

function telaLogin() {
    fetch('../login.html').then((response) => {
        return response.text();
    }).then((html) => {
        content.innerHTML = html;

        let btnVoltar = document.getElementById("btn-voltar");
        btnVoltar.addEventListener("click", () => {
            tela02();
        })
    }).catch((err) => {
        console.warn('Algo deu errado!', err);
    });
}