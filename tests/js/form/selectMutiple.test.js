import selectMutiple from "../../../assets/js/Form/selectMutiple";

beforeEach(() => {
    document.body.innerHTML = `
    <div data-select-multi data-select-multi-tag-template="select-multi-tag" class="flex flex-col items-center relative">
        <input data-select-multi-value type="hidden" value='["html"]'>
        <div class="w-full">
            <div data-select-multi-field class="bg-gray-light dark:bg-gray-dark  px-2 flex border-gray-200 rounded">
                <div class="flex flex-auto flex-wrap gap-1 py-1 items-center ">
                    <div class="flex-1">
                        <input type="search" data-select-multi-search class="bg-transparent px-2 py-1 min-w-[100px] appearance-none outline-none h-full w-full">
                    </div>
                </div>
                <div class="w-8 flex justify-center items-center">
                    <button data-select-multi-arrow-btn type="button" class="group cursor-pointer w-6 h-6 outline-none">
                        <svg class="w-6 h-6 fill-black dark:fill-white group-hover:fill-gray-dark/70 dark:group-hover:fill-gray/80" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.21209 7.02459C4.5782 6.65847 5.1718 6.65847 5.53791 7.02459L10.5 11.9867L15.4621 7.02459C15.8282 6.65847 16.4218 6.65847 16.7879 7.02459C17.154 7.3907 17.154 7.9843 16.7879 8.35041L11.1629 13.9754C10.7968 14.3415 10.2032 14.3415 9.83709 13.9754L4.21209 8.35041C3.84597 7.9843 3.84597 7.3907 4.21209 7.02459Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div data-select-multi-options class="hidden absolute flex-col shadow-md shadow-black/5 dark:shadow-white/5 border border-gray-light dark:border dark:border-gray-dark top-full mt-2 bg-white dark:bg-black z-40 w-full left-0 rounded max-h-52 overflow-y-auto">
            <div tabindex="0" class="cursor-pointer w-full border-gray-light dark:border-gray-dark border-b  hover:bg-red/40 dark:hover:bg-yellow/40">
                <input type="hidden" value="py">
                <div class="flex w-full items-center p-2 pl-2 pb-[7px] border-transparent border-l-2 relative hover:border-red dark:hover:border-yellow">*
                    <div class="w-full items-center flex">
                        <span class="mx-2 leading-6">Python</span>
                    </div>
                </div>
            </div>
            <div tabindex="0" class="cursor-pointer w-full border-gray-light dark:border-gray-dark border-b  hover:bg-red/40 dark:hover:bg-yellow/40">
                <input type="hidden" value="php">
                <div class="flex w-full items-center p-2 pl-2 pb-[7px] border-transparent border-l-2 relative hover:border-red dark:hover:border-yellow">
                    <div class="w-full items-center flex">
                        <span class="mx-2 leading-6">PHP</span>
                    </div>
                </div>
            </div>
            <div tabindex="0" class="cursor-pointer w-full border-gray-light dark:border-gray-dark border-b hover:bg-red/40 dark:hover:bg-yellow/40">
                <input type="hidden" value="html">
                <div class="flex w-full items-center p-2 pl-2 pb-[7px] border-transparent border-l-2 relative hover:border-red dark:hover:border-yellow">
                    <div class="w-full items-center flex">
                        <span class="mx-2 leading-6">HTML</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <template id="select-multi-tag">
        <div data-select-multi-tag class="h-fit w-fit rounded-full text-xs flex flex-row items-center gap-1 px-2 py-1 transition-colors duration-300 active:transition-none border border-black dark:border-white">
            <span>HTML</span>
            <button type='button' class="group">
                <svg class="w-4 h-4 fill-black dark:fill-white group-hover:fill-gray-dark/70 dark:group-hover:fill-gray/80" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.1843 24.0007L36.0906 15.0945C36.5133 14.6725 36.751 14.1 36.7515 13.5027C36.7521 12.9055 36.5153 12.3325 36.0934 11.9098C35.6714 11.4871 35.0989 11.2493 34.5016 11.2488C33.9044 11.2483 33.3314 11.485 32.9087 11.907L24.0024 20.8132L15.0962 11.907C14.6735 11.4843 14.1002 11.2468 13.5024 11.2468C12.9047 11.2468 12.3314 11.4843 11.9087 11.907C11.486 12.3297 11.2485 12.903 11.2485 13.5007C11.2485 14.0985 11.486 14.6718 11.9087 15.0945L20.8149 24.0007L11.9087 32.907C11.486 33.3297 11.2485 33.903 11.2485 34.5007C11.2485 35.0985 11.486 35.6718 11.9087 36.0945C12.3314 36.5172 12.9047 36.7546 13.5024 36.7546C14.1002 36.7546 14.6735 36.5172 15.0962 36.0945L24.0024 27.1882L32.9087 36.0945C33.3314 36.5172 33.9047 36.7546 34.5024 36.7546C35.1002 36.7546 35.6735 36.5172 36.0962 36.0945C36.5189 35.6718 36.7563 35.0985 36.7563 34.5007C36.7563 33.903 36.5189 33.3297 36.0962 32.907L27.1843 24.0007Z"></path>
                </svg>
            </button>
        </div>
    </template>`
})

