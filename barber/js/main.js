/**
 * main.js
 * Contiene la lógica principal de JavaScript para el sitio de Barbería.
 * - Manejo del cambio de tema (claro/oscuro).
 * - Validación de formularios de Bootstrap 5.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA CAMBIAR TEMA (MODO OSCURO/CLARO) ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Determina el tema inicial basado en localStorage o la preferencia del sistema
        const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-bs-theme', storedTheme);
        updateIcon(storedTheme);

        // Evento para cambiar el tema al hacer clic
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

    /**
     * Actualiza el ícono del botón de tema.
     * @param {string} theme - El tema actual ('light' o 'dark').
     */
    function updateIcon(theme) {
       if (themeToggle) {
           const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.classList.remove('bi-moon-stars-fill');
                icon.classList.add('bi-sun-fill');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-stars-fill');
            }
       }
    }

    // --- LÓGICA PARA VALIDACIÓN DE FORMULARIO (BOOTSTRAP 5) ---
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        const dateInput = document.getElementById('bookingDate');
        
        // Establece la fecha mínima seleccionable como el día de hoy
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        bookingForm.addEventListener('submit', event => {
            // Si el formulario no es válido, previene el envío
            if (!bookingForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            // Agrega las clases de Bootstrap para mostrar los mensajes de validación
            bookingForm.classList.add('was-validated');
        }, false);
    }
});