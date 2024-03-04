import{S as m,a as f,i as c}from"./assets/vendor-b42c18af.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const h=document.querySelector(".gallery-list"),S=document.querySelector("button"),q=document.querySelector(".loader");function $(){h.innerHTML=""}S.addEventListener("click",async()=>{w();try{const e=await p();h.innerHTML=v(e.hits),q.style.display="none",new m(".gallery-link").refresh(),g()}catch(e){console.log("Error:",e),l()}});function v(e){return e.map(({webformatURL:o,largeImageURL:n,tags:s,likes:t,views:r,comments:i,downloads:b})=>`<li class="gallery-item">
        <a href="${n}" class="gallery-link" alt="${s}">
        <img class="gallery-image" src="${o}" alt="${s}"/>
        </a>
            <div class="wrapper-descs">
            <div class="wrapper-desc">
                <p class="desc">Likes</p>
                <p class="desc-values">${t}</p>
                </div>
                <div class="wrapper-desc">
                <p class="desc">Views</p>
                <p class="desc-values">${r}</p>
                </div>
                <div class="wrapper-desc">
                <p class="desc">Comments</p>
                <p class="desc-values">${i}</p>
                </div>
                <div class="wrapper-desc">
                <p class="desc">Downloads</p>
                <p class="desc-values">${b}</p>
                </div>
            </div>
        </li>`).join("")}function E(e){if(e){const{height:o}=e.getBoundingClientRect();return o}return 0}const y=document.querySelector("input"),x=document.querySelector("form"),d=document.querySelector(".load-more-button"),L=document.querySelector(".gallery-list");document.querySelector(".gallery-item");f.defaults.baseURL="https://pixabay.com/api/";const H="42561040-543dc47762d23067e130ec962";let u=null;y.addEventListener("input",e=>{u=y.value});let a=1;async function p(e=1){e===1&&$();const o=`?key=${H}&q=${u}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=15`;try{const n=await f.get(o);if(n.status!==200)throw new Error("Image error");const{hits:s,totalHits:t}=n.data;return s.length===0&&(l(),c.warning({title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})),{hits:s,totalHits:t}}catch{return l(),c.error({title:"Caution",message:"Error while fetching images from pixabay",position:"topRight"}),{hits:[],totalHits:0}}}x.addEventListener("submit",e=>{e.preventDefault(),u=e.target.elements.value,a=1,p(),g()});d.addEventListener("click",async()=>{w(),a++;try{const{hits:e,totalHits:o}=await p(a);if(e.length>0){L.innerHTML+=v(e),g();const n=document.querySelector(".gallery-item"),s=E(n);window.scrollBy({top:s*2,behavior:"smooth"}),new m(".gallery-link").refresh()}a*15>=o&&(l(),d.style.display="none",c.info({title:"Caution",message:"We`re sorry, but you`ve reached the end of search results.",position:"topRight"}))}catch(e){console.log("Error:",e)}finally{l()}});function g(){d.style.display=L.children.length>0?"block":"none"}function w(){const e=document.querySelector(".loader");e.style.display="block"}function l(){const e=document.querySelector(".loader");e.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
