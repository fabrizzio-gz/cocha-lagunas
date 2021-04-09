const mapCocha = document.getElementById("cocha-svg");
const mapCercado = document.getElementById("cercado-svg");
const windowY = document.documentElement.clientHeight;
const titulo = document.getElementById("titulo");
const continuar = document.getElementById("continuar");
const mapIntro = document.getElementById("cocha-map-container");
const rioRocha = document.getElementById("rio-rocha");

const lightblue = "#00dbfc";
const grey = "#3b4749";
const invisible = "rgba(0,0,0,0)";

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

document.addEventListener("scroll", function (e) {
  const yPos = window.scrollY;
  const positionMid = yPos + Math.round(windowY / 2);
  console.log(positionMid);

  if (yPos == 0) introAnim.play();
  else introAnim.pause();

  const introScroll = () => {
    titulo.style.top = Math.round(((yTitle - yPos) / windowY) * 100) + "%";
    continuar.style.top = Math.round(((yCont + yPos) / windowY) * 100) + "%";
  };

  window.requestAnimationFrame(() => {
    if (yPos < windowY) introScroll();

    // Play animation based on position
  });
});

const introAnim = anime({
  targets: mapCocha,
  scale: 1.05,
  delay: 250,
  direction: "alternate",
  loop: true,
  easing: "linear",
  autoplay: true,
});

/*

const section2 = anime
  .timeline({
    targets: [mapCocha, mapCercado],
    easing: "linear",
    autoplay: true, // debug: should be "false"
  })
  .add({
    scale: 12,
    translateX: "10%",
    translateY: "0%",
    opacity: (el, i) => {
      return i;
    },
    duration: 2000,
  });

const section3 = anime({
  targets: "#cercado path",
  fill: grey,
  opacity: 0.5,
  easing: "linear",
  // autoplay: false,
});

const section5 = anime
  .timeline({
    easing: "linear",
    autoplay: true,
  })
  .add({
    targets: mapCercado,
    scale: 30,
    duration: 1000,
  })
  .add({
    targets: "#lag-cuellar path",
    fill: lightblue,
    duration: 1000,
    complete: function (anim) {
      console.log(rioRocha);
      rioRocha.classList.remove("no-show-river");
    },
  })
  .add({
    targets: "#rio-rocha path",
    stroke: lightblue,
    strokeWidth: "1",
    easing: "linear",
    autoplay: false,
  });

const section6 = anime({
  targets: "#lag-cuellar path",
  fill: invisible,
  opacity: 0.5,
  easing: "linear",
  // autoplay: false, //debug, uncomment
});

const conclusion = anime({
  targets: [
    "#lag-cuellar path",
    "#lag-cona-cona path",
    "#lag-alalay path",
    "#lag-albarrancho path",
  ],
  fill: (el, i) => {
    if (i != 0) return lightblue;
    else return invisible;
  },
  duration: 1000,
  autoplay: false,
});

*/

const { yTitle, yCont, mapIntroPos } = init();
