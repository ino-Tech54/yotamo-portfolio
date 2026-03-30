document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after a short delay
    const loader = document.getElementById('loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Start typing effect once loader is gone
            startTypeWriter();
        }, 500);
    }, 1200);

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const profileText = "I am a dedicated hospitality and tourism professional with a strong foundation in industry principles and a passion for delivering exceptional guest experiences. Possessing a Certificate in Tourism and Hospitality Management, I am committed to continuous learning and seek to apply my skills in real-world scenarios. I have a proactive approach, problem-solving abilities, and a collaborative team spirit. I am eager to contribute to and grow within a dynamic hospitality environment.";
    
    let isTyping = false;

    function startTypeWriter() {
        if (isTyping) return;
        isTyping = true;
        const target = document.getElementById('typing-profile');
        target.innerHTML = '';
        let i = 0;
        const speed = 30; // ms

        function type() {
            if (i < profileText.length) {
                target.innerHTML += profileText.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                isTyping = false;
            }
        }
        type();
    }

    // Section Switching with Animation Overlay
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (this.classList.contains('active')) return;

            // Show transition overlay
            const overlay = document.createElement('div');
            overlay.className = 'section-transition';
            document.body.appendChild(overlay);
            
            // Animation for overlay
            setTimeout(() => {
                overlay.style.opacity = '1';
                
                setTimeout(() => {
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    // Switch Section
                    sections.forEach(section => {
                        section.classList.remove('active');
                        if (section.id === targetId) {
                            section.classList.add('active');
                        }
                    });

                    // If switching back to profile, restart typing
                    if (targetId === 'profile') {
                        startTypeWriter();
                    }

                    // Hide overlay
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.remove(), 300);

                    // Close mobile menu if open
                    if (typeof closeMobileMenu === 'function') {
                        closeMobileMenu();
                    }
                }, 400);
            }, 50);
        });
    });

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function toggleMobileMenu() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    }

    function closeMobileMenu() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileMenu);
    }

    // Certificate modal viewer
    const certificateButtons = Array.from(document.querySelectorAll('.certificate-button'));
    const modal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('certificate-modal-image');
    const modalCaption = document.getElementById('certificate-modal-caption');
    const closeTargets = document.querySelectorAll('[data-close="true"]');
    const prevButton = document.querySelector('[data-prev="true"]');
    const nextButton = document.querySelector('[data-next="true"]');
    let activeIndex = 0;

    function openModal(index) {
        if (!modal || !modalImage || !modalCaption) return;
        activeIndex = index;
        const img = certificateButtons[activeIndex].querySelector('img');
        modalImage.src = img.getAttribute('src');
        modalImage.alt = img.getAttribute('alt') || 'Certificate';
        modalCaption.textContent = certificateButtons[activeIndex].parentElement.querySelector('figcaption')?.textContent || '';
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        updateNavButtons();
        modalImage.focus?.();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateNavButtons() {
        if (!prevButton || !nextButton) return;
        prevButton.disabled = activeIndex === 0;
        nextButton.disabled = activeIndex === certificateButtons.length - 1;
    }

    function showNext() {
        if (activeIndex < certificateButtons.length - 1) {
            openModal(activeIndex + 1);
        }
    }

    function showPrev() {
        if (activeIndex > 0) {
            openModal(activeIndex - 1);
        }
    }

    certificateButtons.forEach((button, index) => {
        button.addEventListener('click', () => openModal(index));
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(index);
            }
        });
    });

    closeTargets.forEach(target => {
        target.addEventListener('click', closeModal);
    });

    if (prevButton) {
        prevButton.addEventListener('click', showPrev);
    }

    if (nextButton) {
        nextButton.addEventListener('click', showNext);
    }

    document.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains('open')) return;
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'ArrowRight') {
            showNext();
        }
        if (e.key === 'ArrowLeft') {
            showPrev();
        }
    });
});
