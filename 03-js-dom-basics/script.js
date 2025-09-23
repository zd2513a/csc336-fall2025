document.addEventListener('DOMContentLoaded', () => {
  const termInput = document.getElementById('term-input');
  const defInput = document.getElementById('def-input');
  const addBtn = document.getElementById('add-btn');
  const themeBtn = document.getElementById('theme-btn');
  const cards = document.querySelector('#cards');
  const hint = document.getElementById('hint');

  addBtn.addEventListener('click', handleAddCard);
  themeBtn.addEventListener('click', toggleTheme);

  defInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAddCard();
  });

  makeCard('Boy', 'A male child.');

  setTimeout(() => {
    hint.style.color = 'blue';
    hint.style.fontWeight = '700';
  }, 400);

  function handleAddCard() {
    const term = termInput.value.trim();
    const def = defInput.value.trim();
    if (!term || !def) {
      [termInput, defInput].forEach(el => {
        if (!el.value.trim()) {
          el.style.borderColor = 'red';
        } else {
          el.style.borderColor = '#ccc';
        }
      });
      return;
    }
    makeCard(term, def);
    termInput.value = '';
    defInput.value = '';
    termInput.style.borderColor = '#ccc';
    defInput.style.borderColor = '#ccc';
    termInput.focus();
  }

  function makeCard(term, def) {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('tabindex', '0');

    const front = document.createElement('div');
    front.className = 'term';
    front.textContent = term;

    const back = document.createElement('div');
    back.className = 'def';
    back.textContent = def;
    back.style.display = 'none';

    card.appendChild(front);
    card.appendChild(back);

    let flipped = false;
    const flip = () => {
      flipped = !flipped;
      front.style.display = flipped ? 'none' : 'block';
      back.style.display  = flipped ? 'block' : 'none';
    };
    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });

    cards.prepend(card);
  }

  function toggleTheme() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
  }
});