const { GoogleAuth } = require('google-auth-library');
const path = require('path');

// サービスアカウントキーのファイルパスに置き換え
const keyFilePath = path.resolve(__dirname, './keys/service-account-file.json');

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFilename: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();

  console.log('Access Token:', token?.token);
}

getAccessToken().catch(console.error);
