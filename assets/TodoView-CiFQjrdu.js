import{_ as F,r as p,h as K,c as a,a as C,b as e,i as v,v as m,t as s,g as P,f as j,F as x,j as J,o as l,p as L,k as Y,M as q,E as z}from"./index-CPtHe2_p.js";import{N as A}from"./NavBar-DEPxo3QW.js";import{g as G,U as f,C as V}from"./users.service-Cdh67N8Q.js";import{T as _}from"./todo.service-CvQajZR0.js";const d=w=>(L("data-v-275c1895"),w=w(),Y(),w),H=d(()=>e("h3",null,"註冊",-1)),Q={key:0},W={key:1},X=d(()=>e("br",null,null,-1)),Z=d(()=>e("h3",null,"登入",-1)),ee={key:0},te={key:1},ne=d(()=>e("br",null,null,-1)),oe=d(()=>e("h3",null,"驗證",-1)),ae={key:0},le={key:1},se=d(()=>e("br",null,null,-1)),ue=d(()=>e("h3",null,"登出",-1)),ie={key:0},de={key:1},ce=d(()=>e("br",null,null,-1)),re=d(()=>e("hr",null,null,-1)),pe={key:0},ve=d(()=>e("br",null,null,-1)),me=d(()=>e("thead",null,[e("tr",null,[e("td",null,"cotent"),e("td",null,"createTime"),e("td",null,"status"),e("td",null,"operation")])],-1)),ke={class:"content"},ye={key:0},_e=["onClick"],he={key:1},ge=["onClick"],be=["onClick"],fe=["onClick"],we={__name:"TodoView",setup(w){const k=p({}),b=p({}),h=p({}),u=p({}),c=p({}),g=p({});async function U(){try{const t=await f.signUp(k.value);b.value=t.data,k.value={}}catch(t){b.value=t.response.data}}async function S(){try{const t=await f.signIn(h.value);u.value=t.data,h.value={},g.value={},document.cookie=`${V}=${t.data.token}; expires=${t.data.exp}; SameSite=None; Secure`}catch(t){u.value=t.response.data}}async function I(){try{const t=await f.checkout(),o=await _.getTodos();c.value=t.data,i.value=o.data.data}catch(t){c.value=t.response.data}}async function E(){try{const t=await f.signOut();g.value=t.data,u.value={},i.value=[],c.value={},document.cookie=`${V}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=None; Secure`}catch(t){g.value=t.response.data}}const i=p([]),T=p(""),y=p({});async function N(){try{await _.addTodo({content:T.value});const t=await _.getTodos();i.value=t.data.data,T.value=""}catch(t){alert(t.response.data.message)}}async function $({id:t}){try{await _.editTodo({id:t,content:y.value.content});const o=i.value.findIndex(n=>n.id===t);i.value[o].content=y.value.content,y.value={}}catch(o){alert(o.response.data.message)}}function O(){y.value={}}function B(t){y.value={...t}}function D({id:t,content:o}){q.confirm({title:`確定要刪除「${o}] ?`,icon:C(z),content:"刪掉的內容就像十年前的體重，再也回不去了",onOk(){return M(t)},onCancel(){}})}async function M(t){try{await _.deleteTodo(t);const o=i.value.findIndex(n=>n.id===t);i.value.splice(o,1)}catch(o){alert(o.response.data.message)}}async function R({id:t,status:o}){try{await _.toggleTodo(t);const n=i.value.findIndex(r=>r.id===t);i.value[n].status=!o}catch(n){alert(n.response.data.message)}}return K(()=>{async function t(){try{const n=await f.checkout(),r=await _.getTodos();u.value.token=o,c.value=n.data,i.value=r.data.data}catch(n){console.log(n)}}const o=G();o&&t()}),(t,o)=>(l(),a(x,null,[C(A),e("main",null,[e("div",null,[H,v(e("input",{type:"email",placeholder:"Email","onUpdate:modelValue":o[0]||(o[0]=n=>k.value.email=n)},null,512),[[m,k.value.email]]),v(e("input",{type:"password",placeholder:"Password","onUpdate:modelValue":o[1]||(o[1]=n=>k.value.password=n)},null,512),[[m,k.value.password]]),v(e("input",{type:"text",placeholder:"Nickname","onUpdate:modelValue":o[2]||(o[2]=n=>k.value.nickname=n)},null,512),[[m,k.value.nickname]]),e("button",{type:"button",onClick:U},"sign up"),b.value.status?(l(),a("p",W,s(b.value.uid),1)):(l(),a("p",Q,s(b.value.message),1))]),X,e("div",null,[Z,v(e("input",{type:"email",placeholder:"Email","onUpdate:modelValue":o[3]||(o[3]=n=>h.value.email=n)},null,512),[[m,h.value.email]]),v(e("input",{type:"password",placeholder:"Password","onUpdate:modelValue":o[4]||(o[4]=n=>h.value.password=n)},null,512),[[m,h.value.password]]),e("button",{type:"button",onClick:S},"sign in"),u.value.status?(l(),a("p",te," welcome "+s(u.value.nickname)+" !! your token is: "+s(u.value.token),1)):(l(),a("p",ee,s(u.value.message),1))]),ne,e("div",null,[oe,v(e("input",{type:"text",placeholder:"token","onUpdate:modelValue":o[5]||(o[5]=n=>u.value.token=n),disabled:""},null,512),[[m,u.value.token]]),e("button",{type:"button",onClick:I},"Check out"),c.value.status?(l(),a("p",le,s(c.value.nickname)+" 驗證成功!!",1)):(l(),a("p",ae,s(c.value.message),1))]),se,e("div",null,[ue,v(e("input",{type:"text",placeholder:"token","onUpdate:modelValue":o[6]||(o[6]=n=>u.value.token=n),disabled:""},null,512),[[m,u.value.token]]),e("button",{type:"button",onClick:E},"Sign out"),g.value.status?(l(),a("p",de,s(g.value.nickname)+" 成功登出!!",1)):(l(),a("p",ie,s(g.value.message),1))]),ce,re,e("div",null,[e("h2",null,[c.value.nickname?(l(),a("span",pe,"這是"+s(c.value.nickname)+"的",1)):P("",!0),j("TODOS ")]),e("div",null,[v(e("input",{stype:"text","onUpdate:modelValue":o[7]||(o[7]=n=>T.value=n)},null,512),[[m,T.value]]),e("button",{type:"button",onClick:N},"add todo")]),ve,e("table",null,[me,e("tbody",null,[(l(!0),a(x,null,J(i.value,n=>(l(),a("tr",{key:n.id},[e("td",ke,[y.value.id===n.id?(l(),a("div",ye,[v(e("input",{type:"text","onUpdate:modelValue":o[8]||(o[8]=r=>y.value.content=r)},null,512),[[m,y.value.content]]),e("div",null,[e("button",{type:"button",onClick:r=>$(n)},"save",8,_e),e("button",{type:"button",onClick:O},"cancel")])])):(l(),a("div",he,[e("p",null,s(n.content),1),e("button",{type:"button",onClick:r=>B(n)},"edit",8,ge)]))]),e("td",null,s(n.createTime),1),e("td",null,[e("button",{type:"button",onClick:r=>R(n)},s(n.status?"completed":"Unfinished"),9,be)]),e("td",null,[e("button",{type:"button",onClick:r=>D(n)},"delete",8,fe)])]))),128))])])])])],64))}},Ue=F(we,[["__scopeId","data-v-275c1895"]]);export{Ue as default};
