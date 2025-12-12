const dishes = [
  {
    keyword: "gaspacho",
    name: "Гаспачо",
    price: 195,
    category: "soup",
    kind: "veg",
    count: "350 г",
    image: "./src/menu/soups/gazpacho.jpg"
  },
  {
    keyword: "mushroom_soup",
    name: "Грибной суп-пюре",
    price: 185,
    category: "soup",
    kind: "veg",
    count: "330 г",
    image: "./src/menu/soups/mushroom_soup.jpg"
  },
  {
    keyword: "norwegian_soup",
    name: "Норвежский суп",
    price: 270,
    category: "soup",
    kind: "fish",
    count: "330 г",
    image: "./src/menu/soups/norwegian_soup.jpg"
  },
  {
    keyword: "ramen",
    name: "Рамен",
    price: 290,
    category: "soup",
    kind: "meat",
    count: "400 г",
    image: "./src/menu/soups/ramen.jpg"
  },
  {
    keyword: "chicken_soup",
    name: "Куриный суп",
    price: 220,
    category: "soup",
    kind: "meat",
    count: "330 г",
    image: "./src/menu/soups/chicken.jpg"
  },
  {
    keyword: "tomyum",
    name: "Том ям",
    price: 320,
    category: "soup",
    kind: "fish",
    count: "350 г",
    image: "./src/menu/soups/tomyum.jpg"
  },


  {
    keyword: "fried_potatoes_mushrooms",
    name: "Жареная картошка с грибами",
    price: 150,
    category: "main",
    kind: "veg",
    count: "250 г",
    image: "./src/menu/main_course/friedpotatoeswithmushrooms1.jpg"
  },
  {
    keyword: "lasagna",
    name: "Лазанья",
    price: 385,
    category: "main",
    kind: "meat",
    count: "310 г",
    image: "./src/menu/main_course/lasagna.jpg"
  },
  {
    keyword: "chicken_cutlets",
    name: "Котлеты из курицы с пюре",
    price: 225,
    category: "main",
    kind: "meat",
    count: "280 г",
    image: "./src/menu/main_course/chickencutletsandmashedpotatoes.jpg"
  },
  {
    keyword: "fish_rice",
    name: "Рыба с рисом",
    price: 260,
    category: "main",
    kind: "fish",
    count: "300 г",
    image: "./src/menu/main_course/fishrice.jpg"
  },
  {
    keyword: "shrimp_pasta",
    name: "Паста с креветками",
    price: 340,
    category: "main",
    kind: "fish",
    count: "320 г",
    image: "./src/menu/main_course/shrimppasta.jpg"
  },
  {
    keyword: "pizza",
    name: "Пицца Маргарита",
    price: 300,
    category: "main",
    kind: "veg",
    count: "380 г",
    image: "./src/menu/main_course/pizza.jpg"
  },


  {
    keyword: "caesar",
    name: "Салат Цезарь",
    price: 250,
    category: "salad",
    kind: "meat",
    count: "220 г",
    image: "./src/menu/salads_starters/caesar.jpg"
  },
  {
    keyword: "tuna_salad",
    name: "Салат с тунцом",
    price: 270,
    category: "salad",
    kind: "fish",
    count: "200 г",
    image: "./src/menu/salads_starters/tunasalad.jpg"
  },
  {
    keyword: "caprese",
    name: "Капрезе",
    price: 230,
    category: "salad",
    kind: "veg",
    count: "180 г",
    image: "./src/menu/salads_starters/caprese.jpg"
  },
  {
    keyword: "french_fries_1",
    name: "Картофель фри",
    price: 150,
    category: "salad",
    kind: "veg",
    count: "150 г",
    image: "./src/menu/salads_starters/frenchfries1.jpg"
  },
  {
    keyword: "french_fries_2",
    name: "Сырный картофель фри",
    price: 180,
    category: "salad",
    kind: "veg",
    count: "160 г",
    image: "./src/menu/salads_starters/frenchfries2.jpg"
  },
  {
    keyword: "salad_egg",
    name: "Овощной салат с яйцом",
    price: 190,
    category: "salad",
    kind: "veg",
    count: "200 г",
    image: "./src/menu/salads_starters/saladwithegg.jpg"
  },

  
  {
    keyword: "orange_juice",
    name: "Апельсиновый сок",
    price: 120,
    category: "drink",
    kind: "cold",
    count: "300 мл",
    image: "./src/menu/beverages/orangejuice.jpg"
  },
  {
    keyword: "apple_juice",
    name: "Яблочный сок",
    price: 90,
    category: "drink",
    kind: "cold",
    count: "300 мл",
    image: "./src/menu/beverages/applejuice.jpg"
  },
  {
    keyword: "carrot_juice",
    name: "Морковный сок",
    price: 90,
    category: "drink",
    kind: "cold",
    count: "300 мл",
    image: "./src/menu/beverages/carrotjuice.jpg"
  },
  {
    keyword: "tea",
    name: "Чёрный чай",
    price: 70,
    category: "drink",
    kind: "hot",
    count: "300 мл",
    image: "./src/menu/beverages/tea.jpg"
  },
  {
    keyword: "green_tea",
    name: "Зелёный чай",
    price: 75,
    category: "drink",
    kind: "hot",
    count: "300 мл",
    image: "./src/menu/beverages/greentea.jpg"
  },
  {
    keyword: "cappuccino",
    name: "Капучино",
    price: 160,
    category: "drink",
    kind: "hot",
    count: "250 мл",
    image: "./src/menu/beverages/cappuccino.jpg"
  },

  
  {
    keyword: "baklava",
    name: "Баклава",
    price: 140,
    category: "dessert",
    kind: "small",
    count: "120 г",
    image: "./src/menu/desserts/baklava.jpg"
  },
  {
    keyword: "donut_classic",
    name: "Классический пончик",
    price: 110,
    category: "dessert",
    kind: "small",
    count: "100 г",
    image: "./src/menu/desserts/donuts.jpg"
  },
  {
    keyword: "donut_choco",
    name: "Шоколадный пончик",
    price: 130,
    category: "dessert",
    kind: "small",
    count: "100 г",
    image: "./src/menu/desserts/donuts2.jpg"
  },
  {
    keyword: "che_cheesecake",
    name: "Чизкейк классический",
    price: 260,
    category: "dessert",
    kind: "medium",
    count: "160 г",
    image: "./src/menu/desserts/checheesecake.jpg"
  },
  {
    keyword: "choco_cheesecake",
    name: "Шоколадный чизкейк",
    price: 270,
    category: "dessert",
    kind: "medium",
    count: "170 г",
    image: "./src/menu/desserts/chocolatecheesecake.jpg"
  },
  {
    keyword: "chocolate_cake",
    name: "Шоколадный торт",
    price: 290,
    category: "dessert",
    kind: "big",
    count: "220 г",
    image: "./src/menu/desserts/chocolatecake.jpg"
  }
];
