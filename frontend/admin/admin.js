const AUTH_TOKEN_KEY = "orion-admin-token";

const API_ORIGIN =
  window.location.protocol === "file:"
    ? "http://localhost:5000"
    : window.ORION_API_ORIGIN ||
      `${window.location.protocol}//${window.location.hostname}:5000`;

const API_BASE_URL = `${API_ORIGIN}/api`;
const API_UPLOADS_BASE_URL = API_ORIGIN;

/* =========================
   ELEMENTOS GERAIS
========================= */
const loginOverlay = document.getElementById("loginOverlay");
const loginForm = document.getElementById("loginForm");
const adminPasswordInput = document.getElementById("adminPassword");
const loginError = document.getElementById("loginError");
const logoutButton = document.getElementById("logoutButton");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");

const adminTabButtons = document.querySelectorAll(".admin-tab-button");
const adminTabPanels = document.querySelectorAll(".admin-tab-panel");
const adminToast = document.getElementById("adminToast");
const currentSectionTitle = document.getElementById("currentSectionTitle");
const currentSectionSubtitle = document.getElementById("currentSectionSubtitle");
const quickTabActions = document.querySelectorAll(".quick-tab-action");

/* =========================
   ELEMENTOS DO FORM DE VEÍCULO
========================= */
const carForm = document.getElementById("carForm");
const carIdInput = document.getElementById("carId");
const carsList = document.getElementById("carsList");
const cancelEditButton = document.getElementById("cancelEdit");
const resetAllCarsButton = document.getElementById("resetAllCars");
const saveButton = document.getElementById("saveButton");

const tituloInput = document.getElementById("titulo");
const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anoInput = document.getElementById("ano");
const combustivelInput = document.getElementById("combustivel");
const kmInput = document.getElementById("km");
const precoInput = document.getElementById("preco");
const cidadeInput = document.getElementById("cidade");
const categoriaInput = document.getElementById("categoria");
const statusInput = document.getElementById("status");
const tagInput = document.getElementById("tag");
const ordemInput = document.getElementById("ordem");
const destaqueInput = document.getElementById("destaque");
const destaqueHomeInput = document.getElementById("destaqueHome");
const descricaoInput = document.getElementById("descricao");
const opcionaisInput = document.getElementById("opcionais");
const tagsInput = document.getElementById("tags");
const whatsappTextInput = document.getElementById("whatsappText");

const openImageUploaderButton = document.getElementById("openImageUploader");
const imageUploader = document.getElementById("imageUploader");
const imagesUnifiedList = document.getElementById("imagesUnifiedList");
const selectedImagesCount = document.getElementById("selectedImagesCount");
const imageUploadStatus = document.getElementById("imageUploadStatus");
const formMode = document.getElementById("formMode");

/* =========================
   ELEMENTOS DE RESUMO
========================= */
const totalCars = document.getElementById("totalCars");
const featuredCars = document.getElementById("featuredCars");
const soldCars = document.getElementById("soldCars");
const availableCars = document.getElementById("availableCars");
const reservedCars = document.getElementById("reservedCars");
const totalCategories = document.getElementById("totalCategories");
const healthAvailableCars = document.getElementById("healthAvailableCars");
const healthSoldCars = document.getElementById("healthSoldCars");
const healthReservedCars = document.getElementById("healthReservedCars");
const noImageCars = document.getElementById("noImageCars");
const noPriceCars = document.getElementById("noPriceCars");
const dashboardFeaturedList = document.getElementById("dashboardFeaturedList");

/* =========================
   FILTROS DO ADMIN
========================= */
const adminSearchInput = document.getElementById("adminSearchInput");
const adminStatusFilter = document.getElementById("adminStatusFilter");
const adminCategoryFilter = document.getElementById("adminCategoryFilter");
const carsListStatus = document.getElementById("carsListStatus");

/* =========================
   ELEMENTOS DE CATEGORIA
========================= */
const categoryForm = document.getElementById("categoryForm");
const categoryIdInput = document.getElementById("categoryId");
const categoryNameInput = document.getElementById("categoryName");
const categorySlugInput = document.getElementById("categorySlug");
const categoryOrderInput = document.getElementById("categoryOrder");
const openCategoryUploaderButton = document.getElementById("openCategoryUploader");
const categoryImageUpload = document.getElementById("categoryImageUpload");
const categoryImagePreview = document.getElementById("categoryImagePreview");
const categoryCancelEditButton = document.getElementById("categoryCancelEdit");
const categoriesList = document.getElementById("categoriesList");
const categoriesListStatus = document.getElementById("categoriesListStatus");

/* =========================
   CONFIGURAÇÕES DO SITE
========================= */
const siteSettingsForm = document.getElementById("siteSettingsForm");
const siteWhatsappInput = document.getElementById("siteWhatsapp");
const siteInstagramInput = document.getElementById("siteInstagram");
const siteAddressInput = document.getElementById("siteAddress");
const siteMapUrlInput = document.getElementById("siteMapUrl");
const sitePhoneDisplayInput = document.getElementById("sitePhoneDisplay");
const siteCityDisplayInput = document.getElementById("siteCityDisplay");
const resetSiteSettingsButton = document.getElementById("resetSiteSettings");

/* =========================
   CONFIGURAÇÕES DA HOME
========================= */
const homeSettingsForm = document.getElementById("homeSettingsForm");
const homeBadgeInput = document.getElementById("homeBadge");
const homeTitleInput = document.getElementById("homeTitle");
const homeSubtitleInput = document.getElementById("homeSubtitle");
const homePrimaryButtonTextInput = document.getElementById("homePrimaryButtonText");
const homeSecondaryButtonTextInput = document.getElementById("homeSecondaryButtonText");
const homeWhyTitleInput = document.getElementById("homeWhyTitle");
const homeWhySubtitleInput = document.getElementById("homeWhySubtitle");
const resetHomeSettingsButton = document.getElementById("resetHomeSettings");

/* =========================
   ESTÉTICA - VERSÃO ENXUTA
========================= */
const esteticaSettingsForm = document.getElementById("esteticaSettingsForm");
const resetEsteticaSettingsButton = document.getElementById("resetEsteticaSettings");

/* títulos */
const esteticaHeroBadgeInput = document.getElementById("esteticaHeroBadge");
const esteticaHeroTitleInput = document.getElementById("esteticaHeroTitle");
const esteticaHeroSubtitleInput = document.getElementById("esteticaHeroSubtitle");

const esteticaServicesTitleInput = document.getElementById("esteticaServicesTitle");
const esteticaServicesSubtitleInput = document.getElementById("esteticaServicesSubtitle");

const esteticaProcessTitleInput = document.getElementById("esteticaProcessTitle");
const esteticaProcessSubtitleInput = document.getElementById("esteticaProcessSubtitle");

const esteticaGalleryTitleInput = document.getElementById("esteticaGalleryTitle");
const esteticaGallerySubtitleInput = document.getElementById("esteticaGallerySubtitle");

const esteticaCtaBadgeInput = document.getElementById("esteticaCtaBadge");
const esteticaCtaTitleInput = document.getElementById("esteticaCtaTitle");
const esteticaCtaSubtitleInput = document.getElementById("esteticaCtaSubtitle");

const esteticaLocationTitleInput = document.getElementById("esteticaLocationTitle");
const esteticaLocationSubtitleInput = document.getElementById("esteticaLocationSubtitle");
const esteticaLocationNameInput = document.getElementById("esteticaLocationName");
const esteticaLocationLabelInput = document.getElementById("esteticaLocationLabel");
const esteticaLocationAddress1Input = document.getElementById("esteticaLocationAddress1");
const esteticaLocationAddress2Input = document.getElementById("esteticaLocationAddress2");
const esteticaLocationInstagramInput = document.getElementById("esteticaLocationInstagram");
const esteticaLocationMapsUrlInput = document.getElementById("esteticaLocationMapsUrl");
const esteticaLocationMapEmbedInput = document.getElementById("esteticaLocationMapEmbed");
const esteticaLocationWhatsappInput = document.getElementById("esteticaLocationWhatsapp");

/* botões */
const esteticaHeroPrimaryButtonTextInput = document.getElementById("esteticaHeroPrimaryButtonText");
const esteticaHeroSecondaryButtonTextInput = document.getElementById("esteticaHeroSecondaryButtonText");
const esteticaHeroPrimaryButtonUrlInput = document.getElementById("esteticaHeroPrimaryButtonUrl");
const esteticaHeroSecondaryButtonUrlInput = document.getElementById("esteticaHeroSecondaryButtonUrl");

const esteticaCtaPrimaryButtonTextInput = document.getElementById("esteticaCtaPrimaryButtonText");
const esteticaCtaSecondaryButtonTextInput = document.getElementById("esteticaCtaSecondaryButtonText");
const esteticaCtaPrimaryButtonUrlInput = document.getElementById("esteticaCtaPrimaryButtonUrl");
const esteticaCtaSecondaryButtonUrlInput = document.getElementById("esteticaCtaSecondaryButtonUrl");

/* serviços */
const esteticaServicesList = document.getElementById("esteticaServicesList");
const addEsteticaServiceButton = document.getElementById("addEsteticaService");

