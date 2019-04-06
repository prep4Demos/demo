exports.sample = (req, res) => {
  handleCORS(req,res)
  getSheets().then(docs => {
        res.status(200).type('text/json').end(JSON.stringify(docs));
      })
};

handleCORS = function(req,res){
  res.set("Access-Control-Allow-Origin", "https://prep4demos.github.io");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method == 'OPTIONS') {
    res.status(204).send('');
   }
}
const {google} = require('googleapis');

async function getSheets(){
  let auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  let sheets = google.sheets({version: 'v4', auth});
  let response = await sheets.spreadsheets.values.get({
    spreadsheetId: '1-rqyGcdhVZytu9Ve9Ht-e2bxNpZfFqufEfyLovGHRQw',
    range: 'Form Responses 1!A2:C',
  });
  return response.data.values.map(row => {
    return {
      persona: row[1],
      recommendation: row[2]
    }})
}
