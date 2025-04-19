import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizResultsComponent } from './components/quiz-results/quiz-results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'results/:id', component: QuizResultsComponent },
  { path: '**', redirectTo: '' }
];