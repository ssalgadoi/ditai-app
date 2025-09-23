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
        window.addEventListener("scroll", () => {
            scrollBtn.style.display = window.scrollY > 20 ? "block" : "none";
        });
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    
    
    // =========================
    // Contador animado con duración fija
    // =========================
    
    
    const counters = document.querySelectorAll(".socials__number");
    const duration = 500; // duración total en ms

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
    // Usamos Intersection Observer para detectar visibilidad
    const observerOptions = { root: null, threshold: 0.5, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) animateCounter(entry.target);
            else entry.target.innerText = "";
        });
    }, observerOptions);

    counters.forEach(counter => {
        counter.innerText = "";
        observer.observe(counter);
    });

    

    // =========================
    // Grid de imágenes (en Nosotros)
    // =========================
    const aboutSection = document.querySelector("#about");
    const grid = document.getElementById("image-grid");

    if (aboutSection && grid) {
        const rows = 4;
        const cols = 8;

        // Crear las piezas del mosaico
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

        // Importante: solo las piezas dentro del grid
        const pieces = grid.querySelectorAll(".grid-piece");

        function showNextPiece(i = 0) {
            if (i < pieces.length) {
                pieces[i].style.opacity = 1;
                setTimeout(() => showNextPiece(i + 1), 150);
            }
        }

        // Usamos un observer independiente
        const aboutObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    showNextPiece();
                    aboutObserver.disconnect(); // ✅ se ejecuta solo una vez
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
    // Galería de imágenes con vista ampliada
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
    // Scroll to Section based on data attribute
    // =========================        
    const section = document.body.getAttribute("data-section");
    if (section) {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }





});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

console.log("Mi JS se ha cargado completamente");
