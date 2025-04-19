import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Quiz, QuizResult, QuestionType } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizzes: Quiz[] = [];
  private quizResults: QuizResult[] = [];
  
  private currentQuizSubject = new BehaviorSubject<Quiz | null>(null);
  currentQuiz$ = this.currentQuizSubject.asObservable();

  constructor() { 
    this.loadSampleQuizzes();
  }

  getQuizzes(): Observable<Quiz[]> {
    // 在实际应用中，这会从API获取数据
    return of(this.quizzes);
  }

  getQuizById(id: string): Observable<Quiz | undefined> {
    const quiz = this.quizzes.find(q => q.id === id);
    return of(quiz);
  }

  setCurrentQuiz(quiz: Quiz): void {
    this.currentQuizSubject.next(quiz);
  }

  saveQuizResult(result: QuizResult): void {
    this.quizResults.push(result);
    // 在实际应用中，这会将结果保存到数据库或API
    localStorage.setItem('quizResults', JSON.stringify(this.quizResults));
  }

  getUserResults(): Observable<QuizResult[]> {
    // 在实际应用中，这会从API获取用户的测验结果
    return of(this.quizResults);
  }

  getResultByQuizId(quizId: string): Observable<QuizResult | undefined> {
    const result = this.quizResults.find(r => r.quizId === quizId);
    return of(result);
  }

  // 添加样本测验数据
  private loadSampleQuizzes(): void {
    this.quizzes = [
      {
        id: '1',
        title: 'Web开发基础知识',
        description: '测试您对HTML, CSS和JavaScript的基础知识的理解。',
        questions: [
          {
            id: '1-1',
            text: 'HTML是什么的缩写？',
            type: QuestionType.SingleChoice,
            options: [
              { id: 'a', text: 'Hyper Text Markup Language' },
              { id: 'b', text: 'High Tech Modern Language' },
              { id: 'c', text: 'Hyperlinks and Text Markup Language' },
              { id: 'd', text: 'Home Tool Markup Language' }
            ],
            correctOptionId: 'a',
            explanation: 'HTML代表Hyper Text Markup Language，是创建网页的标准标记语言。',
            points: 5
          },
          {
            id: '1-2',
            text: '以下哪个CSS属性用于更改文本颜色？',
            type: QuestionType.SingleChoice,
            options: [
              { id: 'a', text: 'text-color' },
              { id: 'b', text: 'font-color' },
              { id: 'c', text: 'color' },
              { id: 'd', text: 'text-style' }
            ],
            correctOptionId: 'c',
            explanation: 'color属性用于设置文本的颜色。',
            points: 5
          },
          {
            id: '1-3',
            text: 'JavaScript是一种_____语言。',
            type: QuestionType.SingleChoice,
            options: [
              { id: 'a', text: '标记' },
              { id: 'b', text: '编程' },
              { id: 'c', text: '样式' },
              { id: 'd', text: '数据库' }
            ],
            correctOptionId: 'b',
            explanation: 'JavaScript是一种编程语言，用于给网页添加交互功能。',
            points: 5
          }
        ],
        timeLimit: 10
      },
      {
        id: '2',
        title: 'Angular基础知识',
        description: '测试您对Angular框架的基础理解。',
        questions: [
          {
            id: '2-1',
            text: 'Angular中，什么是组件？',
            type: QuestionType.SingleChoice,
            options: [
              { id: 'a', text: '处理HTTP请求的服务' },
              { id: 'b', text: '应用程序的构建块，包含HTML模板和TypeScript类' },
              { id: 'c', text: '一种JavaScript库' },
              { id: 'd', text: '仅用于定义路由的类' }
            ],
            correctOptionId: 'b',
            explanation: '组件是Angular应用程序的基本构建块，由HTML模板和TypeScript类组成。',
            points: 10
          },
          {
            id: '2-2',
            text: '在Angular中，以下哪些是数据绑定类型？',
            type: QuestionType.MultipleChoice,
            options: [
              { id: 'a', text: '插值绑定（Interpolation）' },
              { id: 'b', text: '属性绑定（Property Binding）' },
              { id: 'c', text: '事件绑定（Event Binding）' },
              { id: 'd', text: '模块绑定（Module Binding）' }
            ],
            correctOptionId: 'a,b,c',
            explanation: 'Angular中的数据绑定类型包括插值绑定、属性绑定和事件绑定。没有"模块绑定"这一类型。',
            points: 15
          }
        ],
        timeLimit: 5
      }
    ];
  }
}
