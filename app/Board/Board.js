
 
export class Board {

    constructor (size) {
        this.size = size;
        this.directions = ['north', 'east', 'south', 'west'];

    }

    isValidPosition ( posArr ) {

        // we check if the posArr is valid against our board
        return  this.isValidXY( posArr[0] ) &&
            this.isValidXY( -posArr[1]) &&
            this.isValidDirection( posArr[2])

    }

    isValidDirection (direction) {

        return this.directions.find( x => x === direction );

    }

    isValidXY (xy) {

        return (0 <= xy && xy < this.size);

    }

}


