
import {Board} from '../Board/Board';
import {Robot} from './Robot';
 
describe('Robot', () =>{


    beforeEach(function() {
        var fixture =

            '<div id="bot"></div>'+
            '<div id="grid"><li></li></div>';
            document.body.insertAdjacentHTML( 'afterbegin', fixture);
    });


    it('should be Defined', () =>{

        let board = new Board( 5 )  ;
        let robot = new Robot( board );
        expect( robot ).toBeDefined();

    });

    it('should return false when reporting an unplaced robot', () =>{

        let board = new Board( 5 )  ;
        let robot = new Robot( board );
        expect( robot.report() ).toBeFalsy();

    });

    it('should return false when trying to move a unplaced robot', () =>{

        let board = new Board( 5 )  ;
        let robot = new Robot( board );
        expect( robot.move() ).toBeFalsy();

    });
    it('should return false when trying to turn a unplaced robot', () =>{

        let board = new Board( 5 )  ;
        let robot = new Robot( board );
        expect( robot.left() || robot.right() ).toBeFalsy();

    });

});