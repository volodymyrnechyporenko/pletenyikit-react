export interface ImagePaths {
  images: string[];
}

export interface ItemDetails {
  id: number;
  category: string;
  images: string[];
  name: string;
  description: string;
  dimensions?: string;
  amount?: string;
  price: number;
  similar?: { img: string; price: number; link: string }[];
  link: string;
}

export interface SimilarItem {
  price: number;
  img: string;
  link: string;
}
