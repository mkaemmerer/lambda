var prim = require('./prim');

///////////////////////////////////////////////////////////////////////////////
// UTILITY
///////////////////////////////////////////////////////////////////////////////
function id(x){
  return x;
}
function κ(x){
  return function(){ return x; };
}
function η(f){
  return function(x){ return f(x); };
}
function flip(f){
  return function(x){
    return function(y){
      return f(y)(x);
    };
  };
}
function curry(f){
  return function(x){
    return function(y){
      return f(y,x);
    };
  };
}
function pipe(f){
  return function(k){
    return annotate(f.τ, function(x){
      return f(k(x));
    });
  };
}
function annotate(τ, f){
  f.τ = τ;
  return f;
}
//TODO: figure out how to decompose this with combinators
function withType(τ, f){
  return function(k){
    return annotate(κ(τ), function(y){
      return annotate(τ, function(x){
        return f(k(x), y);
      });
    });
  };
}

///////////////////////////////////////////////////////////////////////////////
// MAGIC
///////////////////////////////////////////////////////////////////////////////
function λ(τ){
  var fix  = function(f){ return _λ(τ, f); };
  var base = _λ(τ, id);
  for(var name in base){
    fix[name] = base[name];
  }
  return fix;
}
function _λ(τ, f){
  var def = η(f);
  for(var name in τ){
    def[name] = fix(τ[name](f));
  }
  return def;
}
function fix(f){
  return function(x){
    return _λ(f.τ(x), f(x));
  };
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
var andThen = function(k){
  return annotate(id, function(τ){
    return function(f){
      var ap = function(x){
        return f(k(x));
      };
      return λ(τ)(ap);
    };
  });
};

//methods
τ.any.andThen              = andThen;

τ.any.toString             = withType(τ.string, prim.any.toString             );
τ.any.toLocaleString       = withType(τ.string, prim.any.toLocaleString       );
//operators
τ.any.equalTo              = withType(τ.bool,   prim.any.equalTo              );
τ.any.notEqualTo           = withType(τ.bool,   prim.any.notEqualTo           );
τ.any.lessThan             = withType(τ.bool,   prim.any.lessThan             );
τ.any.greaterThan          = withType(τ.bool,   prim.any.greaterThan          );
τ.any.greaterThanOrEqualTo = withType(τ.bool,   prim.any.greaterThanOrEqualTo );
τ.any.lessThanOrEqualTo    = withType(τ.bool,   prim.any.lessThanOrEqualTo    );


//-----------------------------------------------------------------------------
// Array
//-----------------------------------------------------------------------------
//methods
τ.array.concat               = withType(τ.array,  prim.array.concat           );
τ.array.every                = withType(τ.bool,   prim.array.every            );
τ.array.filter               = withType(τ.array,  prim.array.filter           );
τ.array.forEach              = withType(τ.any,    prim.array.forEach          );
τ.array.indexOf              = withType(τ.number, prim.array.indexOf          );
τ.array.join                 = withType(τ.string, prim.array.join             );
τ.array.lastIndexOf          = withType(τ.number, prim.array.lastIndexOf      );
τ.array.$length              = withType(τ.number, prim.array.$length          );
τ.array.map                  = withType(τ.array,  prim.array.map              );
τ.array.pop                  = withType(τ.any,    prim.array.pop              );
τ.array.push                 = withType(τ.array,  prim.array.push             );
τ.array.reverse              = withType(τ.array,  prim.array.reverse          );
τ.array.shift                = withType(τ.any,    prim.array.shift            );
τ.array.slice                = withType(τ.array,  prim.array.slice            );
τ.array.some                 = withType(τ.bool,   prim.array.some             );
τ.array.sort                 = withType(τ.array,  prim.array.sort             );
τ.array.splice               = withType(τ.array,  prim.array.splice           );
τ.array.unshift              = withType(τ.array,  prim.array.unshift          );
τ.array.andThen              = τ.any.andThen;
τ.array.toLocaleString       = τ.any.toLocaleString;
τ.array.toString             = τ.any.toString;
//polymorphic
τ.array.reduce               = function(k){
  return annotate(id, function(τ){
    return function(f){
      return function(z){
        var reduce = function(x){
          return prim.array.reduce(k(x), f, z);
        };
        return λ(τ)(reduce);
      };
    };
  });
};
τ.array.reduceRight          = function(k){
  return annotate(id, function(τ){
    return function(f){
      return function(z){
        var reduceRight = function(x){
          return prim.array.reduceRight(k(x), f, z);
        };
        return λ(τ)(reduceRight);
      };
    };
  });
};
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
τ.bool.not                  = withType(τ.bool, prim.bool.not );
τ.bool.or                   = withType(τ.bool, prim.bool.or  );
τ.bool.and                  = withType(τ.bool, prim.bool.and );
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
τ.number.toExponential        = withType(τ.number, prim.number.toExponential  );
τ.number.toFixed              = withType(τ.number, prim.number.toFixed        );
τ.number.toPrecision          = withType(τ.number, prim.number.toPrecision    );
τ.number.toLocaleString       = τ.any.toLocaleString;
τ.number.toString             = τ.any.toString;
//operators
τ.number.plus                 = withType(τ.number, prim.number.plus  );
τ.number.minus                = withType(τ.number, prim.number.minus );
τ.number.times                = withType(τ.number, prim.number.times );
τ.number.div                  = withType(τ.number, prim.number.div   );
τ.number.mod                  = withType(τ.number, prim.number.mod   );
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
τ.string.charAt               = withType(τ.string,  prim.string.charAt            );
τ.string.charCodeAt           = withType(τ.number,  prim.string.charCodeAt        );
τ.string.concat               = withType(τ.string,  prim.string.concat            );
τ.string.indexOf              = withType(τ.number,  prim.string.indexOf           );
τ.string.lastIndexOf          = withType(τ.number,  prim.string.lastIndexOf       );
τ.string.$length              = withType(τ.number,  prim.string.$length           );
τ.string.localeCompare        = withType(τ.number,  prim.string.localeCompare     );
τ.string.match                = withType(τ.array,   prim.string.match             );
τ.string.replace              = withType(τ.string,  prim.string.replace           );
τ.string.search               = withType(τ.number,  prim.string.search            );
τ.string.slice                = withType(τ.string,  prim.string.slice             );
τ.string.split                = withType(τ.array,   prim.string.split             );
τ.string.substr               = withType(τ.string,  prim.string.substr            );
τ.string.substring            = withType(τ.string,  prim.string.substring         );
τ.string.toLocaleLowerCase    = withType(τ.string,  prim.string.toLocaleLowerCase );
τ.string.toLocaleUpperCase    = withType(τ.string,  prim.string.toLocaleUpperCase );
τ.string.toLowerCase          = withType(τ.string,  prim.string.toLowerCase       );
τ.string.toUpperCase          = withType(τ.string,  prim.string.toUpperCase       );
τ.string.trim                 = withType(τ.string,  prim.string.trim              );
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