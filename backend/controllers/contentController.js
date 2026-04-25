const crypto = require("crypto");
const ContentSettings = require("../models/contentSettings");
const { getDefaultContent } = require("../config/defaultContent");

function cloneDefaults() {
  return getDefaultContent();
}

function normalizeText(value) {
  return String(value || "").trim();
}

function normalizeCategories(categories) {
  const defaults = cloneDefaults().categories;
  const source = Array.isArray(categories) && categories.length ? categories : defaults;

  return source.map((category, index) => ({
    id: normalizeText(category?.id) || crypto.randomUUID(),
    nome: normalizeText(category?.nome || category?.name || category?.titulo) || "Categoria",
    slug:
      normalizeText(category?.slug) ||
      normalizeText(category?.nome || category?.name || category?.titulo || `categoria-${index + 1}`)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-"),
    ordem: Number(category?.ordem ?? index + 1),
    imagem: normalizeText(category?.imagem || category?.image || category?.imageUrl)
  }));
}

function normalizeSiteSettings(settings) {
  const defaults = cloneDefaults().siteSettings;
  return {
    whatsapp: normalizeText(settings?.whatsapp || defaults.whatsapp),
    instagram: normalizeText(settings?.instagram || defaults.instagram),
    address: normalizeText(settings?.address || defaults.address),
    mapUrl: normalizeText(settings?.mapUrl || defaults.mapUrl),
    phoneDisplay: normalizeText(settings?.phoneDisplay || defaults.phoneDisplay),
    cityDisplay: normalizeText(settings?.cityDisplay || defaults.cityDisplay)
  };
}

function normalizeHomeSettings(settings) {
  const defaults = cloneDefaults().homeSettings;
  return {
    badge: normalizeText(settings?.badge || defaults.badge),
    title: normalizeText(settings?.title || defaults.title),
    subtitle: normalizeText(settings?.subtitle || defaults.subtitle),
    primaryButtonText: normalizeText(
      settings?.primaryButtonText || defaults.primaryButtonText
    ),
    secondaryButtonText: normalizeText(
      settings?.secondaryButtonText || defaults.secondaryButtonText
    ),
    whyTitle: normalizeText(settings?.whyTitle || defaults.whyTitle),
    whySubtitle: normalizeText(settings?.whySubtitle || defaults.whySubtitle)
  };
}

function normalizeEsteticaSettings(settings) {
  const defaults = cloneDefaults().esteticaSettings;
  const source = settings || {};

  const services = Array.isArray(source.services) && source.services.length
    ? source.services
    : defaults.services;

  return {
    hero: {
      ...defaults.hero,
      ...(source.hero || {}),
      badge: normalizeText(source?.hero?.badge || defaults.hero.badge),
      title: normalizeText(source?.hero?.title || defaults.hero.title),
      subtitle: normalizeText(source?.hero?.subtitle || defaults.hero.subtitle),
      primaryButtonText: normalizeText(
        source?.hero?.primaryButtonText || defaults.hero.primaryButtonText
      ),
      secondaryButtonText: normalizeText(
        source?.hero?.secondaryButtonText || defaults.hero.secondaryButtonText
      ),
      primaryButtonUrl: normalizeText(
        source?.hero?.primaryButtonUrl || defaults.hero.primaryButtonUrl
      ),
      secondaryButtonUrl: normalizeText(
        source?.hero?.secondaryButtonUrl || defaults.hero.secondaryButtonUrl
      ),
      image: normalizeText(source?.hero?.image || defaults.hero.image)
    },
    servicesSection: {
      title: normalizeText(
        source?.servicesSection?.title || defaults.servicesSection.title
      ),
      subtitle: normalizeText(
        source?.servicesSection?.subtitle || defaults.servicesSection.subtitle
      )
    },
    processSection: {
      title: normalizeText(
        source?.processSection?.title || defaults.processSection.title
      ),
      subtitle: normalizeText(
        source?.processSection?.subtitle || defaults.processSection.subtitle
      )
    },
    gallerySection: {
      title: normalizeText(
        source?.gallerySection?.title || defaults.gallerySection.title
      ),
      subtitle: normalizeText(
        source?.gallerySection?.subtitle || defaults.gallerySection.subtitle
      )
    },
    cta: {
      ...defaults.cta,
      ...(source.cta || {}),
      badge: normalizeText(source?.cta?.badge || defaults.cta.badge),
      title: normalizeText(source?.cta?.title || defaults.cta.title),
      subtitle: normalizeText(source?.cta?.subtitle || defaults.cta.subtitle),
      primaryButtonText: normalizeText(
        source?.cta?.primaryButtonText || defaults.cta.primaryButtonText
      ),
      secondaryButtonText: normalizeText(
        source?.cta?.secondaryButtonText || defaults.cta.secondaryButtonText
      ),
      primaryButtonUrl: normalizeText(
        source?.cta?.primaryButtonUrl || defaults.cta.primaryButtonUrl
      ),
      secondaryButtonUrl: normalizeText(
        source?.cta?.secondaryButtonUrl || defaults.cta.secondaryButtonUrl
      )
    },
    location: {
      ...defaults.location,
      ...(source.location || {}),
      title: normalizeText(source?.location?.title || defaults.location.title),
      subtitle: normalizeText(
        source?.location?.subtitle || defaults.location.subtitle
      ),
      name: normalizeText(source?.location?.name || defaults.location.name),
      label: normalizeText(source?.location?.label || defaults.location.label),
      address1: normalizeText(
        source?.location?.address1 || defaults.location.address1
      ),
      address2: normalizeText(
        source?.location?.address2 || defaults.location.address2
      ),
      instagram: normalizeText(
        source?.location?.instagram || defaults.location.instagram
      ),
      whatsapp: normalizeText(
        source?.location?.whatsapp || defaults.location.whatsapp
      ),
      mapsUrl: normalizeText(source?.location?.mapsUrl || defaults.location.mapsUrl),
      mapEmbed: normalizeText(
        source?.location?.mapEmbed || defaults.location.mapEmbed
      )
    },
    services: services.map((service) => ({
      id: normalizeText(service?.id) || crypto.randomUUID(),
      title: normalizeText(service?.title),
      text: normalizeText(service?.text)
    })),
    gallery: {
      mainImage: normalizeText(
        source?.gallery?.mainImage || defaults.gallery.mainImage
      ),
      image1: normalizeText(source?.gallery?.image1 || defaults.gallery.image1),
      image2: normalizeText(source?.gallery?.image2 || defaults.gallery.image2),
      image3: normalizeText(source?.gallery?.image3 || defaults.gallery.image3),
      image4: normalizeText(source?.gallery?.image4 || defaults.gallery.image4)
    }
  };
}

