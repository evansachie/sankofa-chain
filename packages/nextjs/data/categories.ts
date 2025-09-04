export interface Category {
  id: string;
  name: string;
  backgroundImage: string;
  description: string;
  itemCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Textiles & Patterns",
    backgroundImage:
      "https://images.unsplash.com/photo-1660695828403-b42e117e0b4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Authentic Kente, Ankara, Adinkra designs and digital patterns",
    itemCount: 4820,
  },
  {
    id: "2",
    name: "Handmade Crafts",
    backgroundImage:
      "https://images.unsplash.com/photo-1612353312154-a7aae0a0a998?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Wood carvings, beadwork, pottery, and artisan-made items",
    itemCount: 3160,
  },
  {
    id: "3",
    name: "Jewelry & Accessories",
    backgroundImage:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Beaded necklaces, bracelets, and traditional adornments",
    itemCount: 2740,
  },
  {
    id: "4",
    name: "African Art",
    backgroundImage:
      "https://images.unsplash.com/photo-1621419203897-20b66b98d495?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Paintings, sculptures, and contemporary African artworks",
    itemCount: 5320,
  },
  {
    id: "5",
    name: "Music & Instruments",
    backgroundImage:
      "https://images.unsplash.com/photo-1523689119443-df96632084a1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Traditional rhythms, Afrobeat, and handmade instruments",
    itemCount: 1980,
  },
  {
    id: "6",
    name: "Food & Beverages",
    backgroundImage:
      "https://images.unsplash.com/photo-1665332195309-9d75071138f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Organic cocoa, coffee, spices, and traditional drinks",
    itemCount: 4210,
  },
  {
    id: "7",
    name: "Cultural Experiences",
    backgroundImage:
      "https://images.unsplash.com/photo-1605302596032-15e67c3cf66a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Workshops, storytelling sessions, and virtual cultural tours",
    itemCount: 1120,
  },
  {
    id: "8",
    name: "Digital Heritage",
    backgroundImage:
      "https://images.unsplash.com/photo-1731698758979-3bf575910a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "NFTs of cultural symbols, digital archives, and 3D artifacts",
    itemCount: 2470,
  },
  {
    id: "9",
    name: "Fashion & Wearables",
    backgroundImage:
      "https://images.unsplash.com/photo-1529245019870-59b249281fd3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Modern and traditional African clothing and accessories",
    itemCount: 3890,
  },
];
