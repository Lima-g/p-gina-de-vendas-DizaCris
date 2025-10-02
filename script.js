// Interação no botão CTA
document.querySelectorAll(".cta-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Botão clicado! 🚀");
  });
});

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


// Exemplo simples: ação no botão
document.querySelector(".btn-mudanca").addEventListener("click", (e) => {
  e.preventDefault();
  alert("🚀 Você clicou para aprender a fazer stories!");
});


// Exemplo simples de interação
document.querySelectorAll(".bonus-tags span").forEach(tag => {
  tag.addEventListener("click", () => {
    alert(`Você clicou em: ${tag.textContent}`);
  });
});

const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        if(content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            // Fecha todos
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});


