export default class {


    /**
     * @type {HTMLDivElement}
     */
    #select;

    /**
     * @type {HTMLDivElement}
     */
    #field;

    /**
     * @type {HTMLInputElement}
     */
    #search;

    /**
     * @type {HTMLInputElement}
     */
    #value;

    /**
     * @type {(string|number)[]}
     */
    #valueList;

    /**
     * @type {HTMLButtonElement}
     */
    #arrow;

    /**
     * @type {HTMLDivElement}
     */
    #options;

    /**
     * @type {HTMLTemplateElement}
     */
    #template;

    /**
     * @type {boolean}
     */
    isOpen = false;

    /**
     * @type {boolean}
     */
    isFocus = false;

    /**
     * 
     * @param {HTMLDivElement} element 
     */
    constructor(element) {
        this.#select = element
        this.#field = element.querySelector("[data-select-multi-field]")
        this.#search = element.querySelector("[data-select-multi-search]")
        this.#options = element.querySelector("[data-select-multi-options]")
        this.#arrow = element.querySelector('[data-select-multi-arrow-btn]')
        this.#template = document.getElementById(element.dataset.selectMultiTagTemplate)
        this.#value = element.querySelector('[data-select-multi-value]')
        this.#valueList = JSON.parse(this.#value.value);

        if (this.#value.value !== "") {
            this.#init();
        }
        // event
        this.#select.addEventListener("focusin", () => this.#onFocusInSelect())

        this.#field.addEventListener("click", (e) => this.#onClickField(e))

        window.addEventListener("click", () => {
            if (this.isFocus) {
                this.#field.classList.remove("ring")
                this.#close()
                this.isFocus = false
            }
        })

        this.#search.addEventListener("focus", () => this.#open())
        // this.#search.addEventListener("focusout", () => this.#close())

        this.#arrow.addEventListener('click', (e) => this.#onClickArrow(e))

        for (const elt of this.#options.children) {
            elt.addEventListener('click', (e) => this.#onClickOption(elt, e));
        }
    }

    #init() {
        for (const elt of this.#options.children) {
            const val = elt.querySelector("input").value
            if (this.#valueList.includes(val)) {
                const tag = this.#createTag(
                    val,
                    elt.querySelector("span").innerText,
                    elt
                )

                this.#field
                    .firstElementChild
                    .insertBefore(tag, this.#search.parentElement)

                elt.querySelector("div").classList.add("border-red", "dark:border-yellow")
                elt.querySelector("div").classList.remove("hover:border-red", "dark:hover:border-yellow")
            }
        }

    }

    // Select
    #onFocusInSelect = () => {
        this.isFocus = true
        this.#field.classList.add("ring")
    }

    // Field
    /**
     * 
     * @param {MouseEvent} e 
     * @returns 
     */
    #onClickField = (e) => {
        e.stopPropagation()
        this.isFocus = true
        this.#search.focus();
    }

    // Arrow
    /**
     * 
     * @param {MouseEvent} e 
     * @returns 
     */
    #onClickArrow = (e) => {
        e.stopPropagation()
        this.#field.classList.add("ring")
        if (this.isOpen) {
            this.#close()
            this.#arrow.focus()
            return
        }
        this.#open()
        this.#options.firstElementChild.focus()
    }

    // options list
    #open = () => {
        this.#options.classList.replace('hidden', "flex");
        this.#arrow.classList.add("rotate-180")
        this.isOpen = true
    }

    #close = () => {
        this.#options.classList.replace("flex", 'hidden');
        this.#arrow.classList.remove("rotate-180")
        this.isOpen = false
    }

    // Option
    /**
     * 
     * @param {HTMLElement} elt 
     * @param {MouseEvent} e 
     */
    #onClickOption = (elt, e) => {
        e.stopPropagation()
        const val = elt.querySelector("input").value

        if (!this.#valueList.includes(val)) {
            this.#selectOption(elt, val)
            return;
        }

        this.#unselectOption(elt, val)

    }

    /**
     * 
     * @param {HTMLElement} elt 
     * @param {string|number} val 
     */
    #selectOption = (elt, val) => {
        const tag = this.#createTag(
            val,
            elt.querySelector("span").innerText,
            elt
        )

        this.#field
            .firstElementChild
            .insertBefore(tag, this.#search.parentElement)

        elt.querySelector("div").classList.add("border-red", "dark:border-yellow")
        elt.querySelector("div").classList.remove("hover:border-red", "dark:hover:border-yellow")

        this.#valueList.push(val);
        this.#value.value = JSON.stringify(this.#valueList)
    }

/**
 * lign
 * @param {HTMLElement} elt 
 * @param {string|number} val 
 */
    #unselectOption = (elt, val) => {

        this.#field.querySelector('[data-select-multi-tag="' + val + '"]').remove()

        elt.querySelector("div").classList.remove("border-red", "dark:border-yellow")
        elt.querySelector("div").classList.add("hover:border-red", "dark:hover:border-yellow")

        this.#valueList.splice(this.#valueList.indexOf(val), 1)
        this.#value.value = JSON.stringify(this.#valueList)
    }


    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {HTMLElement} elt 
     * @returns 
     */
    #createTag = (id, name, elt) => {
        const newTag = this.#template.content.firstElementChild.cloneNode(true)
        newTag.querySelector("span").innerText = name
        newTag.dataset.selectMultiTag  = id

        newTag.addEventListener("click", (e) => {
            e.stopPropagation()
            e.currentTarget.querySelector("button").focus()
            this.#close()
        })

        newTag.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation()
            this.#unselectOption(elt, id)
            this.#onFocusInSelect()
        })

        return newTag;
    }
}
