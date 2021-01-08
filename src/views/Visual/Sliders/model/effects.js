import {createEffect} from "effector";
import {
  getMobileSliders,
  getWebSliders
} from "../api";

export const fetchMobileSliders = createEffect({
  handler: getMobileSliders
});

export const fetchWebSliders = createEffect({
  handler: getWebSliders
});