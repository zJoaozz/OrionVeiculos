const API_ORIGIN =
  window.location.protocol === "file:"
    ? "http://localhost:5000"
    : window.ORION_API_ORIGIN ||
      `${window.location.protocol}//${window.location.hostname}:5000`;

const API_BASE_URL = `${API_ORIGIN}/api`;
const API_UPLOADS_BASE_URL = API_ORIGIN;

const THEME_KEY = "orion-theme";
const DEFAULT_CARD_IMAGE = "../imagens/logo-orion-redonda.jpg";

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const menuToggle = document.getElementById("menuToggle");
const vehicleLinks = document.getElementById("vehicleLinks");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const navAnchors = vehicleLinks ? vehicleLinks.querySelectorAll("a") : [];

const vehicleLoading = document.getElementById("vehicleLoading");
const vehicleNotFound = document.getElementById("vehicleNotFound");
const vehicleContent = document.getElementById("vehicleContent");

const galleryGrid = document.getElementById("galleryGrid");
const vehicleBreadcrumbTitle = document.getElementById("vehicleBreadcrumbTitle");
const vehicleBrand = document.getElementById("vehicleBrand");
const vehicleStatusBadge = document.getElementById("vehicleStatusBadge");
const vehicleTitle = document.getElementById("vehicleTitle");
const vehicleSubtitle = document.getElementById("vehicleSubtitle");
const vehiclePrice = document.getElementById("vehiclePrice");
const vehicleSummaryChips = document.getElementById("vehicleSummaryChips");
const vehicleAssuranceLocation = document.getElementById("vehicleAssuranceLocation");
const specGrid = document.getElementById("specGrid");
const optionalGrid = document.getElementById("optionalGrid");
const optionalSection = document.getElementById("optionalSection");
const vehicleDescription = document.getElementById("vehicleDescription");

const sidebarMainAction = document.getElementById("sidebarMainAction");
const contactCardSubtitle = document.getElementById("contactCardSubtitle");
const sidebarWhatsapp = document.getElementById("sidebarWhatsapp");
const sidebarWhatsappText = document.getElementById("sidebarWhatsappText");
const sidebarPhone = document.getElementById("sidebarPhone");
const sidebarPhoneText = document.getElementById("sidebarPhoneText");
const sidebarAddress = document.getElementById("sidebarAddress");
const shareButton = document.getElementById("shareButton");
const contactNoteText = document.getElementById("contactNoteText");
const shareToast = document.getElementById("shareToast");

const vehicleMainWhatsapp = document.getElementById("vehicleMainWhatsapp");
const vehicleMainShare = document.getElementById("vehicleMainShare");

const mobileFloatingCta = document.getElementById("mobileFloatingCta");
const mobileFloatingPrice = document.getElementById("mobileFloatingPrice");
const mobileFloatingTitle = document.getElementById("mobileFloatingTitle");
const mobileFloatingWhatsapp = document.getElementById("mobileFloatingWhatsapp");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentGalleryImages = [];
let currentLightboxIndex = 0;
let siteSettingsCache = null;
let shareToastTimeout = null;

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function normalizeStatus(status) {
  const normalized = normalizeText(status);

  if (normalized === "reservado") return "reservado";
  if (normalized === "vendido") return "vendido";
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
  if (value.startsWith("data:")) return value;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/uploads/")) return `${API_UPLOADS_BASE_URL}${value}`;
  if (value.startsWith("../")) return value;

  return `../${value}`;
}

function getDefaultSiteSettings() {
  return {
    whatsapp: "5586999935385",
    instagram: "https://www.instagram.com/orionveiculos2004/",
    address: "Av. João XXIII, 1503 - São Cristóvão, Teresina - PI",
    mapUrl:
      "https://maps.google.com/maps?q=Av.%20Jo%C3%A3o%20XXIII%2C%201503%2C%20Teresina&t=&z=15&ie=UTF8&iwloc=&output=embed",
    phoneDisplay: "(86) 99993-5385",
    cityDisplay: "Teresina - PI"
  };
}

