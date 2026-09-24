document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const setActive = (id) => {
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            const visiveis = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visiveis.length > 0) {
                setActive(visiveis[0].target.id);
            }
        },
        {
            rootMargin: "-90px 0px -60% 0px",
            threshold: 0,
        }
    );

    sections.forEach(section => observer.observe(section));

    if (sections.length > 0) {
        setActive(sections[0].id);
    }
});