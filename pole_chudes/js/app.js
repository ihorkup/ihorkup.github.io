//створюємо масив із словами
var words = [
  "кіт",
  "телевізор",
  "університет",
  "сесія",
  "собака",
  "дерево",
  "сонце",
  "небо",
  "людина",
  "книжка",
  "любов",
  "квартира",
];
// вибираємо випадкове число
var word = words[Math.floor(Math.random() * words.length)];

// створюємо підсумковий масив
var answerArray = [];
for (var i = 0; i < word.length; i++) {
  answerArray[i] = "_";
}

// кількість невідгаданих букв
var remainingLetters = word.length;

// кількість спроб на помилку
var attempts = 10;

alert("Гра ПОЛЕ ЧУДЕС. У вас є 10 спроб на помилку. Удачі!");

// ігровий цикл
while (remainingLetters > 0 && attempts > 0) {
  //показуємо стан гри
  alert(answerArray.join(" "));

  // запитуємо варіант відповіді
  var guess = prompt("Вгадайте букву або нажміть 'Cencel' для виходу з гри.");

  // перетворюємо введення в нижній регістр
  guess = guess.toLowerCase();

  if (guess === null) {
    // виходимо з ігрового циклу
    break;
  } else if (guess.length !== 1) {
    alert("Будь ласка, введіть тільки одну букву.");
  } else {
    // оновляємо стан гри
    for (var j = 0; j < word.length; j++) {
      if (guess === word[j] && answerArray[j] === "_") {
        answerArray[j] = guess;
        remainingLetters--;
        //додаємо +1, щоб не змінився результат змінної attempts
        attempts++;
      }
    }

    attempts--;
  }
  // кінець ігрового циклу
}

if (remainingLetters == 0) {
  // відображаємо відповідь і вітаємо гравця
  alert(answerArray.join(" "));
  alert("Відмінно! Було загадано слово: " + word);
} else if (attempts === 0) {
  alert("Ви використали всі спроби на помилку. Загадане слово: " + word);
} else {
  alert("Шкода, що ви нас покидаєте... Чекаємо зустрічі:)");
}
