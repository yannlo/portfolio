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

    static values = {"idBtn": String}
    
    static ONCE_IS_OPEN = false;
    static targets = ["main"];

    initialize(){
        const main = this.mainTarget;
        const btn =  document.getElementById(this.idBtnValue);
        btn.addEventListener("click", (e)  => this.#openModal(e))
        this.element.addEventListener("click", (e) => this.#closeModal(e))
        main.addEventListener("click", (e) => {
            e.stopPropagation()
        })
    }

    connect(){
        
    }

    initBtn(){
        
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

        /**
     * 
     * @param {MouseEvent} e 
     */
        #openModal = (e) => {
            
            e.preventDefault()
            this.element.classList.remove('hidden')
            this.element.classList.add('flex')
            this.element.setAttribute('aria-hidden', false)
            this.element.setAttribute('aria-modal', true)
        }

}
