class Food{
    constructor(){
     this.foodStock = 20 
    this.lastFed
    this.milkbottle = loadImage("images/milk.png")
    this.sleepingroom = loadImage("images/bedroom_img.jpg")
    this.ground = loadImage("images/ground.jpg")
    this.bath = loadImage("images/washroom.jpg")
    }

   
    getFoodStock(){
       return this.foodStock
    }

   

    deductFoodStock(){
     if(this.foodStock > 0){
       this.foodStock = this.foodStock - 1
     }
    }



    updateFoodStock(foodStock){
        this.foodStock = foodStock
     }

     getFedTime(lastFed){
      this.lastFed = lastFed;
     }


     garden(){
        background(this.ground,550,500) 
     }

     bedroom(){
      background(this.sleepingroom,550,500)
     }

     washroom(){
         background(this.bath,550,500)
     }

    display(){
        var x = 80
        var y = 100
        image(this.milkbottle,20,200,50,50)
        if(this.foodStock != 0){
         for(var i = 0 ; i <this.foodStock ; i++){
             if(i%10 === 0){
              x = 80
              y = y+50;
             }
             image(this.milkbottle,x,y,50,50)
            x = x+30
         }
        }
        
    } 
}