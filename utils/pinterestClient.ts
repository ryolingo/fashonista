import Pinterest from 'pinterest-node-api';

// Initialize the Pinterest client
const client = new Pinterest(process.env.NEXT_PUBLIC_PINTEREST_ACCESS_TOKEN);

export default client;
