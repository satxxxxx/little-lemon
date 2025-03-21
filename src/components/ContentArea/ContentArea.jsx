import React from 'react';

function ContentArea() {
  return (
    <>
      <section className="col-span-12">
        <h1>I nostri piatti speciali</h1>
      </section>

      <article className="col-span-4 special-item">
        <img src="../assets/images/greek-salad.jpg" alt="Insalata greca con feta, pomodori, cetrioli e olive" />
        <h2>Greek Salad</h2>
        <p>$12.99</p>
        <p>Insalata fresca con feta, pomodori, cetrioli e olive nere</p>
        <button>Ordina ora</button>
      </article>

      <article className="col-span-4 special-item">
        <img src="../assets/images/bruschetta.jpg" alt="Bruschetta con pomodori e basilico" />
        <h2>Bruschetta</h2>
        <p>$16.99</p>
        <p>Pane tostato con pomodori freschi, basilico e olio d'oliva</p>
        <button>Ordina ora</button>
      </article>

      <article className="col-span-4 special-item">
        <img src="../assets/images/lemon-dessert.jpg" alt="Dolce al limone" />
        <h2>Lemon Dessert</h2>
        <p>$8.50</p>
        <p>Dolce al limone fresco con glassa e vaniglia</p>
        <button>Ordina ora</button>
      </article>
    </>
  );
}

export default ContentArea;