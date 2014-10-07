/**
 * 88888b.d88b.  .d88b. 88888b.d88b.  .d88b.
 * 888 "888 "88bd8P  Y8b888 "888 "88bd88""88b
 * 888  888  88888888888888  888  888888  888
 * 888  888  888Y8b.    888  888  888Y88..88P
 * 888  888  888 "Y8888 888  888  888 "Y88P"
 */

// import
var prettyjson = require('prettyjson')
var fs         = require('fs')
var promise    = require('bloody-promise')

// define
var file = process.env.HOME + "/.memo"
var data = {}
var displayOptions = {
  keysColor: 'blue',
  stringColor: 'white'
}

// functions
function writeFile() {
  var _promise = promise.create(function() {

    fs.writeFile( file, JSON.stringify( data, null, 2 ), function ( err ) {
      if ( err ) {
        _promise.reject()
        throw err
      }
      else {
        console.log('Saved!')
        _promise.resolve()
      }
    })

  })

  return _promise
}

function readFile() {
  var _promise = promise.create(function() {

    fs.readFile( file, 'utf8', function ( err, _data ) {
      if ( err ) {
        _promise.reject()
        throw err
      }
      else {
        _promise.resolve(JSON.parse( _data ))
      }
    })

  })

  return _promise
}

function render( _data ) {
  console.log( prettyjson.render( _data, displayOptions ) )
}

// script
readFile()
  .then(function( _data ) {
    data = _data
  })
  .then(function() {
    if ( process.argv.length == 2 ) {
      render(data)
    }

    else {

      if ( process.argv[2] === 'remove' || process.argv[2] === 'delete' ) {
        delete data[ process.argv[3] ]
        writeFile()
      }

      else {
        data[ process.argv[2] ] = process.argv[3]
        writeFile()
      }

    }
  })




