'use strict';

var ArgumentException = require( 'utils/lib/ArgumentException' );
var LogicalError      = require( 'utils/lib/LogicalError' );
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @method extend
 * @param  {function} __super__
 * @param  {object}   __proto__
 * @param  {function} __proto__.constructor
 * @return {function}
 * @example
 * var extend = require( 'extend' );
 *
 * function Animal ( name ) {
 *   this.name = name;
 * }
 *
 * Animal.prototype.eat = function eat ( food ) {
 *   console.log( this.name, 'eats', food );
 * };
 *
 * var Cat = extend( Animal, {
 *   constructor: function Cat ( name ) {
 *     this.__super__.call( this, name );
 *   },
 *
 *   eat: function eat ( food ) {
 *     if ( food !== 'fish' ) {
 *       console.error( this.name, 'cannot eat', food );
 *     } else {
 *       this.__super__.prototype.eat.call( this, food );
 *     }
 *   }
 * } );
 *
 * var cat = new Cat( 'kitty' );
 * cat.eat( 'fish' ); // console.log:   'kitty eats fish'
 * cat.eat( 'dog' );  // console.error: 'kitty cannot eat dog'
 */
function extend ( __super__, __proto__ ) {
  var keys, i, l;

  if ( typeof __super__ !== 'function' ) {
    throw ArgumentException( 'extend(__super__: function, __proto__: object): function', '__super__', __super__ );
  }

  if ( ( typeof __proto__ !== 'object' || __proto__ === null ) && typeof __proto__ !== 'function' ) {
    throw ArgumentException( 'extend(__super__: function, __proto__: object): function', '__proto__', __proto__ );
  }

  if ( ! hasOwnProperty.call( __proto__, 'constructor' ) ) {
    throw LogicalError( 'extend(__super__: function, __proto__: object): function', 'cannot find `constructor` function in `__proto__`' );
  }

  if ( typeof __proto__.constructor !== 'function' ) {
    throw LogicalError( 'extend(__super__: function, __proto__: object): function', '`__proto__.constructor` is not a function' );
  }

  if ( typeof __super__.prototype !== 'object' ) {
    throw LogicalError( 'extend(__super__: function, __proto__: object): function', '`__super__.prototype` must be an object or null' );
  }

  __proto__.constructor.prototype = Object.create( __super__.prototype );
  __proto__.constructor.prototype.__super__ = __super__;

  for ( keys = Object.keys( __proto__ ), i = 0, l = keys.length; i < l; ++i ) {
    __proto__.constructor.prototype[ keys[ i ] ] = __proto__[ keys[ i ] ];
  }

  return __proto__.constructor;
}

module.exports = extend;
