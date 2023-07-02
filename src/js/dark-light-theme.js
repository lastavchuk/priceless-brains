const themeToggle = document.querySelector('input[name = switcher_checkbox]');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', handlerThemeChange);

function handlerThemeChange() {
    if (themeToggle.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        return;
    }
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}
