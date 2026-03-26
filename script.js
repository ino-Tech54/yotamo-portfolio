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
                }, 400);
            }, 50);
        });
    });
});
