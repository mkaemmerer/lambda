var lambda = require('../lambda');
var λ      = lambda.λ;
var τ      = lambda.τ;


//-----------------------------------------------------------------------------
// Fixtures
//-----------------------------------------------------------------------------

var arithmetic_1 = λ(τ.number)
  .plus(2)
  .times(3);

var arithmetic_2 = λ(τ.number)
  (function(x){ return x - 2; })
  .plus(2)
  .times(3);


//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

exports.lambda = {
  'Arithmetic 1': function(test){
    test.strictEqual(arithmetic_1(3), 15);
    test.done();
  },
  'Arithmetic 2': function(test){
    test.strictEqual(arithmetic_2(3), 9);
    test.done();
  },
  'Composition': function(test){
    var f = arithmetic_1
      .andThen(τ.number)(arithmetic_2)
      .plus(10);
    
    test.strictEqual(f(3), 55);
    test.done();
  }
};
