import { graduates } from './graduatesData.js';

function createFloatingElements() {
  const container = document.getElementById('floatingElements');
  const elementTypes = ['confetti', 'ribbon', 'diploma'];

  for (let i = 0; i < 25; i++) {
    const element = document.createElement('div');
    const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
    element.className = type;
    element.style.left = Math.random() * 100 + '%';
    element.style.top = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 6 + 's';
    container.appendChild(element);
  }
}

function populateGraduates(filteredGraduates = graduates) {
  const grid = document.getElementById('graduatesGrid');
  grid.innerHTML = '';

  filteredGraduates.forEach((graduate, index) => {
    const card = document.createElement('div');
    card.className = 'graduate-card';
    card.style.animationDelay = index * 0.1 + 's';

    const gradeText = {
      scientific: 'الفرع العلمي',
      literary: 'الفرع الأدبي',
    };

    card.innerHTML = `
                    <div class="graduate-photo">${graduate.name.charAt(0)}</div>
                    <div class="graduate-name">${graduate.name}</div>
                    <div class="graduate-gpa">${graduate.gpa}% - ${
      gradeText[graduate.grade]
    }</div>
                `;

    grid.appendChild(card);
  });
}

function searchGraduatesByName() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.graduate-card');

  cards.forEach((card) => {
    const name = card.querySelector('.graduate-name').textContent.toLowerCase();
    card.style.display = name.includes(input) ? 'block' : 'none';
  });
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  input.value = '';
  searchGraduatesByName();
  toggleClearButton();
}

function toggleClearButton() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  clearBtn.style.display = input.value.trim() ? 'block' : 'none';
}

function filterGraduates(grade) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach((btn) => btn.classList.remove('active'));
  event.target.classList.add('active');

  let filtered = graduates;
  if (grade !== 'all') {
    filtered = graduates.filter((graduate) => graduate.grade === grade);
  }

  populateGraduates(filtered);
}

function scrollToGraduates() {
  document.getElementById('graduatesSection').scrollIntoView({
    behavior: 'smooth',
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const scrollArrow = document.querySelector('.scroll-arrow');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  toggleClearButton();
  createFloatingElements();
  populateGraduates();
  observer.observe(document.getElementById('graduatesSection'));

  scrollArrow.addEventListener('click', () => {
    if (window.scrollY < window.innerHeight / 2) {
      document
        .getElementById('graduatesSection')
        .scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight / 2) {
      scrollArrow.classList.add('scroll-up');
      scrollIndicator.classList.add('scrolled');
    } else {
      scrollArrow.classList.remove('scroll-up');
      scrollIndicator.classList.remove('scrolled');
    }
  });
});

window.filterGraduates = filterGraduates;
window.searchGraduatesByName = searchGraduatesByName;
window.clearSearch = clearSearch;
window.toggleClearButton = toggleClearButton;
window.scrollToGraduates = scrollToGraduates;
