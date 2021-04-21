/* https://stackoverflow.com/questions/46399223/async-await-in-image-loading */
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

const showSingleImg = async (figure, src, title, credits) => {
  if (title) {
    const figcaption = document.createElement("figcaption");
    figcaption.appendChild(document.createTextNode(title));
    figure.appendChild(figcaption);
  }
  let img;
  if (src) img = await loadImg(src);
  else {
    img = document.createElement("img");
    img.setAttribute("alt", "No se tiene ninguna imagen de esta laguna");
  }
  figure.appendChild(img);
  if (credits) {
    const cite = document.createElement("cite");
    cite.appendChild(document.createTextNode(credits));
    figure.appendChild(cite);
  }
};

const createSlideShow = async (imgList) => {
  const { src, title = "", credits = "" } = imgList[0];
  document.querySelector(".modal").classList.add("show-modal");
  const figure = document.getElementById("slideshow");
  while (figure.firstChild) {
    figure.removeChild(figure.lastChild);
  }
  await showSingleImg(figure, src, title, credits);
};

document.querySelector(".modal").addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target === document.querySelector("#slideshow")) closeModal();
});

document
  .querySelector(".close-modal-button")
  .addEventListener("click", closeModal);
