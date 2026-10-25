/* ==========================================================================
   MERCADO DE PLANTAS LOMA VERDE — EDICIÓN BOTÁNICA (MAIN INTERACTIVE ENGINE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. NAVBAR SCROLL & MOBILE MENU
       ---------------------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active')
                    ? 'fas fa-times'
                    : 'fas fa-bars';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. DECK INTERACTIVO DE SECTORES DEL MERCADO (HERO)
       ---------------------------------------------------------------------- */
    const localSlidesData = [
        {
            num: 'SECTOR 01',
            badge: 'Predio & Especies de Exterior',
            footerSub: 'Colectora Oeste Ramal Escobar 3950 · Loma Verde (Panamericana Km 54.5)',
            title: '<i class="fas fa-warehouse"></i> Nuestro Predio & Especies de Exterior',
            desc: 'Un predio amplio y cómodo sobre Colectora Oeste Km 54.5 en Loma Verde. Cuidamos ejemplares sanos, fuertes y aclimatados al suelo y clima de Zona Norte.',
            img: 'images/local/local-1.jpg',
            sun: 'Cultivo a Cielo Abierto y Bajo Cubierta',
            water: 'Riego Controlado por Sector',
            use: 'Parquización de Lotes, Canteros, Parques y Jardines'
        },
        {
            num: 'SECTOR 02',
            badge: 'Santa Ritas & Floración',
            footerSub: 'Ejemplares tutorados en flor y trepadoras en exhibición permanente',
            title: '<i class="fas fa-sun-plant-wilt"></i> Sector de Santa Ritas, Jazmines & Trepadoras en Flor',
            desc: 'Ejemplares tutorados en caña en variedad de colores (fucsia, violeta, naranja, rojo y blanco), ideales para vestir pérgolas, galerías y cercos en countries y jardines.',
            img: 'images/local/local-2.jpg',
            sun: 'Sol Pleno / Media Sombra Luminosa',
            water: 'Riego Moderado',
            use: 'Pérgolas, Alambrados, Muros y Cercos Florales'
        },
        {
            num: 'SECTOR 03',
            badge: 'Interior & Suculentas',
            footerSub: 'Variedad en plantas de galería, orquídeas, mesadas de cactus y suculentas',
            title: '<i class="fas fa-seedling"></i> Naves de Interior, Orquídeas & Suculentas de Colección',
            desc: 'Gran diversidad de especies de interior, follaje tropical, macetas y mesadas de suculentas seleccionadas. Venta por menor y bandejas cerradas al por mayor.',
            img: 'images/local/local-3.jpg',
            sun: 'Luz Filtrada de Invernadero',
            water: 'Riego Espaciado',
            use: 'Colección, Macetas, Galerías, Livings y Reventa Mayorista'
        },
        {
            num: 'SECTOR 04',
            badge: 'Arbustos & Cercos Vivos',
            footerSub: 'Especialistas en cierres perimetrales para barrios cerrados de Escobar y Zona Norte',
            title: '<i class="fas fa-shield-heart"></i> Arbustos Perennes, Ficus & Cercos Vivos',
            desc: 'Especialistas en cierres perimetrales naturales para barrios cerrados y quintas en Loma Verde y Escobar. Te calculamos la densidad exacta por metro lineal.',
            img: 'images/local/local-4.jpg',
            sun: 'Sol Directo o Media Sombra',
            water: 'Riego Regular en Implantación',
            use: 'Cierres Perimetrales, Privacidad y Pantallas Verdes'
        }
    ];

    const naveCardBtns = document.querySelectorAll('.nave-card-btn');
    const showcasePhotos = document.querySelectorAll('.showcase-photo');
    const heroBgSlides = document.querySelectorAll('.hero-bg-slide');
    const badgeNumEl = document.getElementById('showcaseBadgeNum');
    const badgeTextEl = document.getElementById('showcaseBadgeText');
    const footerSubEl = document.getElementById('showcaseFooterSub');
    const progressBarEl = document.getElementById('heroSlideProgress');
    const prevSlideBtn = document.getElementById('heroPrevSlide');
    const nextSlideBtn = document.getElementById('heroNextSlide');

    const SLIDE_DURATION_MS = 5500;
    let currentSlideIndex = 0;
    let slideInterval = null;

    function restartProgressBar() {
        if (!progressBarEl) return;
        progressBarEl.style.transition = 'none';
        progressBarEl.style.width = '0%';
        void progressBarEl.offsetWidth;
        progressBarEl.style.transition = `width ${SLIDE_DURATION_MS}ms linear`;
        progressBarEl.style.width = '100%';
    }

    function activateNaveSlide(index) {
        if (!localSlidesData[index]) return;
        currentSlideIndex = index;
        const data = localSlidesData[index];

        naveCardBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === index);
        });

        showcasePhotos.forEach((img, idx) => {
            img.classList.toggle('active', idx === index);
        });

        heroBgSlides.forEach((bg, idx) => {
            bg.classList.toggle('active', idx === index);
        });

        if (badgeNumEl) badgeNumEl.textContent = data.num;
        if (badgeTextEl) badgeTextEl.textContent = data.badge;
        if (footerSubEl) footerSubEl.textContent = data.footerSub;

        restartProgressBar();
    }

    function startNavesAutoPlay() {
        if (naveCardBtns.length === 0) return;
        stopNavesAutoPlay();
        restartProgressBar();
        slideInterval = setInterval(() => {
            const nextIdx = (currentSlideIndex + 1) % localSlidesData.length;
            activateNaveSlide(nextIdx);
        }, SLIDE_DURATION_MS);
    }

    function stopNavesAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
        if (progressBarEl) {
            progressBarEl.style.transition = 'none';
        }
    }

    if (naveCardBtns.length > 0) {
        naveCardBtns.forEach((btn, idx) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                activateNaveSlide(idx);
                startNavesAutoPlay();
                btn.blur();
            });
            btn.addEventListener('mouseenter', stopNavesAutoPlay);
            btn.addEventListener('mouseleave', startNavesAutoPlay);
        });

        if (prevSlideBtn) {
            prevSlideBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const prevIdx = (currentSlideIndex - 1 + localSlidesData.length) % localSlidesData.length;
                activateNaveSlide(prevIdx);
                startNavesAutoPlay();
            });
        }

        if (nextSlideBtn) {
            nextSlideBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const nextIdx = (currentSlideIndex + 1) % localSlidesData.length;
                activateNaveSlide(nextIdx);
                startNavesAutoPlay();
            });
        }

        startNavesAutoPlay();
    }

    /* ----------------------------------------------------------------------
       3. FILTROS INTERACTIVOS DEL CATÁLOGO DE ESPECIES + MODAL FICHA BOTÁNICA
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-pill-btn');
    const speciesCards = document.querySelectorAll('.species-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            speciesCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });

    /* Modal Ficha Botánica & Zoom del Hero */
    const quickModal = document.getElementById('speciesQuickModal');
    const closeQuickModalBtn = document.getElementById('closeQuickModalBtn');
    const modalImg = document.getElementById('modalSpeciesImg');
    const modalBotanical = document.getElementById('modalSpeciesBotanical');
    const modalTitle = document.getElementById('modalSpeciesTitle');
    const modalDesc = document.getElementById('modalSpeciesDesc');
    const modalSun = document.getElementById('modalSpeciesSun');
    const modalWater = document.getElementById('modalSpeciesWater');
    const modalUse = document.getElementById('modalSpeciesUse');
    const modalWaBtn = document.getElementById('modalSpeciesWaBtn');
    const openLightboxBtn = document.getElementById('openLightboxBtn');

    function openBotanicalModal(info) {
        if (!quickModal) return;
        if (modalImg) modalImg.src = info.img;
        if (modalBotanical) modalBotanical.textContent = info.botanical;
        if (modalTitle) modalTitle.textContent = info.title;
        if (modalDesc) modalDesc.textContent = info.desc;
        if (modalSun) modalSun.textContent = info.sun;
        if (modalWater) modalWater.textContent = info.water;
        if (modalUse) modalUse.textContent = info.use;
        if (modalWaBtn) {
            const msg = encodeURIComponent(`Hola Mercado de Plantas Loma Verde! Estuve viendo en la web "${info.title}" y quería consultar disponibilidad y precio.`);
            modalWaBtn.href = `https://wa.me/5491133097319?text=${msg}`;
        }
        quickModal.classList.add('open');
        quickModal.setAttribute('aria-hidden', 'false');
    }

    document.querySelectorAll('.quickview-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const card = trigger.closest('.species-card');
            if (!card) return;
            openBotanicalModal({
                title: card.getAttribute('data-title') || '',
                botanical: card.getAttribute('data-botanical') || '',
                img: card.getAttribute('data-img') || '',
                sun: card.getAttribute('data-sun') || '',
                water: card.getAttribute('data-water') || '',
                use: card.getAttribute('data-use') || '',
                desc: card.getAttribute('data-desc') || ''
            });
        });
    });

    if (openLightboxBtn) {
        openLightboxBtn.addEventListener('click', () => {
            const slide = localSlidesData[currentSlideIndex];
            if (!slide) return;
            const cleanTitle = slide.title.replace(/<[^>]*>/g, '').trim();
            openBotanicalModal({
                title: cleanTitle,
                botanical: `Mercado de Plantas Loma Verde · ${slide.num}`,
                img: slide.img,
                sun: slide.sun,
                water: slide.water,
                use: slide.use,
                desc: slide.desc
            });
        });
    }

    if (closeQuickModalBtn && quickModal) {
        closeQuickModalBtn.addEventListener('click', () => {
            quickModal.classList.remove('open');
            quickModal.setAttribute('aria-hidden', 'true');
        });
        quickModal.addEventListener('click', (e) => {
            if (e.target === quickModal) {
                quickModal.classList.remove('open');
                quickModal.setAttribute('aria-hidden', 'true');
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && quickModal.classList.contains('open')) {
                quickModal.classList.remove('open');
                quickModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    /* ----------------------------------------------------------------------
       4. CALCULADORA INTERACTIVA DE CERCO VIVO & PARQUIZACIÓN POR WHATSAPP
       ---------------------------------------------------------------------- */
    const calcForm = document.getElementById('cercoCalcForm');
    const calcMetrosInput = document.getElementById('calcMetros');
    const calcZonaSelect = document.getElementById('calcZona');
    const calcObjetivoSelect = document.getElementById('calcObjetivo');
    const calcLuzSelect = document.getElementById('calcLuz');
    const calcPlantCountEl = document.getElementById('calcPlantCount');

    function updateCercoCalculation() {
        if (!calcMetrosInput || !calcObjetivoSelect || !calcPlantCountEl) return;
        const metros = Math.max(1, parseFloat(calcMetrosInput.value) || 1);
        const selectedOption = calcObjetivoSelect.options[calcObjetivoSelect.selectedIndex];
        const density = parseFloat(selectedOption.getAttribute('data-density')) || 2.5;
        const estimatedPlants = Math.ceil(metros * density);
        calcPlantCountEl.textContent = `~${estimatedPlants} ejemplares (${metros}m lineales)`;
        return {
            metros,
            estimatedPlants,
            objetivoText: selectedOption.text,
            zona: calcZonaSelect ? calcZonaSelect.value : 'Loma Verde / Escobar',
            luz: calcLuzSelect ? calcLuzSelect.value : 'Sol Pleno'
        };
    }

    if (calcMetrosInput && calcObjetivoSelect) {
        calcMetrosInput.addEventListener('input', updateCercoCalculation);
        calcObjetivoSelect.addEventListener('change', updateCercoCalculation);
        updateCercoCalculation();
    }

    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const res = updateCercoCalculation();
            if (!res) return;
            const message = `Hola Mercado de Plantas Loma Verde! Usé el calculador de la web y quisiera pedir presupuesto:\n` +
                `• Proyecto: ${res.objetivoText}\n` +
                `• Medida a cubrir: ${res.metros} metros lineales (aprox. ${res.estimatedPlants} ejemplares)\n` +
                `• Exposición solar: ${res.luz}\n` +
                `• Zona / Barrio: ${res.zona}\n` +
                `¿Me podrían asesorar con las especies recomendadas y precios mayorista/minorista? ¡Gracias!`;
            const waUrl = `https://wa.me/5491133097319?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    }

    /* ----------------------------------------------------------------------
       5. SCROLL REVEAL & CASCADING PARALLAX SUAVE
       ---------------------------------------------------------------------- */
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    /* Parallax suave en imágenes en cascada al hacer scroll */
    const cascadingWrap = document.querySelector('.cascading-visual-wrap');
    if (cascadingWrap) {
        const bgLayer = cascadingWrap.querySelector('.cascading-layer-bg');
        const mainLayer = cascadingWrap.querySelector('.cascading-layer-main');
        const floatCard = cascadingWrap.querySelector('.cascading-layer-floating-card');

        window.addEventListener('scroll', () => {
            const rect = cascadingWrap.getBoundingClientRect();
            const winH = window.innerHeight;
            if (rect.top < winH && rect.bottom > 0) {
                const progress = (winH - rect.top) / (winH + rect.height) - 0.5;
                if (bgLayer) bgLayer.style.transform = `translate3d(${progress * -20}px, ${progress * 30}px, 0)`;
                if (mainLayer) mainLayer.style.transform = `translate3d(0, ${progress * -18}px, 0)`;
                if (floatCard) floatCard.style.transform = `translate3d(${progress * 14}px, ${progress * -30}px, 0)`;
            }
        }, { passive: true });
    }

    /* Efecto 3D Tilt suave en las tarjetas de Servicios */
    const comboCards = document.querySelectorAll('.combo-kinetic-card');
    comboCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 900) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 6;
            const rotateX = ((y / rect.height) - 0.5) * -6;
            card.style.transform = `perspective(950px) translateY(-8px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ----------------------------------------------------------------------
       6. CARRUSELES DRAG & FLECHAS (PILARES DE CULTIVO Y RESEÑAS)
       ---------------------------------------------------------------------- */
    const strips = document.querySelectorAll('.brands-scroll-strip, .reviews-strip');
    strips.forEach(strip => {
        let isDown = false;
        let startX;
        let scrollLeft;

        strip.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - strip.offsetLeft;
            scrollLeft = strip.scrollLeft;
        });
        strip.addEventListener('mouseleave', () => { isDown = false; });
        strip.addEventListener('mouseup', () => { isDown = false; });
        strip.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - strip.offsetLeft;
            const walk = (x - startX) * 1.8;
            strip.scrollLeft = scrollLeft - walk;
        });
    });

    document.querySelectorAll('.strip-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const targetId = arrow.getAttribute('data-target');
            const container = document.getElementById(targetId);
            if (!container) return;
            const amount = container.clientWidth * 0.7;
            container.scrollBy({
                left: arrow.classList.contains('prev') ? -amount : amount,
                behavior: 'smooth'
            });
        });
    });

    /* ----------------------------------------------------------------------
       7. DETECTOR DEL DÍA ACTUAL EN LA TABLA DE HORARIOS
       ---------------------------------------------------------------------- */
    const now = new Date();
    const day = now.getDay(); // 0=Dom, 1=Lun, 2=Mar, 3=Mie, 4=Jue, 5=Vie, 6=Sab

    const scheduleRows = document.querySelectorAll('.schedule-row');
    scheduleRows.forEach(row => {
        const daysAttr = row.getAttribute('data-days') || '';
        const daysList = daysAttr.split(',').map(Number);
        if (daysList.includes(day)) {
            row.classList.add('today');
        }
    });

    /* ----------------------------------------------------------------------
       8. MENÚ DESPLEGABLE DE WHATSAPP EN EL ENCABEZADO SUPERIOR FIJO
       ---------------------------------------------------------------------- */
    const navWaBtn = document.getElementById('navWaBtn');
    const navWaPopup = document.getElementById('navWaPopup');
    const navWaClose = document.getElementById('navWaClose');

    if (navWaBtn && navWaPopup) {
        navWaBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navWaPopup.classList.toggle('open');
            navWaBtn.classList.toggle('active', isOpen);
            navWaBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (isOpen && navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        });

        if (navWaClose) {
            navWaClose.addEventListener('click', (e) => {
                e.stopPropagation();
                navWaPopup.classList.remove('open');
                navWaBtn.classList.remove('active');
                navWaBtn.setAttribute('aria-expanded', 'false');
            });
        }

        document.addEventListener('click', (e) => {
            if (!navWaPopup.contains(e.target) && !navWaBtn.contains(e.target)) {
                navWaPopup.classList.remove('open');
                navWaBtn.classList.remove('active');
                navWaBtn.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navWaPopup.classList.contains('open')) {
                navWaPopup.classList.remove('open');
                navWaBtn.classList.remove('active');
                navWaBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