describe('Select multiple mouse behavior', () => {
    describe('default', () => {
        it('should be init with the input value', () => {

            document.body.innerHTML = `
            <div
                data-select-multi
                data-select-multi-tag-template="select-multi-tag"
                class="flex flex-col items-center relative">
                <input data-select-multi-value type="hidden" value='["html"]'>
                <div class="w-full">
                    <div 
                        data-select-multi-field
                        class="bg-gray-light dark:bg-gray-dark  px-2 flex  border-gray-200 rounded">
                        <div class="flex flex-auto flex-wrap gap-1 py-1 items-center ">
                            <div class="flex-1">
                                <input type="search" data-select-multi-search class="bg-transparent px-2 py-1 min-w-[100px] appearance-none outline-none h-full w-full">
                            </div>
                        </div>
                        <div class="w-8 flex justify-center items-center">
                            <button 
                                data-select-multi-arrow-btn
                                type="button" class="group cursor-pointer w-6 h-6 outline-none">
                                <svg class="w-6 h-6 fill-black dark:fill-white group-hover:fill-gray-dark/70 dark:group-hover:fill-gray/80" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.21209 7.02459C4.5782 6.65847 5.1718 6.65847 5.53791 7.02459L10.5 11.9867L15.4621 7.02459C15.8282 6.65847 16.4218 6.65847 16.7879 7.02459C17.154 7.3907 17.154 7.9843 16.7879 8.35041L11.1629 13.9754C10.7968 14.3415 10.2032 14.3415 9.83709 13.9754L4.21209 8.35041C3.84597 7.9843 3.84597 7.3907 4.21209 7.02459Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div data-select-multi-options class="hidden absolute flex-col shadow-md shadow-black/5 dark:shadow-white/5 border border-gray-light dark:border dark:border-gray-dark top-full mt-2 bg-white dark:bg-black z-40 w-full left-0 rounded max-h-52 overflow-y-auto">
                <div tabindex="0" class="cursor-pointer w-full border-gray-light dark:border-gray-dark border-b  hover:bg-red/40 dark:hover:bg-yellow/40">
                    <input type="hidden" value="py">
                    <div class="flex w-full items-center p-2 pl-2 pb-[7px] border-transparent border-l-2 relative hover:border-red dark:hover:border-yellow">*
                        <div class="w-full items-center flex">
                            <span class="mx-2 leading-6">Python</span>
                        </div>
                    </div>
                </div>
                <div tabindex="0" class="cursor-pointer w-full border-gray-light dark:border-gray-dark border-b  hover:bg-red/40 dark:hover:bg-yellow/40">
                    <input type="hidden" value="php">
                    <div class="flex w-full items-center p-2 pl-2 pb-[7px] border-transparent border-l-2 relative hover:border-red dark:hover:border-yellow">
                        <div class="w-full items-center flex">
                            <span class="mx-2 leading-6">PHP</span>
                        </div>
                    </div>
                </div>
                <div tabindex="0" class="cursor-pointer w-full border-gray-light dark:border-gray-dark border-b hover:bg-red/40 dark:hover:bg-yellow/40">
                    <input type="hidden" value="html">
                    <div class="flex w-full items-center p-2 pl-2 pb-[7px] border-transparent border-l-2 relative border-red dark:border-yellow">
                        <div class="w-full items-center flex">
                            <span class="mx-2 leading-6">HTML</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <template id="select-multi-tag">
                <div
                    data-select-multi-tag
                    class="h-fit w-fit rounded-full text-xs flex flex-row items-center gap-1 px-2 py-1 transition-colors duration-300 active:transition-none border border-black dark:border-white">
                    <span>HTML</span>
                    <button type='button' class="group">
                        <svg class="w-4 h-4 fill-black dark:fill-white group-hover:fill-gray-dark/70 dark:group-hover:fill-gray/80" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.1843 24.0007L36.0906 15.0945C36.5133 14.6725 36.751 14.1 36.7515 13.5027C36.7521 12.9055 36.5153 12.3325 36.0934 11.9098C35.6714 11.4871 35.0989 11.2493 34.5016 11.2488C33.9044 11.2483 33.3314 11.485 32.9087 11.907L24.0024 20.8132L15.0962 11.907C14.6735 11.4843 14.1002 11.2468 13.5024 11.2468C12.9047 11.2468 12.3314 11.4843 11.9087 11.907C11.486 12.3297 11.2485 12.903 11.2485 13.5007C11.2485 14.0985 11.486 14.6718 11.9087 15.0945L20.8149 24.0007L11.9087 32.907C11.486 33.3297 11.2485 33.903 11.2485 34.5007C11.2485 35.0985 11.486 35.6718 11.9087 36.0945C12.3314 36.5172 12.9047 36.7546 13.5024 36.7546C14.1002 36.7546 14.6735 36.5172 15.0962 36.0945L24.0024 27.1882L32.9087 36.0945C33.3314 36.5172 33.9047 36.7546 34.5024 36.7546C35.1002 36.7546 35.6735 36.5172 36.0962 36.0945C36.5189 35.6718 36.7563 35.0985 36.7563 34.5007C36.7563 33.903 36.5189 33.3297 36.0962 32.907L27.1843 24.0007Z"></path>
                        </svg>
                    </button>
                </div>
            </template>
            `
            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const options = select.querySelector('[data-select-multi-options]')
            const valueList = select.querySelector('[data-select-multi-value]')

            new selectMutiple(select)

            field.click()

            expect(field.querySelector('[data-select-multi-tag="html"]')).toBeDefined()
            expect(options.lastElementChild.lastElementChild).toHaveClass("border-red", "dark:border-yellow")
            expect(options.lastElementChild.lastElementChild).not.toHaveClass("hover:border-red", "dark:hover:border-yellow")
            expect(valueList.value).toBe(JSON.stringify(["html"]))
        });
        it('should focus search when is clicked on it', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const search = select.querySelector('[data-select-multi-search]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            field.click()

            expect(field).toHaveClass('ring')
            expect(search).toHaveFocus()
            expect(options).not.toHaveClass('hidden')
            expect(options).toHaveClass('flex')
        });

    })

    describe('search', () => {

        it('should be open when is clicked', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const search = select.querySelector('[data-select-multi-search]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            search.click()

            expect(field).toHaveClass('ring')
            expect(search).toHaveFocus()
            expect(options).not.toHaveClass('hidden')
            expect(options).toHaveClass('flex')

        });

        // it('should close options when focus is lost', () => {

        //     const select = document.querySelector("[data-select-multi]")
        //     const field = select.querySelector('[data-select-multi-field]')
        //     const search = select.querySelector('[data-select-multi-search]')
        //     const options = select.querySelector('[data-select-multi-options]')

        //     new selectMutiple(select)

        //     search.click()
        //     search.blur()

        //     expect(field).toHaveClass('ring')
        //     expect(search).not.toHaveFocus()
        //     expect(options).toHaveClass('hidden')
        //     expect(options).not.toHaveClass('flex')

        // });

    });

    describe('arrow btn', () => {
        it('should be open when I click on', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const arrowBtn = select.querySelector('[data-select-multi-arrow-btn]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            arrowBtn.click()

            expect(field).toHaveClass('ring')
            expect(options.firstElementChild).toHaveFocus()
            expect(options).not.toHaveClass('hidden')
            expect(options).toHaveClass('flex')
        });

        it('should be close when I click on a second time', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const arrowBtn = select.querySelector('[data-select-multi-arrow-btn]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            arrowBtn.click()
            arrowBtn.click()

            expect(field).toHaveClass('ring')
            expect(arrowBtn).toHaveFocus()
            expect(options).toHaveClass('hidden')
            expect(options).not.toHaveClass('flex')
        });
    });

    describe('options', () => {
        it('should be add value when an option is clicked', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const arrowBtn = select.querySelector('[data-select-multi-arrow-btn]')
            const valueList = select.querySelector('[data-select-multi-value]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            arrowBtn.click()
            options.firstElementChild.click()

            expect(field).toHaveClass('ring')
            expect(options).not.toHaveClass('hidden')
            expect(options).toHaveClass('flex')
            expect(field.querySelector('[data-select-multi-tag="py"]')).toBeDefined()
            expect(options.firstElementChild).toHaveFocus()
            expect(options.firstElementChild.lastElementChild).toHaveClass("border-red", "dark:border-yellow")
            expect(options.firstElementChild.lastElementChild).not.toHaveClass("hover:border-red", "dark:hover:border-yellow")
            expect(valueList.value).toBe(JSON.stringify(["html", "py"]))
        });

        it('should be delete value when an option is clicked', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const arrowBtn = select.querySelector('[data-select-multi-arrow-btn]')
            const valueList = select.querySelector('[data-select-multi-value]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            arrowBtn.click()
            options.firstElementChild.click()
            options.firstElementChild.click()

            expect(field).toHaveClass('ring')
            expect(options).not.toHaveClass('hidden')
            expect(options).toHaveClass('flex')
            expect(options.firstElementChild).toHaveFocus()
            expect(options.firstElementChild.lastElementChild).not.toHaveClass("border-red", "dark:border-yellow")
            expect(options.firstElementChild.lastElementChild).toHaveClass("hover:border-red", "dark:hover:border-yellow")
            expect(valueList.value).toBe(JSON.stringify(["html"]))
            expect(field.querySelector('[data-select-multi-tag="py"]')).toBeNull()
        });

    });

    describe('tag', () => {
        it('should be focus when is clicked', () => {
            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const options = select.querySelector('[data-select-multi-options]')
            
            new selectMutiple(select)
            
            const tag = select.querySelector('[data-select-multi-tag]')
            tag.click()

            expect(field).toHaveClass('ring')
            expect(options).toHaveClass('hidden')
            expect(options).not.toHaveClass('flex')
            expect(tag.querySelector("button")).toHaveFocus()
        });

        it('should be delete when tag btn is clicked', () => {
            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const options = select.querySelector('[data-select-multi-options]')
            const valueList = select.querySelector('[data-select-multi-value]')
            
            new selectMutiple(select)
            const tag = select.querySelector('[data-select-multi-tag]')

            tag.querySelector("button").click()

            expect(options).toHaveClass('hidden')
            expect(options).not.toHaveClass('flex')
            expect(field.querySelector('[data-select-multi-tag="html"]')).toBeNull()
            expect(options.firstElementChild.lastElementChild).not.toHaveClass("border-red", "dark:border-yellow")
            expect(options.firstElementChild.lastElementChild).toHaveClass("hover:border-red", "dark:hover:border-yellow")
            expect(valueList.value).toBe(JSON.stringify([]))
            expect(field).toHaveClass('ring')
        });
    })

});


