// Parse the YAML file into a JavaScript object
fetch('timeline.yml')
    .then(response => response.text())
    .then(yamlText => {
        const timeline = jsyaml.load(yamlText);
        console.log(timeline);

        // Create an intersection observer with a root margin of 20%
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Extract the value of the "data-anim" attribute
                    const anim = entry.target.getAttribute('data-anim');

                    // Find the corresponding entry in the timeline
                    const timelineEntry = timeline.find(item => item.anim === anim);

                    if (timelineEntry) {
                        // Apply the CSS transform to the target image
                        const targetImg = document.getElementById(timelineEntry.target);
                        targetImg.style.transformOrigin = `${timelineEntry.coords[0]}% ${timelineEntry.coords[1]}%`;
                        targetImg.style.transform = `scale(${timelineEntry.scale})`;
                    }
                }
            });
        }, {
            rootMargin: '-20%'
        });

        // Observe all elements with the "interactive" class
        const interactiveElements = document.querySelectorAll('.interactive');
        interactiveElements.forEach(element => observer.observe(element));
    });

// ujeza addition