/* uploads - hero */
const openEsteticaHeroUploaderButton = document.getElementById("openEsteticaHeroUploader");
const esteticaHeroImageUpload = document.getElementById("esteticaHeroImageUpload");
const esteticaHeroImagePreview = document.getElementById("esteticaHeroImagePreview");

/* uploads - apresentação visual */
const openEsteticaGalleryMainUploaderButton = document.getElementById("openEsteticaGalleryMainUploader");
const esteticaGalleryMainImageUpload = document.getElementById("esteticaGalleryMainImageUpload");
const esteticaGalleryMainImagePreview = document.getElementById("esteticaGalleryMainImagePreview");

const openEsteticaGallery1UploaderButton = document.getElementById("openEsteticaGallery1Uploader");
const esteticaGallery1ImageUpload = document.getElementById("esteticaGallery1ImageUpload");
const esteticaGallery1ImagePreview = document.getElementById("esteticaGallery1ImagePreview");

const openEsteticaGallery2UploaderButton = document.getElementById("openEsteticaGallery2Uploader");
const esteticaGallery2ImageUpload = document.getElementById("esteticaGallery2ImageUpload");
const esteticaGallery2ImagePreview = document.getElementById("esteticaGallery2ImagePreview");

const openEsteticaGallery3UploaderButton = document.getElementById("openEsteticaGallery3Uploader");
const esteticaGallery3ImageUpload = document.getElementById("esteticaGallery3ImageUpload");
const esteticaGallery3ImagePreview = document.getElementById("esteticaGallery3ImagePreview");

const openEsteticaGallery4UploaderButton = document.getElementById("openEsteticaGallery4Uploader");
const esteticaGallery4ImageUpload = document.getElementById("esteticaGallery4ImageUpload");
const esteticaGallery4ImagePreview = document.getElementById("esteticaGallery4ImagePreview");

let vehiclesCache = [];
let contentCache = null;
let currentFormImages = [];
let currentCoverIndex = 0;
let currentCategoryImage = "";
let isSavingVehicle = false;
let isUploadingVehicleImages = false;
let isUploadingCategoryImage = false;

/* estética */
let isUploadingEsteticaImage = false;
let currentEsteticaHeroImage = "";
let currentEsteticaGalleryMainImage = "";
let currentEsteticaGallery1Image = "";
let currentEsteticaGallery2Image = "";
let currentEsteticaGallery3Image = "";
let currentEsteticaGallery4Image = "";
let adminToastTimeout = null;

/* =========================
   DADOS PADRÃO
========================= */
function getDefaultCategories() {
  return [
    {
      id: crypto.randomUUID(),
      nome: "Sedans",
      slug: "sedan",
      ordem: 1,
      imagem: "imagens/logo-orion-redonda.jpg"
    },
    {
      id: crypto.randomUUID(),
      nome: "Hatchs",
      slug: "hatch",
      ordem: 2,
      imagem: "imagens/logo-orion-redonda.jpg"
    },
    {
      id: crypto.randomUUID(),
      nome: "SUVs",
      slug: "suv",
      ordem: 3,
      imagem: "imagens/logo-orion-redonda.jpg"
    },
    {
      id: crypto.randomUUID(),
      nome: "Picapes",
      slug: "picape",
      ordem: 4,
      imagem: "imagens/logo-orion-redonda.jpg"
    }
  ];
}

function getDefaultCars() {
  return [
    {
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
      destaque: true,
      destaqueHome: true,
      descricao: "Veículo robusto e muito bem conservado.",
      opcionais: "Central multimídia, couro, 4x4",
      tags: "toyota hilux picape diesel 4x4 automatico",
      whatsappText: "Olá! Tenho interesse na Toyota Hilux SR 2.8 4x4.",
      images: [
        {
          url: "imagens/logo-orion-redonda.jpg",
          filename: "logo-orion-redonda.jpg"
        }
      ],
      coverIndex: 0
    },
    {
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
      images: [
        {
          url: "imagens/logo-orion-redonda.jpg",
          filename: "logo-orion-redonda.jpg"
        }
      ],
      coverIndex: 0
    }
  ];
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

function getDefaultHomeSettings() {
  return {
    badge: "Estoque selecionado • Atendimento rápido",
    title: "Encontre seu próximo carro na Orion Veículos",
    subtitle:
      "Uma experiência mais simples, profissional e direta para quem quer comprar com confiança.",
    primaryButtonText: "Ver estoque",
    secondaryButtonText: "Falar com a loja",
    whyTitle: "Por que comprar com a Orion?",
    whySubtitle: "Uma experiência mais simples, direta e profissional."
  };
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
    services: [
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
    ],
    gallery: {
      mainImage: "../imagens/logo-orion-redonda.jpg",
      image1: "",
      image2: "",
      image3: "",
      image4: ""
    }
  };
}

function createDefaultContent() {
  return {
    categories: getDefaultCategories(),
    siteSettings: getDefaultSiteSettings(),
    homeSettings: getDefaultHomeSettings(),
    esteticaSettings: getDefaultEsteticaSettings()
  };
}

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function slugify(text) {
  return normalizeText(text)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeStatus(status) {
  const normalized = normalizeText(status);
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
  return labels[normalized] || "Disponível";
}

function sortByOrder(items) {
  return [...items].sort((a, b) => Number(a.ordem || 0) - Number(b.ordem || 0));
}

function getNextOrder(items) {
  if (!items.length) return 1;
  const maxOrder = Math.max(...items.map((item) => Number(item.ordem || 0)));
  return maxOrder + 1;
}

function normalizeBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return Boolean(value);
}

function showToast(message, type = "success") {
  if (!adminToast) return;

  adminToast.textContent = String(message || "").trim();
  adminToast.className = `admin-toast ${type}`;
  adminToast.classList.remove("hidden");
  adminToast.classList.add("show");

  if (adminToastTimeout) {
    clearTimeout(adminToastTimeout);
  }

  adminToastTimeout = setTimeout(() => {
    adminToast.classList.remove("show");
    adminToast.classList.add("hidden");
  }, 2600);
}

function showAlert(message) {
  showToast(message, "error");
}

function setListStatus(element, title = "", description = "") {
  if (!element) return;

  if (!title) {
    element.classList.add("hidden");
    element.innerHTML = "";
    return;
  }

  element.classList.remove("hidden");
  element.innerHTML = `
    <strong>${title}</strong>
    <p>${description}</p>
  `;
}

function renderAdminListSkeleton(count = 3) {
  return Array.from({ length: count })
    .map(
      () => `
        <div class="admin-list-skeleton" aria-hidden="true">
          <div class="admin-list-skeleton-row">
            <div class="admin-list-skeleton-media"></div>
            <div>
              <div class="admin-list-skeleton-line medium"></div>
              <div class="admin-list-skeleton-line long"></div>
            </div>
            <div class="admin-list-skeleton-actions">
              <div class="admin-list-skeleton-button"></div>
              <div class="admin-list-skeleton-button"></div>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCategoryNameBySlug(slug) {
  const categories = getCategories();
  const found = categories.find((category) => category.slug === slug);
  return found?.nome || slug || "Sem categoria";
}

function buildWhatsappLink(phone, text) {
  const cleanPhone = String(phone || "").replace(/\D/g, "");
  const encodedText = encodeURIComponent(String(text || "").trim());

  if (!cleanPhone) return "#";
  return `https://wa.me/${cleanPhone}${encodedText ? `?text=${encodedText}` : ""}`;
}

function setSaveButtonState(disabled, label = "Salvar carro") {
  if (!saveButton) return;
  saveButton.disabled = disabled;
  saveButton.textContent = label;
}

function setImageUploadStatus(message = "") {
  if (!imageUploadStatus) return;
  imageUploadStatus.textContent = message;
}

function toApiImageUrl(url) {
  if (!url) return "";
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }
  if (url.startsWith("/uploads/")) {
    return `${API_UPLOADS_BASE_URL}${url}`;
  }
  if (url.startsWith("../")) {
    return url;
  }
  return `../${url}`;
}

function formatVehiclePrice(price) {
  const text = String(price || "").trim();
  if (!text) return "Preço não informado";

  const numeric = Number(
    text
      .replace(/[^\d,.-]/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
  );

  if (!Number.isNaN(numeric) && numeric > 0) {
    return numeric.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  return text;
}

function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || "";
}

function setAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, String(token || "").trim());
}

function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

