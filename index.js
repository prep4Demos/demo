/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
    handleCors(req, res);
    getRows().then(docs => {
        res.status(200).type('text/json').end(JSON.stringify(docs));
      })
  };
  
  handleCors = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method == 'OPTIONS') {
    res.status(204).send('');
   }
 }
 
const { google } = require('googleapis');

async function getRows() {
  let auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  let api = google.sheets({version: 'v4', auth});
  let response = await api.spreadsheets.values.get({
    spreadsheetId: '1hfonsT_K11elbfSeA1p83IkEYDG1EwyHyIHt1mBJn2E',
    range: 'A2:D'
  });
  return response.data.values.map(row => {
    return {
      name: row[1],
      number: row[2],
      address: row[3]
    }
  });
}