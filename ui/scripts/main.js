$(function () {
    let buckleSound = false;
    window.addEventListener('message', function (event) {
        if(event.data.action == "VehicleInfo"){
            let VehicleSpeed = event.data.vehicleSpeed;
            let VehicleRPM = event.data.rpm;
            let Cruise = event.data.cruise;
            let SeatBelt = event.data.seatBelt;
            let SpeedUnit = event.data.speedUnit;
            let VehicleHealth = event.data.vehicleHealth;
            let Fuel = event.data.fuel;

            $(".carhud").fadeIn()
            $(".carhud").css("display", "flex");
            $(".carhud").css("right", "35px");
            $(".speed").text(String(VehicleSpeed).padStart(3, '0'));
            $(".rpm-bar").css("width", VehicleRPM+"%");
            $(".fuel-bar").css("height", Fuel+"%"); 
            $(".map-outline").fadeIn();
            $(".status-wrapper").css("left", "290px");
            $(".stamina-wrapper").fadeOut()
            $(".location").css({
                top: "0",
                left: "0",
            });

            if (SpeedUnit == "kmh"){
                $(".speed-unit").text("KMH");
            }else{
                $(".speed-unit").text("MPH");
            }

            if (VehicleHealth <= 700 && VehicleHealth >= 500){
                $(".engine").attr("src", "img/engine700.png");
                $(".engine").css("opacity", "0.8");
            }else if(VehicleHealth <= 500){
                $(".engine").attr("src", "img/engine500.png");
                $(".engine").css("opacity", "0.8");
            }else{
                $(".engine").attr("src", "img/engine.png");
                $(".engine").css("opacity", "0.3");
            }

            let FuelBGColor = null; 
            let color = "#FFFFFF";

            if (Fuel <= 40 && Fuel >= 20){
                $(".fuel").attr("src", "img/fuel40.png");
                $(".fuel-bar").css("background-color", "#FFA229");
            }else if(Fuel <= 20){
                $(".fuel").attr("src", "img/fuel20.png");
                $(".fuel-bar").css("background-color", "#FF2929");
            }else{
                $(".fuel").attr("src", "img/fuel.png");
                $(".fuel-bar").css("background-color", "#FFFFFF");
            }

            if(Cruise){
                $(".cruise").css("opacity", "0.8");
            }else{
                $(".cruise").css("opacity", "0.3");
            }

            if(SeatBelt){
                $(".belt").css("opacity", "0.8");
                if (!buckleSound){
                    buckleSound = true
                    playBuckleSound()
                }
            }else{
                $(".belt").css("opacity", "0.3");
                if (buckleSound){
                    buckleSound = false
                    playUnbuckleSound()
                }
            }
        }
        if(event.data.action == "StreetUpdate"){
            let Street = event.data.street;
            $(".location span").text(Street);
        }
        if(event.data.action == "StatusUpdate"){
            let Health = event.data.health;
            let Armour = event.data.armour;
            let Stamina = event.data.stamina;
            let Oxygen = event.data.oxygen;
            let InWater = event.data.inWater;

            if (Armour == 0){
                $(".armour-wrapper").fadeOut()
            }
            else if (Armour > 0){
                $(".armour-wrapper").fadeIn()
            }

            if (InWater){
                $(".oxygen-wrapper").fadeIn()
            }
            else if (!InWater){
                $(".oxygen-wrapper").fadeOut()
            }

            $(".health").css("background-image", `conic-gradient(#fff `+Health+`%, transparent `+(Health - 100)+`%, transparent)`);
            $(".armour").css("background-image", `conic-gradient(#fff `+Armour+`%, transparent `+(Armour - 100)+`%, transparent)`);
            $(".stamina").css("background-image", `conic-gradient(#fff `+Stamina+`%, transparent `+(Stamina - 100)+`%, transparent)`);
            $(".oxygen").css("background-image", `conic-gradient(#fff `+Oxygen+`%, transparent `+(Oxygen - 100)+`%, transparent)`);

        }
        if(event.data.action == "OutSideOfTheCar"){
            $(".stamina-wrapper").fadeIn()
            $(".carhud").fadeOut();
            $(".carhud").css("right", "-335px");
            $(".rpm-bar").css("width", "0%");
            $(".map-outline").fadeOut();
            $(".status-wrapper").css("left", "0px");
            $(".location").css({
                top: "190px",
                left: "50px",
            });
        }
    })
})

let buckleSound = new Audio();
buckleSound.src = "sounds/buckle.mp3"
let unbuckleSound = new Audio();
unbuckleSound.src = "sounds/unbuckle.mp3"

function playBuckleSound(){
    buckleSound.play();
}

function playUnbuckleSound(){
    unbuckleSound.play();
}

