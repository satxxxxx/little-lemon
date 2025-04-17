
// Simulazione semplice di API per il progetto Capstone
// Puoi personalizzarlo per i tuoi test locali

/*window.fetch = (function (originalFetch) {
  return function (...args) {
    console.log("[Mocked fetch]", ...args);
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Risposta simulata dall'API" }),
    });
  };
})(window.fetch); // 👈 Qui lo passi tu stesso come parametro