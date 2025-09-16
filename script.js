document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded and running.");

    function adjustLayout() {
        const sidePanels = document.querySelectorAll('.side-panel');
        if (sidePanels.length === 0) return;

        const content = document.querySelector('.content');
        if (!content) return;
        
        const contentHeight = content.clientHeight;
        const panelWidth = content.clientWidth / 4;

        const gap = parseFloat(getComputedStyle(sidePanels[0]).gap) || 0;
        const boxHeight = (contentHeight - (4 * gap)) / 5;
        const requiredWidth = boxHeight * (16 / 9);

        sidePanels.forEach(panel => {
            if (requiredWidth > panelWidth) {
                panel.classList.add('vertical-aspect');
            } else {
                panel.classList.remove('vertical-aspect');
            }
        });
    }

    function positionDripOverlay() {
        const overlay = document.getElementById('drip-overlay');
        const fig = document.querySelector('.figure-container');
        if (!overlay || !fig) return;
        const rect = fig.getBoundingClientRect();
        const cutoffY = rect.top + rect.height * 0.85; // 85% down the figure
        const vh = window.innerHeight;
        const top = Math.max(0, Math.min(cutoffY, vh));
        overlay.style.top = `${top}px`;
        overlay.style.height = `${vh - top}px`;
    }

    // Initial adjustment
    adjustLayout();
    positionDripOverlay();

    // Adjust on window resize
    window.addEventListener('resize', () => {
        adjustLayout();
        positionDripOverlay();
    });

    window.addEventListener('scroll', positionDripOverlay);
});