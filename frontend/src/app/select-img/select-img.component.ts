import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.css']
})
export class SelectImgComponent implements OnInit {
  selectImg = {
    src: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1507644980989-d116ca3c5d89%3Fixlib%3Drb-0.3.5%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26s%3Dfbb390bc8267c6fd0cdfb4517b578f59%26w%3D1000%26q%3D80&imgrefurl=https%3A%2F%2Funsplash.com%2Fsearch%2Fphotos%2Fdandelion&docid=rodesRzAsmZfkM&tbnid=yHFSKWOhfVCFqM%3A&vet=10ahUKEwiuqYjwjdveAhXozFQKHS4sAlEQMwhtKAIwAg..i&w=1000&h=1250&bih=772&biw=1600&q=dandelion&ved=0ahUKEwiuqYjwjdveAhXozFQKHS4sAlEQMwhtKAIwAg&iact=mrc&uact=8"
  };

  constructor() {  }

  ngOnInit() {
  }

}
