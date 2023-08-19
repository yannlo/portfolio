import { default as Footer } from "../../../assets/js/Layouts/Footer.js";
import { getCookie, setCookie } from "../../../assets/js/Utils/Cookie.js";

describe('Footer Behavior', () => {

    it('should set lang cookie', () => {
        document.body.innerHTML = `
        <footer
            id="footer">
            <a data-lang-link href="#">lang 1</a>
            <a data-lang-link href="#" lang="2">lang 2</a>
            <a data-lang-link href="#" lang="3">lang 3</a>
            <button data-lang-btn>lang btn</button>
        </footer>
        `

        const btn = document.querySelector("button[data-lang-btn]");

        setCookie("currentLocale", "1")

        new Footer(document.querySelector("footer#footer"));

        document.querySelector("a[lang='3']").click()

        expect(getCookie("currentLocale")).toBe("3")

    });

    it('should set theme cookie', () => {

        document.body.innerHTML = `
        <footer
        id="footer">
            <div 
                data-theme-toggle
                tabindex="0"
                aria-checked="false">
                <div>
                    <div></div>
                </div>
            </div>
        </footer>
        `
        const toggle = document.querySelector('[data-theme-toggle]');

        new Footer(document.querySelector("footer#footer"));

        toggle.click()
        expect(toggle).toHaveAttribute('aria-checked', "true")
        expect(getCookie("theme")).toBe("dark")

        toggle.click()
        expect(toggle).toHaveAttribute('aria-checked', "false")
        expect(getCookie("theme")).toBe("light")

    });

    it('should set page theme', () => {

        document.body.innerHTML = `
        <footer
        id="footer">
            <div 
                data-theme-toggle
                tabindex="0"
                aria-checked="false">
                <div>
                    <div></div>
                </div>
            </div>
        </footer>
        `
        const toggle = document.querySelector('[data-theme-toggle]');

        new Footer(document.querySelector("footer#footer"));

        toggle.click()
        expect(toggle).toHaveAttribute('aria-checked', "true")
        expect(document.documentElement).toHaveClass("dark")

        toggle.click()
        expect(toggle).toHaveAttribute('aria-checked', "false")
        expect(document.documentElement).not.toHaveClass("dark")

    });


    it('should image which depend on the them', () => {

        document.body.innerHTML = `
        <img data-image-with-theme src="light/img.png" />
        <footer
        id="footer">
            <div 
                data-theme-toggle
                tabindex="0"
                aria-checked="false">
                <div>
                    <div></div>
                </div>
            </div>
        </footer>
        `
        const toggle = document.querySelector('[data-theme-toggle]');
        const img = document.querySelector('[data-image-with-theme]');

        new Footer(document.querySelector("footer#footer"));

        toggle.click()
        expect(toggle).toHaveAttribute('aria-checked', "true")
        expect(img).toHaveAttribute('src', "dark/img.png")

        toggle.click()
        expect(toggle).toHaveAttribute('aria-checked', "false")
        expect(img).toHaveAttribute('src', "light/img.png")


    });


});
