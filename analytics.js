(() => {
  const measurementId = 'G-1PQQB4JMQ6';
  const storageKey = 'analytics-consent';
  const banner = document.getElementById('analytics-consent');
  const settingsButton = document.getElementById('analytics-settings');
  let analyticsLoaded = false;

  function loadAnalytics() {
    if (analyticsLoaded) return;
    if (!['www.juanjacoubian.com', 'juanjacoubian.com'].includes(window.location.hostname)) return;
    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  function getChoice() {
    try { return localStorage.getItem(storageKey); } catch { return null; }
  }

  function saveChoice(choice) {
    try { localStorage.setItem(storageKey, choice); } catch { /* Storage can be disabled. */ }
    banner.hidden = true;
    if (choice === 'accepted') {
      loadAnalytics();
    } else if (analyticsLoaded) {
      window.location.reload();
    }
  }

  banner.addEventListener('click', (event) => {
    const button = event.target.closest('[data-analytics-choice]');
    if (button) saveChoice(button.dataset.analyticsChoice);
  });

  settingsButton.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('button').focus();
  });

  const choice = getChoice();
  if (choice === 'accepted') loadAnalytics();
  else if (choice !== 'declined') banner.hidden = false;
})();
