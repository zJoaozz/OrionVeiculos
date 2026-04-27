const API_ORIGIN =
  window.location.protocol === "file:"
    ? "http://localhost:5000"
    : window.ORION_API_ORIGIN ||
      `${window.location.protocol}//${window.location.hostname}:5000`;

const API_BASE_URL = `${API_ORIGIN}/api`;
const API_UPLOADS_BASE_URL = API_ORIGIN;

const THEME_KEY = "orion-theme";
const DEFAULT_CARD_IMAGE = "imagens/logo-orion-redonda.jpg";
const DEFAULT_CATEGORY_IMAGE = "imagens/logo-orion-redonda.jpg";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const filtersWrap = document.getElementById("filtersWrap");
const categoriesPrev = document.getElementById("categoriesPrev");
const categoriesNext = document.getElementById("categoriesNext");
const filtersPrev = document.getElementById("filtersPrev");
const filtersNext = document.getElementById("filtersNext");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const carsGrid = document.getElementById("carsGrid");
const categoriesGrid = document.getElementById("categoriesGrid");
const featuredStatus = document.getElementById("featuredStatus");

const heroMainImage = document.getElementById("heroMainImage");
const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
const heroDots = document.getElementById("heroDots");
const homeBadge = document.getElementById("homeBadge");
const homeTitle = document.getElementById("homeTitle");
const homeSubtitle = document.getElementById("homeSubtitle");
const homePrimaryButton = document.getElementById("homePrimaryButton");
const homeSecondaryButton = document.getElementById("homeSecondaryButton");
const homeWhyTitle = document.getElementById("homeWhyTitle");
const homeWhySubtitle = document.getElementById("homeWhySubtitle");
const navInstagramLink = document.getElementById("navInstagramLink");
const navWhatsappLink = document.getElementById("navWhatsappLink");
const locationMapsButton = document.getElementById("locationMapsButton");
const locationWhatsappButton = document.getElementById("locationWhatsappButton");
const contactWhatsappButton = document.getElementById("contactWhatsappButton");
const contactInstagramButton = document.getElementById("contactInstagramButton");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const navLinkAnchors = navLinks ? navLinks.querySelectorAll("a") : [];

let allCars = [];
let contentSettings = null;
let featuredCarImages = [];
let featuredCarIndex = 0;
let heroAutoplayInterval = null;

const HERO_AUTOPLAY_MS = 3500;
const CARD_AUTOPLAY_MS = 4000;
const FADE_DURATION_MS = 220;

function getDefaultCars() {
  return [
    {
      _id: crypto.randomUUID(),
      titulo: "Volkswagen Voyage 1.0",
      marca: "Volkswagen",
      modelo: "Voyage",
      ano: "2022/2023",
      combustivel: "Flex",
      km: "95.000 km",
      preco: "R$ 61.900,00",
      cidade: "Teresina - PI",
      categoria: "sedan",
      tag: "Manual",
      ordem: 1,
      destaque: true,
      destaqueHome: true,
      status: "disponivel",
      tags: "manual economico sedan volkswagen voyage",
      whatsappText: "Olá! Tenho interesse no Volkswagen Voyage 1.0.",
      images: [{ url: DEFAULT_CARD_IMAGE, filename: "logo-orion-redonda.jpg" }],
      coverIndex: 0
    },
    {
      _id: crypto.randomUUID(),
      titulo: "Toyota Hilux SR 2.8 4x4",
      marca: "Toyota",
      modelo: "Hilux",
      ano: "2020/2020",
      combustivel: "Diesel",
      km: "80.000 km",
      preco: "R$ 198.900,00",
      cidade: "Teresina - PI",
      categoria: "picape",
      tag: "Automático",
      ordem: 2,
      destaque: false,
      destaqueHome: true,
      status: "disponivel",
      tags: "toyota hilux sr 2.8 4x4 picape diesel automatico 2020 80000 km",
      whatsappText: "Olá! Tenho interesse na Toyota Hilux SR 2.8 4x4 2020/2020.",
      images: [{ url: DEFAULT_CARD_IMAGE, filename: "logo-orion-redonda.jpg" }],
      coverIndex: 0
    }
  ];
}

