<?
//Incluir a conexao
include("conexao.php")

$obterDados = file_get_contents("php://input");

//extrair os dados do JSON

$extrair = json_decode($obterDados);

//separar os dados
$idCurso = $extrair->cursos->idCurso;

//SQL
$sql = "DELETE FROM cursos WHERE idCurso=$idCurso";

mysqli_query($conexao, $sql);

?>