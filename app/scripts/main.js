var valorTotalParcelado, valorTotalAVista, valorParcela, numeroParcelas, rendimentoMensal, rendimentoTotal, valorDesconto;

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
var iniciaCalculo = function() {
  valorTotalParcelado = _valorInput("valorParcelado");
  valorTotalAVista = _valorInput("valorAVista");
  numeroParcelas = _valorInput("numeroParcelas");
  valorParcela = valorTotalParcelado / numeroParcelas;
  rendimentoMensal = _valorInput("rendimentoMensal");;

  // O usuario investiria o valor parcelado ou a vista?
  var saldoFinalAVista = _calculaRendimento(valorTotalAVista, valorParcela, (rendimentoMensal / 100), numeroParcelas - 1);
  var saldoFinalParcelado = _calculaRendimento(valorTotalParcelado, valorParcela, (rendimentoMensal / 100), numeroParcelas - 1);

  console.log("Investindo o valor a vista: ");
  if (saldoFinalAVista > (valorTotalParcelado - valorTotalAVista))
    console.log("Vale a pena parcelar");
  else
    console.log("Vale a pena pagar a vista");


  console.log("Investindo o valor total parcelado: ");
  if (saldoFinalParcelado > (valorTotalParcelado - valorTotalAVista))
    console.log("Vale a pena parcelar");
  else
    console.log("Vale a pena pagar a vista");
}



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
