import{a as t,g as e}from"./users.service-Cdh67N8Q.js";const n="https://todolist-api.hexschool.io/todos",s=()=>t.get(n,{headers:{"Content-Type":"application/json",Authorization:e()}}),i=o=>t.post(n,{...o},{headers:{"Content-Type":"application/json",Authorization:e()}}),r=({id:o,content:a})=>t.put(`${n}/${o}`,{content:a},{headers:{"Content-Type":"application/json",Authorization:e()}}),p=o=>t.delete(`${n}/${o}`,{headers:{"Content-Type":"application/json",Authorization:e()}}),d=o=>t.patch(`${n}/${o}/toggle`,{},{headers:{"Content-Type":"application/json",Authorization:e()}}),h={getTodos:s,addTodo:i,editTodo:r,deleteTodo:p,toggleTodo:d};export{h as T};
