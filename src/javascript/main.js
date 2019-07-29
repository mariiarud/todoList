// import Rx from 'rxjs/Rx'

// function generateId() {
//     // Math.random should be unique because of its seeding algorithm.
//     // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//     // after the decimal.
//     return '_' + Math.random().toString(36).substr(2, 9);
//   }

//   function isFieldEmpty(text){
//     return text.split(' ').join('')=="";
// }

// document.addEventListener("keydown", keyDown, false);

// function keyDown(e) {
//     var keyCode = e.keyCode;
//     switch(keyCode){
//       case 38:
//         choosePreviosList();
//         break;
//       case 40:
//         choosePreviosList();
//         break;
//     }
//   }

// Rx.Observable.fromEvent(document, "keydown")
//   .pipe(
//     filter((key) => key.keyCode == 38 || key.keyCode == 40)
//   )
//   .subscribe(key => getSellectedList(key));

function start(){
  console.log("init");
}

function getSellectedList(key){
    console.log("key");
}
  // function choosePreviosList(){
  //   let choosedList = taskLists.values().next().value.id;
  //   taskLists.forEach(function(list){
  //     if(currentTaskListId == list.id){
  //       currentTaskListId =choosedList;
  //       changeList(currentTaskListId);
  //     }
  //     choosedList = list.id;
  //   });
  //   console.log(taskLists.get(currentTaskListId).id);
  // }

  // function chooseNextList(){
  //   let values = taskLists.values();
  //   let choosedList = currentTaskListId;
  //   taskLists.forEach(function(list){
  //     if(choosedList == currentTaskListId){
  //       values.next().value.id;
  //       if(currentTaskListId == list.id){
  //         currentTaskListId = values.next().value.id;
  //         console.log(currentTaskListId);
  //         changeList(currentTaskListId);
  //       }
  //     }
  //   });
  //   console.log(taskLists.get(currentTaskListId).id);
  // }