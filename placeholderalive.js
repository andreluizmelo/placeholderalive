var PlaceholderAliveFactory = (function(){
    var self = {};
    
    // default options for the PlaceholderAlive object
    var defaultOptions = {
        letterInterval: 50, // 50 milliseconds between each letter appears
        minimumWordInterval: 3000, // minimum time that each word has before it gets undrawn
        undrawn: true, // if set to true, the current placeholder loses one letter at a time before the next gets drawn        
        autoStart: true
    };

    function PlaceholderAlive( inputId, placeholderList, options){
        
        this.elementId = inputId;
        this.placeholderList = placeholderList;
        this.currentPlaceholder = 0;
        this.elem = getElementById(this.elementId);
        this.intervalFunctionId = null;

        this.options = defaultOptions; // set options to default ones initially
        if(options !== null && options !== undefined){
            for (var option in options){ // overrides the default options with the parameters
                this.options[option] = options[option];
            }
        }

        if(this.options.autoStart){
            this.Start();
        }
    }

    PlaceholderAlive.prototype.Start = function(){
        if(this.intervalFunctionId !== null){ // there is already a setInterval in place
            return; 
        }
    };

    PlaceholderAlive.prototype.Stop = function(){
        if(this.intervalFunctionId === null){ // already stopped
            return; 
        }
    };

    PlaceholderAlive.prototype.Reset = function(){
        if(this.intervalFunctionId !== null){ // already stopped
            this.Stop();
        }
        this.Start();
    };

    PlaceholderAlive.prototype.AddPlaceholder = function( placeholder){

    };

    return self;
})();