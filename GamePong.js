let score1=0;
let score2=0;
let Width=600,Height=450;
let upArrow=38,downArrow=40;
let wKey=87,sKey=83;
let pi=Math.PI;
let canvas,ctx, keystate;
let system1,system,ball,box1,box2;
let dx,dy;

system1={
    x:null,
    y:null,
    width:10,
    height:90,
    update:function()
    {
        if(keystate[wKey]) this.y-=7;
        if(keystate[sKey]) this.y+=7;
        this.y=Math.max(Math.min(this.y,Height-this.height),0);

    },

    draw:function()
    {
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
};


system={
    x:null,
    y:null,
    width:10,
    height:90,
    update:function()
    {
        if(keystate[upArrow]) this.y-=7;
        if(keystate[downArrow]) this.y+=7;
        this.y=Math.max(Math.min(this.y,Height-this.height),0);
        this.y=Math.max(Math.min(this.y,Height-this.height),0);
    },

    draw:function()
    {

        ctx.fillRect(this.x,this.y,this.width,this.height);

    }
};

box1={
    x:null,
    y:null,
    width:35,
    height:3,
    update:function()
    {},
    draw:function()
    {
        ctx.fillRect(this.x,this.y,this.width,this.height);
        text('Score:     '+score1,"18px Comic Sans MS",165,33 );
    }
};

box2={
    x:null,
    y:null,
    width:35,
    height:3,
    update:function()
    {},
    draw:function()
    {
        ctx.fillRect(this.x,this.y,this.width,this.height);
//ctx.fillText("score2:  "+score2,(Width/2)+20,15);
        text('Score:     '+score2,"18px Comic Sans MS",(Width/2)+165,33 );
        if(this.x<0)
        {
            ctx.fillText(score2);
        }
    }
};


ball={
    x:Width/2,
    y:Height/2,
    vel:null,
    width:20,
    height:20,
    speed:7,
    side:10,
    startAngle:null,
    EndAngle:null,

    update:function()
    {
        //this.x +=this.vel.x;
        //this.y+=this.vel.y;
        if(this.y<0 || this.y+this.side>Height)
        {
            this.vel.y*=-1;
        }
        let abEndIntersect= (ax,ay,aw,ah,bx,by,bw,bh)=>{
            return ax<bx+bw && ay<by+bh && bx<ax+aw && by<ay+ah;
        }
        let paddle=this.vel.x<0?player:system;
        if(abEndIntersect(paddle.x,paddle.y,paddle.width,paddle.height,this.x,this.y,this.side,this.side))
        {
            this.x=(paddle==player?player.x+player.width:system.x-this.side);
            let angleDefined=(this.y+this.side-paddle.y)/(paddle.height+this.side);
            let angleMov=0.25*pi*(2*angleDefined-1);
            this.vel.x=(paddle===player?1: -1)*this.speed*Math.cos(angleMov);
            this.vel.y=this.speed*Math.sin(angleMov);
        }
        if(score1==5)
        {
            //confirm("Oponent lost.Do you want to play again");
            alert("Oponent Lost");
            alert("Score of Player 1 is:  "+score1+"\nScore of Player 2 is:  "+score2);
            confirm("Do you want to play again");

            if(confirm)
            {
                score1=0;
                score2=0;
                ball.speed=7;
                draw();
            }
            else
            {
                //history.go(-1);
                //window.close();
                location.href='game.html';
            }
        }
        else if(score2==5)
        {
            //confirm("Oponent win.Do you want to play again?");
            alert("Oponent Win");
            alert("Score of Player 1 is:  "+score1+"Score of Player 2 is:  "+score2);
            confirm("Do you want to play again");

            if(confirm)
            {
                score1=0;
                score2=0;
                ball.speed=7;
                draw();
            }
            else
            {
                //history.go(-1);
                //window.close();
                location.href='game.html';
            }
        }
        if(this.x+this.side<0||this.x>Width)
        {
            if(score1==5)
            {
                //confirm("Oponent lost.Do you want to play again");
                alert("Oponent Lost");
                alert("Score of Player 1 is:  "+score1+"\nScore of Player 2 is:  "+score2);
                confirm("Do you want to play again");
                if(confirm)
                {
                    score1=0;
                    score2=0;
                    ball.speed=7;
                    draw();
                }
                else
                {
                    //history.go(-1);
                    // window.close();
                    location.href='game.html';
                }
            }
            else if(score2==5)
            {
                //confirm("Oponent win.Do you want to play again?");
                alert("Oponent Win");
                alert("Score of Player 1 is:  "+score1+"\nScore of Player 2 is:  "+score2);
                confirm("Do you want to play again");
                if(confirm)
                {
                    score1=0;
                    score2=0;
                    ball.speed=7;
                    draw();
                }
                else
                {
                    //history.go(-1);
                    // window.close();
                    location.href='game.html';
                }
            }
            else if(this.x+this.side<0)
            {
                score2++;
                ball.speed++;
                alert("oponent got the point");
            }
            else if(this.x>Width)
            {
                score1++;
                ball.speed++;
                window.alert("You got the point");
            }

            ball.x=(Width-ball.side)/2;
            ball.y=(Height-ball.side)/2;

            ball.vel={
                x:ball.speed,
                y:0
            }
            if(this.x+this.side<0)
            {
                score2++;

            }
            if(this.x>Width)
            {
                score1++;
            }
        }
    },

    draw:function()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.side,this.startAngle,2*Math.PI,true);
        ctx.fill();
        ctx.closePath();
        this.x +=this.vel.x;
        this.y+=this.vel.y;


    },
    drew:function()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.side,this.startAngle,2*Math.PI,true);
        ctx.fill();
        ctx.closePath();
    }
};


