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

    // 3. Load projects grid
    const p1_title = localStorage.getItem('portfolio_p1_title');
    const p1_desc = localStorage.getItem('portfolio_p1_desc');
    const p2_title = localStorage.getItem('portfolio_p2_title');
    const p2_desc = localStorage.getItem('portfolio_p2_desc');
    const p3_title = localStorage.getItem('portfolio_p3_title');
    const p3_desc = localStorage.getItem('portfolio_p3_desc');

    if (p1_title !== null || p1_desc !== null || p2_title !== null || p2_desc !== null || p3_title !== null || p3_desc !== null) {
        const projectGrid = document.getElementById('project-grid');
        if (projectGrid) {
            const projectsData = [
                {
                    title: p1_title !== null ? p1_title : "Portfolio cá nhân",
                    desc: p1_desc !== null ? p1_desc : "Trang giới thiệu cá nhân với thông tin, dự án và liên hệ."
                },
                {
                    title: p2_title !== null ? p2_title : "Landing Page",
                    desc: p2_desc !== null ? p2_desc : "Thiết kế landing page thân thiện trên di động, tối ưu tốc độ."
                },
                {
                    title: p3_title !== null ? p3_title : "Dashboard mẫu",
                    desc: p3_desc !== null ? p3_desc : "Giao diện quản trị đơn giản để quản lý nội dung và thống kê."
                }
            ];

            projectGrid.innerHTML = '';
            projectsData.forEach(proj => {
                const article = document.createElement('article');
                article.className = 'project-card';
                
                const h3 = document.createElement('h3');
                h3.textContent = proj.title;
                
                const p = document.createElement('p');
                p.textContent = proj.desc;
                
                article.appendChild(h3);
                article.appendChild(p);
                projectGrid.appendChild(article);
            });
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
