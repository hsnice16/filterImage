
var image = null ;
var canvas1 = null ;
var canvas2 = null ;
var check = false ;
var name = null ;
var temp_img = null ;

function loadImage() {

    let fileInput = document.getElementById("Image") ;
    
    if (fileInput.value !== "") {
        image = new SimpleImage(fileInput) ;
        temp_img = new SimpleImage(fileInput) ;
        image.drawTo(canvas1) ;
    } else {

        for (let pixel of temp_img.values()) {

            image.setPixel(pixel.getX(), pixel.getY(), pixel) ;

        }

    }
}

document.addEventListener('DOMContentLoaded', () => {

    canvas1 = document.getElementById('canvas1') ;
    canvas2 = document.getElementById('canvas2') ;

    // upload image
    document.querySelector('#Image').onchange =  loadImage ;

    // grayscale filter
    document.getElementById('grayscale').onclick = () => {

        if (image !== null) {

            check = true ;

            // iterate over every pixel of image
            for(let pixel of image.values()) {
    
                //average of rgb value
                const avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3 ;
                pixel.setRed(avg) ;
                pixel.setBlue(avg) ;
                pixel.setGreen(avg) ;
            }

            // draw grayscale filter version of image to canvas
            image.drawTo(canvas2) ;
            name = 'grayscaleImg.png'
        }

    } ;

    // red filter
    document.getElementById('red').onclick = () => {

        if (image !== null) {

            check = true ;

            for(let pixel of image.values()) {

                // average of the rgb value of the pixel
                const avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
                
                if(avg < 128) {
                    pixel.setRed(2*avg) ;
                    pixel.setGreen(0) ;
                    pixel.setBlue(0) ;
                }else{
                    pixel.setRed(255) ;
                    pixel.setGreen(2*avg-255) ;
                    pixel.setBlue(2*avg-255) ;
                }
            }

            // draw red filter version of image to canvas
            image.drawTo(canvas2) ;
            name = 'redImg.png'
        }

    } ;

    // negative filter
    document.getElementById('negative').onclick = () => {

        if (image !== null) {

            check = true ;

            // iterate over every pixel of image
            for(let pixel of image.values()){

                pixel.setRed(255 - pixel.getRed());
                pixel.setBlue(255 - pixel.getBlue());
                pixel.setGreen(255 - pixel.getGreen());
            }

            // draw grayscale filter version of image to canvas
            image.drawTo(canvas2);
            name = 'negativeImg.png'
        }

    } ;

    // crayon form filter
    document.getElementById('crayon').onclick = () => {

        if (image !== null) {

            check = true ;

            for(let pixel of image.values()){

                // random number between 0 and 1
                let rand = Math.random() ;
                const xCoord = pixel.getX() ;
                const yCoord = pixel.getY() ;
                
                if(rand >= 0.5){
                    const x = getNearByXcoordinate(xCoord) ;
                    const y = getNearByYcoordinate(yCoord) ;
                    pixel = image.getPixel(x,y) ;  
                    image.setPixel(xCoord, yCoord, pixel) ;
                }
            }

            // draw crayonImg to canvas
            image.drawTo(canvas2) ;
            name = 'crayonImg.png' ;
        }

    } ;

    // rainbow filter
    document.getElementById('rainbow').onclick = () => {

        if (image !== null) {

            check = true ;

            // 1/7 th value of canvas height
            let height = canvas1.height / 7 ;
            
            for(let pixel of image.values()) {
                const avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3 ;
                
                if (avg > 128) {
                    if (pixel.getY() <= height) {
                        // red
                        pixel.setRed(2 * avg) ;
                    } else if (pixel.getY() > height && pixel.getY() <= 2*height) {
                        // orange
                        pixel.setRed(2 * avg) ;
                        pixel.setGreen(0.8 * avg) ;
                    } else if (pixel.getY() > 2*height && pixel.getY() <= 3*height) {
                        // yellow
                        pixel.setRed(2 * avg) ;
                        pixel.setGreen(2 * avg) ;
                    } else if (pixel.getY() > 3*height && pixel.getY() <= 4*height) {
                        //green
                        pixel.setGreen(2 * avg) ;
                    } else if (pixel.getY() > 4*height && pixel.getY() <= 5*height) {
                        // blue
                        pixel.setBlue(2 * avg) ;
                    } else if (pixel.getY() > 5*height && pixel.getY() <= 6*height) {
                        // indigo
                        pixel.setRed(0.8 * avg) ;
                        pixel.setBlue(2 * avg) ;
                    } else {
                        // violet
                        pixel.setRed(0.6 * avg) ;
                        pixel.setBlue(1.6 * avg) ;
                    }
                } else {
                    if (pixel.getY() <= height) {
                        // red
                        pixel.setRed(255) ;
                        pixel.setGreen(2 * avg-255) ;
                        pixel.setBlue(2 * avg-255) ;
                    } else if (pixel.getY() > height && pixel.getY() <= 2*height) {
                        // orange
                        pixel.setRed(255) ;
                        pixel.setGreen(1.2 * avg-51) ;
                        pixel.setBlue(2 * avg-255) ;
                    } else if (pixel.getY() > 2*height && pixel.getY() <= 3*height) {
                        // yellow
                        pixel.setRed(255) ;
                        pixel.setGreen(255) ;
                        pixel.setBlue(2 * avg-255) ;
                    } else if (pixel.getY() > 3*height && pixel.getY() <= 4*height) {
                        //green
                        pixel.setRed(2 * avg-255) ;
                        pixel.setGreen(255) ;
                        pixel.setBlue(2 * avg-255) ;
                    } else if (pixel.getY() > 4*height && pixel.getY() <= 5*height) {
                        // blue
                        pixel.setRed(2 * avg-255) ;
                        pixel.setGreen(2 * avg-255) ;
                        pixel.setBlue(255) ;
                    } else if (pixel.getY() > 5*height && pixel.getY() <= 6*height) {
                        // indigo
                        pixel.setRed(1.2 * avg-51) ;
                        pixel.setGreen(2 * avg-255) ;
                        pixel.setBlue(255) ;
                    } else {
                        // violet
                        pixel.setRed(0.4 * avg+153) ;
                        pixel.setGreen(2 * avg-255) ;
                        pixel.setBlue(0.4 * avg+153) ;
                    }
                }
            }
  
            // draw the rainbow to canvas
            image.drawTo(canvas2);
            name = 'rainbowImg.png' ;
        }

    } ;

    // clear filter
    document.getElementById('clearfilter').onclick = () => {

        if (check !== false) {
            check = false ;
            document.getElementById('Download').href = "#" ;
            let ctx = canvas2.getContext("2d") ;
            ctx.clearRect(0, 0, canvas2.width, canvas2.height) ;
            name = null ;
            loadImage() ;
        }

    } ;

    // download
    document.getElementById('Download').onclick = () => {

        if(check !== false) {
            document.getElementById('Download').download = name;
            document.getElementById('Download').href = canvas2.toDataURL();
        } else {
            console.log('no filter!') ;
            document.getElementById('Download').href = "#" ;
        }
    
    } ;

}) ;

function getNearByXcoordinate(xCoord) {
    // random number between 0 and 10
    let rand = Math.random()*10 ;
    
    while(rand >= 0) {

        if(rand+xCoord < canvas1.width) {
            return rand+xCoord ;
        } else {
            rand-- ;
        }
    }
}

function getNearByYcoordinate(yCoord) {
    // random number between 0 and 10
    let rand = Math.random()*10 ;
  
    while(rand >= 0) {
        if(rand+yCoord < canvas1.height) {
            return rand+yCoord ;
        } else {
            rand-- ;
        }
    }
}
