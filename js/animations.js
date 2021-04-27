const lightblue = "#5BC3EB";
const grey = "#36382E";
const mapColor = "#EDE6E3";

/*
 * Helper functions
 */

const wrapper = () => {
  const elements = new Map();

  const show = (id) => {
    if (!elements.has(id)) elements.set(id, document.getElementById(id));
    elements.get(id).classList.remove("hidden");
    elements.get(id).style.opacity = 1;
  };

  const hide = (id) => {
    if (!elements.has(id)) elements.set(id, document.getElementById(id));
    elements.get(id).classList.add("hidden");
  };

  return { hide, show };
};

const { hide, show } = wrapper();

const setChildrenOpacityZero = (elementId) => {
  const children = document.getElementById(elementId).children;
  for (let i = 0; i < children.length; i++) children[i].style.opacity = 0;
};

const showCaptions = (captionIdList) => {
  captionIdList.forEach((captionId) => {
    getCaption(captionId).show();
  });
  Caption.updateAllPositions();
};

const prepCochaMap = () => {
  /* set scale and transformX, Y separately */
  Caption.hideAllCaptions();
  document.querySelector("#cocha-map-container").classList.remove("bottom");
  hide("cercado-map-container");
  /* Can't use hide("collage") because conflict with
   * previous "hide" element.
   */
  document.getElementById("collage").classList.add("hidden");
  show("cocha-map-container");
  anime.set("#cocha-map-container", { opacity: 1 });
};

const prepCercadoMap = () => {
  /* set scale and transformX, Y separately */
  hide("cocha-map-container");
  Caption.hideAllCaptions();
  setChildrenOpacityZero("cercado-svg-lagunas");
  setChildrenOpacityZero("cercado-svg-puentes");
  setChildrenOpacityZero("cercado-svg-rios");
  setChildrenOpacityZero("cercado-svg-avenidas");
  setChildrenOpacityZero("cercado-svg-edificios");
  show("cercado-map-container");
  anime.set("#cercado-svg", { opacity: 1 });
  show("cercado-svg-inner-elements");
  /* To avoid having animations running */
  hide("lag-cuellar");
  hide("lag-sarco");
  hide("lag-cuadras");
  hide("lag-alalay");
  hide("lag-cona-cona");
  hide("lag-quenamari");
  hide("lag-quenamari-circle");
  document.querySelector("#rio-rocha").classList.remove("draw-rocha");
  document.querySelector("#rio-tamborada").classList.remove("draw-tamborada");
};

const changeCoverAnimation = ({
  lake,
  lakeSelector,
  caption,
  newText,
  cssClass,
}) =>
  anime
    .timeline({
      targets: "",
      begin: () => {
        hide(lake);
      },
      duration: 1000,
      autoplay: false,
    })
    .add({
      targets: "",
      complete: () => {
        getCaption(caption).setText(newText);
        document.querySelector(lakeSelector).classList.add(cssClass);
        show(lake);
      },
      duration: 1000,
    });

const showFooter = () => {
  document.querySelector("#cocha-map-container").classList.add("bottom");
};

const getCaption = Caption.getCaption;

/*
 * Animations
 */

const sec0Prep = () => {
  prepCochaMap();
  document.querySelector("#cocha-map-container").classList.add("top");
  anime.set("#cocha-map-container", {
    translateX: 0,
    translateY: 0,
    scale: 1,
  });
  anime.set("#cocha-svg-cocha", { fill: lightblue });
  hide("cocha-svg-cercado");
};

const sec0Anim = anime({
  autoplay: false,
});

const sec1Prep = sec0Prep;

const sec1Anim = {
  play: () => {},
  restart: () => {},
  seek: () => {},
};

const sec2Prep = () => {
  sec0Prep();
  document.querySelector("#cocha-map-container").classList.remove("top");
  show("cocha-svg-cercado");
  anime.set("#cocha-svg-cercado", {
    fill: lightblue,
  });
  Caption.updateAllPositions();
};

const sec2Anim = anime({
  targets: "#cocha-svg-cocha",
  fill: mapColor,
  complete: () => {
    getCaption("caption-cercado").show();
  },
  easing: "linear",
  autoplay: false,
});

