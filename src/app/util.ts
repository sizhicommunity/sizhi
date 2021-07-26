import { implementationGlobal } from "@quick-qui/implementation-model";
import { logging } from "@quick-qui/util";

export const log = logging("sizhi:app");
export function delegateToExistedDp(
  fetchType: string,
  resource: string,
  params
) {
  const existed = implementationGlobal["dataProvider"];
  return existed(fetchType, resource, params);
}