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

const getSectionSizes = () => {
  const inicioSize = Math.round(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--inicio-size"
    ) * windowY
  );
  const sectionSize = Math.round(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--section-size"
    ) * windowY
  );

  return { inicioSize, sectionSize };
};

let currentSection = -1;

document.addEventListener("scroll", function (e) {
  const yPos = Math.round(window.scrollY);
  const positionMid = yPos + Math.round(windowY / 2);

  if (yPos == 0) introAnim.play();
  else introAnim.pause();

  const introScroll = () => {
    titulo.style.top = Math.round(((yTitle - yPos) / windowY) * 100) + "%";
    continuar.style.top = Math.round(((yCont + yPos) / windowY) * 100) + "%";
  };

  window.requestAnimationFrame(() => {
    if (yPos < windowY) introScroll();

    const callAnimation = (index, animation) => {
      if (currentSection != index) animation.play();
      currentSection = index;
    };

    const section = Math.ceil((positionMid - inicioSize) / sectionSize);
    console.log(yPos, positionMid, section);
    switch (section) {
      case 2:
        callAnimation(2, sec2Anim);
        break;
      case 3:
        callAnimation(3, sec3Anim);
        break;
    }
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

const sec2Anim = anime
  .timeline({
    targets: [mapCocha, mapCercado],
    easing: "linear",
    autoplay: false,
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

const sec3Anim = anime({
  targets: "#cercado path",
  fill: grey,
  opacity: 0.5,
  easing: "linear",
  autoplay: false,
});

/*

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
const { inicioSize, sectionSize } = getSectionSizes();
