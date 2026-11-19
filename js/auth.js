
const formCadastro = document.getElementById("formCadastro");
const formLogin = document.getElementById("formLogin");

if (formCadastro) {
    formCadastro.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;
        const mensagem = document.getElementById("mensagemCadastro");

        if (senha.length < 6) {
            mensagem.textContent = "A senha deve ter pelo menos 6 caracteres.";
            mensagem.style.color = "#dc2626";
            return;
        }

        if (senha !== confirmarSenha) {
            mensagem.textContent = "As senhas não são iguais.";
            mensagem.style.color = "#dc2626";
            return;
        }

        const usuarios = obterDados("usuarios");

        const usuarioExiste = usuarios.some(usuario => usuario.email === email);

        if (usuarioExiste) {
            mensagem.textContent = "Este e-mail já está cadastrado.";
            mensagem.style.color = "#dc2626";
            return;
        }

        usuarios.push({
            nome: nome,
            email: email,
            senha: senha
        });

        salvarDados("usuarios", usuarios);

        mensagem.textContent = "Cadastro realizado com sucesso!";
        mensagem.style.color = "#16a34a";

        formCadastro.reset();
    });
}

if (formLogin) {
    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const mensagem = document.getElementById("mensagemLogin");

        const usuarios = obterDados("usuarios");

        const usuarioEncontrado = usuarios.find(usuario =>
            usuario.email === email && usuario.senha === senha
        );

        if (!usuarioEncontrado) {
            mensagem.textContent = "E-mail ou senha incorretos.";
            mensagem.style.color = "#dc2626";
            return;
        }

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.style.color = "#16a34a";

        setTimeout(function() {
            window.location.href = "produtos.html";
        }, 1000);
    });
}