main=()=> {
    let MyLibrary
    if (typeof document !== 'undefined') {
        MyLibrary = require('my-library').default
        canvas = document.createElement("canvas");
        canvas.width = Width;
        canvas.height = Height;
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "000000";
        ctx.fillText("Hello world", (Width / 2) + 30, 15);
        document.body.appendChild(canvas);


        keystate = {};
        document.addEventListener("keydown", function (evt) {
            keystate[evt.keyCode] = true;
        });
        document.addEventListener("keyup", function (evt) {
            delete keystate[evt.keyCode];
        });
        init();

        let loop = () => {
            update();
            draw();

            window.requestAnimationFrame(loop, canvas);
        };
        window.requestAnimationFrame(loop, canvas);
    }
}
init=()=>
{

    system1.x=5 ;
    system1.y=(Height-player.height)/2;

    system.x=(Width-(player.width+system.width)/2)-5;
    system.y=(Height-system.height)/2;


    ball.x=(Width-ball.side)/2;
    ball.y=(Height-ball.side)/2;

    box1.x=235;
    box1.y=35;

    box2.x=(Width/2)+235;
    box2.y=35;

    ball.vel={
        x:ball.speed,
        y:0
    }

}

update=()=>
{
    ball.update();
    system1.update();
    system.update();
    box1.update();
    box2.update();
}

draw=()=>
{
    ctx.fillRect(0,0,Width,Height);
    ctx.save();
    ctx.fillStyle="#F1F1F1";



    ball.draw();
    box1.draw();
    box2.draw();
    system1.draw();
    system.draw();

    //text('Score: '+score2,"30px Comic Sans MS",5,50,"blue" );

    let w=4;//w=width;
    let x=Width/2;
    let y=0;
    let step=Height/20;
    while(y<Height)
    {
        ctx.fillRect(x,y+step*0.25,w,step*0.5);
        y+=step;
    }

    ctx.restore();
}

text=(txt,fnt,xx,yy)=>
{
    //ctx.fillStyle=c;
    ctx.font=fnt;
    ctx.fillText(txt,xx,yy);

}

main();