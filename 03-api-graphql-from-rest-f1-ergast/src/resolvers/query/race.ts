import { IResolvers } from "@graphql-tools/utils";

const queryRaceResolvers: IResolvers = {
  Query: {
    async racesByYear(_: void, { year }, { dataSources } ) {
        return await dataSources.races.getYear(year).then(
            (data: any) => data.MRData.RaceTable.Races
        );
    },
    async raceSelect(_: void, { year , round }, { dataSources}) {
        return await dataSources.races.getYearRound(year, round).then(
            (data: any) => data.MRData.RaceTable.Races[0]
        );
    },
  },
};

export default queryRaceResolvers;
