


function posicionDeNota(index){
    return [3,10,17,24,32,44,51.5,58.5,65.5,72.5,79.5,88][index];
}

class Nota{
    constructor(index,time){
        this.index=index;
        this.time=time;
    }

    play(){
        console.log( this );
    }

    static happyBirthday(){
        var PlacesCumpleañosfeliz = [0  ,0  ,2,0,5,4,0  ,0  ,2,0,7,5,0  ,0  ,11,9,5,4,2,11 ,11 ,9,5,7,5];
        var timesCumpleañosfeliz =  [0.5,0.5,1,1,1,2,0.5,0.5,1,1,1,2,0.5,0.5,1 ,1,1,1,1,0.5,0.5,1,1,1,2];

        let ret = []
        for( let i = 0 ; i < timesCumpleañosfeliz.length ; i++ ){
            ret.push( new Nota(PlacesCumpleañosfeliz[i], timesCumpleañosfeliz[i]));
        }
    }
}

class Pelota{
    constructor(x,y,elem){
        this.elem = elem;
        gotTo(x,y);
        this.fps = 20;
        this.vx = 0;
        this.vy = 0;
        this.gravity = -200;
        this.yMin = 23;
        this.stopped = true;
    }

    start( song ){
        if( !this.stopped ){
            return;
        }
        this.song = song;
        let primeraNota = song[0];
        this.goTo(posicionDeNota(primeraNota.index),yMin);
        tocaNota(primeraNota);
        this.songIndex = 0;
        this.interval = setInterval(this.tick,1000/this.fps);
        this.stopped = false;
    }

    stop(){
        clearInterval(this.interval);
        this.stopped = true;   
    }

    goTo(x,y){
        y = Math.max(y,yMin);
        this.elem.style.bottom = y + "%";
        this.elem.style.left = x + "%";
        this.x = x;
        this.y = y;
    }

    kickTo(x,time){
        this.y = this.yMin;
        this.vx = (x-this.x)/time;
        this.vy = -time*this.gravity;
    }

    updatePosition(){
        let x = this.x + this.vx/this.fps;
        let y = this.y + this.vy/this.fps;
        goTo(x,y);
    }

    updateSpeed(){
        this.vy += this.gravity/this.fps;
    }

    tick(){
        if( this.stopped ){
            return;
        }
        this.updatePosition();
        this.updateSpeed();
    }
}


