import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  //URL
  url = "http://localhost:80/api/php";

  //vetor
  vetor:Curso[] = [];
  //construtor
  constructor(private http: HttpClient) { }

  //obter todos os cursos
  obterCursos():Observable<Curso[]>{
    return this.http.get(this.url+'listar').pipe(
      map((res) => {
        this.vetor = res['cursos'];
        return this.vetor;
      })
    );

  }
  //Cadastrar curso
  cadastrarCurso(c:Curso): Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar', {cursos:c}).pipe(
      map((res) => {
        this.vetor.push(res['cursos']);
        return this.vetor;
      })
    )

  }

  //remover cursos
  removerCurso(c: Curso): Observable<Curso[]>{
    const params = new HttpParams().set("idCurso", c.idCurso.toString());
    return this.http.delete(this.url+'excluir', {params: params}).pipe(
      map((res) => {
        const filtro = this.vetor.filter((curso) => {
          return +curso['idCurso'] !== +c.idCurso;
        });
        return this.vetor = filtro;
      }))
  }

//atualizar curso
atualizarCurso(c:Curso): Observable<Curso[]>{
  //executa via url
  return this.http.put(this.url+'alterar', {cursos: c})
  //percorre o vetor para saber qual o idCurso alterado
  .pipe(map((res)=> {
    const cursoAlterado = this.vetor.find((item) => {
      return +item['idCurso'] === +[idCurso];
    });

    //altera o valor se o curso alterado = true
    if(cursoAlterado){
      cursoAlterado['nomeCurso'] = c['nomeCurso'];
      cursoAlterado['valorCurso'] = c['valorCurso'];
    }
    
    return this.vetor;

  }))
}


}
