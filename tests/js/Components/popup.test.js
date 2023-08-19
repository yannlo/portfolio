import { default as Popup } from "../../../assets/js/Components/Popup.js";

describe('Popup behavior', () => {

    it('should be open', () => {
        document.body.innerHTML=`
        <button id="open-popup">Open</button>
        <div
            data-popup
            class="hidden"
            aria-hidden="true"
            role="dialog"
            aria-modal="false"
            data-btn-open="open-popup">
            <div data-popup-container>
                <p>Je suis le popup</p>
            </div>
        </div>
        `

        const popup = document.querySelector("div");

        new Popup(popup);

        document.querySelector("#open-popup").click();

        expect(Popup.ONCE_IS_OPEN).toBe(true);
        expect(popup).not.toHaveClass("hidden");
        expect(popup).toHaveClass("flex");
        expect(popup).toHaveAttribute("aria-hidden", "false");
        expect(popup).toHaveAttribute("aria-modal", "true");

    });

    it('should not be close when I click on the content', () => {
        document.body.innerHTML=`
        <button id="open-popup">Open</button>
        <div
            data-popup
            class="hidden"
            aria-hidden="true"
            role="dialog"
            aria-modal="false"
            data-btn-open="open-popup">
            <div data-popup-container>
                <p>Je suis le popup</p>
            </div>
        </div>
        `

        const popup = document.querySelector("div")
        Popup.ONCE_IS_OPEN = true
        new Popup(popup);

        document.querySelector("#open-popup").click();
        document.querySelector("div div").click();

        expect(popup).not.toHaveClass("hidden");
        expect(popup).toHaveAttribute("aria-hidden", "false");
        expect(popup).toHaveAttribute("aria-modal", "true");

    });

    it('should be close', () => {
        document.body.innerHTML=`
        <button id="open-popup">Open</button>
        <div
            data-popup
            class="flex"
            aria-hidden="false"
            role="dialog"
            aria-modal="true"
            data-btn-open="open-popup">
            <div data-popup-container>
                <p>Je suis le popup</p>
            </div>
        </div>
        `

        const popup = document.querySelector("div")
        Popup.ONCE_IS_OPEN = true
        Popup.PREV_FOCUSED = document.body

        new Popup(popup);

        popup.click();
        setTimeout(() => {
            expect(popup).toHaveClass("hidden");
        }, 300);
        expect(popup).toHaveAttribute("aria-hidden", "true");
        expect(popup).toHaveAttribute("aria-modal", "false");

    }); 

    it('should be close when close button is clicked', () => {
        document.body.innerHTML=`
        <button id="open-popup">Open</button>
        <div
            data-popup
            class="flex"
            aria-hidden="false"
            role="dialog"
            aria-modal="true"
            data-btn-open="open-popup"
            data-btn-close="close-btn">
            <div data-popup-container>
                <button id="close-btn">close btn</button>
                <p>Je suis le popup</p>
            </div>
        </div>
        `

        const popup = document.querySelector("div")
        const close = popup.querySelector("#close-btn");
        Popup.ONCE_IS_OPEN = true
        Popup.PREV_FOCUSED = document.body

        new Popup(popup);

        close.click();

        setTimeout(() => {
            expect(popup).toHaveClass("hidden");
        }, 300);
        expect(popup).toHaveAttribute("aria-hidden", "true");
        expect(popup).toHaveAttribute("aria-modal", "false");

    }); 
    
    it('should have the focus in when is open', () => {
        document.body.innerHTML=`
        <button id="open-popup">Open</button>
        <div
            data-popup
            class="flex"
            aria-hidden="false"
            role="dialog"
            aria-modal="true"
            data-focusables='button, a'
            data-btn-open="open-popup">
            <div data-popup-container>
                <p>Je suis le popup</p>
                <button>cta</button>
                <a href="#">cta</a>
            </div>
        </div>
        `

        const popup = document.querySelector("div");
        const event= new KeyboardEvent("keydown", {key: "Tab"})
        Popup.ONCE_IS_OPEN = true
        
        new Popup(popup);

        document.querySelector("#open-popup").click();
        expect(popup.querySelector("button")).toHaveFocus();

        window.dispatchEvent(event);
        expect(popup.querySelector("a")).toHaveFocus();

        window.dispatchEvent(event);
        expect(popup.querySelector("button")).toHaveFocus();

    });

    it('should have the close when is Esc is pressed', () => {
        document.body.innerHTML=`
        <button id="open-popup">Open</button>
        <div
            data-popup
            class="flex"
            aria-hidden="false"
            role="dialog"
            aria-modal="true"
            data-btn-open="open-popup">
            <div data-popup-container>
                <p>Je suis le popup</p>
            </div>
        </div>
        `

        const popup = document.querySelector("div");
        const event= new KeyboardEvent("keydown", {key: "Esc"})
        
        new Popup(popup);

        document.querySelector("#open-popup").click();

        window.dispatchEvent(event); 
        expect(Popup.ONCE_IS_OPEN).toBe(false);

    });
});
