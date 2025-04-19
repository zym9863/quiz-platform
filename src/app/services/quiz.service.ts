import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Quiz, QuizResult, Question, QuestionType } from '../models/quiz.model';

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
    this.loadResults();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getQuizzes(): Observable<Quiz[]> {
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
    if (this.isBrowser()) {
      localStorage.setItem('quizResults', JSON.stringify(this.quizResults));
    }
  }

  getUserResults(): Observable<QuizResult[]> {
    return of(this.quizResults);
  }

  getResultByQuizId(quizId: string): Observable<QuizResult | undefined> {
    const results = this.quizResults.filter(r => r.quizId === quizId);
    const result = results.length ? results[results.length - 1] : undefined;
    return of(result);
  }

  private loadResults(): void {
    if (this.isBrowser()) {
      const data = localStorage.getItem('quizResults');
      if (data) {
        this.quizResults = JSON.parse(data).map((r: QuizResult) => ({
          ...r,
          completedAt: new Date(r.completedAt)
        }));
      }
    }
  }

  private loadSampleQuizzes(): void {
    this.quizzes = [
      {
        id: '1',
        title: 'Web开发基础知识',
        description: '测试您对HTML、CSS、JavaScript等Web开发基础知识的掌握。',
        questions: [
          {
            id: '1-1',
            text: '以下哪些是HTML5新增的语义化标签？',
            type: QuestionType.MultipleChoice,
            options: [
              { id: 'a', text: '<header>' },
              { id: 'b', text: '<nav>' },
              { id: 'c', text: '<div>' },
              { id: 'd', text: '<article>' }
            ],
            correctOptionId: 'a,b,d',
            explanation: 'HTML5新增了多个语义化标签，包括<header>、<nav>、<article>等，而<div>是HTML4就有的标签。',
            points: 10
          },
          {
            id: '1-2',
            text: '关于CSS盒模型的说法，哪些是正确的？',
            type: QuestionType.MultipleChoice,
            options: [
              { id: 'a', text: '标准盒模型中，width包含content、padding和border' },
              { id: 'b', text: 'box-sizing: border-box可以改变盒模型的计算方式' },
              { id: 'c', text: 'margin会影响元素的实际宽度' },
              { id: 'd', text: 'padding不能设置负值' }
            ],
            correctOptionId: 'b,d',
            explanation: '标准盒模型中width只包含content；border-box确实改变计算方式；margin不影响实际宽度；padding不能为负。',
            points: 10
          },
          {
            id: '1-3',
            text: '以下关于JavaScript变量声明的说法，哪个是正确的？',
            type: QuestionType.SingleChoice,
            options: [
              { id: 'a', text: 'var声明的变量没有块级作用域' },
              { id: 'b', text: 'let声明的变量不能重新赋值' },
              { id: 'c', text: 'const声明的对象内部属性不能修改' },
              { id: 'd', text: '所有变量声明都会被提升到作用域顶部' }
            ],
            correctOptionId: 'a',
            explanation: 'var没有块级作用域；let可以重新赋值；const对象的属性可以修改；只有var声明会提升。',
            points: 10
          },
          {
            id: '1-4',
            text: '以下哪些是常见的Web性能优化方法？',
            type: QuestionType.MultipleChoice,
            options: [
              { id: 'a', text: '使用CDN加速资源加载' },
              { id: 'b', text: '压缩和合并CSS/JavaScript文件' },
              { id: 'c', text: '使用懒加载技术' },
              { id: 'd', text: '增加服务器内存' }
            ],
            correctOptionId: 'a,b,c',
            explanation: 'CDN、文件压缩合并、懒加载都是常见的前端性能优化方法，增加服务器内存是后端优化方法。',
            points: 10
          },
          {
            id: '1-5',
            text: '关于响应式设计，以下说法正确的是？',
            type: QuestionType.SingleChoice,
            options: [
              { id: 'a', text: '响应式设计只能使用px作为单位' },
              { id: 'b', text: 'Media Queries是实现响应式设计的唯一方法' },
              { id: 'c', text: 'Flexbox和Grid可以帮助实现响应式布局' },
              { id: 'd', text: '响应式设计会显著增加网站的加载时间' }
            ],
            correctOptionId: 'c',
            explanation: '响应式设计可以使用多种单位；除了Media Queries还有其他方法；Flexbox和Grid确实有助于响应式布局；响应式设计不一定显著影响加载时间。',
            points: 10
          }
        ],
        timeLimit: 15
      },
      {
        id: '2',
        title: 'Angular基础知识',
        description: '测试您对Angular框架的核心概念和常用特性的理解。',
        questions: [
          {
            id: '2-1',
            text: '以下哪些是Angular的核心特性？',
            type: QuestionType.MultipleChoice,
            options: [
              { id: 'a', text: '依赖注入（DI）系统' },
              { id: 'b', text: '组件化架构' },
              { id: 'c', text: '模板语法' },
              { id: 'd', text: '虚拟DOM' }
            ],
            correctOptionId: 'a,b,c',
            explanation: '依赖注入、组件化架构和模板语法是Angular的核心特性，虚拟DOM是React的特性。',
            points: 10
          },
          {
            id: '2-2',
            text: '关于Angular生命周期钩子，以下说法正确的是？',
            type: QuestionType.SingleChoice,
            options: [
              { id: 'a', text: 'ngOnInit在组件初始化后调用一次' },
              { id: 'b', text: 'ngOnChanges在每次视图更新后调用' },
              { id: 'c', text: 'ngOnDestroy在路由变化时调用' },
              { id: 'd', text: 'ngAfterViewInit在数据绑定前调用' }
            ],
            correctOptionId: 'a',
            explanation: 'ngOnInit确实在组件初始化后调用一次；ngOnChanges在输入属性变化时调用；ngOnDestroy在组件销毁前调用；ngAfterViewInit在视图初始化后调用。',
            points: 10
          },
          {
            id: '2-3',
            text: '以下哪些是Angular中实现组件通信的方式？',
            type: QuestionType.MultipleChoice,
            options: [
              { id: 'a', text: '@Input/@Output装饰器' },
              { id: 'b', text: '服务（Service）' },
              { id: 'c', text: 'ViewChild' },
              { id: 'd', text: 'localStorage' }
            ],
            correctOptionId: 'a,b,c',
            explanation: '@Input/@Output、Service和ViewChild都是Angular中常用的组件通信方式，localStorage是浏览器API。',
            points: 10
          },
          {
            id: '2-4',
            text: '关于Angular路由，下列说法正确的是？',
            type: QuestionType.SingleChoice,
            options: [
              { id: 'a', text: '路由守卫可以控制路由的访问权限' },
              { id: 'b', text: '路由参数只能通过URL传递' },
              { id: 'c', text: '子路由不能嵌套使用' },
              { id: 'd', text: '路由配置必须在根模块中定义' }
            ],
            correctOptionId: 'a',
            explanation: '路由守卫确实可以控制访问权限；路由参数可以通过多种方式传递；子路由可以嵌套；路由配置可以在特性模块中定义。',
            points: 10
          },
          {
            id: '2-5',
            text: '以下哪些是Angular表单验证的方法？',
            type: QuestionType.MultipleChoice,
            options: [
              { id: 'a', text: '模板驱动表单验证' },
              { id: 'b', text: '响应式表单验证' },
              { id: 'c', text: '自定义验证器' },
              { id: 'd', text: 'DOM验证' }
            ],
            correctOptionId: 'a,b,c',
            explanation: '模板驱动表单验证、响应式表单验证和自定义验证器都是Angular的表单验证方法，DOM验证不是Angular特有的。',
            points: 10
          }
        ],
        timeLimit: 20
      }
    ];
  }
}
