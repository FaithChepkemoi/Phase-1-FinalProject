document.addEventListener('DOMContentLoaded', function() {

    // Load tutorials
    fetch('http://localhost:5000/tutorials')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Check if data is loaded correctly
 
            // Load tutorials
            const tutorialList = document.getElementById('tutorial-list');
            data.forEach(tutorial => {
                const div = document.createElement('div');
                div.classList.add('tutorial-item');
                div.innerHTML = `<strong>${tutorial.title}</strong><br>Level: ${tutorial.level}`;
                
                // Add images
                tutorial.images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image; // Ensure this path is correct
                    img.alt = `${tutorial.title} Image`;
                    div.appendChild(img);
                });
                
                tutorialList.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching tutorials:', error));
 
    // Load sessions and populate dropdown
    fetch('http://localhost:5000/sessions')
        .then(response => response.json())
        .then(data => { 
            const sessionList = document.getElementById('session-list');
            const sessionSelect = document.getElementById('session-select');
            data.forEach(session => {
                const div = document.createElement('div');
                div.classList.add('session-item');
                div.innerHTML = `<strong>${session.session}</strong><br>Date: ${session.date}<br>Location: ${session.location}<br>Description: ${session.description}<br>Available Slots: ${session.slots}<br>Cost: ${session.cost}`;
                
                // Add images for sessions
                session.images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image; // Ensure this path is correct
                    img.alt = `${session.session} Image`;
                    div.appendChild(img);
                });
                
                sessionList.appendChild(div);
 
                // Populate booking dropdown with session options
                const option = document.createElement('option');
                option.value = session.session; // Use session name as value
                option.textContent = `${session.session} - ${session.date} - ${session.cost}`;
                sessionSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching sessions:', error));
 
    // Load projects for showcase
    fetch('http://localhost:5000/projects')
        .then(response => response.json())
        .then(data => { 
            const projectList = document.getElementById('project-list');
            data.forEach(project => {
                const div = document.createElement('div');
                div.classList.add('project-item');
                div.innerHTML = `<strong>${project.title}</strong><br>${project.description}`;
                
                // Add images for projects
                project.images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image; // Ensure this path is correct
                    img.alt = `${project.title} Image`;
                    div.appendChild(img);
                });
                
                projectList.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
 
    // Load testimonials
    fetch('http://localhost:5000/testimonials')
        .then(response => response.json())
        .then(data => { 
            const testimonialList = document.getElementById('testimonial-list');
            data.forEach(testimonial => {
                const div = document.createElement('div');
                div.classList.add('testimonial-item');
                div.innerHTML = `<strong>${testimonial.name}</strong>: ${testimonial.feedback}`;
                
                testimonialList.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching testimonials:', error));
 
    // Handle booking form submission
    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedSession = document.getElementById('session-select').value;
        const userName = this[1].value; // User name from the input field
 
        // Fetch current sessions to update slots
        fetch(`http://localhost:5000/sessions`)
            .then(response => response.json())
            .then(sessions => {
                const sessionToUpdate = sessions.find(session => session.session === selectedSession);
                
                if (sessionToUpdate && sessionToUpdate.slots > 0) {
                    // Reduce the number of slots by 1 and update the display
                    sessionToUpdate.slots -= 1;
 
                    // Update the displayed slots in the UI
                    document.querySelector(`#slots-${selectedSession}`).innerText = sessionToUpdate.slots;
 
                    // Display confirmation message
                    const confirmationMessage = `Thank you ${userName}! You have successfully booked the session "${selectedSession}".`;
                    document.getElementById('booking-confirmation').innerText = confirmationMessage;
 
                    // Optionally update slots in JSON server (this requires an additional PUT request)
                    fetch(`http://localhost:5000/sessions/${sessionToUpdate.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(sessionToUpdate)
                    });
                    
                } else {
                    alert("Sorry, no slots available for this session.");
                }
            })
            .catch(error => console.error('Error fetching sessions:', error));
 
        // Reset form fields
        this.reset();
    });
 
    // Handle contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert("Message sent! We will get back to you soon.");
    });
 
    // Handle newsletter signup
    document.getElementById('newsletter-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert("Subscribed! You'll receive updates soon.");
    });
 });
 