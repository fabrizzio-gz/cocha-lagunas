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

  constructor(text = "", elementId = "", isAvenida = false) {
    this.text = text;
    this.elementId = elementId;
    this.isAvenida = isAvenida;
    let x, y, width, height;
    if (elementId)
      ({ x, y, width, height } = this.getElementPosition(
        elementId,
        this.isAvenida
      ));
    else {
      x = 0;
      y = 0;
    }

    this.div = document.createElement("div");

    this.captionId = this.elementId;
    if (this.captionId.includes("cercado-svg-caption"))
      this.captionId = this.captionId.replace("cercado-svg-", "");
    else if (this.captionId.includes("cocha-svg-caption"))
      this.captionId = this.captionId.replace("cocha-svg-", "");
    else this.captionId = "caption-" + this.captionId;
    this.div.setAttribute("id", this.captionId);
    this.div.classList.add("caption");
    if (this.isAvenida) this.div.classList.add("avenida");
    this.setPosition(x, y, width, height, this.isAvenida);
    this.div.appendChild(document.createTextNode(text));
    this.add();
    Caption.list.push(this);
  }

  getElementPosition(elementId, isAvenida) {
    const element = document.getElementById(elementId);
    let x,
      y,
      right,
      bottom,
      width = 0,
      height = 0;
    ({ x, y, right, bottom, width, height } = element.getBoundingClientRect());
    if (isAvenida) return { right, bottom, width, height };
    return { x, y, width, height };
  }

  setPosition(posX, posY, width = 0, height = 0, isAvenida) {
    this.posX = posX;
    this.posY = posY;
    if (isAvenida) {
      this.div.style.width = width;
      this.div.style.height = height;
    }
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
      const { x, y } = caption.getElementPosition(caption.elementId);
      caption.setPosition(x, y);
    });
  }

  static init() {
    Caption.purge();
    const captionCochaSvg = [
      {
        id: "cocha-svg-caption-cercado",
        text: "Cercado",
        translate: "translate(-30%,-180%)",
      },
    ];
    const captionCercadoSvg = [
      {
        id: "cercado-svg-caption-rocha",
        text: "Río Rocha",
        translate: "translate(30%, -80%)",
      },
      { id: "cercado-svg-caption-tamborada", text: "La Tamborada" },
      {
        id: "cercado-svg-caption-cuellar",
        text: "Laguna Cuellar",
        translate: "translate(-50%, -240%)",
      },
      { id: "cercado-svg-caption-albarrancho", text: "Laguna Albarrancho" },
      { id: "cercado-svg-caption-alalay", text: "Laguna Alalay" },
      { id: "cercado-svg-caption-cona-cona", text: "Laguna Coña Coña" },
      {
        id: "cercado-svg-caption-quillacollo",
        text: "Puente Quillacollo",
        translate: "translate(-50%, -50%)",
      },
      { id: "cercado-svg-caption-recoleta", text: "Recoleta" },
      {
        id: "cercado-svg-caption-cuadras",
        text: "Laguna Cuadras",
        translate: "translate(-100%,-200%)",
      },
      {
        id: "cercado-svg-caption-sarco",
        text: "Laguna Sarco",
        translate: "translate(-70%, -200%)",
      },
      {
        id: "america",
        text: "Av. América",
        translate:
          "translate(100%, -30%)  rotate(3deg)" /*"translate(120%, 0%) rotate(3deg)",*/,
        isAvenida: true,
      },
      {
        id: "melchor-perez",
        text: "Av. Melchor Pérez",
        translate:
          "translate(-65%, 500%) rotate(-85deg)" /*"translate(-65%, 650%) rotate(-85deg)",*/,

        isAvenida: true,
      },
      {
        id: "heroinas",
        text: "Av. Heroínas",
        translate: "translate(20%, -70%) rotate(-10deg)",

        isAvenida: true,
      },
      {
        id: "belzu",
        text: "Av. Belzu",
        translate: "translate(10%, 350%) rotate(65deg)",
        isAvenida: true,
      },
      {
        id: "campus-umss",
        text: "UMSS",
        translate:
          "translate(0%, -60%) rotate(-10deg)" /*"translate(20%, -30%) rotate(-10deg)",*/,
        isAvenida: true,
      },
    ];

    captionCochaSvg.forEach(
      ({ id, text, translate = "", isAvenida = false }) => {
        const caption = new Caption(text, id);
        if (translate) caption.div.style.transform = translate;
      }
    );
    captionCercadoSvg.forEach(
      ({ id, text, translate = "", isAvenida = false }) => {
        const caption = new Caption(text, id, isAvenida);
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

const { yTitle, yCont, mapIntroPos } = init();
const { inicioSize, sectionSize } = getSectionSizes();

const introAnim = anime({
  targets: mapCocha,
  begin: () => {
    anime.set(
      [
        "#caption-alalay",
        "#caption-albarrancho",
        "#caption-rocha",
        "#caption-recoleta",
        "#caption-quillacollo",
        "#caption-cona-cona",
        "#caption-sarco",
        "#caption-cuadras",
        "#caption-tamborada",
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

const sec1Prep = () => {
  mapCocha.classList.add("no-stroke");
  anime.set("#caption-cercado", { opacity: 0 });
  anime.set("#cocha-svg-cercado", { stroke: invisible, opacity: 0 });
  anime.set("#cocha-svg-cocha", { fill: lightblue });
};

const sec1Anim = {
  play: () => {},
  restart: () => {},
  seek: () => {},
};

const sec2Prep = () => {
  mapCocha.classList.remove("no-stroke");
  anime.set(["#lag-cuellar", "#caption-cercado"], {
    opacity: 0,
  });
  anime.set("#cocha-svg-cercado", { opacity: 1 });
  Caption.updateAllPositions();
};

const sec2Anim = anime
  .timeline({
    targets: ["#cocha-svg-cocha", "#cocha-svg-cercado"],
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
    targets: "#caption-cercado",
    opacity: [0, 1],
    easing: "easeInCubic",
    autoplay: false,
  });

const sec3Prep = () => {
  anime.set(mapCocha, {
    fill: invisible,
    scale: 1,
    translateX: "0%",
    translateY: "0%",
    opacity: 1,
  });
  anime.set("#cocha-svg-cocha", {
    fill: white,
  });
  anime.set(mapCercado, {
    opacity: 0,
  });
  anime.set(["#cocha-svg-cercado", "#caption-cercado"], {
    opacity: 1,
  });
  Caption.updateAllPositions();
};

const sec3Anim = anime({
  targets: "#cocha-svg-cercado",
  complete: () => {
    anime.set(mapCocha, { fill: invisible });
  },
  fill: [lightblue, grey],
  easing: "linear",
  autoplay: false,
  duration: 2000,
});

const sec4Prep = () => {
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
  anime.set(["#cercado-svg-puentes path", "#cercado-svg-rios path"], {
    stroke: invisible,
    fill: invisible,
  });

  anime.set(
    [
      "#caption-recoleta",
      "#caption-quillacollo",
      "#caption-cuellar",
      "#caption-rocha",
      "#caption-tamborada",
      "#caption-cercado",
      "#lag-sarco",
      "#lag-cuellar",
    ],
    {
      opacity: 0,
    }
  );
  Caption.updateAllPositions();
};

const sec4Anim = anime({
  targets: [mapCocha, mapCercado],
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

const sec5Prep = () => {
  anime.set("#cercado-svg-rios path", {
    stroke: lightblue,
  });
  anime.set(mapCocha, { opacity: 0 });
  anime.set(mapCercado, { opacity: 1 });
};

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
    strokeWidth: ["0", "1"],
    easing: "linear",
  })
  .add({
    targets: "#lag-cuellar",
    opacity: [0, 1],
    duration: 1000,
  })
  .add({
    targets: [
      "#p-recoleta, #p-quillacollo",
      "#caption-recoleta",
      "#caption-quillacollo",
      "#caption-cuellar",
      "#caption-rocha",
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

const sec6Prep = () => {
  anime.set(
    [
      "#caption-sarco",
      "#lag-sarco",
      "#melchor-perez",
      "#america",
      "#caption-america",
      "#caption-melchor-perez",
    ],
    {
      opacity: 0,
    }
  );
  anime.set(mapCercado, {
    scale: 30,
    translateY: "0%",
    translateX: "0%",
  });
  anime.set(
    [
      "#caption-recoleta",
      "#caption-quillacollo",
      "#caption-cuellar",
      "#caption-rocha",
    ],
    {
      opacity: 1,
    }
  );
  Caption.updateAllPositions();
};

const sec6Anim = anime({
  targets: ["#lag-cuellar", "#caption-cuellar"],
  opacity: [1, 0],
  easing: "easeInOutCubic",
  duration: 3000,
  autoplay: false,
});

const sec7Prep = () => {
  anime.set(
    [
      "#caption-recoleta",
      "#caption-quillacollo",
      "#caption-cuellar",
      "#caption-rocha",
      "#lag-sarco",
      "#caption-sarco",
      "#america",
      "#caption-america",
      "#melchor-perez",
      "#caption-melchor-perez",
    ],
    {
      opacity: 0,
    }
  );
  anime.set(mapCercado, {
    translateX: "0%",
  });
};

const sec7Anim = anime
  .timeline({
    targets: mapCercado,
    scale: [30, 50],
    translateY: ["0%", "10%"],
    translateX: ["0%", "0%"],
    complete: () => {
      Caption.updateAllPositions();
    },
    easing: "easeInCubic",
    duration: 1500,
    autoplay: false,
  })
  .add({
    targets: "#lag-sarco",
    opacity: [0, 1],
  })
  .add({
    targets: ["#melchor-perez", "#america"],
    stroke: grey,
    complete: () => {
      anime.set(
        ["#caption-sarco", "#caption-america", "#caption-melchor-perez"],
        { opacity: 1 }
      );
    },
    strokeWidth: [0, 0.75],
    opacity: [0, 1],
  });

const sec8Prep = () => {
  anime.set(mapCercado, {
    translateY: "10%",
    translateX: "0%",
  });
  anime.set(
    [
      "#lag-cuadras",
      "#caption-cuadras",
      "#heroinas",
      "#caption-heroinas",
      "#belzu",
      "#caption-belzu",
      "#campus-umss",
      "#caption-campus-umss",
    ],
    {
      opacity: 0,
    }
  );
  anime.set(
    [
      "#america",
      "#caption-america",
      "#melchor-perez",
      "#caption-melchor-perez",
    ],
    {
      opacity: 1,
    }
  );
  Caption.updateAllPositions();
};

const sec8Anim = anime({
  targets: ["#lag-sarco", "#caption-sarco"],
  opacity: [1, 0],
  duration: 2000,
  easing: "easeInCubic",
  autoplay: false,
});

const sec9Prep = () => {
  anime.set(
    [
      "#lag-sarco",
      "#lag-cuadras",
      "#caption-cuadras",
      "#melchor-perez",
      "#caption-melchor-perez",
      "#america",
      "#caption-america",
      "#campus-umss",
      "#caption-campus-umss",
    ],
    {
      opacity: 0,
    }
  );
};

const sec9Anim = anime
  .timeline({
    targets: mapCercado,
    keyframes: [
      {
        scale: [50, 30],
        translateX: ["0%", "0%"],
        translateY: ["10%", "0%"],
        duration: 1500,
      },
      {
        duration: 1000,
      },
      {
        scale: [30, 50],
        translateX: ["0%", "-5%"],
        duration: 1500,
      },
    ],
    duration: 4000,
    easing: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: "#lag-cuadras",
    complete: () => {
      Caption.updateAllPositions();
      anime.set("#caption-cuadras", {
        opacity: 1,
      });
    },
    opacity: [0, 1],
    autoplay: false,
  })
  .add({
    targets: [
      "#caption-heroinas",
      "#caption-belzu",
      "#heroinas",
      "#belzu",
      "#caption-quillacollo",
      "#caption-campus-umss",
      "#campus-umss",
    ],
    stroke: grey,
    strokeWidth: (el, i) => {
      if (i >= 5) return 0.3;
      return 0.75;
    },
    strokeDasharray: (el, i) => {
      if (i >= 5) return ["1 1", "1 1"];
      return ["", ""];
    },
    easing: "linear",
    opacity: 1,
  });

const sec10Prep = () => {
  anime.set(
    [
      "#caption-rocha",
      "#caption-recoleta",
      "#caption-quillacollo",
      "#lag-cona-cona",
      "#caption-cona-cona",
      "#lag-alalay",
      "#caption-alalay",
      "#lag-albarrancho",
      "#caption-albarrancho",
      "#caption-tamborada",
    ],
    {
      opacity: 0,
    }
  );
  anime.set(
    [
      "#lag-cuadras",
      "#caption-cuadras",
      "#heroinas",
      "#caption-heroinas",
      "#belzu",
      "#caption-belzu",
      "#campus-umss",
      "#caption-campus-umss",
      "#caption-quillacollo",
    ],
    {
      opacity: 1,
    }
  );
  anime.set(mapCercado, {
    scale: 50,
    translateX: "-5%",
    translateY: "0%",
  });
  Caption.updateAllPositions();
};

const sec10Anim = anime({
  targets: ["#lag-cuadras", "#caption-cuadras"],
  opacity: [1, 0],
  easing: "easeInCubic",
  duration: 2000,
  autoplay: false,
});

const sec11Prep = () => {
  anime.set(
    [
      "#lag-sarco",
      "#caption-sarco",
      "#lag-cuadras",
      "#caption-cuadras",
      "#heroinas",
      "#caption-heroinas",
      "#belzu",
      "#caption-belzu",
      "#campus-umss",
      "#caption-campus-umss",
      "#caption-recoleta",
      "#caption-alalay",
      "#caption-cona-cona",
      "#caption-albarrancho",
      "#caption-quillacollo",
      "#caption-tamborada",
      "#cocha-svg",
    ],
    {
      opacity: 0,
    }
  );
  anime.set(mapCercado, { opacity: 1 });
  anime.set(["#lag-cona-cona", "#lag-alalay", "#lag-albarrancho"], {
    fill: lightblue,
  });
};

const sec11Anim = anime
  .timeline({
    targets: mapCercado,
    /*    complete: () => {
      Caption.updateAllPositions();
    },*/
    scale: [50, 30],
    translateX: ["-5%", "0%"],
    translateY: ["0%", "0%"],
    easing: "easeInCubic",
    duration: 2000,
    autoplay: false,
  })
  .add({
    targets: ["#lag-alalay"],
    complete: () => {
      Caption.updateAllPositions();
    },
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: "#lag-albarrancho",
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: "#lag-cona-cona",
    complete: () => {
      anime.set(
        [
          "#caption-alalay",
          "#caption-cona-cona",
          "#caption-albarrancho",
          "#caption-quillacollo",
          "#caption-tamborada",
          "#caption-recoleta",
          "#caption-rocha",
        ],
        { opacity: 1 }
      );
    },
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  });

const sec12Prep = () => {
  anime.set([mapCercado, "#cocha-svg-cercado"], {
    opacity: 0,
  });
};

const sec12Anim = anime
  .timeline({
    targets: [
      mapCercado,
      "#caption-alalay",
      "#caption-albarrancho",
      "#caption-rocha",
      "#caption-recoleta",
      "#caption-quillacollo",
      "#caption-cona-cona",
      "#caption-tamborada",
    ],
    opacity: [1, 0],
    duration: 2000,
    easing: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: "#cocha-svg",
    duration: 2000,
    scale: [12, 1],
    translateX: ["10%", "0%"],
    opacity: 1,
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
        callAnimation(11, sec11Anim);
        break;
      case 12:
        callAnimation(12, sec12Anim);
        break;
    }
  });
});

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
