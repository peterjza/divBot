
export class Utilities {

    static whichTransitionEvent () {

        let t;
        let el = document.createElement('fakeelement');
        let transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        }

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    } 
    //
    //
    // static whichAnimationEvent () {
    //
    //     let t;
    //     let el = document.createElement('fakeelement');
    //     let transitions = {
    //         'animation':'animationend',
    //         'OAnimation':'onimationEnd',
    //         'MozTransition':'animationend',
    //         'WebkitTransition':'webkitTransitionEnd'
    //     }
    //
    //     for(t in transitions){
    //         if( el.style[t] !== undefined ){
    //             return transitions[t];
    //         }
    //     }
    // }
}