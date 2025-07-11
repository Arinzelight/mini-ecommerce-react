// src/components/FavoriteButton.jsx
/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@heroui/button";

import { HeartIcon, HeartFilledIcon } from "./icons";

import { TOGGLE_FAVORITE } from "@/store/actionTypes";

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
