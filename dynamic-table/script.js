
function test(){
    alert("hello");

};
var table = document.getElementById("tbl");
window.addEventListener('wheel',function(event){
  if(event.deltaY < 0){
    this.alert('you are scolling up');
    var row = this.document.createElement('tr');
    table.appendChild(row);
  

  }else if(event.deltaY > 0){
    this.alert('scrolling down');
  }
});



function createTable() {
    
    var rows = document.getElementById("rows").value;
    var columns = document.getElementById("columns").value;

    
    var table = document.getElementById("tbl");
    
    for (var i = 0; i < rows; i++) {

     var row = document.createElement("tr");
     table.appendChild(row);
      for (var j = 0; j < columns; j++) {
        var cell = document.createElement("td");
        row.appendChild(cell);
      
      }
    }

   
    
  }