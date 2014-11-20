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
  return _λ(τ)(function(f){ return _λ(τ)(f); });
}
function _λ(τ){
  var extend = function(f, τ1){
    var delegate = η(f);
    delegate.τ   = f.τ;

    for(var name in τ1){
      delegate[name] = compose(delegate, τ1[name]);
    }
    return delegate;
  };
  var compose = function(f, g){
    return function(x){
      var composite = function(y){
        return g(x)(f(y));
      };
      return _λ(g.τ)(composite);
    };
  };

  return function(f){
    return extend(f, τ);
  };
}

var τ = {
  bool:   {},
  number: {},
  string: {}
};


//Function definitions
τ.bool.not                 = annotate(τ.bool,   function() { return function(x){ return !x;   };         });
τ.bool.or                  = annotate(τ.bool,   function(x){ return function(y){ return x||y; };         });
τ.bool.and                 = annotate(τ.bool,   function(x){ return function(y){ return x&&y; };         });
τ.bool.toString            = annotate(τ.string, function(){  return function(x){ return x.toString(); }; });

τ.number.plus              = annotate(τ.number, function(x){ return function(y){ return x+y; }; });
τ.number.times             = annotate(τ.number, function(x){ return function(y){ return x*y; }; });
τ.number.minus             = annotate(τ.number, function(x){ return function(y){ return x-y; }; });
τ.number.div               = annotate(τ.number, function(x){ return function(y){ return x/y; }; });
τ.number.mod               = annotate(τ.number, function(x){ return function(y){ return x%y; }; });

// τ.string.charAt            = annotate(τ.string, function(){});
// τ.string.charCodeAt        = annotate(τ.string, function(){});
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
var not1 = λ(τ.bool).not();
var not2 = λ(τ.bool)(function(x){ return !x; });
var id1  = λ(τ.bool).not().not();
var id2  = λ(τ.bool)(function(x){ return !x; }).not();
var id3  = λ(τ.bool)(function(x){ return x;  });

console.log(not1(true) === false);
console.log(not2(true) === false);
console.log(id1(true)  === true);
console.log(id2(true)  === true);
console.log(id3(false)  === false);