function getSiteSettings() {
  return {
    ...getDefaultSiteSettings(),
    ...(siteSettingsCache || {})
  };
}

async function fetchContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content`);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.message || "Erro ao carregar conteudo do site.");
    }

    siteSettingsCache = payload?.data?.siteSettings || getDefaultSiteSettings();
    return getSiteSettings();
  } catch (error) {
    console.error("Erro ao buscar conteudo do backend:", error);
    siteSettingsCache = getDefaultSiteSettings();
    return siteSettingsCache;
  }
}

function getVehicleIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
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

async function fetchVehicleById(vehicleId) {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.message || "Erro ao carregar veículo.");
    }

    return payload?.data ? normalizeVehicleFromApi(payload.data) : null;
  } catch (error) {
    console.error("Erro ao buscar veículo do backend:", error);
    return null;
  }
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

  const cover = images[safeCoverIndex];
  const remaining = images.filter((_, index) => index !== safeCoverIndex);
  return [cover, ...remaining];
}

function getBrandLabel(car) {
  return car.marca || "Orion Veículos";
}

function getStatusLabel(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "vendido") return "Vendido";
  if (normalized === "reservado") return "Reservado";
  return "Disponível";
}

function getStatusClass(status) {
  return `status-${normalizeStatus(status)}`;
}

function buildVehicleSummaryChips(car) {
  const chips = [];

  if (car.ano) chips.push({ icon: "bi bi-calendar3", text: car.ano });
  if (car.km) chips.push({ icon: "bi bi-speedometer2", text: car.km });
  if (car.combustivel) chips.push({ icon: "bi bi-fuel-pump", text: car.combustivel });
  if (car.cidade) chips.push({ icon: "bi bi-geo-alt", text: car.cidade });

  return chips;
}

function getSpecItems(car) {
  return [
    {
      icon: "bi bi-gear-wide-connected",
      title: "Câmbio / Tag",
      text: car.tag || "-"
    },
    {
      icon: "bi bi-calendar3",
      title: "Ano",
      text: car.ano || "-"
    },
    {
      icon: "bi bi-speedometer2",
      title: "KM",
      text: car.km || "-"
    },
    {
      icon: "bi bi-car-front",
      title: "Categoria",
      text: car.categoria
        ? car.categoria.charAt(0).toUpperCase() + car.categoria.slice(1)
        : "-"
    },
    {
      icon: "bi bi-fuel-pump",
      title: "Combustível",
      text: car.combustivel || "-"
    },
    {
      icon: "bi bi-geo-alt",
      title: "Cidade",
      text: car.cidade || "-"
    },
    {
      icon: "bi bi-patch-check",
      title: "Status",
      text: getStatusLabel(car.status)
    },
    {
      icon: "bi bi-cash-stack",
      title: "Preço",
      text: car.preco || "-"
    }
  ];
}

function renderSpecs(car) {
  const items = getSpecItems(car);

  specGrid.innerHTML = items
    .map(
      (item) => `
      <div class="spec-item">
        <i class="${item.icon}"></i>
        <div>
          <strong>${item.title}</strong>
          <span>${item.text}</span>
        </div>
      </div>
    `
    )
    .join("");
}

function renderOptionals(car) {
  const optionals = String(car.opcionais || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!optionals.length) {
    optionalSection.classList.add("hidden");
    optionalGrid.innerHTML = "";
    return;
  }

  optionalSection.classList.remove("hidden");

  optionalGrid.innerHTML = optionals
    .map(
      (item) => `
      <div class="optional-item">
        <i class="bi bi-check"></i>
        <span>${item}</span>
      </div>
    `
    )
    .join("");
}

function renderVehicleSummary(car) {
  const chips = buildVehicleSummaryChips(car);

  vehicleSummaryChips.innerHTML = chips
    .map(
      (item) => `
        <div class="summary-chip">
          <i class="${item.icon}"></i>
          <span>${item.text}</span>
        </div>
      `
    )
    .join("");
}

function showShareToast(message) {
  if (!shareToast) return;

  shareToast.textContent = message;
  shareToast.classList.remove("hidden");
  shareToast.classList.add("show");

  if (shareToastTimeout) {
    clearTimeout(shareToastTimeout);
  }

  shareToastTimeout = setTimeout(() => {
    shareToast.classList.remove("show");
    shareToast.classList.add("hidden");
  }, 2400);
}

function openLightbox(index) {
  if (!currentGalleryImages.length) return;

  currentLightboxIndex = index;
  lightboxImage.src = currentGalleryImages[currentLightboxIndex];
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
}

function nextLightboxImage() {
  if (!currentGalleryImages.length) return;

  currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryImages.length;
  lightboxImage.src = currentGalleryImages[currentLightboxIndex];
}

function prevLightboxImage() {
  if (!currentGalleryImages.length) return;

  currentLightboxIndex =
    (currentLightboxIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  lightboxImage.src = currentGalleryImages[currentLightboxIndex];
}

function renderGallery(car) {
  const images = reorderImagesWithCoverFirst(car);
  currentGalleryImages = images.length ? images : [DEFAULT_CARD_IMAGE];

  const previewImages = currentGalleryImages.slice(0, 5);

  galleryGrid.innerHTML = previewImages
    .map((image, index) => {
      const extraCount = currentGalleryImages.length - 5;
      const showOverlay = index === 4 && extraCount > 0;

      return `
        <button
          type="button"
          class="gallery-item ${index === 0 ? "main" : ""}"
          data-gallery-index="${index}"
        >
          <img src="${image}" alt="Imagem do veículo ${index + 1}" />
          ${showOverlay ? `<div class="gallery-more">Ver todas as fotos</div>` : ""}
        </button>
      `;
    })
    .join("");

  galleryGrid.querySelectorAll("[data-gallery-index]").forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(Number(button.dataset.galleryIndex));
    });
  });
}

function buildWhatsappLink(car) {
  const siteSettings = getSiteSettings();

  return `https://wa.me/${siteSettings.whatsapp}?text=${encodeURIComponent(
    car.whatsappText || `Olá! Tenho interesse no veículo ${car.titulo}.`
  )}`;
}

function renderSidebar(car) {
  const siteSettings = getSiteSettings();
  const whatsappLink = buildWhatsappLink(car);

  sidebarWhatsapp.href = whatsappLink;
  sidebarWhatsappText.textContent = siteSettings.phoneDisplay;

  sidebarPhone.href = `tel:${siteSettings.whatsapp}`;
  sidebarPhoneText.textContent = siteSettings.phoneDisplay;

  sidebarAddress.href = siteSettings.mapUrl || "#";
  contactCardSubtitle.textContent = `Fale com a loja para receber atendimento, mais fotos e detalhes sobre ${car.titulo || "este veículo"}.`;
  contactNoteText.textContent = `Atendimento direto da Orion Veículos em ${car.cidade || siteSettings.cityDisplay}.`;

  if (vehicleMainWhatsapp) {
    vehicleMainWhatsapp.href = whatsappLink;
  }

  if (mobileFloatingWhatsapp) {
    mobileFloatingWhatsapp.href = whatsappLink;
  }

  if (mobileFloatingPrice) {
    mobileFloatingPrice.textContent = car.preco || "Consulte";
  }

  if (mobileFloatingTitle) {
    mobileFloatingTitle.textContent = car.titulo || "Veículo";
  }

  if (mobileFloatingCta) {
    mobileFloatingCta.classList.remove("hidden");
  }

  if (normalizeStatus(car.status) === "vendido") {
    sidebarMainAction.removeAttribute("href");
    sidebarMainAction.removeAttribute("target");
    sidebarMainAction.removeAttribute("rel");
    sidebarMainAction.textContent = "Veículo vendido";
    sidebarMainAction.classList.add("is-sold");

    if (vehicleMainWhatsapp) {
      vehicleMainWhatsapp.removeAttribute("href");
      vehicleMainWhatsapp.textContent = "Veículo vendido";
    }

    if (mobileFloatingWhatsapp) {
      mobileFloatingWhatsapp.removeAttribute("href");
      mobileFloatingWhatsapp.innerHTML = '<i class="bi bi-x-circle"></i>';
    }
  } else {
    sidebarMainAction.href = whatsappLink;
    sidebarMainAction.target = "_blank";
    sidebarMainAction.rel = "noopener noreferrer";
    sidebarMainAction.textContent = "Enviar mensagem";
    sidebarMainAction.classList.remove("is-sold");
  }
}

function renderVehicle(car) {
  document.title = `${car.titulo} | Orion Veículos`;

  if (vehicleBreadcrumbTitle) {
    vehicleBreadcrumbTitle.textContent = car.titulo || "Veículo";
  }

  vehicleBrand.textContent = getBrandLabel(car);
  vehicleStatusBadge.textContent = getStatusLabel(car.status);
  vehicleStatusBadge.className = `vehicle-status-badge ${getStatusClass(car.status)}`;
  vehicleTitle.textContent = car.titulo || "Veículo";
  vehicleSubtitle.textContent = `${car.modelo || ""}${car.ano ? ` • ${car.ano}` : ""}${car.combustivel ? ` • ${car.combustivel}` : ""}`.trim();
  vehiclePrice.textContent = car.preco || "-";
  vehicleAssuranceLocation.textContent = `Disponível em ${car.cidade || getSiteSettings().cityDisplay}`;

  vehicleDescription.textContent =
    car.descricao || "Consulte nossa equipe para mais detalhes sobre este veículo.";

  renderGallery(car);
  renderVehicleSummary(car);
  renderSpecs(car);
  renderOptionals(car);
  renderSidebar(car);
}

function shareVehicle() {
  const url = window.location.href;
  const title = document.title;

  if (navigator.share) {
    navigator.share({ title, url }).catch(() => {});
    return;
  }

  navigator.clipboard
    .writeText(url)
    .then(() => {
      showShareToast("Link copiado com sucesso.");
    })
    .catch(() => {
      showShareToast("Não foi possível copiar o link.");
    });
}

function updateThemeButton() {
  if (!themeToggle || !themeIcon) return;

  const isDark = document.body.classList.contains("dark-mode");
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
  themeToggle.setAttribute("title", isDark ? "Modo claro" : "Modo escuro");
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  updateThemeButton();
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  updateThemeButton();
}

function openMobileMenu() {
  if (!vehicleLinks || !menuToggle || !mobileNavOverlay) return;
  vehicleLinks.classList.add("open");
  mobileNavOverlay.classList.add("show");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.innerHTML = '<i class="bi bi-x-lg"></i>';
}

function closeMobileMenu() {
  if (!vehicleLinks || !menuToggle || !mobileNavOverlay) return;
  vehicleLinks.classList.remove("open");
  mobileNavOverlay.classList.remove("show");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i class="bi bi-list"></i>';
}

function toggleMobileMenu() {
  if (!vehicleLinks) return;

  if (vehicleLinks.classList.contains("open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

async function init() {
  loadTheme();
  closeMobileMenu();
  await fetchContent();

  const vehicleId = getVehicleIdFromURL();

  if (!vehicleId) {
    vehicleLoading.classList.add("hidden");
    vehicleNotFound.classList.remove("hidden");
    return;
  }

  const vehicle = await fetchVehicleById(vehicleId);

  vehicleLoading.classList.add("hidden");

  if (!vehicle) {
    vehicleNotFound.classList.remove("hidden");
    return;
  }

  renderVehicle(vehicle);
  vehicleContent.classList.remove("hidden");
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

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 760) {
      closeMobileMenu();
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", nextLightboxImage);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", prevLightboxImage);
}

if (shareButton) {
  shareButton.addEventListener("click", shareVehicle);
}

if (vehicleMainShare) {
  vehicleMainShare.addEventListener("click", shareVehicle);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }

  if (!lightbox || lightbox.classList.contains("hidden")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") nextLightboxImage();
  if (event.key === "ArrowLeft") prevLightboxImage();
});

init();