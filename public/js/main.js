const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const categoryButtons = document.querySelectorAll('.catBtn')

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el) => {
  el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete)
})

Array.from(categoryButtons).forEach((el) => {
  el.addEventListener('click', displayCategory)
})

async function deleteTodo() {
  const todoId = this.parentNode.dataset.id
  try {
    const response = await fetch('todos/deleteTodo', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        'todoIdFromJSFile': todoId
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function markComplete() {
  const todoId = this.parentNode.dataset.id
  try {
    const response = await fetch('todos/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        'todoIdFromJSFile': todoId
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function markIncomplete() {
  const todoId = this.parentNode.dataset.id
  try {
    const response = await fetch('todos/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        'todoIdFromJSFile': todoId
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}


  


const todoItemsIncomplete = document.querySelector("#todoItemsIncomplete");



function speech() {
  for (let i=1; i <= todoItemsIncomplete.childElementCount*2-1; i+=2 ) {
    console.log(todoItemsIncomplete.childNodes[i])
    if (todoItemsIncomplete.childNodes[i].childNodes[5].className == "dueDate") {
      const todoDate = todoItemsIncomplete.childNodes[i].childNodes[5].innerHTML.slice(4,15);
      const task = todoItemsIncomplete.childNodes[i].childNodes[3].innerHTML
      console.log(task)
      console.log(Date.parse(todoDate))
      console.log(Date.now())

      if ((Date.parse(todoDate)+86000000)<Date.now()) {
        const synth = window.speechSynthesis;
        let message = `omg you need to complete ${task} immediately you goofball!!!`
        let yellMessage = new SpeechSynthesisUtterance(message);
        synth.speak(yellMessage);
      }
    }
  }
}

speech(); 





function displayCategory(click){
  const allTodos = document.querySelectorAll('.todoItem')
  if(click.target.classList.contains('workCat')){
    console.log('work')
    Array.from(allTodos).forEach(el => el.classList.contains('workGroup') ? el.style.display = 'block' : el.style.display = 'none')
  }else if(click.target.classList.contains('foodCat')){
    console.log('food')
    Array.from(allTodos).forEach(el => el.classList.contains('foodGroup') ? el.style.display = 'block' : el.style.display = 'none')
  }else if(click.target.classList.contains('exerCat')){
    console.log('exercise')
    Array.from(allTodos).forEach(el => el.classList.contains('exerciseGroup') ? el.style.display = 'block' : el.style.display = 'none')
  }else if(click.target.classList.contains('othCat')){
    console.log('other')
    Array.from(allTodos).forEach(el => el.classList.contains('otherGroup') ? el.style.display = 'block' : el.style.display = 'none')
  }else{
    console.log('all')
    Array.from(allTodos).forEach(el => el.style.display = 'block')
  }
}