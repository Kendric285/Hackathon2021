console.log("it works")
let database = firebase.database().ref('questions');
let submitButton = document.getElementById("submitButton")
let messageContainer = document.getElementById("allQuestions")
let name = document.getElementById("name")
let question = document.getElementById("question")

const d = new Date();

database.on("value", addIDs)

function addIDs(value) {
    let info = value.val();
    let everything = Object.keys(info)
    let allButtons = document.querySelectorAll(".questionButton")
    
    for(i in allButtons){
      allButtons[i].id = everything[i]
    }
    // console.log(everything);
    // console.log(info)

    // for (i in info) {
    //     let k = info[i];
    //     console.log(k.NAME)
       
    // }
}

submitButton.onclick = function updateDB(event){
  event.preventDefault();
  let username = name.value;
  let userQuestion = question.value;

  name.value = ""
  question.value = ""

  let value = {
    NAME: username,
    QUESTION: userQuestion,
    ANSWER: ""
  }

  database.push(value)
}

database.on("child_added", addQuestionToBoard)

function addQuestionToBoard(data){
  let row = data.val();
  let username = row.NAME
  let userQuestion = row.QUESTION
  let answer = row.ANSWER

  console.log(data)

  if (row.ANSWER = "undefined"){
    answer = "Question not answered"
  }

  let questionDiv = document.createElement("div")
  let answerQuestionButton = document.createElement("button")
  let pElement = document.createElement("p")

  answerQuestionButton.innerText = "Answer Question"
  answerQuestionButton.className = "questionButton"
  pElement.innerText = username + " : " + userQuestion;
  questionDiv.appendChild(pElement)

  if (row.ANSWER = "undefined"){
    questionDiv.appendChild(answerQuestionButton)
  }
  messageContainer.appendChild(questionDiv)
}