describe('Select multiple keyboard behavior', () => {

    describe('search', () => {

        it('should be reduce filter option when you write something', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const search = select.querySelector('[data-select-multi-search]')
            const options = select.querySelector('[data-select-multi-options]')
            const event= new KeyboardEvent("keydown", {key: "Esc"})
            new selectMutiple(select)

            search.click()
            window.dispatchEvent(new KeyboardEvent("keydown", {key: "p"})); 
            window.dispatchEvent(new KeyboardEvent("keydown", {key: "h"})); 

            expect(field).toHaveClass('ring')
            expect(search).toHaveFocus()
            expect(options).not.toHaveClass('hidden')
            expect(options).toHaveClass('flex')

        });

    });

    describe('arrow btn', () => {
        it('should be open when I click on', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const arrowBtn = select.querySelector('[data-select-multi-arrow-btn]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            arrowBtn.click()

            expect(field).toHaveClass('ring')
            expect(options.firstElementChild).toHaveFocus()
            expect(options).not.toHaveClass('hidden')
            expect(options).toHaveClass('flex')
        });

        it('should be close when I click on a second time', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const arrowBtn = select.querySelector('[data-select-multi-arrow-btn]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            arrowBtn.click()
            arrowBtn.click()

            expect(field).toHaveClass('ring')
            expect(arrowBtn).toHaveFocus()
            expect(options).toHaveClass('hidden')
            expect(options).not.toHaveClass('flex')
        });
    });

    describe('options', () => {
        it('should be add value when an option is clicked', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const arrowBtn = select.querySelector('[data-select-multi-arrow-btn]')
            const valueList = select.querySelector('[data-select-multi-value]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            arrowBtn.click()
            options.firstElementChild.click()

            expect(field).toHaveClass('ring')
            expect(options).not.toHaveClass('hidden')
            expect(options).toHaveClass('flex')
            expect(field.querySelector('[data-select-multi-tag="py"]')).toBeDefined()
            expect(options.firstElementChild).toHaveFocus()
            expect(options.firstElementChild.lastElementChild).toHaveClass("border-red", "dark:border-yellow")
            expect(options.firstElementChild.lastElementChild).not.toHaveClass("hover:border-red", "dark:hover:border-yellow")
            expect(valueList.value).toBe(JSON.stringify(["html", "py"]))
        });

        it('should be delete value when an option is clicked', () => {

            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const arrowBtn = select.querySelector('[data-select-multi-arrow-btn]')
            const valueList = select.querySelector('[data-select-multi-value]')
            const options = select.querySelector('[data-select-multi-options]')

            new selectMutiple(select)

            arrowBtn.click()
            options.firstElementChild.click()
            options.firstElementChild.click()

            expect(field).toHaveClass('ring')
            expect(options).not.toHaveClass('hidden')
            expect(options).toHaveClass('flex')
            expect(options.firstElementChild).toHaveFocus()
            expect(options.firstElementChild.lastElementChild).not.toHaveClass("border-red", "dark:border-yellow")
            expect(options.firstElementChild.lastElementChild).toHaveClass("hover:border-red", "dark:hover:border-yellow")
            expect(valueList.value).toBe(JSON.stringify(["html"]))
            expect(field.querySelector('[data-select-multi-tag="py"]')).toBeNull()
        });

    });

    describe('tag', () => {
        it('should be focus when is clicked', () => {
            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const options = select.querySelector('[data-select-multi-options]')
            
            new selectMutiple(select)
            
            const tag = select.querySelector('[data-select-multi-tag]')
            tag.click()

            expect(field).toHaveClass('ring')
            expect(options).toHaveClass('hidden')
            expect(options).not.toHaveClass('flex')
            expect(tag.querySelector("button")).toHaveFocus()
        });

        it('should be delete when tag btn is clicked', () => {
            const select = document.querySelector("[data-select-multi]")
            const field = select.querySelector('[data-select-multi-field]')
            const options = select.querySelector('[data-select-multi-options]')
            const valueList = select.querySelector('[data-select-multi-value]')
            
            new selectMutiple(select)
            const tag = select.querySelector('[data-select-multi-tag]')

            tag.querySelector("button").click()

            expect(options).toHaveClass('hidden')
            expect(options).not.toHaveClass('flex')
            expect(field.querySelector('[data-select-multi-tag="html"]')).toBeNull()
            expect(options.firstElementChild.lastElementChild).not.toHaveClass("border-red", "dark:border-yellow")
            expect(options.firstElementChild.lastElementChild).toHaveClass("hover:border-red", "dark:hover:border-yellow")
            expect(valueList.value).toBe(JSON.stringify([]))
            expect(field).toHaveClass('ring')
        });
    })

});

