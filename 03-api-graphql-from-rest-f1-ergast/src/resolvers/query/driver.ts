import { IResolvers } from "@graphql-tools/utils";

const queryDriverResolvers: IResolvers = {
  Query: {
    async historyDrivers(_: void, { pageElements, page }, { dataSources }) {
      return await dataSources.drivers
        .getDrivers(pageElements, page)
        .then((data: { MRData: { DriverTable: { Drivers: Array<unknown> } } }) => data.MRData.DriverTable.Drivers);
    },
    async driversYear(_: void, { year }, { dataSources }) {
      return await dataSources.drivers
        .getDriversByYear(year)
        .then((data: { MRData: { DriverTable: { Drivers: Array<unknown> } } }) => data.MRData.DriverTable.Drivers);
    },
    async driversYearAndRound(_: void, { year, round }, { dataSources }) {
      return await dataSources.drivers
        .getDriversByYearAndRound(year, round)
        .then((data: { MRData: { DriverTable: { Drivers: Array<unknown> } } }) => data.MRData.DriverTable.Drivers);
    },
    async driverSelect(_: void, { id }, { dataSources }) {
      return await dataSources.drivers
        .getDriver(id)
        .then((data: { MRData: { DriverTable: { Drivers: Array<unknown> } } }) => data.MRData.DriverTable.Drivers[0]);
    },
  },
};

export default queryDriverResolvers;
