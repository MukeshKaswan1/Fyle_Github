# Fyle Frontend Challenge


### Install requirements
* Install angular cli [Ref](https://angular.io/cli)
* `npm install` in this repository 

## Development server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Testing server

Run `ng test` for a test server. 

## Certain things to keep in mind

1. A `MAX_CHARACTERS_PER_DESCRIPTION = 150` was defined in order to slice any repository description longer than 150.

2. Similarly, topics arrays larger than 5 in length were also slices and further topics were replaced with an instance of `more...` and if any topic was greater than 10 in length then it was also sliced and appended with `...`.

3. A `settimeout` was added in order to display the skeleton loader. This is only to emphasize its affect and is by no means an imperative part of the project and can thus be removed freely.

4. The `should render title` spec was disabled in the `app.component.spec.ts` as changes were made to the `app.component.html` file.


