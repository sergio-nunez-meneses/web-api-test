let counter = 0;

function response() {
  if (this.responseText.charAt(0) === '{') {
    counter++;

    let obj = JSON.parse(this.responseText);

    for (let [index, contents] of Object.entries(obj)) {
      if (typeof contents === 'object') {
        for (let [i, c] of Object.entries(contents)) {
          // console.log(i, c);
          if (i === 'temp') {
            colors.push(randomRGBA());
            temperatures.push(c);
          }
        }
      } else if (typeof contents === 'string' && contents !== 'stations') {
        // console.log('string', contents);
        cities.push(contents);
      } else if (typeof contents === 'number') {
        // console.log('number', contents);
      } else {
        // console.log('filtered elements', contents);
      }
    }
  } else {
    console.log('Syntax error');
  }

  if (counter == CITIES.length) {
    chart(cities, temperatures, colors);
  }
}

for (let i = 0; i < CITIES.length; i++) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + CITIES[i] + ', CL&units=metric&apikey=550bcc4f3661bf6aaff5ce884577241c');
  xhr.send();
  xhr.onload = response;
}
