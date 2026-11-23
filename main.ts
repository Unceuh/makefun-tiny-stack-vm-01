import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const T={0:[0,0,0],1:[1,0,1],2:[4,0,1],3:[0,1,0],4:[0,1,2],5:[0,2,2],6:[0,2,3],7:[0,3,3],16:[0,2,1],17:[0,2,1],18:[0,2,1],19:[0,2,1],20:[0,2,1],21:[0,2,1],22:[0,2,1],23:[0,1,1],24:[0,2,1],25:[0,2,1],26:[0,2,1],27:[0,1,1],28:[0,2,1],29:[0,2,1],30:[0,2,1],32:[0,2,1],33:[0,2,1],34:[0,2,1],48:[2,0,0],49:[2,1,0],50:[2,1,0],51:[2,0,0],52:[0,0,0],64:[0,1,1],65:[0,2,0],80:[0,1,0],81:[0,1,0],82:[0,0,1],83:[0,1,0]};
function run(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=[];
let s=0,c=0,ip=0,pc=0,st=0;
const n=p.length;
const done=e=>({exit:e,out:Uint8Array.from(o)});
for(;;){
if(st===1e6)return done(10);
if(pc<0||pc>=n)return done(9);
const b=p[pc],t=T[b];
if(!t)return done(5);
const[im,po,pu]=t;
if(pc+im>=n)return done(9);
st++;
const nx=pc+1+im;
if(s<po)return done(2);
if(s-po+pu>256)return done(3);
pc=nx;
switch(b){
case 0:return done(0);
case 1:D[s++]=(p[nx-1]<<24)>>24;break;
case 2:D[s++]=p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24);break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const y=D[s-1],a=D[s-2];let r;
switch(b){
case 16:r=(a+y)|0;break;
case 17:r=(a-y)|0;break;
case 18:r=Math.imul(a,y);break;
case 19:if(!y)return done(4);r=a===-2147483648&&y===-1?a:(a/y)|0;break;
case 20:if(!y)return done(4);r=y===-1?0:(a%y)|0;break;
case 21:if(!y)return done(4);r=Math.floor((a>>>0)/(y>>>0))|0;break;
case 22:if(!y)return done(4);r=((a>>>0)%(y>>>0))|0;break;
case 24:r=a&y;break;
case 25:r=a|y;break;
case 26:r=a^y;break;
case 28:r=a<<(y&31);break;
case 29:r=a>>(y&31);break;
case 30:r=(a>>>(y&31))|0;break;
case 32:r=a===y?1:0;break;
case 33:r=a<y?1:0;break;
default:r=(a>>>0)<(y>>>0)?1:0;
}
s-=2;D[s++]=r;break;}
case 48:case 49:case 50:{
const rel=((p[nx-2]|(p[nx-1]<<8))<<16)>>16;
let take=b===48;
if(b!==48){const v=D[--s];take=b===49?v===0:v!==0;}
if(take)pc=nx+rel;
break;}
case 51:if(c===64)return done(7);C[c++]=nx;pc=p[nx-2]|(p[nx-1]<<8);break;
case 52:if(!c)return done(8);pc=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>255)return done(6);D[s-1]=M[a];break;}
case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>255)return done(6);s-=2;M[a]=v;break;}
case 80:{const t=String(D[s-1]);if(o.length+t.length>65536)return done(11);s--;for(let i=0;i<t.length;i++)o.push(t.charCodeAt(i));break;}
case 81:if(o.length+1>65536)return done(11);o.push(D[--s]&255);break;
case 82:D[s++]=ip<q.length?q[ip++]:-1;break;
case 83:return done(D[--s]&255);
}
}
}
for(const id of readdirSync(I).sort()){
try{
const r=run(readFileSync(join(I,id,'program.bin')),readFileSync(join(I,id,'input.bin')));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),r.out);
writeFileSync(join(O,id,'exit.txt'),r.exit+'\n');
}catch{
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),'');
writeFileSync(join(O,id,'exit.txt'),'0\n');
}
}
