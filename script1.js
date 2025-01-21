document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const targetSection = document.querySelector(sectionId);
        const targetLink = document.querySelector(`a[href="${sectionId}"]`);
        
        if (targetSection && targetLink) {
            targetSection.classList.add('active');
            targetLink.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href');
            showSection(sectionId);
            history.pushState(null, '', sectionId);
        });
    });

    window.addEventListener('popstate', () => {
        const sectionId = window.location.hash || '#home';
        showSection(sectionId);
    });
});