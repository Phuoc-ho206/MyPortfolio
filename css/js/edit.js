document.addEventListener('DOMContentLoaded', () => {
    // ─── 1. TAB SWITCHING SYSTEM ──────────────────────────────────
    const tabLinks = document.querySelectorAll('.tab-link');
    const sections = document.querySelectorAll('.edit-section');

    function showSection(sectionId) {
        sections.forEach(sec => {
            if (sec.id === sectionId) {
                sec.style.display = 'block';
            } else {
                sec.style.display = 'none';
            }
        });

        tabLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Tab click handlers
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
            
            // Update URL hash without jumping page
            history.pushState(null, null, `#${sectionId}`);
        });
    });

    // Handle initial tab from URL query params (e.g. EditContent.html?section=projects)
    const urlParams = new URLSearchParams(window.location.search);
    const initialSectionParam = urlParams.get('section');
    
    if (initialSectionParam) {
        const targetId = `section-${initialSectionParam}`;
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            showSection(targetId);
        } else {
            showSection('section-about');
        }
    } else {
        // Fallback to URL hash if present
        const hash = window.location.hash;
        if (hash && document.querySelector(hash)) {
            showSection(hash.substring(1));
        } else {
            showSection('section-about');
        }
    }


    // ─── 2. FORM STATE SYSTEM ─────────────────────────────────────
    // Form field elements
    const fields = {
        // About
        'portfolio_about_desc': document.getElementById('f-about-desc'),
        'portfolio_skill_1': document.getElementById('f-skill-1'),
        'portfolio_skill_2': document.getElementById('f-skill-2'),
        'portfolio_skill_3': document.getElementById('f-skill-3'),
        'portfolio_skill_4': document.getElementById('f-skill-4'),
        'portfolio_about_values': document.getElementById('f-about-values'),
        
        // Projects
        'portfolio_p1_title': document.getElementById('f-p1-title'),
        'portfolio_p1_desc': document.getElementById('f-p1-desc'),
        'portfolio_p2_title': document.getElementById('f-p2-title'),
        'portfolio_p2_desc': document.getElementById('f-p2-desc'),
        'portfolio_p3_title': document.getElementById('f-p3-title'),
        'portfolio_p3_desc': document.getElementById('f-p3-desc'),
        
        // Contact
        'portfolio_contact_email': document.getElementById('f-contact-email'),
        'portfolio_contact_phone': document.getElementById('f-contact-phone'),
        'portfolio_contact_desc': document.getElementById('f-contact-desc'),
    };

    // Defaults in case localStorage is empty
    const defaults = {
        'portfolio_about_desc': "Tôi đang là sinh viên năm 2 ngành công nghệ thông tin. Hiện đang quan tâm đến Database Design, Web Development và Software Engineering. Tôi thích học hỏi và khám phá các công nghệ mới để phát triển kỹ năng của mình.",
        'portfolio_skill_1': "HTML5",
        'portfolio_skill_2': "CSS3",
        'portfolio_skill_3': "Responsive Design",
        'portfolio_skill_4': "Layout Flexbox / Grid",
        'portfolio_about_values': "Tôi tin vào thiết kế rõ ràng, nội dung dễ đọc và trang web hoạt động tốt trên mọi thiết bị.",
        'portfolio_p1_title': "Portfolio cá nhân",
        'portfolio_p1_desc': "Trang giới thiệu cá nhân với thông tin, dự án và liên hệ.",
        'portfolio_p2_title': "Landing Page",
        'portfolio_p2_desc': "Thiết kế landing page thân thiện trên di động, tối ưu tốc độ.",
        'portfolio_p3_title': "Dashboard mẫu",
        'portfolio_p3_desc': "Giao diện quản trị đơn giản để quản lý nội dung và thống kê.",
        'portfolio_contact_email': "minhphuoc@example.com",
        'portfolio_contact_phone': "+84 123 456 789",
        'portfolio_contact_desc': "Nếu bạn cần tạo website mới hoặc muốn trao đổi ý tưởng, hãy liên hệ tôi."
    };

    // Prefill form controls on load
    Object.keys(fields).forEach(key => {
        const inputElement = fields[key];
        if (inputElement) {
            const savedValue = localStorage.getItem(key);
            inputElement.value = savedValue !== null ? savedValue : defaults[key];
        }
    });


    // ─── 3. FORM SUBMISSION & TOAST SYSTEM ─────────────────────────
    function showToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.remove('show');
            // Trigger a reflow to restart css keyframe animation
            void toast.offsetWidth;
            toast.classList.add('show');
            
            // Remove after animation completes (2.5 seconds)
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }
    }

    // Save About Form
    const formAbout = document.getElementById('form-about');
    if (formAbout) {
        formAbout.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('portfolio_about_desc', fields['portfolio_about_desc'].value);
            localStorage.setItem('portfolio_skill_1', fields['portfolio_skill_1'].value);
            localStorage.setItem('portfolio_skill_2', fields['portfolio_skill_2'].value);
            localStorage.setItem('portfolio_skill_3', fields['portfolio_skill_3'].value);
            localStorage.setItem('portfolio_skill_4', fields['portfolio_skill_4'].value);
            localStorage.setItem('portfolio_about_values', fields['portfolio_about_values'].value);
            
            showToast('toast-about');
        });
    }

    // Save Projects Form
    const formProjects = document.getElementById('form-projects');
    if (formProjects) {
        formProjects.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('portfolio_p1_title', fields['portfolio_p1_title'].value);
            localStorage.setItem('portfolio_p1_desc', fields['portfolio_p1_desc'].value);
            localStorage.setItem('portfolio_p2_title', fields['portfolio_p2_title'].value);
            localStorage.setItem('portfolio_p2_desc', fields['portfolio_p2_desc'].value);
            localStorage.setItem('portfolio_p3_title', fields['portfolio_p3_title'].value);
            localStorage.setItem('portfolio_p3_desc', fields['portfolio_p3_desc'].value);
            
            showToast('toast-projects');
        });
    }

    // Save Contact Form
    const formContact = document.getElementById('form-contact');
    if (formContact) {
        formContact.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('portfolio_contact_email', fields['portfolio_contact_email'].value);
            localStorage.setItem('portfolio_contact_phone', fields['portfolio_contact_phone'].value);
            localStorage.setItem('portfolio_contact_desc', fields['portfolio_contact_desc'].value);
            
            showToast('toast-contact');
        });
    }
});
