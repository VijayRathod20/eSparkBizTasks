//odd  2,4,6,8,10

for(var i=2;i<10;i+=2){
    console.log(i + " ");
}

//even series
for(var i=1;i<10;i+=2){
    console.log(i);
}


//squre series

for(var i=1; i<=10; i++){
    var squre = i*i;
    console.log(squre);
}

//quib series
for(var i=1; i<=10; i++){
    var squre = i*i*i;
    console.log(squre);
}

//febonacci
let n1 = 0, n2 = 1, nextTerm;

console.log('Fibonacci Series:');

for (let i = 1; i <= 20; i++) {
    console.log(n1);
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
}