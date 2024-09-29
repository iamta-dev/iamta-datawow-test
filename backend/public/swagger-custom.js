document.addEventListener('DOMContentLoaded', function () {
  const swaggerUI = document.getElementById('swagger-ui');
  if (swaggerUI) {
    const button = document.createElement('button');
    button.innerText = '❤️Download Swagger JSON❤️';
    button.classList.add('swagger-download-btn');

    button.onclick = function () {
      const url = window.location.origin + '/static/swagger.json';
      window.location.href = url;
    };

    document.body.appendChild(button);
  }
});
