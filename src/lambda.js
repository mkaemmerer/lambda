var prim = require('./prim');

///////////////////////////////////////////////////////////////////////////////
// UTILITY
///////////////////////////////////////////////////////////////////////////////
function id(x){
  return x;
}
function η(f){
  return function(x){ return f(x); };
}
function annotate(τ, f){
  var def = flipCurry(f);
  def.τ = τ;
  return def;
}
function flipCurry(f){
  return function(x){
    return function(y){
      return f(y,x);
    };
  };
}

///////////////////////////////////////////////////////////////////////////////
// MAGIC
///////////////////////////////////////////////////////////////////////////////
function λ(τ){
  var fix = function(f){ return _λ(τ, f, f); };

  return _λ(τ, id, fix);
}
function _λ(τ, k, f){
  var compose = function(f, g){
    return function(x){
      var composite = function(y){
        return g(x)(f(y));
      };
      return _λ(g.τ, composite, composite);
    };
  };

  var delegate = η(f);
  for(var name in τ){
    delegate[name] = compose(k, τ[name]);
  }
  return delegate;
}

var τ = {
  any:    {},
  array:  {},
  arrow:  {},
  bool:   {},
  number: {},
  string: {}
};

///////////////////////////////////////////////////////////////////////////////
// FUNCTION DEFINITIONS
///////////////////////////////////////////////////////////////////////////////

//-----------------------------------------------------------------------------
// Any Type
//-----------------------------------------------------------------------------
//methods
τ.any.toString             = annotate(τ.string, prim.any.toString             );
τ.any.toLocaleString       = annotate(τ.string, prim.any.toLocaleString       );
//operators
τ.any.equalTo              = annotate(τ.bool,   prim.any.equalTo              );
τ.any.notEqualTo           = annotate(τ.bool,   prim.any.notEqualTo           );
τ.any.lessThan             = annotate(τ.bool,   prim.any.lessThan             );
τ.any.greaterThan          = annotate(τ.bool,   prim.any.greaterThan          );
τ.any.greaterThanOrEqualTo = annotate(τ.bool,   prim.any.greaterThanOrEqualTo );
τ.any.lessThanOrEqualTo    = annotate(τ.bool,   prim.any.lessThanOrEqualTo    );


//-----------------------------------------------------------------------------
// Array
//-----------------------------------------------------------------------------
//methods
τ.array.concat               = annotate(τ.array,  prim.array.concat           );
τ.array.every                = annotate(τ.bool,   prim.array.every            );
τ.array.filter               = annotate(τ.array,  prim.array.filter           );
τ.array.forEach              = annotate(τ.any,    prim.array.forEach          );
τ.array.indexOf              = annotate(τ.number, prim.array.indexOf          );
τ.array.join                 = annotate(τ.string, prim.array.join             );
τ.array.lastIndexOf          = annotate(τ.number, prim.array.lastIndexOf      );
τ.array.$length              = annotate(τ.number, prim.array.$length          );
τ.array.map                  = annotate(τ.array,  prim.array.map              );
τ.array.pop                  = annotate(τ.any,    prim.array.pop              );
τ.array.push                 = annotate(τ.array,  prim.array.push             );
τ.array.reduce               = annotate(τ.any,    prim.array.reduce           );
τ.array.reduceRight          = annotate(τ.any,    prim.array.reduceRight      );
τ.array.reverse              = annotate(τ.array,  prim.array.reverse          );
τ.array.shift                = annotate(τ.any,    prim.array.shift            );
τ.array.slice                = annotate(τ.array,  prim.array.slice            );
τ.array.some                 = annotate(τ.bool,   prim.array.some             );
τ.array.sort                 = annotate(τ.array,  prim.array.sort             );
τ.array.splice               = annotate(τ.array,  prim.array.splice           );
τ.array.unshift              = annotate(τ.array,  prim.array.unshift          );
τ.array.toLocaleString       = τ.any.toLocaleString;
τ.array.toString             = τ.any.toString;
//operators
τ.array.equalTo              = τ.any.equalTo;
τ.array.notEqualTo           = τ.any.notEqualTo;
τ.array.lessThan             = τ.any.lessThan;
τ.array.greaterThan          = τ.any.greaterThan;
τ.array.greaterThanOrEqualTo = τ.any.greaterThanOrEqualTo;
τ.array.lessThanOrEqualTo    = τ.any.lessThanOrEqualTo;


