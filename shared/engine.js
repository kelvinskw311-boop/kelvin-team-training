(function(){
"use strict";
var C=window.COURSE,PASS=80,KEY='ktt_v1';
function b(en,zh){return '<span class="en">'+en+'</span><span class="zh">'+zh+'</span>';}
function bi(en,zh){return '<span class="inl">'+b(en,zh)+'</span>';}
function $(s,r){return (r||document).querySelector(s);}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){return {};}}
function save(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}}
function P(u){var d=load();return (d[C.id]&&d[C.id][u])||{};}
function setP(u,patch){var d=load(),c=d[C.id]=d[C.id]||{},o=c[u]=c[u]||{},k;for(k in patch)o[k]=patch[k];save(d);}
function done(u){var p=P(u);return !!(p.q>=PASS&&p.t);}
function cur(){var h=(location.hash||'').replace('#','');return (h==='home'||C.units.some(function(u){return u.id===h;}))?h:'home';}
function go(k){if(location.hash!=='#'+k)location.hash=k;else render();}

function setLang(l){
 document.body.className='lang-'+l;
 document.querySelectorAll('.seg button').forEach(function(x){x.classList.toggle('on',x.getAttribute('data-l')===l);});
 try{localStorage.setItem('pl_lang',l);}catch(e){}
}
document.querySelector('.seg').addEventListener('click',function(e){var l=e.target.getAttribute&&e.target.getAttribute('data-l');if(l)setLang(l);});
try{var sl=localStorage.getItem('pl_lang');if(sl)setLang(sl);}catch(e){}

function side(k){
 var h='<a class="pl" href="../index.html">← '+bi('Portal','学习门户')+'</a><h1>'+bi(C.en,C.zh)+'</h1><p class="sub">'+bi('Generic version','通用版本')+'</p>';
 h+='<button class="nv'+(k==='home'?' on':'')+'" data-k="home"><span class="n">⌂</span><span class="t">Course overview<small>课程总览</small></span></button>';
 C.units.forEach(function(u,i){
  h+='<button class="nv'+(k===u.id?' on':'')+(done(u.id)?' done':'')+'" data-k="'+u.id+'"><span class="n">'+(done(u.id)&&k!==u.id?'✓':(i+1))+'</span><span class="t">'+u.en+'<small>'+u.zh+'</small></span></button>';
 });
 $('#side').innerHTML=h;
}
$('#side').addEventListener('click',function(e){var t=e.target.closest('.nv');if(t){go(t.getAttribute('data-k'));$('#side').classList.remove('open');}});
$('#menu').addEventListener('click',function(){$('#side').classList.toggle('open');});
document.addEventListener('click',function(e){if(!e.target.closest('#side')&&!e.target.closest('#menu'))$('#side').classList.remove('open');});

function progress(){
 var n=C.units.filter(function(u){return done(u.id);}).length;
 $('#barfill').style.width=(n/C.units.length*100)+'%';
 $('#pc').textContent=n+' / '+C.units.length;
}

function home(){
 var h='<p class="eyebrow">COURSE · 课程</p><h2 class="title">'+C.en+'<br><span class="zh">'+C.zh+'</span></h2>'
 +'<div class="card"><p>'+b(C.intro[0],C.intro[1])+'</p></div>'
 +'<div class="card addnote"><p>'+b('Generic version: built from public good-practice sources, not from company SOPs. Replace thresholds and steps with your own standards where they differ.','通用版本：根据公开的良好做法整理，不是公司 SOP。若与公司标准不同，请以公司标准为准。')+'</p></div>'
 +'<div class="card"><h3>'+bi('HOW EACH UNIT WORKS','每个单元怎么学')+'</h3><div class="steps"><span>1 Lesson 短课</span><span>2 Example 例子</span><span>3 Scenario 情境</span><span>4 Quiz 测验 ≥'+PASS+'%</span><span>5 Store task 门店任务</span></div><p class="note">'+b('A unit counts as done when the quiz is passed and the store task is ticked. Progress is saved on this device only.','测验及格并勾选门店任务，才算完成该单元。进度只保存在这台设备上。')+'</p></div>'
 +'<div class="grid">'+C.units.map(function(u,i){var p=P(u.id);return '<div class="card"><p class="eyebrow">UNIT '+(i+1)+(done(u.id)?' · DONE ✓':'')+'</p><p style="font-weight:600">'+u.en+'</p><p class="note">'+u.zh+'</p><p class="note" style="margin-top:6px">'+(p.q!=null?bi('Best quiz','最佳测验')+' '+p.q+'%':bi('Not started','未开始'))+'</p><div class="row"><button class="btn ghost" data-go="'+u.id+'">'+bi('Open','打开')+'</button></div></div>';}).join('')+'</div>';
 return h;
}

