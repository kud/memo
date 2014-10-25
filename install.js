require('es6-promise').polyfill()

var denodeify = require('denodeify')
var readFile = denodeify( require('fs').readFile )
var writeFile = denodeify( require('fs').writeFile )

var file = process.env.HOME + "/.memo"

var readSuccess = function() {
  console.log('.memo already exists.')
}

var readError = function() {
  writeFile( file, "{}")
   .then( writeSuccess )
}

var writeSuccess = function( err ) {
  if( err ) {
    console.log('Error: ' + err)
  }
  else {
    console.log(".memo created!")
  }
}

readFile( file, { encoding: 'UTF-8' } )
  .then(
    readSuccess,
    readError
  )
