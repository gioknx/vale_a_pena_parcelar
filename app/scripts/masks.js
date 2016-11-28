var moneyOptions = {
  onKeyPress: function(cep, event, currentField, options) {
    console.log('An key was pressed!:', cep, ' event: ', event,
      'currentField: ', currentField, ' options: ', options);


    console.log(currentField.val());
    var id = currentField.attr('id');
    if (id == "valorAVista") {
      $("#optValue1").text("R$ " + currentField.val());

    } else {
      $("#optValue2").text("R$ " + currentField.val());

    }
  }
};




$(document).ready(function($) {
  $('.percent').mask('##0,00%', {
    reverse: true
  });


  $('.money').mask('00000-000', moneyOptions);
















});


