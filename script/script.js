document.addEventListener("DOMContentLoaded", function () {
    let boton1 = document.getElementById("boton1");
    let boton2 = document.getElementById("boton2");

    window.addEventListener('mouseout', function (event) {
        if (event.clientY <= 0) {
            alert('¡No te vayas 😥😥😥!');
        }
    });

    boton2.addEventListener("mouseenter", function () {
        boton1.style.width = (parseFloat(getComputedStyle(boton1).width) + 10) + 'px';
        boton1.style.height = (parseFloat(getComputedStyle(boton1).height) + 10) + 'px';
        let currentFontSize = parseFloat(getComputedStyle(boton1).fontSize);
        boton1.style.fontSize = (currentFontSize + 2) + 'px';
        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;

        let randomX = Math.random() * (viewportWidth - 100);
        let randomY = Math.random() * (viewportHeight - 50);

        boton2.style.position = "absolute";
        boton2.style.left = randomX + "px";
        boton2.style.top = randomY + "px";
    });

    boton1.addEventListener("click", function () {
        document.body.innerHTML = '';
        const form = document.createElement('form');
        form.setAttribute('id', 'valentineForm');
        form.setAttribute("method", "post");
        form.setAttribute("action", "https://formspree.io/f/xeqygard");

        const fields = [
            { type: 'text', label: 'Nombre', name: 'nombre', required: true },
            { type: 'date', label: 'Fecha', name: 'fecha', required: true },
            { type: 'textarea', label: 'Ideas', name: 'ideas', rows: 4, required: true },
            { type: 'textarea', label: 'Sugerencias', name: 'sugerencias', rows: 4 },
            { type: 'email', label: 'Correo Electrónico', name: 'correo', required: true },
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;

            let input;

            if (field.type === 'textarea') {
                input = document.createElement('textarea');
                input.setAttribute('rows', field.rows);
            } else {
                input = document.createElement('input');
                input.setAttribute('type', field.type);
            }

            input.setAttribute('id', field.name);
            input.setAttribute('name', field.name);

            if (field.required) {
                input.setAttribute('required', true);
            }

            form.appendChild(label);
            form.appendChild(input);
        });

        const placeSection = document.createElement('div');
        placeSection.innerHTML = `
            <label for="lugar">Lugar a Elegir:</label>
            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d50373.55108277543!2d-4.762348365514999!3d37.89895256225786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sRestaurantes!5e0!3m2!1ses!2ses!4v1707825699418!5m2!1ses!2ses" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        `;
        form.appendChild(placeSection);

        const submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', '💘Enviar Solicitud💘');
        form.appendChild(submitButton);

        document.body.appendChild(form);

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const action = event.target.getAttribute('action');
            const method = event.target.getAttribute('method') || 'POST';

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('¡Formulario enviado con éxito!');
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
                alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
            });
        });
    });
});