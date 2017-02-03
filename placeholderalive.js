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

    // sets this.currentPlaceholder to next positions
    PlaceholderAlive.prototype.SetNext = function(){
        // ads one and goes back to beggining if needed
        $this.currentPlaceholder = ($this.currentPlaceholder + 1) % $this.placeholderList.length;
    };

    // removes one letter at a time from the placeholder
    // returns total time to undrawn word
    PlaceholderAlive.prototype.Undraw = function(){
        // sets it in a variable so if it is changed outside this method is not affected
        var currentIndex = this.currentPlaceholder; 
        var currentPlaceholder = this.placeholderList[currentIndex];

        var $this = this;
        // trying not to use let keyword, so using an iife
        for(var i = 0; i <= currentPlaceholder.length; i++){
            (function(currentPosition){
                setTimeout(function(){
                    $this.elem.setAttribute("placeholder", currentPlaceholder.splice(0, currentPlaceholder.length - currentPosition));
                }, $this.wordInterval * currentPosition);
            })(i);
        }
        return (currentPlaceholder.length + 1);
    };

    // puts one letter at a time in the placeholder
    // returns total time to drawn word
    PlaceholderAlive.prototype.Draw = function(){
        // sets it in a variable so if it is changed outside this method is not affected
        var currentIndex = this.currentPlaceholder; 
        var currentPlaceholder = this.placeholderList[currentIndex];
        
        var $this = this;
        // trying not to use let keyword, so using an iife
        for(var i = 0; i <= currentPlaceholder.length; i++){
            (function(currentPosition){
                setTimeout(function(){
                    $this.elem.setAttribute("placeholder", currentPlaceholder.splice(0, currentPosition));
                }, $this.wordInterval * currentPosition);
            })(i);
        }
        return currentPlaceholder.length;
    };

    PlaceholderAlive.prototype.DrawNext = function(){
        var waitingTime = 0;
        // checks options if it should undrawn slowly or not
        if(this.options.undrawn == true){
            waitingTime = this.Undraw();
        }
        var $this = this;
        setTimeout(function(){
            $this.SetNext(); // goes to next placeholder
            $this.Draw(); // draws the new placeholder
        },waitingTime);
    };

    PlaceholderAlive.prototype.Start = function(){
        if(this.IsRunning()){ // there is already a setInterval in place
            return; 
        }
        // draws first
        this.Draw();
        // set interval timer to change placeholder
        setInterval(this.DrawNext, this.wordInterval);
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