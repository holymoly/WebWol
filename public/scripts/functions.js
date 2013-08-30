var socket = io.connect();

// Update the Column Backgroundcolour if ping was succesful
socket.on('pingResult', function (data) {
  //console.log(data.client + ':' + data.data);
  if(document.getElementById(data.client)){
    if(data.data == 'failed'){
      document.getElementById(data.client).style.backgroundColor = "#adadad";
      document.getElementById(data.client).disabled = false;
      document.getElementById(data.client).value="Wake";
      }
    else{
      document.getElementById(data.client).style.backgroundColor = "#00cc00";
      document.getElementById(data.client).disabled = true; 
      document.getElementById(data.client).value="Active";
      //document.getElementById(data.client).addClass('activePC');
    }
  }
});

// Triggers the Wol on the werver
function doWol(data){
  socket.emit('wol', {mac: data});
};
function updateScan(){
  socket.emit('updateScan');
};
function fillData(data){
  //console.log(data.getAttribute("data-ip"));
  document.getElementById("textIp").value=data.getAttribute("data-ip")
  document.getElementById("textMac").value=data.getAttribute("data-mac")
};

socket.on('macResult', function(data){
  var Items = data;
  if(document.getElementById("foundedPcs")){
    for (var i = 0; i < Items.length; i++){
      //create list item
      var li = document.createElement("li");
      //create anchor and text
      var a = document.createElement("a");
      a.innerHTML = Items[i].ip;
      a.setAttribute("data-ip", Items[i].ip);
      a.setAttribute("data-mac", Items[i].mac);
      a.setAttribute("onclick", "fillData(this)");
      // build element which will be added to the button
      li.appendChild(a);
      var select = document.getElementById("foundedPcs");
      select.appendChild(li);
    }
  }
});