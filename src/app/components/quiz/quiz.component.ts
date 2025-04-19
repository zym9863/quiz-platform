import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { Quiz, Question, QuestionType, QuizResult, UserAnswer } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatRadioModule, 
    MatCheckboxModule, 
    MatButtonModule, 
    MatCardModule,
    MatProgressBarModule,
    MatIconModule
  ],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  quiz: Quiz | null = null;
  currentQuestionIndex = 0;
  userAnswers: { [key: string]: string[] } = {};
  timeLeft = 0;
  totalTime = 0;
  timerSubscription?: Subscription;
  quizCompleted = false;
  quizStartTime = 0;
  
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe(quiz => {
        if (quiz) {
          this.quiz = quiz;
          this.quizStartTime = Date.now();
          if (quiz.timeLimit) {
            this.timeLeft = quiz.timeLimit * 60;
            this.totalTime = this.timeLeft;
            this.startTimer();
          }
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  get currentQuestion(): Question | null {
    return this.quiz && this.quiz.questions.length > this.currentQuestionIndex
      ? this.quiz.questions[this.currentQuestionIndex]
      : null;
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.submitQuiz();
      }
    });
  }

  selectOption(questionId: string, optionId: string, isSingleChoice: boolean): void {
    if (!this.userAnswers[questionId]) {
      this.userAnswers[questionId] = [];
    }
    
    if (isSingleChoice) {
      this.userAnswers[questionId] = [optionId];
    } else {
      const index = this.userAnswers[questionId].indexOf(optionId);
      if (index > -1) {
        this.userAnswers[questionId].splice(index, 1);
      } else {
        this.userAnswers[questionId].push(optionId);
      }
    }
  }

  isOptionSelected(questionId: string, optionId: string): boolean {
    return this.userAnswers[questionId]?.includes(optionId) || false;
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion(): void {
    if (this.quiz && this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  submitQuiz(): void {
    if (this.quiz) {
      this.quizCompleted = true;
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }

      const result = this.calculateResult();
      this.quizService.saveQuizResult(result);
      this.router.navigate(['/results', this.quiz.id]);
    }
  }

  calculateResult(): QuizResult {
    if (!this.quiz) {
      throw new Error('No quiz available');
    }
    
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    const answers: UserAnswer[] = [];
    
    this.quiz.questions.forEach(question => {
      totalPoints += question.points;
      
      const selectedOptionIds = this.userAnswers[question.id] || [];
      const isCorrect = this.isAnswerCorrect(question, selectedOptionIds);
      
      if (isCorrect) {
        correctAnswers++;
        earnedPoints += question.points;
      }
      
      answers.push({
        questionId: question.id,
        selectedOptionIds,
        isCorrect,
        points: isCorrect ? question.points : 0,
        maxPoints: question.points
      });
    });
    
    const timeSpent = this.quiz.timeLimit
      ? (this.totalTime - this.timeLeft)
      : Math.floor((Date.now() - this.quizStartTime) / 1000);
    
    return {
      quizId: this.quiz.id,
      quizTitle: this.quiz.title,
      totalQuestions: this.quiz.questions.length,
      correctAnswers,
      totalPoints,
      earnedPoints,
      percentage: (earnedPoints / totalPoints) * 100,
      timeTaken: timeSpent,
      answers,
      completedAt: new Date()
    };
  }

  isAnswerCorrect(question: Question, selectedOptionIds: string[]): boolean {
    if (question.type === QuestionType.SingleChoice || question.type === QuestionType.TrueFalse) {
      return selectedOptionIds.length === 1 && selectedOptionIds[0] === question.correctOptionId;
    } else if (question.type === QuestionType.MultipleChoice) {
      const correctOptionIds = question.correctOptionId.split(',');
      return (
        selectedOptionIds.length === correctOptionIds.length &&
        selectedOptionIds.every(id => correctOptionIds.includes(id))
      );
    }
    return false;
  }

  get progressPercentage(): number {
    return this.quiz ? ((this.currentQuestionIndex + 1) / this.quiz.questions.length) * 100 : 0;
  }

  get timeLeftPercentage(): number {
    return this.totalTime > 0 ? (this.timeLeft / this.totalTime) * 100 : 0;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}