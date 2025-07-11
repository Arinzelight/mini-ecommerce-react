/* eslint-disable prettier/prettier */
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../actionTypes";
export const addFavorite = (product) => ({
  type: ADD_FAVORITE,
  payload: product,
});

export const removeFavorite = (productId) => ({
  type: REMOVE_FAVORITE,
  payload: productId,
});