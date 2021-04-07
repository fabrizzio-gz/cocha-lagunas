const map = document.getElementById("cocha-svg");
const windowY = document.documentElement.clientHeight;
const titulo = document.getElementById("titulo");
const continuar = document.getElementById("continuar");
const mapIntro = document.getElementById("map-container");

const init = () => {
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
  return { yTitle, yCont, mapIntroPos };
};

const { yTitle, yCont, mapIntroPos } = init();

document.addEventListener("scroll", function (e) {
  let yPos = window.scrollY;

  const introScroll = () => {
    // cochaSVG.style.width = Math.min(yPos, 300) + "px";
    titulo.style.top = Math.round(((yTitle - yPos) / windowY) * 100) + "%";
    continuar.style.top = Math.round(((yCont + yPos) / windowY) * 100) + "%";
  };

  const mapIntroScroll = () => {
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

const intro = anime({
  targets: map,
  scale: 1.05,
  //  rotate: "45deg",
  delay: () => 500,
  direction: "alternate",
  loop: true,
  easing: "linear",
});

const section1 = anime({
  targets: map,
  duration: 500,
  scale: 0.5,
  translateX: "-50%",
  easing: "linear",
  autoplay: false,
});

intro.pause();
