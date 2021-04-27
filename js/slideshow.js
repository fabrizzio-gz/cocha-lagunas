const cuellarSlideShow = [
  {
    src: "img/cuellar-1.jpg",
    title: "Los cisnes de la Laguna Cuellar",
    credits: '—Revista "Ahora: Historias y Leyendas de Cochabamba"',
  },
  {
    src: "img/cuellar-2.jpg",
    title: "Laguna Cuellar",
    credits: "—Autor desconocido. Cochabamba, 1925",
    figcaption: "Había una pequeña isla con un quiosco al medio de la laguna.",
  },
];

const estadioSlideShow = [
  {
    src: "img/estadio-1.jpg",
    title: "Estadio Félix Capriles",
    credits: '—Blog "Los Estadios del Mundo"',
  },
];

const sarcoSlideShow = [
  {
    src: "img/sarco-1.jpg",
    title: "El espejo de la Laguna Sarco",
    credits: "—Rodolfo Torrico Zamudio (ca. 1940-1950)",
  },
];

const complejoSarcoSlideShow = [
  {
    src: "img/complejo-sarco-1.jpg",
    title: "Gimnasio Polifuncional Sarco",
    credits: "—Los Tiempos. Daniel James.",
  },
  {
    src: "img/complejo-sarco-2.png",
    title: "Gimnasio Polifuncional Sarco",
    credits: "—Google maps (2015)",
  },
];

const cuadrasSlideShow = [
  { src: "", credits: "—No se tienen fotos de la Laguna Cuadras" },
];

const estacionTelefericoSlideShow = [
  {
    src: "img/estacion-teleferico-1.png",
    title: "Parque de la Autonomía",
    credits: "—Google maps (2015)",
  },
  {
    src: "img/estacion-teleferico-2.png",
    title: "Estación Teleférico",
    credits: "—Google maps (2015)",
  },
];

const quenamariSlideShow = [
  {
    src: "img/quenamari-1.jpg",
    title: "Laguna Quenamari",
    credits: "—Los Tiempos. Carlos López (2016)",
    figcaption:
      "Ya en el 2015, se presentó un <a href='https://www.lostiempos.com/actualidad/cochabamba/20190504/tres-anos-no-hay-ley-proteccion-quenamari' target='_blank'>proyecto de Ley</a> para hacer de la Laguna Quenamari un área protegida. No ha sido aprobado hasta la fecha.",
  },
  {
    src: "img/quenamari-2.jpg",
    title: "Laguna Quenamari",
    credits: "—Los Tiempos. José Rocha (2017)",
    figcaption:
      "El agua que ingresaba a la laguna desde los rebalses del río Rocha y Tamborada ha sido <a href='https://www.lostiempos.com/actualidad/cochabamba/20171122/30-anos-ciudad-perdio-4-lagunas-urbanas-hay-3-riesgo' target='_blank'>desviado</a>.",
  },
  {
    src: "img/quenamari-3.jpg",
    title: "Laguna Quenamari avasallada",
    credits: "—Opinión (2019)",
    figcaption:
      "Poco a poco, los terrenos de la laguna son <a href='https://www.opinion.com.bo/articulo/cochabamba/construcciones-invaden-laguna-quenamari-entes-buscan-frenar/20190321060800644802.html' target='_blank'>rellenados</a> para cultivar o incluso para construir.",
  },
];

class Director {
  constructor() {
    this.imgList = new Map();
    this.imgList.set("default", document.querySelector("#slideshow img"));
    this.modal = document.querySelector(".modal");
    this.slideshow = document.querySelector("#slideshow");
    this.title = document.querySelector("#slideshow h2");
    this.index = 0;
    this.prev = document.querySelector(".side-arrow.prev");
    this.img = document.querySelector("#slideshow img");
    this.next = document.querySelector(".side-arrow.next");
    this.cite = document.querySelector("#slideshow cite");
    this.figcaption = document.querySelector("#slideshow figcaption");
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
    this.title.textContent = "";
    this.cite.textContent = "";
    this.figcaption.innerHTML = "";
    if (this.img !== this.imgList.get("default")) {
      this.slideshow.replaceChild(this.imgList.get("default"), this.img);
      this.img = this.imgList.get("default");
    }
  }

  showArrows() {
    if (this.index == 0) this.prev.classList.add("hidden");
    else this.prev.classList.remove("hidden");
    if (
      this.slideShowList.length > 1 &&
      this.index < this.slideShowList.length - 1
    )
      this.next.classList.remove("hidden");
    else this.next.classList.add("hidden");
  }

  async showSingleImg() {
    this.reset();
    const { src, title, credits, figcaption = "" } = this.slideShowList[
      this.index
    ];
    if (title) this.title.appendChild(document.createTextNode(title));

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

    if (figcaption) this.figcaption.innerHTML = figcaption;
  }

  async showCollage() {
    if (this.imgList.has("img/collage.jpg")) return;
    const collageImg = await this.loadImg("img/collage.jpg");
    collageImg.id = "collage";
    collageImg.alt = "Aves en las lagunas Alalay, Coña Coña y Quenamari";
    this.imgList.set("img/collage.jpg", collageImg);
    document
      .querySelector("#cocha-map-container")
      .replaceChild(
        collageImg,
        document.querySelector("#cocha-map-container img")
      );
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

const getImage = (e) => {
  switch (e.target.id) {
    case "lag-cuellar":
      if (e.target.classList.contains("estadio-cover"))
        director.start(estadioSlideShow);
      else director.start(cuellarSlideShow);
      break;
    case "lag-sarco":
      if (e.target.classList.contains("complejo-sarco-cover"))
        director.start(complejoSarcoSlideShow);
      else director.start(sarcoSlideShow);

      break;
    case "lag-cuadras":
      if (e.target.classList.contains("estacion-teleferico-cover"))
        director.start(estacionTelefericoSlideShow);
      else director.start(cuadrasSlideShow);
      break;
    case "lag-quenamari-circle":
      director.start(quenamariSlideShow);
      break;
  }
};

document
  .querySelectorAll("#cercado-svg-lagunas circle")
  .forEach((e) => e.addEventListener("click", getImage));

document.querySelector(".modal").addEventListener("click", (e) => {
  if (e.target === document.querySelector("#slideshow")) director.stop();
});

document
  .querySelector(".close-modal-button")
  .addEventListener("click", () => director.stop());

document
  .querySelector(".side-arrow.prev")
  .addEventListener("click", () => director.prevImg());

document
  .querySelector(".side-arrow.next")
  .addEventListener("click", () => director.nextImg());

document.querySelector("#photos-cuellar").addEventListener("click", () => {
  director.start(cuellarSlideShow);
});

document.querySelector("#photos-sarco").addEventListener("click", () => {
  director.start(sarcoSlideShow);
});

document.querySelector("#photos-cuadras").addEventListener("click", () => {
  director.start(cuadrasSlideShow);
});

document.querySelector("#photos-quenamari").addEventListener("click", () => {
  director.start(quenamariSlideShow);
});
