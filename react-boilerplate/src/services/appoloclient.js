import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { graphqlUrl } from './config'


const httpLink = new HttpLink({
  uri: graphqlUrl,
  credentials: "include"
})



const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache: cache,
  resolvers: {}
  
})




export default client