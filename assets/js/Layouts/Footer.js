import { setCookie } from "../Utils/Cookie";

export default class {

    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {

        element
            .querySelectorAll("a[data-lang-link]")
            ?.forEach(elt => {
                elt.addEventListener("click", ({ currentTarget }) => this.#setLang(currentTarget))
            }
            )

        element
            .querySelector("[data-theme-toggle]")
            ?.addEventListener("click", ({ currentTarget }) => this.#onToggleClick(currentTarget))
    }


    /**
     * 
     * @param {HTMLElement} e 
     */
    #setLang(e) {
        console.log(e.getAttribute("lang"),);
        if (e.hasAttribute("lang")) {
            setCookie(
                "currentLocale",
                e.getAttribute("lang"),
                28
            )
        }
    }

    /**
     * 
     * @param {HTMLLabelElement} t 
     */
    #onToggleClick = (t) => {
        if (t.getAttribute("aria-checked") == "false") {
            t.setAttribute("aria-checked", "true");
            this.#toggleOn();
            return;
        }
        t.setAttribute("aria-checked", "false");
        this.#toggleOff();

    }

    #toggleOn = () => {
        document.documentElement.classList.add('dark')
        setCookie("theme", "dark", 28);
        this.#imageSetter("light", "dark")

    }

    #toggleOff = () => {
        document.documentElement.classList.remove('dark')
        setCookie("theme", "light", 28);
        this.#imageSetter("dark", "light")
    }

    /**
     * 
     * @param {string} prev 
     * @param {string} actual 
     */
    #imageSetter = (prev, actual) => {
        document.querySelectorAll("*[data-image-with-theme]").forEach(img => {
            if (img.hasAttribute("src")) {
                img.setAttribute("src", img.getAttribute("src").replace(prev, actual))
            }
            if (img.hasAttribute("href")) {
                img.setAttribute("href", img.getAttribute("href").replace(prev, actual))
            }
        })
    }



}