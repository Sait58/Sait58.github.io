(() => {
  const select = document.getElementById('language');
  if (!select) return;
  const allowed = ['tr', 'de', 'en'];
  const saved = localStorage.getItem('latifece-language') || 'tr';
  select.value = allowed.includes(saved) ? saved : 'tr';

  function setTranslationCookie(language) {
    const value = language === 'tr' ? '' : '/tr/' + language;
    document.cookie = 'googtrans=' + value + ';path=/;SameSite=Lax';
  }

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'tr',
      includedLanguages: 'tr,de,en',
      autoDisplay: false
    }, 'google_translate_element');
  };

  select.addEventListener('change', () => {
    const language = allowed.includes(select.value) ? select.value : 'tr';
    localStorage.setItem('latifece-language', language);
    setTranslationCookie(language);
    window.location.reload();
  });

  if (select.value !== 'tr') {
    setTranslationCookie(select.value);
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.onerror = () => {
      select.setCustomValidity('Çeviri yüklenemedi / Translation unavailable');
      select.reportValidity();
    };
    document.head.appendChild(script);
  } else {
    setTranslationCookie('tr');
  }
})();