async function ensureContent() {
  let content = await ContentSettings.findOne({ key: "main" });

  if (!content) {
    const defaults = cloneDefaults();
    content = await ContentSettings.create({
      key: "main",
      ...defaults
    });
  }

  return content;
}

function serializeContent(content) {
  return {
    categories: normalizeCategories(content?.categories),
    siteSettings: normalizeSiteSettings(content?.siteSettings),
    homeSettings: normalizeHomeSettings(content?.homeSettings),
    esteticaSettings: normalizeEsteticaSettings(content?.esteticaSettings)
  };
}

async function getContent(req, res) {
  try {
    const content = await ensureContent();

    return res.status(200).json({
      ok: true,
      data: serializeContent(content)
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Erro ao carregar conteudo do site.",
      error: error.message
    });
  }
}

async function updateCategories(req, res) {
  try {
    const content = await ensureContent();
    content.categories = normalizeCategories(req.body?.categories);
    await content.save();

    return res.status(200).json({
      ok: true,
      message: "Categorias atualizadas com sucesso.",
      data: serializeContent(content)
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Erro ao atualizar categorias.",
      error: error.message
    });
  }
}

async function updateSiteSettings(req, res) {
  try {
    const content = await ensureContent();
    content.siteSettings = normalizeSiteSettings(req.body?.siteSettings);
    await content.save();

    return res.status(200).json({
      ok: true,
      message: "Configuracoes do site atualizadas com sucesso.",
      data: serializeContent(content)
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Erro ao atualizar configuracoes do site.",
      error: error.message
    });
  }
}

async function updateHomeSettings(req, res) {
  try {
    const content = await ensureContent();
    content.homeSettings = normalizeHomeSettings(req.body?.homeSettings);
    await content.save();

    return res.status(200).json({
      ok: true,
      message: "Configuracoes da home atualizadas com sucesso.",
      data: serializeContent(content)
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Erro ao atualizar configuracoes da home.",
      error: error.message
    });
  }
}

async function updateEsteticaSettings(req, res) {
  try {
    const content = await ensureContent();
    content.esteticaSettings = normalizeEsteticaSettings(req.body?.esteticaSettings);
    await content.save();

    return res.status(200).json({
      ok: true,
      message: "Configuracoes da estetica atualizadas com sucesso.",
      data: serializeContent(content)
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Erro ao atualizar configuracoes da estetica.",
      error: error.message
    });
  }
}

module.exports = {
  getContent,
  updateCategories,
  updateSiteSettings,
  updateHomeSettings,
  updateEsteticaSettings
};
