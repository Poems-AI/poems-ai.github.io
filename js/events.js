document.addEventListener('DOMContentLoaded', function() {
  fetch('events.json')
    .then(response => response.json())
    .then(data => {
      const eventsContainer = document.getElementById('events-container');
      data.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('w3-third', 'w3-container', 'w3-padding-16');

        const eventContent = `
          <div class="eventsContent">
            <div class="w3-half w3-container">
              <img src="${event.image}" alt="${event.title}" class="eventsLogo">
            </div>
            <div class="w3-half w3-container w3-center ">
              <a href="${event.link}" target="_blank"><p>${event.title}, ${event.date}</p></a>
            </div>
          </div>
        `;
        eventElement.innerHTML = eventContent;
        eventsContainer.appendChild(eventElement);
      });
    });
});
