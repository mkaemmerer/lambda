var lambda = require('../lambda');
var λ      = lambda.λ;
var τ      = lambda.τ;


//-----------------------------------------------------------------------------
// Fixtures
//-----------------------------------------------------------------------------

var arithmetic_1 = λ(τ.number)
  .plus(1)
  .times(2);

var arithmetic_2 = λ(τ.number)
  (function(x){ return x - 3; })
  .plus(4)
  .times(5);

var polymorphic  = λ(τ.array)
  .reduce(τ.number)(function(x,y){ return x+y; })(0)
  .plus(10);

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

exports.lambda = {
  'Arithmetic 1': function(test){
    test.strictEqual(arithmetic_1(3), 8);
    test.done();
  },
  'Arithmetic 2': function(test){
    test.strictEqual(arithmetic_2(3), 20);
    test.done();
  },
  'Composition': function(test){
    var f = arithmetic_1
      .andThen(τ.number)(arithmetic_2)
      .plus(6);
    
    test.strictEqual(f(3), 51);
    test.done();
  },
  'Polymorphism': function(test){
    var array = [1,2,3,4];
    test.strictEqual(polymorphic(array), 20);
    test.done();
  }
};
