/* eslint-disable prettier/prettier */

import { TOGGLE_FAVORITE, CLEAR_FAVORITES } from "@/store/actionTypes";

const initialState = {
  items: [], // List of product objects
};

export const favoritesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_FAVORITE: {
      const exists = state.items.some((item) => item.id === payload.id);

      return {
        ...state,
        items: exists
          ? state.items.filter((item) => item.id !== payload.id)
          : [...state.items, payload],
      };
    }

    case CLEAR_FAVORITES:
      return { ...state, items: [] };

    default:
      return state;
  }
};
