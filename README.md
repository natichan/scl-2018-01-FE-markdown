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

Instalar como dependencia:
`npm i md-links-verification`

[NPM public library](https://www.npmjs.com/package/md-links-verification)

## USO
### CLI (Línea de comando)

El ejecutable de nuestra aplicación se ejecuta de la siguiente manera:

Linea que deberías ejecutar en tu terminal o consola:
`md-links <file> [options]`

Debes ingresar el archivo directo 
Por ejemplo:

```sh
$ md-links example.md
./some/example.md:10 http://algo.com/2/3/ Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html algún doc
./some/example.md:40 http://google.com/ Google
```
Identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprime los links que vaya
encontrando, junto con la ruta del archivo y la linea donde aparece, así como
también el texto que hay dentro del link.

`md-links <file> --validate`

```sh
$ md-links example.md --validate
./some/example.md:10 http://algo.com/2/3/ ok 200 Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md:40 http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

#### Versiones
1.0.0
Versión de prueba (sin funcionamiento)
1.0.1
Versión de prueba exportando mdLinks (sin funcionamiento)
1.0.2
Versión que ofrece instalación como dependencia
1.0.3
Versión con README actualizado

### Ejemplo de uso
![Comando archivo con solo archivo](https://i.imgur.com/h4JUvkZ.png)
![Resultado](https://i.imgur.com/YMgSriK.png)
![Comando con archivo validate](https://i.imgur.com/Lxm5rNy.png)
![Resultado](https://i.imgur.com/Urj775C.png)
