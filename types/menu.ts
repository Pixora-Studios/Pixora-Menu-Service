export type CategoryType = 'regular' | 'special' | 'combo';

export interface Category {
  id: string;
  label: string;
  icon: string;
  type: CategoryType;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  tags: string[];
  badge: string | null;
  available: boolean;
  comboIncludes?: string[];
}

export interface MenuData {
  categories: Category[];
  items: MenuItem[];
}
