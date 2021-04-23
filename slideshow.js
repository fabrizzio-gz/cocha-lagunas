const cuellarSlideShow = [
  {
    src: "media/cuellar-1.jpg",
    title: "Los cisnes de la Laguna Cuellar",
    credits: 'Revista "Ahora: Historias y Leyendas de Cochabamba"',
  },
];

const sarcoSlideShow = [
  {
    src: "media/sarco-1.jpg",
    title: "El espejo de la Laguna Sarco",
    credits: "Rodolfo Torrico Zamudio (ca. 1940-1950)",
  },
];

const cuadrasSlideShow = [
  { src: "", credits: "No se tienen fotos de la Laguna Cuadras" },
];

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
  }

  async start(slideShowList) {
    this.index = 0;
    this.slideShowList = slideShowList;
    this.showArrows();
    this.modal.classList.add("show-modal");
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
    const { src, title, credits } = this.slideShowList[this.index];
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
