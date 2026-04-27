const API_ORIGIN =
  window.location.protocol === "file:"
    ? "http://localhost:5000"
    : window.ORION_API_ORIGIN ||
      `${window.location.protocol}//${window.location.hostname}:5000`;

const API_BASE_URL = `${API_ORIGIN}/api`;
const API_UPLOADS_BASE_URL = API_ORIGIN;

const CARD_AUTOPLAY_MS = 4000;
const FADE_DURATION_MS = 220;
const DEFAULT_CARD_IMAGE = "../imagens/logo-orion-redonda.jpg";

const stockSearchInput = document.getElementById("stockSearchInput");
const brandFilter = document.getElementById("brandFilter");
const categoryFilter = document.getElementById("categoryFilter");
const fuelFilter = document.getElementById("fuelFilter");
const statusFilter = document.getElementById("statusFilter");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter");
const applyFiltersButton = document.getElementById("applyFiltersButton");
const clearFiltersButton = document.getElementById("clearFiltersButton");
const stockCarsGrid = document.getElementById("stockCarsGrid");
const resultsCount = document.getElementById("resultsCount");
const activeFilters = document.getElementById("activeFilters");
const stockStatusMessage = document.getElementById("stockStatusMessage");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const navInstagramLink = document.getElementById("navInstagramLink");
const navWhatsappLink = document.getElementById("navWhatsappLink");
const toolbarInstagramLink = document.getElementById("toolbarInstagramLink");
const toolbarWhatsappLink = document.getElementById("toolbarWhatsappLink");

const filtersCard = document.getElementById("filtersCard");
const openFiltersButton = document.getElementById("openFiltersButton");
const closeFiltersButton = document.getElementById("closeFiltersButton");
const mobileFiltersOverlay = document.getElementById("mobileFiltersOverlay");
const navLinkAnchors = navLinks ? navLinks.querySelectorAll("a") : [];

let allCars = [];
let contentSettings = null;

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeStatus(status) {
  const normalized = normalizeText(status);

  if (normalized === "disponivel") return "disponivel";
  if (normalized === "reservado") return "reservado";
  if (normalized === "vendido") return "vendido";

  return "disponivel";
}

function getStatusLabel(status) {
  const normalized = normalizeStatus(status);

  const labels = {
    disponivel: "Disponível",
    reservado: "Reservado",
    vendido: "Vendido"
  };

  return labels[normalized];
}

function normalizeBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return Boolean(value);
}

function getDefaultCars() {
  return [
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
      status: "disponivel",
      tag: "Automático",
      ordem: 1,
      destaque: false,
      destaqueHome: true,
      descricao: "Veículo robusto e muito bem conservado.",
      opcionais: "Central multimídia, couro, 4x4",
      tags: "toyota hilux picape diesel 4x4 automatico",
      whatsappText: "Olá! Tenho interesse na Toyota Hilux SR 2.8 4x4.",
      images: [{ url: DEFAULT_CARD_IMAGE, filename: "logo-orion-redonda.jpg" }],
      coverIndex: 0
    },
    {
      _id: crypto.randomUUID(),
      titulo: "Fiat Strada Freedom 1.3 CD",
      marca: "Fiat",
      modelo: "Strada",
      ano: "2023/2024",
      combustivel: "Flex",
      km: "26.000 km",
      preco: "R$ 109.900,00",
      cidade: "Teresina - PI",
      categoria: "picape",
      status: "disponivel",
      tag: "Manual",
      ordem: 2,
      destaque: false,
      destaqueHome: true,
      descricao: "Veículo muito conservado.",
      opcionais: "Ar",
      tags: "fiat strada freedom 1.3 cd picape flex manual",
      whatsappText: "Olá! Tenho interesse na Fiat Strada Freedom 1.3 CD.",
      images: [{ url: DEFAULT_CARD_IMAGE, filename: "logo-orion-redonda.jpg" }],
      coverIndex: 0
    }
  ];
}

function getDefaultCategories() {
  return [
    { id: crypto.randomUUID(), slug: "sedan", nome: "Sedans" },
    { id: crypto.randomUUID(), slug: "hatch", nome: "Hatchs" },
    { id: crypto.randomUUID(), slug: "suv", nome: "SUVs" },
    { id: crypto.randomUUID(), slug: "picape", nome: "Picapes" }
  ];
}

