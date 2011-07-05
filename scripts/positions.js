SNK.positions = (function(){

	/**
		takes two arrays each expected with 2 items representing an X and Y coordinate and compares the values,
		returning true if both objects have the same X and Y values
    */
	var areEqual = function(positionA, positionB) {
		return (positionA[0] === positionB[0]) & (positionA[1] === positionB[1]);
    };
	
	/**
	 * Checks if the position is equal to any of the positions in the array
	 * position: the position to compare to all those in the array
	 * positionsArray: The array of positions to search through
	 *
	 * returns: true if the postition is found in the array
	 */
	var positionIsInPositionsArray = function(position, positionsArray){
		for(var i = 0, len = positionsArray.length; i < len; i++){
			if(areEqual(position, positionsArray[i])){
				return true;
			}
		}
		return false;
	};

	return {
		areEqual: areEqual,
		positionIsInPositionsArray: positionIsInPositionsArray
	};
}());
