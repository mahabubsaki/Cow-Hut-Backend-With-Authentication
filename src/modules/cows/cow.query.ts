export interface ICowPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface ICowFilterOptions {
    query?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    category?: 'Beef' | 'Dairy' | 'Dual Purpose',
    breed?: string,
    name?: string,
    label?: 'for sale' | 'sold out';
}
