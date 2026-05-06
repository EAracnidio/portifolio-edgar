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