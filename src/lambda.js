var prim = require('./prim');

///////////////////////////////////////////////////////////////////////////////
// UTILITY
///////////////////////////////////////////////////////////////////////////////
function id(x){
  return x;
}
function κ(x){
  return function(){
    return x;
  };
}
function η(f){
  var ex = function(x){ return f(x); };
  ex.f_name = 'eta: ' + f.f_name;
  return ex;
}
function after(f){
  return function(k){
    var continuation = function(x){
      return f(k(x));
    };
    continuation.τ = f.τ;
    return continuation;
  };
}
function flipCurry(f){
  return function(x){
    return function(y){
      return f(y,x);
    };
  };
}
function annotate(τ, f){
  f.τ = τ;
  return f;
}
function withType(τ, f){
  var def = annotate(τ, flipCurry(f));
  return after(def);
}

///////////////////////////////////////////////////////////////////////////////
// MAGIC
///////////////////////////////////////////////////////////////////////////////
function λ(τ){
  var fix = function(f){ return _λ(τ, f, f); };
  return _λ(τ, id, fix);
}
function _λ(τ, k, f){
  var fix = function(g){
    return function(x){
      var g2 = g(x);
      return _λ(g.τ(x), g2, g2);
    };
  };

  var delegate = η(f);
  for(var name in τ){
    delegate[name] = fix(τ[name](k));
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
var andThen = function(τ){
  var continuation = function(k){
    return function(f){
      return function(x){
        console.log(x);
        console.log(k instanceof Function);
        console.log(f instanceof Function);
        return f(k(x));
      };
    };
  };
  continuation.τ = κ(τ);
  return continuation;
};
//methods
τ.any.andThen              = andThen;

τ.any.toString             = withType(κ(τ.string), prim.any.toString             );
τ.any.toLocaleString       = withType(κ(τ.string), prim.any.toLocaleString       );
//operators
τ.any.equalTo              = withType(κ(τ.bool),   prim.any.equalTo              );
τ.any.notEqualTo           = withType(κ(τ.bool),   prim.any.notEqualTo           );
τ.any.lessThan             = withType(κ(τ.bool),   prim.any.lessThan             );
τ.any.greaterThan          = withType(κ(τ.bool),   prim.any.greaterThan          );
τ.any.greaterThanOrEqualTo = withType(κ(τ.bool),   prim.any.greaterThanOrEqualTo );
τ.any.lessThanOrEqualTo    = withType(κ(τ.bool),   prim.any.lessThanOrEqualTo    );


//-----------------------------------------------------------------------------
// Array
//-----------------------------------------------------------------------------
//methods
τ.array.concat               = withType(κ(τ.array),  prim.array.concat           );
τ.array.every                = withType(κ(τ.bool),   prim.array.every            );
τ.array.filter               = withType(κ(τ.array),  prim.array.filter           );
τ.array.forEach              = withType(κ(τ.any),    prim.array.forEach          );
τ.array.indexOf              = withType(κ(τ.number), prim.array.indexOf          );
τ.array.join                 = withType(κ(τ.string), prim.array.join             );
τ.array.lastIndexOf          = withType(κ(τ.number), prim.array.lastIndexOf      );
τ.array.$length              = withType(κ(τ.number), prim.array.$length          );
τ.array.map                  = withType(κ(τ.array),  prim.array.map              );
τ.array.pop                  = withType(κ(τ.any),    prim.array.pop              );
τ.array.push                 = withType(κ(τ.array),  prim.array.push             );
τ.array.reduce               = withType(κ(τ.any),    prim.array.reduce           );
τ.array.reduceRight          = withType(κ(τ.any),    prim.array.reduceRight      );
τ.array.reverse              = withType(κ(τ.array),  prim.array.reverse          );
τ.array.shift                = withType(κ(τ.any),    prim.array.shift            );
τ.array.slice                = withType(κ(τ.array),  prim.array.slice            );
τ.array.some                 = withType(κ(τ.bool),   prim.array.some             );
τ.array.sort                 = withType(κ(τ.array),  prim.array.sort             );
τ.array.splice               = withType(κ(τ.array),  prim.array.splice           );
τ.array.unshift              = withType(κ(τ.array),  prim.array.unshift          );
τ.array.andThen              = τ.any.andThen;
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
τ.bool.andThen              = τ.any.andThen;
τ.bool.toLocaleString       = τ.any.toLocaleString;
τ.bool.toString             = τ.any.toString;
//operators
τ.bool.not                  = withType(κ(τ.bool), prim.bool.not );
τ.bool.or                   = withType(κ(τ.bool), prim.bool.or  );
τ.bool.and                  = withType(κ(τ.bool), prim.bool.and );
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
τ.number.andThen              = τ.any.andThen;
τ.number.toExponential        = withType(κ(τ.number), prim.number.toExponential  );
τ.number.toFixed              = withType(κ(τ.number), prim.number.toFixed        );
τ.number.toPrecision          = withType(κ(τ.number), prim.number.toPrecision    );
τ.number.toLocaleString       = τ.any.toLocaleString;
τ.number.toString             = τ.any.toString;
//operators
τ.number.plus                 = withType(κ(τ.number), prim.number.plus  );
τ.number.minus                = withType(κ(τ.number), prim.number.minus );
τ.number.times                = withType(κ(τ.number), prim.number.times );
τ.number.div                  = withType(κ(τ.number), prim.number.div   );
τ.number.mod                  = withType(κ(τ.number), prim.number.mod   );
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
τ.string.andThen              = τ.any.andThen;
τ.string.charAt               = withType(κ(τ.string),  prim.string.charAt            );
τ.string.charCodeAt           = withType(κ(τ.number),  prim.string.charCodeAt        );
τ.string.concat               = withType(κ(τ.string),  prim.string.concat            );
τ.string.indexOf              = withType(κ(τ.number),  prim.string.indexOf           );
τ.string.lastIndexOf          = withType(κ(τ.number),  prim.string.lastIndexOf       );
τ.string.$length              = withType(κ(τ.number),  prim.string.$length           );
τ.string.localeCompare        = withType(κ(τ.number),  prim.string.localeCompare     );
τ.string.match                = withType(κ(τ.array),   prim.string.match             );
τ.string.replace              = withType(κ(τ.string),  prim.string.replace           );
τ.string.search               = withType(κ(τ.number),  prim.string.search            );
τ.string.slice                = withType(κ(τ.string),  prim.string.slice             );
τ.string.split                = withType(κ(τ.array),   prim.string.split             );
τ.string.substr               = withType(κ(τ.string),  prim.string.substr            );
τ.string.substring            = withType(κ(τ.string),  prim.string.substring         );
τ.string.toLocaleLowerCase    = withType(κ(τ.string),  prim.string.toLocaleLowerCase );
τ.string.toLocaleUpperCase    = withType(κ(τ.string),  prim.string.toLocaleUpperCase );
τ.string.toLowerCase          = withType(κ(τ.string),  prim.string.toLowerCase       );
τ.string.toUpperCase          = withType(κ(τ.string),  prim.string.toUpperCase       );
τ.string.trim                 = withType(κ(τ.string),  prim.string.trim              );
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
// EXPORTS
///////////////////////////////////////////////////////////////////////////////
if (typeof module != 'undefined'){
  module.exports = {
    λ: λ,
    τ: τ
  };
}