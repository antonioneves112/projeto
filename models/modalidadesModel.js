var pool = require('./connectBd');



module.exports.getAllModalidades = async function(){
    try {
        let sql = "SELECT * FROM modalidades";
        let result = await pool.query(sql);
        return {status:200,data:result};
    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}

module.exports.addModalidade = async function(modalidade){
   try {
    let sql = "INSERT INTO modalidades(id_modalidade,modalidade) VALUES (?,?)";

    let result = await pool.query(sql,[modalidade.id_modalidade,modalidade.modalidade]);

    return {status:200,data:result};

   } catch (error) {
       console.log(error);
       return{status:200,data:error};
   }

}

module.exports.deleteModalidade = async function(nif){
  try {
    let sql = "DELETE FROM modalidades WHERE id_modalidade=?";
    let result = await pool.query(sql,[nif]);
    return {status:200,data:result}
  } catch (error) {
      console.log(error);
      return {status:500,data:error};
  }
}

module.exports.getModalidade = async function (id_modalidade){
    try {
        let sql = "SELECT * from modalidades where id_modalidade=?";
        let result = await pool.query(sql,[id_modalidade]);
        return {status:200,data:result}
    } catch (error) {
        console.log(error);
        return { status:500 , data:error}
    }
}