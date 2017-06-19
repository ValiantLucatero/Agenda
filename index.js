//const async = require('async');
const readline = require('readline');
const fs = require('fs');

let input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

prompt = "Agenda> ";
input.setPrompt(prompt, prompt.length)

input.on('line', (line) => {
  if(line == 'exit')
  {
    console.log("Adios!");
    process.exit(0);
  }
  else if (line == 'help')
  {
    console.log("Hola! Soy tu nueva agenda electrónica, puedo realizar varias funciones dependiendo de lo que escribas en la linea de comandos, por ejemplo:\n-add event {nombre, fecha, hora}  //(crea un nuevo evento con los datos que tu proporciones)\n-erase event {nombre}  //(elimina el evento que menciones)\n-show events  //(muestra todos los eventos guardados)");
    input.prompt();
  }
  else if (line.substring(0, 9) == 'add event') {
    info = line.substring(10);
    fs.appendFile('save.txt', info + "\n", (err) => {
      if (err) throw err;
      console.log("Se ha agregado el evento");
    });
    input.prompt();
  }
  else if (line.substring(0, 11) == 'erase event') {
    name = line.substring(12);
    fs.readFile('save.txt', 'utf-8', (err, data) => {
      if (err) throw err;
      data_array = data.split('\n')
      search = () => {
          for (var i = data_array.length - 1; i > -1; i--)
          if (data_array[i].match(name))
              return i;
      }
      delete data_array[search];
      save = data_array.join('\n');
      fs.writeFile('save.txt', save);
    });
    input.prompt();
  }
  else if (line == 'show events') {
    fs.readFile('save.txt', 'utf-8', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    input.prompt();
  }
  else {
    console.log("Ups! No se que es eso 0.o\nPara ver que puedes hacer intenta el comando help");
    input.prompt();
  }
});

console.log("Bienvenido usuario.\nSi esta es la primera vez que ingresas intenta usar el comando help");
input.prompt();
