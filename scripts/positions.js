SNK.positions = (function(){

	/**
		takes two arrays each expected with 2 items representing an X and Y coordinate and compares the values,
		returning true if both objects have the same X and Y values
    */
	var areEqual = function(positionA, positionB) {
		return (positionA[0] === positionB[0]) & (positionA[1] === positionB[1]);
    };
	
	return {
		areEqual: areEqual
	};
}());