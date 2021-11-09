import { IResolvers } from "@graphql-tools/utils";

const querySeasonResolvers: IResolvers = {
  Query: {
    async seasonsList(_: void, __: unknown, { dataSources }) {
      return await dataSources.seasons
        .getSeasons()
        .then((data: {MRData: {SeasonTable: {Seasons: Array<unknown>}}}) => data.MRData.SeasonTable.Seasons);
    },
    async seasonPilotsRanking(_: void, { year }, { dataSources }) {
      return await dataSources.drivers
        .getSeasonsPilotsRanking(year)
        .then(
          (data: any) =>
            (data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        );
    },
  },
};

export default querySeasonResolvers;
