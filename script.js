const svgInicio = document.getElementById("cocha");
const windowY = document.documentElement.clientHeight;
const titulo = document.getElementById("titulo");
const continuar = document.getElementById("continuar");
const mapIntro = document.getElementById("map-cocha");

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

  // px
  const { top, height } = mapIntro.getBoundingClientRect();

  const mapIntroPos = window.scrollY + top + Math.round(height / 2);

  return { yTitle, yCont, mapIntroPos };
};

const { yTitle, yCont, mapIntroPos } = init();

document.addEventListener("scroll", function (e) {
  let yPos = window.scrollY;

  const introScroll = () => {
    svgInicio.style.width = Math.min(yPos, 300) + "px";
    titulo.style.top = Math.round(((yTitle - yPos) / windowY) * 100) + "%";
    continuar.style.top = Math.round(((yCont + yPos) / windowY) * 100) + "%";
  };

  const mapIntroScroll = () => {};

  window.requestAnimationFrame(() => {
    if (yPos < mapIntroPos) introScroll();
    else mapIntroScroll();
  });
});