async function apiRequest(endpoint, options = {}) {
  const headers = new Headers(options.headers || {});
  const authToken = getAuthToken();

  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  // Criar AbortController para timeout (10 segundos)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await response.json() : null;

    if (!response.ok) {
      if (response.status === 401) {
        clearAuthToken();
        updateAuthUI();
      }

      throw new Error(payload?.message || "Erro ao comunicar com o backend.");
    }

    return payload;
  } catch (error) {
    // Melhorar mensagens de erro
    if (error.name === "AbortError") {
      throw new Error("Tempo limite excedido. Verifique sua conexão e tente novamente.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function uploadSingleImage(file) {
  const formData = new FormData();
  formData.append("images", file);

  const payload = await apiRequest("/uploads", {
    method: "POST",
    body: formData
  });

  return payload?.data?.[0]?.url || "";
}

/* =========================
   ABAS
========================= */
const TAB_META = {
  dashboardTab: {
    title: "Dashboard",
    subtitle: "Visao geral da loja, estoque e atalhos de gestao."
  },
  vehiclesTab: {
    title: "Veiculos",
    subtitle: "Cadastre, edite, exclua e organize os veiculos do estoque."
  },
  categoriesTab: {
    title: "Categorias",
    subtitle: "Organize categorias usadas na home e nos filtros do estoque."
  },
  homeTab: {
    title: "Home",
    subtitle: "Configure os textos e destaques exibidos na pagina inicial."
  },
  esteticaTab: {
    title: "Estetica",
    subtitle: "Atualize o conteudo da area de estetica automotiva."
  },
  siteSettingsTab: {
    title: "Configuracoes",
    subtitle: "Ajuste contato, cidade, mapa e informacoes gerais da loja."
  }
};

function activateTab(tabId) {
  adminTabButtons.forEach((button) => {
    const isActive = button.dataset.tabTarget === tabId;
    button.classList.toggle("active", isActive);
  });

  adminTabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });

  const meta = TAB_META[tabId] || TAB_META.dashboardTab;
  if (currentSectionTitle) currentSectionTitle.textContent = meta.title;
  if (currentSectionSubtitle) currentSectionSubtitle.textContent = meta.subtitle;
}

function setupTabs() {
  adminTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tabTarget);
    });
  });

  quickTabActions.forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tabTarget);

      if (button.dataset.focusCarForm === "true") {
        clearVehicleForm();
        carForm?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* =========================
   AUTH
========================= */
function isAuthenticated() {
  return Boolean(getAuthToken());
}

function updateAuthUI() {
  if (!loginOverlay) return;
  loginOverlay.classList.toggle("hidden", isAuthenticated());
}

async function handleLoginSubmit(event) {
  event.preventDefault();

  const enteredPassword = String(adminPasswordInput?.value || "").trim();

  if (!enteredPassword) {
    if (loginError) loginError.textContent = "Digite a senha do admin.";
    return;
  }

  try {
    const payload = await apiRequest("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: enteredPassword
      })
    });

    setAuthToken(payload?.data?.token || "");

    if (loginError) loginError.textContent = "";
    if (adminPasswordInput) adminPasswordInput.value = "";
    updateAuthUI();
    showToast("Login realizado com sucesso.", "success");
  } catch (error) {
    if (loginError) loginError.textContent = error.message || "Senha incorreta.";
  }
}

async function handleLogout() {
  try {
    if (isAuthenticated()) {
      await apiRequest("/auth/logout", {
        method: "POST"
      });
    }
  } catch {}

  clearAuthToken();
  updateAuthUI();
  showToast("Sessão encerrada.", "success");
}

/* =========================
   TEMA
========================= */
function updateThemeButton() {
  if (!themeIcon) return;

  const isDark = document.body.classList.contains("dark-mode");
  themeIcon.textContent = isDark ? "☀" : "☾";
  if (themeLabel) themeLabel.textContent = "Tema";

  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Ativar modo claro" : "Ativar modo escuro"
  );

  themeToggle?.setAttribute("title", isDark ? "Modo claro" : "Modo escuro");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("orion-theme");
  const shouldUseDark = savedTheme !== "light";

  document.body.classList.toggle("dark-mode", shouldUseDark);
  updateThemeButton();
}

function toggleTheme() {
  const nextDark = !document.body.classList.contains("dark-mode");
  document.body.classList.toggle("dark-mode", nextDark);
  localStorage.setItem("orion-theme", nextDark ? "dark" : "light");
  updateThemeButton();
}

/* =========================
   CATEGORIAS / SITE / HOME / ESTÉTICA
========================= */
function normalizeCategory(category, index) {
  return {
    ...category,
    id: category?.id || crypto.randomUUID(),
    nome: category?.nome || category?.name || category?.titulo || "Categoria",
    slug:
      category?.slug ||
      slugify(
        category?.nome || category?.name || category?.titulo || `categoria-${index + 1}`
      ),
    ordem: Number(category?.ordem ?? index + 1),
    imagem: category?.imagem || category?.image || category?.imageUrl || ""
  };
}

function mergeContent(content) {
  const defaults = createDefaultContent();
  const source = content || {};

  return {
    categories:
      Array.isArray(source.categories) && source.categories.length
        ? source.categories.map(normalizeCategory)
        : defaults.categories,
    siteSettings: {
      ...defaults.siteSettings,
      ...(source.siteSettings || {})
    },
    homeSettings: {
      ...defaults.homeSettings,
      ...(source.homeSettings || {})
    },
    esteticaSettings: {
      ...defaults.esteticaSettings,
      ...(source.esteticaSettings || {}),
      hero: {
        ...defaults.esteticaSettings.hero,
        ...(source.esteticaSettings?.hero || {})
      },
      servicesSection: {
        ...defaults.esteticaSettings.servicesSection,
        ...(source.esteticaSettings?.servicesSection || {})
      },
      processSection: {
        ...defaults.esteticaSettings.processSection,
        ...(source.esteticaSettings?.processSection || {})
      },
      gallerySection: {
        ...defaults.esteticaSettings.gallerySection,
        ...(source.esteticaSettings?.gallerySection || {})
      },
      cta: {
        ...defaults.esteticaSettings.cta,
        ...(source.esteticaSettings?.cta || {})
      },
      location: {
        ...defaults.esteticaSettings.location,
        ...(source.esteticaSettings?.location || {})
      },
      gallery: {
        ...defaults.esteticaSettings.gallery,
        ...(source.esteticaSettings?.gallery || {})
      },
      services:
        Array.isArray(source.esteticaSettings?.services) &&
        source.esteticaSettings.services.length
          ? source.esteticaSettings.services.map((service) => ({
              id: service?.id || crypto.randomUUID(),
              title: service?.title || "",
              text: service?.text || ""
            }))
          : defaults.esteticaSettings.services
    }
  };
}

function setContentCache(content) {
  contentCache = mergeContent(content);
  return contentCache;
}

async function fetchContent() {
  const payload = await apiRequest("/content");
  return setContentCache(payload?.data || {});
}

function getCategories() {
  if (!contentCache) {
    setContentCache(createDefaultContent());
  }

  return contentCache.categories;
}

function saveCategories(categories) {
  if (!contentCache) {
    setContentCache(createDefaultContent());
  }

  contentCache.categories = categories.map(normalizeCategory);
  return contentCache.categories;
}

async function persistCategories() {
  const payload = await apiRequest("/content/categories", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      categories: getCategories()
    })
  });

  return setContentCache(payload?.data || {});
}

function getSiteSettings() {
  if (!contentCache) {
    setContentCache(createDefaultContent());
  }

  return contentCache.siteSettings;
}

function saveSiteSettings(settings) {
  if (!contentCache) {
    setContentCache(createDefaultContent());
  }

  contentCache.siteSettings = {
    ...getDefaultSiteSettings(),
    ...(settings || {})
  };

  return contentCache.siteSettings;
}

async function persistSiteSettings() {
  const payload = await apiRequest("/content/site-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      siteSettings: getSiteSettings()
    })
  });

  return setContentCache(payload?.data || {});
}

function getHomeSettings() {
  if (!contentCache) {
    setContentCache(createDefaultContent());
  }

  return contentCache.homeSettings;
}

function saveHomeSettings(settings) {
  if (!contentCache) {
    setContentCache(createDefaultContent());
  }

  contentCache.homeSettings = {
    ...getDefaultHomeSettings(),
    ...(settings || {})
  };

  return contentCache.homeSettings;
}

async function persistHomeSettings() {
  const payload = await apiRequest("/content/home-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      homeSettings: getHomeSettings()
    })
  });

  return setContentCache(payload?.data || {});
}

function getEsteticaSettings() {
  if (!contentCache) {
    setContentCache(createDefaultContent());
  }

  return contentCache.esteticaSettings;
}

function saveEsteticaSettings(settings) {
  if (!contentCache) {
    setContentCache(createDefaultContent());
  }

  contentCache.esteticaSettings = mergeContent({
    esteticaSettings: settings || {}
  }).esteticaSettings;

  return contentCache.esteticaSettings;
}

async function persistEsteticaSettings() {
  const payload = await apiRequest("/content/estetica-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      esteticaSettings: getEsteticaSettings()
    })
  });

  return setContentCache(payload?.data || {});
}

/* =========================
   CATEGORIAS
========================= */
function populateCategorySelects() {
  const categories = sortByOrder(getCategories());

  if (categoriaInput) {
    categoriaInput.innerHTML = `
      <option value="">Selecione</option>
      ${categories
        .map((category) => `<option value="${category.slug}">${category.nome}</option>`)
        .join("")}
    `;
  }

  if (adminCategoryFilter) {
    adminCategoryFilter.innerHTML = `
      <option value="todos">Todas</option>
      ${categories
        .map((category) => `<option value="${category.slug}">${category.nome}</option>`)
        .join("")}
    `;
  }
}

