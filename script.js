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
const white = "#fff";

class Caption {
  static list = [];

  constructor(text = "", captionId = "", isAvenida = false) {
    this.text = text;
    this.captionId = captionId;
    this.isAvenida = isAvenida;
    let x, y;
    if (captionId)
      ({ x, y } = this.getElementPosition(this.captionId, this.isAvenida));
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
    if (this.isAvenida) this.div.classList.add("avenida");
    this.setPosition(x, y);
    this.div.appendChild(document.createTextNode(text));
    this.add();
    Caption.list.push(this);
  }

  getElementPosition(elementId, isAvenida) {
    const element = document.getElementById(elementId);
    const { x, y, right, bottom } = element.getBoundingClientRect();
    if (isAvenida) return { right, bottom };
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
      {
        id: "cuadras",
        text: "Laguna Cuadras",
        translate: "translate(-100%,-200%)",
      },
      {
        id: "sarco",
        text: "Laguna Sarco",
        translate: "translate(-70%, -200%)",
      },
      {
        id: "america",
        text: "Av. América",
        translate: "translate(120%, 0%)",
        isAvenida: true,
      },
      {
        id: "melchor-perez",
        text: "Av. Melchor Pérez",
        translate: "translate(-65%, 650%) rotate(-90deg)",

        isAvenida: true,
      },
    ];

    captionCochaSvg.forEach(
      ({ id, text, translate = "", isAvenida = false }) => {
        const caption = new Caption(text, "cocha-svg-caption");
        if (translate) caption.div.style.transform = translate;
      }
    );
    captionCercadoSvg.forEach(
      ({ id, text, translate = "", isAvenida = false }) => {
        const caption = new Caption(
          text,
          "cercado-svg-caption-" + id,
          isAvenida
        );
        if (translate) caption.div.style.transform = translate;
      }
    );
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
  begin: () => {
    anime.set(
      [
        "#cercado-svg-caption-alalay",
        "#cercado-svg-caption-albarrancho",
        "#cercado-svg-caption-rocha",
        "#cercado-svg-caption-recoleta",
        "#cercado-svg-caption-quillacollo",
        "#cercado-svg-caption-cona-cona",
        "#cercado-svg-caption-sarco",
        "#cercado-svg-caption-cuadras",
        "#lag-sarco",
        "#lag-cuadras",
      ],
      {
        opacity: 0,
      }
    );
  },
  scale: 1.05,
  delay: 250,
  direction: "alternate",
  loop: true,
  easing: "linear",
  autoplay: true,
});

const sec1Anim = anime
  .timeline({
    targets: "#cocha-svg-caption-cercado",
    begin: () => {
      mapCocha.classList.add("no-stroke");
    },
    opacity: 0,
    autoplay: false,
  })
  .add({
    targets: "#cocha-svg-cercado",
    stroke: invisible,
  })
  .add({
    targets: "#cocha-svg-cocha",

    fill: lightblue,
  });

const sec2Anim = anime
  .timeline({
    targets: ["#cocha-svg-cocha", "#cocha-svg-cercado"],
    begin: (anim) => {
      mapCocha.classList.remove("no-stroke");
      anime.set("#lag-cuellar", {
        fill: invisible, // Due to weird bug?!
      });
      Caption.updateAllPositions();
    },

    fill: (el, i) => {
      if (i == 0) return white;
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
  begin: () => {
    anime.set([mapCocha, "#cocha-svg-caption-cercado"], {
      fill: invisible,
      scale: 1,
      translateX: "0%",
      translateY: "0%",
      opacity: 1,
    });
    anime.set(mapCercado, {
      opacity: 0,
    });
    Caption.updateAllPositions();
  },
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
      opacity: 1,
      strokeWidth: 1,
      stroke: grey,
      fill: white,
    });
    anime.set(
      [
        "#cercado-svg-lagunas path",
        "#cercado-svg-puentes path",
        "#cercado-svg-rios path",
      ],
      {
        stroke: invisible,
        fill: invisible,
      }
    );

    anime.set(
      [
        "#cercado-svg-caption-recoleta",
        "#cercado-svg-caption-quillacollo",
        "#cercado-svg-caption-cuellar",
        "#cercado-svg-caption-rocha",
      ],
      {
        opacity: 0,
      }
    );
    anime.set(["#cocha-svg-caption-cercado", "#lag-sarco"], {
      opacity: 0,
    });

    Caption.updateAllPositions();
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
    targets: "#lag-cuellar",
    opacity: 1,
    duration: 1000,
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
  begin: () => {
    anime.set(["#cercado-svg-caption-sarco", "#lag-sarco"], {
      opacity: 0,
    });
    anime.set(mapCercado, {
      scale: 30,
      translateY: "0%",
      translateX: "0%",
    });
    anime.set(
      [
        "#cercado-svg-caption-recoleta",
        "#cercado-svg-caption-quillacollo",
        "#cercado-svg-caption-cuellar",
        "#cercado-svg-caption-rocha",
      ],
      {
        opacity: 1,
      }
    );
    Caption.updateAllPositions();
  },
  opacity: [1, 0],
  easing: "easeInOutCubic",
  duration: 3000,
  autoplay: false,
});

