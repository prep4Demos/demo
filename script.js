const URL_BASE = 'https://us-central1-synthetic-eon.cloudfunctions.net/';
const SHEETS_URL = URL_BASE + 'sheets';

let docs;

fetch(SHEETS_URL).then(function(response) {
  return response.json();
}).then(function(responseJson) {
  docs = responseJson;
  let tbody = document.querySelector('tbody');
  docs.forEach(doc => {
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    let phone = document.createElement("td");
    let address = document.createElement("td");
    name.appendChild(document.createTextNode(doc.name));
    phone.appendChild(document.createTextNode(doc.number));
    address.appendChild(document.createTextNode(doc.address));
    tr.appendChild(name);
    tr.appendChild(phone);
    tr.appendChild(address);
    tbody.appendChild(tr);
  })
});
