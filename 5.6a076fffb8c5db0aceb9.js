(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{140:function(e){e.exports=JSON.parse('[{"id":4,"text":"LOC","prefix_key":null,"suffix_key":"l","background_color":"#7c20e0","text_color":"#ffffff"},{"id":5,"text":"MISC","prefix_key":null,"suffix_key":"m","background_color":"#fbb028","text_color":"#000000"},{"id":6,"text":"ORG","prefix_key":null,"suffix_key":"o","background_color":"#e6d176","text_color":"#000000"},{"id":7,"text":"PER","prefix_key":null,"suffix_key":"p","background_color":"#6a74b9","text_color":"#ffffff"}]')},141:function(e){e.exports=JSON.parse('{"count":3250,"next":"http://127.0.0.1:8000/v1/projects/2/docs?limit=5&offset=5","previous":null,"results":[{"id":4,"text":"CRICKET - LEICESTERSHIRE TAKE OVER AT TOP AFTER INNINGS VICTORY .","annotations":[{"id":5,"prob":0,"label":6,"start_offset":10,"end_offset":24,"user":1,"document":4,"text":"This text is for seq2seq testing."}],"meta":"{}","annotation_approver":null},{"id":5,"text":"LONDON 1996-08-30","annotations":[{"id":6,"prob":0,"label":4,"start_offset":0,"end_offset":6,"user":1,"document":5}],"meta":"{}","annotation_approver":null},{"id":6,"text":"West Indian all-rounder Phil Simmons took four for 38 on Friday as Leicestershire beat Somerset by an innings and 39 runs in two days to take over at the head of the county championship .","annotations":[{"id":7,"prob":0,"label":5,"start_offset":0,"end_offset":11,"user":1,"document":6},{"id":9,"prob":0,"label":6,"start_offset":67,"end_offset":81,"user":1,"document":6},{"id":10,"prob":0,"label":6,"start_offset":87,"end_offset":95,"user":1,"document":6},{"id":8,"prob":0,"label":7,"start_offset":24,"end_offset":36,"user":1,"document":6}],"meta":"{}","annotation_approver":null},{"id":7,"text":"Their stay on top , though , may be short-lived as title rivals Essex , Derbyshire and Surrey all closed in on victory while Kent made up for lost time in their rain-affected match against Nottinghamshire .","annotations":[{"id":11,"prob":0,"label":6,"start_offset":64,"end_offset":69,"user":1,"document":7},{"id":12,"prob":0,"label":6,"start_offset":72,"end_offset":82,"user":1,"document":7},{"id":13,"prob":0,"label":6,"start_offset":87,"end_offset":93,"user":1,"document":7},{"id":14,"prob":0,"label":6,"start_offset":125,"end_offset":129,"user":1,"document":7},{"id":15,"prob":0,"label":6,"start_offset":189,"end_offset":204,"user":1,"document":7}],"meta":"{}","annotation_approver":null},{"id":8,"text":"After bowling Somerset out for 83 on the opening morning at Grace Road , Leicestershire extended their first innings by 94 runs before being bowled out for 296 with England discard Andy Caddick taking three for 83 .","annotations":[{"id":17,"prob":0,"label":4,"start_offset":60,"end_offset":70,"user":1,"document":8},{"id":19,"prob":0,"label":4,"start_offset":165,"end_offset":172,"user":1,"document":8},{"id":16,"prob":0,"label":6,"start_offset":14,"end_offset":22,"user":1,"document":8},{"id":18,"prob":0,"label":6,"start_offset":73,"end_offset":87,"user":1,"document":8},{"id":20,"prob":0,"label":7,"start_offset":181,"end_offset":193,"user":1,"document":8}],"meta":"{}","annotation_approver":null}]}')},320:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(140),l=function(){return r.a.createElement(r.a.Fragment,null,a.map((function(e){return r.a.createElement("div",{style:{display:"inline-block",backgroundColor:e.background_color,color:e.text_color,padding:"10px 8px"}},r.a.createElement("span",null,e.text),r.a.createElement("span",null,e.suffix_key))})))},s=n(141),i=(n(137),function(e){var t=e.text,n=Object(o.useRef)();return console.log(n),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{onClick:function(e){var t,o;if(window.getSelection){var r=window.getSelection().getRangeAt(0),a=r.cloneRange();a.selectNodeContents(n.current),a.setEnd(r.startContainer,r.startOffset),o=(t=a.toString().length)+r.toString().length}else if(document.selection&&"Control"!==document.selection.type){var l=document.selection.createRange(),s=document.body.createTextRange();s.moveToElementText(n.current),s.setEndPoint("EndToStart",l),o=(t=s.text.length)+l.text.length}console.log(t,o)},className:"FBH mb16",ref:n},t))}),f=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"FBH"},r.a.createElement("div",{style:{width:250}},r.a.createElement("div",null,"标题区"),s.results.map((function(e){return r.a.createElement("div",{className:"omit omit2 mb8"},r.a.createElement("span",null,e.text))}))),r.a.createElement("div",null,r.a.createElement("div",null,"内容区"),s.results.map((function(e){return r.a.createElement(i,{text:e.text})})))))},d=function(){Object(o.useRef)({current:1,total:0,pageSize:10}).current;return r.a.createElement(r.a.Fragment,null,r.a.createElement(l,null),r.a.createElement(f,null))};n.d(t,"default",(function(){return d}))}}]);