import {createEffect} from "effector";
import {
  getRoles
} from "../api";

export const fetchAllRoles = createEffect({
  handler: getRoles
});