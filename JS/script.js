console.log(`Hey this is project 3`);
// a9c14d7269894d69bc39c744037fa4ca
let source = `bbc-news`;
//bbc-news
//the-times-of-india
//etc
let apiKey = `a9c14d7269894d69bc39c744037fa4ca`;

newsAccordion = document.getElementById(`newsAccordion`);

let spinner = `<div class="d-flex align-items-center">
<strong>Loading...</strong>
<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
</div>`;
newsAccordion.innerHTML = spinner;

const xhr = new XMLHttpRequest();

xhr.open(
  `GET`,
  `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
  true
);

xhr.onprogress = function () {
  console.log(newsAccordion);
  let spinner = `<div class="d-flex align-items-center">
<strong>Loading...</strong>
<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
</div>`;
newsAccordion.innerHTML = spinner;
};

xhr.onload = function () {
  console.log(`Loaded`);
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    console.log(articles);
    let newsHtml = ``;
    articles.forEach(function (element, index) {
      let news = `
<div class="accordion-item">
<h2 class="accordion-header" id="panelsStayOpen-headingOne">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
        aria-controls="panelsStayOpen-collapseOne">
        <b>Breaking News ${index + 1}</b><pre> </pre>${element[`title`]}
    </button>
</h2>
<div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse"
    aria-labelledby="panelsStayOpen-headingOne">
    <div class="accordion-body">
        <strong>${element[`author`]}</strong> ${element[`description`]}
        <p>${element[`content`]}</p>
        <p><a href="${element[`url`]}" target="_blank">Read more here</a></p>
    </div>
</div>
</div>`;
      newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
  } else {
    console.log(`Some error occured`);
  }
};

xhr.send();
