const themeSwitch = document.getElementById("themeSwitch");

themeSwitch.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.style.setProperty("--background", "rgb(243, 243, 243)");
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
    document.documentElement.style.setProperty("--fontcolor", "rgb(243, 243, 243)");
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
const section = document.querySelector('section')
navButt.addEventListener("click", function () {
  if (nav.classList.contains("navClosed")) {
    nav.classList.remove("navClosed")
    section.style.paddingLeft = "200px";
  } else {
    nav.classList.add("navClosed");
    section.style.paddingLeft = "40px";
  }
})

const codes = document.querySelectorAll('.codeblock>.result')
codes.forEach(test => {
  var text = test.innerHTML.split(' ')
  var result = ""
  text.forEach(element => {
    if (element.startsWith('<') && element[1] != '/') {
      result += `&lt;<span class="tag">${element.substring(1)}</span> `
    } else if (element.startsWith('<') && element[1] == '/') {
      result += `&lt;/<span class="tag">${element.replace(/[<\/>]/g, '')}</span>&gt`
    } else if (element.includes('=')) {
      var parts = element.split('=');
      var firstPart = parts[0].trim();
      result += `<span class="attribute">${firstPart}</span>=`

      for (let i = 1; i < parts.length; i++) {
        const element = parts[i].replace(/[<\/>]/g, '').trim();
        if(i==parts.length-1){
          result += `<span class="value">${element}</span>`
        }else{
          result += `<span class="value">${element}=</span>`
        }
      }
      
      if (element[element.length - 1] == '>') {
        result += '>'
      } else {
        result += ' '
      }
    } else {
      result += `${element} `
    }
  })
  test.parentElement.querySelector(".htmlCode").innerHTML = result;
})

openSubCat = ()=>{
  document.querySelector('.subCat').classList.contains("subCatOpen")?
  document.querySelector('.subCat').classList.remove("subCatOpen"):
  document.querySelector('.subCat').classList.add("subCatOpen")
}