function getDefaultSiteSettings() {
  return {
    whatsapp: "5586999935385",
    instagram: "https://www.instagram.com/orionveiculos2004/"
  };
}

function setContentSettings(content) {
  const defaults = {
    categories: getDefaultCategories(),
    siteSettings: getDefaultSiteSettings()
  };

  const source = content || {};

  contentSettings = {
    categories:
      Array.isArray(source.categories) && source.categories.length
        ? source.categories.map((category, index) => ({
            ...category,
            id: category?.id || crypto.randomUUID(),
            nome: category?.nome || category?.name || category?.titulo || "Categoria",
            slug:
              category?.slug ||
              normalizeText(
                category?.nome ||
                  category?.name ||
                  category?.titulo ||
                  `categoria-${index + 1}`
              )
          }))
        : defaults.categories,
    siteSettings: {
      ...defaults.siteSettings,
      ...(source.siteSettings || {})
    }
  };

  return contentSettings;
}

function getCategories() {
  if (!contentSettings) {
    setContentSettings();
  }

  return contentSettings.categories;
}

function buildWhatsappLink(phone, text) {
  const cleanPhone = String(phone || "").replace(/\D/g, "");
  const encodedText = encodeURIComponent(String(text || "").trim());

  if (!cleanPhone) return "#";

  return `https://wa.me/${cleanPhone}${encodedText ? `?text=${encodedText}` : ""}`;
}

function getSiteSettings() {
  return contentSettings?.siteSettings || getDefaultSiteSettings();
}

function setStockStatusMessage(title = "", description = "") {
  if (!stockStatusMessage) return;

  if (!title) {
    stockStatusMessage.classList.add("hidden");
    stockStatusMessage.innerHTML = "";
    return;
  }

  stockStatusMessage.classList.remove("hidden");
  stockStatusMessage.innerHTML = `
    <strong>${title}</strong>
    <p>${description}</p>
  `;
}

function renderStockSkeletons(count = 4) {
  if (!stockCarsGrid) return;

  stockCarsGrid.innerHTML = Array.from({ length: count })
    .map(
      () => `
        <article class="stock-skeleton" aria-hidden="true">
          <div class="stock-skeleton-media"></div>
          <div class="stock-skeleton-body">
            <div class="stock-skeleton-line short"></div>
            <div class="stock-skeleton-line long"></div>
            <div class="stock-skeleton-line medium"></div>
            <div class="stock-skeleton-line short"></div>
            <div class="stock-skeleton-actions">
              <div class="stock-skeleton-button"></div>
              <div class="stock-skeleton-button"></div>
            </div>
          </div>
        </article>
      `
    )
    .join("");
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
    // Mostrar mensagem de erro
    if (stockStatusMessage) {
      stockStatusMessage.innerHTML = `<strong>⚠️ Erro ao carregar:</strong> <p>${error.message}</p>`;
    }
    return setContentSettings();
  }
}

function applySiteSettings() {
  const settings = contentSettings?.siteSettings || getDefaultSiteSettings();
  const instagramUrl = settings.instagram || getDefaultSiteSettings().instagram;
  const whatsappUrl = buildWhatsappLink(
    settings.whatsapp,
    "Olá! Quero atendimento da Orion Veículos."
  );

  if (navInstagramLink) navInstagramLink.href = instagramUrl;
  if (toolbarInstagramLink) toolbarInstagramLink.href = instagramUrl;
  if (navWhatsappLink) navWhatsappLink.href = whatsappUrl;
  if (toolbarWhatsappLink) toolbarWhatsappLink.href = whatsappUrl;
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
    if (stockStatusMessage) {
      stockStatusMessage.innerHTML = `<strong>⚠️ Erro ao carregar veículos:</strong> <p>${error.message}</p>`;
    }
    return getDefaultCars();
  }
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

function extractPriceNumber(priceText) {
  return (
    Number(
      String(priceText || "")
        .replace(/[^\d,]/g, "")
        .replace(/\./g, "")
        .replace(",", ".")
    ) || 0
  );
}

function extractKmNumber(kmText) {
  return Number(String(kmText || "").replace(/[^\d]/g, "")) || 0;
}

