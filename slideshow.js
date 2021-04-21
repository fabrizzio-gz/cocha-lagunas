/* https://stackoverflow.com/questions/46399223/async-await-in-image-loading */

const imgList = new Map();
imgList.set("default", document.querySelector("#image-container img"));
const noSrc = document.createElement("img");
noSrc.alt = "No se tienen imagenes de esa laguna";
imgList.set("noSrc", noSrc);

const loadImg = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const closeModal = () => {
  document.querySelector(".modal").classList.remove("show-modal");
};

const resetSlideShowContent = () => {
  document.querySelector("#slideshow figcaption").textContent = "";
  document.querySelector("#slideshow cite").textContent = "";
  const img = document.querySelector("#image-container img");
  if (img !== imgList.get("default")) {
    document
      .querySelector("#image-container")
      .replaceChild(
        imgList.get("default"),
        document.querySelector("#image-container img")
      );
  }
};

const showSingleImg = async (figure, src, title, credits) => {
  if (title)
    document
      .querySelector("#slideshow figcaption")
      .appendChild(document.createTextNode(title));

  let img;
  if (src) {
    if (!imgList.has(src)) {
      img = await loadImg(src);
      imgList.set(src, img);
    } else img = imgList.get(src);
    document
      .querySelector("#image-container")
      .replaceChild(img, document.querySelector("#image-container img"));
  } else
    document
      .querySelector("#image-container img")
      .replaceChild(
        imgList.get("noSrc"),
        document.querySelector("#image-container img")
      );

  if (credits)
    document
      .querySelector("#slideshow cite")
      .appendChild(document.createTextNode(credits));
};

const createSlideShow = async (slideShowList) => {
  const { src, title = "", credits = "" } = slideShowList[0];
  resetSlideShowContent();
  document.querySelector(".modal").classList.add("show-modal");
  const figure = document.getElementById("slideshow");

  /*while (figure.firstChild) {
    figure.removeChild(figure.lastChild);
  }*/
  await showSingleImg(figure, src, title, credits);
};

document.querySelector(".modal").addEventListener("click", (e) => {
  if (e.target === document.querySelector("#slideshow")) closeModal();
});

document
  .querySelector(".close-modal-button")
  .addEventListener("click", closeModal);
