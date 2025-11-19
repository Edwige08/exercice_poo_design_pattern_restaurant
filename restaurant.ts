abstract class Dish {
    ingredients: string[];

    constructor(ingredients: string[]) {
        this.ingredients = ingredients;
    }

    abstract showPrice(): number;
    showIngredients(): string[] {
        return this.ingredients;
    }
}

interface AllergenGluten {
    hasGluten(): boolean;
}
interface AllergenNuts {
    hasNuts(): boolean;
}

class CheeseBurger extends Dish implements AllergenGluten {
    showPrice(): number { return 10 }
    hasGluten(): boolean { return true }
}

class Salad extends Dish {
    showPrice(): number { return 8 }
}

class Brownie extends Dish implements AllergenGluten, AllergenNuts {
    showPrice(): number { return 6 }
    hasGluten(): boolean { return true }
    hasNuts(): boolean { return true }
}

class DishFactory {
    static createDish(dishType: string, ingredients: string[]): Dish {
        switch (dishType) {
            case "CheeseBurger":
                return new CheeseBurger(ingredients);
            case "Salad":
                return new Salad(ingredients);
            case "Brownie":
                return new Brownie(ingredients);
            default:
                throw new Error("Unknown dish type");
        }
    }
}

const myCheeseBurger = DishFactory.createDish("CheeseBurger", ["pain brioché", "steak haché de boeuf", "cheddar", "salade", "tomate", "oignon", "sauce burger"]);
const mySalad = DishFactory.createDish("Salad", ["laitue", "tomate", "concombre", "vinaigrette"]);

console.log(mySalad.showIngredients())
console.log(myCheeseBurger.showPrice());

class Customer {
    constructor(public name: string) { }
    getname(): string {
        return this.name;
    }
    addDishToOrder(order: Order, dish: Dish): void {
        order.addDish(dish);
    }
    removeDishFromOrder(order: Order, dish: Dish): void {
        order.removeDish(dish);
    }
    getOrderTotalPrice(order: Order): number {
        return order.getTotalPrice();
    }
}

class CustomerFactory {
    static createCustomer(name: string): Customer {
        return new Customer(name);
    }
}

enum OrderStatusEnum {
    NonValidee = "Non validée",
    Validee = "Validée",
    EnPreparation = "En preparation",
    Prete = "Prête",
    Terminee = "Terminée"
}

interface OrderStatus {
    status: OrderStatusEnum;
}

class Order implements OrderStatus {
    dishes: Dish[] = [];
    status: OrderStatusEnum = OrderStatusEnum.NonValidee;

    constructor(public customer: Customer) { }

    addDish(dish: Dish): void {
        this.dishes.push(dish);
    }
    removeDish(dish: Dish): void {
        const index = this.dishes.indexOf(dish);
        if (index !== -1) {
            this.dishes.splice(index, 1);
        }
    }
    getTotalPrice(): number {
        return this.dishes.reduce((total, dish) => total + dish.showPrice(), 0);
    }
}

class OrderFactory {
    static createOrder(customer: Customer): Order {
        return new Order(customer);
    }
}

// Setter pour modifier le status de la commande :
class UpdateOrderStatus {
    static updateStatus(order: Order, status: OrderStatusEnum): void {
        order.status = status;
    }
}

const customer = CustomerFactory.createCustomer("Alice");
console.log(customer);
const order = OrderFactory.createOrder(customer);
console.log(order);
const burger = new CheeseBurger(["pain brioché", "steak haché de boeuf", "cheddar", "salade", "tomate", "oignon", "sauce burger"]);
console.log(burger);
customer.addDishToOrder(order, burger);
console.log(order);
customer.addDishToOrder(order, myCheeseBurger);
console.log(order);
console.log(customer.getOrderTotalPrice(order));
