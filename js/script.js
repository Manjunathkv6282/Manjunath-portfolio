
/* --- 3D LOADER LOGIC --- */
window.addEventListener('load', function() {
    const loader = document.getElementById('loaderWrapper');
    
    // Minimum wait time (e.g., 2 seconds) to show off the animation
    // even if the site loads instantly
    setTimeout(() => {
        // Add the class that triggers the CSS exit animations
        loader.classList.add('loaded');
    }, 2000); 
});

function toggleMenu() {
        const nav = document.getElementById('navContent');
        nav.classList.toggle('active');
        
        // Optional: Toggle icon between bars and times (X)
        const icon = document.querySelector('.mobile-toggle i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Optional: Add 'scrolled' class when scrolling down
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.nav-container');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('navContent');
        const icon = document.querySelector('.mobile-toggle i');
        
        // Remove the 'active' class to slide the menu up
        nav.classList.remove('active');
        
        // Reset the icon back to 'bars'
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "Web Developer",
    "WordPress Web Dev",
    "SEO Specialist",
    "UI / UX Designer",
    "Graphic Designer",
    "Digital Marketer",
    "Full-stack Web Dev",
  ];

  let index = 0;
  let charIndex = 0;
  let isDeleting = false;
  const speed = 50;

  const textElement = document.querySelector(".animated-text");

  function typeEffect() {
    const currentWord = words[index];

    if (!isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex++);
      if (charIndex === currentWord.length + 1) {
        setTimeout(() => isDeleting = true, 1200);
      }
    } else {
      textElement.textContent = currentWord.substring(0, charIndex--);
      if (charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 60 : speed);
  }

  typeEffect();
});

// Check if the form exists before running the code
var form3D = document.getElementById("contactForm3D");

if (form3D) {
    async function handleSubmit3D(event) {
        event.preventDefault();
        var status = document.getElementById("form-status");
        var data = new FormData(event.target);
        var btn = form3D.querySelector('button[type="submit"]');
        var originalBtnText = btn.innerHTML;

        // Change button text to show loading
        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        fetch(event.target.action, {
            method: form3D.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success State
                status.style.display = "block";
                status.style.backgroundColor = "#d4edda"; // Light Green
                status.style.color = "#155724"; // Dark Green Text
                status.innerHTML = "Success! Your appointment request has been sent.";
                form3D.reset(); // Clear the inputs

                // Reset button
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
            } else {
                // Error State
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form";
                    }
                    status.style.display = "block";
                    status.style.backgroundColor = "#f8d7da"; // Light Red
                    status.style.color = "#721c24"; // Dark Red Text

                    btn.innerHTML = originalBtnText;
                    btn.disabled = false;
                })
            }
        }).catch(error => {
            status.innerHTML = "Oops! There was a problem submitting your form";
            status.style.display = "block";
            status.style.backgroundColor = "#f8d7da";
            status.style.color = "#721c24";
            btn.innerHTML = originalBtnText;
            btn.disabled = false;
        });
    }

    form3D.addEventListener("submit", handleSubmit3D);
}

// --- FOOTER SUBSCRIBE FORM SCRIPT ---
var footerForm = document.getElementById("footerSubscribe");

if (footerForm) {
    async function handleFooterSubmit(event) {
        event.preventDefault();
        var status = document.getElementById("footer-status");
        var data = new FormData(event.target);
        var btnIcon = footerForm.querySelector('button i');
        
        // Change icon to a spinner/loading state
        var originalIconClass = btnIcon.className;
        btnIcon.className = "fas fa-spinner fa-spin"; // Requires FontAwesome

        fetch(event.target.action, {
            method: footerForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.style.display = "block";
                status.style.color = "#4ade80"; // Bright Green
                status.innerHTML = "Subscribed!";
                footerForm.reset();
                
                // Restore icon after 2 seconds
                setTimeout(() => {
                    status.style.display = "none";
                    btnIcon.className = originalIconClass;
                }, 3000);
            } else {
                status.style.display = "block";
                status.style.color = "#ff4d4d"; // Red
                status.innerHTML = "Error subscribing.";
                btnIcon.className = originalIconClass;
            }
        }).catch(error => {
            status.style.display = "block";
            status.style.color = "#ff4d4d";
            status.innerHTML = "Error.";
            btnIcon.className = originalIconClass;
        });
    }

    footerForm.addEventListener("submit", handleFooterSubmit);
}

window.addEventListener("scroll", () => {
  document.querySelector(".nav").classList.toggle("scrolled", window.scrollY > 10);
});
