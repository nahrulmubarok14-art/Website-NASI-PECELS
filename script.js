/* script.js - satu fungsi saja:
   menandai link menu yang sesuai dengan halaman yang sedang dibuka. */
const halaman = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("header nav a").forEach(function (a) {
  if (a.getAttribute("href") === halaman) {
    a.setAttribute("aria-current", "page");
  }
});
