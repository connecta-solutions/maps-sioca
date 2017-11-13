import React from 'react';

const defaultStyle = {
    height : "20px",
    width : "20px",
    borderRadius : "50%",
    color : "red",
    textAlign : "center",
    fontWeight: "bold"
};

const getStyle = (style) => {
    let str = '"';
    let pattern = /([A-Z])/g;

    for (let property in style) {
        str += property.replace(pattern, (a, group) => '-' + group.toLowerCase());
        str += ": " + style[property] ;
        str += '; ';
    }

    return str + '"';
};

const legends = {
    1: {
        title : "Áreas Degradadas",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #8497B0"
            }))}>

            </div>`
        )
    },
    2: {
        title : "Áreas Degradadas",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#8497B0",
            }))}>

            </div>`
        )
    },
    3: {
        title : "Áreas Degradadas",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #8497B0",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    4: {
        title : "Contaminação e Poluição",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #FFCCCC"
            }))}>

            </div>`
        )
    },
    5: {
        title : "Contaminação e Poluição",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#FFCCCC",
            }))}>

            </div>`
        )
    },
    6: {
        title : "Contaminação e Poluição",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #FFCCCC",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    7: {
        title : "Danos ao Patrimônio Espeleológico",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #FF99FF"
            }))}>

            </div>`
        )
    },
    8: {
        title : "Danos ao Patrimônio Espeleológico",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#FF99FF",
            }))}>

            </div>`
        )
    },
    9: {
        title : "Danos ao Patrimônio Espeleológico",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #FF99FF",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    10: {
        title : "Desmobilização",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #66CCFF"
            }))}>

            </div>`
        )
    },
    11: {
        title : "Desmobilização",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#66CCFF",
            }))}>

            </div>`
        )
    },
    12:{
        title : "Desmobilização",
        html :  (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #66CCFF",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    13: {
        title : "Erosão/Assoreamento",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #6699FF"
            }))}>

            </div>`
        )
    },
    14: {
        title : "Erosão/Assoreamento",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#6699FF",
            }))}>

            </div>`
        )
    },
    15:{
        title : "Erosão/Assoreamento",
        html :  (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #6699FF",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    16: {
        title : "Faixa de Domínio",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #9966FF"
            }))}>

            </div>`
        )
    },
    17: {
        title : "Faixa de Domínio",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#9966FF",
            }))}>

            </div>`
        )
    },
    18:{
        title : "Faixa de Domínio",
        html :  (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #9966FF",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    19: {
        title : "Impactos à Fauna Silvestre",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #FF7C80"
            }))}>

            </div>`
        )
    },
    20: {
        title : "Impactos à Fauna Silvestre",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#FF7C80",
            }))}>

            </div>`
        )
    },
    21:{
        title : "Impactos à Fauna Silvestre",
        html :  (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #FF7C80",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    22: {
        title : "Plantios e Revestimento Vegetal",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #99FF66"
            }))}>

            </div>`
        )
    },
    23: {
        title : "Plantios e Revestimento Vegetal",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#99FF66",
            }))}>

            </div>`
        )
    },
    24:{
        title : "Plantios e Revestimento Vegetal",
        html :  (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #99FF66",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    25: {
        title : "Licenças/Outorgas",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #990099"
            }))}>

            </div>`
        )
    },
    26: {
        title : "Licenças/Outorgas",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#990099",
            }))}>

            </div>`
        )
    },
    27:{
        title : "Licenças/Outorgas",
        html :  (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #990099",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    28: {
        title : "Saúde e Segurança no Trabalho",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #FFCC00"
            }))}>

            </div>`
        )
    },
    29: {
        title : "Saúde e Segurança no Trabalho",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#FFCC00",
            }))}>

            </div>`
        )
    },
    30:{
        title : "Saúde e Segurança no Trabalho",
        html :  (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #FFCC00",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    31: {
        title : "Sistema de Drenagem",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #595959"
            }))}>

            </div>`
        )
    },
    32: {
        title : "Sistema de Drenagem",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#595959",
            }))}>

            </div>`
        )
    },
    33:{
        title : "Sistema de Drenagem",
        html :  (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #595959",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    },
    34: {
        title : "Supressão Vegetal",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "transparent",
                boxSizing : "border-box",
                border : "2px solid #70AD47"
            }))}>

            </div>`
        )
    },
    35: {
        title : "Supressão Vegetal",
        html : (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "#70AD47",
            }))}>

            </div>`
        )
    },
    36:{
        title : "Supressão Vegetal",
        html :  (
            `<div style=${getStyle(Object.assign({}, defaultStyle, {
                backgroundColor : "white",
                boxSizing : "content-box",
                border : "2px solid #70AD47",
                height : "16px",
                width : "16px"
            }))}>
                !
            </div>`
        )
    }
};

export default legends;