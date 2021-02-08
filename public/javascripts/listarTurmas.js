/*window.onload = function(){    
    $("[name='edit']").click((evt)=>{
        alert('XXXX');
    });
    loadTurmas();
}
*/

$(function(){
    loadTurmas();
  

});


async function loadTurmas(){
    try {
        let turmas = await $.ajax({
            url:'/turmas',
            method:'get',
            dataType:'json'
        })
        console.log(typeof(turmas))
        showTurmas(turmas)
    } catch (error) {
        console.log(error);
    }
}



function showTurmas(turmas){
    let result = document.getElementById('result');
    let html="";
console.log(turmas[0]);
let x=0;

for (i of turmas){
    x++;
       html+= "<tr> <td>"+ i.nif +"</td> <td> "+ i.nome+"</td> <td>"+i.id_aula+"</td> <td>"+i.nome_socio+"</td> <td> <input type='button' onclick='deletarAlunoTurma("+encodeURI(x)+ "," + encodeURI(i.id_aula) + "," +encodeURI(i.nif_socio)+")'   value='DEL' id='"+x+"'> &nbsp; <input type='button' value='EDIT' name='edit' id='"+i.id_aula+"'> </td> </tr> "
    }
   
    result.innerHTML = html

   $("[name='edit']").click((evt)=>{
        evt = evt?evt:window.event;
 $(evt.target).closest('tr').css("background-color", "orange");

     let linha =  $(evt.target).closest('tr');

     aulaantiga.nif=linha.find("td:eq(0)").text();
     aulaantiga.instrutor=linha.find("td:eq(1)").text();
     aulaantiga.id_aula=linha.find("td:eq(2)").text();
     aulaantiga.nome_socio=linha.find("td:eq(3)").text();

     
     linha.find("td:eq(2)").html(select)

     linha.find("td:eq(4)").html(botoes)


    });

}

let select = '<select name="cars" id="cars"><option value="volvo">Volvo</option><option value="saab">Saab</option><option value="mercedes">Mercedes</option><option value="audi">Audi</option></select>';
let botoes = '<input type="button" value="CANCEL" > &nbsp; <input type="button" value="UPDATE" >'; 
let aulaantiga = {};


function deletarAlunoTurma(x,idaula,nifsocio){
    try {
        alert(nifsocio);
        $. ajax({
            url:'/turmas/'+idaula+'/'+nifsocio,
            method:'delete',
            data:{id_aula: idaula,nif_socio:nifsocio},
            dataType:'json',
            success:function(dados){
                let str= '#'+x;
                $(str).closest('tr').remove();
            },error:function(){
                alert('ERROR')
            }
        })
    } catch (error) {
        console-log(error);
    }
}










    $("[name='cancel']").click((evt)=>{
        evt = evt?evt:window.event;
    $(evt.target).closest('tr').css("background-color", "orange");

    let linha =  $(evt.target).closest('tr');

    aulaantiga.nif=linha.find("td:eq(0)").text();
     aulaantiga.instrutor=linha.find("td:eq(1)").text();
    aulaantiga.id_aula=linha.find("td:eq(2)").text();
    aulaantiga.nome_socio=linha.find("td:eq(3)").text();

 
    linha.find("td:eq(2)").html(select)    

 linha.find("td:eq(4)").html(botoes)


});

