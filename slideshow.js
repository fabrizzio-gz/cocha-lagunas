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
    this.prev = document.querySelector(".side-arrow.prev");
    this.img = document.querySelector("#image-container img");
    this.next = document.querySelector(".side-arrow.next");
    this.slideShowList = [];
  }

  async startSlideShow(slideShowList) {
    this.index = 0;
    this.slideShowList = slideShowList;
    this.resetSlideShowContent();
    this.showArrows();
    this.modal.classList.add("show-modal");
    await this.showSingleImg();
  }

  resetSlideShowContent() {
    this.figcaption.textContent = "";
    this.cite.textContent = "";
    this.prev.classList.remove("hidden");
    this.next.classList.remove("hidden");
    if (this.img !== this.imgList.get("default")) {
      this.imgContainer.replaceChild(this.imgList.get("default"), this.img);
      this.img = this.imgList.get("default");
    }
  }

  showArrows() {
    if (this.index == 0) this.prev.classList.add("hidden");
    if (
      !(
        this.slideShowList.length > 1 &&
        this.index < this.slideShowList.length - 1
      )
    )
      this.next.classList.add("hidden");
  }

  async showSingleImg() {
    const { src, title, credits } = this.slideShowList[this.index];
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

  /* https://stackoverflow.com/questions/46399223/async-await-in-image-loading */
  async loadImg(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  stopSlideShow() {
    this.modal.classList.remove("show-modal");
  }
}

const slideShowDirector = new SlideShowDirector();

document.querySelector(".modal").addEventListener("click", (e) => {
  if (e.target === document.querySelector("#slideshow"))
    slideShowDirector.stopSlideShow();
});

document
  .querySelector(".close-modal-button")
  .addEventListener("click", () => slideShowDirector.stopSlideShow());
