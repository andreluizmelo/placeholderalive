var PlaceholderAliveFactory = (function(){
    var self = {};
    
    // default options for the PlaceholderAlive object
    var defaultOptions = {
        letterInterval: 50, // 50 milliseconds between each letter appears
        minimumWordInterval: 3000, // minimum time that each word has before it gets undrawn
        undrawn: true // if set to true, the current placeholder loses one letter at a time before the next gets drawn        
    };

    function PlaceholderAlive( inputId, placeholderList, options){
        
        this.elementId = inputId;
        this.placeholderList = placeholderList;
        this.currentPlaceholder = 0;

        this.options = defaultOptions; // set options to default ones initially
        if(options !== null && options !== undefined){
            for (var option in options){ // overrides the default options with the parameters
                this.options[option] = options[option];
            }
        }
    }

    PlaceholderAlive.prototype.Start = function(){

    };

    PlaceholderAlive.prototype.Stop = function(){

    };

    PlaceholderAlive.prototype.Reset = function(){

    };

    PlaceholderAlive.prototype.AddPlaceholder = function( placeholder){

    };

    return self;
})();