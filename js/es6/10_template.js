let tag = function(strings, ...values) {
    console.log(strings);
    console.log(...values);
    let result = "";

    for(let i = 0; i < strings.length; i++) {
        result += strings[i];
        if(i < values.length) {
            result += values[i];
        }
    }

    return result;
};

let a = 20;
let b = 10;
let c = "자바스크립트";

// template string: 빽틱 안에 ${변수명}
let str = `나는 ${a+b}살이고 ${c}를 좋아해`;

console.log(str);