function getDefaultCategories() {
  return [
    {
      id: crypto.randomUUID(),
      nome: "Sedans",
      slug: "sedan",
      ordem: 1,
      imagem: DEFAULT_CATEGORY_IMAGE
    },
    {
      id: crypto.randomUUID(),
      nome: "Hatchs",
      slug: "hatch",
      ordem: 2,
      imagem: DEFAULT_CATEGORY_IMAGE
    },
    {
      id: crypto.randomUUID(),
      nome: "SUVs",
      slug: "suv",
      ordem: 3,
      imagem: DEFAULT_CATEGORY_IMAGE
    },
    {
      id: crypto.randomUUID(),
      nome: "Picapes",
      slug: "picape",
      ordem: 4,
      imagem: DEFAULT_CATEGORY_IMAGE
    }
  ];
}

function getDefaultSiteSettings() {
  return {
    whatsapp: "5586999935385",
    instagram: "https://www.instagram.com/orionveiculos2004/",
    mapUrl:
      "https://www.google.com/maps/place/Av.+Jo%C3%A3o+XXIII,+1503+-+S%C3%A3o+Crist%C3%B3v%C3%A3o,+Teresina+-+PI,+64049-010/"
  };
}

function getDefaultHomeSettings() {
  return {
    badge: "Estoque selecionado • Atendimento rápido",
    title: "Encontre seu próximo carro na Orion Veículos",
    subtitle:
      "Uma experiência mais simples, profissional e direta para quem quer comprar com confiança. Veja nossos destaques e fale com a loja pelo WhatsApp.",
    primaryButtonText: "Ver estoque",
    secondaryButtonText: "Falar com a loja",
    whyTitle: "Por que comprar com a Orion?",
    whySubtitle: "Uma experiência mais simples, direta e profissional."
  };
}

function createDefaultContent() {
  return {
    categories: getDefaultCategories(),
    siteSettings: getDefaultSiteSettings(),
    homeSettings: getDefaultHomeSettings()
  };
}

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeStatus(status) {
  const normalized = normalizeText(status);

  if (normalized === "vendido") return "vendido";
  if (normalized === "reservado") return "reservado";
  return "disponivel";
}

function normalizeBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return Boolean(value);
}

function resolveImagePath(path) {
  const value = String(path || "").trim();

  if (!value) return "";

  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:")) {
    return value;
  }

  if (value.startsWith("/uploads/")) {
    return `${API_UPLOADS_BASE_URL}${value}`;
  }

  return value;
}

function normalizeCategory(category, index) {
  return {
    ...category,
    id: category?.id || crypto.randomUUID(),
    nome: category?.nome || category?.name || category?.titulo || "Categoria",
    slug:
      category?.slug ||
      normalizeText(
        category?.nome || category?.name || category?.titulo || `categoria-${index + 1}`
      ),
    ordem: Number(category?.ordem ?? index + 1),
    imagem:
      category?.imagem ||
      category?.image ||
      category?.imageUrl ||
      category?.imagemUrl ||
      category?.preview ||
      category?.foto ||
      DEFAULT_CATEGORY_IMAGE
  };
}

function setContentSettings(content) {
  const defaults = createDefaultContent();
  const source = content || {};

  contentSettings = {
    categories:
      Array.isArray(source.categories) && source.categories.length
        ? source.categories.map(normalizeCategory).sort((a, b) => Number(a.ordem || 0) - Number(b.ordem || 0))
        : defaults.categories,
    siteSettings: {
      ...defaults.siteSettings,
      ...(source.siteSettings || {})
    },
    homeSettings: {
      ...defaults.homeSettings,
      ...(source.homeSettings || {})
    }
  };

  return contentSettings;
}

function getCategories() {
  if (!contentSettings) {
    setContentSettings(createDefaultContent());
  }

  return contentSettings.categories;
}

