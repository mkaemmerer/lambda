var lambda     = require('../lambda');
var prim       = require('../src/prim');
var quickcheck = require('fantasy-check/src/adapters/nodeunit');
var λ          = lambda.λ;
var τ          = lambda.τ;

//-----------------------------------------------------------------------------
// Fixtures
//-----------------------------------------------------------------------------
var λany  = λ(τ.any);
var λarr  = λ(τ.array);
var λbool = λ(τ.bool);
var λnum  = λ(τ.number);
var λstr  = λ(τ.string);

var arr   = [-3, 4, 0, 2, 2, 5, -1];
var str   = '  Foobar ';

var compare = function(x,y){ return x>y; };
var lt0     = function(x){ return x < 0; };
var gtn4    = function(x){ return x > -4; };
var gt3     = function(x){ return x > 3; };
var plus    = function(x,y){ return x+y; };
var plus2   = function(x){ return x+2; };

//-----------------------------------------------------------------------------
// Test Helpers
//-----------------------------------------------------------------------------
function sync(expects){
  return function(test){
    expects(test);
    test.done();
  };
}
function ok(test){
  return sync(function(t){
    t.ok(test());
  });
}
function eq(test, result){
  return sync(function(t){
    t.deepEqual(test(), result);
  });
}

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------
exports.Any = {
  //methods
  'toString':              eq(function(){ return λany.toString()(10);        },   '10'),
  'toLocaleString':        eq(function(){ return λany.toLocaleString()(str); },   '  Foobar '),
  //operators
  'equalTo':               ok(function(){ return λany.equalTo(3)(3);               }),
  'notEqualTo':            ok(function(){ return λany.notEqualTo(3)(0);            }),
  'lessThan':              ok(function(){ return λany.lessThan(0)(-1);             }),
  'greaterThan':           ok(function(){ return λany.greaterThan(0)(1);           }),
  'greaterThanOrEqualTo':  ok(function(){ return λany.greaterThanOrEqualTo(5)(5);  }),
  'lessThanOrEqualTo':     ok(function(){ return λany.lessThanOrEqualTo(7)(7);     })
};

exports.Array = {
  //methods
  'concat':                eq(function(){ return λarr.concat([1])(arr); },        [ -3, 4, 0, 2, 2, 5, -1, 1 ]),
  'every':                 ok(function(){ return λarr.every(gtn4)(arr); }),
  'filter':                eq(function(){ return λarr.filter(lt0)(arr); },        [ -3, -1]),
  'forEach':               eq(function(){
                                  var x = 0;
                                  λarr.forEach(function(){ x++; })(arr);
                                  return x;
                                }, 7),
  'indexOf':               eq(function(){ return λarr.indexOf(2)(arr);                     },  3),
  'join':                  eq(function(){ return λarr.join(',')(arr);                      },  '-3,4,0,2,2,5,-1'),
  'lastIndexOf':           eq(function(){ return λarr.lastIndexOf(2)(arr);                 },  4),
  '$length':               eq(function(){ return λarr.$length()(arr);                      },  7),
  'map':                   eq(function(){ return λarr.map(plus2)(arr);                     },  [ -1, 6, 2, 4, 4, 7, 1 ]),
  'pop':                   eq(function(){ return λarr.pop()([1]);                          },  1),
  'push':                  eq(function(){ return λarr.push(10)([1]);                       },  2),
  'reduce':                eq(function(){ return λarr.reduce(τ.number)(plus)(0)(arr);      },  9),
  'reduceRight':           eq(function(){ return λarr.reduceRight(τ.number)(plus)(0)(arr); },  9),
  'reverse':               eq(function(){ return λarr.reverse()(arr);                      },  [ -1, 5, 2, 2, 0, 4, -3 ]),
  'shift':                 eq(function(){ return λarr.shift()([3]);                        },  3),
  // TODO: accept multiple arguments
  // 'slice':                 eq(function(){ return λarr.slice(4)(arr);                       },  [ 0, 4, -3 ]),
  'some':                  ok(function(){ return λarr.some(gt3)(arr); }),
  'sort':                  eq(function(){ return λarr.sort(compare)(arr);                  },  [ -3, -1, 0, 2, 2, 4, 5 ]),
  // TODO: accept multiple arguments
  // 'splice':                eq(function(){ return λarr.splice(2)([1,4,5,6]);                },  []),
  'unshift':               eq(function(){ return λarr.unshift(2)([7,5]);                   },  3),
};

exports.Boolean = {
  //operators
  'not':                   ok(function(){ return λbool.not()(false);    }),
  'or':                    ok(function(){ return λbool.or(true)(false); }),
  'and':                   ok(function(){ return λbool.and(true)(true); })
};
exports.Number = {
  //methods
  'toExponential':         eq(function(){ return λnum.toExponential(2)(30); },  '3.00e+1'),
  'toFixed':               eq(function(){ return λnum.toFixed()(3.2);       },  3),
  'toPrecision':           eq(function(){ return λnum.toPrecision(2)(3);    },  '3.0'),
  //operators
  'plus':                  eq(function(){ return λnum.plus(3)(3);           },  6),
  'minus':                 eq(function(){ return λnum.minus(5)(3);          },  -2),
  'times':                 eq(function(){ return λnum.times(3)(3);          },  9),
  'div':                   eq(function(){ return λnum.div(4)(3);            },  0.75),
  'mod':                   eq(function(){ return λnum.mod(2)(3);            },  1)
};

exports.String = {
  //methods
  'charAt':                eq(function(){ return λstr.charAt(4)(str);               }, 'o'),
  'charCodeAt':            eq(function(){ return λstr.charCodeAt(4)(str);           }, 111),
  'concat':                eq(function(){ return λstr.concat('!')(str);             }, '  Foobar !'),
  'indexOf':               eq(function(){ return λstr.indexOf('o')(str);            }, 3),
  'lastIndexOf':           eq(function(){ return λstr.lastIndexOf('o')(str);        }, 4),
  '$length':               eq(function(){ return λstr.$length()(str);               }, 9),
  'localeCompare':         eq(function(){ return λstr.localeCompare('z')(str);      }, -90),
  'match':                 eq(function(){ return λstr.match(/bar/)(str).concat([]); }, [ 'bar' ]),
  // TODO: accept multiple arguments
  // 'replace':               eq(function(){ return λstr.replace(/ /g, '')(str);       }, 900),
  'search':                eq(function(){ return λstr.search(/oo/)(str);            }, 3),
  // TODO: accept multiple arguments
  // 'slice':                 eq(function(){ return λstr.slice()(str);                 }, 900),
  'split':                 eq(function(){ return λstr.split(' ')(' s t r i n g');   }, [ '', 's', 't', 'r', 'i', 'n', 'g' ]),
  'substr':                eq(function(){ return λstr.substr(3)(str);               }, 'oobar '),
  'substring':             eq(function(){ return λstr.substring(3)(str);            }, 'oobar '),
  'toLocaleLowerCase':     eq(function(){ return λstr.toLocaleLowerCase()(str);     }, '  foobar '),
  'toLocaleUpperCase':     eq(function(){ return λstr.toLocaleUpperCase()(str);     }, '  FOOBAR '),
  'toLowerCase':           eq(function(){ return λstr.toLowerCase()(str);           }, '  foobar '),
  'toUpperCase':           eq(function(){ return λstr.toUpperCase()(str);           }, '  FOOBAR '),
  'trim':                  eq(function(){ return λstr.trim()(str);                  }, 'Foobar')
};
