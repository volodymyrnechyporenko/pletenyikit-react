import{j as e,L as m}from"./index-CZYdrkog.js";import{f as p,a as h,b as u}from"./texts-D3TLuuPn.js";import{u as f}from"./useDetectDataType-Cg6SzJcV.js";const i={"filter-heading":"_filter-heading_1sann_1","filter-button-wrap":"_filter-button-wrap_1sann_8","filter-button":"_filter-button_1sann_8"},x=({product:t})=>e.jsxs("div",{className:"product",children:[e.jsx("div",{className:"product-price",children:t.price}),e.jsx("div",{className:"product-title",children:t.name}),e.jsx("img",{loading:"lazy",src:`/img/${t.images[0]}`,className:"product-image",alt:""})]}),N=()=>{const{category:t,heading:l,products:r,setProducts:n}=f(),o=()=>{const s=[...r].sort((a,c)=>a.price-c.price);n(s)},d=()=>{const s=[...r].sort((a,c)=>c.price-a.price);n(s)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"heading",children:e.jsx("h1",{children:l})}),e.jsx("div",{className:i["filter-heading"],children:p}),e.jsxs("div",{className:i["filter-button-wrap"],children:[e.jsx("div",{className:i["filter-button"],onClick:o,children:h}),e.jsx("div",{className:i["filter-button"],onClick:d,children:u})]}),e.jsx("div",{className:"product-category",children:r.slice().reverse().map(s=>e.jsx(m,{to:`/${t}/${s.link}`,children:e.jsx(x,{product:s})},s.id))})]})};export{N as default};
