/**
 * Created by Tserkovniy on 14.02.14.
 *
 * Description: http://en.wikipedia.org/wiki/Singleton_pattern
 * Task: Make possibility create only one Class of this type
 *
 * Version: a
 *
 * Compatibility info: for less IE9 you need:
 *      Function.prototype.bind
 */

var singleton;

singleton = (function () {
	var builtInstance;

    function decorate (initial, decorateBefore) {
        function dec () {
            var beforeResult, initialCallResult;

            beforeResult = decorateBefore.apply(this, arguments);

            if (typeof beforeResult === 'function' ) {
                initialCallResult = beforeResult.apply(this, arguments);
            } else {
                initialCallResult = initial.apply(this, arguments);
            }
            
            return initialCallResult;
        }

        dec.toString = initial.toString.bind(initial);
        dec.name = initial.name;

        return dec;
    }

	function createSingleInstance (Constr) {
        Constr = decorate(Constr, function () {
            if ( !builtInstance ) {
                builtInstance = this;
            } else {
                return function () { return builtInstance; };
            }
        });

        return Constr;
	}

	return createSingleInstance;
})();

// Test cases
var Dog = singleton(function Dog (leg, life) {
	this.leg = leg;
	this.life = life;
});

// Dog = singleton(Dog); // best way, but I can't make solution

var a = new Dog(1, true);
var b = new Dog(2, 'true');
var c = new Dog(3, false);
var d = Dog(4, 'false');

b.smth = true;

console.log(a, b, c, d, a instanceof Dog);

// Should be
console.log(a.smth); // true
console.log(a === b); // true
console.log(a instanceof Dog); // true
console.log(c === b); // true
console.log(a === d); // true