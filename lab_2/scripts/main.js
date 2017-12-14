/**
 * Created by User on 08.12.2017.
 */
var button = document.getElementById('feedbackButton');
var feedbackField = document.getElementById('feedback');
var newsField = document.getElementById('news_container');

function addComment() {
    var feedbackFieldValue = feedbackField.value;

    if (feedbackFieldValue.length == 0) {
        window.alert('Please fill the field');
    }
    else {
        var feedback = document.createElement('div');
        feedback.classList.add('feedback');

        var author = document.createElement('h2');
        author.innerHTML = 'John Doe';

        var feedbackText = document.createElement('p');
        feedbackText.innerText = feedbackFieldValue;

        var date = document.createElement('span');
        date.innerText = new Date().toDateString();

        feedback.appendChild(author);
        feedback.appendChild(date);
        feedback.appendChild(feedbackText);
        document.getElementById('feedbacksWrap').appendChild(feedback);

        feedbackField.value = ''
    }
};

//news script

//var newsButton = document.getElementById('sendArticle');
var articleField = document.getElementById('article');
var descripitionField = document.getElementById('descripition');
var titleField = document.getElementById('title');
var successFiled = document.getElementById('success-msg');

function addNews() {
    var news = {
        article: articleField.value,
        description: descripitionField.value,
        title: titleField.value
    };

    console.log(news);

    if(isOnline()){
        // відправляємо на сервер
    } else {
        var oldNews = window.localStorage.getItem('news');
        if (!oldNews) {
            oldNews = [];
        } else {
            oldNews = JSON.parse(oldNews);
        }
        oldNews.push(news);
        window.localStorage.setItem('news', JSON.stringify(oldNews))
    }

    successFiled.classList.add('visible');
};

function isOnline() {
    return window.navigator.onLine;
}

function getNews() {
    var news;
    if (!isOnline()) {
        // витягуємо новини із сервера
    } else {
        news = JSON.parse(window.localStorage.getItem('news'));
    }
    console.log(news);

    if (news && news.length > 0) {
        for (var i = 0; i < news.length; i++) {
            createNews(news[i]);
        }
    }
}

function createNews(news) {
    var element = document.createElement('news_container');
    element.innerHTML += '<div class="col-md-4 news_table centered" data-newsdivid="newId_0">' + '<a href="#" class="thumbnail">' + '<img src="'+news.image+'">'+ '<div class="caption">' + '<h3>'+news.title+'</h3>' + ' <p>'+news.description+'</p>'+ '</div>'  +
       '<p>'+news.article+'</p>' + '</div>'+ '</a>' ;

    document.getElementById('news')
        .appendChild(element);
}

getNews();
