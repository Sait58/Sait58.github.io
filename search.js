(() => {
  const input = document.getElementById('post-search');
  if (!input) return;
  const cards = [...document.querySelectorAll('.archive-grid .story-card')];
  const status = document.getElementById('search-status');
  const normalize = value => value.toLocaleLowerCase('tr').trim();
  input.addEventListener('input', () => {
    const query = normalize(input.value);
    let count = 0;
    for (const card of cards) {
      const matches = normalize(card.textContent).includes(query);
      card.hidden = !matches;
      if (matches) count++;
    }
    status.textContent = query ? count + ' yazı bulundu.' : '';
  });
})();
