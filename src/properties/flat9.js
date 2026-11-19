/* Flat 9, Pune: 3 bedrooms.
   Plan coordinates are in millimetres: +x runs to the right of the plan (south), +y runs up the plan (east).
   Source: "PuneHouse" sale plan plus the owner's corrected layout (walls, doors, window positions and types).

   To add another home, copy this file to src/properties/<id>.js, change the numbers, and run build.py.
   Each home lists:
     walls     {r:[x0,x1,y0,y1], h, kind:'wall'|'rail'}
     openings  doors and windows cut into one wall: type 'door' (hinged), 'slide2', 'slide3' (sliding doors),
               'pivot', 'slide', 'louvre' (windows), with height range z:[bottom, top]
     rooms     {id, name, size, r:[x0,x1,y0,y1], extra:[more rects], out:true for outdoor}
     fixtures  built-ins that can't be moved, such as a kitchen platform
     sample    starting furniture: catalogue id, plan x/y in mm, angle in degrees, height above floor in m */
(function(){
const F=304.8, E=230, I=115, H=3000, DH=2100, RAIL=1050;
// ---- grid (inner faces) ----
const A=E+2*F;                                   // inner west face of master bedroom, its toilet and the balcony
const mb_x1=A+11*F, sw0=mb_x1, sw1=mb_x1+I;     // straight wall: M.bed | Bedroom 1 and Bedroom 2 | kitchen
const kit_x0=sw1, kit_x1=kit_x0+15*F, XE=kit_x1+E;
const bed1_x0=sw1, bed1_x1=bed1_x0+10.5*F;
const t_x1=bed1_x1, t_x0=t_x1-7*F, tm_x1=A+8*F;
const living_x1=kit_x1, living_x0=kit_x1-18*F, tw_x0=living_x0-E;
const terr_x1=tw_x0, terr_x0=terr_x1-9*F;
const liv_y1=E+11*F, mid_y0=liv_y1+E, mid_y1=mid_y0+10*F, top_y0=mid_y1+I;
const tm_y1=top_y0+4*F, mbed_y0=tm_y1+I, mbed_y1=mbed_y0+14*F, sit_y0=mbed_y1+I, sit_y1=sit_y0+5*F, YN=sit_y1+E;
const bed1_y0=sit_y1-14.5*F, tw_top=bed1_y0-I, th=(tw_top-top_y0-I)/2, tl_y1=top_y0+th, tu_y0=tl_y1+I;

const W=(x0,x1,y0,y1,o)=>Object.assign({r:[x0,x1,y0,y1],h:H,kind:'wall'},o||{});
const R=(x0,x1,y0,y1)=>W(x0,x1,y0,y1,{h:RAIL,kind:'rail'});
// walls
const wLivS=W(tw_x0,XE,0,E), wEast=W(kit_x1,XE,0,mid_y1+E), wLivW=W(tw_x0,living_x0,E,liv_y1);
const wB2S=W(0,sw1,liv_y1,mid_y0), wPartL=W(sw1,sw1+4.5*F,liv_y1,mid_y0), wPartR=W(sw1+7.5*F,kit_x1,liv_y1,mid_y0);
const wShLo=W(sw0,sw1,mid_y0,mid_y1), wB2W=W(0,E,mid_y0,top_y0), wB2N=W(0,sw1,mid_y1,top_y0), wB2Nx=W(0,A-E,mid_y1,mid_y1+E);
const wMW=W(A-E,A,mid_y1,sit_y0), wMTE=W(tm_x1,tm_x1+I,top_y0,mbed_y0), wMS=W(A,mb_x1,tm_y1,mbed_y0);
const wShUp=W(sw0,sw1,tm_y1,sit_y1), wMN=W(A,sw0,mbed_y1,sit_y0), wB1N=W(sw0,bed1_x1+E,sit_y1,YN);
const wB1E=W(bed1_x1,bed1_x1+E,mid_y1,YN), wKNx=W(bed1_x1,XE,mid_y1,mid_y1+E), wKN=W(t_x0-I,bed1_x1,mid_y1,top_y0);
const wTW=W(t_x0-I,t_x0,top_y0,tw_top), wTD=W(t_x0,bed1_x1,tl_y1,tu_y0), wB1S=W(sw1,bed1_x1,tw_top,bed1_y0);
const rTS=R(terr_x0-I,tw_x0,-I,0), rTW=R(terr_x0-I,terr_x0,0,liv_y1), rBW=R(A-I,A,sit_y0,sit_y1+I), rBN=R(A-I,sw0,sit_y1,sit_y1+I);
const walls=[wLivS,wEast,wLivW,wB2S,wPartL,wPartR,wShLo,wB2W,wB2N,wB2Nx,wMW,wMTE,wMS,wShUp,wMN,wB1N,wB1E,wKNx,wKN,wTW,wTD,wB1S,rTS,rTW,rBW,rBN];

// opening on wall w between a0 and a1 along the wall
const ow=(w,a0,a1,o)=>{const r=w.r,horiz=(r[1]-r[0])>=(r[3]-r[2]);return Object.assign({wall:w,r:horiz?[a0,a1,r[2],r[3]]:[r[0],r[1],a0,a1],z:[0,DH]},o);};
const winZ=[900,2100], louvZ=[1500,2100];
const openings=[
 ow(wLivS,living_x1-300-1000,living_x1-300,{type:'door',hinge:'b',swing:1,label:'Main door',color:'#5a3d2b'}),
 ow(wLivS,living_x0+2.7*F,living_x0+10.1*F,{type:'pivot',z:winZ,proj:true,label:'W2'}),
 ow(wLivW,liv_y1-9.25*F,liv_y1-1.75*F,{type:'slide3',label:'D1'}),
 ow(wEast,mid_y1-7.0*F,mid_y1-1.1*F,{type:'pivot',z:[1050,2100],proj:true,label:'W2'}),
 ow(wB2W,mid_y1-7.7*F,mid_y1-1.8*F,{type:'pivot',z:winZ,proj:true,label:'W2'}),
 ow(wShLo,mid_y1-920,mid_y1-20,{type:'door',hinge:'b',swing:-1}),
 ow(wMW,tm_y1-2.7*F,tm_y1-0.9*F,{type:'louvre',z:louvZ,label:'W3'}),
 ow(wMW,mbed_y1-10.1*F,mbed_y1-4.0*F,{type:'pivot',z:winZ,proj:true,label:'W2'}),
 ow(wMS,tm_x1-800,tm_x1-50,{type:'door',hinge:'b',swing:-1}),
 ow(wShUp,mbed_y0+20,mbed_y0+920,{type:'door',hinge:'a',swing:-1}),
 ow(wMN,(A+mb_x1)/2-838,(A+mb_x1)/2+838,{type:'slide2',label:'D2'}),
 ow(wB1S,bed1_x0+20,bed1_x0+920,{type:'door',hinge:'a',swing:1}),
 ow(wB1S,t_x0+30,t_x0+780,{type:'door',hinge:'a',swing:-1}),
 ow(wTW,top_y0+50,top_y0+800,{type:'door',hinge:'a',swing:1}),
 ow(wB1N,bed1_x0+3.06*F,bed1_x0+7.55*F,{type:'pivot',z:winZ,proj:true,label:'W2'}),
 ow(wB1E,sit_y1-11.1*F,sit_y1-9.25*F,{type:'pivot',z:winZ,label:'W2'}),
 ow(wB1E,tw_top-2.65*F,tw_top-1.15*F,{type:'louvre',z:louvZ,label:'W3'}),
 ow(wB1E,tl_y1-2.7*F,tl_y1-1.15*F,{type:'louvre',z:louvZ,label:'W3'})
];
const rooms=[
 {id:'living',name:'Living',size:"18′ × 11′",r:[living_x0,living_x1,E,liv_y1]},
 {id:'kitchen',name:'Kitchen & dining',size:"15′ × 10′",r:[kit_x0,kit_x1,mid_y0,mid_y1]},
 {id:'mbed',name:'Master bedroom',size:"11′ × 14′",r:[A,mb_x1,mbed_y0,mbed_y1]},
 {id:'bed1',name:'Bedroom 1',size:"10′6″ × 14′6″",r:[bed1_x0,bed1_x1,bed1_y0,sit_y1]},
 {id:'bed2',name:'Bedroom 2',size:"13′ × 10′",r:[E,sw0,mid_y0,mid_y1]},
 {id:'terrace',name:'Terrace',size:"9′ × 12′",r:[terr_x0,terr_x1,0,liv_y1],out:true},
 {id:'balcony',name:'Balcony',size:"11′ × 5′",r:[A,mb_x1,sit_y0,sit_y1],out:true},
 {id:'mbtoilet',name:'Master toilet',size:"8′ × 4′",r:[A,tm_x1,top_y0,tm_y1]},
 {id:'b1toilet',name:'Bedroom 1 toilet',size:"7′ × 4′",r:[t_x0,bed1_x1,tu_y0,tw_top]},
 {id:'ctoilet',name:'Common toilet',size:"7′ × 4′",r:[t_x0,bed1_x1,top_y0,tl_y1]},
 {id:'passage',name:'Passage',size:'',label:false,r:[bed1_x0,t_x0-I,top_y0,tw_top],extra:[[tm_x1+I,sw0,top_y0,tm_y1],[sw0,sw1,top_y0,tm_y1],[sw1+4.5*F,sw1+7.5*F,liv_y1,mid_y0]]},
 {id:'entry',name:'Entry',size:'to lift',out:true,r:[living_x1-1500,XE,-1400,0]}
];
const fixtures=[
 {type:'counter',r:[t_x0+300,kit_x1,mid_y1-600,mid_y1],h:900},
 {type:'counter',r:[kit_x1-600,kit_x1,mid_y0,mid_y1-600],h:900,sink:[kit_x1-300,mid_y1-1100],hob:[kit_x1-300,mid_y0+700]}
];
const tvY=liv_y1-1400;
const sample=[
 ['g-tv55',living_x1-30,tvY,270,0.95],['g-tvunit',living_x1-200,tvY,270],['ps-sofabed',living_x1-3500,tvY,90],
 ['ps-rug',living_x1-2000,tvY,0],['ps-sidetable',living_x1-3500,tvY-1300,90],['g-ac',living_x0+1150,liv_y1-115,0,2.15],
 ['g-fan',(living_x0+living_x1)/2,(E+liv_y1)/2,0],['ps-uplighter',living_x0+250,liv_y1-250,0],
 ['ps-set2',kit_x0+2300,mid_y0+1400,90],['ps-pendant',kit_x0+2300,mid_y0+1400,0],['g-fridge2',kit_x1-1020,mid_y0+370,180],
 ['g-queen',mb_x1-1065,mbed_y0+2250,270],['ps-bedside',mb_x1-150,mbed_y0+2250-970,270],['ps-bedside',mb_x1-150,mbed_y0+2250+970,270],
 ['g-ward2',A+290,mbed_y1-600,90],['g-ac',(A+mb_x1)/2,mbed_y1-115,0,2.15],['g-fan',(A+mb_x1)/2,(mbed_y0+mbed_y1)/2,0],
 ['g-single',bed1_x1-990,sit_y1-1200,270],['g-desk',bed1_x0+300,sit_y1-1500,90],['ps-chair',bed1_x0+850,sit_y1-1500,270],
 ['g-ac',bed1_x0+1600,sit_y1-115,0,2.15],
 ['g-queen',(E+sw0)/2,mid_y0+1065,180]
].map(a=>({id:a[0],x:a[1],y:a[2],r:a[3],e:a[4]}));

(window.PLANNER_PROPERTIES=window.PLANNER_PROPERTIES||[]).push({
  id:'flat9', name:'Flat 9', subtitle:'Pune · 3 bedrooms · marble floors · 9″ brick walls', ceiling:H,
  compass:{up:'East',down:'West',left:'North',right:'South'},
  walls, openings, rooms, fixtures, sample
});
})();
