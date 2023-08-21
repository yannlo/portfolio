export default class {


    /**
     * @type {HTMLElement}
     */
    #header;

    /**
     * @type {HTMLElement}
     */
    #menu;

    /**
     * @type {HTMLButtonElement}
     */
    #btn;

    /**
     * @type {HTMLElement}
     */
    #closeIcon;

    /**
     * @type {HTMLElement}
     */
    #openIcon;

    /**
     * @type {HTMLElement[]}
     */
    #focusables = [];

    /** 
     * @type {boolean}
     */
    #isOpened = false;

    /** 
     * @type {number}
     */
    #prevScroll = 0;

    /**
     *  @type {HTMLElement|null} 
     */
    #prevFocused = null;

    /**
     * 
     * @param {HTMLElement} elt 
     */
    constructor(elt) {
        this.#header = elt
        this.#btn = elt.querySelector(elt.dataset.btn)
        this.#menu = elt.querySelector(elt.dataset.menu)
        this.#openIcon = elt.querySelector(elt.dataset.openIcon)
        this.#closeIcon = elt.querySelector(elt.dataset.closeIcon)
        this.#btn.addEventListener("click", e => this.#clicked(e))

        if (this.#header.dataset.focusables) {
            this.#focusables = Array.from(
                this.#header
                    .querySelectorAll(
                        this.#header.dataset.focusables
                    )
            )
        }

        window.addEventListener('keydown', (e) => {
            if (['Escape', 'Esc'].includes(e.key)) {
                this.#close(e);
            }
            if (e.key === 'Tab' && this.isOpened && this.#focusables.length > 0) {
                this.#focusIn(e)
            }
        })

        this.showAfterScroll()
        window.addEventListener("scroll", () => this.showAfterScroll() )
    }

    get isOpened() {
        return this.#isOpened
    }

    set isOpened(v) {
        this.#isOpened = v;
    }

    get prevFocused() {
        return this.#prevFocused
    }

    set prevFocused(v) {
        this.#prevFocused = v;
    }


    showAfterScroll = () => {
        let currentScrollPos = window.scrollY;
        if (this.#prevScroll < currentScrollPos && !this.#isOpened) {
          this.#header.classList.add("-translate-y-20");
        } else {
          this.#header.classList.remove("-translate-y-20");
        }
        this.#prevScroll = currentScrollPos;
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    #focusIn = (e) => {
        e.preventDefault();
        let index = this.#focusables
            .findIndex(
                elt => elt === this.#header.querySelector(':focus')
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
    #clicked = (e) => {
        e.preventDefault();
        if (!this.isOpened) {
            this.#open();
            return;
        }
        this.#close();
    }

    #open = () => {
        if (this.#focusables.length > 0) {
            this.prevFocused = document.querySelector(':focus')
        }

        this.#menu.classList.replace("invisible", "visible");
        this.#menu.classList.add();
        this.#menu.classList.add("-translate-x-full");
        this.#openIcon.classList.add("hidden")
        this.#closeIcon.classList.remove("hidden")
        this.#header.classList.remove("bg-white/90", "dark:bg-black/90")
        this.#header.classList.add("bg-white", "dark:bg-black")

        if (this.#focusables.length > 0) {
            this.#btn.focus();
        }
        this.isOpened = true;
    }


    #close() {
        this.#menu.classList.replace("visible", "invisible");
        this.#menu.classList.remove("-translate-x-full");
        this.#openIcon.classList.remove("hidden")
        this.#closeIcon.classList.add("hidden")
        this.#header.classList.add("bg-white/90", "dark:bg-black/90")
        this.#header.classList.remove("bg-white", "dark:bg-black")

        if (this.prevFocused) {
            this.#btn.focus();
        }

        this.isOpened = false

    }
}