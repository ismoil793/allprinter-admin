import { httpGet, httpPost } from "../../api";

export const getOneManager = (id) => httpGet({ 
  url: `/api/admin/manager?manager_id=${id}`
});

export const updateManager = (id, data) => httpPost({ 
  url: `/api/admin/manager/update/${id}`,
  data
});

