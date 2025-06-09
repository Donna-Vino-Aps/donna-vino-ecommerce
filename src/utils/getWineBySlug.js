export async function getWineBySlug(slug) {
  const wines = [
    {
      title: "Muga Reserva",
      slug: "muga-reserva",
      price: 130.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: true,
      url: "/wines/muga-reserva",
    },
    {
      title: "Barolo Terlo",
      slug: "barolo-terlo",
      price: 121.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: true,
      url: "/wines/barolo-terlo",
    },
    {
      title: "Pinot Noir",
      slug: "pinot-noir",
      price: 180.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: false,
      url: "/wines/pinot-noir",
    },
    {
      title: "Vega Cicilia",
      slug: "vega-cicilia",
      price: 210.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: false,
      url: "/wines/vega-cicilia",
    },
    {
      title: "Saviognese Merlot",
      slug: "saviognese-merlot",
      price: 210.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: true,
      url: "/wines/saviognese-merlot",
    },
    {
      title: "Pinot Grigio",
      slug: "pinot-grigio",
      price: 210.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: false,
      url: "/wines/pinot-grigio",
    },
    {
      title: "Marques de Murrieta",
      slug: "marques-de-murrieta",
      price: 210.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: false,
      url: "/wines/marques-de-murrieta",
    },
  ];

  return wines.find((wine) => wine.slug === slug);
}
