/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@heroui/button";

import { HeartIcon, HeartFilledIcon } from "./icons";

import { TOGGLE_FAVORITE } from "@/store/actionTypes";

/**
 * FavoriteButton component to toggle product as favorite
 * - Uses Redux to manage favorite state
 * - Displays filled heart if product is a favorite, otherwise an outline heart
 * - The product object to toggle as favorite
 * - Button element with heart icon
 * */
export default function FavoriteButton({ product }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleToggleFavorite = () => {
    dispatch({ type: TOGGLE_FAVORITE, payload: product });
  };

  return (
    <Button
      isIconOnly
      aria-label="Like"
      className="absolute top-3 right-3 dark:bg-gray-800 rounded-full p-2 shadow hover:scale-105 transition-transform"
      color={isFavorite ? "danger" : "default"}
      onPress={handleToggleFavorite}
    >
      {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
    </Button>
  );
}
