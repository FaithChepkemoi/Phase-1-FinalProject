document.addEventListener('DOMContentLoaded', function() {

    //Load Tutorials
    fetch('db.json')
     .then(Response => Response.json())
     .then (data=> {
        const TutorialList = document.getElementById('tutorial-list');
        data.tutorials.forEach( tutorial =>{
            const div =document.createElement('div');
            div.classList.add('tutorial-item');
            div.innerHTML=` <strong>${tutorial.title}</strong> 
             <br>Level:${tutorial.level}<br><a href="${tutorial.url}" target="_blank">View Tutorial</a>`;
             tutorialList.apendChild(div);
        });

        //Load Sessions
          const sessionList= document.getElementById('session-list');
          data.sessions.forEach (session=>{
            const div= document.createElement('div');
            div.classList.add('session-item');
            div.innerHTML=`<strong> ${session.session} </strong> <br> Date:${session.date} <br> Location: ${session.location} <br> Description: ${session.description}  <br> Availbale Slots: ${session.slots} <br>
                 Cost: ${session.cost} <hr>`;
                 sessionList.appendChild('div');

});
        //Load Projects
        const projectList=document.getElementById('project-list');
        data.projects.forEach(project=>{
            const div = document.createElement('div');
            div.classList.add('project-item');
            div.innerHTML=`<strong> ${project.title}</strong> <br> country:${project.country} <br> <a href="${project.url}" target="_blank"> View Project</a>`;
               projectList.appendChild('div');
    });
})

          .catch(error=> console.error('Error fetching data:',error));

            // Handle contact form submission
            document.getElementById('contact-form').addEventListener('submit', function(event){
                event.preventDefault();
                alert("Message sent! We will get back to you soon.");
                        })
                        
                // Handle newsletter signup

})