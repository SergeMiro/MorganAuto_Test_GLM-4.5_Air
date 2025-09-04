// Création de l'effet de pluie 3D
function createRainEffect() {
	const rainContainer = document.getElementById('rain-container');
	if (!rainContainer) return;

	const rainElementCount = 50; // Nombre de gouttes de pluie

	for (let i = 0; i < rainElementCount; i++) {
		const rainElement = document.createElement('div');
		rainElement.classList.add('rain-element');

		// Paramètres aléatoires pour chaque goutte
		const size = Math.random() * 20 + 10; // Taille de 10 à 30px
		const leftPosition = Math.random() * 100; // Position horizontale (0-100%)
		const animationDuration = Math.random() * 5 + 5; // Durée d'animation (5-10 secondes)
		const animationDelay = Math.random() * 5; // Délai avant l'animation (0-5 secondes)

		// Application des paramètres aléatoires
		rainElement.style.width = `${size}px`;
		rainElement.style.height = `${size}px`;
		rainElement.style.left = `${leftPosition}%`;
		rainElement.style.animationDuration = `${animationDuration}s`;
		rainElement.style.animationDelay = `${animationDelay}s`;

		// Ajout au conteneur
		rainContainer.appendChild(rainElement);
	}
}

// Animation du logo au défilement
function animateLogoOnScroll() {
	const logoTriangle = document.querySelector('.triangle');
	if (!logoTriangle) return;

	let lastScrollTop = 0;

	window.addEventListener('scroll', () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Rotation du triangle en fonction de la direction et de la vitesse de défilement
		if (scrollTop > lastScrollTop) {
			// Défilement vers le bas
			logoTriangle.style.transform = 'rotateZ(360deg)';
		} else {
			// Défilement vers le haut
			logoTriangle.style.transform = 'rotateZ(-360deg)';
		}

		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
	});
}

// Animation des éléments au défilement
function animateElementsOnScroll() {
	const elements = document.querySelectorAll('.car-card, .feature-item, .blog-post');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
			}
		});
	}, {
		threshold: 0.1
	});

	elements.forEach(element => {
		element.style.opacity = '0';
		element.style.transform = 'translateY(50px) rotateX(10deg) rotateY(10deg)';
		element.style.transition = 'all 0.8s ease';
		observer.observe(element);
	});
}

// Défilement fluide pour les liens de navigation
function smoothScroll() {
	const navLinks = document.querySelectorAll('.nav-menu a');

	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetId = link.getAttribute('href');

			if (targetId.startsWith('#')) {
				const targetSection = document.querySelector(targetId);

				if (targetSection) {
					targetSection.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			} else if (targetId === 'catalogue.html' || targetId === 'blog.html' || targetId === 'admin.html') {
				// Redirection vers d'autres pages
				window.location.href = targetId;
			}
		});
	});
}

// Gestion du changement de la barre de navigation au défilement
function handleNavbarScroll() {
	const navbar = document.querySelector('.navbar');

	if (!navbar) return;

	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
			navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
		} else {
			navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
			navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
		}
	});
}

// Effet parallaxe pour la section héros
function parallaxEffect() {
	const hero = document.querySelector('.hero');
	const car3d = document.querySelector('.car-3d');

	window.addEventListener('scroll', () => {
		const scrolled = window.pageYOffset;
		const rate = scrolled * -0.5;

		if (hero && car3d) {
			car3d.style.transform = `translateY(${rate}px) rotateY(${scrolled * 0.1}deg)`;
		}
	});
}

