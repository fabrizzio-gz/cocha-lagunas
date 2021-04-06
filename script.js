const svg = document.getElementById("cocha");

const titulo = document.getElementById("titulo");
const continuar = document.getElementById("continuar");

const init = () => {
  // Move titulo and continuar to absolute positions
  // with no transform
  const posTitle = titulo.getBoundingClientRect();
  const yTitle = posTitle.y;
  const heightTitle = posTitle.height;
  const posCont = continuar.getBoundingClientRect();
  const yCont = posCont.y;
  const heightCont = posCont.height;
  titulo.style.transform = "translate(-50%,0)";
  continuar.style.transform = "translate(-50%,0)";

  titulo.style.top = yTitle + "px";
  continuar.style.top = yCont + "px";

  return { yTitle, yCont };
};

const { yTitle, yCont } = init();

document.addEventListener("scroll", function (e) {
  let yPos = window.scrollY;

  window.requestAnimationFrame(() => {
    titulo.style.top = yTitle - yPos + "px";
    continuar.style.top = yCont + yPos + "px";
  });
});
