document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');
    const eventList = document.getElementById('event-list');

    // 1. Fetch and render existing events
    function fetchEvents() {
        fetch('/events')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                return response.json();
            })
            .then(data => {
                renderEvents(data);
            })
            .catch(error => console.error('Error:', error));
    }

    // Helper to dynamically insert events into the HTML
    function renderEvents(events) {
        eventList.innerHTML = ''; // Clear current display
        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
            `;
            eventList.appendChild(card);
        });
    }

    // 2. Post a new event to the server
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title-input').value;
        const date = document.getElementById('date-input').value;
        const location = document.getElementById('location-input').value;

        const payload = { title, date, location };

        fetch('/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save event');
            }
            return response.json();
        })
        .then(newEvent => {
            // Success! Refresh the list or push the new event directly to the UI
            fetchEvents();
            eventForm.reset(); // Clear form inputs
        })
        .catch(error => console.error('Error:', error));
    });

    // Initial load
    fetchEvents();
});