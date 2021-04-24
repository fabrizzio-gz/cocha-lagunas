function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Caption {
  constructor(text = "", elementId = "", isAvenida = false, isEdificio = false) {
    this.text = text;
    this.elementId = elementId;
    this.isAvenida = isAvenida;
    this.isEdificio = isEdificio;
    let x, y;
    ({
      x,
      y
    } = this.getElementPosition(elementId, this.isAvenida));
    this.div = document.createElement("div");
    this.captionId = this.elementId;
    if (this.captionId.includes("cercado-svg-caption")) this.captionId = this.captionId.replace("cercado-svg-", "");else if (this.captionId.includes("cocha-svg-caption")) this.captionId = this.captionId.replace("cocha-svg-", "");else this.captionId = "caption-" + this.captionId;
    this.div.setAttribute("id", this.captionId);
    this.div.classList.add("caption");
    this.div.classList.add("hidden");
    if (this.isAvenida) this.div.classList.add("avenida");
    if (isEdificio) this.div.classList.add("edificio");
    this.setPosition(x, y, this.isAvenida);
    this.div.appendChild(document.createTextNode(text));
    this.add();
    Caption.list.set(this.captionId, this);
  }

  getElementPosition(elementId, isAvenida) {
    const element = document.getElementById(elementId);
    let x, y, right, bottom;
    ({
      x,
      y,
      right,
      bottom
    } = element.getBoundingClientRect());
    if (isAvenida) return {
      x: right,
      y: bottom
    };
    return {
      x,
      y
    };
  }

  setPosition(posX, posY, isAvenida) {
    this.posX = posX;
    this.posY = posY;
    this.div.style.left = this.posX + "px";
    this.div.style.top = this.posY + "px";
  }

  setText(text) {
    this.div.textContent = text;
  }

  add() {
    document.body.appendChild(this.div);
  }

  show() {
    this.div.classList.remove("hidden");
  }

  hide() {
    this.div.classList.add("hidden");
  }

  static purge() {
    Caption.list.forEach(caption => caption.div.remove());
    Caption.list = new Map();
  }

  static updateAllPositions() {
    Caption.list.forEach(caption => {
      const {
        x,
        y
      } = caption.getElementPosition(caption.elementId);
      caption.setPosition(x, y);
    });
  }

  static getCaption(captionId) {
    if (!Caption.list.has(captionId)) console.error(`Caption id ${captionId} does not exist`);
    return Caption.list.get(captionId);
  }

  static hideAllCaptions() {
    Caption.list.forEach(caption => {
      caption.div.classList.add("hidden");
    });
  }

  static showAllCaptions() {
    Caption.list.forEach(caption => {
      caption.div.classList.remove("hidden");
    });
  }

  static init() {
    Caption.purge();
    const captionCochaSvg = [{
      id: "cocha-svg-caption-cercado",
      text: "Cercado",
      translate: "translate(-50%,-50%)"
    }];
    const captionCercadoSvg = [{
      id: "cercado-svg-caption-rocha",
      text: "Río Rocha"
    }, {
      id: "cercado-svg-caption-recoleta",
      text: "Recoleta"
    }, {
      id: "cercado-svg-caption-libertadores",
      text: "Av. Libertadores",
      translate: "translate(-50%, -50%) rotate(75deg)",
      isAvenida: true
    }, {
      id: "cercado-svg-caption-juan-rosa",
      text: "Av. Juan de la Rosa",
      translate: "translate(-50%, -50%) rotate(28deg)",
      isAvenida: true
    }, {
      id: "cercado-svg-caption-cuellar",
      text: "Laguna Cuellar"
    }, {
      id: "cercado-svg-caption-quillacollo",
      text: "Puente Quillacollo"
    }, {
      id: "cercado-svg-caption-america",
      text: "Av. América",
      translate: "translate(-50%, -50%) rotate(3deg)",
      isAvenida: true
    }, {
      id: "cercado-svg-caption-melchor-perez",
      text: "Av. Melchor Pérez",
      translate: "translate(-50%, -50%) rotate(-85deg)",
      isAvenida: true
    }, {
      id: "cercado-svg-caption-sarco",
      text: "Laguna Sarco"
    }, {
      id: "cercado-svg-caption-belzu",
      text: "Av. Belzu",
      translate: "translate(-50%, -50%) rotate(65deg)",
      isAvenida: true
    }, {
      id: "cercado-svg-caption-campus-umss",
      text: "UMSS",
      translate: "translate(-50%, -50%) rotate(-10deg)",
      isEdificio: true
    }, {
      id: "cercado-svg-caption-heroinas",
      text: "Av. Heroínas",
      translate: "translate(-50%, -50%) rotate(-10deg)",
      isAvenida: true
    }, {
      id: "cercado-svg-caption-cuadras",
      text: "Laguna Cuadras"
    }, {
      id: "cercado-svg-caption-cona-cona",
      text: "Laguna Coña Coña"
    }, {
      id: "cercado-svg-caption-alalay",
      text: "Laguna Alalay"
    }, {
      id: "cercado-svg-caption-quenamari",
      text: "Laguna Quenamari"
    }, {
      id: "cercado-svg-caption-aeropuerto",
      text: "Aeropuerto",
      translate: "translate(-50%, -50%) rotate(42deg)",
      isEdificio: true
    }, {
      id: "cercado-svg-caption-tamborada",
      text: "La Tamborada"
    }];
    captionCochaSvg.forEach(({
      id,
      text,
      translate = "",
      isAvenida = false,
      isEdificio = false
    }) => {
      const caption = new Caption(text, id, isAvenida, isEdificio);
      if (translate) caption.div.style.transform = translate;
    });
    captionCercadoSvg.forEach(({
      id,
      text,
      translate = "",
      isAvenida = false,
      isEdificio = false
    }) => {
      const caption = new Caption(text, id, isAvenida, isEdificio);
      if (translate) caption.div.style.transform = translate;
    });
  }

}

