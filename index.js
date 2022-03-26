import { createInterface } from 'readline';
import { appendFile, readFile, writeFile } from 'fs';

let input = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let prompt, info, eventName, data_array, save, elementErased;
prompt = "Agenda> "
input.setPrompt(prompt, prompt.length)

input.on('line', (line) => {
  if(line == 'exit')
  {
    console.log("Adios!");
    process.exit(0);
  }
  else if (line == 'help')
  {
    console.log("Hola! Soy tu nueva agenda electrónica, puedo realizar varias funciones dependiendo de lo que escribas en la linea de comandos, por ejemplo:\n-add event {nombre, fecha, hora}  //(crea un nuevo evento con los datos que tu proporciones)\n-erase event {nombre}  //(elimina el evento que menciones)\n-show events  //(muestra todos los eventos guardados)\n-exit  //(cierra la aplicación)");
    input.prompt();
  }
  else if (line.substring(0, 10) == 'add event ') {
    info = line.substring(10);
    appendFile('save.txt', "\n" + info, (err) => {
      if (err) throw err;
      console.log("Se ha agregado el evento");
      input.prompt();
    });
  }
  else if (line.substring(0, 12) == 'erase event ') {
    eventName = line.substring(12);
    readFile('save.txt', 'utf-8', (err, data) => {
      if (err) throw err;
      data_array = data.split('\n');
      for (var i = 0; i < data_array.length; i++)
        if (data_array[i].split(',')[0] == eventName){
          delete data_array[i];
          elementErased = true;
          break;
        }
      save = data_array.filter(function(val) { return val !== null; }).join('\n').trim();
      writeFile('save.txt', save, (err) => {
        if (err) throw err;
        if (elementErased)
          console.log('El evento',eventName,'se ha borrado');
        else
          console.log('No se encontró ningún evento llamado',eventName)
        input.prompt();
      });
    });
  }
  else if (line == 'show events') {
    readFile('save.txt', 'utf-8', (err, data) => {
      if(!data||err)
        console.log("No tienes eventos");
      else
        console.log(data.trim());
      input.prompt();
    });
  }
  else {
    console.log("Ups! No se que es eso 0.o\nPara ver que puedes hacer intenta el comando help");
    input.prompt();
  }
});

console.log("Bienvenido usuario.\nSi esta es la primera vez que ingresas intenta usar el comando help");
input.prompt();
