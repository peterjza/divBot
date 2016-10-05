import {Board} from './Board';
 
describe('Board', () =>{

    it('should be Defined', () =>{

        let board = new Board( 5 );
        expect( board ).toBeDefined();

    });

    it('has a size property Equal to its only argument', () => {

        let random = Math.floor(Math.random() * 5);
        let board = new Board( random );
        expect( board.size ).toEqual( random );

    });
    //
    // it('should accept north, south, east, west as valid directions', () => {
    //
    //     let board = new Board( 5 );
    //     let n = board.isValidDirection('north');
    //     let e = board.isValidDirection('south');
    //     let s = board.isValidDirection('east');
    //     let w = board.isValidDirection('west');
    //
    //     expect( n ).toContain( n );
    //     expect( e ).toContain( e );
    //     expect( s ).toContain( s );
    //     expect( w ).toContain( w );
    //
    // });



    it('should not allow valid XY to be equal or greater than its size', () => {
        let num = 5;
        let board = new Board( num );
        let xA = board.isValidXY( board.size );
        let xB = board.isValidXY( board.size - 1 );

        expect( xA ).toBeFalsy( );
        expect( xB ).toBeTruthy( );

    });

})