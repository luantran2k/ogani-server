export type SortType =
  | 'sale'
  | 'discount'
  | 'latest'
  | 'accending price'
  | 'decending price';

export default interface BaseFilter {
  search?: string;
  page: number;
  quantity: number;
}

export type ProductFilter = Partial<
  BaseFilter & {
    sort: SortType;
    categoryId: number;
    usePrice: boolean;
    minPrice: number;
    maxPrice: number;
    total: boolean;
  }
>;
