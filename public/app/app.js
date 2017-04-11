(function(){
    console.log('Dashboard.');
})();
function save(){
    var li = document.createElement('li');
    var input = document.getElementById('getdata').value;
    var text = document.createTextNode(input);
    var ol = document.querySelector('ol');
    li.appendChild(text);
    var a = document.createElement('a');
    a.classList = 'close';
    a.innerHTML = '<i class="glyphicon glyphicon-trash"></i>';
    a.setAttribute('data-dismiss','alert');
    a.setAttribute('aria-label','close');
    li.appendChild(a);
    if(input === ''){
        var msg = 'type somthing';
        console.log(msg);
        alert(msg);
    }else{
        li.classList = 'alert alert-info fade in alert-dismissable';
        ol.appendChild(li);
    }
};