const sec3Prep = () => {
  sec2Prep();
  anime.set("#cocha-svg-cocha", { fill: mapColor });
  Caption.updateAllPositions();
  getCaption("caption-cercado").show();
};

const sec3Anim = anime({
  targets: "#cocha-svg-cercado",
  fill: [lightblue, grey],
  easing: "linear",
  autoplay: false,
  duration: 2000,
});

const sec4Prep = () => {
  sec3Prep();
  anime.set("#cocha-svg-cercado", { fill: grey });

  document.getElementById("cercado-svg").style.transform =
    "translate( max( -14vw, -14vh ), min( 5.8vw, 5.8vh ) )" + " scale( 0.08 )";
  show("cercado-map-container");
  hide("cercado-svg-inner-elements");
  Caption.hideAllCaptions();
};

const sec4Anim = anime({
  targets: ["#cercado-svg", "#cocha-map-container"],
  begin: () => hide("cocha-svg-cercado"),
  translateX: (el, i) => {
    if (i == 1) return [0, 0];
    // https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    return [Math.round(Math.max(vw * -0.14, vh * -0.14)), 0];
  },
  translateY: (el, i) => {
    if (i == 1) return [0, 0];
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    return [Math.round(Math.min(vw, vh) * 0.058), 0];
  },
  scale: (el, i) => {
    if (i == 1) return [1, 12];
    return [0.08, 1];
  },
  opacity: (el, i) => {
    if (i == 1) return [1, 0];
    return [1, 1];
  },
  easing: "easeInQuart",
  autoplay: false,
  duration: 2000,
});

const sec5Prep = () => {
  prepCercadoMap();
  anime.set("#cercado-svg", {
    translateX: 0,
    translateY: 0,
    scale: 1,
  });
  show("lag-cuellar");
  document.querySelector("#lag-cuellar").classList.remove("estadio-cover");
  anime.set("#lag-cuellar", { opacity: 0 });
  getCaption("caption-cuellar").setText("Laguna Cuellar");
};

const captionsSec5 = [
  "caption-recoleta",
  "caption-quillacollo",
  "caption-cuellar",
  "caption-rocha",
  "caption-tamborada",
  "caption-libertadores",
  "caption-juan-rosa",
];

const showCaptionsSec5 = () => showCaptions(captionsSec5);

const sec5Anim = anime
  .timeline({
    targets: "#cercado-svg",
    translateX: [0, "-20%"],
    translateY: [0, "30%"],
    scale: [1, 6],
    duration: 1000,
    easing: "linear",
    autoplay: false,
  })
  .add({
    targets: [
      "#lag-cuellar",
      "#cercado-svg-rios path",
      "#p-recoleta, #p-quillacollo",
      "#libertadores",
      "#juan-rosa",
    ],
    opacity: [0, 1],
    complete: showCaptionsSec5,
  });

const sec6Prep = () => {
  prepCercadoMap();
  anime.set("#cercado-svg", {
    translateX: "-20%",
    translateY: "30%",
    scale: 6,
  });
  anime.set(
    [
      "#lag-cuellar",
      "#cercado-svg-rios path",
      "#p-recoleta, #p-quillacollo",
      "#libertadores",
      "#juan-rosa",
    ],
    {
      opacity: 1,
    }
  );
  show("lag-cuellar");
  getCaption("caption-cuellar").setText("Laguna Cuellar");
  document.querySelector("#lag-cuellar").classList.remove("estadio-cover");
  showCaptionsSec5();
};

const sec6Anim = changeCoverAnimation({
  lake: "lag-cuellar",
  lakeSelector: "#lag-cuellar",
  caption: "caption-cuellar",
  newText: "Estadio Félix Capriles",
  cssClass: "estadio-cover",
});

const sec7Prep = () => {
  sec6Prep();
  hide("lag-cuellar");
  show("lag-sarco");
  Caption.hideAllCaptions();
  anime.set(["#lag-cuellar", "#libertadores", "#juan-rosa"], { opacity: 0 });
  getCaption("caption-sarco").setText("Laguna Sarco");
  document.querySelector("#lag-sarco").classList.remove("complejo-sarco-cover");
};

