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
            const tutorialList = document.getElementById('tutorial-list');
            data.forEach(tutorial => {
                const div = document.createElement('div');
                div.classList.add('tutorial-item');
                div.innerHTML = `
                    <strong>${tutorial.title}</strong><br>
                    Level: ${tutorial.level}<br>
                    Description:${tutorial.description} <br>
                    <a href="${tutorial.link}" target="_blank"></a>
                `;
                
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
 
                // Create session layout
                div.innerHTML = `
                    <div class="session-image">
                        <img src="${session.images[0]}" alt="${session.session} Image">
                    </div>
                    <div class="session-details">
                        <strong>${session.session}</strong><br>Date:<br>${session.date}<br>Location:<br>${session.location}<br>Description:<br>${session.description}<br>Available Slots:<span id='slots-${session.session}'> ${session.slots}</span><br>Cost:${session.cost}<br>
                        <a href="${session.link}" target="_blank"></a>
                    </div>`;
                
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
                div.innerHTML = `
                    <strong>${project.title}</strong><br>
                    ${project.description}<br>
                    <a href="${project.link}" target="_blank">View Project</a>`;
                
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
        const userName = this[1].value;
 
        // Fetch current sessions to update slots
        fetch(`http://localhost:5000/sessions`)
            .then(response => response.json())
            .then(sessions => {
                const sessionToUpdate = sessions.find(session => session.session === selectedSession);
                
                if (sessionToUpdate && sessionToUpdate.slots > 0) {
                    // Reduce the number of slots by one
                    sessionToUpdate.slots -= 1;
 
                    // Update the displayed slots in the UI
                    document.querySelector(`#slots-${selectedSession}`).innerText = sessionToUpdate.slots;
 
                    // Display confirmation message
                    const confirmationMessage = `Thank you ${userName}! You have successfully booked the session "${selectedSession}".`;
                    document.getElementById('booking-confirmation').innerText = confirmationMessage;
 
                    // Update slots in JSON server (this requires an additional PUT request)
                    fetch(`http://localhost:5000/sessions/${sessionToUpdate.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(sessionToUpdate)
                    });
                    
                } else if (sessionToUpdate) {
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
 