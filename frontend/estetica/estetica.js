const API_ORIGIN =
  window.location.protocol === "file:"
    ? "http://localhost:5000"
    : window.ORION_API_ORIGIN ||
      `${window.location.protocol}//${window.location.hostname}:5000`;

const API_BASE_URL = `${API_ORIGIN}/api`;
const THEME_KEY = "orion-theme";

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const navLinkAnchors = navLinks ? navLinks.querySelectorAll("a") : [];

/* =========================
   ELEMENTOS DA PÁGINA
========================= */
const navInstagramLink = document.getElementById("navInstagramLink");
const navWhatsappLink = document.getElementById("navWhatsappLink");

const heroBadge = document.getElementById("heroBadge");
const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");
const heroPrimaryButton = document.getElementById("heroPrimaryButton");
const heroSecondaryButton = document.getElementById("heroSecondaryButton");
const heroImage = document.getElementById("heroImage");

const servicesSectionTitle = document.getElementById("servicesSectionTitle");
const servicesSectionSubtitle = document.getElementById("servicesSectionSubtitle");
const servicesGrid = document.getElementById("servicesGrid");

const processSectionTitle = document.getElementById("processSectionTitle");
const processSectionSubtitle = document.getElementById("processSectionSubtitle");

const gallerySectionTitle = document.getElementById("gallerySectionTitle");
const gallerySectionSubtitle = document.getElementById("gallerySectionSubtitle");
const galleryMainImage = document.getElementById("galleryMainImage");
const galleryImage1 = document.getElementById("galleryImage1");
const galleryImage2 = document.getElementById("galleryImage2");
const galleryImage3 = document.getElementById("galleryImage3");
const galleryImage4 = document.getElementById("galleryImage4");
const galleryPlaceholder1 = document.getElementById("galleryPlaceholder1");
const galleryPlaceholder2 = document.getElementById("galleryPlaceholder2");
const galleryPlaceholder3 = document.getElementById("galleryPlaceholder3");
const galleryPlaceholder4 = document.getElementById("galleryPlaceholder4");

const ctaBadge = document.getElementById("ctaBadge");
const ctaTitle = document.getElementById("ctaTitle");
const ctaSubtitle = document.getElementById("ctaSubtitle");
const ctaPrimaryButton = document.getElementById("ctaPrimaryButton");
const ctaSecondaryButton = document.getElementById("ctaSecondaryButton");

const locationSectionTitle = document.getElementById("locationSectionTitle");
const locationSectionSubtitle = document.getElementById("locationSectionSubtitle");
const locationName = document.getElementById("locationName");
const locationLabel = document.getElementById("locationLabel");
const locationAddress1 = document.getElementById("locationAddress1");
const locationAddress2 = document.getElementById("locationAddress2");
const locationInstagram = document.getElementById("locationInstagram");
const mapsOpenButton = document.getElementById("mapsOpenButton");
const locationWhatsappButton = document.getElementById("locationWhatsappButton");
const locationMapFrame = document.getElementById("locationMapFrame");
let esteticaSettingsCache = null;

/* =========================
   DADOS PADRÃO
========================= */
function getDefaultServices() {
  return [
    {
      id: crypto.randomUUID(),
      title: "Revitalização Completa",
      text: "Realce visual, brilho e acabamento para renovar a aparência do veículo."
    },
    {
      id: crypto.randomUUID(),
      title: "Higienização Interna",
      text: "Limpeza detalhada com foco em conforto, aparência e conservação do interior."
    },
    {
      id: crypto.randomUUID(),
      title: "Proteção de Superfícies",
      text: "Tratamentos que ajudam a proteger pintura, plásticos e acabamento interno."
    },
    {
      id: crypto.randomUUID(),
      title: "Acabamento Premium",
      text: "Detalhes que fazem diferença na apresentação final do veículo."
    },
    {
      id: crypto.randomUUID(),
      title: "Preparação para Venda",
      text: "Deixe o carro mais atraente para anúncio, exposição e negociação."
    },
    {
      id: crypto.randomUUID(),
      title: "Valorização Visual",
      text: "Serviços pensados para elevar a percepção de cuidado e qualidade."
    }
  ];
}