const captionsSec7 = [
  "caption-sarco",
  "caption-america",
  "caption-melchor-perez",
  "caption-recoleta",
  "caption-quillacollo",
  "caption-rocha",
  "caption-tamborada",
];

const showCaptionsSec7 = () => showCaptions(captionsSec7);

const sec7Anim = anime
  .timeline({
    targets: "#cercado-svg",
    keyframes: [
      {
        translateX: ["-20%", 0],
        translateY: ["30%", 0],
        scale: [6, 2.5],
        duration: 1500,
      },
      {
        duration: 1000,
      },
      {
        translateX: [0, 0],
        translateY: [0, "40%"],
        scale: [2.5, 6],
        duration: 1500,
      },
    ],
    easing: "easeInCubic",
    duration: 4000,
    autoplay: false,
  })
  .add({
    targets: ["#melchor-perez", "#america", "#lag-sarco"],
    complete: showCaptionsSec7,
    opacity: [0, 1],
  });

const sec8Prep = () => {
  sec7Prep();
  anime.set("#cercado-svg", {
    translateX: 0,
    translateY: "40%",
    scale: 6,
  });
  anime.set(["#melchor-perez", "#america", "#lag-sarco"], {
    opacity: 1,
  });
  showCaptionsSec7();
};

const sec8Anim = changeCoverAnimation({
  lake: "lag-sarco",
  lakeSelector: "#lag-sarco",
  caption: "caption-sarco",
  newText: "Complejo Deportivo Sarco",
  cssClass: "complejo-sarco-cover",
});

const sec9Prep = () => {
  prepCercadoMap();
  anime.set("#cercado-svg", {
    translateX: 0,
    translateY: "40%",
    scale: 6,
  });
  anime.set(["#cercado-svg-rios path", "#p-recoleta, #p-quillacollo"], {
    opacity: 1,
  });
  document
    .querySelector("#lag-cuadras")
    .classList.remove("estacion-teleferico-cover");
  show("lag-cuadras");
  getCaption("caption-cuadras").setText("Laguna Cuadras");
  getCaption("caption-sarco").setText("Laguna Sarco");
};

const captionsSec9 = [
  "caption-cuadras",
  "caption-heroinas",
  "caption-belzu",
  "caption-quillacollo",
  "caption-campus-umss",
];

const showCaptionsSec9 = () => showCaptions(captionsSec9);

const sec9Anim = anime
  .timeline({
    targets: "#cercado-svg",
    keyframes: [
      {
        translateX: [0, "-10%"],
        translateY: ["40%", 0],
        scale: [6, 2.5],
        duration: 1500,
      },
      {
        duration: 1000,
      },
      {
        translateX: ["-10%", "-40%"],
        translateY: [0, 0],
        scale: [2.5, 6],
        duration: 1500,
      },
    ],
    delay: 0,
    duration: 4000,
    easing: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: ["#lag-cuadras", "#heroinas", "#belzu", "#campus-umss"],
    complete: showCaptionsSec9,
    opacity: [0, 1],
    duratioon: 5000,
    easing: "easeInQuint",
  });

const sec10Prep = () => {
  prepCercadoMap();
  document
    .querySelector("#lag-cuadras")
    .classList.remove("estacion-teleferico-cover");
  show("lag-cuadras");
  anime.set("#cercado-svg", {
    translateX: "-40%",
    translateY: 0,
    scale: 6,
  });
  anime.set(
    [
      "#heroinas",
      "#belzu",
      "#campus-umss",
      "#cercado-svg-rios path",
      "#p-recoleta, #p-quillacollo",
    ],
    {
      opacity: 1,
    }
  );
  getCaption("caption-cuadras").setText("Laguna Cuadras");
  showCaptionsSec9();
};

const sec10Anim = changeCoverAnimation({
  lake: "lag-cuadras",
  lakeSelector: "#lag-cuadras",
  caption: "caption-cuadras",
  newText: "Estación Parque Teleférico",
  cssClass: "estacion-teleferico-cover",
});
/*anime
  .timeline({
    targets: "#lag-cuadras",
    opacity: [1, 0],
    easing: "easeInCubic",
    duration: 2000,
    autoplay: false,
  })
  .add({
    targets: "#estacion-teleferico",
    opacity: [0, 1],
    complete: () => {
      getCaption("caption-cuadras").setText("Estación Parque Teleférico");
      hide("lag-cuadras");
    },
  });*/

