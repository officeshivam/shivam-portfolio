
/* =========================
   MOBILE NAVIGATION
========================= */

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
        navbar.classList.toggle("active");
        menuIcon.classList.toggle("fa-xmark");
    });
}

// Close menu after clicking a link
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar?.classList.remove("active");
        menuIcon?.classList.remove("fa-xmark");
    });
});


/* =========================
   TYPING ANIMATION
========================= */

const typingElement = document.querySelector(".typing");

if (typingElement) {
    const words = [
        "Frontend Developer",
        "Web Developer",
        "GitHub Explorer",
        "Programmer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        typingElement.textContent = currentWord.substring(0, charIndex);

        if (!deleting) {
            charIndex++;

            if (charIndex > currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }
        } else {
            charIndex--;

            if (charIndex < 0) {
                charIndex = 0;
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 50 : 100);
    }

    typeEffect();
}


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
    ".about, .skills, .projects, .contact, .skill-box, .project-card"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});


/* =========================
   ACTIVE NAVBAR ON SCROLL
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


/* =========================
   GITHUB PROJECTS
========================= */

// Replace with your GitHub username
const githubUsername = "YOUR_GITHUB_USERNAME";

async function loadGitHubProjects() {
    const projectContainer = document.querySelector(
        ".projects-container"
    );

    if (!projectContainer || githubUsername === "YOUR_GITHUB_USERNAME") {
        return;
    }

    try {
        projectContainer.innerHTML = "<p>Loading GitHub projects...</p>";

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`
        );

        if (!response.ok) {
            throw new Error("Unable to load GitHub projects.");
        }

        const projects = await response.json();

        projectContainer.innerHTML = "";

        if (projects.length === 0) {
            projectContainer.innerHTML = "<p>No public projects found.</p>";
            return;
        }

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = project.name;

            const description = document.createElement("p");
            description.textContent =
                project.description || "No description available.";

            const language = document.createElement("p");
            language.textContent =
                `Language: ${project.language || "Not specified"}`;

            const link = document.createElement("a");
            link.href = project.html_url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "View Project →";

            card.append(title, description, language, link);
            projectContainer.appendChild(card);
        });

    } catch (error) {
        projectContainer.textContent = error.message;
        console.error(error);
    }
}

loadGitHubProjects();


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.querySelector(".contact form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = contactForm.querySelector(
            'input[name="name"]'
        )?.value.trim();

        const email = contactForm.querySelector(
            'input[name="email"]'
        )?.value.trim();

        const message = contactForm.querySelector(
            "textarea"
        )?.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const subject = encodeURIComponent(
            `Portfolio message from ${name}`
        );

        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        // Replace with your email address
        window.location.href =
            `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;
    });
}


/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.querySelector("#back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.style.display =
            window.scrollY > 400 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
