/* eslint-disable prettier/prettier */
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREASE_QTY,
  CLEAR_CART,
  INCREASE_QTY,
} from "@/store/actionTypes";

const initialState = {
  items: [], // Each item: { id, title, price, quantity }
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const exists = state.items.find((item) => item.id === payload.id);

      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...payload, quantity: 1 }],
      };
    }

    case INCREASE_QTY: {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    case DECREASE_QTY: {
      const item = state.items.find((i) => i.id === payload);

      if (item?.quantity > 1) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === payload ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      }

      // If quantity is 1 or less, remove the item
      return {
        ...state,
        items: state.items.filter((i) => i.id !== payload),
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};