_defineProperty(Caption, "list", new Map());
const windowY = document.documentElement.clientHeight;
const lightblue = "#00dbfc";
const orange = "#ff7a00";
const grey = "#3b4749";
const lightgrey = "#f9fafa";
const invisible = "rgba(0,0,0,0)";
const white = "#fff";
/*
 * Helper functions
 */

const wrapper = () => {
  const elements = new Map();

  const show = id => {
    if (!elements.has(id)) elements.set(id, document.getElementById(id));
    elements.get(id).classList.remove("hidden");
    elements.get(id).style.opacity = 1;
  };

  const hide = id => {
    if (!elements.has(id)) elements.set(id, document.getElementById(id));
    elements.get(id).classList.add("hidden");
  };

  return {
    hide,
    show
  };
};

const {
  hide,
  show
} = wrapper();

const setChildrenOpacityZero = elementId => {
  const children = document.getElementById(elementId).children;

  for (let i = 0; i < children.length; i++) children[i].style.opacity = 0;
};

const showCaptions = captionIdList => {
  captionIdList.forEach(captionId => {
    getCaption(captionId).show();
  });
  Caption.updateAllPositions();
};

const prepCochaMap = () => {
  /* set scale and transformX, Y separately */
  Caption.hideAllCaptions();
  hide("cercado-map-container");
  show("cocha-map-container");
  anime.set("#cocha-map-container", {
    opacity: 1
  });
};

const prepCercadoMap = () => {
  /* set scale and transformX, Y separately */
  hide("cocha-map-container");
  document.querySelector(".arrow").classList.add("hidden");
  Caption.hideAllCaptions();
  setChildrenOpacityZero("cercado-svg-lagunas");
  setChildrenOpacityZero("cercado-svg-puentes");
  setChildrenOpacityZero("cercado-svg-rios");
  setChildrenOpacityZero("cercado-svg-avenidas");
  setChildrenOpacityZero("cercado-svg-edificios");
  show("cercado-map-container");
  anime.set("#cercado-svg", {
    opacity: 1
  });
  show("cercado-svg-inner-elements");
  /* To avoid having animations running */

  hide("lag-cuellar");
  hide("lag-sarco");
  hide("lag-cuadras");
  hide("lag-alalay");
  hide("lag-cona-cona");
  hide("lag-quenamari");
  document.querySelector("#rio-rocha").classList.remove("draw-rocha");
  document.querySelector("#rio-tamborada").classList.remove("draw-tamborada");
};

const getCaption = Caption.getCaption;
/*
 * Animations
 */

const introAnim = anime({
  targets: "#cocha-svg",
  scale: 1.05,
  delay: 250,
  direction: "alternate",
  loop: true,
  easing: "linear",
  autoplay: true
});

const sec0Prep = () => {
  prepCochaMap();
  anime.set("#cocha-map-container", {
    translateX: 0,
    translateY: 0,
    scale: 1
  });
  anime.set("#cocha-svg-cocha", {
    fill: lightblue
  });
  hide("cocha-svg-cercado");
};

