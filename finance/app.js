(function(){
"use strict";
function b(en,zh){return '<span class="en">'+en+'</span><span class="zh">'+zh+'</span>';}
function bi(en,zh){return '<span class="inl">'+b(en,zh)+'</span>';}
function $(s,r){return (r||document).querySelector(s);}
function fmt(n){var s=Math.abs(Math.round(n)).toLocaleString('en-US');return (n<0?'−':'')+s;}
function sg(n){return (n>0?'+':n<0?'−':'')+Math.abs(Math.round(n)).toLocaleString('en-US');}

var C={crust:'#b5651d',crustL:'#f7e7d3',leaf:'#4f7a3a',leafL:'#e6f0dc',red:'#a8341f',redL:'#f8e1db',sky:'#2c6a8f',skyL:'#dcebf4',ink:'#3b2a1e',mute:'#7a6757',line:'#eadfce'};
function T(x,y,s,o){o=o||{};return '<text x="'+x+'" y="'+y+'" font-size="'+(o.s||12)+'" fill="'+(o.c||C.ink)+'" text-anchor="'+(o.a||'middle')+'" font-weight="'+(o.w||400)+'" dominant-baseline="central">'+s+'</text>';}
function R(x,y,w,h,f,st,rx){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx==null?8:rx)+'" fill="'+f+'" stroke="'+(st||'none')+'"/>';}
function SV(h,inner,t){return '<svg viewBox="0 0 480 '+h+'" role="img" aria-label="'+t+'">'+inner+'</svg>';}
function arrow(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+C.mute+'" stroke-width="1.5"/><path d="M'+(x2-6)+' '+(y2-4)+'L'+x2+' '+y2+'L'+(x2-6)+' '+(y2+4)+'" fill="none" stroke="'+C.mute+'" stroke-width="1.5"/>';}

/* ---------- illustrations ---------- */
var ILL={};
ILL.m1=function(){
 var s='',vals=[['Sales 销售',100,C.sky,0],['COGS 原料',-45,C.crust,1],['Labour 人工',-23,C.crust,2],['Rent 租金',-23,C.crust,3],['Other 其他',-12,C.crust,4]];
 var base=110,sc=0.9,run=0,x0=30,w=54,gap=20;
 s+='<line x1="20" y1="'+base+'" x2="460" y2="'+base+'" stroke="'+C.line+'"/>';
 vals.forEach(function(v,i){var x=x0+i*(w+gap),top,h;
  if(i===0){h=v[1]*sc;top=base-h;run=v[1];}else{top=base-run*sc;h=-v[1]*sc;run+=v[1];}
  s+=R(x,top,w,h,v[2],'',4)+T(x+w/2,top-9,v[1]>0?'100':'−'+Math.abs(v[1]),{w:600})+T(x+w/2,base+14,v[0].split(' ')[0],{s:11})+T(x+w/2,base+28,v[0].split(' ')[1],{s:11,c:C.mute});});
 var x=x0+5*(w+gap),p=-3,hh=Math.abs(p)*sc;
 s+=R(x,base,w,hh+2,C.red,'',4)+T(x+w/2,base+hh+14,'−3',{w:600,c:C.red})+T(x+w/2,base+34,'Profit',{s:11})+T(x+w/2,base+48,'利润',{s:11,c:C.mute});
 return SV(172,s,'Sales 100 minus COGS 45, labour 23, rent 23, other 12 leaves operating profit of minus 3 (thousand SGD)');};
ILL.m2=function(){
 var s=R(10,12,100,54,C.crustL,C.crust)+T(60,31,'TC 200',{w:600,s:15})+T(60,50,'客流 customers',{s:11,c:C.mute})
 +T(128,39,'×',{s:20,w:600})+R(146,12,100,54,C.skyL,C.sky)+T(196,31,'AC $8',{w:600,s:15})+T(196,50,'客单 avg check',{s:11,c:C.mute})
 +T(264,39,'=',{s:20,w:600})+R(282,12,100,54,C.leafL,C.leaf)+T(332,31,'$1,600',{w:600,s:15})+T(332,50,'销售 sales',{s:11,c:C.mute})
 +R(10,88,320,20,'#d8cbb8','',4)+T(340,98,'$1,600 @ AC $8.00',{a:'start',s:12})
 +R(10,116,340,20,C.leaf,'',4)+T(360,126,'$1,700 @ AC $8.50  (+$100)',{a:'start',s:12})
 +T(10,152,'TC −10% × AC +5%: 0.9 × 1.05 = 0.945 → −5.5%',{a:'start',s:12,c:C.mute});
 return SV(166,s,'TC times AC equals sales; raising AC from 8 to 8.5 adds 100 dollars');};
ILL.m3=function(){
 var s='',i,c,r,x,y;
 for(i=0;i<30;i++){c=i%10;r=Math.floor(i/10);x=14+c*30;y=14+r*32;
  s+='<circle cx="'+(x+11)+'" cy="'+(y+11)+'" r="11" fill="'+C.crust+'" opacity="0.85"/><circle cx="'+(x+11)+'" cy="'+(y+11)+'" r="6" fill="'+C.crustL+'"/>';}
 s+=T(330,28,'$300 / day',{a:'start',w:600,s:15})+T(330,48,'每日损耗 daily waste',{a:'start',s:11,c:C.mute})
 +T(330,72,'× 30 days = $9,000',{a:'start',w:600,s:15,c:C.red})+T(330,92,'每月损耗 / month',{a:'start',s:11,c:C.mute});
 s+=R(14,118,420,26,C.skyL,'',6)+T(24,131,'Too little production → stock-outs lose margin 缺货损失毛利',{a:'start',s:12,c:C.sky});
 return SV(158,s,'Thirty bakery items each representing 300 dollars of daily waste, totalling 9000 dollars a month');};
ILL.m4=function(){
 var s='',dem=[2,3,6,5,3,2,4,7,4,2],i,x,w=40,base=120,u=12;
 s+='<line x1="20" y1="'+base+'" x2="460" y2="'+base+'" stroke="'+C.line+'"/>';
 for(i=0;i<10;i++){x=30+i*42;var d=dem[i],st=(i>=4&&i<=6)?6:(i===2||i===3?6:(i===7?7:4));
  s+=R(x,base-d*u,w,d*u,C.skyL,C.sky,3);
  if(st>d)s+=R(x,base-st*u,w,(st-d)*u,C.redL,C.red,3);
  s+=T(x+w/2,base+12,(8+i)+':00',{s:10,c:C.mute});}
 s+=R(30,150,14,10,C.skyL,C.sky,2)+T(50,155,'Demand 需求',{a:'start',s:11})+R(150,150,14,10,C.redL,C.red,2)+T(170,155,'Idle overlap / OT 空闲重叠与加班',{a:'start',s:11})
 +T(30,178,'$100k ÷ $23k = 4.35 sales per labour $  每$1人工 → $4.35销售',{a:'start',s:12,c:C.mute});
 return SV(192,s,'Hourly demand bars against staffing, with idle overlap shaded red');};
ILL.m5=function(){
 var X=function(v){return 40+v/160000*400;},Y=function(v){return 130-v/160000*115;},s='';
 s+='<line x1="40" y1="130" x2="450" y2="130" stroke="'+C.mute+'"/><line x1="40" y1="130" x2="40" y2="10" stroke="'+C.mute+'"/>';
 s+='<line x1="'+X(0)+'" y1="'+Y(0)+'" x2="'+X(160000)+'" y2="'+Y(160000)+'" stroke="'+C.sky+'" stroke-width="2.5"/>';
 s+='<line x1="'+X(0)+'" y1="'+Y(35000)+'" x2="'+X(160000)+'" y2="'+Y(35000+0.68*160000)+'" stroke="'+C.crust+'" stroke-width="2.5"/>';
 s+='<line x1="'+X(0)+'" y1="'+Y(35000)+'" x2="'+X(160000)+'" y2="'+Y(35000)+'" stroke="'+C.mute+'" stroke-dasharray="4 4"/>';
 s+='<circle cx="'+X(109375)+'" cy="'+Y(109375)+'" r="6" fill="'+C.red+'"/>';
 s+=T(X(109375),Y(109375)+16,'$109,375',{w:600,c:C.red,s:12});
 s+=T(X(109375)-20,Y(109375)-26,'Break-even 盈亏平衡',{a:'end',s:11,c:C.red});
 s+=T(X(160000)-4,Y(160000)-6,'Sales 销售',{a:'end',s:11,c:C.sky,w:600});
 s+=T(X(160000)-4,Y(35000+0.68*160000)+16,'Total cost 总成本',{a:'end',s:11,c:C.crust,w:600});
 s+=T(44,Y(35000)+10,'Fixed 固定 $35k',{a:'start',s:11,c:C.mute});
 s+=T(250,150,'$35k ÷ (1 − 68%) = $35k ÷ 0.32',{s:12,c:C.mute});
 return SV(164,s,'Sales line crosses total cost line at 109,375 dollars');};
ILL.m6=function(){
 var st=[['Diagnose','诊断'],['Prioritise','排序'],['Assign','分配'],['Execute','执行'],['Review','复盘']],s='',i,x;
 for(i=0;i<5;i++){x=8+i*93;s+=R(x,22,80,50,i%2?C.skyL:C.crustL,i%2?C.sky:C.crust)+T(x+40,40,st[i][0],{w:600,s:12})+T(x+40,58,st[i][1],{s:12,c:C.mute});if(i<4)s+=arrow(x+82,47,x+91,47);}
 s+='<path d="M430 74 C430 104 50 104 50 76" fill="none" stroke="'+C.mute+'" stroke-dasharray="4 4"/>'+T(240,116,'repeat weekly 每周循环',{s:11,c:C.mute});
 s+=R(10,134,460,40,C.leafL,'',8)+T(240,148,'Sales +$10k · COGS 45%→42% · Labour 23%→20%',{s:12,w:600,c:'#2f4f20'})+T(240,164,'Profit −$3k → +$6.8k  亏损转盈利',{s:12,c:'#2f4f20'});
 return SV(186,s,'Five step loop: diagnose, prioritise, assign, execute, review');};
ILL.m7=function(){
 var s=R(180,8,120,40,C.skyL,C.sky)+T(240,22,'VPO',{w:600})+T(240,38,'Review 监督',{s:11,c:C.mute})
 +R(180,66,120,40,C.crustL,C.crust)+T(240,80,'RM',{w:600})+T(240,96,'Store result 门店结果',{s:11,c:C.mute})
 +R(70,126,130,40,C.leafL,C.leaf)+T(135,140,'BOH Lead',{w:600})+T(135,156,'Waste 损耗',{s:11,c:C.mute})
 +R(280,126,130,40,C.leafL,C.leaf)+T(345,140,'FOH Lead',{w:600})+T(345,156,'TC / AC 客流客单',{s:11,c:C.mute})
 +'<line x1="240" y1="48" x2="240" y2="66" stroke="'+C.mute+'"/><line x1="240" y1="106" x2="240" y2="116" stroke="'+C.mute+'"/><line x1="135" y1="116" x2="345" y2="116" stroke="'+C.mute+'"/><line x1="135" y1="116" x2="135" y2="126" stroke="'+C.mute+'"/><line x1="345" y1="116" x2="345" y2="126" stroke="'+C.mute+'"/>';
 s+=T(240,184,'Owner · Deadline · Metric · Evidence · Escalation',{s:11,c:C.mute});
 return SV(200,s,'VPO reviews, RM owns the store result, BOH lead owns waste, FOH lead owns TC and AC');};
ILL.m8=function(){
 var st=[['Fact','事实'],['Cause','原因'],['Action','行动'],['Owner','责任'],['Deadline','期限'],['Impact','影响']],s='',i,x;
 for(i=0;i<6;i++){x=6+i*78;s+=R(x,20,66,50,[C.skyL,C.skyL,C.crustL,C.crustL,C.leafL,C.leafL][i],[C.sky,C.sky,C.crust,C.crust,C.leaf,C.leaf][i])+T(x+33,38,st[i][0],{w:600,s:12})+T(x+33,56,st[i][1],{s:12,c:C.mute});if(i<5)s+=arrow(x+68,45,x+77,45);}
 s+=R(10,96,460,56,C.bg||'#fff',C.line)+T(24,112,'Actual vs Budget vs Last year  实际 / 预算 / 去年',{a:'start',s:12,w:600})+T(24,134,'Explain both $ and percentage points 同时解释金额与百分点',{a:'start',s:12,c:C.mute});
 return SV(166,s,'Management update chain from fact to impact');};

/* ---------- advanced modules ---------- */
function pad(n){return ('0'+n).slice(-2);}
function eb(m,i){return m.adv?'ADVANCED · 进阶 '+pad(i+1):'MODULE '+pad(i+1);}
var ADVNOTE='<div class="card addnote"><p>'+b('Added content: this module goes beyond the original slides and handbook. Numbers and thresholds are illustrative starting points. Tune them with your own store data.','补充内容：本模块超出原培训PPT与教科书范围。数字与阈值仅为示例起点，请用各店自己的数据调整。')+'</p></div>';
function tbl(head,rows){return '<div style="overflow:auto"><table><thead><tr>'+head.map(function(h){return '<th>'+h+'</th>';}).join('')+'</tr></thead><tbody>'+rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+c+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table></div>';}
function fbox(arr){return arr.map(function(f){return '<span class="f">'+f[0]+'<br><span style="color:var(--mute)">'+f[1]+'</span></span>';}).join('');}

/* M09 illustration: plan vs actual by SKU */
ILL.m9=function(){
 var rows=[['Bread A','面包A',100,82,''],['Bread B','面包B',60,60,'sold out 15:00 售罄'],['Pastry C','点心C',80,70,''],['Cake D','蛋糕D',40,28,'']],sc=2.6,s='',i;
 rows.forEach(function(r,i){var y=14+i*36,p=r[2],so=r[3],x=104;
  s+=T(8,y+10,r[0],{a:'start',s:12,w:600})+T(8,y+25,r[1],{a:'start',s:10,c:C.mute});
  s+=R(x,y,p*sc,22,'none',C.mute,3);
  if(p>so)s+=R(x+so*sc,y,(p-so)*sc,22,C.redL,C.red,3);
  s+=R(x,y,so*sc,22,C.leaf,'',3);
  var lab=r[4]?(so+' / '+p+' · '+r[4]):(so+' / '+p+' · waste '+Math.round((p-so)/p*100)+'%');
  s+=T(x+p*sc+8,y+11,lab,{a:'start',s:11,w:r[4]?600:400,c:r[4]?C.crust:C.ink});});
 var ly=170;
 s+=R(104,ly-5,12,10,C.leaf,'',2)+T(120,ly,'Sold 售出',{a:'start',s:11})+R(190,ly-5,12,10,C.redL,C.red,2)+T(206,ly,'Waste 损耗',{a:'start',s:11})+R(290,ly-5,12,10,'none',C.mute,2)+T(306,ly,'Produced 生产量',{a:'start',s:11});
 return SV(186,s,'Plan versus actual for four items: three leave waste, one sold out at 15:00 and lost sales');};

/* M10 illustration: live hourly chart */
var DEF10=[10,14,18,30,34,22,12,14,20,32,28,16];
function hourChart(tc,start){
 var n=tc.length,sum=0,i;for(i=0;i<n;i++)sum+=tc[i];
 var avg=sum/n,hi=avg*1.2,lo=avg*0.8,mx=Math.max.apply(null,tc.concat([1])),base=128,sc=88/mx,w=30,gap=7,x0=28,s='';
 s+='<line x1="20" y1="'+base+'" x2="470" y2="'+base+'" stroke="'+C.line+'"/>';
 tc.forEach(function(v,i){var x=x0+i*(w+gap),h=v*sc,f,st;
  if(v>=hi-1e-9){f=C.crust;st='none';}else if(v<=lo+1e-9){f='#e3d8c6';st='none';}else{f=C.skyL;st=C.sky;}
  s+=R(x,base-h,w,Math.max(h,1),f,st,3)+T(x+w/2,base-h-8,Math.round(v),{s:10})+T(x+w/2,base+12,pad((start+i)%24),{s:10,c:C.mute});});
 [[avg,C.mute,''],[hi,C.crust,'4 3'],[lo,C.mute,'4 3']].forEach(function(l){var y=base-l[0]*sc;s+='<line x1="20" y1="'+y+'" x2="470" y2="'+y+'" stroke="'+l[1]+'" stroke-width="1"'+(l[2]?' stroke-dasharray="'+l[2]+'"':'')+'/>';});
 var ly=base+36;
 s+=R(28,ly-5,10,10,C.crust,'',2)+T(43,ly,'Peak ≥120% avg 高峰',{a:'start',s:11})+R(178,ly-5,10,10,C.skyL,C.sky,2)+T(193,ly,'Shoulder 平稳',{a:'start',s:11})+R(290,ly-5,10,10,'#e3d8c6','',2)+T(305,ly,'Non-peak ≤80% avg 非高峰',{a:'start',s:11});
 return SV(180,s,'Customer count per hour, classified as peak, shoulder or non-peak');}
ILL.m10=function(){return '<div id="hc">'+hourChart(DEF10,8)+'</div>';};

/* M11 illustration: flat plan across the week */
function dayChart(p){
 var days=[['Mon','一',p.wd],['Tue','二',p.wd],['Wed','三',p.wd],['Thu','四',p.wd],['Fri','五',p.wd],['Sat','六',p.we],['Sun','日',p.we]];
 var base=130,sc=100/Math.max(p.wd,p.we,p.flat),w=44,gap=18,x0=28,s='';
 s+='<line x1="20" y1="'+base+'" x2="470" y2="'+base+'" stroke="'+C.line+'"/>';
 days.forEach(function(d,i){var x=x0+i*(w+gap),dm=d[2],top=Math.max(dm,p.flat);
  s+=R(x,base-dm*sc,w,dm*sc,C.skyL,C.sky,3);
  if(dm<p.flat)s+=R(x,base-p.flat*sc,w,(p.flat-dm)*sc,C.redL,C.red,3);
  if(dm>p.flat)s+=R(x,base-dm*sc,w,(dm-p.flat)*sc,'#f6d27a','#b58105',3);
  s+=T(x+w/2,base-top*sc-8,dm,{s:11,w:600})+T(x+w/2,base+13,d[0]+' '+d[1],{s:11});
  var diff=dm-p.flat;
  s+=T(x+w/2,base+28,diff<0?'waste '+(-diff):(diff>0?'lost '+diff:'—'),{s:10,c:diff<0?C.red:(diff>0?'#8a5d00':C.mute),w:600});});
 var yl=base-p.flat*sc;
 s+='<line x1="20" y1="'+yl+'" x2="470" y2="'+yl+'" stroke="'+C.ink+'" stroke-dasharray="5 4" stroke-width="1.5"/>';
 var ly=176;
 s+=R(28,ly-5,12,10,C.skyL,C.sky,2)+T(44,ly,'Demand 需求',{a:'start',s:11})+R(128,ly-5,12,10,C.redL,C.red,2)+T(144,ly,'Waste 损耗',{a:'start',s:11})+R(222,ly-5,12,10,'#f6d27a','#b58105',2)+T(238,ly,'Lost sales 损失销售',{a:'start',s:11})
  +'<line x1="352" y1="'+ly+'" x2="376" y2="'+ly+'" stroke="'+C.ink+'" stroke-dasharray="5 4" stroke-width="1.5"/>'+T(382,ly,'Flat plan '+p.flat,{a:'start',s:11});
 return SV(194,s,'Seven days of demand against one flat production plan: weak days waste, strong days sell out');}
ILL.m11=function(){return '<div id="dc">'+dayChart({wd:80,we:120,flat:100})+'</div>';};

/* M09 extras */
function x9(){
 var F=[['Sell-through % = Sold ÷ Produced × 100%','售罄率 = 售出 ÷ 生产 × 100%'],['Waste % = (Produced − Sold) ÷ Produced × 100%','损耗率 = (生产 − 售出) ÷ 生产 × 100%'],['Plan accuracy % = (Actual sales − Planned) ÷ Planned × 100%','计划准确度 = (实际销售 − 计划) ÷ 计划 × 100%'],['Lost sales ≈ hourly run-rate × hours sold out','损失销售 ≈ 每小时销量 × 售罄小时数']];
 var rt=tbl([bi('Rhythm','节奏'),bi('Owner','负责人'),bi('What to review','检讨内容'),bi('Output','产出')],[
  [b('Daily','每日'),'<strong>BOH Lead</strong>',b('Plan vs actual by SKU, sold-out time, waste log','按SKU对比计划与实际、售罄时间、损耗记录'),b('Adjust next-day quantity and bake time','调整次日数量与烘焙时间')],
  [b('Weekly','每周'),'<strong>RM</strong>',b('Weekday pattern, top 5 waste SKUs, top 5 stock-out SKUs','星期几规律、损耗前5与断货前5的SKU'),b('Update plan by day type; assign owners','按日型更新计划并指定负责人')],
  [b('Biweekly','双周'),'<strong>SRM</strong>',b('Cross-store benchmark: waste %, sell-through %','跨店对标：损耗率、售罄率'),b('Coaching actions, share best practice','辅导行动、分享最佳做法')],
  [b('Monthly','每月'),'<strong>VPO</strong>',b('SKU mix, trend, COGS % vs budget','SKU组合、趋势、原料率对比预算'),b('Targets, resources, escalation','目标、资源、升级')]]);
 var steps=[['1. Collect','收集','Production plan, production log, POS by hour and SKU, waste log, sold-out time.','生产计划、生产记录、按小时和SKU的POS、损耗记录、售罄时间。'],
  ['2. Compare','对比','Plan vs actual by SKU and by daypart.','按SKU与时段对比计划与实际。'],
  ['3. Classify','分类','Over-produced (waste) · under-produced (sold out early) · wrong timing (stock when there is no demand).','生产过量（损耗）· 生产不足（提早售罄）· 时间错配（没需求时有货）。'],
  ['4. Find the cause','找根因','Forecast, bake timing, display rule, roster, weather or event, new launch, and whether the waste log is complete.','预测、烘焙时间、陈列规则、排班、天气或活动、新品、损耗记录是否完整。'],
  ['5. Act and re-check','行动与复查','Change par or bake time; name the owner and deadline; check the result next week.','调整定量或烘焙时间；指定负责人与期限；下周复查结果。']];
 return '<div class="card"><h3>'+bi('KEY MEASURES','关键指标')+'</h3>'+fbox(F)+'</div>'
 +'<div class="card"><h3>'+bi('REVIEW ROUTINE (matches the RACI)','检讨节奏（与责任矩阵一致）')+'</h3>'+rt+'</div>'
 +'<div class="card"><h3>'+bi('5-STEP ANALYSIS','五步分析')+'</h3>'+steps.map(function(s){return '<p style="margin:8px 0"><strong>'+bi(s[0],s[1])+'</strong><br>'+b(s[2],s[3])+'</p>';}).join('')+'</div>'
 +'<div class="card warn"><p>'+b('Quality guardrail: never hit a waste target by cutting display below standard or holding product past its shelf-life rule.','品质底线：不能为了达到损耗目标而把陈列减到标准以下，或让产品超过保质规定。')+'</p></div>';
}

/* M10 extras */
function x10(){
 var inp='';for(var i=0;i<12;i++)inp+='<div><label id="hl'+i+'">'+pad(8+i)+':00</label><input type="number" min="0" step="1" id="h'+i+'" value="'+DEF10[i]+'"></div>';
 var tool='<div class="card" id="hbox"><h3>'+bi('TRY IT: enter your store hourly customer count (TC)','动手试试：输入门店每小时客流（TC）')+'</h3>'
 +'<p class="note">'+b('Use the average of the last 4 to 8 same weekdays. The chart above updates as you type.','取最近4至8个同一星期几的平均值。上方图会随输入更新。')+'</p>'
 +'<div class="row"><label for="hs" class="note">'+bi('First hour','起始小时')+'</label><input type="number" min="0" max="12" step="1" id="hs" value="8" style="width:80px;border:1px solid var(--line);border-radius:8px;padding:6px 8px;font:inherit"><button class="btn ghost" id="hreset">'+bi('Reset to example','恢复示例')+'</button></div>'
 +'<div class="hr" style="margin-top:10px">'+inp+'</div>'
 +'<div class="err" id="he">'+bi('Enter customer counts of 0 or more (at least one above 0) and a first hour from 0 to 12.','请输入大于或等于0的客流（至少一个大于0），起始小时为0至12。')+'</div>'
 +'<div class="kpi"><div><span class="note">'+bi('Average TC per hour','每小时平均客流')+'</span><b id="ka"></b></div><div><span class="note">'+bi('Peak hours','高峰小时数')+'</span><b id="kp"></b></div><div><span class="note">'+bi('Share of TC in peak','高峰客流占比')+'</span><b id="ks"></b></div></div>'
 +'<p class="note" id="hp"></p>'
 +'<p class="note" style="margin-top:6px">'+b('Rule used: peak = hour at or above 120% of the average hour; non-peak = at or below 80%; shoulder = in between. Adjust with your RM if your store pattern is different.','使用规则：高峰 = 不低于平均小时的120%；非高峰 = 不高于80%；其余为平稳。若门店规律不同，请与RM一起调整。')+'</p></div>';
 var dep=tbl([bi('Class','类别'),bi('Production (BOH)','生产（BOH）'),bi('Display and stock','陈列与库存'),bi('People','人手')],[
  [b('<strong>Peak</strong>','<strong>高峰</strong>'),b('Bake waves land 30 to 60 min before the peak starts, plus one top-up wave inside the peak (lead time depends on product).','烘焙批次在高峰开始前30至60分钟完成，高峰中再补一批（提前量视产品而定）。'),b('Display full at peak start; par sized to last the first hour.','高峰开始时陈列满；定量够撑第一个小时。'),b('All counters open, one runner on replenishment, breaks before or after. BOH on bake and finish only.','所有收银位开放，一人专责补货，休息安排在高峰前后。BOH只做烘焙与完成。')],
  [b('<strong>Shoulder</strong>','<strong>平稳</strong>'),b('Small top-up waves; keep display presentable, not overfull.','小批量补烤；陈列保持美观但不过量。'),b('Rebuild display ahead of the next peak.','为下一个高峰提前补齐陈列。'),b('Rotate breaks; cross-train FOH and BOH.','轮流休息；FOH与BOH交叉培训。')],
  [b('<strong>Non-peak</strong>','<strong>非高峰</strong>'),b('Smaller, more frequent batches or bake to demand; avoid large late batches.','小批量、多频次，或按需求烘焙；避免晚间大批量。'),b('Lower par; slow movers on minimum display.','降低定量；慢销产品保持最低陈列。'),b('Use time for prep, cleaning, training and breaks. Remove idle overlap and OT first.','用于备料、清洁、培训和休息。先优化空闲重叠与加班。')]]);
 var q=tbl([bi('Class','类别'),bi('Review questions','检讨问题')],[
  [b('<strong>Peak</strong>','<strong>高峰</strong>'),b('Was the display full when the peak began? Which SKUs sold out and at what time? Did customers queue or walk away?','高峰开始时陈列是否已满？哪些SKU几点售罄？顾客是否排长队或离开？')],
  [b('<strong>Non-peak</strong>','<strong>非高峰</strong>'),b('How much was baked after the last peak and how much of it became waste? How many staff-hours were idle? Any OT?','最后一个高峰后烤了多少、其中多少变成损耗？闲置了多少人工小时？有无加班？')]]);
 return tool
 +'<div class="card"><h3>'+bi('DEPLOY BY CLASS (suggested starting point)','按类别调配（建议起点）')+'</h3>'+dep+'</div>'
 +'<div class="card"><h3>'+bi('MEASURE: SALES PER LABOUR HOUR (SPLH)','衡量：每人工小时销售（SPLH）')+'</h3>'+fbox([['SPLH = Sales in the hour ÷ staff-hours in the hour','SPLH = 该小时销售 ÷ 该小时在岗人工小时']])+'<p class="note">'+b('Expect SPLH to be high in peak and low in non-peak. The goal is to lift non-peak SPLH by removing idle overlap, not by cutting service coverage.','预期高峰SPLH高、非高峰SPLH低。目标是通过减少空闲重叠来提高非高峰SPLH，而不是削减服务人手。')+'</p></div>'
 +'<div class="card"><h3>'+bi('REVIEW CHECKLIST','检讨清单')+'</h3>'+q+'</div>';
}
function bind10(){
 function upd(){
  var arr=[],bad=false,i,st=parseInt($('#hs').value,10);
  for(i=0;i<12;i++){var v=$('#h'+i).value.trim();if(v===''||isNaN(+v)||+v<0)bad=true;arr.push(+v);}
  var sum=arr.reduce(function(a,c){return a+c;},0);
  if(isNaN(st)||st<0||st>12||bad||sum<=0){$('#he').style.display='block';return;}
  $('#he').style.display='none';
  for(i=0;i<12;i++)$('#hl'+i).textContent=pad(st+i)+':00';
  var avg=sum/12,hi=avg*1.2,pk=[],pt=0;
  arr.forEach(function(v,i){if(v>=hi-1e-9){pk.push(pad(st+i)+':00');pt+=v;}});
  $('#hc').innerHTML=hourChart(arr,st);
  $('#ka').textContent=(Math.round(avg*10)/10).toString();
  $('#kp').textContent=pk.length+' / 12';
  $('#ks').textContent=(Math.round(pt/sum*1000)/10)+'%';
  $('#hp').textContent=pk.length?('Peak 高峰: '+pk.join(', ')):'Peak 高峰: none 无';
 }
 $('#hbox').addEventListener('input',upd);
 $('#hreset').addEventListener('click',function(){$('#hs').value=8;for(var i=0;i<12;i++)$('#h'+i).value=DEF10[i];upd();});
 upd();
}

/* M11 extras */
function x11(){
 var ex=tbl([bi('What a good store does','好的门店应有'),bi('Evidence to check','检查证据'),bi('Red flag','警示信号')],[
  [b('Plan moves with demand by day type','计划随日型需求而变'),b('Planned quantity by weekday for the last 4 weeks, next to sales by weekday','最近4周按星期几的计划量，对照按星期几的销售'),b('Planned quantity varies under 10% while sales vary over 20% (suggested starting thresholds)','计划量变化不到10%，销售变化超过20%（建议起始阈值）')],
  [b('Plan is split into bake waves by time','计划按时间分批烘焙'),b('Bake schedule and production log by time of day','按时间的烘焙表与生产记录'),b('Same batch size at every wave; display full at close','每一批数量相同；打烊时陈列仍然很满')],
  [b('Known events are planned ahead','已知活动提前计划'),b('Event calendar (public holiday, school holiday, weather, promotion, festive) against logged plan changes','活动日历（公共假期、学校假期、天气、促销、节庆）对照计划调整记录'),b('No log of changes; surprises explained after the fact','没有调整记录；事后才解释意外')],
  [b('Waste and sold-out time tracked by weekday','按星期几追踪损耗与售罄时间'),b('Waste % and sold-out time by weekday','按星期几的损耗率与售罄时间'),b('High waste early in the week and early sell-out at the weekend, hidden by a normal average','周初高损耗、周末早售罄，被正常的平均数掩盖')],
  [b('Plan has an owner and a weekly review','计划有负责人与每周检讨'),b('BOH Lead sets it, RM approves changes, reviewed weekly','BOH Lead制定、RM批准调整、每周检讨'),b('Nobody can say who sets the plan','没人说得清谁制定计划')]]);
 var rows=[['Mon–Thu','周一至四'],['Fri','周五'],['Sat','周六'],['Sun','周日'],['Public holiday eve','公共假期前夕'],['Public holiday','公共假期'],['School holiday','学校假期'],['Rainy day','雨天'],['Promo or new launch','促销或新品']];
 var mx=tbl([bi('Day type','日型'),bi('Demand index (weekday = 100)','需求指数（平日 = 100）'),bi('Planned qty','计划量'),bi('Owner','负责人')],rows.map(function(r){return ['<strong>'+r[0]+'</strong><br><span class="note">'+r[1]+'</span>','<input type="text" class="num" aria-label="index">','<input type="text" class="num" aria-label="qty">','<input type="text" class="num" aria-label="owner">'];}));
 var tool='<div class="card" id="dbox"><h3>'+bi('TRY IT: flat plan vs day-type plan (one SKU group, one week)','动手试试：固定计划 vs 按日型计划（一个SKU组，一周）')+'</h3>'
 +'<div class="sl"><span>'+bi('Weekday demand (Mon–Fri)','平日需求（周一至五）')+'</span><input type="range" id="dw" min="40" max="140" step="1" value="80"><output id="odw"></output></div>'
 +'<div class="sl"><span>'+bi('Weekend demand (Sat–Sun)','周末需求（周六日）')+'</span><input type="range" id="de" min="60" max="200" step="1" value="120"><output id="ode"></output></div>'
 +'<div class="sl"><span>'+bi('Flat plan per day','每天固定计划量')+'</span><input type="range" id="fp" min="40" max="200" step="1" value="100"><output id="ofp"></output></div>'
 +'<div class="sl"><span>'+bi('Day-type buffer','日型计划缓冲')+'</span><input type="range" id="bf" min="0" max="15" step="1" value="5"><output id="obf"></output></div>'
 +'<div class="row"><label class="note">'+bi('Cost per unit $','每件成本 $')+' <input type="number" id="cu" min="0" step="0.1" value="2" style="width:80px;border:1px solid var(--line);border-radius:8px;padding:6px 8px;font:inherit"></label><label class="note">'+bi('Margin per lost unit $','每件损失毛利 $')+' <input type="number" id="mg" min="0" step="0.1" value="2.5" style="width:80px;border:1px solid var(--line);border-radius:8px;padding:6px 8px;font:inherit"></label><button class="btn ghost" id="dreset">'+bi('Reset to example','恢复示例')+'</button></div>'
 +'<div class="err" id="de2">'+bi('Enter a cost and a margin of 0 or more.','请输入大于或等于0的成本与毛利。')+'</div>'
 +'<div class="kpi"><div><span class="note">'+bi('Flat plan: weekly loss','固定计划：每周损失')+'</span><b id="kf"></b></div><div><span class="note">'+bi('Day-type plan: weekly loss','日型计划：每周损失')+'</span><b id="kd"></b></div><div><span class="note">'+bi('Weekly improvement','每周改善')+'</span><b id="ki" class="pos"></b></div></div>'
 +'<p class="note" id="dd"></p></div>';
 return tool
 +'<div class="card"><h3>'+bi('WHAT TO EXPECT FROM A STORE','对门店的预期标准')+'</h3>'+ex+'</div>'
 +'<div class="card"><h3>'+bi('SAME PLAN ALL DAY? WITHIN THE DAY','同一天里也用同一份计划？')+'</h3><p>'+b('If the store bakes one large batch in the morning and tops up little, expect a full morning display, leftovers and discounting in the afternoon, and a thin display just before the evening peak. Look for bake waves tied to the peak and non-peak pattern (see the smart deployment module).','如果门店早上一次烤大批量、之后很少补烤，预期是早上陈列丰富、下午剩货与降价、傍晚高峰前陈列偏少。应看到与高峰/非高峰对应的分批烘焙（见「智能调配」模块）。')+'</p></div>'
 +'<div class="card ws"><h3>'+bi('DAY-TYPE MATRIX TEMPLATE (not saved)','日型矩阵模板（不保存）')+'</h3>'+mx+'</div>';
}
function bind11(){
 function upd(){
  var wd=+$('#dw').value,we=+$('#de').value,fp=+$('#fp').value,bf=+$('#bf').value/100;
  $('#odw').textContent=wd;$('#ode').textContent=we;$('#ofp').textContent=fp;$('#obf').textContent=Math.round(bf*100)+'%';
  var cr=$('#cu').value.trim(),mr=$('#mg').value.trim(),cu=+cr,mg=+mr;
  if(cr===''||mr===''||isNaN(cu)||isNaN(mg)||cu<0||mg<0){$('#de2').style.display='block';return;}
  $('#de2').style.display='none';
  var fw=5*Math.max(fp-wd,0)+2*Math.max(fp-we,0),fl=5*Math.max(wd-fp,0)+2*Math.max(we-fp,0);
  var pw=Math.round(wd*(1+bf)),pe=Math.round(we*(1+bf));
  var dw2=5*Math.max(pw-wd,0)+2*Math.max(pe-we,0),dl=5*Math.max(wd-pw,0)+2*Math.max(we-pe,0);
  var fc=fw*cu+fl*mg,dc=dw2*cu+dl*mg;
  $('#dc').innerHTML=dayChart({wd:wd,we:we,flat:fp});
  $('#kf').textContent='$'+fmt(fc);$('#kd').textContent='$'+fmt(dc);
  var im=fc-dc,ki=$('#ki');ki.textContent=(im>=0?'$':'−$')+fmt(Math.abs(im));ki.className=im>=0?'pos':'neg';
  $('#dd').textContent='Flat plan 固定: waste 损耗 '+fw+' units, lost 损失 '+fl+' units.  Day-type 日型 (weekday '+pw+', weekend '+pe+'): waste '+dw2+', lost '+dl+'.';
 }
 $('#dbox').addEventListener('input',upd);
 $('#dreset').addEventListener('click',function(){$('#dw').value=80;$('#de').value=120;$('#fp').value=100;$('#bf').value=5;$('#cu').value=2;$('#mg').value=2.5;upd();});
 upd();
}

/* M12 illustration: MIA vs ABC + packaging */
ILL.m12=function(){
 var k=400/43000,x=40,s='',i;
 var segs=[[38000,C.sky],[1500,C.crust],[3500,C.red]];
 s+=T(40,10,'MIA food cost (finance report) = $43,000 (43% of sales)',{a:'start',s:11,c:C.mute});
 s+=R(40,20,400,30,C.skyL,C.sky,2);
 s+=T(240,35,'MIA 财务报表端',{s:12,w:600});
 s+=T(40,70,'ABC (real FC) + packaging, then what is left 剩下的差额',{a:'start',s:11,c:C.mute});
 segs.forEach(function(g){var w=g[0]*k;s+=R(x,80,w,30,g[1],'',2);x+=w;});
 s+=T(470,128,'Variance = MIA − ABC − packaging = $3,500 (3.5%)',{a:'end',s:12,w:600,c:C.red});
 var ly=152;
 s+=R(40,ly-5,12,10,C.sky,'',2)+T(56,ly,'ABC food cost 真实用量',{a:'start',s:11})
 +R(190,ly-5,12,10,C.crust,'',2)+T(206,ly,'Packaging 包装',{a:'start',s:11})
 +R(310,ly-5,12,10,C.red,'',2)+T(326,ly,'Variance 差额',{a:'start',s:11});
 return SV(168,s,'MIA food cost of 43000 against ABC 38000 plus packaging 1500 leaves a variance of 3500');};

/* M13 illustration: PM triage */
ILL.m13=function(){
 var s=R(8,30,92,44,C.crustL,C.crust)+T(54,46,'Issue',{w:600,s:12})+T(54,62,'发现问题',{s:11,c:C.mute})
 +arrow(102,52,124,52)
 +R(126,24,124,56,C.skyL,C.sky)+T(188,42,'Check first',{w:600,s:12})+T(188,58,'先检查 4 个问题',{s:11,c:C.mute})
 +'<path d="M252 52 L270 24" stroke="'+C.mute+'" fill="none"/><path d="M252 52 L270 90" stroke="'+C.mute+'" fill="none"/>'
 +R(272,6,200,38,C.leafL,C.leaf)+T(372,20,'Safe and simple: staff fix',{w:600,s:12,c:'#2f4f20'})+T(372,35,'安全简单：员工自己处理',{s:11,c:'#2f4f20'})
 +R(272,70,200,38,C.redL,C.red)+T(372,84,'Not safe / licensed: call PM',{w:600,s:12,c:'#6b2214'})+T(372,99,'不安全或需专业：叫PM',{s:11,c:'#6b2214'})
 +T(240,132,'Example 例子: dead bulb = staff buy and change 灯泡 = 自己买自己换',{s:12,c:C.mute});
 return SV(146,s,'Check four questions first; safe and simple jobs are fixed by staff, others go to PM');};

/* M12 extras */
function x12(){
 var tool='<div class="card" id="cbox"><h3>'+bi('TRY IT: MIA vs ABC variance','动手试试：MIA 与 ABC 的差额')+'</h3>'
 +'<p class="note">'+b('Use one month of your own figures (SGD). Backend adjustment can be negative.','用你门店一个月的数字（新币）。Backend 调整可以是负数。')+'</p>'
 +'<div class="hr hr6" style="margin-top:8px">'
 +'<div><label>'+bi('Net sales','净销售')+'</label><input type="number" min="1" id="g1" value="100000"></div>'
 +'<div><label>'+bi('MIA usage cost','MIA 用量成本')+'</label><input type="number" min="0" id="g2" value="43500"></div>'
 +'<div><label>'+bi('Backend adjustment','Backend 调整')+'</label><input type="number" id="g3" value="-500"></div>'
 +'<div><label>'+bi('ABC food cost','ABC 食材成本')+'</label><input type="number" min="0" id="g4" value="38000"></div>'
 +'<div><label>'+bi('General packaging','一般包装成本')+'</label><input type="number" min="0" id="g5" value="1500"></div>'
 +'<div><label>'+bi('Tolerance %','容许范围 %')+'</label><input type="number" min="0" step="0.1" id="g6" value="2"></div></div>'
 +'<div class="row"><button class="btn ghost" id="greset">'+bi('Reset to example','恢复示例')+'</button></div>'
 +'<div class="err" id="ge">'+bi('Enter numbers (usage, ABC, packaging and tolerance 0 or more; net sales above 0).','请输入数字（用量、ABC、包装、容许范围须大于或等于0；净销售须大于0）。')+'</div>'
 +'<div class="kpi"><div><span class="note">'+bi('MIA food cost','MIA 食材成本')+'</span><b id="gk1"></b></div><div><span class="note">'+bi('MIA FC %','MIA 成本率')+'</span><b id="gk2"></b></div><div><span class="note">'+bi('ABC FC %','ABC 成本率')+'</span><b id="gk3"></b></div><div><span class="note">'+bi('Variance','差额')+'</span><b id="gk4"></b></div><div><span class="note">'+bi('Variance %','差额占销售')+'</span><b id="gk5"></b></div></div>'
 +'<p class="note" id="gd"></p>'
 +'<p class="note" style="margin-top:6px">'+b('Tolerance is 2% of net sales for this variance. It is not the outlet waste vs sales limit (5%). Investigate any store above it.','此差额的容许范围是净销售的2%。这不是门店损耗占销售的上限（5%）。超过的门店就要追查。')+'</p></div>';
 var rd=tbl([bi('Column in the MIA report','MIA 报表栏位'),bi('What it means','含义')],[
  [b('<strong>MIA Usage Cost</strong>','<strong>MIA 用量成本</strong>'),b('Usage cost from the MIA report.','MIA 报表里的用量成本。')],
  [b('<strong>Backend Cost Adjustment / Allocation / Other</strong>','<strong>Backend 调整 / 分摊 / 其他</strong>'),b('Added to the usage cost (often a negative adjustment).','加到用量成本上（调整常为负数）。')],
  [b('<strong>Total Usage Cost = MIA Food Cost</strong>','<strong>总用量成本 = MIA 食材成本</strong>'),b('Usage + adjustment (+ allocation + other). Food Cost % = this ÷ total sales.','用量 + 调整（+ 分摊 + 其他）。食材成本率 = 此数 ÷ 总销售。')]]);
 var vr=tbl([bi('Measure','项目'),bi('How it is built','怎么来的')],[
  [b('<strong>ABC (real FC)</strong>','<strong>ABC（真实食材成本）</strong>'),b('Real food cost from the stock orders and the stock balance.','由订货量和库存结余算出的真实食材成本。')],
  [b('<strong>General packaging</strong>','<strong>一般包装成本</strong>'),b('Shown separately next to ABC.','在 ABC 旁边单独列出。')],
  [b('<strong>Variance</strong>','<strong>差额</strong>'),b('MIA Food Cost − ABC − General Packaging. Variance % = variance ÷ net sales.','MIA 食材成本 − ABC − 一般包装成本。差额% = 差额 ÷ 净销售。')]]);
 var lk=tbl([bi('Where it leaks','漏在哪里'),bi('Example','例子'),bi('Control','控制方法')],[
  [b('<strong>Stock inventory</strong>','<strong>库存盘点</strong>'),b('Wrong or missing items in the stock count change the balance and so change the cost.','盘点漏项或数错，会改变库存结余，进而改变成本。'),b('Specify which items are counted in stock inventory; count at the same time and the same way every month; two people check.','说明哪些物品计入库存；每月同一时间、同一方法盘点；两人核对。')],
  [b('<strong>Rejected item, no record (food cost only)</strong>','<strong>报废没有记录（仅食材成本）</strong>'),b('A customer drops a bread and staff throw it in the bin straight away. It left stock but is not in the waste log. This is food cost only, not packaging.','顾客把面包掉在地上，员工直接丢进垃圾桶，货没了，但损耗记录里没有。这只影响食材成本，不影响包装。'),b('Record every discard at the moment it happens, with item, quantity and reason. Rule: nothing goes in the bin without a record.','每次丢弃当场记录：品项、数量、原因。规则：没记录就不能丢进垃圾桶。')],
  [b('<strong>Staff meal, no record (food cost only)</strong>','<strong>员工餐没有记录（仅食材成本）</strong>'),b('Staff take items to eat without a record. The stock is used, but no sale and no waste show it. This is food cost only, not packaging.','员工拿货吃但没记录，库存用掉了，却没有销售也没有损耗记录。这只影响食材成本，不影响包装。'),b('Set a staff meal rule (what, how many, who approves) and record each one in a staff meal log.','定员工餐规定（可吃什么、数量、谁批准），每次登记员工餐记录。')]]);
 return tool
 +'<div class="card"><h3>'+bi('HOW TO READ THE MIA (MONTHLY INVENTORY ANALYSIS) REPORT','怎么读 MIA（月度库存分析）报表')+'</h3>'+rd+'</div>'
 +'<div class="card"><h3>'+bi('HOW THE VARIANCE IS BUILT','差额是怎么算出来的')+'</h3>'+vr+'</div>'
 +'<div class="card"><h3>'+bi('THREE COMMON LEAKS AND HOW TO CLOSE THEM','三个常见漏洞与堵法')+'</h3>'+lk+'</div>'
 +'<div class="card warn"><p>'+b('Guardrail: do not hide the variance by under-recording waste or by cutting staff meals unfairly. The goal is to make loss visible so you can act on it.','底线：不要靠少记损耗来掩盖差额，也不要不合理地取消员工餐。目标是让损耗看得见，才能处理。')+'</p></div>';
}
function bind12(){
 function upd(){
  var ids=['g1','g2','g3','g4','g5','g6'],v=[],bad=false,i,raw;
  for(i=0;i<6;i++){raw=$('#'+ids[i]).value.trim();if(raw===''||isNaN(+raw))bad=true;v.push(+raw);}
  if(bad||v[0]<=0||v[1]<0||v[3]<0||v[4]<0||v[5]<0){$('#ge').style.display='block';return;}
  $('#ge').style.display='none';
  var mia=v[1]+v[2],vr=mia-v[3]-v[4],vp=vr/v[0]*100;
  $('#gk1').textContent='$'+fmt(mia);
  $('#gk2').textContent=(Math.round(mia/v[0]*1000)/10)+'%';
  $('#gk3').textContent=(Math.round(v[3]/v[0]*1000)/10)+'%';
  var k4=$('#gk4');k4.textContent=(vr<0?'−$':'$')+fmt(Math.abs(vr));k4.className=vr>0?'neg':'';
  $('#gk5').textContent=(Math.round(vp*100)/100)+'%';
  $('#gd').textContent=vp>v[5]?'Above tolerance: investigate stock count, binned items without a record and staff meals. 超出容许范围：追查盘点、没记录的丢弃与员工餐。':(vp<0?'Variance below zero: recheck the MIA adjustment and the ABC figure. 差额为负：请核对 MIA 调整与 ABC 数字。':'Within tolerance. Keep the controls running. 在容许范围内，继续保持控制措施。');
 }
 $('#cbox').addEventListener('input',upd);
 $('#greset').addEventListener('click',function(){var d=[100000,43500,-500,38000,1500,2];for(var i=0;i<6;i++)$('#g'+(i+1)).value=d[i];upd();});
 upd();
}

/* M13 extras */
function x13(){
 var qs=[['Does it involve wiring, gas, water supply, a ladder above a safe height, or structure?','涉及电线、煤气、供水、过高的梯子或建筑结构吗？'],
  ['Is there any risk of shock, fire, burn, fall or injury?','有触电、火灾、烫伤、跌倒或受伤风险吗？'],
  ['Does it need a tool, part or qualification that staff do not have?','需要员工没有的工具、零件或资格吗？'],
  ['Is it under warranty, or the landlord or mall responsibility?','是否在保修期内，或属于业主、商场的责任？']];
 var tool='<div class="card" id="pbox"><h3>'+bi('TRY IT: should we call PM?','动手试试：该不该叫PM？')+'</h3>'
 +'<p class="note">'+b('Tick Yes for each question that applies, and the suggestion updates.','每个问题如果答案是「是」就打勾，建议会随之变化。')+'</p>'
 +qs.map(function(q,i){return '<label style="display:flex;gap:10px;align-items:flex-start;margin:8px 0;font-size:14px;cursor:pointer"><input type="checkbox" id="p'+(i+1)+'" style="margin-top:4px;width:18px;height:18px"><span>'+b(q[0],q[1])+'</span></label>';}).join('')
 +'<div class="res" id="pr" style="display:block"></div></div>';
 var ex=tbl([bi('Usually staff can handle (when safe)','通常员工可处理（在安全的前提下）'),bi('Call PM','叫PM处理')],[
  [b('Change a bulb of the same type: power off, stable step, dry area, correct rating. Buy it as a small purchase with receipt.','换同规格灯泡：先断电、站稳、地面干燥、规格正确；小额采购并保留收据。'),b('Flickering lights, burning smell, tripping power, exposed or damaged wiring.','灯一直闪烁、有焦味、跳闸、电线外露或破损。')],
  [b('Tighten a loose handle or shelf screw, replace a missing cabinet knob.','拧紧松掉的把手或层板螺丝、补上缺失的柜子拉手。'),b('Water leaks, blocked drains, gas smell, aircon not cooling, door or lock failure.','漏水、排水堵塞、煤气味、冷气不冷、门或锁故障。')],
  [b('Wipe, clean or reset (for example a tripped switch once, with no sign of danger).','擦拭、清洁或重置（例如只跳闸一次，且没有危险迹象）。'),b('Anything near the equipment warranty, fire safety, or a landlord-owned area.','涉及设备保修、消防安全或业主负责的区域。')]]);
 var an=tbl([bi('Measure','指标'),bi('What it tells you','说明什么')],[
  [b('PM requests per month, by cause','每月PM报修数量，按原因分类'),b('Where problems repeat','哪些问题在重复')],
  [b('% of requests that staff could have fixed','员工本可自己处理的占比'),b('Whether the triage check is working','先检查的做法是否有效')],
  [b('Time from request to fix, and cost','从报修到修好的时间与费用'),b('Whether PM time is used on the right jobs','PM的时间是否花在对的事上')]]);
 return tool
 +'<div class="card"><h3>'+bi('EXAMPLES','例子对照')+'</h3>'+ex+'</div>'
 +'<div class="card"><h3>'+bi('REVIEW THE PM LOG (RM, weekly)','检讨PM记录（RM，每周）')+'</h3>'+an+'</div>'
 +'<div class="card warn"><p>'+b('Safety first. Staff only do a fix when it is reasonable and safe, and follow the company safety rules. If you are not sure, stop and call PM. Never touch wiring, gas or water supply.','安全第一。员工只在合理且安全时才自己处理，并遵守公司安全规定。不确定就停下来叫PM。绝不触碰电线、煤气或供水。')+'</p></div>';
}
function bind13(){
 function upd(){
  var a=$('#p1').checked||$('#p2').checked||$('#p3').checked,w=$('#p4').checked,r=$('#pr');
  if(a){r.className='res no';r.innerHTML='<strong>'+bi('Call PM','叫PM')+'</strong> — '+b('Do not attempt it. Make the area safe, stop using the item, and raise a PM request with a photo.','不要自己处理。先确保现场安全、停止使用，并附照片提交PM报修。');}
  else if(w){r.className='res no';r.innerHTML='<strong>'+bi('Report it','先上报')+'</strong> — '+b('Raise it through the warranty, landlord or mall route so you do not lose cover. Keep a photo.','通过保修、业主或商场的渠道报修，避免失去保障。保留照片。');}
  else{r.className='res ok';r.innerHTML='<strong>'+bi('Staff can fix it','员工可自己处理')+'</strong> — '+b('Do it safely, use a small purchase with receipt, and note it in the maintenance log.','在安全的前提下处理，小额采购并保留收据，并记在维修记录里。');}
 }
 $('#pbox').addEventListener('change',upd);
 upd();
}

/* ---------- extra illustrations (second picture per module) ---------- */
var ILX={};
function ttl(s){return T(10,14,s,{a:'start',s:12,w:600});}
ILX.m1={cap:['Where each $100 of sales goes (example): it adds up to $103','每$100销售的去向（示例）：合计$103，所以亏$3'],f:function(){
 var d=[['45',180,C.crustL,C.crust,'COGS 原料'],['23',92,C.skyL,C.sky,'Labour 人工'],['23',92,C.leafL,C.leaf,'Rent 租金'],['12',48,'#e3d8c6',C.mute,'Other 其他']],x=40,s=ttl('Sales $100 = 440 px mark  销售$100');
 d.forEach(function(g,i){s+=R(x,34,g[1],36,g[2],g[3],3)+T(x+g[1]/2,52,g[0],{w:600})+T(x+g[1]/2,84,g[4],{s:11,c:C.mute});x+=g[1];});
 s+='<line x1="440" y1="26" x2="440" y2="76" stroke="'+C.ink+'" stroke-dasharray="4 3"/>'+R(440,34,12,36,C.redL,C.red,2)+T(446,100,'−3',{w:600,c:C.red})+T(440,22,'$100',{s:11});
 return SV(112,s,'Costs add to 103 against sales of 100');}};
ILX.m2={cap:['Sales by daypart (example, total $1,600): find which part to grow','按时段销售（示例，合计$1,600）：找出要加强的时段'],f:function(){
 var d=[['Morning 早上',400],['Lunch 午餐',500],['Afternoon 下午',300],['Evening 晚上',400]],s=ttl('Sales by daypart 按时段销售');
 d.forEach(function(r,i){var y=28+i*30;s+=T(10,y+10,r[0],{a:'start',s:12})+R(120,y,r[1]*0.6,20,i===1?C.crust:C.skyL,i===1?'none':C.sky,3)+T(120+r[1]*0.6+8,y+10,'$'+r[1],{a:'start',s:12,w:600});});
 return SV(156,s,'Lunch is the biggest daypart at 500 dollars');}};
ILX.m3={cap:['Too little or too much both cost money: aim for the sweet spot','太少太多都亏钱：目标是中间的最佳点'],f:function(){
 var s=ttl('Total loss $ 总损失');
 s+='<path d="M40 36 Q240 196 440 36" fill="none" stroke="'+C.crust+'" stroke-width="2.5"/><line x1="40" y1="130" x2="440" y2="130" stroke="'+C.line+'"/>'
 +'<circle cx="240" cy="116" r="6" fill="'+C.leaf+'"/>'+T(240,92,'Sweet spot 最佳点',{w:600,c:C.leaf})
 +T(40,148,'Too little: stock-outs 太少：缺货',{a:'start',s:11,c:C.mute})+T(440,148,'Too much: waste 太多：损耗',{a:'end',s:11,c:C.mute})
 +T(240,166,'Production quantity 生产量 →',{s:11,c:C.mute});
 return SV(176,s,'Loss curve is lowest in the middle between too little and too much production');}};
ILX.m4={cap:['Two overlapping shifts: the overlap after the lunch peak is idle time (example)','两个班次重叠：午高峰后的重叠就是空闲人工（示例）'],f:function(){
 var X=function(h){return 40+(h-8)*35;},s=ttl('Shifts vs demand 班次与需求');
 s+=R(X(8),34,X(16)-X(8),24,C.skyL,C.sky,3)+T(X(8)+8,46,'Shift A 8–16',{a:'start',s:11})
 +R(X(12),62,X(20)-X(12),24,C.skyL,C.sky,3)+T(X(12)+8,74,'Shift B 12–20',{a:'start',s:11})
 +R(X(14),30,X(16)-X(14),60,C.redL,C.red,3)+'<rect x="'+X(14)+'" y="30" width="'+(X(16)-X(14))+'" height="60" fill="none" stroke="'+C.red+'" stroke-dasharray="4 3"/>'
 +R(X(12),98,X(14)-X(12),14,C.crust,'',2)+R(X(18),98,X(19)-X(18),14,C.crust,'',2)+T(X(8),105,'Peak 高峰',{a:'start',s:11,c:C.mute})
 +T((X(14)+X(16))/2,22,'Idle 空闲',{s:11,c:C.red,w:600});
 for(var h=8;h<=20;h+=2)s+=T(X(h),128,h+':00',{s:10,c:C.mute});
 return SV(142,s,'Shift A and B overlap between 14:00 and 16:00 after the lunch peak');}};
ILX.m5={cap:['Margin of safety: sales must pass the break-even line (example)','安全边际：销售要越过盈亏平衡线（示例）'],f:function(){
 var X=function(k){return 40+k*2.5;},s=ttl('Sales $k 销售（千）');
 s+=R(X(0),40,X(109.4)-X(0),30,C.redL,'',0)+R(X(109.4),40,X(160)-X(109.4),30,C.leafL,'',0)
 +T(150,55,'Loss zone 亏损区',{c:C.red,w:600})+T(385,55,'Profit zone 盈利区',{c:C.leaf,w:600,s:11})
 +'<line x1="'+X(109.4)+'" y1="32" x2="'+X(109.4)+'" y2="80" stroke="'+C.ink+'" stroke-width="2"/>'+T(X(109.4),24,'Break-even $109.4k 盈亏平衡',{s:11,w:600})
 +'<circle cx="'+X(100)+'" cy="55" r="5" fill="'+C.red+'"/>'+T(X(100)-4,98,'Now $100k 现在',{a:'end',s:11})
 +'<circle cx="'+X(115)+'" cy="55" r="5" fill="'+C.leaf+'"/>'+T(X(115)+4,98,'Target $115k 目标',{a:'start',s:11});
 return SV(116,s,'Current sales of 100 thousand are below break-even of 109.4 thousand');}};
ILX.m6={cap:['Pick levers by impact and effort: do the high-impact easy ones first','按影响与难度选杠杆：先做影响大又容易的'],f:function(){
 var s=ttl('Impact ↑ 影响   Effort → 难度');
 s+=R(40,26,200,70,C.leafL,C.leaf,0)+R(240,26,200,70,C.skyL,C.sky,0)+R(40,96,200,70,'#efe7d8',C.mute,0)+R(240,96,200,70,C.redL,C.red,0)
 +T(52,40,'Do first 先做',{a:'start',s:11,w:600,c:C.leaf})+T(252,40,'Plan 规划',{a:'start',s:11,w:600,c:C.sky})+T(52,110,'Quick tidy 顺手做',{a:'start',s:11,w:600,c:C.mute})+T(252,110,'Avoid 暂缓',{a:'start',s:11,w:600,c:C.red})
 +'<circle cx="140" cy="68" r="5" fill="'+C.leaf+'"/>'+T(150,68,'Waste control 损耗',{a:'start',s:11})
 +'<circle cx="270" cy="68" r="5" fill="'+C.sky+'"/>'+T(280,68,'Bundles 套餐',{a:'start',s:11})
 +'<circle cx="70" cy="138" r="5" fill="'+C.mute+'"/>'+T(80,138,'Display tidy 陈列',{a:'start',s:11})
 +'<circle cx="270" cy="138" r="5" fill="'+C.red+'"/>'+T(280,138,'Renovation 装修',{a:'start',s:11});
 return SV(180,s,'Impact versus effort grid with four example levers');}};
ILX.m7={cap:['Escalate when it is not solved: each level has a time limit','没解决就往上报：每一级都有时间限制'],f:function(){
 var d=[['Lead 组长','Same day 当天'],['RM','48 hours 48小时'],['SRM','Weekly 每周'],['VPO','Monthly 每月']],s=ttl('Escalation ladder 升级阶梯');
 d.forEach(function(g,i){var x=40+i*105,h=36+i*28,y=150-h;s+=R(x,y,98,h,[C.leafL,C.skyL,C.crustL,'#efe7d8'][i],[C.leaf,C.sky,C.crust,C.mute][i],3)+T(x+49,y+16,g[0],{w:600})+T(x+49,166,g[1],{s:11,c:C.mute});});
 return SV(180,s,'Four step ladder from team lead to VPO with time limits');}};
ILX.m8={cap:['A variance bridge: explain the gap between budget and actual (example, $k)','差异桥：解释预算与实际之间的差距（示例，千元）'],f:function(){
 var st=[['Budget','预算',5,'t'],['Sales','销售',-2,'d'],['COGS','原料',-1,'d'],['Labour','人工',1,'d'],['Actual','实际',3,'t']],Y=function(v){return 120-v*14;},s=ttl('Profit bridge 利润桥'),run=0;
 s+='<line x1="20" y1="'+Y(0)+'" x2="470" y2="'+Y(0)+'" stroke="'+C.mute+'"/>';
 st.forEach(function(g,i){var x=30+i*88,a,bb,col;
  if(g[3]==='t'){a=0;bb=g[2];run=g[2];col=C.sky;}else{a=run;bb=run+g[2];run=bb;col=g[2]>=0?C.leaf:C.red;}
  var y1=Y(Math.max(a,bb)),y2=Y(Math.min(a,bb));
  s+=R(x,y1,60,Math.max(2,y2-y1),col,'',3)+T(x+30,y1-9,(g[3]==='d'?(g[2]>0?'+':'−'):'')+Math.abs(g[2]),{w:600,s:12})+T(x+30,Y(0)+14,g[0],{s:11})+T(x+30,Y(0)+28,g[1],{s:11,c:C.mute});});
 return SV(168,s,'Budget profit 5 minus sales 2 minus COGS 1 plus labour 1 equals actual profit 3');}};
ILX.m9={cap:['The daily review loop: plan, bake, sell, record, compare, adjust','每日检讨循环：计划、烘焙、销售、记录、对比、调整'],f:function(){
 var d=[['Plan','计划'],['Bake','烘焙'],['Sell','销售'],['Record','记录'],['Compare','对比'],['Adjust','调整']],s=ttl('Daily loop 每日循环'),i,x;
 for(i=0;i<6;i++){x=6+i*80;s+=R(x,28,66,46,i%2?C.skyL:C.crustL,i%2?C.sky:C.crust,6)+T(x+33,44,d[i][0],{w:600,s:12})+T(x+33,62,d[i][1],{s:11,c:C.mute});if(i<5)s+=arrow(x+68,51,x+78,51);}
 s+='<path d="M439 76 C439 108 39 108 39 78" fill="none" stroke="'+C.mute+'" stroke-dasharray="4 4"/>'+arrow(39,92,39,78)+T(240,120,'Next day uses what you learned 明天用今天学到的',{s:11,c:C.mute});
 return SV(134,s,'Six step daily loop that returns to planning');}};
ILX.m10={cap:['Bake waves land before the peak starts, not during it (example)','烘焙批次要在高峰开始前完成，而不是高峰中才开始（示例）'],f:function(){
 var s=ttl('Customers per hour 每小时客流'),base=120,sc=2.6;
 DEF10.forEach(function(v,i){var x=28+i*37,pk=(i===3||i===4||i===9);s+=R(x,base-v*sc,30,v*sc,pk?C.crust:C.skyL,pk?'none':C.sky,3)+T(x+15,base+12,pad(8+i),{s:10,c:C.mute});});
 [2,8].forEach(function(i){var x=28+i*37+15;s+='<polygon points="'+(x-7)+',160 '+(x+7)+',160 '+x+',148" fill="'+C.leaf+'"/>';});
 s+=T(28,180,'▲ Bake wave 烘焙批次',{a:'start',s:11,c:C.leaf,w:600})+T(250,180,'■ Peak hour 高峰小时',{a:'start',s:11,c:C.crust,w:600});
 return SV(192,s,'Bake wave markers sit one hour before each peak hour');}};
ILX.m11={cap:['Plan quantity follows a demand index by day type (example)','计划量按日型需求指数调整（示例）'],f:function(){
 var d=[['Mon–Thu','周一至四',100],['Fri','周五',115],['Sat','周六',130],['Sun','周日',120],['PH eve','假期前夕',140],['PH','公共假期',90],['Rain','雨天',75]],s=ttl('Demand index (weekday = 100) 需求指数');
 d.forEach(function(g,i){var x=13+i*66;s+='<rect x="'+x+'" y="26" width="58" height="76" rx="6" fill="'+C.crust+'" opacity="'+(0.12+(g[2]-70)/110)+'"/>'+R(x,26,58,76,'none',C.crust,6)+T(x+29,48,g[2],{w:600,s:16})+T(x+29,70,g[0],{s:11})+T(x+29,86,g[1],{s:10,c:C.mute});});
 s+=T(240,122,'Plan quantity = base quantity × index ÷ 100  计划量 = 基准量 × 指数 ÷ 100',{s:11,c:C.mute});
 return SV(136,s,'Seven day types with demand index from 75 to 140');}};
ILX.m12={cap:['The reports only see recorded use: unrecorded bins and staff meals hide in the gap','报表只看得到有记录的用量：没记录的丢弃和员工餐就藏在差额里'],f:function(){
 var s=ttl('Food cost: what the reports can and cannot see 报表看得见与看不见的');
 s+=R(40,30,340,36,C.skyL,C.sky,3)+T(210,48,'Recorded and counted 有记录并盘点',{s:12,w:600})
 +R(380,30,30,36,C.redL,C.red,3)+R(410,30,30,36,C.redL,C.red,3)
 +'<line x1="395" y1="66" x2="395" y2="86" stroke="'+C.mute+'"/>'+T(410,95,'Binned, no record 丢弃无记录',{a:'end',s:11,c:C.red})
 +'<line x1="425" y1="66" x2="425" y2="108" stroke="'+C.mute+'"/>'+T(440,117,'Staff meal, no record 员工餐无记录',{a:'end',s:11,c:C.red});
 return SV(132,s,'Unrecorded discards and staff meals are not visible in the report');}};
ILX.m13={cap:['Three zones: staff can fix, report first, or call PM','三个区：员工自己处理、先上报、叫PM'],f:function(){
 var cols=[['Staff can fix 员工处理',C.leafL,C.leaf,[['Change a bulb','换灯泡'],['Tighten a screw','拧紧螺丝'],['Wipe and reset','擦拭重置']]],['Report first 先上报',C.crustL,C.crust,[['Under warranty','保修期内'],['Landlord area','业主区域']]],['Call PM 叫PM',C.redL,C.red,[['Wiring','电线'],['Gas smell','煤气味'],['Water leak','漏水']]]],s='';
 cols.forEach(function(c,i){var x=24+i*146;s+=R(x,10,136,32,c[1],c[2],6)+T(x+68,26,c[0],{w:600,s:12});c[3].forEach(function(it,j){var y=64+j*32;s+=T(x+68,y,it[0],{s:11})+T(x+68,y+14,it[1],{s:11,c:C.mute});});});
 return SV(166,s,'Three columns: staff fix, report first, call PM');}};
ILX.m14={cap:['Fixed costs keep the same dollars; variable costs move with sales','固定成本金额不变；变动成本随销售变化'],f:function(){
 var F=[['Rent (base) 底租'],['Levy 外劳税'],['Lease 设备租赁'],['Depreciation 折旧'],['Fixed salary 固定薪水']],V=[['COGS 原料'],['Card commission 刷卡费'],['Bonus 花红'],['Promotion 促销']],s='';
 s+=R(20,10,210,32,C.skyL,C.sky,6)+T(125,26,'Fixed: same $ each month 固定',{w:600,s:12})+R(250,10,210,32,C.crustL,C.crust,6)+T(355,26,'Variable: moves with sales 变动',{w:600,s:12});
 F.forEach(function(g,i){s+=R(20,52+i*26,210,22,'none',C.line,4)+T(32,63+i*26,g[0],{a:'start',s:12});});
 V.forEach(function(g,i){s+=R(250,52+i*26,210,22,'none',C.line,4)+T(262,63+i*26,g[0],{a:'start',s:12});});
 return SV(190,s,'Five fixed cost lines and four variable cost lines');}};
ILL.m14=function(){
 var s='',P=[[20,'Slow month: sales $80k 淡月',80],[270,'Busy month: sales $120k 旺月',120]];
 P.forEach(function(p){var x=p[0],w=190,r=20/p[2]*w,l=4/p[2]*w;
  s+=T(x,16,p[1],{a:'start',s:12,w:600})+R(x,28,w,40,'#efe7d8',C.line,3)+R(x,28,r,40,C.crust,'',3)+R(x+r,28,l,40,C.sky,'',3)
  +T(x,86,'Rent $20k = '+(Math.round(2000/p[2]*10)/10)+'%',{a:'start',s:12,c:C.crust,w:600})+T(x,104,'Levy $4k = '+(Math.round(400/p[2]*10)/10)+'%',{a:'start',s:12,c:C.sky,w:600});});
 s+=arrow(214,48,262,48)+T(238,40,'+50%',{s:11,c:C.mute})+T(240,134,'Same dollars, lower percentage 金额不变，占比下降',{s:12,c:C.mute});
 return SV(148,s,'Rent and levy dollars stay the same while their share of sales falls from busy to slow month');};

/* M14 extras */
function x14(){
 var tool='<div class="card" id="fbox"><h3>'+bi('TRY IT: fixed cost and break-even','动手试试：固定成本与盈亏平衡')+'</h3>'
 +'<p class="note">'+b('Monthly figures in SGD. Example values match the break-even module.','月度数字（新币）。示例数值与「盈亏平衡」模块一致。')+'</p>'
 +'<div class="hr hr6" style="margin-top:8px">'
 +'<div><label>'+bi('Net sales','净销售')+'</label><input type="number" min="1" id="f1" value="100000"></div>'
 +'<div><label>'+bi('Rent','租金')+'</label><input type="number" min="0" id="f2" value="15000"></div>'
 +'<div><label>'+bi('Levy','外劳税')+'</label><input type="number" min="0" id="f3" value="3000"></div>'
 +'<div><label>'+bi('Fixed salary','固定薪水')+'</label><input type="number" min="0" id="f4" value="12000"></div>'
 +'<div><label>'+bi('Lease and depreciation','租赁与折旧')+'</label><input type="number" min="0" id="f5" value="5000"></div>'
 +'<div><label>'+bi('Variable cost %','变动成本率 %')+'</label><input type="number" min="0" max="99" step="0.5" id="f6" value="68"></div></div>'
 +'<div class="row"><button class="btn ghost" id="freset">'+bi('Reset to example','恢复示例')+'</button></div>'
 +'<div class="err" id="fe">'+bi('Enter numbers (net sales above 0, costs 0 or more, variable cost % from 0 to 99).','请输入数字（净销售须大于0，成本须大于或等于0，变动成本率0至99）。')+'</div>'
 +'<div class="kpi"><div><span class="note">'+bi('Total fixed cost','固定成本合计')+'</span><b id="fk1"></b></div><div><span class="note">'+bi('Fixed % of sales','固定成本占销售')+'</span><b id="fk2"></b></div><div><span class="note">'+bi('Break-even sales','盈亏平衡销售')+'</span><b id="fk3"></b></div><div><span class="note">'+bi('Sales vs break-even','销售对比盈亏平衡')+'</span><b id="fk4"></b></div></div>'
 +'<p class="note" id="fd"></p></div>';
 var ct=tbl([bi('Fixed cost','固定成本'),bi('Can the store change it?','门店能改吗？'),bi('What the store can do','门店能做什么')],[
  [b('<strong>Rent</strong>','<strong>租金</strong>'),b('No. It follows the lease. Some leases add a percentage of sales above a breakpoint.','不能。按租约。有些租约在销售超过门槛后另加百分比。'),b('Grow sales so rent is a smaller share. Know your breakpoint.','提高销售，让租金占比变小。知道自己的门槛。')],
  [b('<strong>Levy</strong>','<strong>外劳税</strong>'),b('No. It depends on work permit and S Pass heads, and is charged at one designated store.','不能。按工作准证和 S Pass 人数，由指定的一间店收取。'),b('Understand why it sits where it does; do not read it as that store being weak.','了解它为什么在那里，别误以为那间店表现差。')],
  [b('<strong>Fixed salary</strong>','<strong>固定薪水</strong>'),b('Not in the short term.','短期内不能。'),b('Use the roster well: remove idle overlap and OT, keep service coverage.','排班要好：减少空闲重叠与加班，同时保持服务人手。')],
  [b('<strong>Lease and depreciation</strong>','<strong>设备租赁与折旧</strong>'),b('No. Set when the equipment was bought or leased.','不能。在设备购买或租赁时已定。'),b('Keep equipment busy and well kept so it earns its cost.','让设备被充分使用并保养好，才对得起它的成本。')]]);
 return tool
 +'<div class="card"><h3>'+bi('WHAT YOU CAN AND CANNOT CONTROL','能控制与不能控制的')+'</h3>'+ct+'</div>'
 +'<div class="card warn"><p>'+b('Judge a store on the lines it controls (waste, labour hours, sales). A high fixed cost percentage in a slow month is mostly a sales story, not a spending story.','评价门店要看它能控制的项目（损耗、人工时数、销售）。淡月固定成本占比高，多半是销售问题，不是乱花钱。')+'</p></div>';
}
function bind14(){
 function upd(){
  var ids=['f1','f2','f3','f4','f5','f6'],v=[],bad=false,i,raw;
  for(i=0;i<6;i++){raw=$('#'+ids[i]).value.trim();if(raw===''||isNaN(+raw))bad=true;v.push(+raw);}
  if(bad||v[0]<=0||v[1]<0||v[2]<0||v[3]<0||v[4]<0||v[5]<0||v[5]>99){$('#fe').style.display='block';return;}
  $('#fe').style.display='none';
  var fx=v[1]+v[2]+v[3]+v[4],be=fx/(1-v[5]/100),gap=v[0]-be;
  $('#fk1').textContent='$'+fmt(fx);
  $('#fk2').textContent=(Math.round(fx/v[0]*1000)/10)+'%';
  $('#fk3').textContent='$'+fmt(be);
  var k4=$('#fk4');k4.textContent=(gap>=0?'+$':'−$')+fmt(Math.abs(gap));k4.className=gap>=0?'pos':'neg';
  var up=fx/(v[0]*1.1)*100;
  $('#fd').textContent=(gap>=0?'Above break-even. 高于盈亏平衡。':'Below break-even: sales must rise or fixed cost must fall. 低于盈亏平衡：要提高销售或降低固定成本。')+' If sales rise 10%, fixed cost falls to '+(Math.round(up*10)/10)+'% of sales. 销售增加10%，固定成本占比降至'+(Math.round(up*10)/10)+'%。';
 }
 $('#fbox').addEventListener('input',upd);
 $('#freset').addEventListener('click',function(){var d=[100000,15000,3000,12000,5000,68];for(var i=0;i<6;i++)$('#f'+(i+1)).value=d[i];upd();});
 upd();
}

var ADV=[
{k:'m9',adv:1,en:'Production plan: review and analysis',zh:'生产计划：如何检讨与分析',
 c:['A production plan says what to bake, how many, and when, for each SKU. Review it every day by comparing plan vs actual: produced, sold, waste and sold-out time.','生产计划决定每个SKU烤什么、烤多少、何时烤。每天用「计划 vs 实际」检讨：生产量、售出量、损耗和售罄时间。'],
 e:['Illustrative: plan 100, sold 82, waste 18 → sell-through 82%, waste 18%. At $2 cost per unit: 18 × $2 = $36 per day.','示例：计划100、售出82、损耗18 → 售罄率82%、损耗率18%；每件成本$2，每日损耗$36。'],
 q:['Waste is only 3% this week. Is the production plan good?','本周损耗只有3%，生产计划就是好的吗？'],
 a:['Not necessarily. Low waste can hide under-production: if items sell out early, you lose sales. Read sold-out time and lost sales together with waste.','不一定。低损耗可能掩盖生产不足：太早售罄就损失销售。要把售罄时间、损失销售和损耗一起看。'],
 ap:['Pull yesterday plan vs actual for your top 5 SKUs. Record produced, sold, waste and sold-out time. Pick the biggest gap and write one action.','提取昨日前5个SKU的计划与实际：生产、售出、损耗、售罄时间。找出最大差距并写一项行动。'],
 pr:['Choose one SKU. Write plan vs actual, sell-through %, waste $, sold-out time, root cause, action, owner and deadline.','选一个SKU，写出计划与实际、售罄率、损耗金额、售罄时间、根因、行动、负责人和期限。'],
 cap:['Illustrative plan vs actual by SKU','示例：各SKU计划与实际对比'],x:x9},
{k:'m10',adv:1,en:'Smart deployment: peak vs non-peak',zh:'智能调配：高峰与非高峰',
 c:['Deploy bake waves, display stock and people to hourly demand. Study the last 4 to 8 same weekdays, classify each hour as peak, shoulder or non-peak, then plan production and staffing by class.','按每小时需求调配烘焙批次、陈列量和人手。取最近4至8个同一星期几的数据，把每小时分为高峰、平稳、非高峰，再按类别安排生产与排班。'],
 e:['Illustrative store: 4 of 12 hours (peak) carry 124 of 250 customers = 49.6% of TC.','示例门店：12小时中4个高峰小时承载250位顾客中的124位 = 49.6%客流。'],
 q:['Should we put the most staff exactly at the busiest hour?','最忙的那个小时，人手就应该最多吗？'],
 a:['Be ready before it. Bake, stock and staff must be in position before the peak starts (lead time), then move people to prep and cleaning in non-peak.','不是，要提前到位。烘焙、陈列和人手必须在高峰开始前就绪（需要提前量），高峰过后再转去备料和清洁。'],
 ap:['Pull hourly TC and sales for the last 4 same weekdays. Classify each hour, then compare bake wave times and staff on duty against the classes.','提取最近4个同一星期几的每小时客流与销售，将每小时分类，再对照烘焙批次时间和在岗人数。'],
 pr:['List your peak hours, the time of each bake wave, and who is in position before each peak. Find one idle overlap in non-peak.','列出门店高峰小时、每批烘焙的时间、以及每个高峰前谁已就位。找出一处非高峰的空闲重叠。'],
 cap:['Live chart: it updates when you enter your own hourly TC below','实时图：在下方输入你的每小时客流后会更新'],x:x10,bind:bind10},
{k:'m11',adv:1,en:'Same plan every day? What to expect',zh:'每天都用同一份计划？你应该期待什么',
 c:['Demand changes by day type (weekday, weekend, public holiday, school holiday, weather, promotion, festive) and by hour (peak vs non-peak). A single flat plan over-produces on weak days and hours, and runs out on strong ones.','需求随日型（平日、周末、公共假期、学校假期、天气、促销、节庆）和时段（高峰/非高峰）而变。一份固定不变的计划，会在弱势日/时段过量生产，在强势日/时段断货。'],
 e:['Flat plan 100 per day vs demand 80 (weekday) and 120 (weekend): waste 100 units and lost sales 40 units per week. A day-type plan with 5% buffer: waste 32, lost 0.','每天固定100件，需求平日80、周末120：每周损耗100件、损失销售40件。按日型安排（加5%缓冲）：损耗32件、损失0。'],
 q:['A store uses the same production plan every day. What do you expect to see?','门店每天都用同一份生产计划，你预期会看到什么？'],
 a:['High waste on weak days, early sell-outs on strong days, a plan that does not move with sales, and COGS % above target. Average waste can look fine because the two problems cancel out.','弱势日损耗高、强势日提早售罄、计划不随销售变动、原料率高于目标。平均损耗可能看起来正常，因为两种问题在平均数里互相抵消。'],
 ap:['Ask each store: do you use the same plan every day? Collect planned quantity by weekday for 4 weeks and compare with sales by weekday. Red flag if the plan varies much less than sales.','问每间门店：是否每天用同一份计划？收集4周按星期几的计划量，对比按星期几的销售。计划变化远小于销售变化即为警示。'],
 pr:['Fill a day-type matrix for one SKU group: day type, demand index, planned quantity, owner, and how you will review it weekly.','为一个SKU组填写日型矩阵：日型、需求指数、计划量、负责人，以及每周如何检讨。'],
 cap:['Live chart: one flat plan across a week (change the sliders below)','实时图：一周内使用同一份固定计划（调整下方滑块）'],x:x11,bind:bind11},
{k:'m12',adv:1,en:'COGS: ABC vs MIA',zh:'原料成本：ABC 对比 MIA',
 c:['MIA (Monthly Inventory Analysis) is the monthly food cost report in the finance report: usage cost plus backend adjustments. ABC is the real food cost, worked out from stock orders and the stock balance. Variance = MIA − ABC − general packaging. Dropped-and-binned items and staff meals count as food cost only, not packaging. A growing variance means cost that the two reports do not explain.','MIA（Monthly Inventory Analysis，月度库存分析）是财务报表里的每月食材成本报表：用量成本加 backend 调整。ABC 是真实食材成本，由订货量和库存结余算出。差额 = MIA − ABC − 一般包装成本。掉地丢弃和员工餐只算食材成本，不算包装。差额变大，代表有成本是两份报表都解释不了的。'],
 e:['Illustrative: sales $100,000; MIA food cost $43,000 (43%); ABC $38,000 (38%); packaging $1,500. Variance = 43,000 − 38,000 − 1,500 = $3,500 = 3.5% of sales.','示例：销售$100,000；MIA 食材成本$43,000（43%）；ABC $38,000（38%）；包装$1,500。差额 = 43,000 − 38,000 − 1,500 = $3,500，占销售3.5%。'],
 q:['A store shows a low recorded wastage cost, but its variance is above the others. Where do you look?','某门店已记录的损耗不高，但差额比其他门店大，应该查哪里？'],
 a:['Look for stock that left without a record: items binned with no entry (for example a dropped bread), staff meals, and stock count errors. Check that the stock inventory counts the same items each month.','查没有记录就离开库存的东西：没登记就丢掉的货（例如掉在地上的面包）、员工餐、盘点错误。并确认每月库存盘点包含的物品一致。'],
 ap:['Pull last month MIA report and ABC report for your store. Work out the variance and variance %, compare with the other stores, and list the likely leaks with an owner for each.','提取上个月本店的 MIA 报表和 ABC 报表，算出差额与差额%，与其他门店比较，列出可能的漏洞并各指定负责人。'],
 pr:['Write the variance %, the most likely leak, one control (for example record every discard when it happens), the owner and a deadline. Check the variance again next month.','写出差额%、最可能的漏洞、一项控制措施（例如每次丢弃当场记录）、负责人和期限。下个月再核对差额。'],
 cap:['Illustrative: how MIA, ABC and packaging relate to the variance','示例：MIA、ABC、包装与差额的关系'],x:x12,bind:bind12},
{k:'m13',adv:1,en:'PM requests: check before you call',zh:'PM报修：先检查，再通知',
 c:['Property maintenance (PM) is for problems staff cannot fix safely or properly. Before raising a request, check the cause. Many small jobs, such as changing a bulb, can be done by staff safely with a small purchase. Calling PM without checking wastes their time and the store waits longer.','PM用于员工无法安全或妥善处理的问题。报修前先检查原因。很多小事，例如换灯泡，员工在安全的前提下用小额采购就能完成。没检查就叫PM，既浪费PM时间，门店也要等更久。'],
 e:['Illustrative: the PM team was called for a dead light, and the job was only to change a bulb that staff could have bought and fitted in minutes.','示例：灯不亮就叫PM团队来，结果只是换一个灯泡，其实员工几分钟就能买来换好。'],
 q:['A light is out. Should we raise a PM request straight away?','有一盏灯不亮，要不要马上提交PM报修？'],
 a:['Check first. If it is a plain bulb, with no sign of danger and no wiring problem, staff can replace it safely with the right type. If there is flickering, a burning smell, tripping or damaged wiring, stop and call PM.','先检查。如果只是普通灯泡、没有危险迹象、也不是线路问题，员工可用正确规格的灯泡安全更换。若灯闪烁、有焦味、跳闸或电线破损，就停下来叫PM。'],
 ap:['For the last month of PM requests, mark each one: staff could have fixed it, or PM was needed. Share the pattern with your team and agree what staff may fix and what must go to PM.','把上个月的PM报修逐项标记：员工本可自己处理，还是确实需要PM。与团队分享结果，并共同确定哪些员工可以处理、哪些必须交给PM。'],
 pr:['Write one recent PM request, whether staff could have fixed it, the check you would do first, the safety condition, the owner and the date you will review it.','写出最近一项PM报修，员工是否可处理，你会先做什么检查，安全条件，负责人，以及何时复查。'],
 cap:['Check four questions before calling PM','叫PM之前先问四个问题'],x:x13,bind:bind13},
{k:'m14',adv:1,en:'Fixed costs: rent, levy and more',zh:'固定成本：租金、外劳税等',
 c:['Fixed costs, such as rent, levy, equipment lease, depreciation and fixed salary, stay at the same dollar amount whatever the sales. A store cannot change them in the short term, but it can understand them and plan around them. The only way to make them a smaller share of sales is to grow sales.','固定成本，例如租金、外劳税、设备租赁、折旧和固定薪水，不管销售多少，金额都不变。门店短期内改不了，但可以看懂并围绕它规划。要让它占销售的比例变小，只有提高销售。'],
 e:['Illustrative: rent $20k and levy $4k. At sales $80k they are 25% and 5%. At sales $120k they are 16.7% and 3.3%. The dollars did not change.','示例：租金$20k、外劳税$4k。销售$80k时占25%和5%；销售$120k时占16.7%和3.3%。金额没有变。'],
 q:['Rent is the same every month, yet the rent % changes. Why?','租金每个月都一样，为什么租金占比会变？'],
 a:['Because the percentage is rent divided by sales. When sales go up the percentage goes down, and when sales go down the percentage goes up.','因为占比 = 租金 ÷ 销售。销售上升，占比下降；销售下降，占比上升。'],
 ap:['List your store fixed costs and work out each as a % of sales for the last 3 months. Then note what share of your own results comes from sales, and what comes from the lines you control.','列出本店的固定成本，算出最近3个月各占销售的百分比。再看看你的结果有多少来自销售，有多少来自你能控制的项目。'],
 pr:['Write your store fixed cost total, its % of sales, the break-even sales, and one action to lift sales or use staff hours better. Add an owner and a deadline.','写出本店固定成本合计、占销售的百分比、盈亏平衡销售，以及一项提高销售或更好运用人工时数的行动，并写上负责人和期限。'],
 cap:['Illustrative: the same rent and levy dollars at two sales levels','示例：同样的租金和外劳税金额，在两个销售水平下的占比'],x:x14,bind:bind14}
];

/* ---------- content ---------- */
var APPLY=['Check current month vs budget vs last year. Identify the largest controllable variance, quantify the expected dollar impact, and record a responsible owner.','对比本月实际、预算及去年同期，找出最大可控差异，计算预计金额影响并指定负责人。'];
var PRAC=['Write one store observation, one root cause, one corrective action, one KPI and one deadline.','写出一项门店观察、一项根因、一项改善行动、一项KPI及期限。'];
var M=[
{k:'m1',en:'Profit basics',zh:'利润基础',
 c:['Understand sales, COGS, labour, occupancy, overhead and operating profit.','认识销售、原料、人工、租金、其他费用及营运利润。'],
 e:['Net sales = transactions × average check.','净销售 = 交易笔数 × 客单价。'],
 q:['Is high sales always high profit?','高销售额一定高利润吗？'],a:['No. Cost structure and product mix decide margin.','不一定，成本结构及产品组合决定利润。'],
 cap:['Example store, monthly, SGD thousand (before improvement)','示例门店月度数据，新币千元（改善前）']},
{k:'m2',en:'Sales diagnosis',zh:'销售诊断',
 c:['Split sales into TC, AC, daypart and SKU mix.','将销售拆分为客流、客单、时段和商品结构。'],
 e:['TC 200 × AC $8 = $1,600; raise AC to $8.50 → $1,700.','客单提高$0.50，销售增加$100。'],
 q:['TC falls 10%, AC rises 5%: sales change?','客流跌10%，客单升5%，销售如何？'],a:['0.9 × 1.05 − 1 = −5.5%.','销售下跌5.5%。'],
 cap:['Sales = TC × AC','销售 = 客流 × 客单']},
{k:'m3',en:'COGS & waste',zh:'原料与损耗',
 c:['Separate recipe cost, packaging, waste and inventory variance.','分析配方成本、包装、损耗和盘点差异。'],
 e:['Waste $300/day × 30 = $9,000/month.','每日损耗$300，月损耗$9,000。'],
 q:['Can cutting production too much hurt profit?','减少生产一定有利吗？'],a:['Yes, stock-outs can lose contribution margin.','缺货会损失毛利，需平衡供需。'],
 cap:['Each circle = $10 of daily waste × 30 shown as 30 items','示意：30 个圆代表 30 天的每日损耗']},
{k:'m4',en:'Labour productivity',zh:'人工生产率',
 c:['Align staffing to hourly demand without compromising food safety.','根据时段销售排班，同时维持食品安全。'],
 e:['Sales $100k / labour $23k = 4.35 sales per labour dollar.','每$1人工带来$4.35销售。'],
 q:['Should labour % be cut by reducing service coverage?','应否单纯减少人手？'],a:['No. Remove idle overlap and OT first.','先优化重叠班次及加班。'],
 cap:['Illustration only: demand by hour vs staffing','仅为示意：每小时需求与排班对比']},
{k:'m5',en:'Break-even',zh:'盈亏平衡',
 c:['Contribution margin = 1 − variable cost %.','边际贡献率 = 1 − 变动成本率。'],
 e:['Fixed $35k, variable 68% → break-even $109,375.','固定成本$35k、变动成本68%，盈亏平衡销售$109,375。'],
 q:['Why is break-even not the same as budget?','为什么盈亏平衡不等于预算？'],a:['Break-even is zero profit; budget is a performance target.','前者零利润，后者是业绩目标。'],
 cap:['Where sales line meets total cost line','销售线与总成本线的交点']},
{k:'m6',en:'Turnaround plan',zh:'扭亏行动',
 c:['Diagnose → prioritise → assign → execute → review.','诊断→排序→分配→执行→复盘。'],
 e:['Sales +$10k; COGS 45%→42%; labour 23%→20%: profit −$3k→+$6.8k.','亏损转盈利。'],
 q:['Which lever should be first?','应先改善哪项？'],a:['Choose the largest controllable profit opportunity, validated by data.','根据数据优先处理最大可控利润机会。'],
 cap:['Open the Case study page to try the numbers yourself','到「案例」页自己调整数字']},
{k:'m7',en:'Ownership & governance',zh:'责任分配',
 c:['Define owner, deadline, metric, evidence and escalation.','明确负责人、期限、指标、证据及升级机制。'],
 e:['RM owns store result; BOH lead owns waste; FOH lead owns TC/AC; VPO reviews.','分工明确。'],
 q:['What if KPI improves but food quality drops?','KPI改善但品质下降怎么办？'],a:['Stop unsafe changes; use quality guardrails.','立即纠正，品质与安全不可妥协。'],
 cap:['Who owns what','谁负责什么']},
{k:'m8',en:'Reporting & assessment',zh:'汇报与考核',
 c:['Weekly variance bridge, actions, owners, and forecast.','每周汇报差异、行动、责任及预测。'],
 e:['Report actual vs budget vs last year; explain both dollars and percentage points.','对比实际、预算及去年。'],
 q:['What is a good management update?','好的管理汇报是什么？'],a:['Fact → cause → action → owner → deadline → expected impact.','事实→原因→行动→责任→期限→预期影响。'],
 cap:['A good update follows one chain','好的汇报遵循同一条链']}
];
M=M.concat(ADV);
var PAGES=[{k:'home',en:'Overview',zh:'总览'}].concat(M.map(function(m,i){return {k:m.k,en:m.en,zh:m.zh,n:i+1};}),[{k:'case',en:'Case study',zh:'扭亏案例'},{k:'plan',en:'90-day plan & RACI',zh:'90天计划与责任'},{k:'quiz',en:'Assessment',zh:'结业测验'}]);

/* ---------- state ---------- */
var seen={};
try{seen=JSON.parse(localStorage.getItem('pl_seen')||'{}')||{};}catch(e){seen={};}
function saveSeen(){try{localStorage.setItem('pl_seen',JSON.stringify(seen));}catch(e){}}
function setLang(l){
 document.body.className='lang-'+l;
 document.querySelectorAll('.seg button').forEach(function(x){x.classList.toggle('on',x.getAttribute('data-l')===l);});
 try{localStorage.setItem('pl_lang',l);}catch(e){}
}
document.querySelector('.seg').addEventListener('click',function(e){var l=e.target.getAttribute&&e.target.getAttribute('data-l');if(l)setLang(l);});
try{var sl=localStorage.getItem('pl_lang');if(sl)setLang(sl);}catch(e){}

/* ---------- sidebar ---------- */
function side(cur){
 var h='<a href="../index.html" style="display:block;margin:0 8px 10px;font-size:13px;color:var(--crust);text-decoration:none;font-weight:600">← '+bi('Portal','学习门户')+'</a><h1>'+bi('Finance and profit','财务与利润')+'</h1><p class="sub">Bilingual training · 双语培训</p>';
 PAGES.forEach(function(p){
  var n=p.n?p.n:(p.k==='home'?'⌂':p.k==='case'?'$':p.k==='plan'?'90':'✓');
  h+='<button class="nv'+(p.k===cur?' on':'')+(seen[p.k]?' done':'')+'" data-k="'+p.k+'"><span class="n">'+(seen[p.k]&&p.k!==cur?'✓':n)+'</span><span class="t">'+p.en+'<small>'+p.zh+'</small></span></button>';
 });
 $('#side').innerHTML=h;
}
$('#side').addEventListener('click',function(e){var t=e.target.closest('.nv');if(t){go(t.getAttribute('data-k'));$('#side').classList.remove('open');}});
$('#menu').addEventListener('click',function(){$('#side').classList.toggle('open');});
document.addEventListener('click',function(e){if(!e.target.closest('#side')&&!e.target.closest('#menu'))$('#side').classList.remove('open');});

function go(k){if(location.hash!=='#'+k)location.hash=k;else render();}
function cur(){var h=(location.hash||'').replace('#','');return PAGES.some(function(p){return p.k===h;})?h:'home';}

function navBtns(k){
 var i=PAGES.findIndex(function(p){return p.k===k;}),pv=PAGES[i-1],nx=PAGES[i+1];
 return '<div class="nav">'+(pv?'<button class="btn ghost" data-go="'+pv.k+'">← '+bi(pv.en,pv.zh)+'</button>':'<span></span>')+(nx?'<button class="btn" data-go="'+nx.k+'">'+bi(nx.en,nx.zh)+' →</button>':'<span></span>')+'</div>';
}

/* ---------- pages ---------- */
function home(){
 var F=[['Net Sales = TC × AC','净销售 = 交易笔数 × 客单价'],['Gross Profit = Net Sales − COGS','毛利 = 净销售 − 销售成本'],['Operating Profit = Net Sales − COGS − Labour − Rent − Other','营运利润 = 销售 − 原料 − 人工 − 租金 − 其他费用'],['Operating Margin = Operating Profit ÷ Net Sales × 100%','营运利润率 = 营运利润 ÷ 净销售 × 100%'],['Prime Cost = COGS + Labour','主要成本 = 原料 + 人工'],['Break-even Sales = Fixed Costs ÷ Contribution Margin Ratio','盈亏平衡销售 = 固定成本 ÷ 边际贡献率']];
 var O=[['Read the profit report and calculate profit margin','读懂利润报表与利润率'],['Diagnose sales and cost variances','分析销售及成本差异'],['Build a realistic recovery plan','制定可执行扭亏方案'],['Assign actions with measurable KPIs','分配责任与可量化指标'],['Present a weekly management update','做每周管理汇报']];
 var h='<p class="eyebrow">KELVIN TEAM TRAINING · ILLUSTRATIVE</p><h2 class="title">Kelvin Team Training<br><span class="zh">Kelvin 团队培训</span></h2>'
 +'<div class="card"><p>'+b('From loss-making to profitable operations. Audience: RM · AM · SRM · BOH / FOH Leaders. 8 core modules, 6 advanced modules on production plans, deployment, COGS control, PM requests and fixed costs, a case study, Q&A, ownership and an assessment.','从亏损诊断到盈利改善。培训对象：RM、AM、SRM、BOH/FOH Leaders。含 8 个核心模块、6 个关于生产计划、调配、原料成本控制、PM报修与固定成本的进阶模块、案例、课堂问答、责任分配和结业测验。')+'</p><div class="row"><button class="btn" data-go="m1">'+bi('Start module 01','开始模块 01')+' →</button></div></div>'
 +'<div class="card"><h3>'+bi('LEARNING OUTCOMES','学习目标')+'</h3>'+O.map(function(o,i){return '<p style="margin:6px 0">'+(i+1)+'. '+bi(o[0],o[1])+'</p>';}).join('')+'</div>'
 +'<div class="card"><h3>'+bi('CORE PROFIT FORMULAS','核心公式')+'</h3>'+F.map(function(f){return '<span class="f">'+f[0]+'<br><span style="color:var(--mute)">'+f[1]+'</span></span>';}).join('')+'</div>'
 +'<div class="grid">'+M.map(function(m,i){return '<div class="card"><p class="eyebrow">'+eb(m,i)+'</p><p style="font-weight:600">'+m.en+'</p><p class="note">'+m.zh+'</p><div class="row"><button class="btn ghost" data-go="'+m.k+'">'+bi('Open','打开')+'</button></div></div>';}).join('')+'</div>'
 +'<div class="card warn" style="margin-top:14px"><p>'+b('Note: all financial figures are teaching simulations, not real company financials.','说明：所有财务数据均为教学模拟，非公司真实财务资料。')+'</p></div>';
 return h;
}
function mod(m,i){
 var h='<p class="eyebrow">'+eb(m,i)+'</p><h2 class="title">'+m.en+' <br><span class="zh">'+m.zh+'</span></h2>'
 +(m.adv?ADVNOTE:'')+'<div class="card ill">'+ILL[m.k]()+'<p class="cap">'+bi(m.cap[0],m.cap[1])+'</p></div>'
 +'<div class="card"><h3>'+bi('LEARNING','学习重点 / 核心概念')+'</h3><p>'+b(m.c[0],m.c[1])+'</p></div>'
 +(ILX[m.k]?'<div class="card ill">'+ILX[m.k].f()+'<p class="cap">'+bi(ILX[m.k].cap[0],ILX[m.k].cap[1])+'</p></div>':'')
 +'<div class="card ex"><h3>'+bi('WORKED EXAMPLE','计算例子')+'</h3><p class="big">'+b(m.e[0],m.e[1])+'</p></div>'
 +(m.x?m.x():'')+'<div class="card"><h3>'+bi('CLASS Q&A','课堂问答')+'</h3><p><strong>Q.</strong> '+b(m.q[0],m.q[1])+'</p><div class="row"><button class="btn ghost" data-rev="1">'+bi('Think first, then reveal','先想一想，再看答案')+'</button></div><div class="ans"><strong>A.</strong> '+b(m.a[0],m.a[1])+'</div></div>'
 +'<div class="card"><h3>'+bi('MANAGER APPLICATION','门店应用')+'</h3><p>'+b((m.ap||APPLY)[0],(m.ap||APPLY)[1])+'</p></div>'
 +'<div class="card ws"><h3>'+bi('PRACTICE (not saved)','课堂练习（不保存）')+'</h3><p>'+b((m.pr||PRAC)[0],(m.pr||PRAC)[1])+'</p>'
 +[['Observation','观察'],['Root cause','根因'],['Action','行动'],['KPI','指标'],['Deadline','期限']].map(function(f){return '<label>'+bi(f[0],f[1])+'</label><input type="text">';}).join('')+'</div>';
 return h+navBtns(m.k);
}

var CS={s:110000,c:42,l:20};
function caseP(){
 var h='<p class="eyebrow">CASE STUDY · 实战案例</p><h2 class="title">Loss to profit <span class="zh">扭亏案例</span></h2>'
 +'<div class="card"><h3>'+bi('ILLUSTRATIVE MONTHLY STORE (SGD)','模拟门店月度数据（新币）')+'</h3><table><thead><tr><th>'+bi('Profit line','项目')+'</th><th class="r">'+bi('Before','改善前')+'</th><th class="r">'+bi('After (yours)','改善后（可调）')+'</th></tr></thead><tbody id="cs-t"></tbody></table></div>'
 +'<div class="card"><h3>'+bi('TRY IT — move the levers','动手试试 — 调整杠杆')+'</h3>'
 +'<div class="sl"><span>'+bi('Net sales','净销售')+'</span><input type="range" id="r-s" min="95000" max="130000" step="500" value="'+CS.s+'"><output id="o-s"></output></div>'
 +'<div class="sl"><span>'+bi('COGS %','原料成本率')+'</span><input type="range" id="r-c" min="38" max="50" step="0.5" value="'+CS.c+'"><output id="o-c"></output></div>'
 +'<div class="sl"><span>'+bi('Labour %','人工成本率')+'</span><input type="range" id="r-l" min="17" max="26" step="0.5" value="'+CS.l+'"><output id="o-l"></output></div>'
 +'<div class="kpi"><div><span class="note">'+bi('Operating profit','营运利润')+'</span><b id="k-p"></b></div><div><span class="note">'+bi('Margin','利润率')+'</span><b id="k-m"></b></div><div><span class="note">'+bi('Improvement','改善幅度')+'</span><b id="k-i"></b></div></div>'
 +'<div class="row"><button class="btn ghost" id="cs-reset">'+bi('Reset to case values','恢复案例数值')+'</button></div>'
 +'<p class="note" style="margin-top:8px">'+b('Rent and other expenses held at $23,000 and $12,000, as in the case.','租金与其他费用保持$23,000与$12,000，与案例一致。')+'</p></div>'
 +'<div class="card ill"><h3>'+bi('PROFIT BRIDGE','利润改善拆解')+'</h3><div id="cs-b"></div></div>'
 +'<div class="card"><h3>'+bi('ANALYSIS','分析')+'</h3><p>'+b('Validate whether COGS % includes waste, whether labour is fixed or variable, and whether rent or utilities change with sales.','确认原料率是否包括损耗、人工是否随销售变化、租金和水电是否随营业额变化。')+'</p></div>';
 return h+navBtns('case');
}
function caseCalc(){
 var S=CS.s,c=CS.c/100,l=CS.l/100,rent=23000,oth=12000;
 var cg=S*c,lb=S*l,p=S-cg-lb-rent-oth,m=p/S*100;
 var row=function(a,b0,b1){return '<tr><td>'+a+'</td><td class="r">'+b0+'</td><td class="r">'+b1+'</td></tr>';};
 $('#cs-t').innerHTML=row(bi('Monthly net sales','月净销售'),'100,000',fmt(S))
  +row(bi('COGS','原料成本'),'45,000 (45%)',fmt(cg)+' ('+CS.c.toFixed(1).replace(/\.0$/,'')+'%)')
  +row(bi('Labour','人工'),'23,000 (23%)',fmt(lb)+' ('+CS.l.toFixed(1).replace(/\.0$/,'')+'%)')
  +row(bi('Rent','租金'),'23,000','23,000')+row(bi('Other','其他费用'),'12,000','12,000')
  +'<tr><td><strong>'+bi('Operating profit','营运利润')+'</strong></td><td class="r neg"><strong>−3,000</strong></td><td class="r '+(p>=0?'pos':'neg')+'"><strong>'+sg(p)+'</strong></td></tr>';
 $('#o-s').textContent=fmt(S);$('#o-c').textContent=CS.c+'%';$('#o-l').textContent=CS.l+'%';
 var kp=$('#k-p');kp.textContent=sg(p);kp.className=p>=0?'pos':'neg';
 $('#k-m').textContent=m.toFixed(1)+'%';$('#k-i').textContent=sg(p+3000);
 var d1=(S-100000)*(1-0.45-0.23),d2=(0.45-c)*S,d3=(0.23-l)*S;
 var steps=[['Start 起点',-3000,'t'],['Sales 销售',d1,'d'],['COGS rate 原料率',d2,'d'],['Labour rate 人工率',d3,'d'],['End 终点',p,'t']];
 var cum=0,pts=[0],i;steps.forEach(function(s,ix){if(s[2]==='t'){cum=s[1];}else cum+=s[1];pts.push(cum);});
 var mx=Math.max.apply(null,pts.concat([0])),mn=Math.min.apply(null,pts.concat([0]));if(mx-mn<1000)mx=mn+1000;
 var H=150,top=16,Y=function(v){return top+(mx-v)/(mx-mn)*H;},s='',w=62,gap=24,x0=20;
 s+='<line x1="10" y1="'+Y(0)+'" x2="470" y2="'+Y(0)+'" stroke="'+C.mute+'"/>';
 var run=0;
 steps.forEach(function(st,ix){var x=x0+ix*(w+gap),a,bb,col;
  if(st[2]==='t'){a=0;bb=st[1];run=st[1];col=st[1]>=0?C.leaf:C.red;}
  else{a=run;bb=run+st[1];run=bb;col=st[1]>=0?C.leaf:C.red;}
  var y1=Y(Math.max(a,bb)),y2=Y(Math.min(a,bb));
  s+=R(x,y1,w,Math.max(2,y2-y1),col,'',4)+T(x+w/2,y1-9,sg(st[1]),{w:600,s:12,c:col});
  s+=T(x+w/2,top+H+30,st[0].split(' ')[0],{s:11})+T(x+w/2,top+H+44,st[0].split(' ')[1]||'',{s:11,c:C.mute});});
 $('#cs-b').innerHTML=SV(top+H+60,s,'Profit bridge from start profit to end profit');
}

function planP(){
 var W=[['Production & waste','生产损耗','BOH Lead','Waste %; stock-outs','Daily','每日'],['Sales & mix','销售组合','FOH Lead','TC, AC, mix','Daily','每日'],['Roster & OT','排班加班','AM','Labour %; OT hours','Weekly','每周'],['Store profit','门店利润','RM','Profit $, margin %','Weekly','每周'],['Coaching','辅导','SRM','Action closure %','Biweekly','双周'],['Governance','管理监督','VPO','Profit trend; risks','Monthly','每月']];
 var h='<p class="eyebrow">ACTION PLAN · 行动计划</p><h2 class="title">30 / 60 / 90-day recovery <span class="zh">30/60/90天执行方案</span></h2>'
 +'<div class="tl">'
 +'<div class="card"><p class="eyebrow">DAY 1–30 · 第1–30天</p><p style="font-weight:600;margin:4px 0">'+b('Validate &amp; quick wins','核对数据，快速改善')+'</p><p class="note">'+b('Validate POS, recipe, inventory, waste, roster and SKU data; identify quick wins.','核对销售、损耗、排班与SKU数据，执行快速改善。')+'</p></div>'
 +'<div class="card"><p class="eyebrow">DAY 31–60 · 第31–60天</p><p style="font-weight:600;margin:4px 0">'+b('Pilot &amp; optimise','试行与优化')+'</p><p class="note">'+b('Pilot demand-based baking by daypart, bundles and labour scheduling.','优化时段生产、套餐及排班。')+'</p></div>'
 +'<div class="card"><p class="eyebrow">DAY 61–90 · 第61–90天</p><p style="font-weight:600;margin:4px 0">'+b('Standardise &amp; review','固化与复盘')+'</p><p class="note">'+b('Standardise proven changes; revise forecast; escalate structural issues.','固化有效方案，复盘预测与风险，上报结构性问题。')+'</p></div></div>'
 +'<div class="card" style="margin-top:14px"><h3>'+bi('ACCOUNTABILITY MATRIX (RACI)','责任矩阵')+'</h3><div style="overflow:auto"><table><thead><tr><th>'+bi('Workstream','项目')+'</th><th>'+bi('Owner','负责人')+'</th><th>KPI '+'指标</th><th>'+bi('Cadence','频率')+'</th></tr></thead><tbody>'
 +W.map(function(r){return '<tr><td>'+r[0]+'<br><span class="note">'+r[1]+'</span></td><td><strong>'+r[2]+'</strong></td><td>'+r[3]+'</td><td>'+r[4]+' / '+r[5]+'</td></tr>';}).join('')+'</tbody></table></div></div>'
 +'<div class="card"><h3>'+bi('WHO DOES WHAT','各角色职责')+'</h3><div class="chips"><span>RM — store profit and weekly review</span><span>BOH Lead — production accuracy, waste, quality</span><span>FOH Lead — TC, AC, conversion, merchandising</span><span>AM — roster productivity, training, execution</span><span>SRM — coaching, cross-store benchmarking</span><span>VPO — targets, resources, escalation, governance</span></div>'
 +'<p class="note" style="margin-top:8px">RM：门店利润与每周复盘 · BOH Lead：生产准确、损耗、品质 · FOH Lead：客流、客单、转化、陈列 · AM：排班效率、培训、执行 · SRM：辅导与跨店对标 · VPO：目标、资源、升级与监督</p></div>'
 +'<div class="card warn"><h3 style="color:#8a2f1c">'+bi('MANAGEMENT RULE','管理原则')+'</h3><p><strong>'+b('Never improve profit by compromising food safety, product quality or legal staffing requirements.','不能以牺牲食品安全、产品品质或法定人力要求换取短期利润。')+'</strong></p><p style="margin-top:8px;font-weight:600">FACT → CAUSE → ACTION → OWNER → DEADLINE → IMPACT</p></div>';
 return h+navBtns('plan');
}

var QZ=[
 {en:'Sales $120,000, operating profit $6,000. Calculate the margin (%).',zh:'销售$120,000，营运利润$6,000，计算利润率（%）。',ans:5,tol:0.05,ex:'6,000 ÷ 120,000 = 5%',exz:'6,000 ÷ 120,000 = 5%',lg:['<p><strong>Why divide by sales?</strong> Margin tells you how many cents of every $1 sold stay as profit. Using sales as the base lets you compare a big store and a small store fairly.</p><p><strong>Read it:</strong> 5% means $0.05 profit per $1 sales. If the margin is below budget, ask whether sales were short or costs (COGS, labour, rent) were too high.</p>','<p><strong>为什么要除以销售？</strong>利润率告诉你每卖$1，有多少分钱变成利润。以销售为基数，大店和小店才能公平比较。</p><p><strong>怎么解读：</strong>5% 代表每$1销售赚$0.05。若低于预算，要问：是销售不够，还是成本（原料、人工、租金）太高？</p>']},
 {en:'Sales −8%, AC +3%. Calculate the implied TC change (%).',zh:'销售−8%，客单+3%，推算交易笔数变化（%）。',ans:-10.68,tol:0.1,ex:'(0.92 ÷ 1.03) − 1 = −10.68%',exz:'(0.92 ÷ 1.03) − 1 = −10.68%，注意是负数',lg:['<p><strong>The logic:</strong> Sales = TC × AC, so TC = Sales ÷ AC. Turn each % into a multiplier first: sales −8% = 0.92, AC +3% = 1.03. Then TC = 0.92 ÷ 1.03 = 0.8932, which is −10.68%.</p><p><strong>Do not subtract:</strong> −8% − 3% = −11% is wrong, because the two changes multiply, they do not add.</p><p><strong>Example:</strong> last year TC 10,000 × AC $10.00 = $100,000. This year sales $92,000 and AC $10.30, so TC = 92,000 ÷ 10.30 ≈ 8,932 (−10.68%).</p><p><strong>Read it:</strong> AC went up, but TC fell even more, so higher spend per customer could not cover the lost customers. The real problem is traffic. Focus on TC (footfall, conversion) and keep up-selling.</p><p><strong>More examples:</strong> Sales +10%, AC +5% → TC +4.76%. Sales +10%, AC −5% → TC +15.79%. Sales −8%, AC −3% → TC −5.15%.</p>','<p><strong>逻辑：</strong>销售 = TC × AC，所以 TC = 销售 ÷ AC。先把百分比换成倍数：销售−8% = 0.92，客单+3% = 1.03。TC = 0.92 ÷ 1.03 = 0.8932，即 −10.68%。</p><p><strong>不能直接相减：</strong>−8% − 3% = −11% 是错的，因为两个变化是相乘，不是相加。</p><p><strong>例子：</strong>去年 TC 10,000 × AC $10.00 = $100,000。今年销售 $92,000、客单 $10.30，TC = 92,000 ÷ 10.30 ≈ 8,932（−10.68%）。</p><p><strong>解读：</strong>客单虽然上升，但客流掉得更多，每位顾客多花的钱补不回流失的顾客。真正要解决的是客流：提高进店与转化，同时保持追加销售。</p><p><strong>更多例子：</strong>销售+10%、客单+5% → TC +4.76%；销售+10%、客单−5% → TC +15.79%；销售−8%、客单−3% → TC −5.15%。</p>']},
 {en:'Waste $250/day over 30 days. Monthly waste ($)?',zh:'每日损耗$250，30天，月损耗（$）？',ans:7500,tol:0.5,ex:'250 × 30 = $7,500',exz:'250 × 30 = $7,500',lg:['<p><strong>The logic:</strong> waste repeats every day, so monthly waste = daily waste × days in the month. A small daily amount looks harmless, but over a month it becomes a real number on the profit report.</p><p><strong>Read it:</strong> $7,500 is cost you paid for but never sold. Compare it with monthly sales (waste % of sales) and ask which items cause it. Cutting too hard causes stock-outs and lost margin, so aim for the balance.</p>','<p><strong>逻辑：</strong>损耗每天都在发生，所以月损耗 = 每日损耗 × 当月天数。每天一点点看似不多，一个月下来就是利润报表上很大的数字。</p><p><strong>解读：</strong>$7,500 是买了却没卖出去的成本。要拿它跟月销售比（损耗占销售%），再查是哪些商品造成的。减得太狠会缺货、损失毛利，所以要找平衡。</p>']},
 {en:'Fixed costs $30,000; variable costs 70%. Break-even sales ($)?',zh:'固定成本$30,000，变动成本70%，盈亏平衡销售（$）？',ans:100000,tol:0.5,ex:'30,000 ÷ (1 − 0.70) = $100,000',exz:'30,000 ÷ (1 − 0.70) = $100,000',lg:['<p><strong>The logic:</strong> every $1 of sales uses $0.70 on variable cost, leaving $0.30 (the contribution margin). That $0.30 must pay the fixed costs of $30,000. So sales needed = 30,000 ÷ 0.30 = $100,000.</p><p><strong>Check:</strong> 100,000 × 0.30 = 30,000, which exactly covers fixed cost, so profit is zero.</p><p><strong>Read it:</strong> below $100,000 the store loses money, above it the store profits. Break-even is zero profit, it is not the budget target.</p>','<p><strong>逻辑：</strong>每$1销售要花$0.70变动成本，剩下$0.30（边际贡献）。这$0.30要用来支付$30,000固定成本。所以需要的销售 = 30,000 ÷ 0.30 = $100,000。</p><p><strong>验算：</strong>100,000 × 0.30 = 30,000，刚好付完固定成本，利润为零。</p><p><strong>解读：</strong>低于$100,000就亏，高于就赚。盈亏平衡是零利润，不是预算目标。</p>']}
];
function quizP(){
 var h='<p class="eyebrow">ASSESSMENT · 课程考核</p><h2 class="title">Assessment <span class="zh">结业测验</span></h2>';
 QZ.forEach(function(q,i){h+='<div class="q" data-i="'+i+'"><p><strong>'+(i+1)+'.</strong> '+b(q.en,q.zh)+'</p><div class="row"><input type="text" inputmode="decimal" aria-label="answer '+(i+1)+'" placeholder="0"><button class="btn" data-chk="'+i+'">'+bi('Check','检查')+'</button></div><div class="err">'+bi('Enter a number first.','请先输入数字。')+'</div><div class="res"></div></div>';});
 h+='<div class="q"><p><strong>5.</strong> '+b('Design 3 recovery actions, each with owner, KPI, deadline and risk control.','制定3项行动，包含负责人、指标、期限和风险。')+'</p><textarea rows="4" style="width:100%;border:1px solid var(--line);border-radius:8px;padding:8px 10px;font:inherit" placeholder="Action 1 · Owner · KPI · Deadline · Risk control"></textarea><div class="row"><button class="btn ghost" data-rub="1">'+bi('Show trainer scoring','显示评分标准')+'</button></div>'
 +'<div class="ans"><strong>'+bi('Trainer scoring','讲师评分')+'</strong><div class="why" style="margin:0 0 8px"><p>'+b('Why these weights: a good plan starts from a correct diagnosis, shows the dollar impact, and names someone who will do it. An action with no owner or no number is only an idea.','为什么这样评分：好的方案先要诊断正确，再算出金额影响，并指定负责人。没有负责人或没有数字的行动，只是想法。')+'</p></div><div class="chips"><span>Diagnosis 诊断 25%</span><span>Quantified impact 量化影响 25%</span><span>Ownership 责任 20%</span><span>Feasibility 可执行性 20%</span><span>Quality &amp; safety guardrails 品质安全 10%</span></div></div></div>'
 +'<div class="card"><h3>'+bi('MANAGEMENT REPORTING TEMPLATE','管理汇报模板')+'</h3><table><tbody>'
 +[['FACT','事实'],['CAUSE','根因'],['ACTION','行动'],['OWNER','负责人'],['DEADLINE','期限'],['IMPACT','预计影响']].map(function(r){return '<tr><td style="width:150px"><strong>'+r[0]+'</strong> / '+r[1]+'</td><td><input type="text" style="width:100%;border:1px solid var(--line);border-radius:8px;padding:6px 8px;font:inherit"></td></tr>';}).join('')+'</tbody></table></div>'
 +'<div class="card warn"><p>'+b('Important: never compromise food safety, quality or statutory obligations for short-term profit.','重要原则：不得为短期利润牺牲食品安全、品质或法定义务。')+'</p></div>';
 return h+navBtns('quiz');
}
function check(i,box){
 var inp=$('input',box),err=$('.err',box),res=$('.res',box),q=QZ[i];
 var raw=inp.value.replace(/[$,%\s]/g,'').replace('−','-').replace(/,/g,'');
 err.style.display='none';res.className='res';
 if(raw===''||isNaN(parseFloat(raw))){err.style.display='block';return;}
 var v=parseFloat(raw),ok=Math.abs(v-q.ans)<=q.tol;
 res.className='res '+(ok?'ok':'no');
 res.innerHTML=(ok?'<strong>'+bi('Correct','正确')+'</strong> — ':'<strong>'+bi('Not yet','再想想')+'</strong> — ')+q.ex+'<br><span class="note">'+q.exz+'</span><div class="why"><h4>'+bi('WHY: THE LOGIC','为什么：解题逻辑')+'</h4>'+b(q.lg[0],q.lg[1])+'</div>';
}

/* ---------- render ---------- */
function render(){
 var k=cur(),i=M.findIndex(function(m){return m.k===k;}),v=$('#view'),h;
 if(k==='home')h=home();else if(i>=0)h=mod(M[i],i);else if(k==='case')h=caseP();else if(k==='plan')h=planP();else h=quizP();
 v.innerHTML=h;
 if(i>=0&&M[i].bind)M[i].bind();
  seen[k]=1;saveSeen();side(k);
 var n=PAGES.filter(function(p){return seen[p.k];}).length;
 $('#barfill').style.width=(n/PAGES.length*100)+'%';$('#pc').textContent=n+' / '+PAGES.length;
 if(k==='case'){caseCalc();
  ['s','c','l'].forEach(function(x){$('#r-'+x).addEventListener('input',function(e){CS[x]=parseFloat(e.target.value);caseCalc();});});
  $('#cs-reset').addEventListener('click',function(){CS={s:110000,c:42,l:20};$('#r-s').value=CS.s;$('#r-c').value=CS.c;$('#r-l').value=CS.l;caseCalc();});}
 window.scrollTo(0,0);
}
$('#view').addEventListener('click',function(e){
 var t=e.target.closest('button');if(!t)return;
 if(t.hasAttribute('data-go'))go(t.getAttribute('data-go'));
 else if(t.hasAttribute('data-rev')||t.hasAttribute('data-rub')){var a=t.closest('.card,.q').querySelector('.ans');a.classList.toggle('show');}
 else if(t.hasAttribute('data-chk')){check(parseInt(t.getAttribute('data-chk'),10),t.closest('.q'));}
});
$('#view').addEventListener('input',function(e){var q=e.target.closest('.q');if(q){var er=q.querySelector('.err');if(er)er.style.display='none';}});
window.addEventListener('hashchange',render);
render();
})();
