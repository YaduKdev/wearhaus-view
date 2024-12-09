export const navigation = {
  categories: [
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          id: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Trending',
          id: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        { name: 'Oversized T-shirts', id: 'men_oversized_tshirts' },
        { name: 'Jackets', id: 'men_jackets' },
        { name: 'Sweaters', id: 'men_sweaters' },
        { name: 'Hoodies', id: 'men_hoodies' },
        { name: 'Sweatshirts', id: 'men_sweatshirts' },
        { name: 'Joggers', id: 'men_joggers' },
        { name: 'Cargos', id: 'men_cargos' },
        { name: 'Jeans', id: 'men_jeans' },
      ],
    },
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Trending',
          href: '/',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        { name: 'Tops', id: 'tops', href: `{women/clothing/tops}` },
        { name: 'Dresses', id: 'dresses', href: '#' },
        { name: 'Oversized T-shirts', id: 'women_oversized_tshirts' },
        { name: 'Jackets', id: 'women_jackets' },
        { name: 'Sweaters', id: 'women_sweaters' },
        { name: 'Hoodies', id: 'women_hoodies' },
        { name: 'Sweatshirts', id: 'women_sweatshirts' },
        { name: 'Joggers', id: 'women_joggers' },
        { name: 'Cargos', id: 'women_cargos' },
        { name: 'Jeans', id: 'women_jeans' },
      ],
    },
    {
      id: 'footwear',
      name: 'Footwear',
      featured: [
        {
          name: 'New Arrivals',
          id: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Trending',
          id: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        { name: 'Sneakers', id: 'sneakers', href: `{women/clothing/tops}` },
        { name: 'Sliders', id: 'sliders', href: '#' },
      ],
    },
  ],
  pages: [
    { name: 'Company', id: '/' },
    { name: 'Stores', id: '/' },
  ],
};
