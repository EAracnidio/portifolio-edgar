
let btnMenu = document.getElementById("btn-menu")
let menu = document.getElementById("menu-mobile")
let overlay = document.getElementById("overlay-menu")

btnMenu.addEventListener("click", ()=>{
    menu.classList.add("abrir-menu")
})  

let btnFechar = document.querySelector(".btn-fechar")
btnFechar.addEventListener("click", () => {
  menu.classList.remove("abrir-menu")
})

overlay.addEventListener("click", ()=>{
    menu.classList.remove("abrir-menu")
})
