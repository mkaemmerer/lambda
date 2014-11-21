///////////////////////////////////////////////////////////////////////////////
// UTILITY
///////////////////////////////////////////////////////////////////////////////
function η(f){
  return function(x){ return f(x); };
}
function annotate(τ, f){
  var def = η(f);
  def.τ   = τ;
  return def;
}
function id(x){ return x; }

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

//Any type
τ.any.toString             = annotate(τ.string, function() { return function(x){ return x.toString(); };          });
τ.any.toLocaleString       = annotate(τ.string, function() { return function(x){ return x.toLocaleString(); };    });
//operators
τ.any.equalTo              = annotate(τ.bool,   function(y) { return function(x){ return x === y; };              });
τ.any.notEqualTo           = annotate(τ.bool,   function(y) { return function(x){ return x !== y; };              });

//Array
τ.array = function(τ1){
  var array     = {};
  
  array.$length = annotate(τ.number, function(){ return function(a){ return a.length; }; });
  array.map     = function(τ2){
    return λ(τ.array(τ2))(function(f){ return function(a){ return a.map(f); }; });
  };
  array.reduce  = function(τ2){
    return λ(τ2)(function(f, z){ return function(a){ return a.reduce(f,z); };  });
  };

  return array;
};

//Arrow (function)
τ.arrow = function(τ1){
  var arrow = {};
  return arrow;
};

//Boolean
τ.bool.toString            = τ.any.toString;
τ.bool.toLocaleString      = τ.any.toLocaleString;
//operators
τ.bool.not                 = annotate(τ.bool,   function() { return function(x){ return !x;   }; });
τ.bool.or                  = annotate(τ.bool,   function(x){ return function(y){ return x||y; }; });
τ.bool.and                 = annotate(τ.bool,   function(x){ return function(y){ return x&&y; }; });

//Number
τ.number.toExponential     = annotate(τ.number, function(d){ return function(x){ return x.toExponential(d); };    });
τ.number.toFixed           = annotate(τ.number, function(d){ return function(x){ return x.toFixed(d); };          });
τ.number.toPrecision       = annotate(τ.number, function(d){ return function(x){ return x.toPrecision(d); };      });
τ.number.toLocaleString    = τ.any.toLocaleString;
τ.number.toString          = τ.any.toString;
//operators
τ.number.plus              = annotate(τ.number, function(y){ return function(x){ return x+y; };                   });
τ.number.times             = annotate(τ.number, function(y){ return function(x){ return x*y; };                   });
τ.number.minus             = annotate(τ.number, function(y){ return function(x){ return x-y; };                   });
τ.number.div               = annotate(τ.number, function(y){ return function(x){ return x/y; };                   });
τ.number.mod               = annotate(τ.number, function(y){ return function(x){ return x%y; };                   });
τ.number.lessThan          = annotate(τ.bool,   function(y){ return function(x){ return x < y; };                 });
τ.number.greaterThan       = annotate(τ.bool,   function(y){ return function(x){ return x > y; };                 });
τ.number.greaterThanOrEqualTo = annotate(τ.bool, function(y){ return function(x){ return x >= y; };               });
τ.number.lessThanOrEqualTo    = annotate(τ.bool, function(y){ return function(x){ return x <= y; };               });
τ.number.equalTo           = τ.any.equalTo;
τ.number.notEqualTo        = τ.any.notEqualTo;

//String
τ.string.charAt            = annotate(τ.string, function(n){ return function(s){ return s.charAt(n); };           });
τ.string.charCodeAt        = annotate(τ.number, function(n){ return function(s){ return s.charCodeAt(n); };       });
τ.string.concat            = annotate(τ.string, function(x){ return function(s){ return s.concat(x); };           });
τ.string.indexOf           = annotate(τ.number, function(c){ return function(s){ return s.indexOf(c); };          });
τ.string.lastIndexOf       = annotate(τ.number, function(c){ return function(s){ return s.lastIndexOf(c); };      });
τ.string.$length           = annotate(τ.number, function(){ return function(s){ return s.length; };               });
τ.string.localeCompare     = annotate(τ.number, function(x){ return function(s){ return s.localeCompare(x); };    });
τ.string.match             = annotate(τ.array(τ.string),
      function(re){ return function(s){ return s.match(re); };                      });
τ.string.replace           = annotate(τ.string, function(re, f){ return function(s){ return s.replace(re, f); };  });
τ.string.search            = annotate(τ.number, function(re){ return function(s){ return s.search(re); };         });
τ.string.slice             = annotate(τ.string,
      function(start, end){ return function(s){ return s.slice(start, end); };      });
τ.string.split             = annotate(τ.array,
      function(sep){ return function(s){ return s.split(sep); };                    });
τ.string.substr            = annotate(τ.string,
      function(start, len){ return function(s){ return s.substr(start, len); };     });
τ.string.substring         = annotate(τ.string,
      function(start, end){ return function(s){ return s.substring(start, end); };  });
τ.string.toLocaleLowerCase = annotate(τ.string, function(){ return function(s){ return s.toLocaleLowerCase(); };  });
τ.string.toLocaleUpperCase = annotate(τ.string, function(){ return function(s){ return s.toLocaleUpperCase(); };  });
τ.string.toLowerCase       = annotate(τ.string, function(){ return function(s){ return s.toLowerCase(); };        });
τ.string.toString          = annotate(τ.string, function(){ return function(s){ return s.toString(); };           });
τ.string.toUpperCase       = annotate(τ.string, function(){ return function(s){ return s.toUpperCase(); };        });
τ.string.trim              = annotate(τ.string, function(){ return function(s){ return s.trim(); };               });
τ.string.toString          = τ.any.toString;
τ.string.toLocaleString    = τ.any.toLocaleString;
τ.string.equalTo           = τ.any.equalTo;
τ.string.notEqualTo        = τ.any.notEqualTo;

///////////////////////////////////////////////////////////////////////////////
// TEST CASES
///////////////////////////////////////////////////////////////////////////////

var f = λ(τ.number).plus(2).times(3);
var g = λ(τ.number)(function(x){ return 2; }).plus(2).times(3);

console.log(f(1));
console.log(g(10));