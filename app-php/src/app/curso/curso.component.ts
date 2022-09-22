import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  vetor: Curso[] = [];

  constructor(private curso_servico: CursoService ) { }

  curso = new Curso();

  ngOnInit(): void {
    //inicia
    this.selecao();
  }

  cadastro():void{
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {
        //Adicionando dados ao vetor
        this.vetor = res;

        //Limpar os atributos
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

        //atualizar a listagem
        this.selecao();

      }
    );

    
  }

  //selecao
  selecao(){
    this.curso_servico.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  }

  //alterar
  alterar():void{
    this.curso_servico.atualizarCurso(this.curso).subscribe(
      (res) => {
        //Atualizar vetor
        this.vetor = res;

        //Limpar os valores do objeto
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

        //Atualiza a lista
        this.selecao();
      }
    )
    
  }

  //remover
  remover():void{
    this.curso_servico.removerCurso(this.curso).subscribe(
      (res: Curso[]) => {
        this.vetor = res;
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;
        

      }
    );
  }
  //selecionar especifico
  selecionarCurso(c: Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }

  

}
