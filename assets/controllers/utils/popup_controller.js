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

    static ONCE_IS_OPEN = false;
    static targets = ["main"];

    initialize(){
        const main = this.mainTarget;
        this.element.addEventListener("click", (e) => this.#closeModal(e))
        main.addEventListener("click", (e) => {
            e.stopPropagation()
        })

    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    #closeModal = (e) => {
        e.preventDefault();
        this.element.classList.add('hidden')
        this.element.classList.remove('flex')
        this.element.setAttribute('aria-hidden', true)
        this.element.setAttribute('aria-modal', false)
        this.ONCE_IS_OPEN = false;
    }


}