function getDefaultEsteticaSettings() {
  return {
    hero: {
      badge: "Cuidado premium • Acabamento profissional",
      title: "Orion Estética Automotiva",
      subtitle:
        "Revitalização, higienização e proteção para deixar seu veículo com apresentação de alto padrão, mais brilho e mais conservação.",
      primaryButtonText: "Solicitar atendimento",
      secondaryButtonText: "Ver Instagram",
      primaryButtonUrl: "https://wa.me/5586999935385?text=Olá! Quero saber sobre estética automotiva.",
      secondaryButtonUrl: "https://www.instagram.com/orionestetica2004/",
      image: "../imagens/logo-orion-redonda.jpg"
    },
    servicesSection: {
      title: "Nossos serviços",
      subtitle: "Tratamentos e cuidados para elevar o padrão do seu carro."
    },
    processSection: {
      title: "Como funciona",
      subtitle: "Um processo simples, direto e profissional."
    },
    gallerySection: {
      title: "Apresentação visual",
      subtitle: "Uma estética forte para valorizar cada detalhe do veículo."
    },
    cta: {
      badge: "Atendimento rápido",
      title: "Quer cuidar melhor do seu carro?",
      subtitle:
        "Fale com a Orion Estética Automotiva e saiba qual serviço combina melhor com o seu veículo.",
      primaryButtonText: "Chamar no WhatsApp",
      secondaryButtonText: "Instagram da estética",
      primaryButtonUrl: "https://wa.me/5586999935385?text=Olá! Quero saber sobre estética automotiva.",
      secondaryButtonUrl: "https://www.instagram.com/orionestetica2004/"
    },
    location: {
      title: "Onde estamos",
      subtitle: "Atendimento no mesmo endereço da Orion, com praticidade e confiança.",
      name: "Orion Estética Automotiva",
      label: "Localização da unidade",
      address1: "Av. João XXIII, 1503",
      address2: "São Cristóvão, Teresina - PI",
      instagram: "@orionestetica2004",
      whatsapp: "5586999935385",
      mapsUrl:
        "https://www.google.com/maps/place/Av.+Jo%C3%A3o+XXIII,+1503+-+S%C3%A3o+Crist%C3%B3v%C3%A3o,+Teresina+-+PI,+64049-010/",
      mapEmbed:
        "https://maps.google.com/maps?q=Av.%20Jo%C3%A3o%20XXIII%2C%201503%2C%20Teresina&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    services: getDefaultServices(),
    gallery: {
      mainImage: "../imagens/logo-orion-redonda.jpg",
      image1: "",
      image2: "",
      image3: "",
      image4: ""
    }
  };
}

/* =========================
   UTILITÁRIOS
========================= */
function normalizeText(value) {
  return String(value || "").trim();
}

function getValidUrl(value, fallback = "#") {
  const text = normalizeText(value);
  return text || fallback;
}

function buildWhatsappLink(phone, text) {
  const cleanPhone = String(phone || "").replace(/\D/g, "");
  const encodedText = encodeURIComponent(String(text || "").trim());

  if (!cleanPhone) return "#";

  return `https://wa.me/${cleanPhone}${encodedText ? `?text=${encodedText}` : ""}`;
}

function looksLikeEmbedUrl(url) {
  const normalized = normalizeText(url).toLowerCase();

  return (
    normalized.includes("output=embed") ||
    normalized.includes("/maps/embed") ||
    normalized.includes("pb=")
  );
}

function buildEmbedFromMapsUrl(url, addressFallback = "") {
  const normalized = normalizeText(url);

  if (!normalized) return "";

  if (looksLikeEmbedUrl(normalized)) {
    return normalized;
  }

  const query = encodeURIComponent(addressFallback || normalized);
  return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

function resolveImageUrl(url) {
  const normalized = normalizeText(url);

  if (!normalized) return "";

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("data:") ||
    normalized.startsWith("../")
  ) {
    return normalized;
  }

  if (normalized.startsWith("/uploads/")) {
    return `${API_ORIGIN}${normalized}`;
  }

  return `../${normalized}`;
}

function setText(element, value) {
  if (!element) return;
  element.textContent = normalizeText(value);
}

function setLink(element, href, label) {
  if (!element) return;
  element.href = getValidUrl(href, "#");
  if (label) element.textContent = label;
}

function setImage(element, src, alt) {
  if (!element) return;
  element.src = resolveImageUrl(src);
  if (alt) element.alt = alt;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function hasVisibleContent(value) {
  return normalizeText(value).length > 0;
}

function hasValidService(service) {
  return hasVisibleContent(service?.title) || hasVisibleContent(service?.text);
}

/* =========================
   TEMA
========================= */
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

/* =========================
   MENU MOBILE
========================= */
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

/* =========================
   MIGRAÇÃO / NORMALIZAÇÃO
========================= */
function buildServicesFromLegacyFlat(parsed) {
  const services = [];

  for (let i = 1; i <= 6; i += 1) {
    const title = normalizeText(parsed[`esteticaServiceTitle${i}`] || parsed[`serviceTitle${i}`]);
    const text = normalizeText(parsed[`esteticaServiceText${i}`] || parsed[`serviceText${i}`]);

    if (title || text) {
      services.push({
        id: crypto.randomUUID(),
        title,
        text
      });
    }
  }

  return services;
}

function normalizeServices(parsedServices, parsed) {
  const defaultServices = getDefaultServices();

  if (Array.isArray(parsedServices)) {
    const cleaned = parsedServices
      .map((service) => ({
        id: service?.id || crypto.randomUUID(),
        title: normalizeText(service?.title),
        text: normalizeText(service?.text)
      }))
      .filter(hasValidService);

    if (cleaned.length) {
      return cleaned;
    }
  }

  const legacyFlatServices = buildServicesFromLegacyFlat(parsed);
  if (legacyFlatServices.length) {
    return legacyFlatServices;
  }

  return defaultServices;
}

function getEsteticaSettings() {
  const defaults = getDefaultEsteticaSettings();

  if (!esteticaSettingsCache) {
    return defaults;
  }

  try {
    const parsed = esteticaSettingsCache;
    const locationFromFlat = {
      title: parsed?.locationTitle,
      subtitle: parsed?.locationSubtitle,
      name: parsed?.locationName,
      label: parsed?.locationLabel,
      address1: parsed?.locationAddress1,
      address2: parsed?.locationAddress2,
      instagram: parsed?.locationInstagram,
      whatsapp: parsed?.locationWhatsapp,
      mapsUrl: parsed?.locationMapsUrl,
      mapEmbed: parsed?.locationMapEmbed
    };

    const heroFromFlat = {
      badge: parsed?.heroBadge,
      title: parsed?.heroTitle,
      subtitle: parsed?.heroSubtitle,
      primaryButtonText: parsed?.heroPrimaryButtonText,
      secondaryButtonText: parsed?.heroSecondaryButtonText,
      primaryButtonUrl: parsed?.heroPrimaryButtonUrl,
      secondaryButtonUrl: parsed?.heroSecondaryButtonUrl,
      image: parsed?.heroImage
    };

    const servicesSectionFromFlat = {
      title: parsed?.servicesTitle || parsed?.servicesSectionTitle,
      subtitle: parsed?.servicesSubtitle || parsed?.servicesSectionSubtitle
    };

    const processSectionFromFlat = {
      title: parsed?.processTitle || parsed?.processSectionTitle,
      subtitle: parsed?.processSubtitle || parsed?.processSectionSubtitle
    };

    const gallerySectionFromFlat = {
      title: parsed?.galleryTitle || parsed?.gallerySectionTitle,
      subtitle: parsed?.gallerySubtitle || parsed?.gallerySectionSubtitle
    };

    const ctaFromFlat = {
      badge: parsed?.ctaBadge,
      title: parsed?.ctaTitle,
      subtitle: parsed?.ctaSubtitle,
      primaryButtonText: parsed?.ctaPrimaryButtonText,
      secondaryButtonText: parsed?.ctaSecondaryButtonText,
      primaryButtonUrl: parsed?.ctaPrimaryButtonUrl,
      secondaryButtonUrl: parsed?.ctaSecondaryButtonUrl
    };

    const galleryFromFlat = {
      mainImage: parsed?.galleryMainImage,
      image1: parsed?.galleryImage1,
      image2: parsed?.galleryImage2,
      image3: parsed?.galleryImage3,
      image4: parsed?.galleryImage4
    };

    const merged = {
      ...defaults,
      ...parsed,
      hero: {
        ...defaults.hero,
        ...(heroFromFlat || {}),
        ...(parsed.hero || {})
      },
      servicesSection: {
        ...defaults.servicesSection,
        ...(servicesSectionFromFlat || {}),
        ...(parsed.servicesSection || {})
      },
      processSection: {
        ...defaults.processSection,
        ...(processSectionFromFlat || {}),
        ...(parsed.processSection || {})
      },
      gallerySection: {
        ...defaults.gallerySection,
        ...(gallerySectionFromFlat || {}),
        ...(parsed.gallerySection || {})
      },
      cta: {
        ...defaults.cta,
        ...(ctaFromFlat || {}),
        ...(parsed.cta || {})
      },
      location: {
        ...defaults.location,
        ...(locationFromFlat || {}),
        ...(parsed.location || {})
      },
      gallery: {
        ...defaults.gallery,
        ...(galleryFromFlat || {}),
        ...(parsed.gallery || {})
      },
      services: normalizeServices(parsed.services, parsed)
    };

    if (!hasVisibleContent(merged.location.address1) && !hasVisibleContent(merged.location.address2)) {
      merged.location.address1 = defaults.location.address1;
      merged.location.address2 = defaults.location.address2;
    }

    return merged;
  } catch {
    return defaults;
  }
}

async function fetchEsteticaSettings() {
  try {
    const response = await fetch(`${API_BASE_URL}/content`);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.message || "Erro ao carregar conteudo da estetica.");
    }

    esteticaSettingsCache = payload?.data?.esteticaSettings || getDefaultEsteticaSettings();
    return getEsteticaSettings();
  } catch (error) {
    console.error("Erro ao buscar conteudo da estetica:", error);
    esteticaSettingsCache = getDefaultEsteticaSettings();
    return esteticaSettingsCache;
  }
}

