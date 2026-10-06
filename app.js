const floors={
  1:{label:'GROUND FLOOR',title:'Facilities + 3 Standard rooms',text:'Front office, lobby, housekeeping, public toilets, 3 Standard rooms and the multipurpose hall / ballroom.',alt:'Ground floor plan'},
  2:{label:'FLOOR 2',title:'9 Standard + 1 Deluxe',text:'Ten keys plus one communal area, lift and stair circulation.',alt:'Second floor plan'},
  3:{label:'FLOOR 3',title:'10 Standard + 1 Deluxe',text:'The densest accommodation floor in the current architectural schedule.',alt:'Third floor plan'},
  4:{label:'FLOOR 4',title:'9 Standard + 1 Deluxe',text:'Ten keys plus one communal area, lift and stair circulation.',alt:'Fourth floor plan'},
  5:{label:'FLOOR 5',title:'4 Premium 1 + 2 Premium 2',text:'Premium rooms supported by laundry and rooftop / lifestyle functions.',alt:'Fifth floor plan'}
};

const galleries={
  standard:{
    name:'Standard Room',area:'16.5',monthly:'Rp4.60m',daily:'Rp460k',count:'31 rooms',
    desc:'Compact loft-style planning with a work zone, sleeping area, private bathroom and balcony concept.',
    images:[
      ['assets/rooms/standard/Standard%20passage.jpg','ENTRYWAY / PASSAGE'],
      ['assets/rooms/standard/Standard%20toilet.jpg','BATHROOM / TOILET'],
      ['assets/rooms/standard/Standard%20living%20area.jpg','LIVING AREA'],
      ['assets/rooms/standard/Standard%20loft%20area.jpg','LOFT AREA']
    ]
  },
  deluxe:{
    name:'Deluxe Room',area:'20.4',monthly:'Rp5.00m',daily:'Rp500k',count:'3 rooms',
    desc:'A wider layout that increases living flexibility while retaining the loft-style storage and balcony concept.',
    images:[
      ['assets/rooms/deluxe/Deluxe%20passage.jpg','ENTRYWAY / PASSAGE'],
      ['assets/rooms/deluxe/Deluxe%20toilet.jpg','BATHROOM / TOILET'],
      ['assets/rooms/deluxe/Deluxe%20living%20area.jpg','LIVING AREA'],
      ['assets/rooms/deluxe/Deluxe%20loft.jpg','LOFT AREA']
    ]
  },
  premium1:{
    name:'Premium 1 Room',area:'22.9',monthly:'Rp5.50m',daily:'Rp550k',count:'4 rooms',
    desc:'Top-floor room with more usable floor area and a more premium furniture and storage direction.',
    images:[
      ['assets/rooms/premium1/Premium%201%20vanity%20area.jpg','VANITY / ENTRY AREA'],
      ['assets/rooms/premium1/Premium%201%20toilet.jpg','BATHROOM / TOILET'],
      ['assets/rooms/premium1/Premium%201%20living%20area.jpg','LIVING AREA'],
      ['assets/rooms/premium1/Premium%201%20loft.jpg','LOFT AREA']
    ]
  },
  premium2:{
    name:'Premium 2 Room',area:'26.5',monthly:'Rp5.90m',daily:'Rp590k',count:'2 rooms',
    desc:'The largest room type, designed as the premium end of the current room mix with expanded workspace and storage.',
    images:[
      ['assets/rooms/premium2/Premium%202%20living%20area.jpg','LIVING AREA'],
      ['assets/rooms/premium2/Premium%202%20toilet.jpg','BATHROOM / TOILET'],
      ['assets/rooms/premium2/Premium%202%20loft.jpg','LOFT AREA']
    ]
  },
  facilities:{
    name:'Shared Facilities',area:'',monthly:'Shared amenity',daily:'Conceptual',count:'4 spaces',
    desc:'Shared amenities intended to support convenience, community and the resident experience.',
    images:[
      ['assets/facilities/Gym.jpg','GYM / FITNESS'],
      ['assets/facilities/Laundry%20area.jpg','LAUNDRY AREA'],
      ['assets/facilities/Communal%20area.jpg','COMMUNAL AREA'],
      ['assets/facilities/Front%20office.jpg','FRONT OFFICE']
    ]
  }
};

let galleryKey='standard';
let galleryIndex=0;

