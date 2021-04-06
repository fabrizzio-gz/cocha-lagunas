const svgInicio = document.getElementById("cocha");
const windowY = document.documentElement.clientHeight;
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
    svgInicio.style.width = Math.min(yPos, 300) + "px";
    titulo.style.top = Math.round(((yTitle - yPos) / windowY) * 100) + "%";
    continuar.style.top = Math.round(((yCont + yPos) / windowY) * 100) + "%";
  });
});
