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
// the plain bench and the kitchen/bath wall end in line with the living-room cupboard front
const benchY0=7430, bayY1=7436, bedWallY0=11940, bedY0=bedWallY0+IW, bedY1=bedY0+2650, topY1=bedY1+PW;

const W=(x0,x1,y0,y1,o)=>Object.assign({r:[x0,x1,y0,y1],h:H,kind:'wall'},o||{});
const wLeft=W(0,PW,75,topY1), wTop=W(0,xr+EW,bedY1,topY1), wRightMain=W(xr,xr+EW,bayY1,topY1);
const wBedS=W(x0,xr,bedWallY0,bedY0), wKB=W(kx1,bx0,benchY0,bedWallY0), wBathS=W(kx1,xr,stY1,bathY0), wD9=W(kx1,xr,d9Y0,d9Y1);
const wSW4=W(x0,bayX2,balY1,livY0), wBayTop=W(xr,bayX2,bayY1,bayY1+EW), wBayR=W(bayX1,bayX2,balY1,bayY1+EW);
const balX1=x0+3810;                                   // balcony is 3810 wide, past the main wall line
const wBalR=W(balX1,balX1+250,balY1-500,balY1);           // short column by the living-room wall
const rBal=W(x0,balX1,75,balY0,{h:1000,kind:'rail',style:'metal'}), rBalR=W(balX1,balX1+50,75,balY1-500,{h:1000,kind:'rail',style:'metal'});
// pantry (D6): tall cupboard with its own door, between the fridge space and the bench
const pY0=10400,pY1=11000,pD=600;
const wRobe=W(x0+575,x0+600,bedY0,bedY1);                // robe front: 3 sliding doors under a bulkhead
const wCab=W(x0+325,x0+343,7230,pY0,{h:2250,z0:1500});        // wall-cabinet front above the bench (5 doors)
const wBench=W(kx1-600,kx1-582,benchY0,10400,{h:860,z0:100}); // plain bench front: 4 cabinet doors
// tall cupboard opposite the fridge, between the bathroom door (D4) and the corner: 2 doors, 3 levels
const cbY0=11250, cbY1=bedWallY0-10, cbD=450, cbH=1750, cbX=kx1-cbD;
const wCupF=W(cbX,cbX+18,cbY0+18,cbY1-18,{h:cbH,z0:20});
const wPanS=W(x0,x0+pD,pY0,pY0+25,{h:2100}), wPanN=W(x0,x0+pD,pY1-25,pY1,{h:2100}), wPanF=W(x0+pD-25,x0+pD,pY0+25,pY1-25,{h:2100});
const walls=[wLeft,wTop,wRightMain,wBedS,wKB,wBathS,wD9,wSW4,wBayTop,wBayR,wBalR,rBal,rBalR,wPanS,wPanN,wPanF,wRobe,wCab,wBench,wCupF];

