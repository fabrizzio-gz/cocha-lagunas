const mapCocha = document.getElementById("cocha-svg");
const mapCercado = document.getElementById("cercado-svg");
const windowY = document.documentElement.clientHeight;
const titulo = document.getElementById("titulo");
const continuar = document.getElementById("continuar");
const mapIntro = document.getElementById("cocha-map-container");
const rioRocha = document.getElementById("rio-rocha");

const lightblue = "#00dbfc";
const orange = "#ff7a00";
const grey = "#3b4749";
const lightgrey = "#f9fafa";
const invisible = "rgba(0,0,0,0)";

class Caption {
  static list = [];

  constructor(text = "", captionId = "") {
    this.text = text;
    this.captionId = captionId;
    let x, y;
    if (captionId) ({ x, y } = this.getElementPosition(this.captionId));
    else {
      x = 0;
      y = 0;
    }

    this.div = document.createElement("div");
    if (captionId.includes("cercado-svg-caption"))
      captionId.replace("cercado-svg-", "");
    else captionId = "cocha-svg-caption-cercado";
    this.div.setAttribute("id", captionId);
    this.div.classList.add("caption");
    this.setPosition(x, y);
    this.div.appendChild(document.createTextNode(text));
    this.add();
    Caption.list.push(this);
  }

  getElementPosition(elementId) {
    const element = document.getElementById(elementId);
    const { x, y } = element.getBoundingClientRect();
    return { x, y };
  }

  setPosition(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.div.style.left = this.posX + "px";
    this.div.style.top = this.posY + "px";
  }

  add() {
    document.body.appendChild(this.div);
  }

  static purge() {
    Caption.list.forEach((caption) => caption.div.remove());
    Caption.list = [];
  }

  static updateAllPositions() {
    Caption.list.forEach((caption) => {
      const { x, y } = caption.getElementPosition(caption.captionId);
      caption.setPosition(x, y);
    });
  }

  static init() {
    Caption.purge();
    const captionCochaSvg = [
      {
        id: "cocha-svg-caption",
        text: "Cercado",
        translate: "translate(-30%,-180%)",
      },
    ];
    const captionCercadoSvg = [
      { id: "rocha", text: "Río Rocha", translate: "translate(30%, -80%)" },
      { id: "tamborada", text: "La Tamborada" },
      {
        id: "cuellar",
        text: "Laguna Cuellar",
        translate: "translate(-50%, -240%)",
      },
      { id: "albarrancho", text: "Laguna Albarrancho" },
      { id: "alalay", text: "Laguna Alalay" },
      { id: "cona-cona", text: "Laguna Coña Coña" },
      {
        id: "quillacollo",
        text: "Puente Quillacollo",
        translate: "translate(-50%, -50%)",
      },
      { id: "recoleta", text: "Recoleta" },
    ];

    captionCochaSvg.forEach(({ id, text, translate = "" }) => {
      const caption = new Caption(text, "cocha-svg-caption");
      if (translate) caption.div.style.transform = translate;
    });
    captionCercadoSvg.forEach(({ id, text, translate = "" }) => {
      const caption = new Caption(text, "cercado-svg-caption-" + id);
      if (translate) caption.div.style.transform = translate;
    });
  }
}

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

  anime.set("#cercado-map-container path", {
    stroke: invisible,
    fill: invisible,
  });

  Caption.init();

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

const { yTitle, yCont, mapIntroPos } = init();
const { inicioSize, sectionSize } = getSectionSizes();

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
    targets: ["#cocha-svg-cocha", "#cocha-svg-cercado"],
    begin: (anim) => {
      mapCocha.classList.remove("no-stroke");
      anime.set("#lag-cuellar", {
        fill: invisible, // Due to weird bug?!
      });
    },

    fill: (el, i) => {
      if (i == 0) return invisible;
      return lightblue;
    },
    stroke: grey,
    strokeWidth: 1,
    easing: "linear",
    autoplay: false,
  })
  .add({
    targets: "#cocha-svg-caption-cercado",
    opacity: [0, 1],
    easing: "easeInCubic",
    autoplay: false,
  });

