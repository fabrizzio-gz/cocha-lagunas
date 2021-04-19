const mapCocha = document.getElementById("cocha-svg");
const mapCercado = document.getElementById("cercado-svg");
const windowY = document.documentElement.clientHeight;

const lightblue = "#00dbfc";
const orange = "#ff7a00";
const grey = "#3b4749";
const lightgrey = "#f9fafa";
const invisible = "rgba(0,0,0,0)";
const white = "#fff";

const introAnim = anime({
  targets: mapCocha,
  scale: 1.05,
  delay: 250,
  direction: "alternate",
  loop: true,
  easing: "linear",
  autoplay: true,
});

const sec0Prep = () => {
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
      "#america",
      "#melchor-perez",
      "#heorinas",
      "#belzu",
      "#campus-umss",
      "#lag-sarco",
      "#lag-cuadras",
      "#cercado-svg",
    ],
    {
      opacity: 0,
    }
  );
  anime.set(mapCocha, { opacity: 1 });
};

const sec0Anim = {
  play: () => {},
  restart: () => {},
};

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
  anime.set("#lag-cuellar", { fill: invisible });
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
      "#p-quillacollo",
      "#p-recoleta",
    ],
    {
      opacity: 1,
    }
  );
  anime.set(["#cercado-svg-rios path"], { strokeWidth: 1 });
  anime.set("#lag-cuellar", { fill: invisible });
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
      "#lag-cuellar",
    ],
    {
      opacity: 0,
    }
  );
  anime.set("#lag-sarco", { fill: invisible });
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
    scale: 50,
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
      "#caption-quillacollo",
    ],
    {
      opacity: 0,
    }
  );
  anime.set(["#caption-america", "#caption-melchor-perez"], {
    opacity: 1,
  });
  anime.set(
    [
      "#america",
      "#caption-america",
      "#melchor-perez",
      "#caption-melchor-perez",
    ],
    {
      opacity: 1,
      strokeWidth: 0.75,
      stroke: grey,
    }
  );
  anime.set("#lag-sarco", { fill: invisible });
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
      "#caption-sarco",
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
  anime.set("#lag-cuadras", { fill: invisible });
  anime.set(mapCercado, {
    scale: 50,
    translateX: "-5%",
    translateY: "0%",
  });
  anime.set(["#heroinas", "#belzu"], { stroke: grey, strokeWidth: 0.75 });
  anime.set("#campus-umss", {
    stroke: grey,
    strokeWidth: 0.3,
    strokeDasharray: "1 1",
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
      "#caption-rocha",
      "#cocha-svg",
    ],
    {
      opacity: 0,
    }
  );
  anime.set([mapCercado, "#p-quillacollo", "#p-recoleta"], {
    opacity: 1,
    fill: grey,
  });
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
  anime.set([mapCocha, "#cocha-svg-cercado"], {
    opacity: 0,
  });
  anime.set("#cocha-svg-cocha", { fill: white });
  anime.set(["#lag-cona-cona", "#lag-alalay", "#lag-albarrancho"], {
    opacity: 1,
  });
  anime.set(mapCercado, {
    scale: 30,
    translateX: "0%",
    translateY: "0%",
  });
  Caption.updateAllPositions();
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
    opacity: [0, 1],
    easing: "easeOutQuad",
    autoplay: false,
  });
