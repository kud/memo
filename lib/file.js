var fs      = require('fs')
var Promise = require('bloody-promise')

module.exports = {

  file: undefined,

  // Set file
  set: function( file ) {
    this.file = file
  },

  // Save file
  save: function( data ) {
    var self = this
    var promise = Promise.create(function() {

      fs.writeFile( self.file, JSON.stringify( data, null, 2 ), function ( err ) {
        if ( err ) {
          promise.reject()
          throw err
        }
        else {
          promise.resolve()
        }
      })

    })

    return promise
  },

  // Read file
  read: function() {
    var self = this
    var promise = Promise.create(function() {

      fs.readFile( self.file, 'utf8', function ( err, data ) {
        if ( err ) {
          promise.reject()
          console.log('An error happened. You probably should start `npm install` once again.')
          throw err
        }
        else {
          promise.resolve( JSON.parse( data ) )
        }
      })

    })

    return promise
  }
}
