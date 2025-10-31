// animations.js - Toutes les animations et interactions

// Base de données des personnages pour la recherche
const inventeursData = [
    {
        nom: "Al-Khwarizmi",
        categorie: "Mathématiques",
        motsCles: ["algèbre", "algorithme", "mathématiques", "chiffres arabes", "calcul"],
        description: "Père de l'algèbre et des algorithmes",
        lien: "pages/al-khwarizmi.html",
        icone: "🧮"
    },
    {
        nom: "Ibn al-Haytham",
        categorie: "Optique",
        motsCles: ["optique", "vision", "lumière", "chambre noire", "yeux", "scientifique"],
        description: "Père de l'optique moderne",
        lien: "pages/ibn-al-haytham.html",
        icone: "👁️"
    },
    {
        nom: "Al-Zahrawi",
        categorie: "Médecine",
        motsCles: ["chirurgie", "médecine", "instruments", "dentisterie", "santé", "opération"],
        description: "Père de la chirurgie moderne",
        lien: "pages/al-zahrawi.html",
        icone: "⚕️"
    },
    {
        nom: "Ibn Sina (Avicenne)",
        categorie: "Médecine",
        motsCles: ["médecine", "philosophie", "canon", "pharmacologie", "diagnostic"],
        description: "Prince des médecins",
        lien: "pages/ibn-sina.html",
        icone: "📚"
    },
    {
        nom: "Al-Battani",
        categorie: "Astronomie",
        motsCles: ["astronomie", "étoiles", "planètes", "calculs", "mouvements célestes"],
        description: "Prince des astronomes",
        lien: "pages/al-battani.html",
        icone: "🌌"
    },
    {
        nom: "Al-Razi",
        categorie: "Médecine",
        motsCles: ["médecine", "pédiatrie", "variole", "rougeole", "hôpital"],
        description: "Pionnier de la pédiatrie",
        lien: "pages/al-razi.html",
        icone: "💊"
    },
    {
        nom: "Al-Sufi",
        categorie: "Astronomie",
        motsCles: ["astronomie", "étoiles", "constellations", "cartes", "galaxies"],
        description: "Cartographe des étoiles",
        lien: "pages/al-sufi.html",
        icone: "🌠"
    },
    {
        nom: "Jabir Ibn Hayyan",
        categorie: "Chimie",
        motsCles: ["chimie", "alchimie", "distillation", "laboratoire", "réactions"],
        description: "Père de la chimie",
        lien: "pages/jabir-ibn-hayyan.html",
        icone: "🧪"
    },
    {
        nom: "Omar Khayyam",
        categorie: "Mathématiques",
        motsCles: ["mathématiques", "géométrie", "algèbre", "poésie", "calendrier"],
        description: "Géomètre et poète",
        lien: "pages/omar-khayyam.html",
        icone: "📐"
    },
    {
        nom: "Al-Kindi",
        categorie: "Optique",
        motsCles: ["philosophie", "optique", "cryptographie", "musique", "science"],
        description: "Philosophe des Arabes",
        lien: "pages/al-kindi.html",
        icone: "🎓"
    },
    {
        nom: "Al-Biruni",
        categorie: "Astronomie",
        motsCles: ["astronomie", "géographie", "physique", "mesures", "science"],
        description: "Géographe universel",
        lien: "pages/al-biruni.html",
        icone: "🌍"
    },
    {
        nom: "Al-Karaji",
        categorie: "Mathématiques",
        motsCles: ["mathématiques", "algèbre", "nombres", "suites", "calcul"],
        description: "Pionnier de l'algèbre",
        lien: "pages/al-karaji.html",
        icone: "🔢"
    }
];

// Créer des particules décoratives
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Taille aléatoire
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position aléatoire
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Délai d'animation aléatoire
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        // Couleur basée sur les accents
        const colors = ['#3b82f6', '#6366f1', '#60a5fa'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Mode sombre/clair
document.addEventListener('DOMContentLoaded', function() {
    // Créer les particules
    createParticles();
    
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Vérifier le thème sauvegardé ou utiliser le thème sombre par défaut
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            this.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            
            // Sauvegarder le choix
            localStorage.setItem('theme', newTheme);
        });
    }

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in-scroll
    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });

    // Fonction de recherche globale
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm.length === 0) {
                searchResults.style.display = 'none';
                return;
            }

            // Recherche dans la base de données
            const results = inventeursData.filter(inventeur => {
                const inNom = inventeur.nom.toLowerCase().includes(searchTerm);
                const inDescription = inventeur.description.toLowerCase().includes(searchTerm);
                const inMotsCles = inventeur.motsCles.some(mot => mot.includes(searchTerm));
                const inCategorie = inventeur.categorie.toLowerCase().includes(searchTerm);
                
                return inNom || inDescription || inMotsCles || inCategorie;
            });

            // Afficher les résultats
            if (results.length > 0) {
                searchResults.innerHTML = results.map(inventeur => `
                    <div class="search-result-item" onclick="window.location.href='${inventeur.lien}'">
                        <div class="search-result-icon">${inventeur.icone}</div>
                        <div class="search-result-text">
                            <div class="search-result-title">${inventeur.nom}</div>
                            <div class="search-result-desc">${inventeur.description} • ${inventeur.categorie}</div>
                        </div>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = `
                    <div class="no-results">
                        <p style="margin-bottom: 1rem;">🔭 Aucun inventeur trouvé pour "<strong>${searchTerm}</strong>"</p>
                        <p style="font-size: 0.9rem; opacity: 0.8;">Essayez : Al-Khwarizmi, Ibn Sina, chirurgie, astronomie, mathématiques...</p>
                    </div>
                `;
                searchResults.style.display = 'block';
            }
        });

        // Cacher les résultats quand on clique ailleurs
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });

        // Recherche par Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.toLowerCase().trim();
                if (searchTerm.length > 0) {
                    // Rediriger vers la page du premier résultat ou vers les catégories
                    const results = inventeursData.filter(inventeur => 
                        inventeur.nom.toLowerCase().includes(searchTerm) ||
                        inventeur.motsCles.some(mot => mot.includes(searchTerm))
                    );
                    
                    if (results.length > 0) {
                        window.location.href = results[0].lien;
                    } else {
                        // Si aucun résultat exact, aller vers les catégories
                        window.location.href = 'categories.html';
                    }
                }
            }
        });

        // Placeholder dynamique
        const placeholders = [
            "🔍 Rechercher Al-Khwarizmi, Ibn Sina, Al-Zahrawi...",
            "🔍 Trouver chirurgie, astronomie, mathématiques...",
            "🔍 Explorer algèbre, optique, médecine..."
        ];
        let placeholderIndex = 0;

        setInterval(() => {
            searchInput.placeholder = placeholders[placeholderIndex];
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        }, 3000);
    }

    // Animation des cartes au survol
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('Animations chargées avec succès !');
});
