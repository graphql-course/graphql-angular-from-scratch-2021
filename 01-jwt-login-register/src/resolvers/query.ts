import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../interfaces/user.interface";

const queryResolvers: IResolvers = {
  Query: {
    users: () : Array<IUser> => {
      return [
        {
          id: "1",
          name: "Anartz",
          lastname: "Mugika Ledo",
          email: "",
          registerDate: ""
        }
      ];
    }
  },
};

export default queryResolvers;