const sec3Anim = anime({
  targets: "#cocha-svg-cercado",
  fill: [lightblue, grey],
  easing: "linear",
  autoplay: false,
  duration: 2000,
});

const sec4Anim = anime({
  targets: [mapCocha, mapCercado],
  begin: () => {
    anime.set("#cocha-svg-cercado", {
      stroke: invisible,
      fill: invisible,
    });
    anime.set("#cercado-svg-cercado", {
      strokeWidth: 1,
      stroke: grey,
    });
    anime.set(
      [
        "#cercado-svg-lagunas path",
        "#cercado-svg-puentes path",
        "#cercado-svg-rios path",
      ],
      {
        stroke: invisible,
      }
    );
    anime.set("#cocha-svg-caption-cercado", {
      opacity: 0,
    });
  },
  scale: 12,
  translateX: "10%",
  translateY: "0%",
  opacity: (el, i) => {
    return i;
  },
  easing: "easeInQuart",
  autoplay: false,
  duration: 2000,
});

const sec5Anim = anime
  .timeline({
    easing: "linear",
    autoplay: false,
  })
  .add({
    targets: mapCercado,
    scale: [12, 30],
    translateX: ["10%", "0%"],
    duration: 1000,
  })
  .add({
    targets: "#lag-cuellar",
    fill: lightblue,
    duration: 1000,
  })
  .add({
    targets: "#cercado-svg-rios path",
    begin: () => {
      anime.set("#cercado-svg-rios path", {
        stroke: lightblue,
      });
    },
    strokeWidth: ["0", "1"],
    easing: "linear",
  })
  .add({
    targets: [
      "#p-recoleta, #p-quillacollo",
      "#cercado-svg-caption-recoleta",
      "#cercado-svg-caption-quillacollo",
      "#cercado-svg-caption-cuellar",
      "#cercado-svg-caption-rocha",
    ],
    begin: () => {
      anime.set(["#p-recoleta, #p-quillacollo"], {
        fill: invisible,
      });
      Caption.updateAllPositions();
    },
    fill: grey,
    easing: "linear",
    opacity: 1,
  });

const sec6Anim = anime({
  targets: ["#lag-cuellar", "#cercado-svg-caption-cuellar"],
  fill: [lightblue, grey],
  opacity: [1, 0],
  easing: "easeInOutCubic",
  duration: 5000,
  autoplay: false,
});

const conclusionAnim = anime({
  targets: ["#lag-cona-cona", "#lag-alalay", "#lag-albarrancho"],
  begin: () => {
    const rocha = new Caption("Río Rocha", "cercado-svg-caption-rocha");
    rocha.div.style.transform = "translate(30%, -80%)";
    new Caption("La Tamborada", "cercado-svg-caption-tamborada");
    const quilla = new Caption(
      "Puente Quillacollo",
      "cercado-svg-caption-quillacollo"
    );
    quilla.div.style.transform = "translate(-50%, -50%)";
    new Caption("Recoleta", "cercado-svg-caption-recoleta");
    anime.set(["#lag-cona-cona", "#lag-alalay", "#lag-albarrancho"], {
      fill: lightblue,
      opacity: 0,
    });
  },
  opacity: 1,
  duration: 1000,
  ease: "linear",
  complete: () => {
    new Caption("Laguna Coña Coña", "lag-cona-cona");
    new Caption("Laguna Alalay", "lag-alalay");
    new Caption("Laguna Albarrancho", "lag-albarrancho");
  },
  autoplay: false,
});

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
    switch (section) {
      /*case 1:
        callAnimation(1, sec1Anim);
        break;*/
      case 2:
        callAnimation(2, sec2Anim);
        break;
      case 3:
        callAnimation(3, sec3Anim);
        break;
      case 4:
        callAnimation(4, sec4Anim);
        break;
      case 5:
        callAnimation(5, sec5Anim);
        break;
      case 6:
        callAnimation(6, sec6Anim);
        break;
      case 7:
        callAnimation(7, conclusionAnim);
        break;
    }
  });
});

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

anime.set("#cercado-svg-caption-cuellar", {
  opacity: 0, // Fix due to opacity starting at 1
});
