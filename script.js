// Carrossel de depoimentos
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let current = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });
}

prevBtn.addEventListener("click", () => {
  current = (current - 1 + testimonials.length) % testimonials.length;
  showTestimonial(current);
});

nextBtn.addEventListener("click", () => {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
});

// Inicia no primeiro depoimento
showTestimonial(current);


// Exemplo simples de interação
document.querySelectorAll(".bonus-tags span").forEach(tag => {
  tag.addEventListener("click", () => {
    alert(`Você clicou em: ${tag.textContent}`);
  });
});

// FAQ - Acordeão
document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".faq .accordion-button");

  accordionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isActive = content.classList.contains("active");

      // Fecha todos os outros
      document.querySelectorAll(".faq .accordion-content").forEach(c => {
        c.classList.remove("active");
        c.style.maxHeight = null;
      });

      // Se o clicado não estava ativo, abre ele
      if (!isActive) {
        content.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});





