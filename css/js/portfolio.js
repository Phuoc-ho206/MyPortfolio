/* ============================================================
   portfolio.js — Chạy trên index.html
   Đọc dữ liệu từ localStorage và cập nhật DOM
   ============================================================ */

(function () {
    /* ── Helpers ─────────────────────────────────────────────── */
    function setText(id, value) {
        const el = document.getElementById(id);
        if (el && value) el.textContent = value;
    }

    function getJSON(key) {
        try { return JSON.parse(localStorage.getItem(key)) || {}; }
        catch { return {}; }
    }

    /* ── About ───────────────────────────────────────────────── */
    const about = getJSON('portfolio_about');

    setText('about-desc', about.desc);
    setText('about-values', about.values);

    if (about.skills && about.skills.length) {
        const ul = document.getElementById('about-skills');
        if (ul) {
            ul.innerHTML = about.skills
                .filter(s => s.trim())
                .map(s => `<li>${s}</li>`)
                .join('');
        }
    }

    /* ── Projects ─────────────────────────────────────────────── */
    const projects = getJSON('portfolio_projects');

    if (projects.list && projects.list.length) {
        const grid = document.getElementById('project-grid');
        if (grid) {
            grid.innerHTML = projects.list
                .filter(p => p.title.trim())
                .map(p => `
                    <article class="project-card">
                        <h3>${p.title}</h3>
                        <p>${p.desc}</p>
                    </article>`)
                .join('');
        }
    }

    /* ── Contact ─────────────────────────────────────────────── */
    const contact = getJSON('portfolio_contact');

    setText('contact-desc', contact.desc);
    setText('contact-email', contact.email);
    setText('contact-phone', contact.phone);
})();