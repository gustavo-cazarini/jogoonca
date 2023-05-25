// Verificação
console.log('script do perfil carregado');

try {
    const serv = "http://localhost:3000/";
    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = 1; // substitua 1 pelo ID do usuário que deseja atualizar
    const nome = form.nome.value;
    const isActive = true;
    const login = form.login.value;
    const senha = form.senha.value;

    try {
        const response = await fetch(`${serv}api/user/${id}?Nome=${nome}&IsActive=${isActive}&Login=${login}&Senha=${senha}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Nome: nome,
            IsActive: isActive,
            Login: login,
            Senha: senha
        })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro:', error);
    }
    });

} catch (error) {
    console.log(error);
}


