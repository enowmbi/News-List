let newsData;
function getSources(){
  //get news sources from api
  const  api_request = new XMLHttpRequest();
  api_request.open('GET','https://newsapi.org/v1/sources?language=en');
  api_request.onload = function(){
    newsData = JSON.parse(api_request.responseText);
    let source = document.getElementById('sourceNames');
    for(var i = 0;i < newsData.sources.length;i++ ){
      let opt = document.createElement('option');
      opt.value = newsData.sources[i].id; 
      opt.innerHTML = newsData.sources[i].name;
      source.appendChild(opt);
    }

  }

  api_request.send();
}

function displayArticleDetails(article){
  var author ="";
  if(article.author){
   author = article.author;
  }
  var date_published = new Date(Date.parse(article.publishedAt)).toUTCString();

let article_details = '<div class="media-left"><a href=' + article.url + '   target="_blank">'  + 
    '<img class="media-object" src=' + article.urlToImage + ' />' + 
    '</a>' + 
   '</div>' + 
    '<div class="media-body">' + 
    '<h4 class="media-heading">' + 
'<a href=' + article.url + ' target="_blank">'+ 
    article.title + '</a>' + 
    '</h4>' + 
    '<h5><i>' + author +  '  <small>(Published on : ' +  date_published  +')</small> </i></h5>' + 
    '<p>' + article.description + '</p>' + 
    '</div>';
  return article_details;
}

function getArticles(source){
  //clear previous list
  document.getElementById('articlesList').innerHTML ='';
  //get news sources from api
  const  api_request = new XMLHttpRequest();
  api_request.open('GET','https://newsapi.org/v1/articles?source=' + source.id + '&apiKey=c493e95394d444458f3488052428deab' );
  api_request.onload = function(){
    let articlesData = JSON.parse(api_request.responseText);
    let articles = document.getElementById('articlesList');
    for(var i = 0;i < articlesData.articles.length;i++ ){
      let li = document.createElement('li');
      articles.appendChild(li);
      li.setAttribute("class","media");
      li.innerHTML += displayArticleDetails(articlesData.articles[i])
    }

  }

  api_request.send();
}
// https://newsapi.org/v2/everything?q=apple&from=2019-02-03&to=2019-02-03&sortBy=popularity&apiKey=c493e95394d444458f3488052428deab

function sourceChanged(e){
  //clear previous entries 
  document.getElementById('sourceUrl').innerHTML = '';
  document.getElementById('sourceDescription').innerHTML = '';      
  // document.getElementById('newsList').innerHTML ='';

  //set the link to the url and the button name to the site 
  for(let i=0; i< newsData.sources.length; i++ ){
    if(newsData.sources[i].id == e.target.value){
      //set the button text and link 
      const found_source = newsData.sources[i];
      document.getElementById('sourceUrl').innerHTML = '<a href=' + found_source.url +  'target ="_blank" class="btn btn-primary">Visit '+ found_source.name + ' Website</a>';
      //display the description 
      document.getElementById('sourceDescription').innerHTML = found_source.description;      
      // document.getElementById('newsList').innerHTML = '<h5 id ="newsList"> News List </h5>';

      //display newslists
      getArticles(found_source);

    }

  }
}

