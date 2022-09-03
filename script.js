//Оживляем кнопку лайка
let likeHeart = document.querySelector('#like_btn');  // неактивный лайк
let likeHeart2 = document.querySelector('#like_btn_red');  // активный лайк
let FavJoke = document.querySelector('#main_joke');  // находим весь блок с шуткой (в левой стороне)
let myJokeList = document.querySelector('#new_favJoke'); // находим блок, куда перемещать избранную шутку (правый блок)

likeHeart.addEventListener('click', function(){
    likeHeart.classList.toggle('liked');
    likeHeart2.classList.remove('liked');

// с помощью лайка, переносим шутки в избранное
let clone = FavJoke.cloneNode(true);  // глубокое копирование всего блока
      
    clone.id = ('new_favJoke_clone');   // присваиваю клонируемому элементу айдишник, чтобы изменять стили
    myJokeList.appendChild(clone);   
})


likeHeart2.addEventListener('click', function(){
    likeHeart2.classList.toggle('liked');
    likeHeart.classList.remove('liked');

// При повторном нажатии на лайк, убираем из избранного шутку
      myJokeList.remove();
})
// добавляем функционал кнопке выбора шутки
const jokeBtn = document.querySelector('.joke_search_btn');
const jokeText = document.querySelector('.joke p');

jokeBtn.addEventListener('click', JokeList);

async function JokeList(){
    const jokeData = await fetch('https://api.chucknorris.io/jokes/random');
    const jokeObj = await jokeData.json();
    jokeText.innerHTML = jokeObj.value;

//выводим нужный айдишник шутки
const jokeId = document.querySelector('.id span');
jokeId.innerHTML = jokeObj.id;

// выводим обновление шутки с реального времени
const jokeUpdate = document.querySelector('.update span');

// cчитаем миллисекунды от реального времени
let now = new Date();
let nowSec = now.getTime() / 3600000;   // прошло часов в реальном времени с 1970 года
 
// считаем миллисекунды от времени, данного в API
let apiDate = new Date (jokeObj.created_at);
let apiDateSec = apiDate.getTime() / 3600000;
   
//выводим разницу и выводим на табло
let differTime = Math.floor(nowSec - apiDateSec);
jokeUpdate.innerHTML = differTime + ' '+ 'hours ago';

// при выводе новой шутки убираем лайк
likeHeart.classList.remove('liked');
}

// выводим массив категорий в кнопки
const categoriesBtn = document.querySelector('#categories');  // находим наш radio с категориями
const categoriesText = document.querySelector('.tabs');       // находим наш div, куда будут размешаться кнопки

categoriesBtn.addEventListener('click', JokeCategories);
categoriesText.classList.remove('clicked');

async function JokeCategories(){
    const categoriesData = await fetch('https://api.chucknorris.io/jokes/categories');
    const categObj = await categoriesData.json();

// создаем массив кнопок с названиями категорий 
    function createBtns() {
        for (let i = 0; i < categObj.length; i++) {
             let btn = document.createElement("button");    // переменная кнопок 
             btn.setAttribute('id','categ_button');  // добавляю кнопкам айди
             let t = document.createTextNode(categObj[i]);  // добавляем на кнопки названия категорий из массива        
                
             btn.appendChild(t); //  в кнопки добавляем тексты
             categoriesText.appendChild(btn); // добавляем кнопки в див с категориями
      };
    };
    
    createBtns();  

// Делаем вывод кнопок с категориями только один раз при клике на инпут

        if(createBtns = true){  // то есть массив с кнопками - категориями созданный
         categoriesBtn.removeEventListener('click', JokeCategories)}   // перестаем создавать новые массивы с кнопками при последующих кликах
        else{
        return;
         };
    
// при выборе варианта "рандом" прячем категории;
let randomBtn = document.querySelector('#random');

randomBtn.addEventListener('click', function(){
    categoriesText.classList.toggle('clicked');
})
// Делаем кнопки категорий активными
let btnActive = document.querySelectorAll('#categ_button');
       for(let i=0; i<btnActive.length;i++){
       btnActive[i].addEventListener('click', function(){
       this.classList.toggle('choiced')})};  
       };




