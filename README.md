# EffectiveMobile

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Some additional infromation

1. The specification requires page with a TABLE of posts, but i thought that it will be better if i used "mat-card" for a posts view. BUT!  
I also implemented table posts view, and 2 buttons for switch between two variants of views. 
2. The specification requires using @input @output decorators, but i didn't quite understand where i should be use this decorators, so i implemented 2 variants of navigations to selected post:  
a) Using angular routing and http request to the server
b) Using angular routing and query params  without http request (this option  currenctly commented it is not "dead code")

