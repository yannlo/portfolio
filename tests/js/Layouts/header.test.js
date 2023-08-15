const { default: Header } = require("../../../assets/js/Layouts/Header");

describe('Header layout', () => {
    
    it('should be closed by default', () => {
    
        document.body.innerHTML = `<header
            id="header"
            data-menu="#header-menu"
            data-btn="#header-btn"
            data-open-icon="#open-icon"
            data-close-icon="#close-icon"> 
            <button id="header-btn" data-is-open="false">
                <svg id="open-icon"></svg>
                <svg id="close-icon" class="hidden"></svg>
            </button>
            <nav id="header-menu"></nav>
        </header>`
    
        const header = document.getElementById("header");
        const menu = header.querySelector(header.dataset.menu);
        const btn = header.querySelector(header.dataset.btn);
        const openIcon = header.querySelector(header.dataset.openIcon);
        const closeIcon = header.querySelector(header.dataset.closeIcon);
    
        const H = new Header(header);

        expect(H.isOpened).toBe(false);
        expect(menu).not.toHaveClass('-translate-x-full');
        expect(openIcon).not.toHaveClass('hidden');
        expect(closeIcon).toHaveClass('hidden');
    });

    it('should be opened by click on button', () => {
    
        document.body.innerHTML = `<header
            id="header"
            data-menu="#header-menu"
            data-btn="#header-btn"
            data-open-icon="#open-icon"
            data-close-icon="#close-icon"> 
            <button id="header-btn" data-is-open="false">
                <svg id="open-icon"></svg>
                <svg id="close-icon" class="hidden"></svg>
            </button>
            <nav id="header-menu"></nav>
        </header>`
    
        const header = document.getElementById("header");
        const menu = header.querySelector(header.dataset.menu);
        const btn = header.querySelector(header.dataset.btn);
        const openIcon = header.querySelector(header.dataset.openIcon);
        const closeIcon = header.querySelector(header.dataset.closeIcon);
    
        const H = new Header(header);

        btn.click();

        expect(H.isOpened).toBe(true);
        expect(menu).toHaveClass("-translate-x-full");
        expect(openIcon).toHaveClass('hidden');
        expect(closeIcon).not.toHaveClass('hidden');
    });

    it('should be close by a second click on button', () => {
    
        document.body.innerHTML = `<header
            class="-translate-x-full"
            id="header"
            data-menu="#header-menu"
            data-btn="#header-btn"
            data-open-icon="#open-icon"
            data-close-icon="#close-icon"> 
            <button id="header-btn" data-is-open="open">
                <svg id="open-icon" class="hidden"></svg>
                <svg id="close-icon"></svg>
            </button>
            <nav id="header-menu"></nav>
        </header>`
    
        const header = document.getElementById("header");
        const menu = header.querySelector(header.dataset.menu);
        const btn = header.querySelector(header.dataset.btn);
        const openIcon = header.querySelector(header.dataset.openIcon);
        const closeIcon = header.querySelector(header.dataset.closeIcon);
    
        new Header(header);

        const H = new Header(header);

        btn.click();
        expect(H.isOpened).toBe(true);

        btn.click();
        expect(H.isOpened).toBe(false);
        expect(menu).not.toHaveClass("-translate-x-full");
        expect(openIcon).not.toHaveClass('hidden');
        expect(closeIcon).toHaveClass('hidden');
    });

    it('should keep the focus in', () => {
    
        document.body.innerHTML = `<header
            id="header"
            data-menu="#header-menu"
            data-btn="#header-btn"
            data-open-icon="#open-icon"
            data-focusables='a, button'
            data-close-icon="#close-icon"> 
            <button id="header-btn" data-is-open="false">
                <svg id="open-icon"></svg>
                <svg id="close-icon" class="hidden"></svg>
            </button>
            <nav id="header-menu">  
                <a href="#" id="first-link">LINK 1</a>
                <a href="#" id="second-link">LINK 2</a>
            </nav>
        </header>`
    
        const header = document.getElementById("header");
        const btn = header.querySelector(header.dataset.btn);
        const event= new KeyboardEvent("keydown", {key: "Tab"})
    
        new Header(header);

        btn.click()
        expect(btn).toHaveFocus();
        
        window.dispatchEvent(event);
        expect(header.querySelector("a#first-link")).toHaveFocus();
        
        window.dispatchEvent(event);
        expect(header.querySelector("a#second-link")).toHaveFocus();
        
        window.dispatchEvent(event);
        expect(btn).toHaveFocus();
    });

    it('should be close when Esc is pressed', () => {
    
        document.body.innerHTML = `<header
            id="header"
            data-menu="#header-menu"
            data-btn="#header-btn"
            data-open-icon="#open-icon"
            data-focusables='a, button'
            data-close-icon="#close-icon"> 
            <button id="header-btn" data-is-open="false">
                <svg id="open-icon"></svg>
                <svg id="close-icon" class="hidden"></svg>
            </button>
            <nav id="header-menu">
                <a href="#" id="first-link">LINK 1</a>
                <a href="#" id="second-link">LINK 2</a>
            </nav>
        </header>`
    
        const header = document.getElementById("header");
        const btn = header.querySelector(header.dataset.btn);
        const event= new KeyboardEvent("keydown", {key: "Esc"})
    
        const H = new Header(header);

        btn.click()
        expect(btn).toHaveFocus();
        
        window.dispatchEvent(event);
        expect(H.isOpened).toBe(false);
    });
});