function renderCategoryImagePreview() {
  if (!categoryImagePreview) return;

  if (!currentCategoryImage) {
    categoryImagePreview.innerHTML =
      `<p class="empty-message">Nenhuma imagem selecionada.</p>`;
    return;
  }

  categoryImagePreview.innerHTML = `
    <div class="image-card">
      <div class="image-card-thumb">
        <img src="${toApiImageUrl(currentCategoryImage)}" alt="Preview da categoria" />
      </div>
    </div>
  `;
}

function validateCategoryForm() {
  if (isUploadingCategoryImage) {
    showAlert("Aguarde o upload da imagem da categoria terminar.");
    return false;
  }

  if (!categoryNameInput?.value.trim()) {
    showAlert("Preencha o nome da categoria.");
    categoryNameInput?.focus();
    return false;
  }

  if (!categorySlugInput?.value.trim()) {
    showAlert("Preencha o slug da categoria.");
    categorySlugInput?.focus();
    return false;
  }

  if (!categoryOrderInput?.value.trim()) {
    showAlert("Preencha a ordem da categoria.");
    categoryOrderInput?.focus();
    return false;
  }

  if (!currentCategoryImage) {
    showAlert("Envie uma imagem para a categoria.");
    return false;
  }

  return true;
}

function clearCategoryForm() {
  if (!categoryForm) return;

  categoryForm.reset();
  if (categoryIdInput) categoryIdInput.value = "";
  if (categoryOrderInput) categoryOrderInput.value = getNextOrder(getCategories());
  currentCategoryImage = "";
  isUploadingCategoryImage = false;
  renderCategoryImagePreview();
}

function fillCategoryForm(category) {
  if (!category) return;

  if (categoryIdInput) categoryIdInput.value = category.id;
  if (categoryNameInput) categoryNameInput.value = category.nome;
  if (categorySlugInput) categorySlugInput.value = category.slug;
  if (categoryOrderInput) categoryOrderInput.value = category.ordem;
  currentCategoryImage = category.imagem || "";
  renderCategoryImagePreview();

  activateTab("categoriesTab");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCategoriesList() {
  if (!categoriesList) return;

  const categories = sortByOrder(getCategories());

  if (!categories.length) {
    setListStatus(
      categoriesListStatus,
      "Nenhuma categoria cadastrada",
      "Cadastre categorias para organizar a home e os filtros do estoque."
    );
    categoriesList.innerHTML = `<p class="empty-message">Nenhuma categoria cadastrada.</p>`;
    return;
  }

  setListStatus(categoriesListStatus);
  categoriesList.innerHTML = categories
    .map((category) => `
      <div class="car-item">
        <div class="car-item-image">
          <img src="${toApiImageUrl(category.imagem)}" alt="${escapeHtml(category.nome)}" />
        </div>

        <div class="car-item-content">
          <h3>${escapeHtml(category.nome)}</h3>

          <div class="car-item-meta">
            Slug: ${escapeHtml(category.slug)}<br>
            Ordem: ${Number(category.ordem || 0)}
          </div>

          <div class="car-item-badges">
            <span class="mini-badge neutral">${escapeHtml(category.slug)}</span>
          </div>
        </div>

        <div class="car-item-actions">
          <button class="btn-small btn-edit" data-category-edit="${category.id}">Editar</button>
          <button class="btn-small btn-delete" data-category-delete="${category.id}">Excluir</button>
        </div>
      </div>
    `)
    .join("");
}

async function handleCategoryImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("images", file);

  isUploadingCategoryImage = true;

  try {
    const payload = await apiRequest("/uploads", {
      method: "POST",
      body: formData
    });

    currentCategoryImage = payload?.data?.[0]?.url || "";
    renderCategoryImagePreview();
    showToast("Imagem da categoria enviada com sucesso.", "success");
  } catch (error) {
    showAlert(error.message);
  } finally {
    isUploadingCategoryImage = false;
    event.target.value = "";
  }
}

async function handleCategorySubmit(event) {
  event.preventDefault();

  if (!validateCategoryForm()) return;

  const categories = getCategories();
  const categoryId = categoryIdInput?.value || crypto.randomUUID();

  const categoryData = {
    id: categoryId,
    nome: categoryNameInput.value.trim(),
    slug: slugify(categorySlugInput.value.trim()),
    ordem: Number(categoryOrderInput.value),
    imagem: currentCategoryImage
  };

  const index = categories.findIndex((item) => item.id === categoryId);

  if (index >= 0) {
    categories[index] = categoryData;
  } else {
    categories.push(categoryData);
  }

  try {
    saveCategories(categories);
    await persistCategories();
    populateCategorySelects();
    renderCategoriesList();
    renderStats();
    clearCategoryForm();
    showToast("Categoria salva com sucesso.", "success");
  } catch (error) {
    showAlert(error.message);
  }
}

async function handleCategoriesListClick(event) {
  const editButton = event.target.closest("[data-category-edit]");
  const deleteButton = event.target.closest("[data-category-delete]");
  const categories = getCategories();

  if (editButton) {
    const category = categories.find(
      (item) => item.id === editButton.dataset.categoryEdit
    );
    if (category) fillCategoryForm(category);
    return;
  }

  if (deleteButton) {
    const confirmed = confirm("Tem certeza que deseja excluir esta categoria?");
    if (!confirmed) return;

    const updated = categories.filter(
      (item) => item.id !== deleteButton.dataset.categoryDelete
    );

    try {
      saveCategories(updated);
      await persistCategories();
      populateCategorySelects();
      renderCategoriesList();
      renderStats();
      clearCategoryForm();
      showToast("Categoria excluída com sucesso.", "success");
    } catch (error) {
      showAlert(error.message);
    }
  }
}

/* =========================
   SITE / HOME
========================= */
function fillSiteSettingsForm() {
  const settings = getSiteSettings();

  if (siteWhatsappInput) siteWhatsappInput.value = settings.whatsapp || "";
  if (siteInstagramInput) siteInstagramInput.value = settings.instagram || "";
  if (siteAddressInput) siteAddressInput.value = settings.address || "";
  if (siteMapUrlInput) siteMapUrlInput.value = settings.mapUrl || "";
  if (sitePhoneDisplayInput) sitePhoneDisplayInput.value = settings.phoneDisplay || "";
  if (siteCityDisplayInput) siteCityDisplayInput.value = settings.cityDisplay || "";
}

async function handleSiteSettingsSubmit(event) {
  event.preventDefault();

  const settings = {
    whatsapp: siteWhatsappInput?.value.trim() || "",
    instagram: siteInstagramInput?.value.trim() || "",
    address: siteAddressInput?.value.trim() || "",
    mapUrl: siteMapUrlInput?.value.trim() || "",
    phoneDisplay: sitePhoneDisplayInput?.value.trim() || "",
    cityDisplay: siteCityDisplayInput?.value.trim() || ""
  };

  try {
    saveSiteSettings(settings);
    await persistSiteSettings();
    showToast("Configurações do site salvas com sucesso.", "success");
  } catch (error) {
    showAlert(error.message);
  }
}

async function resetSiteSettings() {
  const confirmed = confirm("Deseja restaurar as configurações padrão do site?");
  if (!confirmed) return;

  try {
    saveSiteSettings(getDefaultSiteSettings());
    await persistSiteSettings();
    fillSiteSettingsForm();
    showToast("Configurações do site restauradas.", "success");
  } catch (error) {
    showAlert(error.message);
  }
}

function fillHomeSettingsForm() {
  const settings = getHomeSettings();

  if (homeBadgeInput) homeBadgeInput.value = settings.badge || "";
  if (homeTitleInput) homeTitleInput.value = settings.title || "";
  if (homeSubtitleInput) homeSubtitleInput.value = settings.subtitle || "";
  if (homePrimaryButtonTextInput) {
    homePrimaryButtonTextInput.value = settings.primaryButtonText || "";
  }
  if (homeSecondaryButtonTextInput) {
    homeSecondaryButtonTextInput.value = settings.secondaryButtonText || "";
  }
  if (homeWhyTitleInput) homeWhyTitleInput.value = settings.whyTitle || "";
  if (homeWhySubtitleInput) homeWhySubtitleInput.value = settings.whySubtitle || "";
}

async function handleHomeSettingsSubmit(event) {
  event.preventDefault();

  const settings = {
    badge: homeBadgeInput?.value.trim() || "",
    title: homeTitleInput?.value.trim() || "",
    subtitle: homeSubtitleInput?.value.trim() || "",
    primaryButtonText: homePrimaryButtonTextInput?.value.trim() || "",
    secondaryButtonText: homeSecondaryButtonTextInput?.value.trim() || "",
    whyTitle: homeWhyTitleInput?.value.trim() || "",
    whySubtitle: homeWhySubtitleInput?.value.trim() || ""
  };

  try {
    saveHomeSettings(settings);
    await persistHomeSettings();
    showToast("Configurações da home salvas com sucesso.", "success");
  } catch (error) {
    showAlert(error.message);
  }
}

async function resetHomeSettings() {
  const confirmed = confirm("Deseja restaurar as configurações padrão da home?");
  if (!confirmed) return;

  try {
    saveHomeSettings(getDefaultHomeSettings());
    await persistHomeSettings();
    fillHomeSettingsForm();
    showToast("Configurações da home restauradas.", "success");
  } catch (error) {
    showAlert(error.message);
  }
}

