import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/http/project.service';
import { ProjectAccess } from '../../../entities/response/project-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent {
  project: ProjectAccess;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    const projectId = this.route.snapshot.paramMap.get('id');
    // if (projectId) {
    //   this.projectService.getProject(projectId).subscribe({
    //     next: (response) => {
    //       this.project = new ProjectAccess(response.body);
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       this.errorMessage = 'Failed to load project details.';
    //     },
    //   });
    // }

    this.project = new ProjectAccess({
        projectId: 'proj-123',
        projectName: 'Dummy Project',
        accessTypes: ['OWNER', 'ADMIN']
    });
  }
}