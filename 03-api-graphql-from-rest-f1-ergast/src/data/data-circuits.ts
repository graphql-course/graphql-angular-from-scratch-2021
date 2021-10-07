import { F1 } from "./data-source";
import { paginationOptions } from "../lib/utils";
import { RESTDataSource } from "apollo-datasource-rest";

export class CircuitsData extends F1 {
  constructor() {
    super();
  }

  async getCircuits(pageElements = -1, page = 1): Promise<RESTDataSource<unknown>> {
    if (pageElements === -1) {
      return await this.get("circuits.json?limit=1000", {
        cacheOptions: { ttl: 60 },
      });
    }
    return await this.get(
      `circuits.json?${paginationOptions(pageElements, page)}`,
      {
        cacheOptions: { ttl: 60 },
      }
    );
  }
  async getCircuit(id: string): Promise<RESTDataSource<unknown>> {
    return await this.get(`circuits/${id}.json`, { cacheOptions: { ttl: 60 } });
  }
}
