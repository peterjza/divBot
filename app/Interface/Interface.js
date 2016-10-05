
export class Interface {

    constructor ( robot ) {
        // Build the UI  -
        // Assign a robot
        // Grab DOM els - attach events

        let submit = document.getElementById("submit");
        let input = document.getElementById("input");

        this.commandList = document.getElementById("commandList");

        this.robot = robot;
        this.allowedInputs = this.robot.allowedInputs;
        // this.lies = ["place", "0", "0", "south", "place", "4", "4", "south","place", "4", "0", "south", "place", "0", "4", "south"];

        submit.addEventListener("click", (e) =>
            this.sanitize( input, e )
        );

        document.onkeydown = (evt) => {
            evt = evt || window.event;

            switch (evt.keyCode) {
                case 37:
                    this.inputCommand( ["left"]);
                    break;
                case 38:
                    this.inputCommand( ["move"]);
                    break;
                case 39:
                    this.inputCommand( ["right"]);
                    break;
            }
        };


        this.buildUI();
        this.buildTeleporter();
        // this.buildSpeedUI();
        //
        // setTimeout( () => {
        //
        //     // this.inputCommand( this.lies )
        //
        // }, 1000);
    }

    sanitize ( input, e ) {

        // Grab input value -sanitize -make it a list

        let val = input.value,
            regEx = /,/g;

        // Trim it - lowercase it - Replace regEx - Remove empty arr[n];
        let sanitizedValueArray = val
            .trim()
            .toLocaleLowerCase()
            .replace( regEx , ' ')
            .split(' ')
            .filter( e => e);

        this.inputCommand( sanitizedValueArray );
        e.preventDefault();
    }


    inputCommand ( cmdArr ){
        // create a list of items for each command entered
        // and then pass the command to the robot

        for(let i = 0; i < cmdArr.length; i++){

            let li = document.createElement("li");
            li.appendChild( document.createTextNode( cmdArr[i]) );
            li.classList.add("pending");

            this.commandList.appendChild(li);
            this.robot.addCommand( cmdArr[i] );
        }

    }

    buildUI (  ) {

        //build the grid
        let base = document.getElementById("grid");
        
        for( let i = 0; i < 25; i++ ){
            
            let li = document.createElement("li");
            
            base.appendChild(li);
            
        }

        // Bind the command buttons
        // The buttons contain a data-attribute
        // move left right report
        let btnNav = document.getElementById("btnNav");
        btnNav.addEventListener("click", (e) => {

            if (e.target !== e.currentTarget) {

                let cmd = e.target.parentNode.dataset.command;

                if( cmd == null ) return;

                this.inputCommand( [cmd]);

            }
            e.stopPropagation();

        }, false);

    }


    buildTeleporter (  ) {

        // Create the list of buttons used to place/teleport the bot
        // The buttons contain a data-attribute
        // The data attribute determines where to teleport to

        let grid = document.getElementById("teleportPad");

        for( let i = 4; i >= 0; i-- ){


            let ul = document.createElement("ul");
            ul.dataset.list = i;

            for( let j = 0; j <= 4; j++ ){

                let li = document.createElement("li");
                li.dataset.item = j;
                ul.appendChild(li);

            }
            grid.appendChild(ul);
        }

        grid.addEventListener("click", (e) => {

            if (e.target !== e.currentTarget) {
                let x = e.target.dataset.item,
                    y = e.target.parentNode.dataset.list;

                if(x == null || y == null) return;

                let teleportArr = ["place", x, y, this.robot.facing || "north" ];

                this.inputCommand( teleportArr );

            }
            e.stopPropagation();

        }, false);
    }
    // Ran out of time to implement a speed controller
    // This would of allowed the user to select a speed for the bot
    // This will controll the speed with the bots css3 transition time

    // buildSpeedUI (  ) {
    //
    //     let speed = document.getElementById("speedNav");
    //
    //     for( let i = 0; i <= 2; i++ ){
    //
    //         let li = document.createElement("li");
    //         li.dataset.item = i;
    //         speed.appendChild(li);
    //
    //     }
    //
    //     speed.addEventListener("click", (e) => {
    //
    //         if (e.target !== e.currentTarget) {
    //             let speed = e.target.dataset.speed;
    //             if(speed == null ) return;
    //
    //             this.robot.setSpeed( speed );
    //
    //         }
    //         e.stopPropagation();
    //
    //     }, false);
    // }
}