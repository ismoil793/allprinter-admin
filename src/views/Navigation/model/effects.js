import {createEffect} from "effector";
import {
  getAllNavigations,
  getAllLeafNavigations
} from "../api";

export const fetchAllNavigations = createEffect({
  handler: getAllNavigations
});

export const fetchAllLeafNavigations = createEffect({
  handler: getAllLeafNavigations
});