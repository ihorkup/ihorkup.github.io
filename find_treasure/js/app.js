//Отримуємо випадкове число
let getRandomNumber = function (size) {
  return Math.floor(Math.random() * size);
};

//Вираховуємо відстань від кліку (event) до скарбу (target)
let getDistance = function (event, target) {
  let diffX = event.offsetX - target.x;
  let diffY = event.offsetY - target.y;
  return Math.sqrt(diffX * diffX + diffY * diffY); //гіпотенуза (відстань) = (a^2+b^2)^(1/2)
};

//Отримуємо підказку для знаходження цілі
let getDistanceHint = function (distance) {
  if (distance < 10) {
    return "Обпечешся!";
  } else if (distance < 20) {
    return "Дуже-дуже гарячо!";
  } else if (distance < 40) {
    return "Дуже гарячо";
  } else if (distance < 70) {
    return "Гарячо";
  } else if (distance < 100) {
    return "Дуже тепло";
  } else if (distance < 150) {
    return "Тепло";
  } else if (distance < 200) {
    return "Холодно";
  } else if (distance < 300) {
    return "Дуже холодно";
  } else if (distance < 400) {
    return "Дуже-дуже холодно";
  } else if (distance < 530) {
    return "Антарктида";
  } else {
    return "Втікай, бо замерзнеш!";
  }
};

let finish = function (reason) {
  if (reason === "limit") {
    let finish = confirm(
      "КІНЕЦЬ ГРИ! ВИКОРИСТАНО ВСІ СПРОБИ - " + clicks + " \nСПРОБУВАТИ ЩЕ РАЗ?"
    );
    if (finish === true) {
      clicks = 0;
      $("#info").text(
        "Шукай - клікай на карті. Ліміт - 20 кліків (" + clicks + ")"
      );
      $(".hint").text("--тут буде підказка--");
    } else {
      document.write(
        "<h1 style='text-align: center; position: relative; top: 45%;'>КІНЕЦЬ ГРИ!</h1>"
      );
    }
  } else {
    let finish = confirm("ТИ ВИГРАВ! \nСПРОБУВАТИ ЩЕ РАЗ?");
    if (finish === true) {
      clicks = 0;
      $("#info").text(
        "Шукай - клікай на карті. Ліміт - 20 кліків (" + clicks + ")"
      );
      $(".hint").text("--тут буде підказка--");
    } else {
      document.write(
        "<h1 style='text-align: center; position: relative; top: 45%;'>КІНЕЦЬ ГРИ!</h1>"
      );
    }
  }
};

let clicks = 0;
let width = 550;
let height = 550;

//Випадкова позиція скарбу
let target = {
  x: getRandomNumber(width),
  y: getRandomNumber(height),
};

//Додаємо елементу img обробник кліку
$("#map").click(function (event) {
  if (clicks < 20) {
    clicks++;
    //Отримуємо відстань від місця кліку до скарбу
    let distance = getDistance(event, target);

    //Перетворюємо відстань в підказку
    let distanceHint = getDistanceHint(distance);

    //Записуємо в елемент #distance нову підказку
    $(".hint").text(distanceHint.toUpperCase());

    //Записуємо кількість кліків
    $("#info").text(
      "Шукай - клікай на карті. Ліміт - 20 кліків (" + clicks + ")"
    );

    //якщо клік був достатньо близько до скарбу - вітаємо з перемогою
    if (distance < 8) {
      alert("Скарб знайдено! Зроблено кліків: " + clicks);
      reason = "win";
      finish(reason);
    }
  } else {
    reason = "limit";
    finish(reason);
  }
});
