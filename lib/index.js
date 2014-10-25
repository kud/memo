/**
 * 88888b.d88b.  .d88b. 88888b.d88b.  .d88b.
 * 888 '888 '88bd8P  Y8b888 '888 '88bd88''88b
 * 888  888  88888888888888  888  888888  888
 * 888  888  888Y8b.    888  888  888Y88..88P
 * 888  888  888 'Y8888 888  888  888 'Y88P'
 */

// import
var prettyjson = require('prettyjson')
var ObjectPath = require('object-path')
var Clipboard  = require('copy-paste')
var File       = require('./file')
var model      = require('./model')

var argv = require('yargs')
            .boolean('d')
            .argv

// define
var displayOptions = {
  keysColor: 'blue',
  stringColor: 'white'
}

var isDeleting = argv.d

File.set( process.env.HOME + '/.memo' )

var getResult = function() {
  var _argv = argv._.join('.')
  return ObjectPath.get( model, _argv )
}

var setResult = function() {
  var _argv = argv._
  var content = _argv.pop()

  ObjectPath.set( model, _argv.join('.'), content )

  return content
}

var action = function() {
  var result = getResult()
  var typeOfResult = typeof result

  if ( isDeleting ) {
    ObjectPath.del( model, argv._.join('.') )
    File.save( model )
  }

  else {

    if ( typeOfResult === 'undefined' ) {
      console.log(setResult() + ' has been saved!')
      File.save( model )
    }
    else if ( typeOfResult === 'object' ) {
      if ( Object.keys( model ).length < 1 ) {
        console.log('No memo for the moment.')
      }
      else {
        render( result )
      }
    }
    else if ( typeOfResult === 'string' ) {
      Clipboard.copy( result )
      console.log(result + ' is clipboarded!')
    }

  }

}

// render
var render = function( data ) {
  console.log( prettyjson.render( data, displayOptions ) )
}

// script
File.read()
  .then(function( data ) {
    model = data
  })
  .then(action)




