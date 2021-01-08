
export default {
  items: [
    {
      name: "Админ панель",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Основные",
    },
    {
      name: "Каталог",
      url: "/catalog",
      icon: "fa fa-list-ul",
      children: [
        {
          name: "Категории",
          url: "/catalog/categories",
          icon: "fa fa-bars",
        },
        {
          name: "Классы",
          url: "/catalog/classes",
          icon: "fa fa-superpowers",
        },
        {
          name: "Бренды",
          url: "/catalog/brands",
          icon: "fa fa-apple",
        },
        {
          name: "Характеристики",
          url: "/catalog/options",
          icon: "fa fa-dot-circle-o"
        },
        {
          name: "Значение Характеристик",
          url: "/catalog/optionvalues",
          icon: "icon-puzzle"
        }
      ]
    },

    {
      name: "Поставщики",
      url: "/suppliers",
      icon: "icon-user-following",
      children: [
        {
          name: "Дилеры",
          url: "/suppliers/dealers",
          icon: "icon-user-following"
        },
        {
          name: "Магазины",
          url: "/suppliers/shops",
          icon: "icon-user-following"
        },
      ]
    },
    {
      name: "Товары",
      url: "/goods",
      icon: "fa fa-cubes",
      children: [
        {
          name: "Продукты",
          url: "/goods/products",
          icon: "fa fa-cubes"
        },
        {
          name: "Новые Продукты",
          url: "/goods/newproducts",
          icon: "fa fa-cubes"
        }
      ]
    },
    {
      name: "Заказы",
      url: "/orders",
      icon: "icon-basket-loaded",
    },
    {
      name: "Корзины",
      url: "/carts",
      icon: "icon-basket-loaded"
    },
    {
      name: "Покупатели",
      url: "/clients",
      icon: "icon-people",
    },
    {
      name: "Доставка",
      url: "/delivery",
      icon: "fa fa-automobile",
      children: [
        {
          name: "Методы доставок",
          url: "/delivery/deliveries",
          icon: "fa fa-automobile",
        },
        {
          name: "Курьеры",
          url: "/delivery/carriers",
          icon: "cui-user icons",
        }
      ]
    },
    {
      name: "Отчеты",
      url: "/reports",
      icon: "icon-docs",
      children: [
        {
          name: "Продажи",
          url: "/sales",
          icon: "icon-doc"
        }
      ]
    },

    {
      name: "Роли пользователей",
      url: "/userroles",
      icon: "fa fa-automobile",
      children: [
        {
          name: "Менеджеры",
          url: "/userroles/managers",
          icon: "fa fa-automobile"
        },
        {
          name: "Роли",
          url: "/userroles/roles",
          icon: "cui-user icons"
        },
      ]
    },
    {
      name: "Навигация",
      url: "/navigations",
      icon: "fa fa-flag",
    },
    {
      name: "Визуализация",
      url: "/visual",
      icon: "fa fa-desktop",
      children: [
        {
          name: "Слайдер",
          url: "/visual/sliders",
          icon: "fa fa-picture-o",
          children: [
            { 
              name: "Веб версия",
              url: "/visual/sliders/web",
              icon: "fa fa-globe",
            },
            {
              name: "Для приложения",
              url: "/visual/sliders/mobile",
              icon: "fa fa-mobile",
            },
          ]
        },
        {
          name: "Новости",
          url: "/visual/news",
          icon: "fa fa-arrows-h",
        },
      ]
    },
    {
      name: "Страницы",
      url: "/pages",
      icon: "fa fa-desktop",
      children: [
        {
          name: "О нас",
          url: "/pages/about",
          icon: "fa fa-desktop"
        },
        {
          name: "Контакты",
          url: "/pages/contacts",
          icon: "fa fa-desktop"
        },
        {
          name: "Политика",
          url: "/pages",
          icon: "fa fa-desktop"
        }
      ]
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Дополнительные"
    },
    {
      name: "Настройки",
      url: "/settings",
      icon: "icon-settings",
      children: [
        {
          name: "Язык",
          url: "/settings/language",
          icon: "flag-icon flag-icon-uz h1"
        },
        {
          name: "Валюта",
          url: "/settings/currency",
          icon: "fa fa-usd"
        }
      ]
    },

    {
      name: "Чат",
      url: "https://adminchat.bs24.uz/",
      icon: "icon-bubbles",
      variant: "danger",
      target: "_blank"
    }
  ]
};
