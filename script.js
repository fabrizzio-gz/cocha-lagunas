const init = () => {
  anime.set("#cercado-map-container path", {
    stroke: invisible,
    fill: invisible,
  });

  sec0Prep();

  Caption.init();
};

const getSectionSizes = () => {
  const inicioSize = Math.round(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--inicio-size"
    ) * windowY
  );
  const sectionSize = Math.max(
    Math.round(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--section-size"
      ) * windowY
    ),
    getComputedStyle(document.documentElement).getPropertyValue(
      "--min-section-size"
    )
  );

  return { inicioSize, sectionSize };
};

let currentSection = -1;
init();
const { inicioSize, sectionSize } = getSectionSizes();

const scrollCallback = (e) => {
  const yPos = Math.round(window.scrollY);
  const positionMid = yPos + Math.round(windowY / 2);

  if (yPos == 0) introAnim.play();
  else introAnim.pause();

  const introScroll = () => {
    titulo.style.top = Math.round(((yTitle - yPos) / windowY) * 100) + "%";
    continuar.style.top = Math.round(((yCont + yPos) / windowY) * 100) + "%";
  };

  window.requestAnimationFrame(() => {
    // if (yPos < windowY) introScroll();

    const callAnimation = (index, animation, prepFunction) => {
      if (currentSection != index) {
        anime.running.forEach((animation) => animation.pause());
        prepFunction();
        animation.restart();
        animation.play();
        currentSection = index;
      }
    };

    const section = Math.ceil((positionMid - inicioSize) / sectionSize);
    switch (section) {
      case 0:
        callAnimation(0, sec0Anim, sec0Prep);
      case 1:
        callAnimation(1, sec1Anim, sec1Prep);
        break;
      case 2:
        callAnimation(2, sec2Anim, sec2Prep);
        break;
      case 3:
        callAnimation(3, sec3Anim, sec3Prep);
        break;
      case 4:
        callAnimation(4, sec4Anim, sec4Prep);
        break;
      case 5:
        callAnimation(5, sec5Anim, sec5Prep);
        break;
      case 6:
        callAnimation(6, sec6Anim, sec6Prep);
        break;
      case 7:
        callAnimation(7, sec7Anim, sec7Prep);
        break;
      case 8:
        callAnimation(8, sec8Anim, sec8Prep);
        break;
      case 9:
        callAnimation(9, sec9Anim, sec9Prep);
        break;
      case 10:
        callAnimation(10, sec10Anim, sec10Prep);
        break;
      case 11:
        callAnimation(11, sec11Anim, sec11Prep);
        break;
      case 12:
        callAnimation(12, sec12Anim, sec12Prep);
        break;
    }
  });
};

const scrollCallbackMobile = (e) => {
  e.preventDefault();
  scrollCallback(e);
};

/* https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser */
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// if (isMobile) document.addEventListener("ontouchmove", scrollCallbackMobile);
//else
document.addEventListener("scroll", scrollCallback);

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

window.onresize = Caption.updateAllPositions;

anime.set("#caption-cuellar", {
  opacity: 0, // Fix due to opacity starting at 1
});
anime.set(["#cercado-svg-lagunas circle", mapCercado], {
  opacity: 0, // Init lakes to invisible
});
