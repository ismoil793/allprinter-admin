import {combine, createStore} from "effector";
import {
  fetchAllNavigations,
  fetchAllLeafNavigations
} from "./effects";

import {
  resetAllNavigations,
  resetAllLeafNavigations
} from "./events";

export const $allNavigations = createStore({loading: false, data: [], error: false})
  .on(fetchAllNavigations.pending, (params, pending) => {
    return {
      ...params,
      loading: pending,
    };
  })
  .on(fetchAllNavigations.finally, (params, response) => {
    if (response.error) {
      return {
        ...params,
        data: [],
        error: response.error.response
      };
    } else {
      const temp = [];
      Object.keys(response.result.data.data).forEach(key => {
        // if (!response.result.data.data[key].data.hasOwnProperty('title')) {
          temp.push({id: response.result.data.data[key].id, code: response.result.data.data[key].code, name: response.result.data.data[key].name, active: response.result.data.data[key].active, title: response.result.data.data[key].data.hasOwnProperty('title') ? true : false, url: response.result.data.data[key].data.url, external: response.result.data.data[key].data.hasOwnProperty('target') ? true : false} )
        // }
      })
      
      return {
        ...params,
        data: temp,
        error: false
      };
    }
  })
  .reset(resetAllNavigations)

export const $allLeafNavigations = createStore({loading: false, data: [], error: false})
  .on(fetchAllLeafNavigations.pending, (params, pending) => {
    return {
      ...params,
      loading: pending,
    };
  })
  .on(fetchAllLeafNavigations.finally, (params, response) => {
    if (response.error) {
      return {
        ...params,
        data: [],
        error: response.error.response
      };
    } else {
      const temp = [];
      Object.keys(response.result.data.data).forEach(key => {
        // if (!response.result.data.data[key].data.hasOwnProperty('title')) {
          temp.push({id: response.result.data.data[key].id, code: response.result.data.data[key].code, name: response.result.data.data[key].name, active: response.result.data.data[key].active})
        // }
      })
      
      return {
        ...params,
        data: temp,
        error: false
      };
    }
  })
  .reset(resetAllLeafNavigations)

export const $isDataPending = combine({
  $allNavigations,
  $allLeafNavigations
});