const sec0Anim = anime({
  autoplay: false
});
const sec1Prep = sec0Prep;
const sec1Anim = {
  play: () => {},
  restart: () => {},
  seek: () => {}
};

const sec2Prep = () => {
  sec0Prep();
  document.querySelector(".arrow").classList.add("hidden");
  show("cocha-svg-cercado");
  anime.set("#cocha-svg-cercado", {
    fill: lightblue
  });
  Caption.updateAllPositions();
};

const sec2Anim = anime({
  targets: "#cocha-svg-cocha",
  fill: white,
  complete: () => {
    getCaption("caption-cercado").show();
  },
  easing: "linear",
  autoplay: false
});

const sec3Prep = () => {
  sec2Prep();
  anime.set("#cocha-svg-cocha", {
    fill: white
  });
  Caption.updateAllPositions();
  getCaption("caption-cercado").show();
};

const sec3Anim = anime({
  targets: "#cocha-svg-cercado",
  fill: [lightblue, grey],
  easing: "linear",
  autoplay: false,
  duration: 2000
});

const sec4Prep = () => {
  sec3Prep();
  anime.set("#cocha-svg-cercado", {
    fill: grey
  });
  document.getElementById("cercado-svg").style.transform = "translate( max( -14vw, -14vh ), min( 5.8vw, 5.8vh ) )" + " scale( 0.08 )";
  show("cercado-map-container");
  hide("cercado-svg-inner-elements");
  Caption.hideAllCaptions();
};

