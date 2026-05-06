document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.getElementById("btn-menu");
  const menu = document.getElementById("menu-mobile");
  const overlay = document.getElementById("overlay-menu");
  const btnFechar = document.querySelector(".btn-fechar");
  const menuLinks = document.querySelectorAll("#menu-mobile nav ul li a");

  if (!btnMenu || !menu || !overlay) return;

  const abrirMenu = () => {
    menu.classList.add("abrir-menu");
    overlay.classList.add("ativo"); // ✅ Mostra overlay
    document.body.style.overflow = "hidden"; // ✅ Impede scroll do fundo
  };
  
  const fecharMenu = () => {
    menu.classList.remove("abrir-menu");
    overlay.classList.remove("ativo"); // ✅ Esconde overlay
    document.body.style.overflow = ""; // ✅ Restaura scroll
  };

  btnMenu.addEventListener("click", abrirMenu);

  if (btnFechar) {
    btnFechar.addEventListener("click", fecharMenu);
  }

  overlay.addEventListener("click", fecharMenu);

  // Fechar menu ao clicar em qualquer link
  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      fecharMenu();
      
      setTimeout(() => {
        const targetId = link.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100);
    });
  });
});

// Menu fixo com efeito de scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
    }
});

// BOTÃO VOLTAR AO TOPO
const btnTopo = document.getElementById('btnTopo');

if (btnTopo) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnTopo.classList.add('visible');
        } else {
            btnTopo.classList.remove('visible');
        }
    });
    
    btnTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ANIMAÇÃO DE DIGITAÇÃO - CORRIGIDA (texto branco + ponto azul)
const elementoDestino = document.getElementById('tituloDigitacao');
const textoCompleto = "DO CÓDIGO À COMUNIDADE: INOVAÇÃO QUE TRANSFORMA.";
let i = 0;

function digitarTexto() {
    if (i < textoCompleto.length) {
        let html = '';
        for (let j = 0; j <= i; j++) {
            const caractere = textoCompleto[j];
            if (caractere === '.') {
                html += `<span class="texto-azul">${caractere}</span>`;
            } else {
                html += `<span class="texto-branco">${caractere}</span>`;
            }
        }
        elementoDestino.innerHTML = html + '<span class="cursor"></span>';
        i++;
        setTimeout(digitarTexto, 50);
    } else {
        // Remove o cursor no final
        let htmlFinal = '';
        for (let j = 0; j < textoCompleto.length; j++) {
            const caractere = textoCompleto[j];
            if (caractere === '.') {
                htmlFinal += `<span class="texto-azul">${caractere}</span>`;
            } else {
                htmlFinal += `<span class="texto-branco">${caractere}</span>`;
            }
        }
        elementoDestino.innerHTML = htmlFinal;
    }
}

// Inicia a animação apenas se o elemento existir
if (elementoDestino) {
    elementoDestino.innerHTML = ''; // Limpa qualquer conteúdo existente
    digitarTexto();
}

// COPYRIGHT AUTOMÁTICO - ANO ATUAL
const anoAtual = document.getElementById('anoAtual');
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

// ===== VALIDAÇÃO DE FORMULÁRIO =====
const form = document.getElementById('formContato');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');
const btnSubmit = document.getElementById('btnSubmit');
const feedbackDiv = document.getElementById('feedbackMensagem');

// Função para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para mostrar erro em um campo específico
function mostrarErro(campo, mensagem, erroDivId) {
    const erroDiv = document.getElementById(erroDivId);
    campo.classList.add('erro');
    campo.classList.remove('valido');
    erroDiv.textContent = mensagem;
    erroDiv.classList.add('visible');
}

// Função para mostrar sucesso no campo
function mostrarSucesso(campo, erroDivId) {
    campo.classList.remove('erro');
    campo.classList.add('valido');
    const erroDiv = document.getElementById(erroDivId);
    erroDiv.classList.remove('visible');
}

