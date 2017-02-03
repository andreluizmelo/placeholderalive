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
        this.intervalFunctionId = null; // stores the id received from setInterval

        this.options = defaultOptions; // set options to default ones initially
        if(options !== null && options !== undefined){
            for (var option in options){ // overrides the default options with the parameters
                this.options[option] = options[option];
            }
        }

        this.CalculateWordInterval();

        if(this.options.autoStart){
            this.Start();
        }
    }

    // calculates time between one word is drawn and next one
    PlaceholderAlive.prototype.CalculateWordInterval = function(){
        this.wordInterval = Math.max(Math.max.apply(null, this.placeholderList), this.options.minimumWordInterval);
    };

    // checks if there is a setInterval timer running
    PlaceholderAlive.prototype.IsRunning = function(){
        return this.intervalFunctionId !== null;
    };

    // removes one letter at a time from the placeholder
    PlaceholderAlive.prototype.Undrawn = function(){

    };

    // puts one letter at a time in the placeholder
    PlaceholderAlive.prototype.Draw = function(){

    };

    PlaceholderAlive.prototype.Start = function(){
        if(this.IsRunning()){ // there is already a setInterval in place
            return; 
        }


    };

    PlaceholderAlive.prototype.Stop = function(){
        if(!this.IsRunning()){ // already stopped
            return; 
        }
        clearInterval(this.intervalFunctionId); // stops the setInterval function
        this.currentPlaceholder = 0; // sets it back to the first placeholder
        this.Draw();
    };

    PlaceholderAlive.prototype.Reset = function(){
        if(this.IsRunning()){ // there is a setInterval in place that needs to be stopped
            this.Stop();
        }
        // starts again or for the first time
        this.Start();
    };

    // stops the changing of placeholders, add a new one and starts again
    PlaceholderAlive.prototype.AddPlaceholders = function( placeholder){
        if(this.IsRunning()){ // there is a setInterval in place that needs to be stopped
            this.Stop();
        }
        if( placeholder instanceof Array){
            this.placeholderList = this.placeholderList.concat(placeholder);
        }else if(placeholder !== null && placeholder !== undefined){
            this.placeholderList.push(placeholder);
        }
        this.CalculateWordInterval();
        this.Start();
    };

    return self;
})();