//-----------------------------------------------------------------------------
// Boolean
//-----------------------------------------------------------------------------
//methods
τ.bool.toLocaleString       = τ.any.toLocaleString;
τ.bool.toString             = τ.any.toString;
//operators
τ.bool.not                  = annotate(τ.bool, prim.bool.not );
τ.bool.or                   = annotate(τ.bool, prim.bool.or  );
τ.bool.and                  = annotate(τ.bool, prim.bool.and );
τ.bool.equalTo              = τ.any.equalTo;
τ.bool.notEqualTo           = τ.any.notEqualTo;
τ.bool.lessThan             = τ.any.lessThan;
τ.bool.greaterThan          = τ.any.greaterThan;
τ.bool.greaterThanOrEqualTo = τ.any.greaterThanOrEqualTo;
τ.bool.lessThanOrEqualTo    = τ.any.lessThanOrEqualTo;


//-----------------------------------------------------------------------------
// Number
//-----------------------------------------------------------------------------
//methods
τ.number.toExponential        = annotate(τ.number, prim.number.toExponential  );
τ.number.toFixed              = annotate(τ.number, prim.number.toFixed        );
τ.number.toPrecision          = annotate(τ.number, prim.number.toPrecision    );
τ.number.toLocaleString       = τ.any.toLocaleString;
τ.number.toString             = τ.any.toString;
//operators
τ.number.plus                 = annotate(τ.number, prim.number.plus  );
τ.number.minus                = annotate(τ.number, prim.number.minus );
τ.number.times                = annotate(τ.number, prim.number.times );
τ.number.div                  = annotate(τ.number, prim.number.div   );
τ.number.mod                  = annotate(τ.number, prim.number.mod   );
τ.number.equalTo              = τ.any.equalTo;
τ.number.notEqualTo           = τ.any.notEqualTo;
τ.number.lessThan             = τ.any.lessThan;
τ.number.greaterThan          = τ.any.greaterThan;
τ.number.greaterThanOrEqualTo = τ.any.greaterThanOrEqualTo;
τ.number.lessThanOrEqualTo    = τ.any.lessThanOrEqualTo;


//-----------------------------------------------------------------------------
// String
//-----------------------------------------------------------------------------
//methods
τ.string.charAt               = annotate(τ.string,  prim.string.charAt            );
τ.string.charCodeAt           = annotate(τ.number,  prim.string.charCodeAt        );
τ.string.concat               = annotate(τ.string,  prim.string.concat            );
τ.string.indexOf              = annotate(τ.number,  prim.string.indexOf           );
τ.string.lastIndexOf          = annotate(τ.number,  prim.string.lastIndexOf       );
τ.string.$length              = annotate(τ.number,  prim.string.$length           );
τ.string.localeCompare        = annotate(τ.number,  prim.string.localeCompare     );
τ.string.match                = annotate(τ.array,   prim.string.match             );
τ.string.replace              = annotate(τ.string,  prim.string.replace           );
τ.string.search               = annotate(τ.number,  prim.string.search            );
τ.string.slice                = annotate(τ.string,  prim.string.slice             );
τ.string.split                = annotate(τ.array,   prim.string.split             );
τ.string.substr               = annotate(τ.string,  prim.string.substr            );
τ.string.substring            = annotate(τ.string,  prim.string.substring         );
τ.string.toLocaleLowerCase    = annotate(τ.string,  prim.string.toLocaleLowerCase );
τ.string.toLocaleUpperCase    = annotate(τ.string,  prim.string.toLocaleUpperCase );
τ.string.toLowerCase          = annotate(τ.string,  prim.string.toLowerCase       );
τ.string.toUpperCase          = annotate(τ.string,  prim.string.toUpperCase       );
τ.string.trim                 = annotate(τ.string,  prim.string.trim              );
τ.string.toLocaleString       = τ.any.toLocaleString;
τ.string.toString             = τ.any.toString;
//operators
τ.string.equalTo              = τ.any.equalTo;
τ.string.notEqualTo           = τ.any.notEqualTo;
τ.string.lessThan             = τ.any.lessThan;
τ.string.greaterThan          = τ.any.greaterThan;
τ.string.greaterThanOrEqualTo = τ.any.greaterThanOrEqualTo;
τ.string.lessThanOrEqualTo    = τ.any.lessThanOrEqualTo;


///////////////////////////////////////////////////////////////////////////////
// TEST CASES
///////////////////////////////////////////////////////////////////////////////

var f = λ(τ.number)
  .plus(2)
  .times(3);
var g = λ(τ.number)
  (function(x){ return 2; })
  .plus(2)
  .times(3);

console.log(f(1));
console.log(g(10));


///////////////////////////////////////////////////////////////////////////////
// EXPORTS
///////////////////////////////////////////////////////////////////////////////
if (typeof module != 'undefined'){
  module.exports = {
    λ: λ,
    τ: τ
  };
}