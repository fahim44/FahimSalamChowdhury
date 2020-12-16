// Toggle theme

const theme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
const isDark = theme === "dark";
var metaThemeColor = document.querySelector("meta[name=theme-color]");

const timelinseItems = document.getElementsByClassName("timeline-content")

if (theme !== null) {
  document.body.classList.toggle("dark-theme", isDark);
  isDark
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa");

  updateTimelineClass(isDark);
} else if (timelinseItems) {
  for (let ind = 0; ind < timelinseItems.length; ind++) {
    const item = timelinseItems[ind];
    item.classList.remove("timeline-content-dark");
    item.classList.add("timeline-content-light");
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

  updateTimelineClass(document.body.classList.contains("dark-theme"));
});


function updateTimelineClass(darkBG) {
  if(timelinseItems) {
    let goingToRemoveClass = "timeline-content-dark";
    let goingToAddClass =  "timeline-content-light";
    if (darkBG) {
      goingToRemoveClass = "timeline-content-light";
      goingToAddClass = "timeline-content-dark";
    }
    for (let ind = 0; ind < timelinseItems.length; ind++) {
      const item = timelinseItems[ind];
      item.classList.remove(goingToRemoveClass);
      item.classList.add(goingToAddClass);
    }
  }
}