/* =========================
   RENDER
========================= */
function renderServices(services) {
  if (!servicesGrid) return;

  const icons = [
    "bi-stars",
    "bi-droplet-half",
    "bi-shield-check",
    "bi-brush",
    "bi-car-front-fill",
    "bi-gem",
    "bi-stars",
    "bi-droplet-half"
  ];

  const validServices = Array.isArray(services)
    ? services.filter(hasValidService)
    : [];

  if (!validServices.length) {
    const fallbackServices = getDefaultServices();

    servicesGrid.innerHTML = fallbackServices
      .map((service, index) => {
        const iconClass = icons[index % icons.length];

        return `
          <article class="service-card">
            <div class="service-icon">
              <i class="bi ${iconClass}"></i>
            </div>
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.text)}</p>
          </article>
        `;
      })
      .join("");

    return;
  }

  servicesGrid.innerHTML = validServices
    .map((service, index) => {
      const iconClass = icons[index % icons.length];

      return `
        <article class="service-card">
          <div class="service-icon">
            <i class="bi ${iconClass}"></i>
          </div>
          <h3>${escapeHtml(service.title || "Serviço")}</h3>
          <p>${escapeHtml(service.text || "")}</p>
        </article>
      `;
    })
    .join("");
}

function renderGalleryImage(imageElement, placeholderElement, imageUrl) {
  if (!imageElement || !placeholderElement) return;

  const resolved = resolveImageUrl(imageUrl);

  if (normalizeText(imageUrl)) {
    imageElement.src = resolved;
    imageElement.classList.remove("hidden");
    placeholderElement.classList.add("hidden");
  } else {
    imageElement.classList.add("hidden");
    placeholderElement.classList.remove("hidden");
  }
}

