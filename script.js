// const accessKey = "26XAPK-MagDlCbSocsor1xAhmRyczNgxA1hvuOmfO4w"; // Вставить свой ТОКЕН!!!
// let isFetching = false; // Проиходит ли fetch запрос

// // Создание fetch на получение 10-ти фото и параметром page с запрашиваемой страницей
// const fetchPhotos = async (page) => {
//   // try catch использован только для того, что бы менять isFetching. Сама обработка ошибки происходит в функции, которая вызывает fetch
//   try {
//     const response = await fetch(
//       `https://api.unsplash.com/photos/?page=${page}&client_id=${accessKey}`
//     );
//     // Если не удалось совершить сам fetch, например нет интернета
//     if (!response.ok) {
//       throw new Error("Ошибка при загрузке данных");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error; // ошибка здесь не обрабатывается, он обрабатывается в методе где вызвана функция fetchPhotos
//   } finally {
//     isFetching = false;
//   }
// };

// let currentPage = 1; // Текущая страница

// // Функция загружкается при старте страницы, она асинхронная, т.к. ждёт выполнения fatchPHotos
// async function run() {
//   // Если произойдёт ошибка
//   try {
//     // Сохраняем в переменную массив объектов и fetch запроса для дальнейшей работы
//     const data = await fetchPhotos(currentPage); // (10) [{…}, {…}, {…}, {…}]
//     // Добавление фото на страницу
//     addPhotosInHTML(data);
//   } catch (error) {
//     // То результат ошибки вывети в созданный errorMessage
//     const errorMessage = document.createElement("div");
//     errorMessage.textContent = error.message;
//     document.querySelector("#photo-container").append(errorMessage);
//   }
// }

// run();

// const photoContainer = document.querySelector("#photo-container");

// // Функция создаёт HTML разметку для кадой фотографии из массива объектов и вставляет в photoContainer
// function addPhotosInHTML(data) {
//   for (const obj of data) {
//     photoContainer.insertAdjacentHTML(
//       "beforeend",
//       `<div class="photo">
//               <img src="${obj.urls.full}" alt="${obj.alt_description}" />
//             </div>`
//     );
//   }
// }

// // Создание пагинации
// // Создание события, что при скроле окна на 90% происходи запрос на новые фото
// window.addEventListener("scroll", async () => {
//   // percentPage содержитт процент прокрутики скролла
//   const percentPage =
//     (window.scrollY / (document.body.clientHeight - window.innerHeight)) * 100;

//   // Ели процент прокурти больше либо равен 90% и fetch не выполняется, (чты бы не было постоянного fetch) делаем fetch для получения новых фото
//   if (percentPage >= 90 && !isFetching) {
//     isFetching = true;
//     currentPage++;
//     // Если произойдет ошибка ...
//     try {
//       // Создание fetch запроса для получения фото для текущей страницы
//       const data = await fetchPhotos(currentPage);
//       addPhotosInHTML(data);
//     } catch (error) {
//       // ... выведи ошибку в alert
//       alert(error.message);
//     }
//   }
// });

window.addEventListener("load", () => {
  renderPhoto();
});

async function getRandomPhoto() {
  const apiKey = "26XAPK-MagDlCbSocsor1xAhmRyczNgxA1hvuOmfO4w";
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}`
    );
    const photo = await response.json();
    return photo;
  } catch (error) {
    console.error("Ошибка при загрузке фотографий:", error);
    return {};
  }
}

async function renderPhoto() {
  const photo = await getRandomPhoto();
  if (photo) {
    const imageBox = document.querySelector(".image_box");
    const img = document.createElement("img");
    img.classList.add("image");

    img.src = photo.urls.small;
    img.alt = photo.alt_description;
    imageBox.appendChild(img);

    const imagePhotographerNameDiv = document.querySelector(
      ".image_photographer-name"
    );
    imagePhotographerNameDiv.textContent = `${photo.user.name}`;

    const imageLikesCounterSpan = document.querySelector(
      ".image_likes-counter"
    );
    imageLikesCounterSpan.textContent = `${photo.likes}`;
  }
}

const counterButton = document.querySelector(".image_likes-button");
counterButton.addEventListener("click", function () {
  if (counterButton.classList.contains("active")) {
    counterButton.classList.remove("active");
    decreaseCounter();
  } else {
    counterButton.classList.add("active");
    increaseCounter();
  }
});

function increaseCounter() {
  const likesCounter = document.querySelector(".image_likes-counter");
  const currentCounter = parseInt(likesCounter.textContent, 10);
  likesCounter.textContent = currentCounter + 1;
}

function decreaseCounter() {
  const likesCounter = document.querySelector(".image_likes-counter");
  const currentCounter = parseInt(likesCounter.textContent, 10);
  likesCounter.textContent = currentCounter - 1;
}
