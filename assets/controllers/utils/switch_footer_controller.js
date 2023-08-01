import { Controller } from '@hotwired/stimulus';
import {setCookie} from "../../js/Utils/Cookie.js"

/*
 * This is an example Stimulus controller!
 *
 * Any element with a data-controller="hello" attribute will cause
 * this controller to be executed. The name "hello" comes from the filename:
 * hello_controller.js -> "hello"
 *
 * Delete this file or adapt it for your use!
 */
export default class extends Controller {


    initialize(){
        this.element.addEventListener("click", this.clicked )

        this.element.addEventListener("focusin", () =>{
            window.addEventListener("keydown", this.focused )
        })

        this.element.addEventListener("focusout", () =>{
            window.removeEventListener("keydown", this.focused )
        })
    }


    /**
     * 
     * @param {KeyboardEvent} e 
     */
    focused = (e) => {
        if(e.key == "Enter" || e.key == " "){
            if(this.element.getAttribute("aria-checked") == "false"){
                this.element.setAttribute("aria-checked", "true");
                this.toggleOn();
                return;
            }
            this.element.setAttribute("aria-checked", "false");
            this.toggleOff();
        }
    }

    /**
     * 
     * @param {HTMLLabelElement} t 
     */
    clicked = ({currentTarget: t}) => {
        if(t.getAttribute("aria-checked") == "false"){
            t.setAttribute("aria-checked", "true");
            this.toggleOn();
            return;
        }
        t.setAttribute("aria-checked", "false");
        this.toggleOff();

    }

    toggleOn = () => {
        document.documentElement.classList.add('dark')
        setCookie("theme", "dark", 28);
        this.imageSetter("light", "dark")

    }

    toggleOff = ()=> {
        document.documentElement.classList.remove('dark')
        setCookie("theme", "light", 28);
        this.imageSetter("dark","light")
    }

    /**
     * 
     * @param {string} prev 
     * @param {string} actual 
     */
    imageSetter = (prev, actual) => {
        document.querySelectorAll("*[data-image-with-theme]").forEach(img => {
            if(img.hasAttribute("src")){
                img.setAttribute("src", img.getAttribute("src").replace(prev, actual))
            }
            if(img.hasAttribute("href")){
                img.setAttribute("href", img.getAttribute("href").replace(prev, actual))
            }
        })
    }

}