function applyEsteticaSettings() {
  const settings = getEsteticaSettings();

  navInstagramLink.href = getValidUrl(
    settings.hero.secondaryButtonUrl || settings.cta.secondaryButtonUrl,
    "https://www.instagram.com/orionestetica2004/"
  );

  navWhatsappLink.href = buildWhatsappLink(
    settings.location.whatsapp,
    "Olá! Quero saber sobre estética automotiva."
  );

  setText(heroBadge, settings.hero.badge);
  setText(heroTitle, settings.hero.title);
  setText(heroSubtitle, settings.hero.subtitle);
  setLink(heroPrimaryButton, settings.hero.primaryButtonUrl, settings.hero.primaryButtonText);
  setLink(heroSecondaryButton, settings.hero.secondaryButtonUrl, settings.hero.secondaryButtonText);
  setImage(heroImage, settings.hero.image, settings.hero.title || "Orion Estética Automotiva");

  setText(servicesSectionTitle, settings.servicesSection.title);
  setText(servicesSectionSubtitle, settings.servicesSection.subtitle);
  setText(processSectionTitle, settings.processSection.title);
  setText(processSectionSubtitle, settings.processSection.subtitle);
  setText(gallerySectionTitle, settings.gallerySection.title);
  setText(gallerySectionSubtitle, settings.gallerySection.subtitle);

  renderServices(settings.services);

  setImage(
    galleryMainImage,
    settings.gallery.mainImage || settings.hero.image,
    "Imagem principal da estética"
  );
  renderGalleryImage(galleryImage1, galleryPlaceholder1, settings.gallery.image1);
  renderGalleryImage(galleryImage2, galleryPlaceholder2, settings.gallery.image2);
  renderGalleryImage(galleryImage3, galleryPlaceholder3, settings.gallery.image3);
  renderGalleryImage(galleryImage4, galleryPlaceholder4, settings.gallery.image4);

  setText(ctaBadge, settings.cta.badge);
  setText(ctaTitle, settings.cta.title);
  setText(ctaSubtitle, settings.cta.subtitle);
  setLink(ctaPrimaryButton, settings.cta.primaryButtonUrl, settings.cta.primaryButtonText);
  setLink(ctaSecondaryButton, settings.cta.secondaryButtonUrl, settings.cta.secondaryButtonText);

  setText(locationSectionTitle, settings.location.title);
  setText(locationSectionSubtitle, settings.location.subtitle);
  setText(locationName, settings.location.name);
  setText(locationLabel, settings.location.label);
  setText(locationAddress1, settings.location.address1);
  setText(locationAddress2, settings.location.address2);
  setText(locationInstagram, settings.location.instagram);

  mapsOpenButton.href = getValidUrl(settings.location.mapsUrl, "https://www.google.com/maps");
  locationWhatsappButton.href = buildWhatsappLink(
    settings.location.whatsapp,
    "Olá! Quero saber sobre estética automotiva."
  );

  const embedUrl = buildEmbedFromMapsUrl(
    settings.location.mapEmbed || settings.location.mapsUrl,
    `${settings.location.address1} ${settings.location.address2}`
  );

  if (locationMapFrame && embedUrl) {
    locationMapFrame.src = embedUrl;
  }
}

/* =========================
   INIT
========================= */
async function initEstetica() {
  loadTheme();
  await fetchEsteticaSettings();
  applyEsteticaSettings();
  setupRevealAnimations();
  closeMobileMenu();
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
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

initEstetica();
