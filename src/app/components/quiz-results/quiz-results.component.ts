import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Quiz, QuizResult, Question } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {
  quizResult: QuizResult | undefined;
  quiz: Quiz | undefined;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.getResultByQuizId(quizId).subscribe(result => {
        this.quizResult = result;
        if (!result) {
          this.router.navigate(['/']);
        }
      });

      this.quizService.getQuizById(quizId).subscribe(quiz => {
        this.quiz = quiz;
      });
    }
  }

  getQuestionById(questionId: string): Question | undefined {
    return this.quiz?.questions.find(q => q.id === questionId);
  }

  getOptionText(questionId: string, optionId: string): string {
    const question = this.getQuestionById(questionId);
    const option = question?.options.find(o => o.id === optionId);
    return option?.text || '';
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
  }

  returnToHome(): void {
    this.router.navigate(['/']);
  }

  retakeQuiz(): void {
    if (this.quiz) {
      this.router.navigate(['/quiz', this.quiz.id]);
    }
  }
}