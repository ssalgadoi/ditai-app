console.log("Mi JS se está cargando correctamente");

document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // Navbar responsive
    // =========================
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse) {
        navbarCollapse.addEventListener("show.bs.collapse", () => {
            if (window.innerWidth <= 991.98) document.body.style.overflow = "hidden";
        });
        navbarCollapse.addEventListener("hidden.bs.collapse", () => {
            document.body.style.overflow = "";
        });
    }

    // =========================
    // Footer: año actual
    // =========================
    const currentYearElement = document.querySelector("#current-year");
    if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();

    // =========================
    // Botón Scroll to Top
    // =========================
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        const homeUrl = scrollBtn.dataset.homeUrl;

        const toggleScrollBtn = () => {
            if (window.scrollY > 500) {
                scrollBtn.classList.add("show");
            } else {
                scrollBtn.classList.remove("show");
            }
        };

        toggleScrollBtn();
        window.addEventListener("scroll", toggleScrollBtn);

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", homeUrl);
        });
    }

    // =========================
    // Contador animado con duración fija
    // =========================
    const counters = document.querySelectorAll(".socials__number");
    const duration = 500;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        let startTime = null;

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            counter.innerText = Math.floor(progress * target);
            if (progress < 1) requestAnimationFrame(updateCount);
            else counter.innerText = target;
        };

        requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) animateCounter(entry.target);
            else entry.target.innerText = "";
        });
    }, { root: null, threshold: 0.5, rootMargin: "0px 0px -50px 0px" });

    counters.forEach(counter => {
        counter.innerText = "";
        counterObserver.observe(counter);
    });

    // =========================
    // Grid de imágenes (Nosotros)
    // =========================
    const aboutSection = document.querySelector("#about");
    const grid = document.getElementById("image-grid");

    if (aboutSection && grid) {
        const rows = 4;
        const cols = 8;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const div = document.createElement("div");
                div.className = "grid-piece";
                div.style.gridRow = r + 1;
                div.style.gridColumn = c + 1;
                div.style.backgroundPosition = `${(c * 100) / (cols - 1)}% ${(r * 100) / (rows - 1)}%`;
                grid.appendChild(div);
            }
        }

        const pieces = grid.querySelectorAll(".grid-piece");

        function showNextPiece(i = 0) {
            if (i < pieces.length) {
                pieces[i].style.opacity = 1;
                setTimeout(() => showNextPiece(i + 1), 150);
            }
        }

        const aboutObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    showNextPiece();
                    aboutObserver.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        aboutObserver.observe(aboutSection);
    }

    // =========================
    // Swiper
    // =========================
    if (document.querySelector(".mySwiper")) {
        const swiper = new Swiper(".mySwiper", {
            loop: true,
            slidesPerView: "auto",
            spaceBetween: 20,
            speed: 3000,
            grabCursor: true,
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }

    // =========================
    // Galería de imágenes
    // =========================
    const galleryImages = document.querySelectorAll(".services__galeria img");
    const fullViewContainer = document.getElementById("fullImageView");
    const fullImage = document.getElementById("fullImage");
    let currentIndex = 0;

    if (galleryImages.length && fullViewContainer && fullImage) {
        galleryImages.forEach((img, index) => {
            img.setAttribute("data-index", index);
            img.addEventListener("click", () => {
                currentIndex = index;
                fullImage.src = img.src;
                fullViewContainer.style.display = "flex";
            });
        });

        window.closeFullView = function () { fullViewContainer.style.display = "none"; };
        window.prevImage = function () {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryImages.length - 1;
            fullImage.src = galleryImages[currentIndex].src;
        };
        window.nextImage = function () {
            currentIndex = (currentIndex < galleryImages.length - 1) ? currentIndex + 1 : 0;
            fullImage.src = galleryImages[currentIndex].src;
        };

        fullViewContainer.addEventListener("click", (e) => {
            if (e.target === fullViewContainer) closeFullView();
        });
    }

    // =========================
    // Scroll inicial desde Django
    // =========================
    const sectionFromServer = "{{ section }}";
    if (sectionFromServer) {
        const target = document.getElementById(sectionFromServer);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }

    // =========================
    // Actualizar URL al hacer scroll (corrección inicio)
    // =========================
    const sections = document.querySelectorAll("section[data-section]");
    const sectionObserver = new IntersectionObserver((entries) => {
        // Si estamos en la parte superior
        if (window.scrollY < 460) {
            if (window.location.pathname !== "/") {
                window.history.replaceState(null, "", "/");
            }
            return;
        }

        // Detectar la sección más visible
        let maxRatio = 0;
        let visibleSection = null;
        entries.forEach(entry => {
            if (entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                visibleSection = entry.target;
            }
        });

        if (visibleSection) {
            const sec = visibleSection.dataset.section;
            if (sec && window.location.pathname !== "/" + sec + "/") {
                window.history.replaceState(null, "", "/" + sec + "/");
            }
        }
    }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) });

    sections.forEach(sec => sectionObserver.observe(sec));

    // =========================
    // Scroll suave al hacer click en links del menú
    // =========================
    const navLinks = document.querySelectorAll("nav a[href^='/']");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const urlParts = link.getAttribute("href").split("/");
            const sectionId = urlParts[1];
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "/" + sectionId + "/");
            }
        });
    });

});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

console.log("Mi JS se ha cargado completamente");
