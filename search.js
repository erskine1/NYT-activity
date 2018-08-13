function searchNYT() {

var today = new Date();
var dd = today.getDate();
var mm = ("0" + (today.getMonth() + 1)).slice(-2);
var yyyy = today.getFullYear();
console.log(mm);

if (startYear === "") {
  start = 19000101;
} 

if (endYear === "") {
  var year = JSON.stringify(yyyy);
  var month = mm;
  var day = JSON.stringify(dd);
  
  end = year + month + day; 
}
console.log(`start is ${start}`);
console.log(`end is ${end}`);


var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "c3a408f6a0dc4088af2025e50fdb1e75",
  'q': query,
  'sort': "newest",
  'begin_date': start,
  'end_date': end,
  }) 
  console.log(url);

$.ajax({
  url: url,
  method: 'GET',
}).done(function(data) {
  console.log(data); 

  var length = $(`#records-num`).val();
  console.log(length); 
  for (var i = 0; i < length; i++) {

    var articleDiv = $('<div>');
    articleDiv.attr('class', 'card-body');

    var headline = data.response.docs[i].headline;
    if (headline && headline.main) {
      var headlineDiv = $('<h5>');
      headlineDiv.attr('class', 'card-title');
      headlineDiv.append(headline.main);
      articleDiv.append(headlineDiv);
    }

    var byline = data.response.docs[i].byline;
    if (byline && byline.original) {
      var bylineDiv = $('<h6>');
      bylineDiv.attr('class', 'card-subtitle text-muted');
      bylineDiv.append(byline.original);
      articleDiv.append(bylineDiv);
    }

    var pubDate = data.response.docs[i].pub_date;
    var year = pubDate.substring(0, 4);
    if (pubDate) {
      var pubDateDiv = $('<h6>');
      pubDateDiv.attr('class', 'text-muted')
      pubDateDiv.append(year);
      articleDiv.append(pubDateDiv);
      }

    var snippet = data.response.docs[i].snippet;
    if (snippet) {
      var snippetDiv = $('<p>');
      snippetDiv.attr('class', 'card-text');
      snippetDiv.append(snippet);
      articleDiv.append(snippetDiv);
    }

    var link = data.response.docs[i].web_url;
    var articleLink = $('<a>Link</a>');
    articleLink.attr('class', 'card-link');
    articleLink.attr('href', link);
    articleDiv.append(articleLink);

    $('#target').append(articleDiv);
  }


}).fail(function(err) {
  throw err;
});
};

$(`#search`).on("click", function(event) {
  $('#target').empty();
  event.preventDefault();
  query = $(`#query-term`).val().trim();
  startYear = $(`#start-year`).val().trim();
  endYear = $(`#end-year`).val().trim();

  var today = new Date();
  var dd = today.getDate();
  var mm = ("0" + (today.getMonth()+ 1)).slice(-2);
  var day = JSON.stringify(dd);

  end = endYear + mm + day; 
  start = startYear + mm + day;

  $(`#query-term`).val("");
  $(`#start-year`).val("");
  $(`#end-year`).val("");
  
  searchNYT();
});

$('#clear').on('click', function(event) {
  $(`#query-term`).val("");
  $(`#start-year`).val("");
  $(`#end-year`).val("");
  $('#target').empty();
})