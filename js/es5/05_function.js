// 생성자 함수에서의 this의 의미
// 일급함수
function person() {
    this.someValue = 2;
    var someValue2 = 3;

    return { someValue2: someValue2 };
}

console.log(person()); //실행결과는? 그 이유는?

// new => 생성자함수
// 내부적으로 자기자신을 가르키는 this가 생성
// 명시적으로 return이 없으면 this가 리턴
// this를 리턴하거나 생략하면 this가 리턴
// 리턴시 primitive 타입이면 무시되고 객체로 리턴해야함.
console.log(new person()); // 생성자 함수로 생성시 실행결과는?

console.log(someValue); // 실행결과와, 이유를 말하시오