function renderGallery(){
  const d=galleries[galleryKey], img=document.getElementById('roomImage');
  if(!img)return;
  const item=d.images[galleryIndex];
  img.style.opacity='.15';
  setTimeout(()=>{img.src=item[0];img.alt=`Conceptual ${d.name} — ${item[1]}`;img.style.opacity='1';},120);

  const area=document.getElementById('roomArea');
  area.innerHTML=galleryKey==='facilities'?'':`${d.area} <span>m²</span>`;
  document.getElementById('roomName').textContent=d.name;
  document.getElementById('roomDescription').textContent=d.desc;
  document.getElementById('roomMonthly').textContent=d.monthly;
  document.getElementById('roomDaily').textContent=d.daily;
  document.getElementById('roomCount').textContent=d.count;
  document.getElementById('galleryCounter').textContent=`${galleryIndex+1} / ${d.images.length}`;
  document.getElementById('galleryCaption').textContent=item[1];

  const dots=document.getElementById('galleryDots');
  dots.innerHTML=d.images.map((_,i)=>`<button class="gallery-dot ${i===galleryIndex?'active':''}" data-gallery-index="${i}" aria-label="Image ${i+1}"></button>`).join('');
  dots.querySelectorAll('.gallery-dot').forEach(btn=>btn.addEventListener('click',()=>{
    galleryIndex=Number(btn.dataset.galleryIndex);renderGallery();
  }));
}

function switchGallery(key){
  galleryKey=key;galleryIndex=0;
  document.querySelectorAll('.room-tab').forEach(b=>b.classList.toggle('active',b.dataset.gallery===key));
  renderGallery();
}

document.querySelectorAll('.room-tab').forEach(btn=>btn.addEventListener('click',()=>switchGallery(btn.dataset.gallery)));
document.querySelector('.gallery-prev')?.addEventListener('click',()=>{
  const n=galleries[galleryKey].images.length;galleryIndex=(galleryIndex-1+n)%n;renderGallery();
});
document.querySelector('.gallery-next')?.addEventListener('click',()=>{
  const n=galleries[galleryKey].images.length;galleryIndex=(galleryIndex+1)%n;renderGallery();
});

document.querySelectorAll('.floor-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.floor-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const n=btn.dataset.floor,d=floors[n],img=document.getElementById('floorImage');
  img.style.opacity='.15';
  setTimeout(()=>{
    img.src=`assets/floor-${n}.webp`;img.alt=d.alt;
    document.getElementById('floorLabel').textContent=d.label;
    document.getElementById('floorTitle').textContent=d.title;
    document.getElementById('floorText').textContent=d.text;
    img.style.opacity='1';
  },150);
}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

window.addEventListener('scroll',()=>document.getElementById('nav')?.classList.toggle('scrolled',window.scrollY>30),{passive:true});

const hero=document.getElementById('heroVideo');
if(hero)hero.addEventListener('loadedmetadata',()=>{if(hero.currentTime<1)hero.currentTime=8});

function drawChart(){
  const canvas=document.getElementById('cashflowChart');if(!canvas)return;
  const dpr=window.devicePixelRatio||1,rect=canvas.getBoundingClientRect();
  canvas.width=rect.width*dpr;canvas.height=rect.height*dpr;
  const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
  const data=[1.186,1.137,1.196,1.184,1.245,1.232,1.295,1.281,1.346,1.332],labels=['Y1','Y2','Y3','Y4','Y5','Y6','Y7','Y8','Y9','Y10'];
  const w=rect.width,h=rect.height,p={l:42,r:18,t:26,b:34},cw=w-p.l-p.r,ch=h-p.t-p.b,max=1.5;
  ctx.clearRect(0,0,w,h);ctx.font='10px DM Sans';ctx.fillStyle='#77827d';ctx.textAlign='right';
  for(let i=0;i<=3;i++){
    const val=max-i*.5,y=p.t+(ch/3)*i;ctx.fillText(val.toFixed(1),p.l-10,y+3);
    ctx.strokeStyle='#d8e0da';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(w-p.r,y);ctx.stroke();
  }
  const gap=9,bw=(cw-gap*(data.length-1))/data.length;
  data.forEach((v,i)=>{
    const x=p.l+i*(bw+gap),bh=(v/max)*ch,y=p.t+ch-bh,grad=ctx.createLinearGradient(0,y,0,p.t+ch);
    grad.addColorStop(0,'#286b58');grad.addColorStop(1,'#84aa6e');ctx.fillStyle=grad;roundRect(ctx,x,y,bw,bh,7);ctx.fill();
    ctx.fillStyle='#77827d';ctx.textAlign='center';ctx.fillText(labels[i],x+bw/2,h-12);
  });
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
window.addEventListener('resize',drawChart);
drawChart();
renderGallery();
