<?
//Incluir a conexao
include("conexao.php")

$obterDados = file_get_contents("php://input");

//extrair os dados do JSON

$extrair = json_decode($obterDados);

//sepaar os dados
$nomeCurso = $extrair->cursos->nomeCurso;
$valorCurso = $extrair->cursos->valorCurso;


//SQL
$sql = "INSERT INTO cursos (nomeCurso, valorCurso) VALUES ('$nomeCurso', '$valorCurso')";
mysqli_query($conexao, $sql);

//exportar os dados cadastrados
$curso = [
    'nomeCurso' => $nomeCurso,
    'valorCurso' => $valorCurso
]

json_encode(['curso']=> $curso);



?>