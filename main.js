const themeSwitch = document.getElementById("themeSwitch");

themeSwitch.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.style.setProperty("--background", "#ffffff");
    document.documentElement.style.setProperty("--fontcolor", "#1e1e1e");
    document.documentElement.style.setProperty(
      "--shadowcolor",
      "rgba(255, 255, 255, 0.2)"
    );
    document.documentElement.style.setProperty(
      "--whiteshadowcolor",
      "rgba(0, 0, 0, 0.2)"
    );
  } else {
    document.documentElement.style.setProperty("--background", "#1e1e1e");
    document.documentElement.style.setProperty("--fontcolor", "#ffffff");
    document.documentElement.style.setProperty(
      "--shadowcolor",
      "rgba(0, 0, 0, 0.2)"
    );
    document.documentElement.style.setProperty(
      "--whiteshadowcolor",
      "rgba(255, 255, 255, 0.2)"
    );
  }
});

const navs = document.querySelectorAll(".navs>li");
const topics = document.querySelectorAll(".topic");

navs.forEach((nav) => {
  nav.addEventListener("click", function () {
    topics.forEach((e) => {
      e.classList.remove("topicOpen");
    });
    nav.querySelector(".topic").classList.add("topicOpen");
  });
});

const navButt = document.querySelector(".navButton");
const nav = document.querySelector("nav");
navButt.addEventListener("click", function () {
  nav.classList.contains("navClosed")
    ? nav.classList.remove("navClosed")
    : nav.classList.add("navClosed");
})
