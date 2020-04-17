const apiUrl = process.env.NODE_ENV === 'production' ? 'https://api.reaudito.com' : 'http://localhost:8000';
const graphqlUrl = process.env.NODE_ENV === 'production' ? 'https://api.reaudito.com/graphql' : 'http://localhost:8000/graphql';
const media = process.env.NODE_ENV === 'production' ? 'https://api.reaudito.com/media/' : 'http://localhost:8000/media/';
const paypalenv = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

export {
    apiUrl,
    graphqlUrl,
    media,
    paypalenv
}