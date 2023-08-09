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
}
