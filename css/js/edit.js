/* ============================================================
   edit.js — Chạy trên edit.html
   1. Khi load: điền giá trị hiện tại vào form
   2. Khi submit: lưu vào localStorage → hiện toast
   ============================================================ */

(function () {
    /* ── Defaults (khớp với nội dung gốc trong index.html) ───── */
    const DEFAULTS = {
        about: {
            desc: 'Tôi là nhà phát triển web sử dụng HTML và CSS để tạo trải nghiệm người dùng trực quan, sạch sẽ và dễ tiếp cận.',
            skills: ['HTML5', 'CSS3', 'Responsive Design', 'Layout Flexbox / Grid'],
            values: 'Tôi tin vào thiết kế rõ ràng, nội dung dễ đọc và trang web hoạt động tốt trên mọi thiết bị.',
        },
        projects: {
            list: [
                { title: 'Portfolio cá nhân', desc: 'Trang giới thiệu cá nhân với thông tin, dự án và liên hệ.' },
                { title: 'Landing Page', desc: 'Thiết kế landing page thân thiện trên di động, tối ưu tốc độ.' },
                { title: 'Dashboard mẫu', desc: 'Giao diện quản trị đơn giản để quản lý nội dung và thống kê.' },
            ],
        },
        contact: {
            email: 'minhphuoc@example.com',
            phone: '+84 123 456 789',
            desc: 'Nếu bạn cần tạo website mới hoặc muốn trao đổi ý tưởng, hãy liên hệ tôi.',
        },
    };

    /* ── Helpers ─────────────────────────────────────────────── */
    function $(id) { return document.getElementById(id); }

    function getJSON(key, defaultVal) {
        try { return JSON.parse(localStorage.getItem(key)) || defaultVal; }
        catch { return defaultVal; }
    }

    function showToast(id) {
        const toast = $(id);
        if (!toast) return;
        toast.classList.remove('show');
        // force reflow để restart animation
        void toast.offsetWidth;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2600);
    }

    function setVal(id, value) {
        const el = $(id);
        if (el) el.value = value ?? '';
    }

    /* ── Active tab highlight ─────────────────────────────────── */
    const hash = location.hash || '#section-about';
    document.querySelectorAll('.tab-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === hash);
    });

    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    /* ════════════════════════════════════════════════════════════
       ABOUT
    ════════════════════════════════════════════════════════════ */
    const aboutData = getJSON('portfolio_about', DEFAULTS.about);

    setVal('f-about-desc', aboutData.desc);
    setVal('f-about-values', aboutData.values);
    (aboutData.skills || []).forEach((s, i) => setVal(`f-skill-${i + 1}`, s));

    $('form-about').addEventListener('submit', function (e) {
        e.preventDefault();

        const data = {
            desc: $('f-about-desc').value.trim(),
            values: $('f-about-values').value.trim(),
            skills: [1, 2, 3, 4].map(n => $(`f-skill-${n}`).value.trim()),
        };

        localStorage.setItem('portfolio_about', JSON.stringify(data));
        showToast('toast-about');
    });

    /* ════════════════════════════════════════════════════════════
       PROJECTS
    ════════════════════════════════════════════════════════════ */
    const projectData = getJSON('portfolio_projects', DEFAULTS.projects);

    (projectData.list || []).forEach((p, i) => {
        const n = i + 1;
        setVal(`f-p${n}-title`, p.title);
        setVal(`f-p${n}-desc`, p.desc);
    });

    $('form-projects').addEventListener('submit', function (e) {
        e.preventDefault();

        const data = {
            list: [1, 2, 3].map(n => ({
                title: $(`f-p${n}-title`).value.trim(),
                desc: $(`f-p${n}-desc`).value.trim(),
            })),
        };

        localStorage.setItem('portfolio_projects', JSON.stringify(data));
        showToast('toast-projects');
    });

    /* ════════════════════════════════════════════════════════════
       CONTACT
    ════════════════════════════════════════════════════════════ */
    const contactData = getJSON('portfolio_contact', DEFAULTS.contact);

    setVal('f-contact-email', contactData.email);
    setVal('f-contact-phone', contactData.phone);
    setVal('f-contact-desc', contactData.desc);

    $('form-contact').addEventListener('submit', function (e) {
        e.preventDefault();

        const data = {
            email: $('f-contact-email').value.trim(),
            phone: $('f-contact-phone').value.trim(),
            desc: $('f-contact-desc').value.trim(),
        };

        localStorage.setItem('portfolio_contact', JSON.stringify(data));
        showToast('toast-contact');
    });
})();