import { Controller } from '@hotwired/stimulus';

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

    static targets = ["menu", "open", "close"];

    connect() {
        console.log("Header controller connected");
    }

    open(){
        const menu = this.menuTarget
        const btnOpen = this.openTarget
        const btnClose = this.closeTarget

        menu.classList.add("-translate-x-full");
        btnOpen.classList.add("hidden")
        btnClose.classList.remove("hidden")

        this.element.classList.remove("bg-white/90", "dark:bg-black/90")
        this.element.classList.add("bg-white", "dark:bg-black")
    }

    close(){
        const menu = this.menuTarget
        const btnOpen = this.openTarget
        const btnClose = this.closeTarget

        menu.classList.remove("-translate-x-full");
        btnOpen.classList.remove("hidden")
        btnClose.classList.add("hidden")
        
        this.element.classList.add("bg-white/90", "dark:bg-black/90")
        this.element.classList.remove("bg-white", "dark:bg-black")
    }
    

}
