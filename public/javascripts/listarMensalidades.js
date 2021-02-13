function btupdate(id_mensalidade){
    return " <input type='submit' id='"+ id_mensalidade +"'  name='btu' class='btnk' value ='UPDATE'  />";
}

function btsave(id_mensalidade){
    return " <input type='submit'   id='"+ id_mensalidade +"'  onclick='saveMensalidade("+ id_mensalidade +")' name='btsave' class='btnk' value='Save'/>";
}

var RowData={};

$(function(){
   
    loadMensalidades();
   
});


function saveMensalidade(id){
    //valor: linha.find("td:eq(5)").text(),
   let ctrl="#" + id; 

   let linha = $(ctrl).closest("tr");
   let m = new Date(Date.parse(linha.find("td:eq(4)").find('input').val())).getMonth()+ 1;
 
    let mensalidade = {
        id_mensalidade :    linha.find("td:eq(0)").text(),
        nif_socio: linha.find("td:eq(1)").text(),
        data_vencimento: linha.find("td:eq(3)").text(),
        data_pagamento: linha.find("td:eq(4)").find('input').val(),
        valor: 1,
        mes: m,
        pago: linha.find("td:eq(6)").text()
        
    };
 
        alert(mensalidade.mes);
    try {
        $.ajax({
            url:'/mensalidades',
            method:'put',
            data:JSON.stringify(mensalidade),
            dataType:'json',
            contentType: "application/json",
            success:function(dados){
                let ctrl="#" + dados.id_mensalidade; 
                
                let linha = $(ctrl).closest("tr");
                linha.find("td:eq(0)").text(dados.id_mensalidade);
                linha.find("td:eq(1)").text(dados.nif_socio);
                linha.find("td:eq(3)").text(dados.data_vencimento);
                linha.find("td:eq(4)").text(dados.data_pagamento);
                linha.find("td:eq(5)").text(dados.valor);
                linha.find("td:eq(6)").text('1');
                linha.find("td:eq(8)").html(btupdate(dados.id_mensalidade));


                linha.css('background-color','yellowgreen');
                
               



              
        

            },error:function(){
                alert('error');
            }
        })
    } catch (error) {
        
    }


}


function showMensalidades(mensalidades){
    console.log(mensalidades.nome_socio);
    let html="";
    let result = document.getElementById('result');
    for (let i of mensalidades){
        let dp = (i.data_pagamento!=null)?i.data_pagamento.replace(/T00:00:00.000Z/g,""):'';
        console.log(dp);
        html+= "<tr>  <td>" + i.id_mensalidade + " </td><td>" + i.nif_socio +" </td> <td>"+i.nome_socio+"</td><td>" + i.data_vencimento.replace(/T00:00:00.000Z/g,'') + "</td> <td> "+ dp + "</td> <td> "+i.valor+" </td> <td>"+i.pago+" </td> <td> <input type='button' class='btnk' onclick='deletaMensalidade("+encodeURI(i.id_mensalidade)+")' value='DEL' id='"+encodeURI(i.id_mensalidade)+"'/>  </td><td> " + btupdate(encodeURI(i.id_mensalidade)) + " </td>   </tr>";
    }
    result.innerHTML = html;
    $("tr").filter(function(){
      return $(this).find('td:eq(6)').text()==1;
    }).css('background-color','yellowgreen');
    $("[name='btu']").click(function(evt){
        evt =evt?evt:window.event;
        evt.preventDefault();       
        let linha = $(evt.target).closest("tr");
        linha.css("background-color",'orange');
        let id_mensalidade = linha.find("td:eq(0)").text();
        let datanasc = linha.find("td:eq(4)").text();
        linha.find("td:eq(4)").html("<input type='text'    name='id_m' value='"+datanasc+"' style='width:130px;' />");
        linha.find("td:eq(8)").html(btsave(id_mensalidade));
     });
}

















 function loadMensalidades(){
    try {
        $ .ajax({
            url:'/mensalidades',
            method:'get',
            dataType:'json',
            success:function(mensalidades){
                showMensalidades(mensalidades);
                

            },
            error:function(){
                alert("Erro");

            }
        });

    } catch (error) {
        console.log(error)
    }
}









function deletaMensalidade(id_mensalidade){
    let confirma = confirm('deseja mesmo apagar mensalidade ?');
    if (!confirma){
        return false;
    }else{
        $ .ajax({
            url:"/mensalidades/"+id_mensalidade,
            method:"delete",
            dataType:"json",
            contentType:"application/json",

            success:function(dados){
                alert('modalidade apagada com sucesso !');
                str = "#"+dados;
                $(str).closest("tr").remove();
            },
            error:function(){
                console.log('Não Foi Possível apagar mensalidade!');
            }

           
        });
    }
      
      
    }

