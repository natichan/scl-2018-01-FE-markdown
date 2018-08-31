# MD LINKS VERIFICATION

## Introducción

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Es por eso que 'md-links-verification' lee y analiza archivos en formato `Markdown`, además extrae y verifica los links que contengan.

### Instalación

Para instalar la libreria 
`npm install <github-user>/md-links`

como dependencia:
`npm i md-links-verification`

### Al importar el módulo
#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta 
- `options`: Un objeto con la siguiente propiedad:
  - `validate`: Valor que determina si se desea validar los links encontrados en el archivo. 

##### Valor de retorno

La función retorna una promesa que resuelve a un arreglo
(`Array`) de objetos (_Object_), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

### CLI (Línea de comando)

El ejecutable de nuestra aplicación se ejecuta de la siguiente manera:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md:10 http://algo.com/2/3/ Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html algún doc
./some/example.md:40 http://google.com/ Google
```
Identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprime los links que vaya
encontrando, junto con la ruta del archivo y la linea donde aparece, así como
también el texto que hay dentro del link.

`md-links <path-to-file> --validate`

```sh
$ md-links ./some/example.md --validate
./some/example.md:10 http://algo.com/2/3/ ok 200 Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md:40 http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.