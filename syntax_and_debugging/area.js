const Area = (width,height)=>{
    return width * height;
}

let width = 100, height =20;

if(Area > 100){
    console.log("the area is large.")
}
else{
    console.log("the area is small.")
}

if (width + height > 100){
    console.log("area is greater than or equal to 100")
}

module.exports = Area;