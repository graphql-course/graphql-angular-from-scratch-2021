import { IResolvers } from '@graphql-tools/utils';


const queryMeResolver: IResolvers = {
    Query: {
        me: (_: void, __: unknown, { token }) => {
            console.log(token);
        }
    }
}

export default queryMeResolver;