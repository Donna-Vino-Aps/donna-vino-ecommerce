export async function getWineBySlug(slug) {
  const wines = [
    {
      title: "Muga Reserva",
      slug: "muga-reserva",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non erat quam. Vestibulum aliquam nibh dui, et aliquet nibh euismod quis.",
      price: 130.0,
      rating: 5.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: true,
      url: "/wines/muga-reserva",
    },
    {
      title: "Barolo Terlo",
      slug: "barolo-terlo",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non erat quam. Vestibulum aliquam nibh dui, et aliquet nibh euismod quis.",
      price: 121.0,
      rating: 4.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: true,
      url: "/wines/barolo-terlo",
    },
    {
      title: "Pinot Noir",
      slug: "pinot-noir",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non erat quam. Vestibulum aliquam nibh dui, et aliquet nibh euismod quis.",
      price: 180.0,
      rating: 4.5,
      imageUrl: "/images/exampleImageWine.png",
      isNew: false,
      url: "/wines/pinot-noir",
    },
    {
      title: "Vega Cicilia",
      slug: "vega-cicilia",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non erat quam. Vestibulum aliquam nibh dui, et aliquet nibh euismod quis.",
      price: 210.0,
      rating: 3.5,
      imageUrl: "/images/exampleImageWine.png",
      isNew: false,
      url: "/wines/vega-cicilia",
    },
    {
      title: "Saviognese Merlot",
      slug: "saviognese-merlot",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non erat quam. Vestibulum aliquam nibh dui, et aliquet nibh euismod quis.",
      price: 210.0,
      rating: 3.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: true,
      url: "/wines/saviognese-merlot",
    },
    {
      title: "Pinot Grigio",
      slug: "pinot-grigio",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non erat quam. Vestibulum aliquam nibh dui, et aliquet nibh euismod quis.",
      price: 210.0,
      rating: 5.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: false,
      url: "/wines/pinot-grigio",
    },
    {
      title: "Marques de Murrieta",
      slug: "marques-de-murrieta",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non erat quam. Vestibulum aliquam nibh dui, et aliquet nibh euismod quis.",
      price: 210.0,
      rating: 5.0,
      imageUrl: "/images/exampleImageWine.png",
      isNew: false,
      url: "/wines/marques-de-murrieta",
    },
  ];

  return wines.find((wine) => wine.slug === slug);
}
