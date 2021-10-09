document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit);
let blackjackgame={'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
'wins':0,
'loses':0,
'draws':0,
'isStand':false,
'turnsOver':false};
const YOU=blackjackgame['you'];
const DEALER=blackjackgame['dealer'];
const hitSound=new Audio('file:///C:/Users/KIIT/Desktop/index.html/swish.m4a');
const winSound=new Audio('file:///C:/Users/KIIT/Desktop/index.html/cash.mp3');
const lossSound=new Audio('file:///C:/Users/KIIT/Desktop/index.html/aww.mp3');
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerlogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
function blackjackhit()
{
    let card=randomcard();
    console.log(card);
    showcard(card,YOU);
    updatescore(card,YOU);
    showscore(YOU);
}
function showcard(card,activePlayer)
{
    if(activePlayer['score']<=21)
    {
    let cardimage=document.createElement('img');
    cardimage.src='file:///C:/Users/KIIT/Desktop/index.html/'+card+'.png';
    document.querySelector(activePlayer['div']).appendChild(cardimage);
    hitSound.play();
    }
}
function blackjackDeal()
{
    let winner=computewinner();
    showresult(winner);

    let yourimages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerimages=document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0;i<yourimages.length;i++)
    {
        yourimages[i].remove();
    }
    for (i=0;i<dealerimages.length;i++)
    {
        dealerimages[i].remove();
    }
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='white';
}
function randomcard()
{
    let randomindex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomindex];
}
function updatescore(card,activePlayer)
{
    if(card==='A')
    {
    //in case of ace if adding 11 keeps below 21 then add 11 otherwise add 1
        if(activePlayer['score']+blackjackgame['cardsmap'][card][1]<=21)
        {
            activePlayer['score']+=blackjackgame['cardsmap'][card][1];
        }
        else
        {
            activePlayer['score']+=blackjackgame['cardsmap'][card][0];
        }
    }
    else
    {
        activePlayer['score']+=blackjackgame['cardsmap'][card];
    }
}
function showscore(activePlayer)
{
    if(activePlayer['score']>21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}
function dealerlogic()
{
    let card=randomcard();
    showcard(card,DEALER);
    updatescore(card,DEALER);
    showscore(DEALER);
    if(DEALER['score']>15)
    {
        let winner=computewinner();
        showresult(winner);
    }
}
function computewinner()
{
    let winner;

    if(YOU['score']<=21)
    {
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21))
        {
            console.log('you won!');
            winner=YOU;
            blackjackgame['wins']++;
        }
        else if(YOU['score']<DEALER['score'])
        {
            blackjackgame['loses']++;
            console.log('you lost!');
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score'])
        {
            blackjackgame['draws']++;
            console.log('you drew!')
        }
    }
    else if(YOU['score']>21 && DEALER['score']<=21)
    {
        blackjackgame['loses']++;
        console.log('you lost');
        winner=DEALER;
    }
    else if(YOU['score']>21 && DEALER['score']>21)
    {
        blackjackgame['draws']++;
        console.log('you drew!')
    }
    console.log('winner is',winner);
    return winner;
}
function  showresult(winner)
{
    let message,messagecolor;
    if(winner===YOU)
    {
        document.querySelector('#wins').textContent=blackjackgame['wins']; 
        message='you won';
        messagecolor='green';
        winSound.play();
    }
    else if(winner===DEALER)
    {
        document.querySelector('#loses').textContent=blackjackgame['loses']; 
        message='you lost!';
        messagecolor='red';
        lossSound.play();
    }
    else
    {
        document.querySelector('#draws').textContent=blackjackgame['draws']; 
        message='you drew';
        messagecolor='black';
    }
    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=messagecolor;
}