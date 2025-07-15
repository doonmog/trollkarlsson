
class ThemeToggle extends HTMLElement {
  constructor() {
    super();

    this.STORAGE_KEY = 'theme-preference';
    this.theme = this.getThemePreference();

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

    this.reflectPreference();
  }

  onclick(e) {
    e.preventDefault();
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.setPreference();
  }

  getThemePreference() {
    const storedPreference = localStorage.getItem(this.STORAGE_KEY);
    if (storedPreference) {
      return storedPreference;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setPreference() {
    localStorage.setItem(this.STORAGE_KEY, this.theme);
    this.reflectPreference();
  }

  reflectPreference() {
    document.firstElementChild.setAttribute('data-theme', this.theme);
    this.button.querySelector('.visually-hidden').textContent = `Switch to ${this.theme === 'light' ? 'dark' : 'light'} theme`;

    // You might want to add icons here
    const icon = this.button.querySelector('.theme-toggle__icon');
    if (this.theme === 'light') {
      icon.textContent = '☀️';
    } else {
      icon.textContent = '🌙';
    }
  }
}

customElements.define('theme-toggle', ThemeToggle);
