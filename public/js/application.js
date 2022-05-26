var searchButtonTitle = document.getElementById('search-button-title');
var searchButtonAll = document.getElementById('search-button-all');
var inputElement = document.getElementById('input-element');
var table = document.getElementById('data-representor');
var dataHolder = document.getElementById('data-holder');
var countHolder = document.getElementById('count');
table.style.display = 'none';

searchButtonTitle.onclick = () => clickOnSearchButton('title');
searchButtonAll.onclick = () => clickOnSearchButton('all');

function clickOnSearchButton(option) {
  var query = inputElement.value;
  queryRequest(option, query, onResivingQueryResult);
}

function onResivingQueryResult(data) {
  var response = JSON.parse(data);
  var result = response.data;
  if (result && result.length) {
    table.style.display = 'block';
    var articles = result.map(item => item._source);
    var tdElements = articles.map(makeTdElements);
    function makeTdElements(source) {
      return `<tr>
      <td><a href=${source.Url}> ${source.Title} </a></td>
      <td> ${source.NumberOfReference} </td>
      <td> ${source.DateOfSubmitted} </td>
      <td> ${source.Tags.join(', ')} </td>
      <td> ${source.Info} </td>
      <td> ${source.status} </td>
      <td> ${(parseFloat(source.Rank).toFixed(1))} </td>
      </tr>`
    }
    dataHolder.innerHTML = tdElements;

  }
}

function queryRequest(option, query, callback) {
  //var baseURL = 'http://127.0.0.1:3000';
  table.style.display = 'none';
  var baseURL = '';
  var url = `${baseURL}/api/search/${option}`;
  var body = { 'term': query };
  var requestBody = JSON.stringify(body);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = onGettingResponseData;
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(requestBody);
  async function onGettingResponseData() {
    if (this.readyState == 4 && this.status == 200) {
      var data = this.response;
      callback(data)
      //return data
    }
  };
}