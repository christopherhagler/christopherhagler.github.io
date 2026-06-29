import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from './reveal.directive';
import {
  EDUCATION,
  EXPERIENCE,
  GITHUB_URL,
  POSTS,
  PROJECTS,
  PUBLICATION,
  SKILL_GROUPS,
  type EducationItem,
  type ExperienceItem,
  type Post,
  type Project,
  type SkillGroup,
} from './content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './home.html',
})
export class Home {
  protected readonly skillGroups: SkillGroup[] = SKILL_GROUPS;
  protected readonly experience: ExperienceItem[] = EXPERIENCE;
  protected readonly education: EducationItem[] = EDUCATION;
  protected readonly publication = PUBLICATION;
  protected readonly projects: Project[] = PROJECTS;
  protected readonly posts: Post[] = POSTS;
  protected readonly githubUrl = GITHUB_URL;
}
