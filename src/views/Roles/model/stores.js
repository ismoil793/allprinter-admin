import {combine, createStore} from "effector";
import {
  fetchAllRoles
} from "./effects";

import {
  resetAllRoles,
} from "./events";

export const $allRoles = createStore({loading: false, data: [], error: false})
  .on(fetchAllRoles.pending, (params, pending) => {
    return {
      ...params,
      loading: pending,
    };
  })
  .on(fetchAllRoles.finally, (params, response) => {
    if (response.error) {
      return {
        ...params,
        data: [],
        error: response.error.response
      };
    } else {
      return {
        ...params,
        data: response.result.data.data,
        error: false
      };
    }
  })
  .reset(resetAllRoles)

export const $isDataPending = combine({
  $allRoles
});
