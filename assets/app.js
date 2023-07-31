import './bootstrap.js';
import {getCookie, setCookie} from "./js/Utils/Cookie.js"
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

const theme = getCookie("theme");

const modeSelector = document.querySelectorAll("input[name='mode']")
if (theme === 'dark' || theme === null) {
    document.documentElement.classList.add('dark')
    modeSelector.forEach(i => {
        if (i.getAttribute("id") === "dark") {
            i.checked = true;
        }
    });
    if(theme === null){
        document.documentElement.classList.add('dark')
    }

  } else {
    document.documentElement.classList.remove('dark')
    modeSelector.forEach(i => {
        if (i.getAttribute("id") !== "dark") {
            i.checked = true;
        }
    });
  }
  
  modeSelector.forEach(i => i.addEventListener("change", () => {
    if (i.getAttribute("id") === "dark") {
        // Whenever the user explicitly chooses dark mode
        document.documentElement.classList.add('dark')
        setCookie("theme", "dark", 28);
        document.querySelectorAll("*[data-image-with-theme]").forEach(img => {
            if(img.hasAttribute("src")){
                img.setAttribute("src", img.getAttribute("src").replace("light", "dark"))
            }
            if(img.hasAttribute("href")){
                img.setAttribute("href", img.getAttribute("href").replace("light", "dark"))
            }
        })
        return;
    }
    // Whenever the user explicitly chooses light mode
    document.documentElement.classList.remove('dark')
        setCookie("theme", "light", 28);
        document.querySelectorAll("*[data-image-with-theme]").forEach(img => {
            if(img.hasAttribute("src")){
                img.setAttribute("src", img.getAttribute("src").replace("dark", "light"))
            }
            if(img.hasAttribute("href")){
                img.setAttribute("href", img.getAttribute("href").replace("dark", "light"))
            }
        })
  }))
  
  
  // Whenever the user explicitly chooses to respect the OS preference
  // localStorage.removeItem('theme')