//Utility
function η(f){
  return function(x){ return f(x); };
}
function annotate(τ, f){
  var def = η(f);
  def.τ   = τ;
  return def;
}


//Magic
function λ(τ){
  var id  = function(x){ return x; };
  var fix = function(f){ return _λ(τ)(f)(f); };

  return _λ(τ)(id)(fix);
}
function _λ(τ){
  var extend = function(base, f, τ1){
    var delegate = η(f);

    for(var name in τ1){
      delegate[name] = compose(base, τ1[name]);
    }
    return delegate;
  };
  var compose = function(f, g){
    return function(x){
      var composite = function(y){
        return g(x)(f(y));
      };
      return _λ(g.τ)(composite)(composite);
    };
  };

  return function(k){
    return function(f){
      return extend(k, f, τ);
    };
  };
}

var τ = {
  any:    {},
  bool:   {},
  number: {},
  string: {},
  char:   {}
};


//Function definitions
τ.any.toString             = annotate(τ.string, function() { return function(x){ return x.toString(); }; });

τ.bool.not                 = annotate(τ.bool,   function() { return function(x){ return !x;   };         });
τ.bool.or                  = annotate(τ.bool,   function(x){ return function(y){ return x||y; };         });
τ.bool.and                 = annotate(τ.bool,   function(x){ return function(y){ return x&&y; };         });
τ.bool.toString            = τ.any.toString;

τ.number.plus              = annotate(τ.number, function(y){ return function(x){ return x+y; }; });
τ.number.times             = annotate(τ.number, function(y){ return function(x){ return x*y; }; });
τ.number.minus             = annotate(τ.number, function(y){ return function(x){ return x-y; }; });
τ.number.div               = annotate(τ.number, function(y){ return function(x){ return x/y; }; });
τ.number.mod               = annotate(τ.number, function(y){ return function(x){ return x%y; }; });
τ.number.toString          = τ.any.toString;

τ.string.charAt            = annotate(τ.char,   function(n){ return function(s){ return s.charAt(n); };      });
τ.string.charCodeAt        = annotate(τ.number, function(n){ return function(s){ return s.charCodeAt(n); };  });
τ.string.concat            = annotate(τ.string, function(x){ return function(s){ return s.concat(x); };      });
τ.string.indexOf           = annotate(τ.number, function(c){ return function(s){ return s.indexOf(c); };     });
τ.string.lastIndexOf       = annotate(τ.number, function(c){ return function(s){ return s.lastIndexOf(c); }; });
// τ.string.localeCompare     = annotate(τ.string, function(){});
// τ.string.match             = annotate(τ.string, function(){});
// τ.string.replace           = annotate(τ.string, function(){});
// τ.string.search            = annotate(τ.string, function(){});
// τ.string.slice             = annotate(τ.string, function(){});
// τ.string.split             = annotate(τ.string, function(){});
// τ.string.substr            = annotate(τ.string, function(){});
// τ.string.substring         = annotate(τ.string, function(){});
// τ.string.toLocaleLowerCase = annotate(τ.string, function(){});
// τ.string.toLocaleUpperCase = annotate(τ.string, function(){});
τ.string.toLowerCase       = annotate(τ.string, function(){  return function(s){ return s.toLowerCase(); }; });
τ.string.toString          = annotate(τ.string, function(){  return function(s){ return s.toString(); };    });
τ.string.toUpperCase       = annotate(τ.string, function(){  return function(s){ return s.toUpperCase(); }; });
τ.string.trim              = annotate(τ.string, function(){  return function(s){ return s.trim(); };        });
// τ.string.valueOf           = annotate(τ.string, function(){});


//TEST CASES
var f = λ(τ.number).plus(2).times(3);
var g = λ(τ.number)(function(x){ return 2; }).plus(2).times(3);


console.log(f(1));
console.log(g(10));