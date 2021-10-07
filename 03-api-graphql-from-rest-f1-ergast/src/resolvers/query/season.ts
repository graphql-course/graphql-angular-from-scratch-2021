import { IResolvers } from "@graphql-tools/utils";

const querySeasonResolvers: IResolvers = {
  Query: {
    async seasonsList(_: void, __: any, { dataSources }) {
      return await dataSources.seasons
        .getSeasons()
        .then((data: any) => data.MRData.SeasonTable.Seasons);
    },
    async seasonPilotsRanking(_: void, { year }, { dataSources }) {
      return await dataSources.drivers
        .getSeasonsPilotsRanking(year)
        .then(
          (data: any) =>
            data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
    },
  },
};

export default querySeasonResolvers;
