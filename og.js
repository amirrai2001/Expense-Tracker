'use strict'
const balanceEL = document.getElementById('balance');
const moneyplusEl = document.getElementById('money-plus')
const moneyminusEl = document.getElementById('money-minus')
const listEl=document.getElementById('list')
const formEl = document.getElementById('form')
const trasacionEl = document.getElementById('transaction')
const amountEl = document.getElementById('amount')




 let transactions=[];
 transactions=localStorage.getItem('transactions')!= null ? JSON.parse(localStorage.getItem('transactions')):[];


const addtransactionDOM = function(transaction){  
     let sign = transaction.amount < 0 ? '-':'+';
let item = document.createElement('li');
item.classList.add(transaction.amount < 0 ? 'minus':'plus');
item.innerHTML = `
  ${transaction.transaction}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick = "removeTransaction(${
  transaction.id})">x</button>
  `;
listEl.appendChild(item);
}
const init = function(){
  listEl.innerHTML=null;
  transactions.forEach(addtransactionDOM)
  updateValues()
}
const removeTransaction = function(id) {
  transactions= transactions.filter((transaction)=>transaction.id !==id)
  init()
}
const updateValues =function(){
  const amounts = transactions.map((transaction)=>transaction.amount)
  const income = amounts.filter((item)=>item > 0).reduce((acc,item) =>acc+item,0 )
  const expense = amounts.filter((item)=>item < 0).reduce((acc,item) =>acc+item,0 )
 const total = income + expense
 moneyplusEl.innerText=` $ ${income}`;
 moneyminusEl.innerText =`$ ${expense}`;
 balanceEL.innerText=`$ ${total}` ;
}

formEl.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(trasacionEl.value.trim() === '' || amountEl.value.trim() === ''){
    alert('enter a valid input');
  }else{
    const trasacionitem= {
        id: new Date().valueOf(),
        transaction:trasacionEl.value,
        amount:Number(amountEl.value),
     }

      transactions.push(trasacionitem);
      localStorage.setItem('transactions',JSON.stringify(transactions));
      addtransactionDOM(trasacionitem);
      updateValues();
      trasacionEl.value= null;
      amountEl.value=null;
 }
})
init()