const sec4Anim = anime({
  targets: ["#cercado-svg", "#cocha-map-container"],
  begin: () => hide("cocha-svg-cercado"),
  translateX: (el, i) => {
    if (i == 1) return [0, 0]; // https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    return [Math.round(Math.max(vw * -0.14, vh * -0.14)), 0];
  },
  translateY: (el, i) => {
    if (i == 1) return [0, 0];
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
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
  duration: 2000
});

const sec5Prep = () => {
  prepCercadoMap();
  anime.set("#cercado-svg", {
    translateX: 0,
    translateY: 0,
    scale: 1
  });
  show("lag-cuellar");
  anime.set("#lag-cuellar", {
    opacity: 0
  });
  getCaption("caption-cuellar").setText("Laguna Cuellar");
};

const captionsSec5 = ["caption-recoleta", "caption-quillacollo", "caption-cuellar", "caption-rocha", "caption-tamborada", "caption-libertadores", "caption-juan-rosa"];

const showCaptionsSec5 = () => showCaptions(captionsSec5);

const sec5Anim = anime.timeline({
  targets: "#cercado-svg",
  translateX: [0, "-20%"],
  translateY: [0, "30%"],
  scale: [1, 6],
  duration: 1000,
  easing: "linear",
  autoplay: false
}).add({
  targets: ["#lag-cuellar", "#cercado-svg-rios path", "#p-recoleta, #p-quillacollo", "#libertadores", "#juan-rosa"],
  opacity: [0, 1],
  complete: showCaptionsSec5
});

const sec6Prep = () => {
  prepCercadoMap();
  anime.set("#cercado-svg", {
    translateX: "-20%",
    translateY: "30%",
    scale: 6
  });
  anime.set(["#lag-cuellar", "#cercado-svg-rios path", "#p-recoleta, #p-quillacollo", "#libertadores", "#juan-rosa"], {
    opacity: 1
  });
  show("lag-cuellar");
  getCaption("caption-cuellar").setText("Laguna Cuellar");
  showCaptionsSec5();
};

const sec6Anim = anime.timeline({
  targets: "#lag-cuellar",
  opacity: [1, 0],
  easing: "easeInOutCubic",
  duration: 1500,
  autoplay: false
}).add({
  targets: "#estadio",
  opacity: [0, 1],
  complete: () => {
    getCaption("caption-cuellar").setText("Estadio Félix Capriles");
    hide("lag-cuellar");
  }
});

const sec7Prep = () => {
  sec6Prep();
  hide("lag-cuellar");
  show("lag-sarco");
  Caption.hideAllCaptions();
  anime.set(["#lag-cuellar", "#libertadores", "#juan-rosa"], {
    opacity: 0
  });
};

const captionsSec7 = ["caption-sarco", "caption-america", "caption-melchor-perez", "caption-recoleta", "caption-quillacollo", "caption-rocha", "caption-tamborada"];

const showCaptionsSec7 = () => showCaptions(captionsSec7);

const sec7Anim = anime.timeline({
  targets: "#cercado-svg",
  keyframes: [{
    translateX: ["-20%", 0],
    translateY: ["30%", 0],
    scale: [6, 2.5],
    duration: 1500
  }, {
    duration: 1000
  }, {
    translateX: [0, 0],
    translateY: [0, "40%"],
    scale: [2.5, 6],
    duration: 1500
  }],
  easing: "easeInCubic",
  duration: 4000,
  autoplay: false
}).add({
  targets: ["#melchor-perez", "#america", "#lag-sarco"],
  complete: showCaptionsSec7,
  opacity: [0, 1]
});

const sec8Prep = () => {
  sec7Prep();
  anime.set("#cercado-svg", {
    translateX: 0,
    translateY: "40%",
    scale: 6
  });
  anime.set(["#melchor-perez", "#america", "#lag-sarco"], {
    opacity: 1
  });
  getCaption("caption-sarco").setText("Laguna Sarco");
  showCaptionsSec7();
};

const sec8Anim = anime.timeline({
  targets: "#lag-sarco",
  opacity: [1, 0],
  duration: 1500,
  easing: "easeInCubic",
  autoplay: false
}).add({
  targets: "#complejo-sarco",
  opacity: [0, 1],
  complete: () => {
    getCaption("caption-sarco").setText("Complejo Deportivo Sarco");
    hide("lag-sarco");
  }
});

const sec9Prep = () => {
  prepCercadoMap();
  anime.set("#cercado-svg", {
    translateX: 0,
    translateY: "40%",
    scale: 6
  });
  anime.set(["#cercado-svg-rios path", "#p-recoleta, #p-quillacollo"], {
    opacity: 1
  });
  show("lag-cuadras");
  getCaption("caption-cuadras").setText("Laguna Cuadras");
  getCaption("caption-sarco").setText("Laguna Sarco");
};

const captionsSec9 = ["caption-cuadras", "caption-heroinas", "caption-belzu", "caption-quillacollo", "caption-campus-umss"];

const showCaptionsSec9 = () => showCaptions(captionsSec9);

const sec9Anim = anime.timeline({
  targets: "#cercado-svg",
  keyframes: [{
    translateX: [0, "-10%"],
    translateY: ["40%", 0],
    scale: [6, 2.5],
    duration: 1500
  }, {
    duration: 1000
  }, {
    translateX: ["-10%", "-40%"],
    translateY: [0, 0],
    scale: [2.5, 6],
    duration: 1500
  }],
  delay: 0,
  duration: 4000,
  easing: "easeInCubic",
  autoplay: false
}).add({
  targets: ["#lag-cuadras", "#heroinas", "#belzu", "#campus-umss"],
  complete: showCaptionsSec9,
  opacity: [0, 1],
  duratioon: 5000,
  easing: "easeInQuint"
});

const sec10Prep = () => {
  prepCercadoMap();
  show("lag-cuadras");
  anime.set("#cercado-svg", {
    translateX: "-40%",
    translateY: 0,
    scale: 6
  });
  anime.set(["#heroinas", "#belzu", "#campus-umss", "#cercado-svg-rios path", "#p-recoleta, #p-quillacollo"], {
    opacity: 1
  });
  getCaption("caption-cuadras").setText("Laguna Cuadras");
  showCaptionsSec9();
};

const sec10Anim = anime.timeline({
  targets: "#lag-cuadras",
  opacity: [1, 0],
  easing: "easeInCubic",
  duration: 2000,
  autoplay: false
}).add({
  targets: "#estacion-teleferico",
  opacity: [0, 1],
  complete: () => {
    getCaption("caption-cuadras").setText("Estación Parque Teleférico");
    hide("lag-cuadras");
  }
});

const sec11Prep = () => {
  prepCercadoMap();
  document.querySelector("#lag-quenamari").classList.remove("shrink");
  show("lag-alalay");
  show("lag-cona-cona");
  show("lag-quenamari");
  anime.set("#cercado-svg", {
    translateX: "-40%",
    translateY: 0,
    scale: 6
  });
  anime.set(["#cercado-svg-rios path", "#p-recoleta, #p-quillacollo"], {
    opacity: 1
  });
};

const captionsSec11 = ["caption-alalay", "caption-cona-cona", "caption-quenamari", "caption-quillacollo", "caption-tamborada", "caption-recoleta", "caption-rocha", "caption-aeropuerto"];

const showCaptionsSec11 = () => showCaptions(captionsSec11);

const sec11Anim = anime.timeline({
  targets: "#cercado-svg",
  scale: [4, 2],
  translateX: ["-30%", "-10%"],
  translateY: [0, 0],
  easing: "easeInCubic",
  duration: 2000,
  autoplay: false
}).add({
  targets: "#lag-alalay",
  begin: () => {
    document.querySelector("#rio-rocha").classList.add("draw-rocha");
    document.querySelector("#rio-tamborada").classList.add("draw-tamborada");
  },
  opacity: [0, 1]
}).add({
  targets: "#lag-quenamari",
  opacity: [0, 1]
}).add({
  targets: ["#lag-cona-cona", "#aeropuerto"],
  complete: showCaptionsSec11,
  opacity: [0, 1]
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
    scale: 2
  });
  anime.set(["#cercado-svg-rios path", "#p-recoleta, #p-quillacollo", "#aeropuerto"], {
    opacity: 1
  });
};

