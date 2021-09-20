import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../../interfaces/user.interface";

const queryUsersResolvers: IResolvers = {
  Query: {
    users: () : Array<IUser>  =>  {
      return [
        {
          id: "1",
          name: "Anartz",
          lastname: "Mugika Ledo",
          email: "mugan86@gmail.com",
          registerDate: "",
          password: "1234"
        }
      ];
    }
  },
};

export default queryUsersResolvers;
