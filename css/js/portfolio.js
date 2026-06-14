document.addEventListener('DOMContentLoaded', () => {
    // 1. Load and apply About section values
    const aboutDesc = localStorage.getItem('portfolio_about_desc');
    if (aboutDesc !== null) {
        const descEl = document.getElementById('about-desc');
        if (descEl) descEl.textContent = aboutDesc;
    }

    const aboutValues = localStorage.getItem('portfolio_about_values');
    if (aboutValues !== null) {
        const valuesEl = document.getElementById('about-values');
        if (valuesEl) valuesEl.textContent = aboutValues;
    }

    // 2. Load skills list
    const skills = [];
    for (let i = 1; i <= 4; i++) {
        const skill = localStorage.getItem(`portfolio_skill_${i}`);
        if (skill !== null) {
            skills.push(skill);
        }
    }
    if (skills.length > 0) {
        const skillsEl = document.getElementById('about-skills');
        if (skillsEl) {
            skillsEl.innerHTML = '';
            skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsEl.appendChild(li);
            });
        }
    }

    // 3. Load projects
    const p1_title = localStorage.getItem('portfolio_p1_title');
    const p1_desc = localStorage.getItem('portfolio_p1_desc');

    const p2_title = localStorage.getItem('portfolio_p2_title');
    const p2_desc = localStorage.getItem('portfolio_p2_desc');

    const p3_title = localStorage.getItem('portfolio_p3_title');
    const p3_desc = localStorage.getItem('portfolio_p3_desc');

    // Lấy tất cả project-card có sẵn trong HTML
    const projectCards = document.querySelectorAll('.project-card');

    if (projectCards.length >= 3) {

        // Project 1
        if (p1_title !== null) {
            projectCards[0].querySelector('.project-info h3').textContent = p1_title;
        }

        if (p1_desc !== null) {
            projectCards[0].querySelector('.project-info p').textContent = p1_desc;
        }

        // Project 2
        if (p2_title !== null) {
            projectCards[1].querySelector('.project-info h3').textContent = p2_title;
        }

        if (p2_desc !== null) {
            projectCards[1].querySelector('.project-info p').textContent = p2_desc;
        }

        // Project 3
        if (p3_title !== null) {
            projectCards[2].querySelector('.project-info h3').textContent = p3_title;
        }

        if (p3_desc !== null) {
            projectCards[2].querySelector('.project-info p').textContent = p3_desc;
        }
    }
    // 4. Load contact information
    const contactDesc = localStorage.getItem('portfolio_contact_desc');
    if (contactDesc !== null) {
        const contactDescEl = document.getElementById('contact-desc');
        if (contactDescEl) contactDescEl.textContent = contactDesc;
    }

    const contactEmail = localStorage.getItem('portfolio_contact_email');
    if (contactEmail !== null) {
        const emailEl = document.getElementById('contact-email');
        if (emailEl) emailEl.textContent = contactEmail;
    }

    const contactPhone = localStorage.getItem('portfolio_contact_phone');
    if (contactPhone !== null) {
        const phoneEl = document.getElementById('contact-phone');
        if (phoneEl) phoneEl.textContent = contactPhone;
    }
});
