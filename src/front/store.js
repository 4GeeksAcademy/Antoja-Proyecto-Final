export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    token: localStorage.getItem("token") || null,

    user: {
      id: 1,
      name: "",
      email: "",
      is_admin: false,
    },
    carrito: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "LOGIN":
      return {
        ...store,
        token: action.payload,
      };

    case "LOGOUT":
      return {
        ...store,
        token: null,
        user: { id: null, name: "", email: "", is_admin: false },
      };
    case "LOGIN_USER":
      return {
        ...store,
        user: action.payload,
      };
    case "ADD_CARRITO":
      const addPizza = action.payload;
      const pizzaExistente = store.carrito.find(
        (item) => item.id === addPizza.id
      );

      if (pizzaExistente) {
        return {
          ...store,
          carrito: store.carrito.map((pizza) =>
            pizza.id === addPizza.id
              ? {
                  ...pizza,
                  cantidad: pizza.cantidad + addPizza.cantidad,
                }
              : pizza
          ),
        };
      }else{
        return{
          ...store,
          carrito: [...store.carrito, addPizza]
        }
      }

    case "DELETE_PRODUCT":
      return {
        ...store,
        carrito: store.carrito.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_All":
      return {
        ...store,
        carrito: [],
      };

    default:
      throw Error("Unknown action.");
  }
}
