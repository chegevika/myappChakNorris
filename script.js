//Создаем контейнер с главной шуткой
const cardTemplate = document.querySelector('#main_joke');

function createJokeCart(){
    const div = document.createElement('div');
    
    const p = document.createElement('p');
    const img = document.createElement('img');
    const img2 = document.createElement('img');
    const unlike = document.createElement('img');
    const h = document.createElement('div');
    const span = document.createElement('span');
    const div_floor = document.createElement('div');
    const btnInJokeContainer = document.createElement('button');
    const timeUpdate = document.createElement('div');
    const timefromRealyUpdate = document.createElement('span');

    div.classList = "joke";
    cardTemplate.appendChild(div);
    p.innerHTML = "No one truly knows who's Chuck Norris' real father. No one is biologically strong enough for this. He must've conceived himself"
    div.appendChild(p);
    img.setAttribute('id','logo'); 
    cardTemplate.appendChild(img);
    img2.setAttribute('id','activeLikeButton');
    cardTemplate.appendChild(img2);
    unlike.setAttribute('id','inactiveLikeButton'); 
    cardTemplate.appendChild(unlike);
    h.classList.toggle('joke_id');
    h.innerHTML = "ID:"
    cardTemplate.appendChild(h);
    span.innerHTML = "XNaAxUduSw6zANDaIEab7A "
     h.appendChild(span);
    div_floor.classList.toggle('joke_cont_floor');
    cardTemplate.appendChild(div_floor);
    btnInJokeContainer.classList.toggle('categories_btn_joke');
    div_floor.appendChild(btnInJokeContainer);
    timeUpdate.classList.toggle('update');
    timeUpdate.innerHTML = "Last update:"
    div_floor.appendChild(timeUpdate);
    timefromRealyUpdate.innerHTML = "1923 hours ago";
    timeUpdate.appendChild(timefromRealyUpdate);
};
    createJokeCart()

// создаем массив из элементов joke_container
const ArrayJokes = Array.prototype.slice.call(cardTemplate.children);
console.log(ArrayJokes);

//Оживляем кнопку лайка
const likeHeart = document.querySelector('#inactiveLikeButton');  // неактивный лайк
const unlikeHeart = document.querySelector('#activeLikeButton');  // активный лайк
const favJoke = document.querySelector('#main_joke');  // находим весь блок с шуткой (в левой стороне)
const myJokeList = document.querySelector('#new_favJoke'); // находим блок, куда перемещать избранную шутку (правый блок)

likeHeart.addEventListener('click', function(){
    likeHeart.classList.toggle('liked');
    unlikeHeart.classList.remove('liked');
    // создаем массив из элементов ДОМа
})

unlikeHeart.addEventListener('click', function(){
    unlikeHeart.classList.toggle('liked');
    likeHeart.classList.remove('liked');
});


// добавляем функционал кнопке выбора шутки
const jokeBtn = document.querySelector('.joke_search_btn');
const jokeText = document.querySelector('.joke p');

jokeBtn.addEventListener('click', showjoke);

async function getJoke() {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  const joke = await response.json();
  return joke;
}
async function showjoke() {
  const joke = await getJoke();
  jokeText.innerHTML = joke.value;

  //выводим нужный айдишник шутки
  const jokeId = document.querySelector('.joke_id span');
  jokeId.innerHTML = joke.id;

  // выводим обновление шутки с реального времени
  const jokeUpdate = document.querySelector('.update span');

  // cчитаем миллисекунды от реального времени
  jokeUpdate.innerHTML = getHoursDiff(joke);

  // при выводе новой шутки убираем лайк
  likeHeart.classList.remove('liked');
}

// сам подсчет апдейта времени с реального момента.
function getHoursDiff(joke) {
    let now = new Date();
    let nowSec = now.getTime() / 3600000; // прошло часов в реальном времени с 1970 года
    let apiDate = new Date(joke.created_at); // считаем миллисекунды от времени, данного в API
    let apiDateSec = apiDate.getTime() / 3600000;
    let differTime = Math.floor(nowSec - apiDateSec); //выводим разницу и выводим на табло
    return differTime + ' ' + 'hours ago';
  }

// выводим массив категорий в кнопки
const categoriesBtn = document.querySelector('#categories'); // находим наш radio с категориями
const categoriesText = document.querySelector('.tabs'); // находим наш div, куда будут размешаться кнопки
let randomBtn = document.querySelector('#random');

async function jokeCategories() {
  const response = await fetch('https://api.chucknorris.io/jokes/categories');
  const categories = await response.json()
  return categories};

async function showAllCategories(){
    const categories = await jokeCategories();
    
// создаем массив кнопок с названиями категорий

    function createBtns(){
        categories.forEach(element =>{
            const btn = document.createElement('button'); // переменная кнопок
            btn.setAttribute('id', 'categ_button'); // добавляю кнопкам айди
            let t = document.createTextNode(element); // добавляем на кнопки названия категорий из массива
            btn.appendChild(t); //  в кнопки добавляем тексты
            categoriesText.appendChild(btn); // добавляем кнопки в див с категориями)
        });
           
// Делаем кнопки категорий активными
    commonCategories = document.querySelector('.tabs').querySelectorAll('#categ_button');
    commonCategories.forEach(element => {
    element.addEventListener('click', function(){
    commonCategories.forEach(common=>common.classList.remove("choiced"))  // убираем класс активной кнопки при переключении на новую кнопку
    this.classList.toggle("choiced")});
})
};
createBtns();};

showAllCategories()  // вызываем функцию показывания созданного массива кнопок с категориями

categoriesBtn.addEventListener('click', function () {
  categoriesText.removeAttribute('id', 'clicked');
  categoriesText.setAttribute('id', 'unclicked');
});

randomBtn.addEventListener('click', function () {
  categoriesText.setAttribute('id', 'clicked');
});

