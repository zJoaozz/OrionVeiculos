const { randomUUID } = require("crypto");

function createDefaultCategories() {
  return [
    {
      id: randomUUID(),
      nome: "Sedans",
      slug: "sedan",
      ordem: 1,
      imagem: "imagens/logo-orion-redonda.jpg"
    },
    {
      id: randomUUID(),
      nome: "Hatchs",
      slug: "hatch",
      ordem: 2,
      imagem: "imagens/logo-orion-redonda.jpg"
    },
    {
      id: randomUUID(),
      nome: "SUVs",
      slug: "suv",
      ordem: 3,
      imagem: "imagens/logo-orion-redonda.jpg"
    },
    {
      id: randomUUID(),
      nome: "Picapes",
      slug: "picape",
      ordem: 4,
      imagem: "imagens/logo-orion-redonda.jpg"
    }
  ];
}

function createDefaultServices() {
  return [
    {
      id: randomUUID(),
      title: "Revitalizacao Completa",
      text: "Realce visual, brilho e acabamento para renovar a aparencia do veiculo."
    },
    {
      id: randomUUID(),
      title: "Higienizacao Interna",
      text: "Limpeza detalhada com foco em conforto, aparencia e conservacao do interior."
    },
    {
      id: randomUUID(),
      title: "Protecao de Superficies",
      text: "Tratamentos que ajudam a proteger pintura, plasticos e acabamento interno."
    },
    {
      id: randomUUID(),
      title: "Acabamento Premium",
      text: "Detalhes que fazem diferenca na apresentacao final do veiculo."
    },
    {
      id: randomUUID(),
      title: "Preparacao para Venda",
      text: "Deixe o carro mais atraente para anuncio, exposicao e negociacao."
    },
    {
      id: randomUUID(),
      title: "Valorizacao Visual",
      text: "Servicos pensados para elevar a percepcao de cuidado e qualidade."
    }
  ];
}

function getDefaultContent() {
  return {
    categories: createDefaultCategories(),
    siteSettings: {
      whatsapp: "5586999935385",
      instagram: "https://www.instagram.com/orionveiculos2004/",
      address: "Av. Joao XXIII, 1503 - Sao Cristovao, Teresina - PI",
      mapUrl:
        "https://maps.google.com/maps?q=Av.%20Joao%20XXIII%2C%201503%2C%20Teresina&t=&z=15&ie=UTF8&iwloc=&output=embed",
      phoneDisplay: "(86) 99993-5385",
      cityDisplay: "Teresina - PI"
    },
    homeSettings: {
      badge: "Estoque selecionado • Atendimento rapido",
      title: "Encontre seu proximo carro na Orion Veiculos",
      subtitle:
        "Uma experiencia mais simples, profissional e direta para quem quer comprar com confianca. Veja nossos destaques e fale com a loja pelo WhatsApp.",
      primaryButtonText: "Ver estoque",
      secondaryButtonText: "Falar com a loja",
      whyTitle: "Por que comprar com a Orion?",
      whySubtitle: "Uma experiencia mais simples, direta e profissional."
    },
    esteticaSettings: {
      hero: {
        badge: "Cuidado premium • Acabamento profissional",
        title: "Orion Estetica Automotiva",
        subtitle:
          "Revitalizacao, higienizacao e protecao para deixar seu veiculo com apresentacao de alto padrao, mais brilho e mais conservacao.",
        primaryButtonText: "Solicitar atendimento",
        secondaryButtonText: "Ver Instagram",
        primaryButtonUrl:
          "https://wa.me/5586999935385?text=Ola! Quero saber sobre estetica automotiva.",
        secondaryButtonUrl: "https://www.instagram.com/orionestetica2004/",
        image: "../imagens/logo-orion-redonda.jpg"
      },
      servicesSection: {
        title: "Nossos servicos",
        subtitle: "Tratamentos e cuidados para elevar o padrao do seu carro."
      },
      processSection: {
        title: "Como funciona",
        subtitle: "Um processo simples, direto e profissional."
      },
      gallerySection: {
        title: "Apresentacao visual",
        subtitle: "Uma estetica forte para valorizar cada detalhe do veiculo."
      },
      cta: {
        badge: "Atendimento rapido",
        title: "Quer cuidar melhor do seu carro?",
        subtitle:
          "Fale com a Orion Estetica Automotiva e saiba qual servico combina melhor com o seu veiculo.",
        primaryButtonText: "Chamar no WhatsApp",
        secondaryButtonText: "Instagram da estetica",
        primaryButtonUrl:
          "https://wa.me/5586999935385?text=Ola! Quero saber sobre estetica automotiva.",
        secondaryButtonUrl: "https://www.instagram.com/orionestetica2004/"
      },
      location: {
        title: "Onde estamos",
        subtitle: "Atendimento no mesmo endereco da Orion, com praticidade e confianca.",
        name: "Orion Estetica Automotiva",
        label: "Localizacao da unidade",
        address1: "Av. Joao XXIII, 1503",
        address2: "Sao Cristovao, Teresina - PI",
        instagram: "@orionestetica2004",
        whatsapp: "5586999935385",
        mapsUrl:
          "https://www.google.com/maps/place/Av.+Joao+XXIII,+1503+-+Sao+Cristovao,+Teresina+-+PI,+64049-010/",
        mapEmbed:
          "https://maps.google.com/maps?q=Av.%20Joao%20XXIII%2C%201503%2C%20Teresina&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      services: createDefaultServices(),
      gallery: {
        mainImage: "../imagens/logo-orion-redonda.jpg",
        image1: "",
        image2: "",
        image3: "",
        image4: ""
      }
    }
  };
}

module.exports = {
  getDefaultContent
};
