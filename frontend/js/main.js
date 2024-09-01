
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabs__tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    tablinks = document.getElementsByClassName("tabs__tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll('.tabs__number_item');
  
  listItems.forEach((item, index) => {
    const numberSpan = document.createElement('span');
    numberSpan.classList.add('number');
    numberSpan.textContent = index + 1;

    item.prepend(numberSpan);
  });
});



$(document).ready(function() {
  let submitButton = $("#formConctact").find('.form-conctact__btn');

  $("#formConctact").validate({
    rules: {
        contactName: {
          required: true,
          customValidation: /^[^0-9]*$/
        },
        contactEmail: {
          required: true,
          email: true,
        },
        mobileNumber: {
          required: true,
          digits: true
        },
        homeNumber: {
          required: true,
          digits: true
        },
        parkingAddress: {
          required: true,
        },
        notificationTitle:{
          required: true,
        },
        autoPrice: {
          required: true,
        },
        motoPrice: {
          required: true,
        },
        suvPrice: {
          required: true,
        },
        busPrice: {
          required: true,
        },
        wastelandPrice: {
          required: true,
        },
        city: {
          required: true,
      }
    },
    messages: {
        contactName: {
          required: "Введите ваше имя",
          customValidation: "Поле 'Имя' не должно содержать цифры"
        },
        contactEmail: {
          required: "Введите ваш email",
          email: "Введите корректный email"
        },
        mobileNumber: {
          required: "Введите номер мобильного телефона",
          digits: "Введите только цифры"
        },
        homeNumber: {
          required: "Введите номер домашнего телефона",
          digits: "Введите только цифры"
        },
        parkingAddress: {
          required: "Введите адрес стоянки эвакуатора",
        },
        city: {
          required: "Выберите город",
        },
        autoPrice: {
          required: "Укажите цену",
        },
        motoPrice: {
          required: "Укажите цену",
        },
        suvPrice: {
          required: "Укажите цену",
        },
        busPrice: {
          required: "Укажите цену",
        },
        wastelandPrice: {
          required: "Укажите цену",
        },
        notificationTitle: {
          required: "Укажите заголовок",
        }
    },
    errorPlacement: function(error, element){ 
      let errorContainer = element.closest('.form__control').find('.error-item-text');
      if (errorContainer.length > 0) {
        error.appendTo(errorContainer);
      } else {
        error.insertAfter(element);
      }
    },

    highlight: function(element) {
      $(element).closest('.form__control').addClass('error-item');
    },
    unhighlight: function(element) {
      $(element).closest('.form__control').removeClass('error-item');
    }
  });

  $.validator.addMethod("customValidation", function(value, element, pattern) {
    return this.optional(element) || pattern.test(value);
  }, "Поле 'Имя' не должно содержать цифры");

  $("#formConctact input").on("focusin", function() {
    updateSubmitButtonState();
  });

  $("#formConctact input").on("focusout", function() {
    $(this).valid();
    updateSubmitButtonState();
  });

  function updateSubmitButtonState() {
    let allFieldsValid = true;
    $("#formConctact input").each(function() {
      if (!$(this).valid()) {
        allFieldsValid = false;
        return false;
      }
    });
    submitButton.prop("disabled", !allFieldsValid);
  }
  updateSubmitButtonState();
});




const button = document.querySelector('.form-conctact__btn');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup-close');

if(button){
  let popupTimeout;
  function showPopup() {
      popup.style.display = 'block'; 
      setTimeout(() => popup.classList.add('active'), 10);
      popupTimeout = setTimeout(hidePopup, 5000);
  }
  function hidePopup() {
      popup.classList.remove('active');
      clearTimeout(popupTimeout);
      setTimeout(() => popup.style.display = 'none', 500);
  }
  button.addEventListener('click', function(event) {
      event.preventDefault(); 
      showPopup();
  });
  popupClose.addEventListener('click', hidePopup);
}





const sliderCards = new Swiper('#cards', {
  slidesPerView: 2,
  spaceBetween: 10,
  centeredSlides: false,
  loop: true,
  pagination: {
    el: '.weight__pagination',
    enabled: true,
    clickable: true,
  },
  navigation: {
    nextEl: '.weight__next',
    prevEl: '.weight__prev',
  },
})

document.addEventListener('DOMContentLoaded', function () {
    const cardsPerPage = 4; // Количество карточек на одной странице
    const cards = document.querySelectorAll('.contact_cards__card');
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    let currentPage = 1;

    // Функция для обновления пагинации
    function updatePagination() {
        // Скрываем все карточки
        cards.forEach(card => card.classList.remove('visible'));

        // Показываем карточки текущей страницы
        const start = (currentPage - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        for (let i = start; i < end && i < cards.length; i++) {
            cards[i].classList.add('visible');
        }

        // Обновляем состояние кнопок
        const prevButton = document.querySelector('.pagination__prev');
        const nextButton = document.querySelector('.pagination__next');

        prevButton.style.display = currentPage === 1 ? 'none' : 'block';
        nextButton.style.display = currentPage === totalPages ? 'none' : 'block';

        // Обновляем активные состояния для номеров страниц
        const pageBlocks = document.querySelectorAll('.pagination__page');
        pageBlocks.forEach((block, index) => {
            block.classList.toggle('active', index + 1 === currentPage);
        });
    }

    // Инициализация контейнера для номеров страниц
    const paginationPages = document.querySelector('.pagination__pages');
    paginationPages.innerHTML = ''; // Убедимся, что контейнер чистый перед заполнением
    for (let i = 1; i <= totalPages; i++) {
        const pageBlock = document.createElement('div');
        pageBlock.classList.add('pagination__page');
        pageBlock.textContent = i;
        pageBlock.dataset.page = i;

        // Добавляем обработчик события для перехода по страницам
        pageBlock.addEventListener('click', () => {
            currentPage = i;
            updatePagination();
        });

        paginationPages.appendChild(pageBlock);
    }

    // Обработчики событий для кнопок "Назад" и "Вперед"
    document.querySelector('.pagination__prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    document.querySelector('.pagination__next').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // Инициализация пагинации
    updatePagination();
});