function getSiteSettings() {
  if (!contentSettings) {
    setContentSettings(createDefaultContent());
  }

  return contentSettings.siteSettings;
}

function getHomeSettings() {
  if (!contentSettings) {
    setContentSettings(createDefaultContent());
  }

  return contentSettings.homeSettings;
}

function renderCategorySkeletons(count = 4) {
  if (!categoriesGrid) return;

  categoriesGrid.innerHTML = Array.from({ length: count })
    .map(() => `<div class="category-skeleton" aria-hidden="true"></div>`)
    .join("");
}

function renderHomeCarSkeletons(count = 4) {
  if (!carsGrid) return;

  carsGrid.innerHTML = Array.from({ length: count })
    .map(
      () => `
        <article class="car-skeleton" aria-hidden="true">
          <div class="car-skeleton-media"></div>
          <div class="car-skeleton-body">
            <div class="skeleton-line short"></div>
            <div class="skeleton-line long"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line short"></div>
            <div class="car-skeleton-actions">
              <div class="car-skeleton-button"></div>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function setFeaturedStatus(title = "", description = "") {
  if (!featuredStatus) return;

  if (!title) {
    featuredStatus.classList.add("hidden");
    featuredStatus.innerHTML = "";
    return;
  }

  featuredStatus.classList.remove("hidden");
  featuredStatus.innerHTML = `
    <strong>${title}</strong>
    <p>${description}</p>
  `;
}

function buildWhatsappLink(phone, text) {
  const cleanPhone = String(phone || "").replace(/\D/g, "");
  const encodedText = encodeURIComponent(String(text || "").trim());

  if (!cleanPhone) {
    return "#";
  }

  return `https://wa.me/${cleanPhone}${encodedText ? `?text=${encodedText}` : ""}`;
}

// Função auxiliar para fetch com timeout e tratamento de erro
async function fetchWithTimeout(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload?.message || `Erro HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Conexão perdida. A página demorou muito para carregar. Recarregue e tente novamente.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchContent() {
  try {
    const payload = await fetchWithTimeout(`${API_BASE_URL}/content`);
    return setContentSettings(payload?.data || {});
  } catch (error) {
    console.error("Erro ao buscar conteudo do backend:", error);
    // Mostrar mensagem de erro se houver um container
    if (featuredStatus) {
      featuredStatus.innerHTML = `<strong>⚠️ Erro ao carregar:</strong> <p>${error.message}</p>`;
    }
    return setContentSettings(createDefaultContent());
  }
}

function applyHomeSettings() {
  const settings = getHomeSettings();
  const siteSettings = getSiteSettings();

  if (homeBadge) homeBadge.textContent = settings.badge || "";
  if (homeTitle) homeTitle.textContent = settings.title || "";
  if (homeSubtitle) homeSubtitle.textContent = settings.subtitle || "";
  if (homeWhyTitle) homeWhyTitle.textContent = settings.whyTitle || "";
  if (homeWhySubtitle) homeWhySubtitle.textContent = settings.whySubtitle || "";

  if (homePrimaryButton) {
    homePrimaryButton.textContent = settings.primaryButtonText || "Ver estoque";
  }

  if (homeSecondaryButton) {
    homeSecondaryButton.textContent = settings.secondaryButtonText || "Falar com a loja";
    homeSecondaryButton.href = buildWhatsappLink(
      siteSettings.whatsapp,
      "Olá! Quero saber mais sobre os carros da Orion Veículos."
    );
  }

  if (navInstagramLink) {
    navInstagramLink.href = siteSettings.instagram || getDefaultSiteSettings().instagram;
  }

  if (contactInstagramButton) {
    contactInstagramButton.href =
      siteSettings.instagram || getDefaultSiteSettings().instagram;
  }

  const defaultMapsUrl = getDefaultSiteSettings().mapUrl;

  if (navWhatsappLink) {
    navWhatsappLink.href = buildWhatsappLink(
      siteSettings.whatsapp,
      "Olá! Quero atendimento da Orion Veículos."
    );
  }

  if (locationWhatsappButton) {
    locationWhatsappButton.href = buildWhatsappLink(
      siteSettings.whatsapp,
      "Olá! Quero saber mais sobre a localização da Orion Veículos."
    );
  }

  if (contactWhatsappButton) {
    contactWhatsappButton.href = buildWhatsappLink(
      siteSettings.whatsapp,
      "Olá! Quero atendimento da Orion Veículos."
    );
  }

  if (locationMapsButton) {
    locationMapsButton.href = siteSettings.mapUrl || defaultMapsUrl;
  }
}

function sortCars(cars) {
  return [...cars].sort((a, b) => Number(a.ordem || 0) - Number(b.ordem || 0));
}

function normalizeVehicleFromApi(car) {
  const rawImages = Array.isArray(car?.images) ? car.images : [];

  const normalizedImages = rawImages
    .map((image) => {
      if (!image) return null;

      if (typeof image === "string") {
        return {
          url: image,
          filename: ""
        };
      }

      return {
        url: String(image.url || "").trim(),
        filename: String(image.filename || "").trim()
      };
    })
    .filter((image) => image && image.url);

  return {
    ...car,
    destaque: normalizeBoolean(car?.destaque),
    destaqueHome: normalizeBoolean(car?.destaqueHome),
    status: normalizeStatus(car?.status),
    images: normalizedImages,
    coverIndex: Number(car?.coverIndex || 0)
  };
}

async function fetchVehicles() {
  try {
    const payload = await fetchWithTimeout(`${API_BASE_URL}/vehicles`);

    return Array.isArray(payload?.data)
      ? payload.data.map(normalizeVehicleFromApi)
      : [];
  } catch (error) {
    console.error("Erro ao buscar veículos do backend:", error);
    // Mostrar mensagem de erro
    if (featuredStatus) {
      featuredStatus.innerHTML = `<strong>⚠️ Erro ao carregar veículos:</strong> <p>${error.message}</p>`;
    }
    return getDefaultCars();
  }
}

function reorderImagesWithCoverFirst(car) {
  const images =
    Array.isArray(car.images) && car.images.length
      ? car.images
          .map((image) => resolveImagePath(typeof image === "string" ? image : image.url))
          .filter(Boolean)
      : [];

  if (!images.length) {
    return [];
  }

  const rawCoverIndex = Number(car.coverIndex);
  const safeCoverIndex =
    Number.isInteger(rawCoverIndex) && rawCoverIndex >= 0 && rawCoverIndex < images.length
      ? rawCoverIndex
      : 0;

  if (safeCoverIndex === 0) {
    return images;
  }

  const coverImage = images[safeCoverIndex];
  const remainingImages = images.filter((_, index) => index !== safeCoverIndex);
  return [coverImage, ...remainingImages];
}

function getCoverImage(car) {
  const orderedImages = reorderImagesWithCoverFirst(car);
  return orderedImages[0] || DEFAULT_CARD_IMAGE;
}

function isSold(car) {
  return normalizeStatus(car.status) === "vendido";
}

function isHeroFeatured(car) {
  return Boolean(car.destaque);
}

function isHomeFeatured(car) {
  return Boolean(
    typeof car.destaqueHome === "boolean" ? car.destaqueHome : car.destaque
  );
}

function getVisibleFeaturedCars(cars) {
  return sortCars(cars).filter((car) => isHomeFeatured(car) && !isSold(car));
}

function getHeroCar(cars) {
  const featuredAvailable = sortCars(cars).filter(
    (car) => isHeroFeatured(car) && !isSold(car)
  );

  if (featuredAvailable.length) {
    return featuredAvailable[0];
  }

  const homeFeaturedAvailable = sortCars(cars).find(
    (car) => isHomeFeatured(car) && !isSold(car)
  );

  if (homeFeaturedAvailable) {
    return homeFeaturedAvailable;
  }

  const firstAvailable = sortCars(cars).find((car) => !isSold(car));
  return firstAvailable || null;
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function fadeSwapImage(imgElement, newSrc, newAlt = "") {
  if (!imgElement || !newSrc) return;

  const currentSrc = imgElement.getAttribute("src");
  if (currentSrc === newSrc) {
    if (newAlt) imgElement.alt = newAlt;
    return;
  }

  imgElement.classList.add("is-fading");

  setTimeout(() => {
    imgElement.setAttribute("src", newSrc);
    if (newAlt) imgElement.alt = newAlt;
    imgElement.classList.remove("is-fading");
  }, FADE_DURATION_MS);
}

function updateHeroSlider() {
  if (!featuredCarImages.length) {
    heroDots.innerHTML = "";
    heroPrev.classList.add("hidden");
    heroNext.classList.add("hidden");
    return;
  }

  fadeSwapImage(
    heroMainImage,
    featuredCarImages[featuredCarIndex],
    "Imagem do veículo em destaque"
  );

  heroDots.innerHTML = featuredCarImages
    .map(
      (_, index) =>
        `<button class="slider-dot ${index === featuredCarIndex ? "active" : ""}" data-dot-index="${index}" type="button" aria-label="Ir para imagem ${index + 1}"></button>`
    )
    .join("");

  const hasMany = featuredCarImages.length > 1;
  heroPrev.classList.toggle("hidden", !hasMany);
  heroNext.classList.toggle("hidden", !hasMany);
}

function startHeroAutoplay() {
  stopHeroAutoplay();

  if (featuredCarImages.length <= 1) return;

  heroAutoplayInterval = setInterval(() => {
    featuredCarIndex = (featuredCarIndex + 1) % featuredCarImages.length;
    updateHeroSlider();
  }, HERO_AUTOPLAY_MS);
}

function stopHeroAutoplay() {
  if (heroAutoplayInterval) {
    clearInterval(heroAutoplayInterval);
    heroAutoplayInterval = null;
  }
}

function renderHero(car) {
  stopHeroAutoplay();

  if (!car) {
    featuredCarImages = [];
    featuredCarIndex = 0;
    heroMainImage.src = DEFAULT_CARD_IMAGE;
    heroMainImage.alt = "Carro em destaque Orion Veículos";
    heroTitle.textContent = "Nenhum veículo disponível no momento";
    heroSubtitle.textContent = "Consulte a Orion Veículos para novas ofertas.";
    updateHeroSlider();
    return;
  }

  featuredCarImages = reorderImagesWithCoverFirst(car);
  featuredCarIndex = 0;

  heroMainImage.src = featuredCarImages[0] || getCoverImage(car);
  heroMainImage.alt = car.titulo || "Carro em destaque Orion Veículos";
  heroTitle.textContent = car.titulo || "Veículo em destaque";
  heroSubtitle.textContent = `${car.preco || "-"} • ${car.km || "-"} • ${car.cidade || "-"}`;

  updateHeroSlider();
  startHeroAutoplay();
}

function renderCategories() {
  if (!categoriesGrid) return;

  const categories = getCategories();

  categoriesGrid.innerHTML = categories
    .map((category) => {
      const imageSrc = resolveImagePath(category.imagem) || DEFAULT_CATEGORY_IMAGE;
      const nome = category.nome || "Categoria";
      const slug = category.slug || normalizeText(nome);

      return `
        <a href="estoque/estoque.html?categoria=${encodeURIComponent(slug)}" class="category-card">
          <img src="${imageSrc}" alt="${nome}" />
          <span>${nome}</span>
        </a>
      `;
    })
    .join("");

  updateRailButtons(categoriesGrid, categoriesPrev, categoriesNext);
}

function renderFilterChips() {
  if (!filtersWrap) return;

  const fixedFilters = [
    { label: "Todos", filter: "todos", active: true },
    { label: "Automáticos", filter: "automatico" },
    { label: "Econômicos", filter: "economico" }
  ];

  const usedFilters = new Set(fixedFilters.map((item) => item.filter));
  const categoryFilters = getCategories()
    .map((category) => {
      const label = category.nome || "Categoria";
      const filter = normalizeText(category.slug || label);
      return { label, filter };
    })
    .filter((item) => {
      if (!item.filter || usedFilters.has(item.filter)) return false;
      usedFilters.add(item.filter);
      return true;
    });

  filtersWrap.innerHTML = [...fixedFilters, ...categoryFilters]
    .map(
      (item) => `
        <button
          class="filter-chip ${item.active ? "active" : ""} ${item.filter !== "todos" && !["automatico", "economico"].includes(item.filter) ? "dynamic-category" : ""}"
          data-filter="${item.filter}"
          type="button"
        >${item.label}</button>
      `
    )
    .join("");

  updateRailButtons(filtersWrap, filtersPrev, filtersNext);
}

function getCarSearchTags(car) {
  return [
    car.tags,
    car.titulo,
    car.marca,
    car.modelo,
    car.ano,
    car.combustivel,
    car.km,
    car.preco,
    car.cidade,
    car.categoria,
    car.tag,
    car.status
  ]
    .filter(Boolean)
    .join(" ");
}

function scrollRail(rail, direction = 1) {
  if (!rail) return;

  const distance = Math.max(rail.clientWidth * 0.82, 280);
  rail.scrollBy({ left: distance * direction, behavior: "smooth" });
}

function updateRailButtons(rail, prevButton, nextButton) {
  if (!rail || !prevButton || !nextButton) return;

  const maxScrollLeft = Math.max(rail.scrollWidth - rail.clientWidth, 0);
  const hasOverflow = maxScrollLeft > 8;
  const currentLeft = rail.scrollLeft;

  prevButton.classList.toggle("is-disabled", !hasOverflow || currentLeft <= 8);
  nextButton.classList.toggle("is-disabled", !hasOverflow || currentLeft >= maxScrollLeft - 8);
}

function setupHorizontalRail(rail, prevButton, nextButton) {
  if (!rail || !prevButton || !nextButton) return;

  prevButton.addEventListener("click", () => scrollRail(rail, -1));
  nextButton.addEventListener("click", () => scrollRail(rail, 1));

  rail.addEventListener("scroll", () => updateRailButtons(rail, prevButton, nextButton), {
    passive: true
  });

  window.addEventListener("resize", () => updateRailButtons(rail, prevButton, nextButton));
  setTimeout(() => updateRailButtons(rail, prevButton, nextButton), 80);
}


function createCardMarkup(car) {
  const siteSettings = getSiteSettings();
  const whatsappLink = buildWhatsappLink(
    siteSettings.whatsapp,
    car.whatsappText || `Olá! Tenho interesse no veículo ${car.titulo}.`
  );

  const categoria = car.categoria
    ? car.categoria.charAt(0).toUpperCase() + car.categoria.slice(1)
    : "";

  const images = reorderImagesWithCoverFirst(car);
  const firstImage = images[0] || getCoverImage(car);

  return `
    <article class="car-card" data-tags="${getCarSearchTags(car)}">
      <div class="car-slider" data-slider-id="${car._id || car.id}">
        <button class="slider-btn prev ${images.length <= 1 ? "hidden" : ""}" type="button" data-action="prev">‹</button>
        <img src="${firstImage}" alt="${car.titulo}" />
        <button class="slider-btn next ${images.length <= 1 ? "hidden" : ""}" type="button" data-action="next">›</button>
        <div class="slider-dots">
          ${images
            .map(
              (_, index) => `
            <button
              class="slider-dot ${index === 0 ? "active" : ""}"
              type="button"
              data-action="dot"
              data-dot-index="${index}"
            ></button>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="car-body">
        <span class="car-tag">${car.tag || "Destaque"}</span>
        <h3>${car.titulo || "Veículo"}</h3>
        <p class="car-subtitle">${car.ano || "-"} • ${car.combustivel || "-"} • ${car.km || "-"}</p>
        <strong class="car-price">${car.preco || "-"}</strong>

        <div class="car-meta">
          <span>${car.cidade || "-"}</span>
          <span>${categoria || "-"}</span>
        </div>

        <a
          class="car-button"
          href="${whatsappLink}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tenho interesse
        </a>
      </div>
    </article>
  `;
}

function renderCars() {
  if (!carsGrid) return;

  const featuredCars = getVisibleFeaturedCars(allCars);
  const cardsToRender = featuredCars.slice(0, 4);

  carsGrid.innerHTML = cardsToRender.map(createCardMarkup).join("");

  const heroCar = getHeroCar(allCars);
  renderHero(heroCar);

  if (!cardsToRender.length) {
    carsGrid.innerHTML = "";
    setFeaturedStatus(
      "Nenhum destaque disponível agora",
      "O estoque pode estar sendo atualizado. Você ainda pode falar com a loja ou abrir o estoque completo."
    );
    return;
  }

  setFeaturedStatus();
  setupCardSliders(cardsToRender);
}

function setupCardSliders(cars) {
  const sliderMap = new Map();

  cars.forEach((car) => {
    const images = reorderImagesWithCoverFirst(car);

    sliderMap.set(car._id || car.id, {
      images,
      currentIndex: 0,
      intervalId: null
    });
  });

  document.querySelectorAll(".car-slider").forEach((sliderEl) => {
    const sliderId = sliderEl.dataset.sliderId;
    const imgEl = sliderEl.querySelector("img");
    const dotsWrap = sliderEl.querySelector(".slider-dots");
    const sliderData = sliderMap.get(sliderId);

    if (!sliderData || !imgEl || !dotsWrap) return;

    const renderSliderState = () => {
      fadeSwapImage(
        imgEl,
        sliderData.images[sliderData.currentIndex],
        "Imagem do veículo"
      );

      dotsWrap.innerHTML = sliderData.images
        .map(
          (_, index) => `
          <button
            class="slider-dot ${index === sliderData.currentIndex ? "active" : ""}"
            type="button"
            data-action="dot"
            data-dot-index="${index}"
          ></button>
        `
        )
        .join("");
    };

    const nextSlide = () => {
      if (sliderData.images.length <= 1) return;
      sliderData.currentIndex = (sliderData.currentIndex + 1) % sliderData.images.length;
      renderSliderState();
    };

    const startAutoplay = () => {
      if (sliderData.intervalId || sliderData.images.length <= 1) return;

      sliderData.intervalId = setInterval(() => {
        nextSlide();
      }, CARD_AUTOPLAY_MS);
    };

    const stopAutoplay = () => {
      if (sliderData.intervalId) {
        clearInterval(sliderData.intervalId);
        sliderData.intervalId = null;
      }
    };

    sliderEl.addEventListener("click", (event) => {
      const actionEl = event.target.closest("[data-action]");
      if (!actionEl) return;

      const action = actionEl.dataset.action;

      if (action === "prev") {
        sliderData.currentIndex =
          (sliderData.currentIndex - 1 + sliderData.images.length) % sliderData.images.length;
      }

      if (action === "next") {
        sliderData.currentIndex =
          (sliderData.currentIndex + 1) % sliderData.images.length;
      }

      if (action === "dot") {
        sliderData.currentIndex = Number(actionEl.dataset.dotIndex);
      }

      renderSliderState();
      stopAutoplay();
      startAutoplay();
    });

    sliderEl.addEventListener("mouseenter", stopAutoplay);
    sliderEl.addEventListener("mouseleave", startAutoplay);
    sliderEl.addEventListener("touchstart", stopAutoplay, { passive: true });
    sliderEl.addEventListener("touchend", startAutoplay, { passive: true });

    renderSliderState();
    startAutoplay();
  });
}

function applyFilters() {
  const query = normalizeText(searchInput?.value);
  const activeFilter =
    document.querySelector(".filter-chip.active")?.dataset.filter || "todos";
  const carCards = document.querySelectorAll(".car-card");

  carCards.forEach((card) => {
    const tags = normalizeText(card.dataset.tags || "");
    const matchesSearch = query === "" || tags.includes(query);
    const matchesFilter = activeFilter === "todos" || tags.includes(activeFilter);

    if (matchesSearch && matchesFilter) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

function updateThemeButton() {
  if (!themeToggle || !themeIcon) return;

  const isLight = document.body.classList.contains("light-mode");
  themeIcon.textContent = isLight ? "☾" : "☀";
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Ativar modo escuro" : "Ativar modo claro"
  );
  themeToggle.setAttribute("title", isLight ? "Modo escuro" : "Modo claro");
}

function toggleTheme() {
  const isLight = document.body.classList.toggle("light-mode");
  localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
  updateThemeButton();
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
    localStorage.setItem(THEME_KEY, "dark");
  }

  updateThemeButton();
}

function goToPrevHeroImage() {
  if (featuredCarImages.length <= 1) return;
  featuredCarIndex =
    (featuredCarIndex - 1 + featuredCarImages.length) % featuredCarImages.length;
  updateHeroSlider();
  startHeroAutoplay();
}

function goToNextHeroImage() {
  if (featuredCarImages.length <= 1) return;
  featuredCarIndex = (featuredCarIndex + 1) % featuredCarImages.length;
  updateHeroSlider();
  startHeroAutoplay();
}

function openMobileMenu() {
  if (!navLinks || !menuToggle || !mobileNavOverlay) return;
  navLinks.classList.add("open");
  mobileNavOverlay.classList.add("show");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.innerHTML = '<i class="bi bi-x-lg"></i>';
}

function closeMobileMenu() {
  if (!navLinks || !menuToggle || !mobileNavOverlay) return;
  navLinks.classList.remove("open");
  mobileNavOverlay.classList.remove("show");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i class="bi bi-list"></i>';
}

function toggleMobileMenu() {
  if (!navLinks) return;

  if (navLinks.classList.contains("open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

if (searchButton) {
  searchButton.addEventListener("click", applyFilters);
}

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

if (filtersWrap) {
  filtersWrap.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-chip");
    if (!button) return;

    filtersWrap.querySelectorAll(".filter-chip").forEach((btn) =>
      btn.classList.remove("active")
    );

    button.classList.add("active");
    applyFilters();
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

if (heroPrev) {
  heroPrev.addEventListener("click", () => {
    stopHeroAutoplay();
    goToPrevHeroImage();
  });
}

if (heroNext) {
  heroNext.addEventListener("click", () => {
    stopHeroAutoplay();
    goToNextHeroImage();
  });
}

if (heroDots) {
  heroDots.addEventListener("click", (event) => {
    const dot = event.target.closest(".slider-dot");
    if (!dot) return;

    stopHeroAutoplay();
    featuredCarIndex = Number(dot.dataset.dotIndex);
    updateHeroSlider();
    startHeroAutoplay();
  });
}

const heroSliderElement = document.getElementById("heroSlider");
if (heroSliderElement) {
  heroSliderElement.addEventListener("mouseenter", stopHeroAutoplay);
  heroSliderElement.addEventListener("mouseleave", startHeroAutoplay);
  heroSliderElement.addEventListener("touchstart", stopHeroAutoplay, { passive: true });
  heroSliderElement.addEventListener("touchend", startHeroAutoplay, { passive: true });
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileMenu);
}

if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener("click", closeMobileMenu);
}

navLinkAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 680) {
      closeMobileMenu();
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 680) {
    closeMobileMenu();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

async function initHome() {
  loadTheme();
  renderCategorySkeletons();
  renderHomeCarSkeletons();
  await fetchContent();
  applyHomeSettings();
  renderCategories();
  renderFilterChips();
  setupHorizontalRail(categoriesGrid, categoriesPrev, categoriesNext);
  setupHorizontalRail(filtersWrap, filtersPrev, filtersNext);

  allCars = await fetchVehicles();

  renderCars();
  applyFilters();
  setupRevealAnimations();
  closeMobileMenu();
}

initHome();