/* =========================
   ESTÉTICA - SERVIÇOS
========================= */
function createEmptyService() {
  return {
    id: crypto.randomUUID(),
    title: "",
    text: ""
  };
}

function renderEsteticaServicesList() {
  if (!esteticaServicesList) return;

  const settings = getEsteticaSettings();
  const services = Array.isArray(settings.services) ? settings.services : [];

  if (!services.length) {
    esteticaServicesList.innerHTML = `
      <p class="empty-message">Nenhum serviço cadastrado.</p>
    `;
    return;
  }

  esteticaServicesList.innerHTML = services
    .map((service, index) => `
      <div class="service-admin-item" data-service-id="${service.id}">
        <div class="form-grid">
          <div class="field">
            <label>Título do serviço ${index + 1}</label>
            <input
              type="text"
              class="estetica-service-title"
              data-service-field="title"
              data-service-id="${service.id}"
              value="${escapeHtml(service.title)}"
              placeholder="Ex: Higienização Interna"
            />
          </div>

          <div class="field full">
            <label>Descrição do serviço ${index + 1}</label>
            <textarea
              class="estetica-service-text"
              data-service-field="text"
              data-service-id="${service.id}"
              placeholder="Descreva o serviço"
            >${escapeHtml(service.text)}</textarea>
          </div>
        </div>

        <div class="car-item-actions" style="margin-top: 12px;">
          <button type="button" class="btn-small btn-delete" data-remove-estetica-service="${service.id}">
            Remover serviço
          </button>
        </div>
      </div>
    `)
    .join("");
}

function updateEsteticaServiceField(serviceId, field, value) {
  const settings = getEsteticaSettings();
  settings.services = (settings.services || []).map((service) => {
    if (service.id !== serviceId) return service;
    return {
      ...service,
      [field]: value
    };
  });
  saveEsteticaSettings(settings);
}

function addEsteticaService() {
  const settings = getEsteticaSettings();
  settings.services = Array.isArray(settings.services) ? settings.services : [];
  settings.services.push(createEmptyService());
  saveEsteticaSettings(settings);
  renderEsteticaServicesList();
}

function removeEsteticaService(serviceId) {
  const settings = getEsteticaSettings();
  settings.services = (settings.services || []).filter((service) => service.id !== serviceId);
  saveEsteticaSettings(settings);
  renderEsteticaServicesList();
}

/* =========================
   ESTÉTICA - IMAGENS
========================= */
function renderSimpleImagePreview(container, imageUrl, emptyLabel) {
  if (!container) return;

  if (!imageUrl) {
    container.innerHTML = `<p class="empty-message">${emptyLabel}</p>`;
    return;
  }

  container.innerHTML = `
    <div class="image-card">
      <div class="image-card-thumb">
        <img src="${toApiImageUrl(imageUrl)}" alt="Preview" />
      </div>
    </div>
  `;
}

function renderEsteticaImagePreviews() {
  renderSimpleImagePreview(
    esteticaHeroImagePreview,
    currentEsteticaHeroImage,
    "Nenhuma imagem do hero enviada."
  );

  renderSimpleImagePreview(
    esteticaGalleryMainImagePreview,
    currentEsteticaGalleryMainImage,
    "Nenhuma imagem principal enviada."
  );

  renderSimpleImagePreview(
    esteticaGallery1ImagePreview,
    currentEsteticaGallery1Image,
    "Nenhuma imagem enviada."
  );

  renderSimpleImagePreview(
    esteticaGallery2ImagePreview,
    currentEsteticaGallery2Image,
    "Nenhuma imagem enviada."
  );

  renderSimpleImagePreview(
    esteticaGallery3ImagePreview,
    currentEsteticaGallery3Image,
    "Nenhuma imagem enviada."
  );

  renderSimpleImagePreview(
    esteticaGallery4ImagePreview,
    currentEsteticaGallery4Image,
    "Nenhuma imagem enviada."
  );
}

async function handleEsteticaSingleImageUpload(event, targetKey) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    isUploadingEsteticaImage = true;

    const imageUrl = await uploadSingleImage(file);
    const settings = getEsteticaSettings();

    if (targetKey === "hero") {
      currentEsteticaHeroImage = imageUrl;
      settings.hero.image = imageUrl;
    }

    if (targetKey === "galleryMain") {
      currentEsteticaGalleryMainImage = imageUrl;
      settings.gallery.mainImage = imageUrl;
    }

    if (targetKey === "gallery1") {
      currentEsteticaGallery1Image = imageUrl;
      settings.gallery.image1 = imageUrl;
    }

    if (targetKey === "gallery2") {
      currentEsteticaGallery2Image = imageUrl;
      settings.gallery.image2 = imageUrl;
    }

    if (targetKey === "gallery3") {
      currentEsteticaGallery3Image = imageUrl;
      settings.gallery.image3 = imageUrl;
    }

    if (targetKey === "gallery4") {
      currentEsteticaGallery4Image = imageUrl;
      settings.gallery.image4 = imageUrl;
    }

    saveEsteticaSettings(settings);
    await persistEsteticaSettings();
    renderEsteticaImagePreviews();
    showToast("Imagem da estética enviada com sucesso.", "success");
  } catch (error) {
    showAlert(error.message);
  } finally {
    isUploadingEsteticaImage = false;
    event.target.value = "";
  }
}

/* =========================
   ESTÉTICA - FORM
========================= */
function fillEsteticaSettingsForm() {
  if (!esteticaSettingsForm) return;

  const settings = getEsteticaSettings();

  if (esteticaHeroBadgeInput) esteticaHeroBadgeInput.value = settings.hero.badge || "";
  if (esteticaHeroTitleInput) esteticaHeroTitleInput.value = settings.hero.title || "";
  if (esteticaHeroSubtitleInput) esteticaHeroSubtitleInput.value = settings.hero.subtitle || "";
  if (esteticaHeroPrimaryButtonTextInput) {
    esteticaHeroPrimaryButtonTextInput.value = settings.hero.primaryButtonText || "";
  }
  if (esteticaHeroSecondaryButtonTextInput) {
    esteticaHeroSecondaryButtonTextInput.value = settings.hero.secondaryButtonText || "";
  }
  if (esteticaHeroPrimaryButtonUrlInput) {
    esteticaHeroPrimaryButtonUrlInput.value = settings.hero.primaryButtonUrl || "";
  }
  if (esteticaHeroSecondaryButtonUrlInput) {
    esteticaHeroSecondaryButtonUrlInput.value = settings.hero.secondaryButtonUrl || "";
  }

  if (esteticaServicesTitleInput) {
    esteticaServicesTitleInput.value = settings.servicesSection.title || "";
  }
  if (esteticaServicesSubtitleInput) {
    esteticaServicesSubtitleInput.value = settings.servicesSection.subtitle || "";
  }

  if (esteticaProcessTitleInput) {
    esteticaProcessTitleInput.value = settings.processSection.title || "";
  }
  if (esteticaProcessSubtitleInput) {
    esteticaProcessSubtitleInput.value = settings.processSection.subtitle || "";
  }

  if (esteticaGalleryTitleInput) {
    esteticaGalleryTitleInput.value = settings.gallerySection.title || "";
  }
  if (esteticaGallerySubtitleInput) {
    esteticaGallerySubtitleInput.value = settings.gallerySection.subtitle || "";
  }

  if (esteticaCtaBadgeInput) esteticaCtaBadgeInput.value = settings.cta.badge || "";
  if (esteticaCtaTitleInput) esteticaCtaTitleInput.value = settings.cta.title || "";
  if (esteticaCtaSubtitleInput) esteticaCtaSubtitleInput.value = settings.cta.subtitle || "";
  if (esteticaCtaPrimaryButtonTextInput) {
    esteticaCtaPrimaryButtonTextInput.value = settings.cta.primaryButtonText || "";
  }
  if (esteticaCtaSecondaryButtonTextInput) {
    esteticaCtaSecondaryButtonTextInput.value = settings.cta.secondaryButtonText || "";
  }
  if (esteticaCtaPrimaryButtonUrlInput) {
    esteticaCtaPrimaryButtonUrlInput.value = settings.cta.primaryButtonUrl || "";
  }
  if (esteticaCtaSecondaryButtonUrlInput) {
    esteticaCtaSecondaryButtonUrlInput.value = settings.cta.secondaryButtonUrl || "";
  }

  if (esteticaLocationTitleInput) {
    esteticaLocationTitleInput.value = settings.location.title || "";
  }
  if (esteticaLocationSubtitleInput) {
    esteticaLocationSubtitleInput.value = settings.location.subtitle || "";
  }
  if (esteticaLocationNameInput) {
    esteticaLocationNameInput.value = settings.location.name || "";
  }
  if (esteticaLocationLabelInput) {
    esteticaLocationLabelInput.value = settings.location.label || "";
  }
  if (esteticaLocationAddress1Input) {
    esteticaLocationAddress1Input.value = settings.location.address1 || "";
  }
  if (esteticaLocationAddress2Input) {
    esteticaLocationAddress2Input.value = settings.location.address2 || "";
  }
  if (esteticaLocationInstagramInput) {
    esteticaLocationInstagramInput.value = settings.location.instagram || "";
  }
  if (esteticaLocationMapsUrlInput) {
    esteticaLocationMapsUrlInput.value = settings.location.mapsUrl || "";
  }
  if (esteticaLocationMapEmbedInput) {
    esteticaLocationMapEmbedInput.value = settings.location.mapEmbed || "";
  }
  if (esteticaLocationWhatsappInput) {
    esteticaLocationWhatsappInput.value = settings.location.whatsapp || "";
  }

  currentEsteticaHeroImage = settings.hero.image || "";
  currentEsteticaGalleryMainImage = settings.gallery.mainImage || "";
  currentEsteticaGallery1Image = settings.gallery.image1 || "";
  currentEsteticaGallery2Image = settings.gallery.image2 || "";
  currentEsteticaGallery3Image = settings.gallery.image3 || "";
  currentEsteticaGallery4Image = settings.gallery.image4 || "";

  renderEsteticaServicesList();
  renderEsteticaImagePreviews();
}

