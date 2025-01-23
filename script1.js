document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Get Started button handling
    const getStartedBtn = document.querySelector('.get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            const whatIsApiSection = document.querySelector('#what-is-api');
            if (whatIsApiSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = whatIsApiSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Expandable text box handling
    const expandableBoxes = document.querySelectorAll('.api-text-box.expandable');
    expandableBoxes.forEach(box => {
        box.addEventListener('click', () => {
            box.classList.toggle('expanded');
            
            // Get all paragraphs inside this box
            const paragraphs = box.querySelectorAll('.api-paragraph');
            
            // If expanding, trigger sequential animation
            if (box.classList.contains('expanded')) {
                paragraphs.forEach((para, index) => {
                    setTimeout(() => {
                        para.style.opacity = '1';
                        para.style.transform = 'translateY(0)';
                    }, index * 200); // 200ms delay between each paragraph
                });
            } else {
                // If collapsing, reset styles
                paragraphs.forEach(para => {
                    para.style.opacity = '0';
                    para.style.transform = 'translateY(20px)';
                });
            }
        });
    });

    // Grid boxes and arrows animation
    const gridBoxes = document.querySelectorAll('.grid-box');
    const arrows = document.querySelectorAll('.arrow');
    
    // Initially hide all grid boxes and arrows
    gridBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
    });
    
    arrows.forEach(arrow => {
        arrow.style.opacity = '0';
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate grid boxes and arrows
    function animateGridItems() {
        const gridContainer = document.querySelector('.grid-boxes');
        if (gridContainer && isInViewport(gridContainer)) {
            gridBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';
                    
                    // Animate corresponding arrow (if it exists)
                    if (arrows[index]) {
                        setTimeout(() => {
                            arrows[index].style.opacity = '1';
                        }, 200); // Slight delay after box appears
                    }
                }, index * 500); // 500ms delay between each box
            });
            
            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', animateGridItems);
        }
    }

    // Add scroll listener for grid animations
    window.addEventListener('scroll', animateGridItems);
    // Also check on initial load
    animateGridItems();

    // Scroll spy for navigation highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('div[id]');
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - navHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for all hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate positions and update UI if needed
            animateGridItems();
        }, 250);
    });
});