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

    static targets = ["langPopup"];

    connect() {
        console.log("Footer controller connected");
    }

    setLang(e){
       if( e.currentTarget.hasAttribute("lang") ) {
            setCookie(
                "currentLocale",
                e.currentTarget.getAttribute("lang"),
                28
            )
        }
    }
    /**
     * 
     * @param {MouseEvent} e 
     */
    openModal = (e) => {
        const modal = this.langPopupTarget;
        e.preventDefault()
        modal.classList.remove('hidden')
        modal.classList.add('flex')
        modal.setAttribute('aria-hidden', false)
        modal.setAttribute('aria-modal', true)
    }
    

}
