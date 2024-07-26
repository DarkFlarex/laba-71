export interface Dish {
    id: string;
    title: string;
    image: string;
    price: number;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
    [id: string]: ApiDish;
}

export interface DishMutation {
    title: string;
    image: string;
    price: string;
}

export interface CartDish {
    dish: Dish;
    amount: number;
}

export interface ApiOrder {
    dishes: CartDish[];
}

export interface ApiOrders {
    [id: string]: ApiOrder;
}

export interface Order extends ApiOrder {
    id: string;
    totalPrice: number;
}