# MD LINKS VERIFICATION

Md-links-verification es una librería que lee y analiza archivos en formato Markdown, además extrae y verifica los links que contengan.
![markdown](https://user-images.githubusercontent.com/39122711/47360814-c6060a80-d6a6-11e8-8342-b6a2ea5a47f7.png)

## Introducción

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Es por eso que 'md-links-verification' te ofrece leer y analizar este tipo de archivos, además de extraer y verificar los links que contengan para saber si el estado de cada uno aún es válido.

## Instalación

Instalar como dependencia:
`npm i md-links-verification`

[NPM public library](https://www.npmjs.com/package/md-links-verification)

Instalar como interfaz
`npm install -g https://github.com/Laboratoria/scl-2018-01-FE-markdown`

### USO
#### CLI (Línea de comando)

El ejecutable de nuestra aplicación se ejecuta de la siguiente manera:

Linea que deberías ejecutar en tu terminal o consola:
`mdlinks <file> [options]`

Debes ingresar el archivo directo 

Por ejemplo:

```sh
$ mdlinks example.md
./some/example.md:10 http://algo.com/2/3/ Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html algún doc
./some/example.md:40 http://google.com/ Google
```
Identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprime los links que vaya
encontrando, junto con la ruta del archivo y la linea donde aparece, así como
también el texto que hay dentro del link.

`mdlinks <file> --validate`

```sh
$ mdlinks example.md --validate
./some/example.md:10 http://algo.com/2/3/ ok 200 Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md:40 http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.
   ccf3caa..4894bec  master -> master   ccf3caa..4894bec  master -> master 

### Ejemplo de uso
![Comando archivo con solo archivo](https://i.imgur.com/h4JUvkZ.png)
![Resultado](https://i.imgur.com/YMgSriK.png)
![Comando con archivo validate](https://i.imgur.com/Lxm5rNy.png)
![Resultado](https://i.imgur.com/Urj775C.png)

## Versiones
* 1.0.0
Versión de prueba (sin funcionamiento)
* 1.0.1
Versión de prueba exportando mdLinks (sin funcionamiento)
* 1.0.2
Versión que ofrece instalación como dependencia
* 1.0.3
Versión con README 
* 1.0.4
Versión con dependencias instaladas para ser instaladas a nivel global, readme actualizado.
* 1.0.5
Versión con test para cada función.

## Desarrollado para
[Laboratoria](https://www.laboratoria.la/)
