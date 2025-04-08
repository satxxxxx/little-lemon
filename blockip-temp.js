// public/blockip.js
(function() {
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (url.includes('192.168.1.35')) {
      console.log('Bloccata richiesta a:', url);
      return Promise.resolve(new Response('{}', {status: 200}));
    }
    return originalFetch(url, options);
  };
  
  console.log('IP blocker loaded');
})();