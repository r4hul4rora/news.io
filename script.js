const API_KEY = "ce79628fdf956d77be0113b70011ba80"
const url = "https://gnews.io/api/v4/search?q="

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data)
    bindData(data.articles)
}

function bindData(articles) {
    const cardsConstainer = document.getElementById("cards-container");
    let newsTemplate = document.getElementById("template-news-card");
    cardsConstainer.innerHTML = "";
    articles.forEach((element) => {
        if (!element.image) return;
        const cardClone = newsTemplate.content.cloneNode(true);
        fillDatainCard(cardClone, element);
        cardsConstainer.appendChild(cardClone)
    });
}

function fillDatainCard(cardClone, element) {
    const newImage = cardClone.getElementById('news-img')
    const newTitle = cardClone.querySelector('#news-title')
    const newSource = cardClone.querySelector('#news-source')
    const newdecs = cardClone.querySelector('#news-decs')

    newImage.src = element.image;
    newTitle.innerHTML = element.title
    newdecs.innerHTML = element.description

    const date = new Date(element.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    newSource.innerHTML = `${element.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(element.url,"_blank");
    })
}

let currSelectedNav=null;
function onNavItemclick(query){
    fetchNews(query)
    const navItem=document.getElementById(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=navItem
    currSelectedNav.classList.add('active');
}

const searchButton=document.getElementById("search-button")
const searchInput=document.getElementById("news-input")

searchButton.addEventListener("click",()=>{
    const query=searchInput.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active')
    currSelectedNav=null
})

function reload(){
    window.location.reload();
}