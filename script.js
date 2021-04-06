const svg = document.getElementById("cocha");

document.addEventListener("scroll", function (e) {
  console.log(window.scrollY);
  /*
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }*/
});
