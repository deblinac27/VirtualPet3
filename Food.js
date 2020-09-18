class Food{
    constructor(){
        this.foodStock = 50;
        this.image = loadImage("images/Milk.png");
    }
    display(){
      var x = 80, y = 20;
        imageMode(CENTER);
        image(this.image, 200, 220, 70, 70);

        if(this.foodStock!==0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10===0){
                    x = 80;
                    y = y+70;
                }
                image(this.image, x, y, 70, 70);

            }
        }
        fill(255, 255, 254);
        textSize(15);
        if(lastFed>=12){
            text("Last Feed : " + lastFed%12 + " PM", 350, 30)
        } else if(lastFed === 0){
            text("Last Feed : 12 AM", 350, 30);
        }else{
            text("Last Feed : " + lastFed + " AM", 350, 30);
        }
    }
    getFoodStock(){
        var foodStockRef = database.ref('foodStock');
        foodStockRef.on("value", function(data){
            food = data.val();
        })
    }
    updateFoodStock(FoodStock){
        database.ref('/').update({
            food: FoodStock
        });
    }
    deductFood(){
    }

    bedroom(){
        background(bedroom, 550, 500);
    }

    garden(){
        background(garden, 550, 500);
    }

    washroom(){
        background(washroom, 550, 500);
    }
}