const sec12Anim = anime({
  targets: "#cercado-svg",
  complete: () => {
    showCaptionsSec11();
    document.querySelector("#lag-quenamari").classList.add("shrink");
  },
  translateX: ["-10%", "10%"],
  translateY: [0, "-30%"],
  scale: [2, 2.5],
  easing: "easeInCubic",
  duration: 2000,
  autoplay: false
});

const sec13Prep = () => {
  prepCercadoMap();
  show("lag-alalay");
  show("lag-cona-cona");
  show("lag-quenamari");
  anime.set("#cercado-svg", {
    translateX: "10%",
    translateY: "-30%",
    scale: 2.5
  });
  anime.set(["#cercado-svg-rios path", "#p-recoleta, #p-quillacollo", "#aeropuerto"], {
    opacity: 1
  });
};

const sec13Anim = anime({
  targets: "#cercado-svg",
  complete: () => {
    anime.set("#cocha-svg-cocha", {
      fill: white
    });
    anime.set("#cocha-map-container", {
      translateX: 0,
      translateY: 0,
      scale: 1
    });
    hide("cocha-svg-cercado");
    prepCochaMap();
  },
  opacity: [1, 0],
  translateX: ["10%", 0],
  translateY: ["-30%", 0],
  scale: [2.5, 0.5],
  duration: 2000,
  easing: "easeInCubic",
  autoplay: false
});
const cuellarSlideShow = [{
  src: "media/cuellar-1.jpg",
  title: "Los cisnes de la Laguna Cuellar",
  credits: '—Revista "Ahora: Historias y Leyendas de Cochabamba"'
}, {
  src: "media/cuellar-2.jpg",
  title: "Laguna Cuellar",
  credits: "—Cochabamba, 1925"
}];
const sarcoSlideShow = [{
  src: "media/sarco-1.jpg",
  title: "El espejo de la Laguna Sarco",
  credits: "—Rodolfo Torrico Zamudio (ca. 1940-1950)"
}];
const cuadrasSlideShow = [{
  src: "",
  credits: "—No se tienen fotos de la Laguna Cuadras"
}];

class Director {
  constructor() {
    this.imgList = new Map();
    this.imgList.set("default", document.querySelector("#slideshow img"));
    this.modal = document.querySelector(".modal");
    this.slideshow = document.querySelector("#slideshow");
    this.figcaption = document.querySelector("#slideshow figcaption");
    this.cite = document.querySelector("#slideshow cite");
    this.index = 0;
    this.prev = document.querySelector(".side-arrow.prev");
    this.img = document.querySelector("#slideshow img");
    this.next = document.querySelector(".side-arrow.next");
    this.slideShowList = [];
    this.isVisible = false;
  }

  async start(slideShowList) {
    this.index = 0;
    this.slideShowList = slideShowList;
    this.showArrows();
    this.modal.classList.add("show-modal");
    this.isVisible = true;
    await this.showSingleImg();
  }

  reset() {
    this.figcaption.textContent = "";
    this.cite.textContent = "";

    if (this.img !== this.imgList.get("default")) {
      this.slideshow.replaceChild(this.imgList.get("default"), this.img);
      this.img = this.imgList.get("default");
    }
  }