async function handleEsteticaSettingsSubmit(event) {
  event.preventDefault();

  if (isUploadingEsteticaImage) {
    showAlert("Aguarde o upload das imagens terminar.");
    return;
  }

  const current = getEsteticaSettings();

  const settings = {
    ...current,
    hero: {
      ...current.hero,
      badge: esteticaHeroBadgeInput?.value.trim() || "",
      title: esteticaHeroTitleInput?.value.trim() || "",
      subtitle: esteticaHeroSubtitleInput?.value.trim() || "",
      primaryButtonText: esteticaHeroPrimaryButtonTextInput?.value.trim() || "",
      secondaryButtonText: esteticaHeroSecondaryButtonTextInput?.value.trim() || "",
      primaryButtonUrl: esteticaHeroPrimaryButtonUrlInput?.value.trim() || "",
      secondaryButtonUrl: esteticaHeroSecondaryButtonUrlInput?.value.trim() || "",
      image: currentEsteticaHeroImage || ""
    },
    servicesSection: {
      ...current.servicesSection,
      title: esteticaServicesTitleInput?.value.trim() || "",
      subtitle: esteticaServicesSubtitleInput?.value.trim() || ""
    },
    processSection: {
      ...current.processSection,
      title: esteticaProcessTitleInput?.value.trim() || "",
      subtitle: esteticaProcessSubtitleInput?.value.trim() || ""
    },
    gallerySection: {
      ...current.gallerySection,
      title: esteticaGalleryTitleInput?.value.trim() || "",
      subtitle: esteticaGallerySubtitleInput?.value.trim() || ""
    },
    cta: {
      ...current.cta,
      badge: esteticaCtaBadgeInput?.value.trim() || "",
      title: esteticaCtaTitleInput?.value.trim() || "",
      subtitle: esteticaCtaSubtitleInput?.value.trim() || "",
      primaryButtonText: esteticaCtaPrimaryButtonTextInput?.value.trim() || "",
      secondaryButtonText: esteticaCtaSecondaryButtonTextInput?.value.trim() || "",
      primaryButtonUrl: esteticaCtaPrimaryButtonUrlInput?.value.trim() || "",
      secondaryButtonUrl: esteticaCtaSecondaryButtonUrlInput?.value.trim() || ""
    },
    location: {
      ...current.location,
      title: esteticaLocationTitleInput?.value.trim() || "",
      subtitle: esteticaLocationSubtitleInput?.value.trim() || "",
      name: esteticaLocationNameInput?.value.trim() || "",
      label: esteticaLocationLabelInput?.value.trim() || "",
      address1: esteticaLocationAddress1Input?.value.trim() || "",
      address2: esteticaLocationAddress2Input?.value.trim() || "",
      instagram: esteticaLocationInstagramInput?.value.trim() || "",
      mapsUrl: esteticaLocationMapsUrlInput?.value.trim() || "",
      mapEmbed: esteticaLocationMapEmbedInput?.value.trim() || "",
      whatsapp: esteticaLocationWhatsappInput?.value.trim() || ""
    },
    gallery: {
      ...current.gallery,
      mainImage: currentEsteticaGalleryMainImage || "",
      image1: currentEsteticaGallery1Image || "",
      image2: currentEsteticaGallery2Image || "",
      image3: currentEsteticaGallery3Image || "",
      image4: currentEsteticaGallery4Image || ""
    }
  };

  try {
    saveEsteticaSettings(settings);
    await persistEsteticaSettings();
    showToast("Configurações da estética salvas com sucesso.", "success");
  } catch (error) {
    showAlert(error.message);
  }
}

async function resetEsteticaSettings() {
  const confirmed = confirm("Deseja restaurar as configurações padrão da estética?");
  if (!confirmed) return;

  try {
    saveEsteticaSettings(getDefaultEsteticaSettings());
    await persistEsteticaSettings();
    fillEsteticaSettingsForm();
    showToast("Configurações da estética restauradas.", "success");
  } catch (error) {
    showAlert(error.message);
  }
}

/* =========================
   VEÍCULOS - BACKEND
========================= */
function normalizeVehicleFromApi(vehicle) {
  const rawImages = Array.isArray(vehicle?.images) ? vehicle.images : [];

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
    ...vehicle,
    _id: String(vehicle?._id || vehicle?.id || ""),
    destaque: normalizeBoolean(vehicle?.destaque),
    destaqueHome: normalizeBoolean(vehicle?.destaqueHome),
    status: normalizeStatus(vehicle?.status),
    images: normalizedImages,
    coverIndex: Number(vehicle?.coverIndex || 0)
  };
}

async function fetchVehicles() {
  const payload = await apiRequest("/vehicles");
  vehiclesCache = Array.isArray(payload?.data)
    ? payload.data.map(normalizeVehicleFromApi)
    : [];
  return vehiclesCache;
}

function getFilteredAdminCars() {
  const search = normalizeText(adminSearchInput?.value);
  const statusFilter = normalizeText(adminStatusFilter?.value || "todos");
  const categoryFilter = normalizeText(adminCategoryFilter?.value || "todos");

  return sortByOrder(vehiclesCache).filter((vehicle) => {
    const matchesSearch =
      !search ||
      normalizeText(vehicle.titulo).includes(search) ||
      normalizeText(vehicle.marca).includes(search) ||
      normalizeText(vehicle.modelo).includes(search) ||
      normalizeText(vehicle.tags).includes(search) ||
      normalizeText(vehicle.descricao).includes(search);

    const matchesStatus =
      statusFilter === "todos" || normalizeStatus(vehicle.status) === statusFilter;

    const matchesCategory =
      categoryFilter === "todos" ||
      normalizeText(vehicle.categoria) === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });
}

function updateSelectedImagesCount() {
  if (!selectedImagesCount) return;
  selectedImagesCount.textContent = `${currentFormImages.length} imagem(ns)`;
}

