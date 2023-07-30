/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

const modeSelector = document.querySelectorAll("input[name='mode']")
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    modeSelector.forEach(i => {
        if (i.getAttribute("id") === "dark") {
            i.checked = true;
        }
    });
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
        localStorage.theme = 'dark';
        return;
    }
    // Whenever the user explicitly chooses light mode
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }))
  
  
  // Whenever the user explicitly chooses to respect the OS preference
  // localStorage.removeItem('theme')