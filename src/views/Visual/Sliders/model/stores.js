import {combine, createStore} from "effector";
import {
  fetchMobileSliders,
  fetchWebSliders
} from "./effects";

import {
  resetMobileSliders,
  resetWebSliders
} from "./events";

export const $webSliders = createStore({loading: false, data: [], meta: undefined, links: undefined, error: false})
  .on(fetchWebSliders.pending, (params, pending) => {
    return {
      ...params,
      loading: pending,
    };
  })
  .on(fetchWebSliders.finally, (params, response) => {
    if (response.error) {
      return {
        ...params,
        data: [],
        meta: undefined,
        links: undefined,
        error: response.error.response
      };
    } else {
      return {
        ...params,
        data: response.result.data.data,
        meta: response.result.data.meta,
        links: response.result.data.links,
        error: false
      };
    }
  })
  .reset(resetWebSliders)

  export const $mobileSliders = createStore({loading: false, data: [], meta: undefined, links: undefined, error: false})
  .on(fetchMobileSliders.pending, (params, pending) => {
    return {
      ...params,
      loading: pending,
    };
  })
  .on(fetchMobileSliders.finally, (params, response) => {
    if (response.error) {
      return {
        ...params,
        data: [],
        meta: undefined,
        links: undefined,
        error: response.error.response
      };
    } else {
      return {
        ...params,
        data: response.result.data.data,
        meta: response.result.data.meta,
        links: response.result.data.links,
        error: false
      };
    }
  })
  .reset(resetMobileSliders)

export const $isDataPending = combine({
  $webSliders,
  $mobileSliders
});
