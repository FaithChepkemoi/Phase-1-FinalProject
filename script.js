document.addEventListener('DOMContentLoaded', function() {

    // Load data from db.json
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            // Load tutorials
            const tutorialList = document.getElementById('tutorial-list');
            data.tutorials.forEach(tutorial => {
                const div = document.createElement('div');
                div.classList.add('tutorial-item');
                div.innerHTML = `<strong>${tutorial.title}</strong><br>Level: ${tutorial.level}<br><a href="${tutorial.url}" target="_blank">View Tutorial</a>`;
                
                // Add images
                tutorial.images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `${tutorial.title} Image`;
                    div.appendChild(img);
                });
                
                tutorialList.appendChild(div);
            });
 
            // Load sessions
            const sessionList = document.getElementById('session-list');
            data.sessions.forEach(session => {
                const div = document.createElement('div');
                div.classList.add('session-item');
                div.innerHTML = `<strong>${session.session}</strong><br>Date: ${session.date}<br>Location: ${session.location}<br>Description: ${session.description}<br>Available Slots: ${session.slots}<br>Cost: ${session.cost}`;
                
                // Add images
                session.images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `${session.session} Image`;
                    div.appendChild(img);
                });
                
                sessionList.appendChild(div);
            });
 
            // Load projects
            const projectList = document.getElementById('project-list');
            data.projects.forEach(project => {
                const div = document.createElement('div');
                div.classList.add('project-item');
                div.innerHTML = `<strong>${project.title}</strong><br>Country: ${project.country}<br><a href="${project.url}" target="_blank">View Project</a>`;
                
                // Add images
                project.images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `${project.title} Image`;
                    div.appendChild(img);
                });
                
                projectList.appendChild(div);
            });
 
            // Load testimonials similarly...
            const testimonialList = document.getElementById('testimonial-list');
            data.testimonials.forEach(testimonial => {
                const div = document.createElement('div');
                div.classList.add('testimonial-item');
                div.innerHTML = `<strong>${testimonial.name}</strong><br>${testimonial.feedback}`;
                
                // Add images if available
                testimonial.images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `${testimonial.name} Image`;
                    div.appendChild(img);
                });
                
                testimonialList.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
 
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
 