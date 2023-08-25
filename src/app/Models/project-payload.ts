export class ProjectPayload {
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;

  constructor(){
  this.projectName= "",
  this.description= "",
  this.startDate= new Date(),
  this.endDate= new Date()
  }
}