function unit(u,i){
 var p=P(u.id),h='<p class="eyebrow">UNIT '+(i+1)+' / '+C.units.length+'</p><h2 class="title">'+u.en+' <br><span class="zh">'+u.zh+'</span></h2>'
 +'<div class="steps" id="stp"><span class="ok">1 Lesson 短课</span><span class="ok">2 Example 例子</span><span id="s3"'+(p.s?' class="ok"':'')+'>3 Scenario 情境</span><span id="s4"'+(p.q>=PASS?' class="ok"':'')+'>4 Quiz 测验</span><span id="s5"'+(p.t?' class="ok"':'')+'>5 Store task 门店任务</span></div>'
 +'<div class="card"><h3>'+bi('1 · LESSON','1 · 短课')+'</h3><p>'+b(u.lesson[0],u.lesson[1])+'</p></div>'
 +'<div class="card ex"><h3>'+bi('2 · WORKED EXAMPLE','2 · 计算例子')+'</h3><p class="big">'+b(u.example[0],u.example[1])+'</p></div>'
 +(u.tool?'<div class="card" id="tool"><h3>'+bi('TRY IT','动手试试')+'</h3>'+u.tool.html+'</div>':'')
 +'<div class="card" id="scn"><h3>'+bi('3 · SCENARIO: WHAT WOULD YOU DO?','3 · 情境判断：你会怎么做？')+'</h3><p>'+b(u.sc.q[0],u.sc.q[1])+'</p>'
 +u.sc.o.map(function(o,j){return '<button class="opt" data-o="'+j+'">'+b(o.t[0],o.t[1])+'</button>';}).join('')+'<div class="res" id="scr"></div></div>'
 +'<div class="card" id="qz"><h3>'+bi('4 · QUIZ (pass mark '+PASS+'%)','4 · 测验（及格 '+PASS+'%）')+'</h3>'
 +u.quiz.map(function(q,j){return '<div class="qq" data-j="'+j+'"><p><strong>'+(j+1)+'.</strong> '+b(q.q[0],q.q[1])+'</p>'+q.o.map(function(o,k){return '<label><input type="radio" name="q'+j+'" value="'+k+'"><span>'+b(o[0],o[1])+'</span></label>';}).join('')+'<div class="res qr"></div></div>';}).join('')
 +'<div class="row"><button class="btn" id="sub">'+bi('Submit answers','提交答案')+'</button><button class="btn ghost" id="retry" style="display:none">'+bi('Try again','重做')+'</button></div><div class="err" id="qe">'+bi('Answer every question first.','请先回答所有题目。')+'</div><div class="res" id="qs"></div></div>'
 +'<div class="card ws" id="tk"><h3>'+bi('5 · STORE TASK (do it in your store)','5 · 门店任务（回门店实际做）')+'</h3><p>'+b(u.task[0],u.task[1])+'</p>'
 +'<label>'+bi('What I found','我发现了什么')+'</label><input type="text" id="t1" value="'+esc(p.t1)+'"><label>'+bi('Action I will take','我会采取的行动')+'</label><input type="text" id="t2" value="'+esc(p.t2)+'"><label>'+bi('Deadline','期限')+'</label><input type="text" id="t3" value="'+esc(p.t3)+'">'
 +'<label style="display:flex;gap:8px;align-items:center;margin-top:10px;font-size:14px;color:var(--ink);cursor:pointer"><input type="checkbox" id="tdone" style="width:18px;height:18px"'+(p.t?' checked':'')+'>'+bi('I have done this in my store','我已在门店完成')+'</label><div class="err" id="te">'+bi('Write the action you will take first.','请先写下你会采取的行动。')+'</div></div>'
 +(u.src&&u.src.length?'<div class="card src"><h3>'+bi('SOURCES (public, general good practice)','资料来源（公开的通用做法）')+'</h3><ul style="margin:0;padding-left:18px">'+u.src.map(function(s){return '<li><a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+'</a></li>';}).join('')+'</ul></div>':'');
 var pv=C.units[i-1],nx=C.units[i+1];
 h+='<div class="nav">'+(pv?'<button class="btn ghost" data-go="'+pv.id+'">← '+bi(pv.en,pv.zh)+'</button>':'<button class="btn ghost" data-go="home">← '+bi('Overview','总览')+'</button>')+(nx?'<button class="btn" data-go="'+nx.id+'">'+bi(nx.en,nx.zh)+' →</button>':'<a class="btn" style="text-decoration:none" href="../index.html">'+bi('Back to portal','回学习门户')+' →</a>')+'</div>';
 return h;
}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}

function bindUnit(u){
 var id=u.id;
 $('#scn').addEventListener('click',function(e){
  var t=e.target.closest('.opt');if(!t)return;
  var j=+t.getAttribute('data-o'),o=u.sc.o[j],r=$('#scr');
  document.querySelectorAll('#scn .opt').forEach(function(x){x.classList.remove('sel','good','bad');});
  t.classList.add(o.ok?'good':'bad');
  r.className='res '+(o.ok?'ok':'no');
  r.innerHTML='<strong>'+(o.ok?bi('Good call','判断正确'):bi('Think again','再想想'))+'</strong> — '+b(o.w[0],o.w[1]);
  if(o.ok){setP(id,{s:1});$('#s3').className='ok';}
 });
 var form=$('#qz');
 function lock(v){form.querySelectorAll('input').forEach(function(x){x.disabled=v;});$('#sub').style.display=v?'none':'';$('#retry').style.display=v?'':'none';}
 $('#sub').addEventListener('click',function(){
  var ans=[],i,bad=false;
  for(i=0;i<u.quiz.length;i++){var c=form.querySelector('input[name="q'+i+'"]:checked');if(!c)bad=true;ans.push(c?+c.value:-1);}
  if(bad){$('#qe').style.display='block';return;}
  $('#qe').style.display='none';
  var ok=0;
  u.quiz.forEach(function(q,j){
   var good=ans[j]===q.a,r=form.querySelectorAll('.qr')[j];if(good)ok++;
   r.className='res qr '+(good?'ok':'no');
   r.innerHTML='<strong>'+(good?bi('Correct','正确'):bi('Not quite','不对'))+'</strong> — '+b(q.w[0],q.w[1]);
  });
  var pct=Math.round(ok/u.quiz.length*100),best=Math.max(pct,P(id).q||0),pass=pct>=PASS,s=$('#qs');
  setP(id,{q:best});
  s.className='res '+(pass?'ok':'no');
  s.innerHTML='<strong>'+pct+'% ('+ok+' / '+u.quiz.length+')</strong> — '+(pass?b('Passed. Now do the store task below.','及格了。接着完成下面的门店任务。'):b('Below '+PASS+'%. Read the explanations, then try again.','低于'+PASS+'%。先看解说，再重做。'));
  lock(true);
  if(best>=PASS)$('#s4').className='ok';
  side(id);progress();
 });
 $('#retry').addEventListener('click',function(){
  form.querySelectorAll('input').forEach(function(x){x.checked=false;});
  form.querySelectorAll('.qr').forEach(function(r){r.className='res qr';r.innerHTML='';});
  $('#qs').className='res';lock(false);
 });
 ['t1','t2','t3'].forEach(function(k){$('#'+k).addEventListener('input',function(){var o={};o[k]=this.value;setP(id,o);$('#te').style.display='none';});});
 $('#tdone').addEventListener('change',function(){
  if(this.checked&&!$('#t2').value.trim()){this.checked=false;$('#te').style.display='block';return;}
  setP(id,{t:this.checked?1:0});
  $('#s5').className=this.checked?'ok':'';
  side(id);progress();
 });
 if(u.tool&&u.tool.init)u.tool.init();
}

function render(){
 var k=cur(),i=C.units.findIndex(function(u){return u.id===k;}),v=$('#view');
 v.innerHTML=i>=0?unit(C.units[i],i):home();
 if(i>=0)bindUnit(C.units[i]);
 side(k);progress();window.scrollTo(0,0);
}
$('#view').addEventListener('click',function(e){var t=e.target.closest('[data-go]');if(t)go(t.getAttribute('data-go'));});
window.addEventListener('hashchange',render);
render();
})();
