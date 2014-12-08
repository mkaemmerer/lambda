///////////////////////////////////////////////////////////////////////////////
// PRIMITIVE FUNCTION DEFINITIONS
///////////////////////////////////////////////////////////////////////////////

var prim = {
  any:    {},
  array:  {},
  bool:   {},
  number: {},
  string: {}
};


//-----------------------------------------------------------------------------
// Any Type
//-----------------------------------------------------------------------------
//methods
prim.any.toString             = function(x){   return x.toString();       };
prim.any.toLocaleString       = function(x){   return x.toLocaleString(); };
//operators
prim.any.equalTo              = function(x,y){ return x === y;            };
prim.any.notEqualTo           = function(x,y){ return x !== y;            };
prim.any.lessThan             = function(x,y){ return x < y;              };
prim.any.greaterThan          = function(x,y){ return x > y;              };
prim.any.greaterThanOrEqualTo = function(x,y){ return x >= y;             };
prim.any.lessThanOrEqualTo    = function(x,y){ return x <= y;             };


//-----------------------------------------------------------------------------
// Array
//-----------------------------------------------------------------------------
//methods
prim.array.concat               = function(a,x){         return a.concat(x);         };
prim.array.every                = function(a,p){         return a.every(p);          };
prim.array.filter               = function(a,p){         return a.filter(p);         };
prim.array.forEach              = function(a,f){         return a.forEach(f);        };
prim.array.indexOf              = function(a,x){         return a.indexOf(x);        };
prim.array.join                 = function(a,sep){       return a.join(sep);         };
prim.array.lastIndexOf          = function(a,x){         return a.lastIndexOf(x);    };
prim.array.$length              = function(a){           return a.length;            };
prim.array.map                  = function(a,f){         return a.map(f);            };
prim.array.pop                  = function(a){           return a.pop();             };
prim.array.push                 = function(a,x){         return a.push(x);           };
prim.array.reduce               = function(a,f,z){       return a.reduce(f,z);       };
prim.array.reduceRight          = function(a,f,z){       return a.reduceRight(f,z);  };
prim.array.reverse              = function(a){           return a.reverse();         };
prim.array.shift                = function(a){           return a.shift();           };
prim.array.slice                = function(a,start,end){ return a.slice(start,end);  };
prim.array.some                 = function(a,p){         return a.some(p);           };
prim.array.sort                 = function(a,cmp){       return a.sort(cmp);         };
prim.array.splice               = function(a,start,end){ return a.splice(start,end); };
prim.array.unshift              = function(a,x){         return a.unshift(x);        };
prim.array.toLocaleString       = prim.any.toLocaleString;
prim.array.toString             = prim.any.toString;
//operators
prim.array.equalTo              = prim.any.equalTo;
prim.array.notEqualTo           = prim.any.notEqualTo;
prim.array.lessThan             = prim.any.lessThan;
prim.array.greaterThan          = prim.any.greaterThan;
prim.array.greaterThanOrEqualTo = prim.any.greaterThanOrEqualTo;
prim.array.lessThanOrEqualTo    = prim.any.lessThanOrEqualTo;


//-----------------------------------------------------------------------------
// Boolean
//-----------------------------------------------------------------------------
//methods
prim.bool.toLocaleString       = prim.any.toLocaleString;
prim.bool.toString             = prim.any.toString;
//operators
prim.bool.not                  = function(x){   return !x;   };
prim.bool.or                   = function(x,y){ return x||y; };
prim.bool.and                  = function(x,y){ return x&&y; };
prim.bool.equalTo              = prim.any.equalTo;
prim.bool.notEqualTo           = prim.any.notEqualTo;
prim.bool.lessThan             = prim.any.lessThan;
prim.bool.greaterThan          = prim.any.greaterThan;
prim.bool.greaterThanOrEqualTo = prim.any.greaterThanOrEqualTo;
prim.bool.lessThanOrEqualTo    = prim.any.lessThanOrEqualTo;


//-----------------------------------------------------------------------------
// Number
//-----------------------------------------------------------------------------
//methods
prim.number.toExponential        = function(x,d){ return x.toExponential(d); };
prim.number.toFixed              = function(x,d){ return x.toFixed(d);       };
prim.number.toPrecision          = function(x,d){ return x.toPrecision(d);   };
prim.number.toLocaleString       = prim.any.toLocaleString;
prim.number.toString             = prim.any.toString;
//operators
prim.number.plus                 = function(x,y){ return x+y;  };
prim.number.minus                = function(x,y){ return x-y;  };
prim.number.times                = function(x,y){ return x*y;  };
prim.number.div                  = function(x,y){ return x/y;  };
prim.number.mod                  = function(x,y){ return x%y;  };
prim.number.equalTo              = prim.any.equalTo;
prim.number.notEqualTo           = prim.any.notEqualTo;
prim.number.lessThan             = prim.any.lessThan;
prim.number.greaterThan          = prim.any.greaterThan;
prim.number.greaterThanOrEqualTo = prim.any.greaterThanOrEqualTo;
prim.number.lessThanOrEqualTo    = prim.any.lessThanOrEqualTo;


//-----------------------------------------------------------------------------
// String
//-----------------------------------------------------------------------------
//methods
prim.string.charAt               = function(s,n){         return s.charAt(n);             };
prim.string.charCodeAt           = function(s,n){         return s.charCodeAt(n);         };
prim.string.concat               = function(s,x){         return s.concat(x);             };
prim.string.indexOf              = function(s,c){         return s.indexOf(c);            };
prim.string.lastIndexOf          = function(s,c){         return s.lastIndexOf(c);        };
prim.string.$length              = function(s){           return s.length;                };
prim.string.localeCompare        = function(s,x){         return s.localeCompare(x);      };
prim.string.match                = function(s,re){        return s.match(re);             };
prim.string.replace              = function(s,re,f){      return s.replace(re,f);         };
prim.string.search               = function(s,re){        return s.search(re);            };
prim.string.slice                = function(s,start,end){ return s.slice(start,end);      };
prim.string.split                = function(s,sep){       return s.split(sep);            };
prim.string.substr               = function(s,start,len){ return s.substr(start, len);    };
prim.string.substring            = function(s,start,end){ return s.substring(start, end); };
prim.string.toLocaleLowerCase    = function(s){           return s.toLocaleLowerCase();   };
prim.string.toLocaleUpperCase    = function(s){           return s.toLocaleUpperCase();   };
prim.string.toLowerCase          = function(s){           return s.toLowerCase();         };
prim.string.toUpperCase          = function(s){           return s.toUpperCase();         };
prim.string.trim                 = function(s){           return s.trim();                };
prim.string.toLocaleString       = prim.any.toLocaleString;
prim.string.toString             = prim.any.toString;
//operators
prim.string.equalTo              = prim.any.equalTo;
prim.string.notEqualTo           = prim.any.notEqualTo;
prim.string.lessThan             = prim.any.lessThan;
prim.string.greaterThan          = prim.any.greaterThan;
prim.string.greaterThanOrEqualTo = prim.any.greaterThanOrEqualTo;
prim.string.lessThanOrEqualTo    = prim.any.lessThanOrEqualTo;


///////////////////////////////////////////////////////////////////////////////
// EXPORTS
///////////////////////////////////////////////////////////////////////////////
if (typeof module != 'undefined'){
  module.exports = prim;
}
