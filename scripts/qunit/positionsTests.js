module("positions.areEqual");

test('areEqual return false if positions are not equal', function () {

    // arrange
    // create two positions
	var first = [1,2],
		second = [2,3];
		
    // act
    var equal = SNK.positions.areEqual(first, second);

    // assert
    equals(equal, false, "Expecting value returned to be false");
});

test('areEqual return true if positions are equal', function () {

    // arrange
    // create two positions
	var first = [1,2],
		second = [1,2];
		
    // act
    var equal = SNK.positions.areEqual(first, second);

    // assert
    equals(equal, true, "Expecting value returned to be true");
});
