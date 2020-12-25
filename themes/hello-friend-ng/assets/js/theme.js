// Toggle theme

const theme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
const isDark = theme === "dark";
var metaThemeColor = document.querySelector("meta[name=theme-color]");

const timelinseItems = document.getElementsByClassName("timeline-content")
const projectItems = document.getElementsByClassName("project-content")

if (theme !== null) {
  document.body.classList.toggle("dark-theme", isDark);
  isDark
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa");

  updateContentTheme(isDark);
} else {
  if (timelinseItems) {
    initContentTheme(timelinseItems);
  }
  if (projectItems) {
    initContentTheme(projectItems);
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  window.localStorage &&
    window.localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light"
    );
  document.body.classList.contains("dark-theme")
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa");

  updateContentClass(document.body.classList.contains("dark-theme"));
});


function updateContentClass(darkBG) {
  updateContentTheme(timelinseItems, darkBG);
  updateContentTheme(projectItems, darkBG);
}

function initContentTheme(contents) {
  for (let ind = 0; ind < contents.length; ind++) {
    const item = contents[ind];
    item.classList.remove("content-dark");
    item.classList.add("content-light");
  }
}

function updateContentTheme(contents, darkBG) {
  if(contents) {
    let goingToRemoveClass = "content-dark";
    let goingToAddClass =  "content-light";
    if (darkBG) {
      goingToRemoveClass = "content-light";
      goingToAddClass = "content-dark";
    }
    for (let ind = 0; ind < contents.length; ind++) {
      const item = contents[ind];
      item.classList.remove(goingToRemoveClass);
      item.classList.add(goingToAddClass);
    }
  }
}