// Função para limpar validação de todos os campos
function limparValidacao() {
    [nomeInput, emailInput, mensagemInput].forEach(campo => {
        campo.classList.remove('erro', 'valido');
    });
    document.querySelectorAll('.erro-mensagem').forEach(div => {
        div.classList.remove('visible');
    });
}

// Função para mostrar feedback geral
function mostrarFeedback(mensagem, tipo) {
    feedbackDiv.textContent = mensagem;
    feedbackDiv.className = `feedback ${tipo}`;
    
    // Auto-esconder após 5 segundos (apenas para erro)
    if (tipo === 'erro') {
        setTimeout(() => {
            feedbackDiv.style.display = 'none';
        }, 5000);
    }
}

// Validação em tempo real (enquanto o usuário digita)
if (nomeInput) {
    nomeInput.addEventListener('input', () => {
        if (nomeInput.value.trim().length >= 3) {
            mostrarSucesso(nomeInput, 'erroNome');
        } else {
            mostrarErro(nomeInput, 'Mínimo 3 caracteres', 'erroNome');
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('input', () => {
        if (validarEmail(emailInput.value)) {
            mostrarSucesso(emailInput, 'erroEmail');
        } else {
            mostrarErro(emailInput, 'Email inválido (ex: nome@dominio.com)', 'erroEmail');
        }
    });
}

if (mensagemInput) {
    mensagemInput.addEventListener('input', () => {
        if (mensagemInput.value.trim().length >= 10) {
            mostrarSucesso(mensagemInput, 'erroMensagem');
        } else {
            mostrarErro(mensagemInput, 'Mínimo 10 caracteres', 'erroMensagem');
        }
    });
}

// Validação antes do envio
function validarFormulario() {
    let isValid = true;
    
    // Validar Nome
    if (!nomeInput.value.trim() || nomeInput.value.trim().length < 3) {
        mostrarErro(nomeInput, 'Nome é obrigatório (mínimo 3 caracteres)', 'erroNome');
        isValid = false;
    } else {
        mostrarSucesso(nomeInput, 'erroNome');
    }
    
    // Validar Email
    if (!emailInput.value.trim() || !validarEmail(emailInput.value)) {
        mostrarErro(emailInput, 'Email válido é obrigatório', 'erroEmail');
        isValid = false;
    } else {
        mostrarSucesso(emailInput, 'erroEmail');
    }
    
    // Validar Mensagem
    if (!mensagemInput.value.trim() || mensagemInput.value.trim().length < 10) {
        mostrarErro(mensagemInput, 'Mensagem é obrigatória (mínimo 10 caracteres)', 'erroMensagem');
        isValid = false;
    } else {
        mostrarSucesso(mensagemInput, 'erroMensagem');
    }
    
    return isValid;
}

// Envio do formulário
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o envio tradicional
        
        // Limpa feedback anterior
        feedbackDiv.style.display = 'none';
        
        // Valida o formulário
        if (!validarFormulario()) {
            mostrarFeedback('Por favor, corrija os erros antes de enviar.', 'erro');
            return;
        }
        
        // Desabilita botão e mostra loading
        btnSubmit.disabled = true;
        btnSubmit.value = 'Enviando...';
        
        try {
            // Prepara os dados
            const formData = new FormData(form);
            
            // Envia para o FormSubmit
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Sucesso!
                mostrarFeedback('✅ Mensagem enviada com sucesso! Entrarei em contacto em breve.', 'sucesso');
                form.reset(); // Limpa o formulário
                limparValidacao(); // Limpa as validações
                
                // Esconde mensagem de sucesso após 5 segundos
                setTimeout(() => {
                    feedbackDiv.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Erro no envio');
            }
        } catch (error) {
            // Erro no envio
            mostrarFeedback('❌ Erro ao enviar mensagem. Tente novamente ou envie email diretamente.', 'erro');
        } finally {
            // Reabilita o botão
            btnSubmit.disabled = false;
            btnSubmit.value = 'Enviar';
        }
    });
}