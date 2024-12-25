export const filters = {
  clothes: [
    {
      id: 'color',
      name: 'Color',
      options: [
        { value: 'white', label: 'White' },
        { value: 'beige', label: 'Beige' },
        { value: 'blue', label: 'Blue' },
        { value: 'brown', label: 'Brown' },
        { value: 'green', label: 'Green' },
        { value: 'purple', label: 'Purple' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'black', label: 'Black' },
      ],
    },
    {
      id: 'size',
      name: 'Size',
      options: [
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
        { value: 'XXL', label: 'XXL' },
      ],
    },
  ],
  footwear: [
    {
      id: 'color',
      name: 'Color',
      options: [
        { value: 'white', label: 'White' },
        { value: 'beige', label: 'Beige' },
        { value: 'blue', label: 'Blue' },
        { value: 'brown', label: 'Brown' },
        { value: 'green', label: 'Green' },
        { value: 'purple', label: 'Purple' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'black', label: 'Black' },
      ],
    },
    {
      id: 'size',
      name: 'Size',
      options: [
        { value: 'UK 6', label: 'UK 6' },
        { value: 'UK 7', label: 'UK 7' },
        { value: 'UK 8', label: 'UK 8' },
        { value: 'UK 9', label: 'UK 9' },
        { value: 'UK 10', label: 'UK 10' },
        { value: 'UK 11', label: 'UK 11' },
      ],
    },
  ],
};

export const singleFilter = [
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: '159-399', label: '₹159 To ₹399' },
      { value: '400-999', label: '₹400 To ₹999' },
      { value: '1000-1999', label: '₹1000 To ₹1999' },
      { value: '2000-2999', label: '₹2000 To ₹2999' },
      { value: '3000-4999', label: '₹3000 To ₹4999' },
    ],
  },
  {
    id: 'discount',
    name: 'Discount Range',
    options: [
      { value: '10', label: '10% And Above' },
      { value: '20', label: '20% And Above' },
      { value: '30', label: '30% And Above' },
      { value: '40', label: '40% And Above' },
      { value: '50', label: '50% And Above' },
      { value: '60', label: '60% And Above' },
      { value: '70', label: '70% And Above' },
      { value: '80', label: '80% And Above' },
    ],
  },
  {
    id: 'stock',
    name: 'Availability',
    options: [
      { value: 'in_stock', label: 'In Stock' },
      { value: 'out_of_stock', label: 'Out Of Stock' },
    ],
  },
];
