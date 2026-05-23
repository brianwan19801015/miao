(function () {
  var backToTop = document.getElementById("backToTop");

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  window.addEventListener("scroll", function () {
    if (!backToTop) return;
    if (window.scrollY > 420) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });
})();