const ow=(w,a0,a1,o)=>{const r=w.r,hz=(r[1]-r[0])>=(r[3]-r[2]);return Object.assign({wall:w,r:hz?[a0,a1,r[2],r[3]]:[r[0],r[1],a0,a1],z:[0,DH]},o);};
const hi=[1600,2100];
const openings=[
 ow(wLeft,5950,6820,{type:'door',hinge:'a',swing:1,label:'D1 entry',color:'#6b4f3a'}),
 ow(wSW4,x0+150,xr-150,{type:'slide3',fixed:[0,2],dir:1,label:'SW4'}),
 ow(wSW4,bayX1-(1570+650)/2-0,bayX1-(1570-650)/2,{type:'slide',z:hi,label:'W9'}),
 ow(wBayTop,xr+485,xr+1085,{type:'slide',z:hi,label:'W4'}),
 ow(wRightMain,9500,10450,{type:'slide',z:hi,label:'W6'}),
 ow(wTop,x0+650,x0+2270,{type:'slide',z:[900,2100],label:'Bed window'}),
 ow(wBedS,x0+700,x0+1520,{type:'door',hinge:'a',swing:1,label:'D3'}),
 ow(wKB,10520,11240,{type:'door',hinge:'b',swing:1,label:'D4'}),
 ...[0,1,2].map(k=>{const L=(bedY1-bedY0-20)/3,a=bedY0+10+k*L;
   return ow(wRobe,a,a+L,{type:'slide1',z:[0,2400],panel:'#ece8df',track:k===1?-1:1,dir:k===2?-1:1,ways:k===1?2:1,label:'Robe door '+(k+1)});}),
 ...[0,1,2,3,4].map(k=>{const L=(pY0-7230)/5,a=7230+k*L;
   return ow(wCab,a+2,a+L-2,{type:'door',cab:true,hinge:['a','b','a','a','b'][k],swing:1,z:[1500,2250],color:'#ece8df',label:'Cabinet door '+(k+1)});}),
 ...[0,1].map(k=>{const L=(cbY1-cbY0-36)/2,a=cbY0+18+k*L;
   return ow(wCupF,a+2,a+L-2,{type:'door',cab:true,hinge:k?'b':'a',swing:-1,z:[20,cbH],color:'#ece8df',label:'Kitchen cupboard door '+(k+1)});}),
 ow(wPanF,pY0+30,pY1-30,{type:'door',hinge:'a',swing:1,z:[0,2050],label:'D6 pantry',color:'#e7e1d6'}),
 ...[0,1,2].map(k=>{const L=(xr-20-(bx0+20))/3,a=bx0+20+k*L;
   return ow(wD9,a+2,a+L-2,{type:'door',cab:true,hinge:['a','b','b'][k],swing:-1,z:[0,H-100],color:'#f4f3ef',label:'Cupboard door '+(k+1)});}),
 ...[0,1,2,3].map(k=>{const L=(10400-benchY0)/4,a=benchY0+k*L;
   return ow(wBench,a+2,a+L-2,{type:'door',cab:true,hinge:['a','b','a','b'][k],swing:-1,z:[100,860],color:'#ece8df',label:'Bench cabinet door '+(k+1)});})
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
 {type:'box',r:[x0,x0+575,bedY0,bedY1],z0:1800,h:20,color:'#e7e1d6',label:'Robe shelf'},
 {type:'box',r:[x0+260,x0+290,bedY0+20,bedY1-20],z0:1700,h:25,color:'#b9bec3',label:'Robe hanging rail'},
 ...[400,800,1200,1600].map(z=>({type:'box',r:[x0,x0+pD-25,pY0+25,pY1-25],z0:z,h:20,color:'#e7e1d6',label:'Pantry shelf'})),
 ...[[1500,18],[1866,15],[2232,18]].map(([z,h])=>({type:'box',r:[x0,x0+325,7230,pY0],z0:z,h,color:'#e7e1d6',label:'Wall cabinet shelf'})),
 {type:'box',r:[x0,x0+325,7230,7248],z0:1500,h:750,color:'#e7e1d6',label:'Wall cabinet end'},{type:'box',r:[x0,x0+325,pY0-18,pY0],z0:1500,h:750,color:'#e7e1d6',label:'Wall cabinet end'},
 {type:'counter',r:[kx1-600,kx1,benchY0,pY0],h:900,top:'statuario',hollow:true,label:'Second bench'},
 {type:'box',r:[kx1-582,kx1,benchY0+18,pY0-18],z0:460,h:18,color:'#e7e1d6',label:'Bench cabinet shelf'},
 {type:'counter',r:[x0,x0+600,7230,10400],h:900,top:'statuario',hob:[x0+300,(7230+pY0)/2],sink:[x0+300,7720],label:'Kitchen bench'},
 {type:'box',r:[x0+600,x0+618,7720-298,7720+298],z0:90,h:770,color:'#c3c7cb',label:'Dishwasher (under sink)'},
 {type:'box',r:[x0+618,x0+624,7720-250,7720+250],z0:780,h:50,color:'#2b2d30',label:'Dishwasher controls'},
 ...[350,850,1350,1850,2300].map(z=>({type:'box',r:[bx0,xr,d9Y1,stY1],z0:z,h:20,color:'#f4f3ef',clip:true,label:'Linen cupboard shelf'})),
 {type:'box',r:[cbX,kx1,cbY0,cbY0+18],h:cbH,color:'#e7e1d6',label:'Kitchen cupboard side'},{type:'box',r:[cbX,kx1,cbY1-18,cbY1],h:cbH,color:'#e7e1d6',label:'Kitchen cupboard side'},
 {type:'box',r:[cbX,kx1,cbY0+18,cbY1-18],h:20,color:'#e7e1d6',label:'Kitchen cupboard base'},
 ...[600,1170,cbH-18].map(z=>({type:'box',r:[cbX+18,kx1,cbY0+18,cbY1-18],z0:z,h:18,color:'#e7e1d6',label:'Kitchen cupboard shelf'})),
 {type:'box',r:[bx0+20,bx0+640,11300,bedWallY0],h:850,color:'#f2f3f5',label:'Washer/dryer'},
 {type:'counter',r:[xr-640,xr,11400,bedWallY0],h:900,sink:[xr-320,11670],label:'Laundry tub'},
 {type:'counter',r:[xr-460,xr,10150,10950],h:850,sink:[xr-230,10550],label:'Vanity'},
 {type:'box',r:[xr-420,xr,9250,9650],h:420,color:'#fbfbfb',label:'Toilet'},
 {type:'box',r:[bx0+10,xr,bathY0,bathY0+950],h:30,color:'#cfd4d8',label:'Shower'}
];
const w9x=(bayX1-(1570+650)/2+bayX1-(1570-650)/2)/2;     // centre of the small window W9
const sample=[
 ['g-tvunit',bayX1-200,5600,270,0,1,1],['g-tv55s',bayX1-200,5600,270,0.45,0,1],['g-lsofa',x0+2450,5300,90,0,0,1],
 ['ps-rug',x0+3150,5600,0],['g-shoerack',x0+160,(6820+7230)/2,90,0,0,1],['g-cubeshelf',x0+175,livY0+400,90],['g-ac',x0+115,livY0+650,90,2.15,0,1],
 ['g-dining4',x0+900,4000,0],['g-dchair',x0+600,3300,180],['g-dchair',x0+1200,3300,180],['g-dchair',x0+600,4700,0],['g-dchair',x0+1200,4700,0],
 ['g-desk',w9x,livY0+300,180,0,0,1],['g-office',w9x,livY0+950,0,0,0,1],
 ['g-fridge2',x0+360,11500,90],['g-queen',xr-1065,13700,270],['ps-bedside',xr-150,12730,270],
 ['g-grass',(x0+balX1)/2,(balY0+balY1)/2,0,0,0,1],['g-bistro',(x0+balX1)/2,(balY0+balY1)/2+150,0,0,0,1],['g-plant',x0+350,500,0,0,0,1]
].map(a=>({id:a[0],x:a[1],y:a[2],r:a[3],e:a[4]||undefined,vi:a[5]||0,f:a[6]?1:0}));

(window.PLANNER_PROPERTIES=window.PLANNER_PROPERTIES||[]).push({
  id:'unit10', name:'Unit 10', sampleVersion:7, subtitle:'1 bedroom apartment · 66.15 m² · 2.7 m ceilings', ceiling:H,
  finishes:{wall:'#f7f7f5',
    floor:{living:'solid-wood',kitchen:'solid-wood',store:'solid-wood',bed1:'carpet',bath:'grey-tile',balcony:'grey-granite'},
    tile:{bath:'1x1',balcony:'2x2'}},
  walls, openings, rooms, fixtures, sample
});
})();
