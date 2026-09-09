var b=Object.defineProperty;var S=(r,e,t)=>e in r?b(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var n=(r,e,t)=>S(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(l){if(l.ep)return;l.ep=!0;const o=t(l);fetch(l.href,o)}})();class M{constructor(){n(this,"ctx",null);n(this,"soundEnabled",!0);n(this,"bgmInterval",null);n(this,"noteIdx",0);n(this,"winterMelody",[523.25,659.25,783.99,987.77,1046.5,783.99,659.25,587.33,523.25,698.46,880,1046.5,880,698.46,659.25,587.33])}getContext(){if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;this.ctx=new e}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}isEnabled(){return this.soundEnabled}toggle(){if(this.soundEnabled=!this.soundEnabled,!this.soundEnabled)this.stopBGM();else{try{const e=this.getContext();e.state==="suspended"&&e.resume()}catch{return!1}this.startBGM(),this.playTone(587.33,.15,"triangle")}return this.soundEnabled}playTone(e,t=.15,s="sine",l=.12){if(this.soundEnabled)try{const o=this.getContext(),a=o.createOscillator(),c=o.createGain();a.type=s,a.frequency.setValueAtTime(e,o.currentTime),c.gain.setValueAtTime(l,o.currentTime),c.gain.exponentialRampToValueAtTime(1e-4,o.currentTime+t),a.connect(c),c.connect(o.destination),a.start(),a.stop(o.currentTime+t)}catch{return}}playMatch(e,t){if(!this.soundEnabled)return;const s=520+Math.min(e,15)*45;t?(this.playTone(s,.22,"triangle",.16),setTimeout(()=>this.playTone(s*1.25,.18,"sine",.14),45),setTimeout(()=>this.playTone(s*1.5,.25,"sine",.12),90)):(this.playTone(s,.18,"sine",.14),setTimeout(()=>this.playTone(s*1.25,.15,"sine",.1),50))}playMiss(){this.soundEnabled&&(this.playTone(196,.22,"sawtooth",.12),setTimeout(()=>this.playTone(146.83,.28,"sawtooth",.14),70))}playLevelUp(){if(!this.soundEnabled)return;[523.25,659.25,783.99,1046.5,1318.51].forEach((t,s)=>{setTimeout(()=>this.playTone(t,.2,"triangle",.15),s*75)})}playGameOver(){if(!this.soundEnabled)return;[440,392,349.23,293.66].forEach((t,s)=>{setTimeout(()=>this.playTone(t,.3,"sawtooth",.12),s*110)})}playReward(e){this.soundEnabled&&(e==="crystal"?this.playTone(784,.15,"sine",.12):(this.playTone(987.77,.18,"sine",.15),setTimeout(()=>this.playTone(1318.51,.22,"triangle",.13),60)))}startBGM(){!this.soundEnabled||this.bgmInterval||(this.bgmInterval=window.setInterval(()=>{if(!this.soundEnabled)return;const e=this.winterMelody[this.noteIdx%this.winterMelody.length];this.playTone(e,.45,"sine",.025),this.noteIdx++},480))}stopBGM(){this.bgmInterval&&(clearInterval(this.bgmInterval),this.bgmInterval=null)}}const h=new M;class E{constructor(e){n(this,"canvas");n(this,"ctx");n(this,"flakes",[]);n(this,"sparkles",[]);n(this,"width",0);n(this,"height",0);n(this,"animationId",null);n(this,"maxFlakes",75);n(this,"loop",()=>{this.update(),this.render(),this.animationId=requestAnimationFrame(this.loop)});const t=document.getElementById(e);if(!t)throw new Error(`Canvas #${e} not found`);this.canvas=t;const s=this.canvas.getContext("2d");if(!s)throw new Error("Canvas 2D context not supported");this.ctx=s,this.resize(),window.addEventListener("resize",()=>this.resize()),this.initFlakes(),this.start()}resize(){const e=window.devicePixelRatio||1;this.width=window.innerWidth,this.height=window.innerHeight,this.canvas.width=this.width*e,this.canvas.height=this.height*e,this.canvas.style.width=`${this.width}px`,this.canvas.style.height=`${this.height}px`,this.ctx.scale(e,e)}initFlakes(){this.flakes=[];for(let e=0;e<this.maxFlakes;e++)this.flakes.push(this.createFlake(Math.random()*this.height))}createFlake(e){const t=Math.random()<.3?1:Math.random()<.7?2:3,s=t===1?Math.random()*1.5+1:t===2?Math.random()*2+1.8:Math.random()*3.2+2.5,l=t===1?Math.random()*.5+.4:t===2?Math.random()*1+.8:Math.random()*1.8+1.2;return{x:Math.random()*this.width,y:e!==void 0?e:-10,radius:s,density:Math.random()*20,alpha:t===1?Math.random()*.3+.2:t===2?Math.random()*.4+.3:Math.random()*.5+.4,speedY:l,speedX:(Math.random()-.5)*.6,driftAngle:Math.random()*Math.PI*2,layer:t}}triggerBurst(e,t,s="#7dd3fc",l=24){for(let o=0;o<l;o++){const a=Math.PI*2*o/l+(Math.random()-.5)*.5,c=Math.random()*6+2;this.sparkles.push({x:e,y:t,vx:Math.cos(a)*c,vy:Math.sin(a)*c,alpha:1,size:Math.random()*3.5+2,color:s})}}update(){for(let e=0;e<this.flakes.length;e++){const t=this.flakes[e];t.driftAngle+=.015,t.y+=t.speedY,t.x+=Math.sin(t.driftAngle)*.8+t.speedX,(t.y>this.height+15||t.x<-20||t.x>this.width+20)&&(this.flakes[e]=this.createFlake(-10))}for(let e=this.sparkles.length-1;e>=0;e--){const t=this.sparkles[e];t.x+=t.vx,t.y+=t.vy,t.vy+=.12,t.vx*=.96,t.alpha-=.025,t.alpha<=0&&this.sparkles.splice(e,1)}}render(){this.ctx.clearRect(0,0,this.width,this.height);for(let e=0;e<this.flakes.length;e++){const t=this.flakes[e];this.ctx.beginPath(),this.ctx.arc(t.x,t.y,t.radius,0,Math.PI*2),this.ctx.fillStyle=`rgba(255, 255, 255, ${t.alpha})`,this.ctx.shadowBlur=t.layer===3?8:2,this.ctx.shadowColor="rgba(186, 230, 253, 0.8)",this.ctx.fill()}this.ctx.shadowBlur=10;for(let e=0;e<this.sparkles.length;e++){const t=this.sparkles[e];this.ctx.beginPath(),this.ctx.arc(t.x,t.y,t.size,0,Math.PI*2),this.ctx.fillStyle=t.color,this.ctx.shadowColor=t.color,this.ctx.globalAlpha=Math.max(0,t.alpha),this.ctx.fill()}this.ctx.globalAlpha=1,this.ctx.shadowBlur=0}start(){this.animationId||(this.animationId=requestAnimationFrame(this.loop))}stop(){this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null)}}const p={star:{id:"star",title:"Star Gem",cssClass:"from-sky-500 via-blue-600 to-indigo-700",borderClass:"border-sky-300",color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.75)",hotkey:"1",badgeBg:"bg-cyan-100",badgeText:"text-sky-950",gemSvg:`<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="starGemFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#0284c7" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#0369a1" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <polygon points="50,6 92,26 80,90 20,90 8,26" fill="url(#starGemFacet)" stroke="#e0f2fe" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,14 84,30 74,82 26,82 16,30" fill="none" stroke="#bae6fd" stroke-width="1.2" stroke-opacity="0.6"/>
      <g stroke="#ffffff" stroke-width="3" stroke-linecap="round">
        <line x1="50" y1="26" x2="50" y2="74"/>
        <line x1="26" y1="38" x2="74" y2="62"/>
        <line x1="26" y1="62" x2="74" y2="38"/>
      </g>
      <g stroke="#ffffff" stroke-width="2.5" stroke-linecap="round">
        <polyline points="44,32 50,26 56,32" fill="none"/>
        <polyline points="44,68 50,74 56,68" fill="none"/>
        <polyline points="32,36 26,38 30,44" fill="none"/>
        <polyline points="68,64 74,62 70,56" fill="none"/>
        <polyline points="30,56 26,62 32,64" fill="none"/>
        <polyline points="70,44 74,38 68,36" fill="none"/>
      </g>
      <polygon points="50,42 58,50 50,58 42,50" fill="#ffffff"/>
    </svg>`,svg:"",fallingSvg:`<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl">
      <defs>
        <filter id="starIceGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffffff" flood-opacity="0.85"/>
        </filter>
      </defs>
      <g filter="url(#starIceGlow)">
        <circle cx="50" cy="50" r="46" fill="#ffffff" fill-opacity="0.08"/>
        <g stroke="#ffffff" stroke-width="4.5" stroke-linecap="round">
          <line x1="50" y1="8" x2="50" y2="92"/>
          <line x1="14" y1="29" x2="86" y2="71"/>
          <line x1="14" y1="71" x2="86" y2="29"/>
        </g>
        <g stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none">
          <polyline points="42,18 50,10 58,18"/>
          <polyline points="42,82 50,90 58,82"/>
          <polyline points="22,25 15,30 20,37"/>
          <polyline points="78,75 85,70 80,63"/>
          <polyline points="20,63 15,70 22,75"/>
          <polyline points="80,37 85,30 78,25"/>
          <polyline points="44,28 50,22 56,28"/>
          <polyline points="44,72 50,78 56,72"/>
          <polyline points="30,35 25,39 29,45"/>
          <polyline points="70,65 75,61 71,55"/>
          <polyline points="29,55 25,61 30,65"/>
          <polyline points="71,45 75,39 70,35"/>
        </g>
        <circle cx="50" cy="50" r="13" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <polygon points="50,42 58,50 50,58 42,50" fill="#ffffff"/>
      </g>
    </svg>`},flower:{id:"flower",title:"Flower Gem",cssClass:"from-fuchsia-500 via-purple-600 to-indigo-700",borderClass:"border-fuchsia-300",color:"#d946ef",glowColor:"rgba(217, 70, 239, 0.75)",hotkey:"2",badgeBg:"bg-fuchsia-100",badgeText:"text-purple-950",gemSvg:`<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="flowerGemFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e879f9" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#c026d3" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#9333ea" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="url(#flowerGemFacet)" stroke="#fae8ff" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,14 80,32 80,68 50,86 20,68 20,32" fill="none" stroke="#f5d0fe" stroke-width="1.2" stroke-opacity="0.6"/>
      <g stroke="#ffffff" stroke-width="3" stroke-linecap="round">
        <line x1="50" y1="26" x2="50" y2="74"/>
        <line x1="26" y1="36" x2="74" y2="64"/>
        <line x1="26" y1="64" x2="74" y2="36"/>
      </g>
      <circle cx="50" cy="24" r="5" fill="#ffffff"/>
      <circle cx="50" cy="76" r="5" fill="#ffffff"/>
      <circle cx="24" cy="35" r="5" fill="#ffffff"/>
      <circle cx="76" cy="65" r="5" fill="#ffffff"/>
      <circle cx="24" cy="65" r="5" fill="#ffffff"/>
    <circle cx="76" cy="35" r="5" fill="#ffffff"/>
      <circle cx="50" cy="50" r="9" fill="#ffffff"/>
      <circle cx="50" cy="50" r="4.5" fill="#c026d3"/>
    </svg>`,svg:"",fallingSvg:`<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl">
      <defs>
        <filter id="flowerIceGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffffff" flood-opacity="0.85"/>
        </filter>
      </defs>
      <g filter="url(#flowerIceGlow)">
        <circle cx="50" cy="50" r="46" fill="#ffffff" fill-opacity="0.08"/>
        <g stroke="#ffffff" stroke-width="4" stroke-linecap="round">
          <line x1="50" y1="12" x2="50" y2="88"/>
          <line x1="17" y1="31" x2="83" y2="69"/>
          <line x1="17" y1="69" x2="83" y2="31"/>
        </g>
        <circle cx="50" cy="12" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="50" cy="88" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="17" cy="31" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="83" cy="69" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="17" cy="69" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="83" cy="31" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="50" cy="30" r="4.5" fill="#ffffff"/>
        <circle cx="50" cy="70" r="4.5" fill="#ffffff"/>
        <circle cx="33" cy="40" r="4.5" fill="#ffffff"/>
        <circle cx="67" cy="60" r="4.5" fill="#ffffff"/>
        <circle cx="33" cy="60" r="4.5" fill="#ffffff"/>
        <circle cx="67" cy="40" r="4.5" fill="#ffffff"/>
        <circle cx="50" cy="50" r="14" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <circle cx="50" cy="50" r="6" fill="#ffffff"/>
      </g>
    </svg>`},needle:{id:"needle",title:"Needle Gem",cssClass:"from-emerald-400 via-teal-500 to-emerald-700",borderClass:"border-emerald-300",color:"#10b981",glowColor:"rgba(16, 185, 129, 0.75)",hotkey:"3",badgeBg:"bg-emerald-100",badgeText:"text-emerald-950",gemSvg:`<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="needleGemFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34d399" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#059669" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#047857" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <polygon points="50,6 88,32 72,94 28,94 12,32" fill="url(#needleGemFacet)" stroke="#d1fae5" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,14 78,36 66,86 34,86 22,36" fill="none" stroke="#a7f3d0" stroke-width="1.2" stroke-opacity="0.6"/>
      <g stroke="#ffffff" stroke-width="3" stroke-linecap="round">
        <line x1="50" y1="20" x2="50" y2="80"/>
        <line x1="28" y1="50" x2="72" y2="50"/>
      </g>
      <g stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none">
        <polyline points="44,28 50,20 56,28"/>
        <polyline points="44,72 50,80 56,72"/>
        <polyline points="36,44 28,50 36,56"/>
        <polyline points="64,44 72,50 64,56"/>
        <polyline points="42,42 50,34 58,42"/>
        <polyline points="42,58 50,66 58,58"/>
      </g>
      <polygon points="50,44 56,50 50,56 44,50" fill="#ffffff"/>
    </svg>`,svg:"",fallingSvg:`<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl">
      <defs>
        <filter id="needleIceGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffffff" flood-opacity="0.85"/>
        </filter>
      </defs>
      <g filter="url(#needleIceGlow)">
        <circle cx="50" cy="50" r="46" fill="#ffffff" fill-opacity="0.08"/>
        <g stroke="#ffffff" stroke-width="4.5" stroke-linecap="round">
          <line x1="50" y1="8" x2="50" y2="92"/>
          <line x1="18" y1="50" x2="82" y2="50"/>
        </g>
        <g stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none">
          <polyline points="40,20 50,8 60,20"/>
          <polyline points="40,80 50,92 60,80"/>
          <polyline points="30,40 18,50 30,60"/>
          <polyline points="70,40 82,50 70,60"/>
          <polyline points="42,32 50,24 58,32"/>
          <polyline points="42,68 50,76 58,68"/>
          <polyline points="38,42 30,50 38,58"/>
          <polyline points="62,42 70,50 62,58"/>
          <polyline points="44,40 50,34 56,40"/>
          <polyline points="44,60 50,66 56,60"/>
        </g>
        <polygon points="50,38 62,50 50,62 38,50" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <polygon points="50,44 56,50 50,56 44,50" fill="#ffffff"/>
      </g>
    </svg>`}};p.star.svg=p.star.gemSvg;p.flower.svg=p.flower.gemSvg;p.needle.svg=p.needle.gemSvg;const y=["star","flower","needle"];function T(r){const e=[...r];let t,s=0;do t=[...e].sort(()=>Math.random()-.5),s++;while(t.every((l,o)=>l===r[o])&&s<10);return t}class I{constructor(e){n(this,"state");n(this,"currentFlake",null);n(this,"slotOrder",["star","flower","needle"]);n(this,"callbacks");n(this,"animFrameId",null);n(this,"lastTime",0);n(this,"spawnTimeoutId",null);n(this,"gameLoop",e=>{if(!this.state.isGameRunning||this.state.isGameOver)return;const t=Math.min(Math.max((e-this.lastTime)/16.666,.1),3);if(this.lastTime=e,this.currentFlake){this.currentFlake.y+=this.currentFlake.speed*t,this.currentFlake.rotation+=this.currentFlake.rotationSpeed*t;const s=this.currentFlake.y>=70&&this.currentFlake.y<=88;this.callbacks.onSnowflakeMove(this.currentFlake,s),this.callbacks.onDangerZoneState(s),this.currentFlake.y>96&&this.handleBottomBreach()}this.animFrameId=requestAnimationFrame(this.gameLoop)});this.callbacks=e;const t=parseInt(localStorage.getItem("snowflake_high_score")||"0",10);this.state={score:0,lives:3,maxLives:3,level:1,combo:0,maxCombo:0,highScore:isNaN(t)?0:t,isGameRunning:!1,isGameOver:!1,matchesMade:0,perfectCatches:0,crystalsHarvested:2450,gemsEarned:180}}getState(){return this.state}getSlotOrder(){return[...this.slotOrder]}start(){this.stop(),this.state.score=0,this.state.lives=3,this.state.level=1,this.state.combo=0,this.state.matchesMade=0,this.state.perfectCatches=0,this.state.isGameRunning=!0,this.state.isGameOver=!1,this.callbacks.onScoreUpdate(this.state.score,this.state.level,this.state.combo),this.callbacks.onLivesUpdate(this.state.lives),this.slotOrder=["star","flower","needle"],this.callbacks.onSlotsShuffled(this.slotOrder),this.lastTime=performance.now(),this.spawnSnowflake(),this.animFrameId=requestAnimationFrame(this.gameLoop)}stop(){this.state.isGameRunning=!1,this.animFrameId&&(cancelAnimationFrame(this.animFrameId),this.animFrameId=null),this.spawnTimeoutId&&(clearTimeout(this.spawnTimeoutId),this.spawnTimeoutId=null),this.currentFlake=null,this.callbacks.onSnowflakeDespawn(),this.callbacks.onDangerZoneState(!1)}spawnSnowflake(){if(!this.state.isGameRunning||this.state.isGameOver)return;const e=y[Math.floor(Math.random()*y.length)],t=.72+Math.min(this.state.level,12)*.1;this.currentFlake={id:Date.now(),type:e,x:50,y:0,speed:t,rotation:0,rotationSpeed:(Math.random()*.9+.5)*(Math.random()>.5?1:-1),size:90}}handleBottomBreach(){this.currentFlake=null,this.callbacks.onSnowflakeDespawn(),this.callbacks.onDangerZoneState(!1),this.state.combo=0,this.state.lives--,this.callbacks.onLivesUpdate(this.state.lives),this.callbacks.onScoreUpdate(this.state.score,this.state.level,this.state.combo),h.playMiss(),this.callbacks.onMatchMiss(),this.state.lives<=0?this.triggerGameOver():this.spawnTimeoutId=window.setTimeout(()=>this.spawnSnowflake(),420)}handleMatchAttempt(e){if(!this.state.isGameRunning||this.state.isGameOver||!this.currentFlake)return;const t=this.currentFlake.y>=70&&this.currentFlake.y<=88;if(e===this.currentFlake.type){this.state.combo++,this.state.combo>this.state.maxCombo&&(this.state.maxCombo=this.state.combo),this.state.matchesMade++;let s=t?250:100;s+=Math.floor(this.state.combo*20),t&&this.state.perfectCatches++,this.state.score+=s,this.state.score>this.state.highScore&&(this.state.highScore=this.state.score,localStorage.setItem("snowflake_high_score",this.state.highScore.toString()));const l=this.state.level;this.state.level=Math.floor(this.state.score/750)+1,this.state.level>l&&h.playLevelUp(),this.callbacks.onMatchSuccess(e,s,t,this.state.combo),this.callbacks.onScoreUpdate(this.state.score,this.state.level,this.state.combo),this.slotOrder=T(this.slotOrder),this.callbacks.onSlotsShuffled(this.slotOrder),this.currentFlake=null,this.callbacks.onSnowflakeDespawn(),this.callbacks.onDangerZoneState(!1),this.spawnTimeoutId=window.setTimeout(()=>this.spawnSnowflake(),360)}else this.state.combo=0,this.state.lives--,this.callbacks.onLivesUpdate(this.state.lives),this.callbacks.onScoreUpdate(this.state.score,this.state.level,this.state.combo),h.playMiss(),this.callbacks.onMatchMiss(),this.state.lives<=0&&this.triggerGameOver()}triggerGameOver(){this.state.isGameOver=!0,this.stop();const e=this.state.score>=this.state.highScore&&this.state.score>0;h.playGameOver(),this.callbacks.onGameOver(this.state.score,e)}}class L{constructor(){n(this,"homeView");n(this,"gameView");n(this,"scoreEl");n(this,"levelEl");n(this,"livesEl");n(this,"flakeContainer");n(this,"dangerLine");n(this,"toastEl");n(this,"buttonsGrid");n(this,"homeSfxBtn");n(this,"gameSfxBtn");n(this,"toastTimer",null);this.homeView=document.getElementById("home-view"),this.gameView=document.getElementById("game-view"),this.scoreEl=document.getElementById("game-score-display"),this.levelEl=document.getElementById("game-level-display"),this.livesEl=document.getElementById("game-lives-display"),this.flakeContainer=document.getElementById("falling-snowflake"),this.dangerLine=document.getElementById("catch-zone-line"),this.toastEl=document.getElementById("arena-toast"),this.buttonsGrid=document.getElementById("buttons-grid"),this.homeSfxBtn=document.getElementById("home-sfx-btn"),this.gameSfxBtn=document.getElementById("game-sfx-btn")}showHome(){this.homeView&&(this.homeView.classList.remove("hidden"),this.homeView.classList.add("flex")),this.gameView&&(this.gameView.classList.add("hidden"),this.gameView.classList.remove("flex"))}showGame(){this.homeView&&(this.homeView.classList.add("hidden"),this.homeView.classList.remove("flex")),this.gameView&&(this.gameView.classList.remove("hidden"),this.gameView.classList.add("flex"))}updateScore(e,t,s){this.scoreEl&&(this.scoreEl.innerText=e.toLocaleString()),this.levelEl&&(this.levelEl.innerText=`Lv. ${t}${s>1?` (${s}x)`:""}`)}updateLives(e){if(!this.livesEl)return;let t="";for(let s=0;s<3;s++)t+=s<e?"<span>💖</span>":'<span class="opacity-30 filter grayscale">🖤</span>';this.livesEl.innerHTML=t}updateSnowflake(e){if(!this.flakeContainer)return;const t=p[e.type];this.flakeContainer.dataset.currentType!==e.type&&(this.flakeContainer.innerHTML=t.fallingSvg,this.flakeContainer.dataset.currentType=e.type),this.flakeContainer.style.top=`${e.y}%`,this.flakeContainer.style.left=`${e.x}%`,this.flakeContainer.style.transform=`translate(-50%, -50%) rotate(${e.rotation}deg)`,this.flakeContainer.style.display="block"}clearSnowflake(){this.flakeContainer&&(this.flakeContainer.style.display="none",delete this.flakeContainer.dataset.currentType)}setDangerZoneActive(e){this.dangerLine&&(e?this.dangerLine.classList.add("active"):this.dangerLine.classList.remove("active"))}showArenaToast(e,t="#93c5fd"){this.toastEl&&(this.toastEl.innerText=e,this.toastEl.style.backgroundColor=t,this.toastEl.classList.remove("hidden"),this.toastTimer&&clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>{this.toastEl&&this.toastEl.classList.add("hidden")},600))}renderButtons(e,t){if(!this.buttonsGrid)return;const s=this.buttonsGrid;s.innerHTML="",e.forEach((l,o)=>{const a=p[l],c=o+1,d=document.createElement("button");d.className=`gem-btn-card relative group flex flex-row items-center justify-center gap-2 sm:gap-3.5 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${a.cssClass} border-2 sm:border-3 ${a.borderClass} text-white font-fredoka shadow-xl active:scale-95 cursor-pointer select-none transition-all duration-150`,d.setAttribute("data-shape",l),d.innerHTML=`
        <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-0.5 rounded-full ${a.badgeBg} ${a.badgeText} border-2 border-white font-fredoka font-black text-[10px] sm:text-xs shadow tracking-wide whitespace-nowrap">
          KEY [${c}]
        </span>
        <div class="w-8 h-8 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center filter drop-shadow group-hover:scale-110 transition-transform">
          ${a.gemSvg}
        </div>
        <span class="text-sm sm:text-lg font-black tracking-wide drop-shadow whitespace-nowrap font-fredoka text-white">
          ${a.title}
        </span>
      `,d.onclick=u=>{u.preventDefault(),t(l)},s.appendChild(d)})}updateAudioButtons(e){const t=e?"🔊":"🔇",s=e?"Mute Sound":"Unmute Sound";this.homeSfxBtn&&(this.homeSfxBtn.innerText=t,this.homeSfxBtn.title=s),this.gameSfxBtn&&(this.gameSfxBtn.innerText=t,this.gameSfxBtn.title=s)}showGameOver(e,t,s,l){const o=document.getElementById("game-over-modal");if(!o)return;const a=document.getElementById("game-over-score");a&&(a.innerText=e.toLocaleString());const c=document.getElementById("game-over-high-notice");c&&(t?c.classList.remove("hidden"):c.classList.add("hidden"));const d=document.getElementById("btn-retry-game");d&&(d.onclick=()=>{o.classList.add("hidden"),o.classList.remove("flex"),s()});const u=document.getElementById("btn-menu-game");u&&(u.onclick=()=>{o.classList.add("hidden"),o.classList.remove("flex"),l()}),o.classList.remove("hidden"),o.classList.add("flex")}openModal(e){const t=document.getElementById(e);t&&(t.classList.remove("hidden"),t.classList.add("flex"),h.playTone(600,.08,"sine"))}closeModal(e){const t=document.getElementById(e);t&&(t.classList.add("hidden"),t.classList.remove("flex"),h.playTone(400,.08,"sine"))}showNotification(e){const t=document.getElementById("toast-banner"),s=document.getElementById("toast-message");!t||!s||(s.innerText=e,t.classList.remove("-translate-y-24","opacity-0"),t.classList.add("translate-y-0","opacity-100"),setTimeout(()=>{t.classList.remove("translate-y-0","opacity-100"),t.classList.add("-translate-y-24","opacity-0")},2200))}}let g=null,i=null,f=null,w=2450,x=180,k=0;const m=window;m.switchToGame=()=>{h.playTone(523.25,.12,"sine"),i&&i.showGame(),f&&f.start()};m.switchToHome=()=>{h.playTone(392,.1,"sine"),f&&f.stop(),i&&i.showHome()};m.toggleSFX=()=>{const r=Date.now();if(r-k<150)return;k=r;const e=h.toggle();i&&(i.updateAudioButtons(e),i.showNotification(e?"Audio ON 🔊":"Audio OFF 🔇"))};m.openHowToPlayModal=()=>{i&&i.openModal("modal-how-to-play")};m.openDailyGiftsModal=()=>{i&&i.openModal("modal-daily-gifts")};m.closeModal=r=>{i&&i.closeModal(r)};m.addCurrency=(r,e)=>{if(r==="crystals"){w+=e;const t=document.getElementById("snow-crystals-count");t&&(t.innerText=w.toLocaleString()),h.playReward("crystal"),i&&i.showNotification(`+${e} Snow Crystals harvested! ❄️`)}else{x+=e;const t=document.getElementById("magic-gems-count");t&&(t.innerText=x.toLocaleString()),h.playReward("gem"),i&&i.showNotification(`+${e} Magic Gems received! 💎`)}};function v(){try{g=new E("snowfall-canvas")}catch{g=null}i=new L,f=new I({onScoreUpdate:(e,t,s)=>{i&&i.updateScore(e,t,s)},onLivesUpdate:e=>{i&&i.updateLives(e)},onSnowflakeMove:e=>{i&&i.updateSnowflake(e)},onSnowflakeDespawn:()=>{i&&i.clearSnowflake()},onSlotsShuffled:e=>{i&&i.renderButtons(e,t=>{f&&f.handleMatchAttempt(t)})},onMatchSuccess:(e,t,s,l)=>{if(h.playMatch(l,s),i&&i.showArenaToast(s?"DANGER ZONE HIT! ✨":`MATCH! +${t}`,s?"#fca5a5":"#93c5fd"),g){const o=document.getElementById("arena-box");if(o){const a=o.getBoundingClientRect(),c=s?a.top+a.height*.78:a.top+a.height*.45;g.triggerBurst(a.left+a.width*.5,c,s?"#f87171":"#38bdf8",28)}}},onMatchMiss:()=>{i&&i.showArenaToast("MISS! 💥","#f87171")},onGameOver:(e,t)=>{i&&i.showGameOver(e,t,()=>{f&&f.start()},()=>{i&&i.showHome()})},onDangerZoneState:e=>{i&&i.setDangerZoneActive(e)}}),i.renderButtons(f.getSlotOrder(),e=>{f&&f.handleMatchAttempt(e)});const r=()=>{h.getContext(),h.isEnabled()&&h.startBGM(),window.removeEventListener("click",r),window.removeEventListener("keydown",r)};window.addEventListener("click",r),window.addEventListener("keydown",r),window.addEventListener("keydown",e=>{if(!f)return;if(!f.getState().isGameRunning){e.key==="Enter"&&(i&&i.showGame(),f.start());return}const s=f.getSlotOrder();e.key==="1"&&s[0]?(e.preventDefault(),f.handleMatchAttempt(s[0])):e.key==="2"&&s[1]?(e.preventDefault(),f.handleMatchAttempt(s[1])):e.key==="3"&&s[2]?(e.preventDefault(),f.handleMatchAttempt(s[2])):e.key==="Escape"&&(f.stop(),i&&i.showHome())})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",v):v();
