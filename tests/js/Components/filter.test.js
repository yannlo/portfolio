describe('Filter behavior', () => {

    it("should add new filter params when the filter pformopup is submit", () => {
        document.body.innerHTML=`
        <div data-filter
            data--form="filter-form">
            <button id="popup-filter-btn" data-filter-btn>fitlter</button>
        </div>
        <div
            data-popup
            class="hidden"
            aria-hidden="true"
            role="dialog"
            aria-modal="false"
            data-btn="popup-filter-btn">
            <form
            id="filter-form" 
                data-popup-container 
                >
                <p>Je suis le popup</p>
            </form>
        </div>
        `
    })

    it("should not add the same filter params when the filter form is submit", () => {
        
    })

    it("should not delete  filter params when is clicked on it", () => {
        
    })
});
