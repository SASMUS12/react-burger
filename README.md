# Проект: Stellar Burgers (Космическая бургерная)

#### О проекте

##### Проект представляет собой страницу оформления заказа в бургерной Stellar Burgers. Страница выполнена в виде приложения-конструктора, позволяющего пользователю самостоятельно выбрать ингредиенты для бургера.
В хэдере располагается панель навигации c ссылками для перехода в другие разделы сайта. Основной раздел страницы представлен 2 секциями: список доступных ингредиентов и состав заказа.

Список доступных ингредиентов разделен на категории, которые соответствуют их типам. В случае, если список не может быть полностью отображен в выделенной для него части интерфейса, сбоку компонента появляется полоса прокрутки. При нажатии на карточку ингридиента открывается модальное окно с крупным изображением и информацией о пищевой ценности. Вкладки в верхней части списка могут позволяют автоматически прокрутить его до нужной категории. Во время ручной прокрутки подсвечивается вкладка, соответствующая просматриваемому разделу.

В секции состав заказа отображаются все добавленные пользователем позиции. Их добавление происходит по принципу Drag-and-drop при переносе ингредиентов мышью из описанного выше общего списка ингредиентов. В случае отсутствия достаточного места для полного отображения всех включенных в заказ позиций в разделе появляется полоса прокрутки. Первый и последний ингредиент находятся за пределами прокручиваемой области, всегда видны и не могут быть перемещены на другие места. Другие составляющие заказа меняются между собой местами при передвижении их мышкой. В нижней части компонента отображается итоговая стоимость составленного набора. Рядом расположена кнопка оформления заказа. Нажатие на кнопку приводит к открытию модального окна с подтверждением оформления и номером заказа.
#### Используемые технологии:
В качестве основы проекта применяется JavaScript библиотека для создания пользовательских интерфейсов React. Среди использованных в реализации компонентов имеются как специального созданные, так и уже готовые. Благодаря использованию технологии flexbox страница приложения подстраивается под размер окна браузера. Для хранения глобального состояния применяется хранилище Redux с расширением Thunk. Функционал Drag-and-drop реализован с применением библиотеки React DnD.


#### Начало работы с Create React App

Этот проект был запущен с [Create React App](https://github.com/facebook/create-react-app).

#### Доступные скрипты

В каталоге проекта вы можете запустить:

* ##### `npm start` - запустить проект,

* ##### `npm test` - протестировать проект,

* ##### `npm run build` - собрать проект.

Создает приложение для производства в папке "build".\
Он правильно связывает React в рабочем режиме и оптимизирует сборку для достижения наилучшей производительности.

[Мой сайт доступен по адресу (https://sasmus12.github.io/react-burger/)