  showArrows() {
    if (this.index == 0) this.prev.classList.add("hidden");else this.prev.classList.remove("hidden");
    if (this.slideShowList.length > 1 && this.index < this.slideShowList.length - 1) this.next.classList.remove("hidden");else this.next.classList.add("hidden");
  }

  async showSingleImg() {
    this.reset();
    const {
      src,
      title,
      credits
    } = this.slideShowList[this.index];
    if (title) this.figcaption.appendChild(document.createTextNode(title));

    if (src) {
      if (!this.imgList.has(src)) {
        this.imgList.set(src, await this.loadImg(src));
      } else this.imgList.get(src);

      this.slideshow.replaceChild(this.imgList.get(src), this.img);
      this.img = this.imgList.get(src);
    } else {
      this.slideshow.replaceChild(this.imgList.get("default"), this.img);
      this.img = this.imgList.get("default");
    }

    if (credits) this.cite.appendChild(document.createTextNode(credits));
  }
  /* https://stackoverflow.com/questions/46399223/async-await-in-image-loading */


  async loadImg(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();

      img.onload = () => resolve(img);

      img.onerror = reject;
      img.src = src;
    });
  }

  stop() {
    this.modal.classList.remove("show-modal");
    this.isVisible = false;
  }

  async nextImg() {
    this.index++;
    this.showArrows();
    await this.showSingleImg();
  }

  async prevImg() {
    this.index--;
    this.showArrows();
    await this.showSingleImg();
  }

}

const director = new Director();
document.querySelector(".modal").addEventListener("click", e => {
  if (e.target === document.querySelector("#slideshow")) director.stop();
});
document.querySelector(".close-modal-button").addEventListener("click", () => director.stop());
document.querySelector(".side-arrow.prev").addEventListener("click", () => director.prevImg());
document.querySelector(".side-arrow.next").addEventListener("click", () => director.nextImg());
document.querySelector("#photos-cuellar").addEventListener("click", () => {
  director.start(cuellarSlideShow);
});
document.querySelector("#photos-sarco").addEventListener("click", () => {
  director.start(sarcoSlideShow);
});
document.querySelector("#photos-cuadras").addEventListener("click", () => {
  director.start(cuadrasSlideShow);
});
const init = () => {
  sec0Prep();
  Caption.init();
};

const getImage = e => {
  switch (e.target.id) {
    case "lag-cuellar":
      director.start(cuellarSlideShow);
      break;

    case "lag-sarco":
      director.start(sarcoSlideShow);
      break;

    case "lag-cuadras":
      director.start(cuadrasSlideShow);
      break;
  }
};

const getSectionSizes = () => {
  const inicioSize = Math.round(getComputedStyle(document.documentElement).getPropertyValue("--inicio-size") * windowY);
  const sectionSize = Math.max(Math.round(getComputedStyle(document.documentElement).getPropertyValue("--section-size") * windowY), getComputedStyle(document.documentElement).getPropertyValue("--min-section-size"));
  return {
    inicioSize,
    sectionSize
  };
};

const {
  inicioSize,
  sectionSize
} = getSectionSizes();
let currentSection = -1;

const scrollCallback = e => {
  if (director.isVisible) director.stop();
  const yPos = Math.round(window.scrollY);
  const positionMid = yPos + Math.round(windowY / 2);

  const callAnimation = (index, animation, prepFunction) => {
    if (currentSection != index) {
      anime.running.forEach(animation => animation.pause());
      prepFunction();
      animation.restart();
      animation.play();
      currentSection = index;
    }
  };
  /* if (yPos == 0) introAnim.play();
  else introAnim.pause(); */


  window.requestAnimationFrame(() => {
    const section = Math.ceil((positionMid - inicioSize) / sectionSize);

    switch (section) {
      case 0:
        callAnimation(0, sec0Anim, () => {
          document.querySelector(".arrow").classList.remove("hidden");
          sec0Prep();
        });
        break;

      case 1:
        callAnimation(1, sec1Anim, () => {
          document.querySelector(".arrow").classList.remove("hidden");
          sec1Prep();
        });
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

      case 13:
        callAnimation(13, sec13Anim, sec13Prep);
        break;
    }
  });
};
/* https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser */


const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
/* Window callbacks and event listeners */

window.onbeforeunload = () => {//window.scrollTo(0, 0);
};

window.onresize = Caption.updateAllPositions;
document.addEventListener("scroll", scrollCallback);
document.querySelectorAll("#cercado-svg-lagunas circle").forEach(e => e.addEventListener("click", getImage));
init();
