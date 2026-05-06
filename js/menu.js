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