const cochaSVG = document.getElementById("cocha-svg");
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

  const mapIntroPos = window.scrollY + top + Math.round((height - windowY) / 2);
  console.log(mapIntroPos);
  return { yTitle, yCont, mapIntroPos };
};

const { yTitle, yCont, mapIntroPos } = init();

document.addEventListener("scroll", function (e) {
  let yPos = window.scrollY;

  const introScroll = () => {
    // cochaSVG.style.width = Math.min(yPos, 300) + "px";
    console.log("here");
    titulo.style.top = Math.round(((yTitle - yPos) / windowY) * 100) + "%";
    continuar.style.top = Math.round(((yCont + yPos) / windowY) * 100) + "%";
  };

  const mapIntroScroll = () => {
    console.log("wohoo");
    cochaSVG.style.transform = "translate(0,0)";
    cochaSVG.style.position = "static";

    const tituloIntro = document.getElementById("titulo-intro");
    tituloIntro.style.animation = "1.5s ease-in forwards appear";
    const mensajeIntro = document.getElementById("mensaje-intro");
    mensajeIntro.style.animation = "0.5s ease-in 1.5s forwards appear";
  };

  window.requestAnimationFrame(() => {
    if (yPos < windowY) introScroll();
    // else mapIntroScroll();
  });
});
