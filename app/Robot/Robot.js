
export class Robot {

    constructor ( board ) {

        this.board = board;
        this.allowedInputs = ["place", "move", "left", "right", "report"];
        this.maxFacingIdx = this.board.directions.length - 1;

        this.commandList = document.getElementById("commandList");
        this.placed = false;
        this.rotation = 0;
        this.speed = 1;
        this.commandArr = [];

        this.el = document.getElementById("bot");
        this.el.addEventListener( 'transitionend',  () => { this.executeCommandList() }, false);
    }


    reportLocation () {

        return `${this.posX}  ${Math.abs(this.posY)}   ${this.facing}`
    }

    report () {

        if( !this.placed )
            return this.reject();

        // if( this.placed )
        let block = ( -this.posY * 5) + this.posX,
            base = document.getElementById("grid"),
            list = base.getElementsByTagName('li'),
            heading = document.createElement("h1");
            heading.appendChild( document.createTextNode( this.reportLocation()));

        let speak = list[block].appendChild(heading);
        void speak.offsetWidth;
        speak.classList.add("animate");

        this.executeCommandList();

        setTimeout( () => {  list[block].removeChild(speak); }, 4000);

        return true;

    }

    place ( arr, idx ) {

        // we create new posArr from the next 3 items;
        // if they are board.isValid ;
        // they are used and then removed

        // we create new posArr
        let posArr = Array.of( arr[idx ], -arr[idx + 1], arr[idx + 2]);

        // if new posArr board.isValid ;
        if( this.board.isValidPosition( posArr )) {

            let list = this.commandList.getElementsByTagName('li');

            for( let i = 0; i < 3; i++){

                this.commandArr.shift();

            }
                // this removes and adds the css3 class to trigger the animation
                // the void this.el.offsetWidth causes the bot to repaint;
                // allowing us to add the same class to replay the animation

                this.el.classList.remove("teleportIn");
                void this.el.offsetWidth;
                this.el.classList.add("teleportIn");


            setTimeout( () => {

                this.commandList.removeChild( list[0] );
                this.commandList.removeChild( list[0] );
                this.commandList.removeChild( list[0] )
                this.posX = parseInt(posArr[0]);
                this.posY = parseInt(posArr[1]);
                this.facing = posArr[2];
                this.rotation = this.getFacingIdx() * 90;

                // if(!this.placed )
                //     this.el.classList.remove("unplaced");

                this.animate();

            }, 400);

            setTimeout( () => {

                this.executeCommandList();

            }, 2800);

            this.placed = true;

            return true

        }

        else {

            return this.reject();
        }
    }

    getFacingIdx () {

        return this.board.directions.findIndex( i => i === this.facing);

    }

    setFacingByIdx ( idx ) {

        // this determines which direction the value equates to

        return this.board.directions[ idx ];

    }

    reject (  ) {

        // this removes and adds the css3 class to trigger the animation
        // the void this.el.offsetWidth causes the bot to repaint;
        // allowing us to add the same class to replay the animation
        this.el.classList.remove("robot-reject");

        void this.el.offsetWidth;

        this.el.classList.add("robot-reject");


        setTimeout( () => {  this.executeCommandList(); }, 2000);

        return false;

    }
    animate () {

        // update the new position values of our robot

        this.el.style.transform = "translate(" +
            this.posX *  100 + 'px,' +
            this.posY *  100  + "px) rotate(" +
            this.rotation  + "deg)";
    }

    left () {

        // Turn our robot unless it has not been placed

        if( !this.placed )
            return this.reject();

        let currIdx = this.getFacingIdx(),
            newIdx = ( currIdx  === 0 ) ? this.maxFacingIdx : currIdx - 1;

        this.facing = this.setFacingByIdx( newIdx );
        this.rotation -= 90;

        return true;

    }

    right () {

        // Turn our robot unless it has not been placed

        if( !this.placed )
            return this.reject();


        let currIdx = this.getFacingIdx(),
            newIdx = ( currIdx  === this.maxFacingIdx  ) ? 0 : currIdx + 1;

        this.facing = this.setFacingByIdx( newIdx );
        this.rotation += 90;

        return true;
    }

    move () {

        let currPosX = this.posX,
            currPosY = this.posY;


        switch ( this.facing ) {
            case "north":
                currPosY  -= 1;
                break;
            case "east":
                currPosX += 1;
                break;
            case "south":
                currPosY += 1;
                break;
            case "west":
                currPosX -= 1;
                break;
            default:
                return this.reject();

        }

        let posArr = Array.of( currPosX, currPosY, this.facing);

        if( this.board.isValidPosition( posArr )) {

            this.posX = currPosX;
            this.posY = currPosY;

            return true;

        } else {

            return this.reject();
        }

    }

    addCommand (cmdArr) {

        // If the command array is empty -- We have to add a delay or the bot
        // could try animate two values at once which looks weird and slippery
        if( this.commandArr.length == 0){

            setTimeout( () => { this.executeCommandList() }, 1400);
        }
        this.commandArr.push(cmdArr);

    }

    executeCommandList () {

        // this executes the next command issued to the bot
        // if the command is recognised we execute it
        // if not recognised we send it off to be rejected
        // Once this is determined we remove the cmd from the UI command list

        if( this.commandArr.length <= 0){
            // alert("end");
            return false;
        }

        let cmd = this.commandArr[0],
            cmdResult;

        this.commandArr.shift();


        if( this.allowedInputs.find( i => i == cmd ) ){

            cmdResult = this[cmd]( this.commandArr, 0 );

            this.animate();
        }
        else {

            cmdResult = this.reject();

        }

        let firstItem = document.getElementsByClassName('pending');

        firstItem[0].classList.add( cmdResult ? "success" : "fail" );
        firstItem[0].classList.remove('pending');

        setTimeout( () => {

            let firstItem = this.commandList.getElementsByTagName('li');
            firstItem[0].parentNode.removeChild(firstItem[0]);

        }, 1000);
    }
}
