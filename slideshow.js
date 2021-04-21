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

const createSlideShow = async (imgList) => {
  document.querySelector(".modal").classList.add("show-modal");
  const figure = document.getElementById("slideshow");
  const img = await loadImg(imgList[0]);
  figure.removeChild(figure.getElementsByTagName("img")[0]);
  figure.appendChild(img);
  const cite = document.createElement("cite");
  cite.appendChild(document.createTextNode("Fotografía por Torrico"));
  figure.appendChild(cite);
};

document.querySelector(".modal").addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target === document.querySelector(".modal-content")) closeModal();
});

document
  .querySelector(".close-modal-button")
  .addEventListener("click", closeModal);