// Fonctionnalité de filtrage pour la page catalogue
function setupCatalogFilters() {
	const searchInput = document.getElementById('searchInput');
	const brandFilter = document.getElementById('brandFilter');
	const minPrice = document.getElementById('minPrice');
	const maxPrice = document.getElementById('maxPrice');
	const minYear = document.getElementById('minYear');
	const maxYear = document.getElementById('maxYear');
	const mileage = document.getElementById('mileage');
	const fuelFilter = document.getElementById('fuelFilter');
	const applyFiltersBtn = document.getElementById('applyFilters');
	const resetFiltersBtn = document.getElementById('resetFilters');
	const sortBy = document.getElementById('sortBy');
	const carCards = document.querySelectorAll('.car-card');
	const carCount = document.getElementById('carCount');

	if (!applyFiltersBtn) return;

	function filterCars() {
		let count = 0;

		carCards.forEach(card => {
			const brand = card.getAttribute('data-brand');
			const price = parseInt(card.getAttribute('data-price'));
			const year = parseInt(card.getAttribute('data-year'));
			const cardMileage = parseInt(card.getAttribute('data-mileage'));
			const fuel = card.getAttribute('data-fuel');

			let showCard = true;

			// Filtre de recherche
			if (searchInput.value) {
				const searchTerm = searchInput.value.toLowerCase();
				const cardText = `${brand} ${card.querySelector('h3').textContent}`.toLowerCase();
				if (!cardText.includes(searchTerm)) {
					showCard = false;
				}
			}

			// Filtre de marque
			if (brandFilter.value && brand !== brandFilter.value) {
				showCard = false;
			}

			// Filtre de prix
			if (minPrice.value && price < parseInt(minPrice.value)) {
				showCard = false;
			}
			if (maxPrice.value && price > parseInt(maxPrice.value)) {
				showCard = false;
			}

			// Filtre d'année
			if (minYear.value && year < parseInt(minYear.value)) {
				showCard = false;
			}
			if (maxYear.value && year > parseInt(maxYear.value)) {
				showCard = false;
			}

			// Filtre de kilométrage
			if (mileage.value && cardMileage > parseInt(mileage.value)) {
				showCard = false;
			}

			// Filtre de carburant
			if (fuelFilter.value && fuel !== fuelFilter.value) {
				showCard = false;
			}

			if (showCard) {
				card.style.display = 'block';
				count++;
			} else {
				card.style.display = 'none';
			}
		});

		if (carCount) {
			carCount.textContent = count;
		}
	}

	function sortCars() {
		const sortValue = sortBy.value;
		const carsGrid = document.getElementById('carsGrid');

		if (!carsGrid) return;

		const sortedCards = Array.from(carCards).sort((a, b) => {
			let aValue, bValue;

			switch (sortValue) {
				case 'price-asc':
					aValue = parseInt(a.getAttribute('data-price'));
					bValue = parseInt(b.getAttribute('data-price'));
					return aValue - bValue;
				case 'price-desc':
					aValue = parseInt(a.getAttribute('data-price'));
					bValue = parseInt(b.getAttribute('data-price'));
					return bValue - aValue;
				case 'year-desc':
					aValue = parseInt(a.getAttribute('data-year'));
					bValue = parseInt(b.getAttribute('data-year'));
					return bValue - aValue;
				case 'year-asc':
					aValue = parseInt(a.getAttribute('data-year'));
					bValue = parseInt(b.getAttribute('data-year'));
					return aValue - bValue;
				case 'mileage-asc':
					aValue = parseInt(a.getAttribute('data-mileage'));
					bValue = parseInt(b.getAttribute('data-mileage'));
					return aValue - bValue;
				default:
					return 0;
			}
		});

		// Réorganiser les cartes dans le DOM
		sortedCards.forEach(card => {
			carsGrid.appendChild(card);
		});
	}

	applyFiltersBtn.addEventListener('click', filterCars);
	sortBy.addEventListener('change', sortCars);

	resetFiltersBtn.addEventListener('click', () => {
		searchInput.value = '';
		brandFilter.value = '';
		minPrice.value = '';
		maxPrice.value = '';
		minYear.value = '';
		maxYear.value = '';
		mileage.value = '';
		fuelFilter.value = '';
		sortBy.value = 'default';

		carCards.forEach(card => {
			card.style.display = 'block';
		});

		if (carCount) {
			carCount.textContent = carCards.length;
		}
	});

	// Filtrage en temps réel pour la recherche
	searchInput.addEventListener('input', filterCars);
}

// Fonctionnalité pour le chargement de plus de voitures
function setupLoadMore() {
	const loadMoreBtn = document.getElementById('loadMore');
	if (!loadMoreBtn) return;

	loadMoreBtn.addEventListener('click', () => {
		// Dans une application réelle, cela chargerait plus de voitures depuis une API
		alert('Chargement de plus de voitures...');
	});
}

// Fonctionnalité pour la gestion des modales d'administration
function setupAdminModals() {
	// Gestion de la modale pour les voitures
	const carModal = document.getElementById('car-modal');
	const carForm = document.getElementById('car-form');
	const addCarBtn = document.getElementById('add-car-btn');
	const cancelCarBtn = document.getElementById('cancel-car-btn');
	const carModalTitle = document.getElementById('car-modal-title');

	if (carModal && addCarBtn) {
		addCarBtn.addEventListener('click', () => {
			carModalTitle.textContent = 'Ajouter un véhicule';
			carForm.reset();
			carModal.classList.remove('hidden');
		});

		cancelCarBtn.addEventListener('click', () => {
			carModal.classList.add('hidden');
		});

		carForm.addEventListener('submit', (e) => {
			e.preventDefault();
			alert('Véhicule enregistré avec succès!');
			carModal.classList.add('hidden');
		});
	}

	// Gestion de la modale pour les articles de blog
	const articleModal = document.getElementById('article-modal');
	const articleForm = document.getElementById('article-form');
	const addArticleBtn = document.getElementById('add-article-btn');
	const cancelArticleBtn = document.getElementById('cancel-article-btn');
	const articleModalTitle = document.getElementById('article-modal-title');

	if (articleModal && addArticleBtn) {
		addArticleBtn.addEventListener('click', () => {
			articleModalTitle.textContent = 'Ajouter un article';
			articleForm.reset();
			articleModal.classList.remove('hidden');
		});

		cancelArticleBtn.addEventListener('click', () => {
			articleModal.classList.add('hidden');
		});

		articleForm.addEventListener('submit', (e) => {
			e.preventDefault();
			alert('Article enregistré avec succès!');
			articleModal.classList.add('hidden');
		});
	}
}