const sec11Prep = () => {
  prepCercadoMap();
  document.querySelector("#lag-quenamari").classList.remove("shrink");
  show("lag-alalay");
  show("lag-cona-cona");
  show("lag-quenamari");
  anime.set("#cercado-svg", {
    translateX: "-40%",
    translateY: 0,
    scale: 6,
  });

  anime.set(["#cercado-svg-rios path", "#p-recoleta, #p-quillacollo"], {
    opacity: 1,
  });
};

const captionsSec11 = [
  "caption-alalay",
  "caption-cona-cona",
  "caption-quenamari",
  "caption-quillacollo",
  "caption-tamborada",
  "caption-recoleta",
  "caption-rocha",
  "caption-aeropuerto",
];

const showCaptionsSec11 = () => showCaptions(captionsSec11);

const sec11Anim = anime
  .timeline({
    targets: "#cercado-svg",
    scale: [4, 2],
    translateX: ["-30%", "-10%"],
    translateY: [0, 0],
    easing: "easeInCubic",
    duration: 2000,
    autoplay: false,
  })
  .add({
    targets: "#lag-alalay",
    begin: () => {
      document.querySelector("#rio-rocha").classList.add("draw-rocha");
      document.querySelector("#rio-tamborada").classList.add("draw-tamborada");
    },
    opacity: [0, 1],
  })
  .add({
    targets: "#lag-quenamari",
    opacity: [0, 1],
  })
  .add({
    targets: ["#lag-cona-cona", "#aeropuerto"],
    complete: showCaptionsSec11,
    opacity: [0, 1],
  });

const sec12Prep = () => {
  prepCercadoMap();
  document.querySelector("#lag-quenamari").classList.remove("shrink");
  show("lag-alalay");
  show("lag-cona-cona");
  show("lag-quenamari");

  anime.set("#cercado-svg", {
    translateX: "-10%",
    translateY: 0,
    scale: 2,
  });
  anime.set(
    ["#cercado-svg-rios path", "#p-recoleta, #p-quillacollo", "#aeropuerto"],
    {
      opacity: 1,
    }
  );
  anime.set("#final-message", { opacity: 0 });
};

const sec12Anim = anime
  .timeline({
    targets: "#cercado-svg",

    translateX: ["-10%", "10%"],
    translateY: [0, "-30%"],
    scale: [2, 2.5],
    easing: "easeInCubic",
    duration: 2000,
    autoplay: false,
  })
  .add({
    targets: "#lag-quenamari-circle",
    begin: () => {
      document
        .querySelector("#lag-quenamari-circle")
        .classList.remove("hidden");
      document.querySelector("#lag-quenamari-circle").style.opacity = 0;
    },
    complete: showCaptionsSec11,
    opacity: [0, 1],
    duration: 2000,
    ease: "linear",
  });

const sec13Prep = () => {
  prepCercadoMap();
  show("lag-alalay");
  show("lag-cona-cona");
  show("lag-quenamari");
  director.showCollage();
  document.getElementById("collage").classList.add("hidden");
  anime.set("#cercado-svg", {
    translateX: "10%",
    translateY: "-30%",
    scale: 2.5,
  });
  anime.set(
    ["#cercado-svg-rios path", "#p-recoleta, #p-quillacollo", "#aeropuerto"],
    {
      opacity: 1,
    }
  );
  anime.set("#final-message", { opacity: 0 });
};

const sec13Anim = anime({
  targets: "#cercado-svg",
  complete: () => {
    anime.set("#cocha-svg-cocha", { fill: mapColor });
    anime.set("#cocha-map-container", {
      translateX: 0,
      translateY: 0,
      scale: 1,
    });
    hide("cocha-svg-cercado");
    prepCochaMap();
    showFooter();
    document.getElementById("collage").classList.remove("hidden");
    anime.set("#final-message", { opacity: 1 });
  },
  opacity: [1, 0],
  translateX: ["10%", 0],
  translateY: ["-30%", 0],
  scale: [2.5, 0.5],
  duration: 2000,
  easing: "easeInCubic",
  autoplay: false,
});
