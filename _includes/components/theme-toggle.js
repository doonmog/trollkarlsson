
class ThemeToggle extends HTMLElement {
  constructor() {
    super();

    this.STORAGE_KEY = 'theme-preference';
    this.button = null;

    this.onclick = this.onclick.bind(this);
  }

  connectedCallback() {
    this.classList.add('theme-toggle');
    this.innerHTML = `
      <button type="button" class="theme-toggle__button">
        <span class="theme-toggle__icon" aria-hidden="true"></span>
        <span class="visually-hidden"></span>
      </button>
    `;

    this.button = this.querySelector('button');
    this.button.addEventListener('click', this.onclick);
    this.updateButtonLabelAndIcon();
  }

  onclick(e) {
    e.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(this.STORAGE_KEY, newTheme);
    this.updateButtonLabelAndIcon();
  }

  updateButtonLabelAndIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    this.button.querySelector('.visually-hidden').textContent = `Switch to ${nextTheme} theme`;
    const icon = this.button.querySelector('.theme-toggle__icon');
    icon.textContent = currentTheme === 'light' ? '☀️' : '🌙';
  }
}

customElements.define('theme-toggle', ThemeToggle);