// Fonctionnalité pour la navigation de l'administration
function setupAdminNavigation() {
	const navLinks = document.querySelectorAll('.admin-nav-link');
	if (navLinks.length === 0) return;

	navLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();

			// Supprimer la classe active de tous les liens
			navLinks.forEach(l => {
				l.classList.remove('bg-secondary', 'text-white');
				l.classList.add('text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900');
			});

			// Ajouter la classe active au lien cliqué
			this.classList.remove('text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900');
			this.classList.add('bg-secondary', 'text-white');

			// Masquer toutes les sections
			document.querySelectorAll('.admin-section').forEach(section => {
				section.classList.add('hidden');
			});

			// Afficher la section correspondante
			const sectionId = this.getAttribute('href').substring(1) + '-section';
			const targetSection = document.getElementById(sectionId);
			if (targetSection) {
				targetSection.classList.remove('hidden');
			}
		});
	});
}

// Fonctionnalité pour la suppression d'éléments
function setupDeleteButtons() {
	// Suppression de voitures
	document.querySelectorAll('.delete-car-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule?')) {
				this.closest('.car-item').remove();
			}
		});
	});

	// Suppression d'articles
	document.querySelectorAll('.delete-article-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			if (confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
				this.closest('.article-item').remove();
			}
		});
	});
}

// Fonctionnalité pour la modification d'éléments
function setupEditButtons() {
	// Modification de voitures
	document.querySelectorAll('.edit-car-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			const carModal = document.getElementById('car-modal');
			const carModalTitle = document.getElementById('car-modal-title');
			const carForm = document.getElementById('car-form');

			if (carModal && carModalTitle) {
				carModalTitle.textContent = 'Modifier un véhicule';
				carModal.classList.remove('hidden');
				// Remplir le formulaire avec les données existantes
			}
		});
	});

	// Modification d'articles
	document.querySelectorAll('.edit-article-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			const articleModal = document.getElementById('article-modal');
			const articleModalTitle = document.getElementById('article-modal-title');
			const articleForm = document.getElementById('article-form');

			if (articleModal && articleModalTitle) {
				articleModalTitle.textContent = 'Modifier un article';
				articleModal.classList.remove('hidden');
				// Remplir le formulaire avec les données existantes
			}
		});
	});
}

// Initialisation de toutes les fonctions au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
	createRainEffect();
	animateLogoOnScroll();
	animateElementsOnScroll();
	smoothScroll();
	handleNavbarScroll();
	parallaxEffect();
	setupCatalogFilters();
	setupLoadMore();
	setupAdminModals();
	setupAdminNavigation();
	setupDeleteButtons();
	setupEditButtons();

	// Ajouter un effet de survol sur le logo
	const logo3d = document.querySelector('.logo-3d');
	if (logo3d) {
		logo3d.addEventListener('mouseenter', () => {
			const triangle = document.querySelector('.triangle');
			if (triangle) {
				triangle.style.transform = 'rotateX(360deg) rotateY(360deg)';
			}
		});

		logo3d.addEventListener('mouseleave', () => {
			const triangle = document.querySelector('.triangle');
			if (triangle) {
				triangle.style.transform = 'rotateX(0) rotateY(0)';
			}
		});
	}

	// Interactivité pour les cartes de voitures
	const carCards = document.querySelectorAll('.car-card');
	carCards.forEach(card => {
		card.addEventListener('mouseenter', () => {
			const image = card.querySelector('.car-image');
			if (image) {
				image.style.transform = 'scale(1.05)';
			}
		});

		card.addEventListener('mouseleave', () => {
			const image = card.querySelector('.car-image');
			if (image) {
				image.style.transform = 'scale(1)';
			}
		});
	});

	// Interactivité pour les catégories du blog
	const categoryBtns = document.querySelectorAll('.category-btn');
	categoryBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			// Supprimer la classe active de tous les boutons
			categoryBtns.forEach(b => {
				b.classList.remove('bg-secondary', 'text-white');
				b.classList.add('bg-gray-200', 'text-gray-700');
			});

			// Ajouter la classe active au bouton cliqué
			this.classList.remove('bg-gray-200', 'text-gray-700');
			this.classList.add('bg-secondary', 'text-white');

			// Filtrer les articles du blog (dans une application réelle, cela filtrerait les articles)
			const category = this.textContent.trim();
			console.log('Filtrage par catégorie:', category);
		});
	});

	// Formulaire de newsletter
	const newsletterForm = document.querySelector('form');
	if (newsletterForm) {
		newsletterForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const emailInput = this.querySelector('input[type="email"]');
			if (emailInput && emailInput.value) {
				alert(`Merci pour votre inscription ! Nous vous enverrons les actualités à ${emailInput.value}`);
				this.reset();
			}
		});
	}
});