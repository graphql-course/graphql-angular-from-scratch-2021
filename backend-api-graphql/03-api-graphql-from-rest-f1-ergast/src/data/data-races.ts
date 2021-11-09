import { F1 } from "./data-source";
import { checkYear, roundCheck } from "../lib/utils";
import { RESTDataSource } from "apollo-datasource-rest";

export class RacesData extends F1 {
  constructor() {
    super();
  }

  async getYear(year: string): Promise<RESTDataSource<unknown>>{
    year = checkYear(year);
    return await this.get(`${year}.json`, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getYearRound(year: string, round: number): Promise<RESTDataSource<unknown>> {
    year = checkYear(year);
    round = roundCheck(round);
    return await this.get(`${year}/${round}.json`, {
      cacheOptions: { ttl: 60 },
    });
  }
}
