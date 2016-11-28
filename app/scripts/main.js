var valorTotalParcelado, valorTotalAVista, valorParcela, numeroParcelas, rendimentoMensal, rendimentoTotal, valorDesconto, opcaoInvestimento;

// Caso de teste #01
/*valorTotalParcelado = 1200;
valorTotalAVista = 1000;
numeroParcelas = 12;
valorParcela = valorTotalParcelado / numeroParcelas;
rendimentoMensal = 1;
*/
// Calcular rendimento total
// 1000 100 1/100 12 - 1
var _calculaRendimento = function(saldoAtual, valorParcela, rendimentoMensal, numeroParcelas) {
  //console.warn("Numero de parcelas: ", numeroParcelas);
  //console.log("Saldo atual: ", saldoAtual);
  var saldoParcelaPaga = saldoAtual - valorParcela;
  //console.log("Pagou parcela: ", saldoParcelaPaga);
  var novoSaldo = saldoParcelaPaga * (1 + rendimentoMensal);
  //console.log("Pós rendimento: ", novoSaldo);
  var qtdRendimentoMensal = novoSaldo - saldoParcelaPaga;
  //console.log("Valor rendimento: ", qtdRendimentoMensal);
  // Ultimo rendimento
  if (numeroParcelas === 1)
    return novoSaldo;
  return _calculaRendimento(novoSaldo, valorParcela, rendimentoMensal, numeroParcelas - 1);
}

var _valorInput = function(campo) {
  return parseInt($("#" + campo).val());
}

var _valorInputClean = function(campo) {
  return parseInt($("#" + campo).cleanVal());
}

var _rendimentoMensal = function() {
  rendimentoMensal = $("#rendimentoMensal").val();
  rendimentoMensal.replace(/%/i, '');
  rendimentoMensal.replace(/,/i, '.');
  return parseFloat(rendimentoMensal);
}
var iniciaCalculo = function() {
  valorTotalParcelado = _valorInputClean("valorParcelado");
  valorTotalAVista = _valorInputClean("valorAVista");
  numeroParcelas = _valorInput("numeroParcelas");
  valorParcela = valorTotalParcelado / numeroParcelas;
  rendimentoMensal = _rendimentoMensal();
  opcaoInvestimento = $('input[name=optradio]:checked').attr("id").slice(-1);
  console.log(opcaoInvestimento);

  // O usuario investiria o valor parcelado ou a vista?
  var saldoFinalAVista = _calculaRendimento(valorTotalAVista, valorParcela, (rendimentoMensal / 100), numeroParcelas - 1);
  var saldoFinalParcelado = _calculaRendimento(valorTotalParcelado, valorParcela, (rendimentoMensal / 100), numeroParcelas - 1);

  if (opcaoInvestimento == 1) {
    if (saldoFinalAVista > (valorTotalParcelado - valorTotalAVista))
      $("#alertaResultado")[0].innerHTML = "<strong>Parcele!</strong> Seus rendimentos serão maiores que o desconto";
    else
      $("#alertaResultado")[0].innerHTML = "<strong>Pague a vista.</strong> Seu desconto será melhor que os rendimentos.";
  } else {
    if (saldoFinalParcelado > (valorTotalParcelado - valorTotalAVista))
      $("#alertaResultado")[0].innerHTML = "<strong>Parcele!</strong> Seus rendimentos serão maiores que o desconto";
    else
      $("#alertaResultado")[0].innerHTML = "<strong>Pague a vista.</strong> Seu desconto será melhor que os rendimentos.";
  }
  $("#alertaResultado").removeClass("hidden");


}


/* radio buttons */
var delay = (function() {
  var timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

$('#valorParcelado').keyup(function() {
  delay(function() {
    $("#radioButtons").removeClass("hidden");
  }, 200);
});
/* /radio buttons */





/*

Para valer a pena a vista, o desconto deverá ser maior que o rendimento total

valorDesconto > rendimentoTotal

valorDesconto = 500

rendimentoTotal = 


Passo base: 
    saldoAtual = 1000
Próximos:
    novoValor = (saldoAtual - valorParcela) * (1 + rendimentoMensal)
    (numeroParcelas - 1) vezes


|_|_|_|_|


5 parcelas
4 rendimentos

*/
