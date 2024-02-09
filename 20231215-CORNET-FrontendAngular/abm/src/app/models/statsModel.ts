export interface Stats {
    categories: EntityStats;
    orders: OrderStats;
    products: EntityStats;
    suppliers: EntityStats;
    taxes: EntityStats;
    fields: EntityStats;
}

export interface EntityStats {
    total: number;
    deleted: number;
    active: number;
}

export interface OrderStats {
    total: number;
    canceled: number;
    pending: number;
    completed: number;
}