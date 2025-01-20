// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get all navbar links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Get all sections
    const sections = document.querySelectorAll('.section');
    
    // Function to hide all sections and show the clicked one
    function showSection(target) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(target).classList.add('active');
    }

    // Add click event listener to each navbar link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const target = link.getAttribute('data-target');
            showSection(target);
        });
    });

    // Show the home section by default when the page loads
    showSection('home');
});
