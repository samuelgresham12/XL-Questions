setInterval(loadQuestions, 3000); 

function loadQuestions() {
    let count = 0
    var questions = []
    let loaded=false;
    
    db.collection("questions-xl").get().then(function(querySnapshot) {
        console.log(querySnapshot)
        querySnapshot.forEach(function(doc) {
            questions.push({
                key: doc.id,
                content: doc.data()})

                if(loaded==false){
                    document.getElementById("questions").innerHTML = "";
                    loaded = true;
                }
                
                switch (document.getElementById("selectedFilter").value){
                    case "0":
                        if(doc.data().show=='true'){
                            var para = document.createElement("p");
                            var node = document.createTextNode(doc.data().subQuestion + " -> From Session " + doc.data().subSession) ;
                            para.appendChild(node);
                            var element = document.getElementById("questions");
                            element.appendChild(para);
                            count++
                            break;
                        }
                    case "1":
                        if(doc.data().subSession == "1" && doc.data().show=='true'){
                            var para = document.createElement("p");
                            var node = document.createTextNode(doc.data().subQuestion + " -> From Session " + doc.data().subSession) ;
                            para.appendChild(node);
                            var element = document.getElementById("questions");
                            element.appendChild(para);
                            count++
                        }
                        break;
                    case "2":
                        if(doc.data().subSession == "2" && doc.data().show=='true'){
                            var para = document.createElement("p");
                            var node = document.createTextNode(doc.data().subQuestion + " -> From Session " + doc.data().subSession) ;
                            para.appendChild(node);
                            var element = document.getElementById("questions");
                            element.appendChild(para);
                            count++
                            }
                            break;
                    case "3":
                        if(doc.data().subSession == "3" && doc.data().show=='true'){
                            var para = document.createElement("p");
                            var node = document.createTextNode(doc.data().subQuestion + " -> From Session " + doc.data().subSession) ;
                            para.appendChild(node);
                            var element = document.getElementById("questions");
                            element.appendChild(para);
                            count++
                        }
                        break;
                    case "4":
                        if(doc.data().subSession == "4" && doc.data().show=='true'){
                            var para = document.createElement("p");
                            var node = document.createTextNode(doc.data().subQuestion + " -> From Session " + doc.data().subSession) ;
                            para.appendChild(node);
                            var element = document.getElementById("questions");
                            element.appendChild(para);
                            count++
                        }
                        break;
                    case "Other - Group Discussions / Devotions":
                        if(doc.data().subSession == "Other - Group Discussions / Devotions" && doc.data().show=='true'){
                            var para = document.createElement("p");
                            var node = document.createTextNode(doc.data().subQuestion + " -> From Session " + doc.data().subSession) ;
                            para.appendChild(node);
                            var element = document.getElementById("questions");
                            element.appendChild(para);
                            count++
                        }
                        break; 
                    case "Other - Something Else":
                        if(doc.data().subSession == "Other - Something Else" && doc.data().show=='true'){
                            var para = document.createElement("p");
                            var node = document.createTextNode(doc.data().subQuestion + " -> From Session " + doc.data().subSession) ;
                            para.appendChild(node);
                            var element = document.getElementById("questions");                                    
                            element.appendChild(para);
                            count++
                        }
                        break;
                }
            
        });
        if(loaded==false){
        document.getElementById("questionslen").innerHTML = "-- No Questions Found --"; 
        document.getElementById("questions").innerHTML = "";
        }
        document.getElementById("questionslen").innerHTML = "There are " + count + " questions. \n"
    });
    
}