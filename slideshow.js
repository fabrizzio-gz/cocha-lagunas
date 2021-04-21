class SlideShowDirector {
  constructor() {
    this.imgList = new Map();
    this.imgList.set("default", document.querySelector("#image-container img"));
    const noSrc = document.createElement("img");
    noSrc.alt = "No se tienen imagenes de esa laguna";
    this.imgList.set("noSrc", noSrc);
    this.modal = document.querySelector(".modal");
    this.figcaption = document.querySelector("#slideshow figcaption");
    this.cite = document.querySelector("#slideshow cite");
    this.index = 0;
    this.imgContainer = document.querySelector("#image-container");
    this.img = document.querySelector("#image-container img");
  }

  closeModal() {
    this.modal.classList.remove("show-modal");
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

  resetSlideShowContent() {
    this.figcaption.textContent = "";
    this.cite.textContent = "";
    //const img = document.querySelector("#image-container img");
    if (this.img !== this.imgList.get("default")) {
      this.imgContainer.replaceChild(this.imgList.get("default"), this.img);
      this.img = this.imgList.get("default");
    }
  }

  async showSingleImg(src, title, credits) {
    if (title) this.figcaption.appendChild(document.createTextNode(title));

    if (src) {
      if (!this.imgList.has(src)) {
        this.imgList.set(src, await this.loadImg(src));
      } else this.imgList.get(src);
      this.imgContainer.replaceChild(this.imgList.get(src), this.img);
      this.img = this.imgList.get(src);
    } else {
      this.imgContainer.replaceChild(this.imgList.get("noSrc"), this.img);
      this.img = this.imgList.get("noSrc");
    }

    if (credits) this.cite.appendChild(document.createTextNode(credits));
  }

  async createSlideShow(slideShowList) {
    const { src, title = "", credits = "" } = slideShowList[0];
    this.resetSlideShowContent();
    this.modal.classList.add("show-modal");
    // const figure = document.getElementById("slideshow");

    /*while (figure.firstChild) {
      figure.removeChild(figure.lastChild);
      }*/
    await this.showSingleImg(src, title, credits);
  }
}

const slideShowDirector = new SlideShowDirector();

document.querySelector(".modal").addEventListener("click", (e) => {
  if (e.target === document.querySelector("#slideshow"))
    slideShowDirector.closeModal();
});

document
  .querySelector(".close-modal-button")
  .addEventListener("click", () => slideShowDirector.closeModal());
