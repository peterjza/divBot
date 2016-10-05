"use strict";

/**Created by jarvispe on 9/20/2016. */ 


var css = require("./app/src/main.scss");

import {Board} from './app/Board/Board';
import {Interface} from './app/Interface/Interface';
import {Robot} from './app/Robot/Robot';




(() => {

    const boardSize = 5;
    const board = new Board( boardSize );
    const robot = new Robot( board );
    const ui = new Interface( robot );



    // robot.executeCommandList();

})();


