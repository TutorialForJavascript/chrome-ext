let btn_move = (el:HTMLElement, mouseLeft:number, mouseTop:number)=>{
    let leftRnd = (Math.random()-0.5)*20
    let topRnd = (Math.random()-0.5)*20
    let btnLeft = mouseLeft+(leftRnd>0?100:-100)+leftRnd
    let btnTop = mouseTop+(topRnd>0?30:-30)+topRnd
    btnLeft = btnLeft<100?(btnLeft+window.innerWidth-200):(btnLeft>window.innerWidth-100?btnLeft-window.innerWidth+200:btnLeft)
    btnTop =  btnTop<100?( btnTop+window.innerHeight-200):(btnTop>window.innerHeight-100?btnTop-window.innerHeight+200:btnTop)
    el.style.position = 'fixed'
    el.style.left = btnLeft+'px'
    el.style.top = btnTop+'px'
}

function over_btn(e:any){
    if(!e){
      e = window.event
    }
    btn_move(this, e.clientX, e.clientY)
}

let ele = document.getElementById('su')

console.log(ele.toString())
ele.onmouseover = over_btn
