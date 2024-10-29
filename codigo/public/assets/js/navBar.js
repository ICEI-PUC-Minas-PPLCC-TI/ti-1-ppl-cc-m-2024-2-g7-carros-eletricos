document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const closeMenuButton = document.getElementById('closeMenuButton');
    const offCanvasMenu = document.getElementById('offCanvasMenu');

    // Function to open the off-canvas menu
    function openMenu() {
        offCanvasMenu.classList.add('active');
    }

    // Function to close the off-canvas menu
    function closeMenu() {
        offCanvasMenu.classList.remove('active');
    }

    // Event listener to open the menu when the mobile menu button is clicked
    mobileMenuButton.addEventListener('click', openMenu);

    // Event listener to close the menu when the close button is clicked
    closeMenuButton.addEventListener('click', closeMenu);

    // Optional: Close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!offCanvasMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            closeMenu();
        }
    });
});