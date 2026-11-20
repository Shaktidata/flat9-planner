/* Unit 10: one-bedroom apartment.
   Plan coordinates in millimetres: +x to the right of the plan, +y up the plan (towards the bedroom).
   Source: the owner's unit plan (Rev C). Sizes come from the plan's dimensions
   (balcony 3810 wide x 2575 deep, side bay 1570 + 209 wall) and room areas; others are scaled from the drawing. */
(function(){
const H=2700, DH=2100, PW=250, EW=200, IW=110;          // party wall, external wall, internal stud wall
// x grid
const x0=PW, xr=x0+3560;                                // main body inner faces (3810 to the outer face of the party wall)
const kx1=x0+2000, bx0=kx1+IW;                          // kitchen | bathroom
const bayX1=xr+1570, bayX2=bayX1+209;                   // living-room side bay
// y grid (bottom of plan = balcony edge)
const balY0=175, balY1=balY0+2575, livY0=balY1+150;     // balcony, sliding door wall SW4
const kitY0=livY0+4225;                                  // ceiling-line where the kitchen starts
const d9Y0=7430, d9Y1=d9Y0+IW, stY1=7990, bathY0=stY1+IW;// D9 doors, linen/broom store, bathroom
const bayY1=7436, bedWallY0=11940, bedY0=bedWallY0+IW, bedY1=bedY0+2650, topY1=bedY1+PW;

const W=(x0,x1,y0,y1,o)=>Object.assign({r:[x0,x1,y0,y1],h:H,kind:'wall'},o||{});
const wLeft=W(0,PW,75,topY1), wTop=W(0,xr+EW,bedY1,topY1), wRightMain=W(xr,xr+EW,bayY1,topY1);
const wBedS=W(x0,xr,bedWallY0,bedY0), wKB=W(kx1,bx0,d9Y0,bedWallY0), wBathS=W(kx1,xr,stY1,bathY0), wD9=W(kx1,xr,d9Y0,d9Y1);
const wSW4=W(x0,bayX2,balY1,livY0), wBayTop=W(xr,bayX2,bayY1,bayY1+EW), wBayR=W(bayX1,bayX2,balY1,bayY1+EW);
const balX1=x0+3810;                                   // balcony is 3810 wide, past the main wall line
const wBalR=W(balX1,balX1+250,balY1-500,balY1);           // short column by the living-room wall
const rBal=W(x0,balX1,75,balY0,{h:1000,kind:'rail',style:'metal'}), rBalR=W(balX1,balX1+50,75,balY1-500,{h:1000,kind:'rail',style:'metal'});
// pantry (D6): tall cupboard with its own door, between the fridge space and the bench
const pY0=10400,pY1=11000,pD=600;
const wPanS=W(x0,x0+pD,pY0,pY0+25,{h:2100}), wPanN=W(x0,x0+pD,pY1-25,pY1,{h:2100}), wPanF=W(x0+pD-25,x0+pD,pY0+25,pY1-25,{h:2100});
const walls=[wLeft,wTop,wRightMain,wBedS,wKB,wBathS,wD9,wSW4,wBayTop,wBayR,wBalR,rBal,rBalR,wPanS,wPanN,wPanF];

const ow=(w,a0,a1,o)=>{const r=w.r,hz=(r[1]-r[0])>=(r[3]-r[2]);return Object.assign({wall:w,r:hz?[a0,a1,r[2],r[3]]:[r[0],r[1],a0,a1],z:[0,DH]},o);};
const hi=[1600,2100];
const openings=[
 ow(wLeft,5950,6820,{type:'door',hinge:'b',swing:1,label:'D1 entry',color:'#6b4f3a'}),
 ow(wSW4,x0+150,xr-150,{type:'slide3',fixed:[0,2],dir:-1,label:'SW4'}),
 ow(wSW4,bayX1-(1570+650)/2-0,bayX1-(1570-650)/2,{type:'slide',z:hi,label:'W9'}),
 ow(wBayTop,xr+485,xr+1085,{type:'slide',z:hi,label:'W4'}),
 ow(wRightMain,9500,10450,{type:'slide',z:hi,label:'W6'}),
 ow(wTop,x0+650,x0+2270,{type:'slide',z:[900,2100],label:'Bed window'}),
 ow(wBedS,x0+700,x0+1520,{type:'door',hinge:'a',swing:1,label:'D3'}),
 ow(wKB,10520,11240,{type:'door',hinge:'b',swing:1,label:'D4'}),
 ow(wPanF,pY0+30,pY1-30,{type:'door',hinge:'a',swing:1,z:[0,2050],label:'D6 pantry',color:'#e7e1d6'}),
 ow(wD9,bx0+20,bx0+725,{type:'door',hinge:'a',swing:-1,label:'D9'}),
 ow(wD9,bx0+725,xr-20,{type:'door',hinge:'b',swing:-1,label:'D9'})
];
const rooms=[
 {id:'living',name:'Living / dining',size:'26.91 m²',r:[x0,xr,livY0,kitY0],extra:[[xr,bayX1,livY0,bayY1],[kx1,xr,kitY0,d9Y0]]},
 {id:'kitchen',name:'Kitchen',size:'9.00 m²',r:[x0,kx1,kitY0,bedWallY0]},
 {id:'bed1',name:'Bed 1',size:'9.30 m²',r:[x0,xr,bedY0,bedY1]},
 {id:'bath',name:'Bath / laundry',size:'5.99 m²',r:[bx0,xr,bathY0,bedWallY0]},
 {id:'store',name:'Linen',size:'',label:false,r:[bx0,xr,d9Y1,stY1]},
 {id:'balcony',name:'Balcony',size:'10.00 m²',r:[x0,balX1,balY0,balY1],out:true}
];
const fixtures=[
 {type:'box',r:[x0,x0+600,bedY0,bedY1],h:2400,color:'#ece8df',label:'Robe (SD3)'},
 ...[400,800,1200,1600].map(z=>({type:'box',r:[x0,x0+pD-25,pY0+25,pY1-25],z0:z,h:20,color:'#e7e1d6',label:'Pantry shelf'})),
 {type:'box',r:[x0,x0+350,7230,pY0],z0:1500,h:750,color:'#e7e1d6',label:'Wall cabinets'},
 {type:'counter',r:[kx1-600,kx1,7230,pY0],h:900,label:'Second bench'},
 {type:'counter',r:[x0,x0+600,7230,10400],h:900,sink:[x0+300,8440],hob:[x0+300,9500]},
 {type:'box',r:[bx0,xr,d9Y1,stY1],h:2100,color:'#e7e1d6',label:'Broom & linen cupboards'},
 {type:'box',r:[bx0+20,bx0+640,11300,bedWallY0],h:850,color:'#f2f3f5',label:'Washer/dryer'},
 {type:'counter',r:[xr-640,xr,11400,bedWallY0],h:900,sink:[xr-320,11670],label:'Laundry tub'},
 {type:'counter',r:[xr-460,xr,10150,10950],h:850,sink:[xr-230,10550],label:'Vanity'},
 {type:'box',r:[xr-420,xr,9250,9650],h:420,color:'#fbfbfb',label:'Toilet'},
 {type:'box',r:[bx0+10,xr,bathY0,bathY0+950],h:30,color:'#cfd4d8',label:'Shower'}
];
const sample=[
 ['g-tvunit',bayX1-200,5600,270],['g-tv55',bayX1-30,5600,270,0.95],['g-lsofa',x0+2725,5600,90],['ps-rug',x0+3150,5900,0],
 ['g-coffee',x0+3150,6100,90],['g-cubeshelf',x0+175,livY0+400,90],
 ['g-dining4',x0+900,4000,0],['g-dchair',x0+600,3300,180],['g-dchair',x0+1200,3300,180],['g-dchair',x0+600,4700,0],['g-dchair',x0+1200,4700,0],
 ['g-desk',bayX1-300,livY0+600,270],['g-office',bayX1-900,livY0+600,90],
 ['g-ac',xr+700,bayY1-115,0,2.15],
 ['g-fridge2',x0+360,11500,90],['g-queen',xr-1065,13700,270],['ps-bedside',xr-150,12730,270],
 ['ps-easybirch',x0+800,1500,45],['g-plant',balX1-350,500,0]
].map(a=>({id:a[0],x:a[1],y:a[2],r:a[3],e:a[4]}));

(window.PLANNER_PROPERTIES=window.PLANNER_PROPERTIES||[]).push({
  id:'unit10', name:'Unit 10', subtitle:'1 bedroom apartment · 66.15 m² · 2.7 m ceilings', ceiling:H,
  finishes:{wall:'#f7f7f5',
    floor:{living:'solid-wood',kitchen:'solid-wood',store:'solid-wood',bed1:'carpet',bath:'grey-tile',balcony:'grey-granite'},
    tile:{bath:'1x1',balcony:'2x2'}},
  walls, openings, rooms, fixtures, sample
});
})();
