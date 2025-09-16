// Modo claro/escuro
document.getElementById('toggle-theme').onclick = function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
};
// Rolagem suave para navegação
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Tradução PT/EN
const translations = {
    pt: {
        'header-title': 'Meu Portfólio',
        'nav-apresentacao': 'Apresentação',
        'nav-experiencia': 'Experiência',
        'nav-habilidades': 'Habilidades',
        'nav-projetos': 'Projetos',
        'nav-contato': 'Contato',
        'apresentacao-titulo': 'Olá, eu sou [Seu Nome]',
        'apresentacao-desc': 'Desenvolvedor Front-End apaixonado por criar experiências digitais incríveis. Bem-vindo ao meu portfólio!',
        'experiencia-titulo': 'Experiência Profissional',
        'exp1': '<strong>Empresa X</strong> - Desenvolvedor Front-End (2023 - Presente)',
        'exp2': '<strong>Empresa Y</strong> - Estagiário em Web (2022 - 2023)',
        'habilidades-titulo': 'Habilidades Técnicas',
        'skill-html': 'HTML5',
        'skill-css': 'CSS3',
        'skill-js': 'JavaScript',
        'skill-resp': 'Responsividade',
        'skill-git': 'Git & GitHub',
        'projetos-titulo': 'Projetos Realizados',
        'proj1': '<strong>Projeto 1</strong> - Descrição breve do projeto.',
        'proj2': '<strong>Projeto 2</strong> - Descrição breve do projeto.',
        'contato-titulo': 'Contato',
        'contato-email': 'Email: <a href="mailto:seuemail@exemplo.com">seuemail@exemplo.com</a>',
        'contato-linkedin': 'LinkedIn: <a href="https://linkedin.com/in/seuusuario" target="_blank">/seuusuario</a>',
        'cv-download': 'Baixar CV'
    },
    en: {
        'header-title': 'My Portfolio',
        'nav-apresentacao': 'About',
        'nav-experiencia': 'Experience',
        'nav-habilidades': 'Skills',
        'nav-projetos': 'Projects',
        'nav-contato': 'Contact',
        'apresentacao-titulo': 'Hi, I am [Your Name]',
        'apresentacao-desc': 'Front-End Developer passionate about creating amazing digital experiences. Welcome to my portfolio!',
        'experiencia-titulo': 'Professional Experience',
        'exp1': '<strong>Company X</strong> - Front-End Developer (2023 - Present)',
        'exp2': '<strong>Company Y</strong> - Web Intern (2022 - 2023)',
        'habilidades-titulo': 'Technical Skills',
        'skill-html': 'HTML5',
        'skill-css': 'CSS3',
        'skill-js': 'JavaScript',
        'skill-resp': 'Responsiveness',
        'skill-git': 'Git & GitHub',
        'projetos-titulo': 'Projects',
        'proj1': '<strong>Project 1</strong> - Brief project description.',
        'proj2': '<strong>Project 2</strong> - Brief project description.',
        'contato-titulo': 'Contact',
        'contato-email': 'Email: <a href="mailto:youremail@example.com">youremail@example.com</a>',
        'contato-linkedin': 'LinkedIn: <a href="https://linkedin.com/in/youruser" target="_blank">/youruser</a>',
        'cv-download': 'Download CV'
    }
};

let currentLang = 'pt';
const langBtn = document.getElementById('toggle-lang');
function setLang(lang) {
    document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === 'A' || el.tagName === 'STRONG' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'LI' || el.tagName === 'P') {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    langBtn.textContent = lang === 'pt' ? 'EN' : 'PT';
}
if (langBtn) {
    langBtn.onclick = function() {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        setLang(currentLang);
    };
}
// Inicializa com o idioma padrão
setLang(currentLang);

// Controle de tamanho de fonte
const fontStep = 2;
const minFont = 12;
const maxFont = 32;
let currentFont = 16;
const plusBtn = document.getElementById('font-plus');
const minusBtn = document.getElementById('font-minus');
function setFontSize(size) {
    currentFont = Math.max(minFont, Math.min(maxFont, size));
    document.body.style.fontSize = currentFont + 'px';
}
if (plusBtn) {
    plusBtn.onclick = function() {
        setFontSize(currentFont + fontStep);
    };
}
if (minusBtn) {
    minusBtn.onclick = function() {
        setFontSize(currentFont - fontStep);
    };
}
// Inicializa tamanho padrão
setFontSize(currentFont);

// Dados do currículo (carregar e renderizar)
let profileData = null;

async function loadProfile() {
    try {
        const res = await fetch('data/profile.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Falha ao carregar profile.json');
        profileData = await res.json();
        renderProfile();
    } catch (e) {
        console.error(e);
    }
}

function renderProfile() {
    if (!profileData) return;
    const lang = currentLang;
    const data = profileData[lang] || profileData['pt'];
    // Apresentação
    const nameEl = document.getElementById('profile-name');
    const titleEl = document.getElementById('profile-title');
    const summaryEl = document.getElementById('profile-summary');
    if (nameEl) nameEl.textContent = data.name || '';
    if (titleEl) titleEl.textContent = data.title || '';
    if (summaryEl) summaryEl.textContent = data.summary || '';
    // Experiência
    const expRoot = document.getElementById('experience-list');
    if (expRoot) {
        expRoot.innerHTML = '';
        (data.experience || []).forEach(exp => {
            const card = document.createElement('div');
            card.className = 'card exp-card';
            card.innerHTML = `
                <h3>${exp.role} - ${exp.company}</h3>
                <small>${exp.period || ''}</small>
                <ul>${(exp.details||[]).map(d=>`<li>${d}</li>`).join('')}</ul>
            `;
            expRoot.appendChild(card);
        });
    }
    // Habilidades
    const skillsUl = document.getElementById('skills-list');
    if (skillsUl) {
        skillsUl.innerHTML = '';
        (data.skills || []).forEach(s => {
            const li = document.createElement('li');
            li.textContent = s;
            skillsUl.appendChild(li);
        });
    }
    // Projetos
    const projUl = document.getElementById('projects-list');
    if (projUl) {
        projUl.innerHTML = '';
        (data.projects || []).forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = p.url ? `<a href="${p.url}" target="_blank"><strong>${p.name}</strong></a> - ${p.description}` : `<strong>${p.name}</strong> - ${p.description}`;
            projUl.appendChild(li);
        });
    }
    // Contato
    const emailA = document.getElementById('contact-email');
    const lnA = document.getElementById('contact-linkedin');
    if (emailA && data.contact?.email) {
        emailA.textContent = data.contact.email;
        emailA.href = `mailto:${data.contact.email}`;
    }
    if (lnA && data.contact?.linkedin) {
        lnA.textContent = new URL(data.contact.linkedin).pathname.replace('/in/','/');
        lnA.href = data.contact.linkedin;
    }
}

// Re-render quando trocar idioma
const origSetLang = setLang;
setLang = function(lang){
    origSetLang(lang);
    renderProfile();
}

// Iniciar
loadProfile();