const sec7Anim = anime
  .timeline({
    targets: mapCercado,
    begin: () => {
      anime.set(
        [
          "#cercado-svg-caption-recoleta",
          "#cercado-svg-caption-quillacollo",
          "#cercado-svg-caption-cuellar",
          "#cercado-svg-caption-rocha",
        ],
        {
          opacity: 0,
        }
      );
    },
    scale: [30, 50],
    translateY: ["0%", "10%"],
    translateX: "0%",
    complete: () => {
      Caption.updateAllPositions();
    },
    autoplay: false,
  })
  .add({
    targets: [
      "#cercado-svg-caption-melchor-perez",
      "#cercado-svg-caption-america",
    ],
    stroke: grey,
    strokeWidth: [0, 0.75],
    opacity: 1,
  })

  .add({
    targets: ["#lag-sarco", "#cercado-svg-caption-sarco"],
    opacity: [0, 1],
    autoplay: false,
  });

const sec8Anim = anime
  .timeline({
    /* dummy animation to have the next one not run instantly */ target: "none",
    begin: () => {
      anime.set(mapCercado, {
        translateY: "10%",
        translateX: "0%",
      });
      anime.set(["#lag-cuadras", "#cercado-svg-caption-cuadras"], {
        opacity: 0,
      });
      Caption.updateAllPositions();
    },
    opacity: 0,
    delay: 1000,
    autoplay: false,
  })
  .add({
    targets: ["#lag-sarco", "#cercado-svg-caption-sarco"],
    opacity: [1, 0],
    delay: 3000,
    autoplay: false,
  });

const sec9Anim = anime
  .timeline({
    targets: mapCercado,
    begin: () => {
      anime.set(["#lag-cuadras", "#cercado-svg-caption-cuadras"], {
        opacity: 0,
      });
    },
    keyframes: [
      { scale: [50, 30], translateX: "0%", translateY: "0%" },
      {
        scale: [30, 50],
        translateX: ["0%", "-5%"],
      },
    ],
    duration: 3000,
    autoplay: false,
  })
  .add({
    targets: ["#lag-cuadras", "#cercado-svg-caption-cuadras"],
    complete: () => {
      Caption.updateAllPositions();
    },
    opacity: [0, 1],
    autoplay: false,
  });

const sec10Anim = anime({
  targets: ["#lag-cuadras", "#cercado-svg-caption-cuadras"],
  begin: () => {
    anime.set(
      [
        "#cercado-svg-caption-rocha",
        "#cercado-svg-caption-recoleta",
        "#cercado-svg-caption-quillacollo",
        "#lag-cona-cona",
        "#cercado-svg-caption-cona-cona",
        "#lag-alalay",
        "#cercado-svg-caption-alalay",
        "#lag-albarrancho",
        "#cercado-svg-caption-albarrancho",
      ],
      {
        opacity: 0,
      }
    );
    anime.set(mapCercado, {
      scale: 50,
      translateX: "-5%",
    });
  },
  opacity: [1, 0],
  autoplay: false,
});

const conclusionAnim = anime
  .timeline({
    targets: mapCercado,
    complete: () => {
      Caption.updateAllPositions();
    },
    scale: [50, 30],
    translateX: "0%",
    translateY: "0%",
    autoplay: false,
  })
  .add({
    targets: "#cercado-svg-caption-alalay",
    begin: () => {
      anime.set(
        [
          mapCercado,
          "#cercado-svg-caption-rocha",
          "#cercado-svg-caption-recoleta",
          "#cercado-svg-caption-quillacollo",
        ],
        { opacity: 1 }
      );
      anime.set("#cocha-svg", { opacity: 0 });
      Caption.updateAllPositions();
    },
    fill: lightblue,
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: "#lag-alalay",
    fill: lightblue,
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: ["#lag-albarrancho", "#cercado-svg-caption-albarrancho"],
    fill: lightblue,
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: ["#lag-cona-cona", "#cercado-svg-caption-cona-cona"],
    fill: lightblue,
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  });

const endAnim = anime
  .timeline({
    targets: [
      mapCercado,
      "#cercado-svg-caption-alalay",
      "#cercado-svg-caption-albarrancho",
      "#cercado-svg-caption-rocha",
      "#cercado-svg-caption-recoleta",
      "#cercado-svg-caption-quillacollo",
      "#cercado-svg-caption-cona-cona",
    ],
    begin: () => {
      anime.set(mapCercado, {
        opacity: 0,
      });
    },
    opacity: [1, 0],
    duration: 2000,
    autoplay: false,
  })
  .add({
    targets: "#cocha-svg",
    duration: 2000,
    scale: [12, 1],
    translateX: ["10%", "0%"],
    opacity: 1,
    autoplay: false,
  })
  .add({});

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
      case 1:
        callAnimation(1, sec1Anim);
        break;
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
        callAnimation(7, sec7Anim);
        break;
      case 8:
        callAnimation(8, sec8Anim);
        break;
      case 9:
        callAnimation(9, sec9Anim);
        break;
      case 10:
        callAnimation(10, sec10Anim);
        break;
      case 11:
        callAnimation(11, conclusionAnim);
        break;
      case 12:
        callAnimation(12, endAnim);
        break;
    }
  });
});

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

window.onresize = Caption.updateAllPositions;

anime.set("#cercado-svg-caption-cuellar", {
  opacity: 0, // Fix due to opacity starting at 1
});
anime.set(["#cercado-svg-lagunas circle", mapCercado], {
  opacity: 0, // Init lakes to invisible
});
