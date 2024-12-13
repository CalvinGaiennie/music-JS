"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const bannerHeight = document.querySelector(".banner").offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - bannerHeight + 100,
        behavior: "smooth",
      });
    });
  });
});
