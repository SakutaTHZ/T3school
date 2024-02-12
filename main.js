const themes = {
  light:{
    "background":"rgb(243, 243, 243)",
    "fontcolor":"#1e1e1e",
    "shadowcolor":"rgba(255, 255, 255, 0.2)",
    "whiteshadowcolor":"rgba(0, 0, 0, 0.2)",
    "codeblockcolor":"rgb(63, 63, 63)"
  },dark:{
    "background":"#1e1e1e",
    "fontcolor":"rgb(243, 243, 243)",
    "shadowcolor":"rgba(0, 0, 0, 0.2)",
    "whiteshadowcolor":"rgba(255, 255, 255, 0.2)",
    "codeblockcolor":"rgb(63, 63, 63)"
  },
}

const setTheme = ()=>{
  if(localStorage.getItem('theme')==null){
    localStorage.setItem('theme', 'light');
  }
  localStorage.getItem('theme')=='dark'?setThemeMode(themes.dark):setThemeMode(themes.light)
}
const setThemeMode = (mode)=>{
  document.documentElement.style.setProperty("--background", mode.background);
  document.documentElement.style.setProperty("--fontcolor", mode.fontcolor);
  document.documentElement.style.setProperty("--shadowcolor",mode.shadowcolor);
  document.documentElement.style.setProperty("--whiteshadowcolor",mode.whiteshadowcolor);
  document.documentElement.style.setProperty("--codeblockcolor",mode.codeblockcolor);

  localStorage.getItem('theme')=='dark'?
  document.querySelector('.lightswitch').classList.add("lightswitchOn"):
  document.querySelector('.lightswitch').classList.remove("lightswitchOn")
}

setTheme()

const themeSwitch = document.getElementById("themeSwitch");

// lightswitch
document.querySelector('.lightswitch').addEventListener('click',()=>{
  localStorage.getItem('theme')=='dark'?localStorage.setItem('theme', 'light'):localStorage.setItem('theme', 'dark')
  setTheme()
})

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
const section = document.querySelectorAll('section')
navButt.addEventListener("click", function () {
  if (nav.classList.contains("navClosed")) {
    nav.classList.remove("navClosed")
    setSectionPadding(section,"200px")
  } else {
    nav.classList.add("navClosed");
    setSectionPadding(section,"40px")
  }
})

setSectionPadding=(data,size)=> {
  data.forEach(element => {
    element.style.paddingLeft = size
  })
}

const codes = document.querySelectorAll('.codeblock>.result')
codes.forEach(test => {
  var text = test.innerHTML.split(' ')
  var result = ""
  text.forEach(element => {
    if (element.startsWith('<') && element[1] != '/') {
      result += `&lt;<span class="tag">${element.substring(1)}</span> `
    } else if (element.startsWith('<') && element[1] == '/') {
      result += `&lt;/<span class="tag">${element.replace(/[<\/]/g,'')}</span>`
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
      result += `${element}`
    }
  })
  test.parentElement.querySelector(".htmlCode").innerHTML = result;
})

const subCats = document.querySelectorAll('.subCat')
subCats.forEach(sub=>{
  sub.addEventListener('click',()=>{
    sub.classList.contains("subCatOpen")?
    sub.classList.remove("subCatOpen"):
    sub.classList.add("subCatOpen")
  })
})

const closeSubCats = ()=>{
  subCats.forEach(sub=>{
    sub.classList.add("subCatOpen")
  })
}

let directories ={
  "Links":{to:"linkSection"},
  "Lists":{to:"listSection"},
  "Tables":{to:"tableSection"},
  "Styles & Sematics":{to:"stylesSemanticsSection"},
  "Audio & Video":{to:"audioVideoSection"},
  "Forms & input":{to:"formsInputSection"}
}

const topicContents=document.querySelectorAll('.topic>a')
topicContents.forEach(data =>{
  data.addEventListener("click",()=>{
    document.querySelectorAll(`section`).forEach(element=>{
      element.classList.remove('currentTopic')
    })
    document.querySelector(`.${directories[data.innerText].to}`).classList.add('currentTopic')
    localStorage.setItem('currentPage', `.${directories[data.innerText].to}`);
    closeSubCats()
  })
})

const setPage = (page)=>{
  document.querySelectorAll(`section`).forEach(element=>{
    element.classList.remove('currentTopic')
  })
  document.querySelector(page).classList.add('currentTopic')
  closeSubCats()
}

window.addEventListener('load', function() {
  // Your code to be executed on page load
  if(localStorage.getItem('currentPage') != null){
    setPage(localStorage.getItem('currentPage'))
  }
});
