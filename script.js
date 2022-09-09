//Оживляем кнопку лайка
let likeHeart = document.querySelector('#inactiveLikeButton');  // неактивный лайк
let unlikeHeart = document.querySelector('#activeLikeButton');  // активный лайк
let favJoke = document.querySelector('#main_joke');  // находим весь блок с шуткой (в левой стороне)
let myJokeList = document.querySelector('#new_favJoke'); // находим блок, куда перемещать избранную шутку (правый блок)

likeHeart.addEventListener('click', function(){
    likeHeart.classList.toggle('liked');
    unlikeHeart.classList.remove('liked');
})

unlikeHeart.addEventListener('click', function(){
    unlikeHeart.classList.toggle('liked');
    likeHeart.classList.remove('liked');

// При повторном нажатии на лайк, убираем из избранного шутку
      myJokeList.remove();
});

// добавляем функционал кнопке выбора шутки
const jokeBtn = document.querySelector('.joke_search_btn');
const jokeText = document.querySelector('.joke p');

jokeBtn.addEventListener('click', jokeList);

async function jokeList(){
    const jokeData = await fetch('https://api.chucknorris.io/jokes/random');
    const jokeObj = await jokeData.json();
    jokeText.innerHTML = jokeObj.value;

//выводим нужный айдишник шутки
const jokeId = document.querySelector('.joke_id span');
jokeId.innerHTML = jokeObj.id;

// выводим обновление шутки с реального времени
const jokeUpdate = document.querySelector('.update span');

// cчитаем миллисекунды от реального времени
function upDatetime (){
    let now = new Date();
    let nowSec = now.getTime() / 3600000;   // прошло часов в реальном времени с 1970 года
    let apiDate = new Date (jokeObj.created_at); // считаем миллисекунды от времени, данного в API
    let apiDateSec = apiDate.getTime() / 3600000;
    let differTime = Math.floor(nowSec - apiDateSec);     //выводим разницу и выводим на табло
    jokeUpdate.innerHTML = differTime + ' '+ 'hours ago';
};
upDatetime();

// при выводе новой шутки убираем лайк
likeHeart.classList.remove('liked');
};

// выводим массив категорий в кнопки
const categoriesBtn = document.querySelector('#categories');  // находим наш radio с категориями
const categoriesText = document.querySelector('.tabs');       // находим наш div, куда будут размешаться кнопки
let randomBtn = document.querySelector('#random');

async function jokeCategories(){
const response = await fetch('https://api.chucknorris.io/jokes/categories');
const categories = await response.json();  

// создаем массив кнопок с названиями категорий 
function createBtns() {
for (let i = 0; i < categories.length; i++) {
let btn = document.createElement("button");    // переменная кнопок 
btn.setAttribute('id','categ_button');  // добавляю кнопкам айди
let t = document.createTextNode(categories[i]);  // добавляем на кнопки названия категорий из массива          
btn.appendChild(t); //  в кнопки добавляем тексты
categoriesText.appendChild(btn); // добавляем кнопки в див с категориями
};
// Делаем кнопки категорий активными

let btnActive = document.querySelectorAll('#categ_button');
console.log(btnActive)
for(let i=0; i<btnActive.length;i++){
btnActive[i].addEventListener('click', function(){
this.classList.toggle('choiced')})};  
};
createBtns();
}
jokeCategories()

categoriesBtn.addEventListener('click', function(){
    categoriesText.removeAttribute('id','clicked');
    categoriesText.setAttribute('id','unclicked');
});

randomBtn.addEventListener('click', function(){
    categoriesText.setAttribute('id','clicked');
});






