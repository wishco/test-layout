

document.addEventListener('DOMContentLoaded', function(){ 
 // подстановка картинок в навигации от размера экрана
 // имя файла отсекается от src пути по первому вхождению символа '-' с левой стороны
 const CLASS_LISTENER = ".media__img";
 const FOLDER = "img/media/items/";
 let mediaAreas = [];
 let initMediaAreas = addMediaPoint.bind(mediaAreas); // привязываем контекст
 
 // инициализация массива и добавления слушателей
 initMediaAreas('1170', '(min-width: 761px)');
 initMediaAreas('760', '(max-width: 760px) and (min-width: 421px)');
 initMediaAreas('320', '(max-width: 420px)');
 
 // Инициализация синхронизации картинок после загрузки страницы
 mediaAreas.forEach(function(element) {
  mediaTask(element.listener);
 });

 function mediaTask(mediaArea) {
  let currenMedia = 0;

  for (var i=0; i < mediaAreas.length ; i++)
   if ((mediaAreas[i].media === mediaArea.media) && (mediaArea.matches))
    currenMedia = mediaAreas[i].width;

  if (!currenMedia) return; // если не нужно менять картинки, выходим

  document.querySelectorAll(CLASS_LISTENER).forEach(function(element) {
   if (!element) {console.error(`На странице нет объектов с требуемым классом: + ${CLASS_LISTENER}`); return; }
   let s1 = element.getAttribute('src');
   if (!s1) { console.error(`У объекта с классом '${CLASS_LISTENER}' нет необходимого атрибута: src`); return; }
   let s2 = s1.indexOf('-') + 1; // ищем вхождение символа в имени
   if (s2 === 0) { console.error(`В атрибуте 'src' некорректно задано имя файла. (не найден символ '-')`); return; }
   let s3 = s1.slice(s2);
   let s4 = FOLDER + currenMedia + '/item' + currenMedia + '-' + s3;
   if (s4 != s1) {
    element.setAttribute('src' , s4); // меняем путь, если пути не совпадают
   }
  })

 }

 // добавление медиа запроса
 function addMediaPoint(mediaWidth, mediaArea) {
  let newObj = {
   width: `${mediaWidth}`,
   media: `${mediaArea}`
  }
  newObj.listener = window.matchMedia(mediaArea);
  newObj.listener.addListener(mediaTask);
  this.push(newObj);
 }

 // удаление медиа запроса
 function removeMediaPoint() {
   // this.pop
   // написать функцию удаления слушателей, при разработке Веб приложения 
 }


// заглушка, что бы оставаться на странице при нажатии на пустой тег 'a'
function dropLink(event) {
 if (this.getAttribute('href') == '') event.preventDefault();
}
let dropTagFromAtrr = document.querySelectorAll('a');
// console.log(dropTagFromAtrr.length);

dropTagFromAtrr.forEach(function(element) {
 element.addEventListener("click", dropLink,);
});

// dropTagFromAtrr.addEventListener("click", dropLink,);




 /* begin begin Back to Top button  */
 (function() {
  function trackScroll() {
   let scrolled = window.pageYOffset;
   let coords = document.documentElement.clientHeight;
   if (scrolled > coords) goTopBtn.classList.add('area__link_top-show');
   if (scrolled < coords) goTopBtn.classList.remove('area__link_top-show');
  }

  function backToTop() {
   if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 20);
   }
  }
  let goTopBtn = document.querySelector('.area__link_top');
  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
 })();
 /* end begin Back to Top button  */



});

