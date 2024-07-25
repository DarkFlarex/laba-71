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