function renderVehicleImages() {
  if (!imagesUnifiedList) return;

  updateSelectedImagesCount();

  if (!currentFormImages.length) {
    imagesUnifiedList.innerHTML =
      `<p class="empty-message">Nenhuma imagem enviada ainda.</p>`;
    return;
  }

  imagesUnifiedList.innerHTML = currentFormImages
    .map((image, index) => {
      const isCover = index === currentCoverIndex;

      return `
        <div class="image-card ${isCover ? "cover-selected" : ""}">
          <div class="image-card-thumb">
            <img src="${toApiImageUrl(image.url)}" alt="Imagem ${index + 1}" />
          </div>

          <div class="image-card-body">
            <div class="car-item-badges">
              <span class="mini-badge ${isCover ? "" : "neutral"}">
                ${isCover ? "Capa" : "Imagem"}
              </span>
            </div>

            <div class="car-item-actions">
              <button
                type="button"
                class="btn-small btn-edit"
                data-image-cover="${index}"
              >
                ${isCover ? "Capa atual" : "Definir capa"}
              </button>

              <button
                type="button"
                class="btn-small btn-delete"
                data-image-remove="${index}"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function clearVehicleForm() {
  if (!carForm) return;

  carForm.reset();

  if (carIdInput) carIdInput.value = "";
  currentFormImages = [];
  currentCoverIndex = 0;

  if (ordemInput) ordemInput.value = getNextOrder(vehiclesCache);
  if (statusInput) statusInput.value = "disponivel";
  if (destaqueInput) destaqueInput.checked = false;
  if (destaqueHomeInput) destaqueHomeInput.checked = false;
  if (formMode) formMode.textContent = "Novo cadastro";

  renderVehicleImages();
  updateSelectedImagesCount();
  setSaveButtonState(false, "Salvar carro");
}

function fillVehicleForm(vehicle) {
  if (!vehicle) return;

  if (carIdInput) carIdInput.value = vehicle._id || "";
  if (tituloInput) tituloInput.value = vehicle.titulo || "";
  if (marcaInput) marcaInput.value = vehicle.marca || "";
  if (modeloInput) modeloInput.value = vehicle.modelo || "";
  if (anoInput) anoInput.value = vehicle.ano || "";
  if (combustivelInput) combustivelInput.value = vehicle.combustivel || "";
  if (kmInput) kmInput.value = vehicle.km || "";
  if (precoInput) precoInput.value = vehicle.preco || "";
  if (cidadeInput) cidadeInput.value = vehicle.cidade || "";
  if (categoriaInput) categoriaInput.value = vehicle.categoria || "";
  if (statusInput) statusInput.value = normalizeStatus(vehicle.status);
  if (tagInput) tagInput.value = vehicle.tag || "";
  if (ordemInput) ordemInput.value = Number(vehicle.ordem || 0);
  if (destaqueInput) destaqueInput.checked = normalizeBoolean(vehicle.destaque);
  if (destaqueHomeInput) {
    destaqueHomeInput.checked = normalizeBoolean(vehicle.destaqueHome);
  }
  if (descricaoInput) descricaoInput.value = vehicle.descricao || "";
  if (opcionaisInput) opcionaisInput.value = vehicle.opcionais || "";
  if (tagsInput) tagsInput.value = vehicle.tags || "";
  if (whatsappTextInput) whatsappTextInput.value = vehicle.whatsappText || "";

  currentFormImages = Array.isArray(vehicle.images) ? [...vehicle.images] : [];
  currentCoverIndex = Number(vehicle.coverIndex || 0);

  if (currentCoverIndex < 0 || currentCoverIndex >= currentFormImages.length) {
    currentCoverIndex = 0;
  }

  if (formMode) formMode.textContent = "Editando veículo";

  renderVehicleImages();
  activateTab("vehiclesTab");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function validateVehicleForm() {
  if (isUploadingVehicleImages) {
    showAlert("Aguarde o upload das imagens terminar.");
    return false;
  }

  const requiredFields = [
    { input: tituloInput, message: "Preencha o título." },
    { input: marcaInput, message: "Preencha a marca." },
    { input: modeloInput, message: "Preencha o modelo." },
    { input: anoInput, message: "Preencha o ano." },
    { input: combustivelInput, message: "Preencha o combustível." },
    { input: kmInput, message: "Preencha a quilometragem." },
    { input: precoInput, message: "Preencha o preço." },
    { input: cidadeInput, message: "Preencha a cidade." },
    { input: categoriaInput, message: "Selecione a categoria." },
    { input: statusInput, message: "Selecione o status." },
    { input: ordemInput, message: "Preencha a ordem de exibição." }
  ];

  for (const field of requiredFields) {
    if (!field.input?.value?.trim()) {
      showAlert(field.message);
      field.input?.focus();
      return false;
    }
  }

  if (!currentFormImages.length) {
    showAlert("Envie pelo menos uma imagem do veículo.");
    return false;
  }

  return true;
}

function getVehiclePayloadFromForm() {
  const images = currentFormImages.map((image) => ({
    url: String(image.url || "").trim(),
    filename: String(image.filename || "").trim()
  }));

  // Validar coverIndex: não pode ser >= images.length
  let validCoverIndex = Number(currentCoverIndex || 0);
  if (validCoverIndex >= images.length) {
    validCoverIndex = 0;
  }

  return {
    titulo: tituloInput?.value.trim() || "",
    marca: marcaInput?.value.trim() || "",
    modelo: modeloInput?.value.trim() || "",
    ano: anoInput?.value.trim() || "",
    combustivel: combustivelInput?.value.trim() || "",
    km: kmInput?.value.trim() || "",
    preco: precoInput?.value.trim() || "",
    cidade: cidadeInput?.value.trim() || "",
    categoria: categoriaInput?.value.trim() || "",
    status: normalizeStatus(statusInput?.value),
    tag: tagInput?.value.trim() || "",
    ordem: Number(ordemInput?.value || 0),
    destaque: Boolean(destaqueInput?.checked),
    destaqueHome: Boolean(destaqueHomeInput?.checked),
    descricao: descricaoInput?.value.trim() || "",
    opcionais: opcionaisInput?.value.trim() || "",
    tags: tagsInput?.value.trim() || "",
    whatsappText:
      whatsappTextInput?.value.trim() ||
      `Olá! Tenho interesse no ${tituloInput?.value.trim() || "veículo"}.`,
    images: images,
    coverIndex: validCoverIndex
  };
}

async function handleVehicleSubmit(event) {
  event.preventDefault();

  if (!validateVehicleForm() || isSavingVehicle) return;

  const vehicleId = carIdInput?.value?.trim();
  const payload = getVehiclePayloadFromForm();

  try {
    isSavingVehicle = true;
    setSaveButtonState(true, vehicleId ? "Salvando alterações..." : "Salvando carro...");

    if (vehicleId) {
      await apiRequest(`/vehicles/${vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } else {
      await apiRequest("/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    }

    await fetchVehicles();
    renderVehiclesList();
    renderStats();
    clearVehicleForm();
    showToast(vehicleId ? "Veículo atualizado com sucesso." : "Veículo cadastrado com sucesso.", "success");
  } catch (error) {
    showAlert(error.message);
  } finally {
    isSavingVehicle = false;
    setSaveButtonState(false, "Salvar carro");
  }
}

async function handleResetAllCars() {
  const confirmed = confirm(
    "Deseja remover os veículos atuais e restaurar os carros padrão?"
  );
  if (!confirmed) return;

  try {
    setSaveButtonState(true, "Restaurando...");
    const currentVehicles = [...vehiclesCache];

    for (const vehicle of currentVehicles) {
      if (vehicle?._id) {
        await apiRequest(`/vehicles/${vehicle._id}`, {
          method: "DELETE"
        });
      }
    }

    const defaults = getDefaultCars();

    for (const vehicle of defaults) {
      await apiRequest("/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(vehicle)
      });
    }

    await fetchVehicles();
    renderVehiclesList();
    renderStats();
    clearVehicleForm();
    showToast("Carros padrão restaurados com sucesso.", "success");
  } catch (error) {
    showAlert(error.message);
  } finally {
    setSaveButtonState(false, "Salvar carro");
  }
}

function renderVehiclesList() {
  if (!carsList) return;

  const vehicles = getFilteredAdminCars();

  if (!vehicles.length) {
    setListStatus(
      carsListStatus,
      "Nenhum veículo encontrado",
      "Ajuste a busca ou os filtros para localizar outros anúncios no painel."
    );
    carsList.innerHTML = `<p class="empty-message">Nenhum veículo encontrado.</p>`;
    return;
  }

  setListStatus(carsListStatus);
  carsList.innerHTML = vehicles
    .map((vehicle) => {
      const firstImage = vehicle.images?.[vehicle.coverIndex] || vehicle.images?.[0];
      const status = normalizeStatus(vehicle.status);

      return `
        <div class="car-item">
          <div class="car-item-image">
            <img
              src="${toApiImageUrl(firstImage?.url || "")}"
              alt="${escapeHtml(vehicle.titulo || "Veículo")}"
            />
          </div>

          <div class="car-item-content">
            <h3>${escapeHtml(vehicle.titulo || "Sem título")}</h3>

            <div class="car-item-meta">
              ${escapeHtml(formatVehiclePrice(vehicle.preco))}
            </div>

            <span class="mini-badge status-${status}">${escapeHtml(status)}</span>
          </div>

          <div class="car-item-actions">
            <button class="btn-small btn-edit" data-car-edit="${vehicle._id}">Editar</button>
            <button class="btn-small btn-delete" data-car-delete="${vehicle._id}">Excluir</button>
          </div>
        </div>
      `;
    })
    .join("");
}

async function handleCarsListClick(event) {
  const editButton = event.target.closest("[data-car-edit]");
  const deleteButton = event.target.closest("[data-car-delete]");

  if (editButton) {
    const vehicle = vehiclesCache.find(
      (item) => item._id === editButton.dataset.carEdit
    );

    if (vehicle) fillVehicleForm(vehicle);
    return;
  }

  if (deleteButton) {
    const confirmed = confirm("Tem certeza que deseja excluir este veículo?");
    if (!confirmed) return;

    try {
      await apiRequest(`/vehicles/${deleteButton.dataset.carDelete}`, {
        method: "DELETE"
      });

      await fetchVehicles();
      renderVehiclesList();
      renderStats();

      if (carIdInput?.value === deleteButton.dataset.carDelete) {
        clearVehicleForm();
      }

      showToast("Veículo excluído com sucesso.", "success");
    } catch (error) {
      showAlert(error.message);
    }
  }
}

async function handleVehicleImagesUpload(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;

  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  try {
    isUploadingVehicleImages = true;
    setImageUploadStatus("Enviando imagens...");

    const payload = await apiRequest("/uploads", {
      method: "POST",
      body: formData
    });

    const uploadedImages = Array.isArray(payload?.data)
      ? payload.data.map((item) => ({
          url: String(item.url || "").trim(),
          filename: String(item.filename || "").trim()
        }))
      : [];

    currentFormImages = [...currentFormImages, ...uploadedImages];

    if (currentFormImages.length === uploadedImages.length) {
      currentCoverIndex = 0;
    }

    renderVehicleImages();
    setImageUploadStatus("Upload concluído.");
    showToast("Imagens do veículo enviadas com sucesso.", "success");
  } catch (error) {
    showAlert(error.message);
    setImageUploadStatus("");
  } finally {
    isUploadingVehicleImages = false;
    event.target.value = "";

    setTimeout(() => {
      if (!isUploadingVehicleImages) setImageUploadStatus("");
    }, 1400);
  }
}

function handleImagesUnifiedListClick(event) {
  const coverButton = event.target.closest("[data-image-cover]");
  const removeButton = event.target.closest("[data-image-remove]");

  if (coverButton) {
    currentCoverIndex = Number(coverButton.dataset.imageCover || 0);
    renderVehicleImages();
    return;
  }

  if (removeButton) {
    const index = Number(removeButton.dataset.imageRemove || -1);
    if (index < 0) return;

    currentFormImages.splice(index, 1);

    if (!currentFormImages.length) {
      currentCoverIndex = 0;
    } else if (currentCoverIndex >= currentFormImages.length) {
      currentCoverIndex = currentFormImages.length - 1;
    }

    renderVehicleImages();
  }
}

/* =========================
   ESTATÍSTICAS
========================= */
function renderStats() {
  const availableCount = vehiclesCache.filter(
    (vehicle) => normalizeStatus(vehicle.status) === "disponivel"
  ).length;
  const reservedCount = vehiclesCache.filter(
    (vehicle) => normalizeStatus(vehicle.status) === "reservado"
  ).length;
  const soldCount = vehiclesCache.filter(
    (vehicle) => normalizeStatus(vehicle.status) === "vendido"
  ).length;
  const featuredCount = vehiclesCache.filter(
    (vehicle) => vehicle.destaque || vehicle.destaqueHome
  ).length;
  const withoutImageCount = vehiclesCache.filter(
    (vehicle) => !Array.isArray(vehicle.images) || !vehicle.images.some((image) => image?.url)
  ).length;
  const withoutPriceCount = vehiclesCache.filter(
    (vehicle) => !String(vehicle.preco || "").trim()
  ).length;

  if (totalCars) totalCars.textContent = String(vehiclesCache.length);
  if (featuredCars) {
    featuredCars.textContent = String(featuredCount);
  }
  if (soldCars) soldCars.textContent = String(soldCount);
  if (availableCars) availableCars.textContent = String(availableCount);
  if (reservedCars) reservedCars.textContent = String(reservedCount);
  if (totalCategories) totalCategories.textContent = String(getCategories().length);

  if (healthAvailableCars) healthAvailableCars.textContent = String(availableCount);
  if (healthSoldCars) healthSoldCars.textContent = String(soldCount);
  if (healthReservedCars) healthReservedCars.textContent = String(reservedCount);
  if (noImageCars) noImageCars.textContent = String(withoutImageCount);
  if (noPriceCars) noPriceCars.textContent = String(withoutPriceCount);

  renderDashboardFeaturedVehicles();
}

function renderDashboardFeaturedVehicles() {
  if (!dashboardFeaturedList) return;

  const featuredVehicles = sortByOrder(vehiclesCache)
    .filter((vehicle) => vehicle.destaque || vehicle.destaqueHome)
    .slice(0, 6);

  if (!featuredVehicles.length) {
    dashboardFeaturedList.innerHTML = `<p class="empty-message">Nenhum veiculo destacado no momento.</p>`;
    return;
  }

  dashboardFeaturedList.innerHTML = featuredVehicles
    .map((vehicle) => {
      const status = normalizeStatus(vehicle.status);

      return `
        <div class="featured-dashboard-item">
          <div>
            <strong>${escapeHtml(vehicle.titulo || "Sem titulo")}</strong>
            <span>${escapeHtml(formatVehiclePrice(vehicle.preco))}</span>
          </div>
          <span class="mini-badge status-${status}">${escapeHtml(status)}</span>
        </div>
      `;
    })
    .join("");
}

/* =========================
   EVENTOS
========================= */
function setupEventListeners() {
  loginForm?.addEventListener("submit", handleLoginSubmit);
  logoutButton?.addEventListener("click", handleLogout);

  themeToggle?.addEventListener("click", toggleTheme);

  carForm?.addEventListener("submit", handleVehicleSubmit);
  cancelEditButton?.addEventListener("click", clearVehicleForm);
  resetAllCarsButton?.addEventListener("click", handleResetAllCars);
  carsList?.addEventListener("click", handleCarsListClick);

  openImageUploaderButton?.addEventListener("click", () => imageUploader?.click());
  imageUploader?.addEventListener("change", handleVehicleImagesUpload);
  imagesUnifiedList?.addEventListener("click", handleImagesUnifiedListClick);

  adminSearchInput?.addEventListener("input", renderVehiclesList);
  adminStatusFilter?.addEventListener("change", renderVehiclesList);
  adminCategoryFilter?.addEventListener("change", renderVehiclesList);

  categoryForm?.addEventListener("submit", handleCategorySubmit);
  categoryCancelEditButton?.addEventListener("click", clearCategoryForm);
  categoriesList?.addEventListener("click", handleCategoriesListClick);

  categoryNameInput?.addEventListener("input", () => {
    if (!categorySlugInput?.dataset.manualEdit) {
      categorySlugInput.value = slugify(categoryNameInput.value);
    }
  });

  categorySlugInput?.addEventListener("input", () => {
    categorySlugInput.dataset.manualEdit = "true";
  });

  openCategoryUploaderButton?.addEventListener("click", () => categoryImageUpload?.click());
  categoryImageUpload?.addEventListener("change", handleCategoryImageUpload);

  siteSettingsForm?.addEventListener("submit", handleSiteSettingsSubmit);
  resetSiteSettingsButton?.addEventListener("click", resetSiteSettings);

  homeSettingsForm?.addEventListener("submit", handleHomeSettingsSubmit);
  resetHomeSettingsButton?.addEventListener("click", resetHomeSettings);

  esteticaSettingsForm?.addEventListener("submit", handleEsteticaSettingsSubmit);
  resetEsteticaSettingsButton?.addEventListener("click", resetEsteticaSettings);

  addEsteticaServiceButton?.addEventListener("click", addEsteticaService);

  esteticaServicesList?.addEventListener("input", (event) => {
    const target = event.target;
    const serviceId = target.dataset.serviceId;
    const field = target.dataset.serviceField;

    if (!serviceId || !field) return;
    updateEsteticaServiceField(serviceId, field, target.value);
  });

  esteticaServicesList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-estetica-service]");
    if (!button) return;

    const serviceId = button.dataset.removeEsteticaService;
    removeEsteticaService(serviceId);
  });

  openEsteticaHeroUploaderButton?.addEventListener("click", () => {
    esteticaHeroImageUpload?.click();
  });
  esteticaHeroImageUpload?.addEventListener("change", (event) => {
    handleEsteticaSingleImageUpload(event, "hero");
  });

  openEsteticaGalleryMainUploaderButton?.addEventListener("click", () => {
    esteticaGalleryMainImageUpload?.click();
  });
  esteticaGalleryMainImageUpload?.addEventListener("change", (event) => {
    handleEsteticaSingleImageUpload(event, "galleryMain");
  });

  openEsteticaGallery1UploaderButton?.addEventListener("click", () => {
    esteticaGallery1ImageUpload?.click();
  });
  esteticaGallery1ImageUpload?.addEventListener("change", (event) => {
    handleEsteticaSingleImageUpload(event, "gallery1");
  });

  openEsteticaGallery2UploaderButton?.addEventListener("click", () => {
    esteticaGallery2ImageUpload?.click();
  });
  esteticaGallery2ImageUpload?.addEventListener("change", (event) => {
    handleEsteticaSingleImageUpload(event, "gallery2");
  });

  openEsteticaGallery3UploaderButton?.addEventListener("click", () => {
    esteticaGallery3ImageUpload?.click();
  });
  esteticaGallery3ImageUpload?.addEventListener("change", (event) => {
    handleEsteticaSingleImageUpload(event, "gallery3");
  });

  openEsteticaGallery4UploaderButton?.addEventListener("click", () => {
    esteticaGallery4ImageUpload?.click();
  });
  esteticaGallery4ImageUpload?.addEventListener("change", (event) => {
    handleEsteticaSingleImageUpload(event, "gallery4");
  });
}

/* =========================
   INIT
========================= */
async function initAdmin() {
  loadTheme();
  updateAuthUI();
  setupTabs();
  setupEventListeners();

  if (carsList) {
    carsList.innerHTML = renderAdminListSkeleton();
  }

  if (categoriesList) {
    categoriesList.innerHTML = renderAdminListSkeleton(2);
  }

  setContentCache(createDefaultContent());

  try {
    await fetchContent();
  } catch (error) {
    showAlert(error.message);
  }

  populateCategorySelects();
  renderCategoryImagePreview();
  renderCategoriesList();
  fillSiteSettingsForm();
  fillHomeSettingsForm();
  fillEsteticaSettingsForm();

  try {
    await fetchVehicles();
  } catch (error) {
    showAlert(error.message);
  }

  renderVehiclesList();
  renderStats();
  clearVehicleForm();
  clearCategoryForm();
}

initAdmin();
