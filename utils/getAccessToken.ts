import { GoogleAuth } from 'google-auth-library';
import * as path from 'path';

// サービスアカウントキーのファイルパスに置き換え
const keyFilePath = path.resolve(__dirname, './Users/miinadoi/Desktop/githubProject/fashonista/fashionista-439615-08d89c41b3b7.json');

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFilename: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();

  console.log('Access Token:', token);
}

getAccessToken().catch(console.error);
