function initialize(){
    var alive = PlaceholderAliveFactory.NewPlaceholderAlive("demo-input",
            ["This","Placeholder", "Is", "Alive"], {
                letterInterval: 65,
                minimumWordInterval: 2000
            });
}

window.onload = initialize;