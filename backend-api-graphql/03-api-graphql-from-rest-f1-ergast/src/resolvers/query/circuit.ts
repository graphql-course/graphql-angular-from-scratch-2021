import { IResolvers } from "@graphql-tools/utils";

const queryCircuitResolvers: IResolvers = {
  Query: {
    async historyCircuits(
      _: void,
      { pageElements, page },
      { dataSources }
    ) {
      return await dataSources.circuits
        .getCircuits(pageElements, page)
        .then(
          (data: { MRData: { CircuitTable: { Circuits: Array<unknown> } } }) =>
            data.MRData.CircuitTable.Circuits
        );
    },
    async circuitSelect(_: void, { id }, { dataSources }) {
      return await dataSources.circuits
        .getCircuit(id)
        .then((data: { MRData: { CircuitTable: { Circuits: Array<unknown> } } }) => data.MRData.CircuitTable.Circuits[0]);
    },
  },
};

export default queryCircuitResolvers;
