const burger = document.querySelector('.burger');
const menu= document.querySelector('.header-list');
const menuLinks = document.querySelectorAll('.header-link');

const navigationEntry = performance.getEntriesByType('navigation')[0];
const isReload = navigationEntry
    ? navigationEntry.type === 'reload'
    : performance.navigation?.type === 1;

if (isReload) {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.addEventListener('pageshow', () => {
        history.replaceState(history.state, '', window.location.pathname + window.location.search);
        setTimeout(() => {
            const root = document.documentElement;
            const scrollBehavior = root.style.scrollBehavior;
            root.style.scrollBehavior = 'auto';
            window.scrollTo(0, 0);
            root.scrollTop = 0;
            document.body.scrollTop = 0;
            root.style.scrollBehavior = scrollBehavior;
        }, 50);
    }, { once: true });
}

function closeMenu() {
    burger.classList.remove('burger--open');
    menu.classList.remove('header-list--open');
    document.body.classList.remove('no-scroll');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open navigation');
}

burger.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = burger.classList.toggle('burger--open');
    menu.classList.toggle('header-list--open', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
    const isMenuOpen = menu.classList.contains('header-list--open');
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnBurger = burger.contains(event.target);

    if (isMenuOpen && !isClickInsideMenu && !isClickOnBurger) {
        closeMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('header-list--open')) {
        closeMenu();
    }
});



// Форма обратной связи
const form = document.querySelector('.form');

if (form) {
    const phoneInput = form.querySelector('input[name="phone"]');
    const formStatus = form.querySelector('.form-status');

    // 1. Запрещаем ввод букв в поле телефона (оставляем цифры, +, -, скобки и пробелы)
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value.replace(/[^\d+\-\s()]/g, '');
        });
    }

    // 2. Обработка отправки формы
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        formStatus.textContent = 'Demo only: your details were not sent.';
    });
}