function resolveImagePath(path) {
  const value = String(path || "").trim();

  if (!value) return "";

  if (value.startsWith("data:")) return value;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/uploads/")) return `${API_UPLOADS_BASE_URL}${value}`;
  if (value.startsWith("../")) return value;

  return `../${value}`;
}

function reorderImagesWithCoverFirst(car) {
  const images =
    Array.isArray(car.images) && car.images.length
      ? car.images
          .map((image) => resolveImagePath(typeof image === "string" ? image : image.url))
          .filter(Boolean)
      : [];

  if (!images.length) return [];

  const rawCoverIndex = Number(car.coverIndex);
  const safeCoverIndex =
    Number.isInteger(rawCoverIndex) && rawCoverIndex >= 0 && rawCoverIndex < images.length
      ? rawCoverIndex
      : 0;

  if (safeCoverIndex === 0) return images;

  const coverImage = images[safeCoverIndex];
  const remainingImages = images.filter((_, index) => index !== safeCoverIndex);
  return [coverImage, ...remainingImages];
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

function populateDynamicFilters() {
  const cars = allCars;
  const categories = getCategories();

  const marcas = [...new Set(cars.map((car) => String(car.marca || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  const combustiveis = [...new Set(cars.map((car) => String(car.combustivel || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  brandFilter.innerHTML = `
    <option value="todos">Todas</option>
    ${marcas.map((marca) => `<option value="${normalizeText(marca)}">${marca}</option>`).join("")}
  `;

  categoryFilter.innerHTML = `
    <option value="todos">Todas</option>
    ${categories
      .map((categoria) => `<option value="${normalizeText(categoria.slug)}">${categoria.nome}</option>`)
      .join("")}
  `;

  fuelFilter.innerHTML = `
    <option value="todos">Todos</option>
    ${combustiveis
      .map((combustivel) => `<option value="${normalizeText(combustivel)}">${combustivel}</option>`)
      .join("")}
  `;
}

function createCard(car) {
  const images = reorderImagesWithCoverFirst(car);
  const firstImage = images[0] || DEFAULT_CARD_IMAGE;
  const siteSettings = getSiteSettings();
  const whatsappLink = buildWhatsappLink(
    siteSettings.whatsapp,
    car.whatsappText || `Olá! Tenho interesse no veículo ${car.titulo}.`
  );
  const normalizedStatus = normalizeStatus(car.status);
  const statusClass = `status-${normalizedStatus}`;
  const vehicleId = car._id || car.id;
  const detailLink = `../veiculo/veiculo.html?id=${encodeURIComponent(vehicleId)}`;

  return `
    <article class="car-card ${normalizedStatus === "vendido" ? "is-sold" : ""}" data-tags="${car.tags || ""}">
      <div class="car-slider" data-slider-id="${vehicleId}">
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
        <div class="car-tag-row">
          <span class="car-tag">${car.tag || "Destaque"}</span>
          <span class="status-badge ${statusClass}">${getStatusLabel(normalizedStatus)}</span>
        </div>

        <h3>${car.titulo}</h3>
        <p class="car-subtitle">${car.ano || "-"} • ${car.combustivel || "-"} • ${car.km || "-"}</p>
        <strong class="car-price">${car.preco || "-"}</strong>

        <div class="car-meta">
          <span>${car.cidade || "-"}</span>
          <span>${car.categoria ? car.categoria.charAt(0).toUpperCase() + car.categoria.slice(1) : ""}</span>
        </div>

        <div class="car-actions">
          <a class="btn-secondary" href="${detailLink}">Ver detalhes</a>
          ${
            normalizedStatus === "vendido"
              ? `<span class="btn-disabled-sold">Veículo vendido</span>`
              : `<a class="btn-primary" href="${whatsappLink}" target="_blank" rel="noopener noreferrer">Tenho interesse</a>`
          }
        </div>
      </div>
    </article>
  `;
}

function setupCardSliders(cars) {
  const sliderMap = new Map();

  cars.forEach((car) => {
    const vehicleId = car._id || car.id;

    sliderMap.set(vehicleId, {
      images: reorderImagesWithCoverFirst(car),
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
      sliderData.currentIndex =
        (sliderData.currentIndex + 1) % sliderData.images.length;
      renderSliderState();
    };

    const startAutoplay = () => {
      if (sliderData.intervalId || sliderData.images.length <= 1) return;
      sliderData.intervalId = setInterval(nextSlide, CARD_AUTOPLAY_MS);
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
          (sliderData.currentIndex - 1 + sliderData.images.length) %
          sliderData.images.length;
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

    renderSliderState();
    startAutoplay();
  });
}

function buildActiveFilterBadges(filters) {
  const badges = [];

  if (filters.queryLabel) badges.push(`Busca: ${filters.queryLabel}`);
  if (filters.brandLabel !== "Todos") badges.push(`Marca: ${filters.brandLabel}`);
  if (filters.categoryLabel !== "Todas") badges.push(`Categoria: ${filters.categoryLabel}`);
  if (filters.fuelLabel !== "Todos") badges.push(`Combustível: ${filters.fuelLabel}`);
  if (filters.statusLabel !== "Todos") badges.push(`Status: ${filters.statusLabel}`);
  if (filters.priceLabel !== "Todas") badges.push(`Preço: ${filters.priceLabel}`);

  activeFilters.innerHTML = badges
    .map((badge) => `<span class="filter-badge">${badge}</span>`)
    .join("");
}

function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    busca: params.get("busca") || "",
    categoria: params.get("categoria") || "todos"
  };
}

function syncFiltersFromURL() {
  const params = getURLParams();

  if (params.busca) {
    stockSearchInput.value = params.busca;
  }

  if (
    params.categoria &&
    categoryFilter.querySelector(`option[value="${params.categoria}"]`)
  ) {
    categoryFilter.value = params.categoria;
  }
}

function compareCarsWithSoldLast(a, b, compareFn) {
  const aSold = normalizeStatus(a.status) === "vendido";
  const bSold = normalizeStatus(b.status) === "vendido";

  if (aSold && !bSold) return 1;
  if (!aSold && bSold) return -1;

  return compareFn(a, b);
}

function sortCarsByMode(cars, sortMode) {
  const cloned = [...cars];

  switch (sortMode) {
    case "menor-preco":
      return cloned.sort((a, b) =>
        compareCarsWithSoldLast(
          a,
          b,
          (carA, carB) => extractPriceNumber(carA.preco) - extractPriceNumber(carB.preco)
        )
      );

    case "maior-preco":
      return cloned.sort((a, b) =>
        compareCarsWithSoldLast(
          a,
          b,
          (carA, carB) => extractPriceNumber(carB.preco) - extractPriceNumber(carA.preco)
        )
      );

    case "menor-km":
      return cloned.sort((a, b) =>
        compareCarsWithSoldLast(
          a,
          b,
          (carA, carB) => extractKmNumber(carA.km) - extractKmNumber(carB.km)
        )
      );

    case "marca":
      return cloned.sort((a, b) =>
        compareCarsWithSoldLast(
          a,
          b,
          (carA, carB) => String(carA.marca).localeCompare(String(carB.marca), "pt-BR")
        )
      );

    case "ordem":
    default:
      return cloned.sort((a, b) =>
        compareCarsWithSoldLast(
          a,
          b,
          (carA, carB) => Number(carA.ordem || 0) - Number(carB.ordem || 0)
        )
      );
  }
}

function applyFilters() {
  const filters = {
    query: normalizeText(stockSearchInput.value),
    queryLabel: stockSearchInput.value.trim(),
    brand: normalizeText(brandFilter.value),
    brandLabel: brandFilter.options[brandFilter.selectedIndex]?.text || "Todos",
    category: normalizeText(categoryFilter.value),
    categoryLabel: categoryFilter.options[categoryFilter.selectedIndex]?.text || "Todas",
    fuel: normalizeText(fuelFilter.value),
    fuelLabel: fuelFilter.options[fuelFilter.selectedIndex]?.text || "Todos",
    status: normalizeText(statusFilter.value),
    statusLabel: statusFilter.options[statusFilter.selectedIndex]?.text || "Todos",
    price: normalizeText(priceFilter.value),
    priceLabel: priceFilter.options[priceFilter.selectedIndex]?.text || "Todas",
    sort: normalizeText(sortFilter.value)
  };

  let cars = allCars.filter((car) => {
    const haystack = normalizeText(
      [
        car.titulo,
        car.marca,
        car.modelo,
        car.ano,
        car.combustivel,
        car.categoria,
        car.tags,
        car.descricao,
        car.opcionais,
        car.status
      ].join(" ")
    );

    const priceNumber = extractPriceNumber(car.preco);

    const matchesQuery = !filters.query || haystack.includes(filters.query);
    const matchesBrand =
      filters.brand === "todos" || normalizeText(car.marca) === filters.brand;
    const matchesCategory =
      filters.category === "todos" ||
      normalizeText(car.categoria) === filters.category;
    const matchesFuel =
      filters.fuel === "todos" ||
      normalizeText(car.combustivel) === filters.fuel;
    const matchesStatus =
      filters.status === "todos" ||
      normalizeStatus(car.status) === normalizeStatus(filters.status);

    let matchesPrice = true;
    if (filters.price === "ate80000") matchesPrice = priceNumber <= 80000;
    if (filters.price === "80001a120000") {
      matchesPrice = priceNumber > 80000 && priceNumber <= 120000;
    }
    if (filters.price === "120001a170000") {
      matchesPrice = priceNumber > 120000 && priceNumber <= 170000;
    }
    if (filters.price === "acima170000") matchesPrice = priceNumber > 170000;

    return (
      matchesQuery &&
      matchesBrand &&
      matchesCategory &&
      matchesFuel &&
      matchesStatus &&
      matchesPrice
    );
  });

  cars = sortCarsByMode(cars, filters.sort);

  resultsCount.textContent = `${cars.length} veículo${cars.length === 1 ? "" : "s"} encontrado${cars.length === 1 ? "" : "s"}`;
  buildActiveFilterBadges(filters);

  if (!cars.length) {
    setStockStatusMessage(
      "Nenhum veículo encontrado com os filtros atuais",
      "Ajuste os filtros para ampliar a busca ou fale com a loja para verificar outras opções disponíveis."
    );
    stockCarsGrid.innerHTML = `
      <div class="empty-state">
        Nenhum veículo encontrado com os filtros aplicados.
      </div>
    `;
    closeMobileFilters();
    return;
  }

  setStockStatusMessage();
  stockCarsGrid.innerHTML = cars.map(createCard).join("");
  setupCardSliders(cars);
  closeMobileFilters();
}

function clearFilters() {
  stockSearchInput.value = "";
  brandFilter.value = "todos";
  categoryFilter.value = "todos";
  fuelFilter.value = "todos";
  statusFilter.value = "todos";
  priceFilter.value = "todos";
  sortFilter.value = "ordem";
  applyFilters();
}

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark-mode");
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
  themeToggle.setAttribute("title", isDark ? "Modo claro" : "Modo escuro");
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("orion-theme", isDark ? "dark" : "light");
  updateThemeButton();
}

function loadTheme() {
  const savedTheme = localStorage.getItem("orion-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  updateThemeButton();
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

function openMobileFilters() {
  if (!filtersCard || !mobileFiltersOverlay) return;
  filtersCard.classList.add("open");
  mobileFiltersOverlay.classList.add("show");
  document.body.classList.add("filters-open");
}

function closeMobileFilters() {
  if (!filtersCard || !mobileFiltersOverlay) return;
  filtersCard.classList.remove("open");
  mobileFiltersOverlay.classList.remove("show");
  document.body.classList.remove("filters-open");
}

applyFiltersButton.addEventListener("click", applyFilters);
clearFiltersButton.addEventListener("click", clearFilters);
themeToggle.addEventListener("click", toggleTheme);

stockSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyFilters();
  }
});

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileMenu);
}

if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener("click", closeMobileMenu);
}

navLinkAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 760) {
      closeMobileMenu();
    }
  });
});

if (openFiltersButton) {
  openFiltersButton.addEventListener("click", openMobileFilters);
}

if (closeFiltersButton) {
  closeFiltersButton.addEventListener("click", closeMobileFilters);
}

if (mobileFiltersOverlay) {
  mobileFiltersOverlay.addEventListener("click", closeMobileFilters);
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMobileMenu();
    closeMobileFilters();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
    closeMobileFilters();
  }
});

async function initStock() {
  loadTheme();
  renderStockSkeletons();
  await fetchContent();
  applySiteSettings();

  allCars = await fetchVehicles();

  populateDynamicFilters();
  syncFiltersFromURL();
  applyFilters();
  closeMobileMenu();
  closeMobileFilters();
}

initStock();
