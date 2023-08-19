export default class Popup {

    /** @type {HTMLDivElement} */
    #popup;

    /** @type {HTMLDivElement} */
    #container;

    /** @type {HTMLButtonElement} */
    #btnOpen;

    /** @type {HTMLButtonElement} */
    #btnClose;


    /** @type {HTMLElement[]} */
    #focusables = [];

    #makeHidden

    /** @type {boolean} */
    static ONCE_IS_OPEN = false;

    /** @type {HTMLElement|null} */
    static PREV_FOCUSED = null;

    /**
     * 
     * @param {HTMLDivElement} elt 
     */
    constructor(elt) {
        this.#popup = elt
        this.#container = this.#popup.querySelector("[data-popup-container]")
        this.#btnOpen = document.getElementById(elt.dataset.btnOpen);
        if (this.#popup.dataset.focusables) {
            this.#focusables = Array.from(
                this.#popup
                    .querySelectorAll(
                        this.#popup.dataset.focusables
                    )
            )
        }
        
        if(elt.dataset.btnClose){
            this.#btnClose = document.getElementById(elt.dataset.btnClose);
            this.#btnClose.addEventListener("click", e => this.#close(e))
        }

        this.#btnOpen.addEventListener("click", e => this.#open(e));
        this.#popup.addEventListener("click", e => this.#close(e));

        this.#container
            .addEventListener("click", e => e.stopPropagation())

        window.addEventListener('keydown', (e) => {
            if (['Escape', 'Esc'].includes(e.key)) {
                this.#close(e);
            }
            if (e.key === 'Tab' && Popup.ONCE_IS_OPEN && this.#focusables.length > 0) {
                this.#focusIn(e)
            }
        })
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    #focusIn = (e) => {
        e.preventDefault();
        let index = this.#focusables
            .findIndex(
                elt => elt === this.#popup.querySelector(':focus')
            );

        index = !e.shiftKey ? ++index : --index

        if (index >= this.#focusables.length) {
            index = 0
        }

        if (index < 0) {
            index = this.#focusables.length - 1;
        }

        this.#focusables[index].focus()
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    #open = (e) => {
        e.preventDefault()
        if (self.ONCE_IS_OPEN) {
            return;
        }
        clearTimeout(this.#makeHidden);
        if (this.#focusables.length > 0) {
            Popup.PREV_FOCUSED = document.querySelector(':focus')
        }
        this.#popup.classList.replace('animate-close-popup', "animate-open-popup")
        this.#container.classList.replace('animate-close-popup-container', "animate-open-popup-container")
        this.#popup.classList.remove('hidden')
        this.#popup.classList.add('flex')
        this.#popup.setAttribute('aria-hidden', false)
        this.#popup.setAttribute('aria-modal', true)
        Popup.ONCE_IS_OPEN = true;

        if (this.#focusables.length > 0) {
            this.#focusables[0].focus();
        }
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    #close = (e) => {
        e.preventDefault()
        this.#makeHidden = setTimeout(() => {
            if (!Popup.ONCE_IS_OPEN) {
                this.#popup.classList.remove('flex')
                this.#popup.classList.add('hidden')
            }
        }, 300);
        this.#popup.classList.replace('animate-open-popup', "animate-close-popup")
        this.#container.classList.replace('animate-open-popup-container', "animate-close-popup-container")
        this.#popup.setAttribute('aria-hidden', true)
        this.#popup.setAttribute('aria-modal', false)
        Popup.ONCE_IS_OPEN = false;

        if (Popup.PREV_FOCUSED) {
            Popup.PREV_FOCUSED.focus();
        }
    }
}